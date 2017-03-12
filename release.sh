#!/bin/bash

# Functions
function separator () {
    printf '%*s\n' "${COLUMNS:-$(tput cols)}" '' | tr ' ' -
}

function packageVersion () {
    node -p -e "require('./package.json').version"
}

function checkGitBranch () {
    local GIT_BRANCH=`git name-rev --name-only HEAD`
    local DEV_BRANCH="development"

    if [ "$GIT_BRANCH" != "$DEV_BRANCH" ]
    then
        separator
        echo "ERROR"
        separator

        echo "A Release starts from $DEV_BRANCH!"
        echo "You are inside branch: $GIT_BRANCH"
        echo "Please checkout $DEV_BRANCH first!"
        separator
        exit 1
    fi
}

function validateReleaseNum () {
    local BRANCH_REGEX="^[0-9]\.[0-9]\.[0-9]$"

    if [ "$1" == "$(packageVersion)" ]
    then
        separator
        echo "ERROR"
        echo "Version $1 already in place"
        separator
        exit 1
    fi

    if [[ ! $1 =~ $BRANCH_REGEX ]];
    then
        separator
        echo "ERROR"
        echo "Version $1 must respect form <0-9>.<0-9>.<0-9>"
        separator
        exit 1
    fi

    if [[ "$1" < "$(packageVersion)" ]]
    then
        separator
        echo "ERROR"
        echo "Version $1 must be grater than current $(packageVersion)"
        separator
        exit 1
    fi

}

# Execution

START_V=$(packageVersion)

checkGitBranch

separator
echo "WEB SYNTH RELEASE START"
separator

echo "CURRENT PACKAGE VERSION: $(packageVersion)"
echo "NEW RELEASE NUMBER: "
read RELEASE_NUM

validateReleaseNum $RELEASE_NUM

separator
echo "CHECK APPLICATION"
separator
cd app
npm install
npm run app::dist || { echo "APPLICATION DIST: failed" ; exit 1; }
cd ..
separator
echo "CHECK APPLICATION END"
separator

echo "BUMP PACKAGE VERSION: $RELEASE_NUM"
npm --no-git-tag-version version $RELEASE_NUM
separator

echo "LIBRARY DISTRIBUTION"
npm install
npm run lib::dist || { echo "LIBRARY DISTRIBUTION: failed" ; exit 1; }
separator

echo "LIBRARY DOCUMENTATION"
npm run lib::docs || { echo "LIBRARY DOCUMENTATION: failed" ; exit 1; }
separator

echo "LIBRARY COVERAGE"
npm run lib::coverage || { echo "LIBRARY COVERAGE: failed" ; exit 1; }
separator

echo "Everything seems ok!"
echo "Do you want to promote version $RELEASE_NUM ? (y/n)"
read DO_RELEASE

if [ "$DO_RELEASE" == "y" ]
then
    echo "COMMIT DEVELOPMENT"
    git add .
    git commit -m "build $RELEASE_NUM"

    echo "GITFLOW RELEASE :: $RELEASE_NUM"
    git flow release start $RELEASE_NUM
    git flow release finish -m "release-$RELEASE_NUM" $RELEASE_NUM

    echo "PUBLISH PACKAGE $RELEASE_NUM TO NPM REGISTRY"
    npm publish

    git checkout development

    echo "PUSH MASTER BRANCH TO PUBLISH DEMO APPLICATION WITH Travis CI!"
else
    echo "REVERTING PACKAGE VERSION: $START_V"

    npm --no-git-tag-version version $START_V

    echo "NOTHING MORE TO DO! SEE YOU SOON"
fi

separator
echo "RELEASE END"
separator

if which osascript >/dev/null; then
    osascript -e 'display notification "completed" with title "ElectroPhone Release"'
fi
