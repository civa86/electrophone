#!/bin/bash

GIT_BRANCH=`git name-rev --name-only HEAD`
LATEST_TAG=`git describe --tags $(git rev-list --tags --max-count=1)`

if [ "$GIT_BRANCH" != "development" ]
then
    echo "ERROR: A Release starts from development! switch branch"
    exit 1
fi

echo "/******************************************/"
echo "/****     WEB SYNTH RELEASE START      ****/"
echo "/******************************************/"

echo "/**** CHECK APP START ****/"
cd app
npm run app::dist || { echo "APPLICATION DIST: failed" ; exit 1; }
cd ..
echo "/**** CHECK APP END ****/"

echo "LATEST RELEASE: $LATEST_TAG"
echo "NEW RELEASE NUMBER: "
read RELEASE_NUM

echo "/***** LIBRARY DISTRIBUTION ****/"
npm run lib::dist || { echo "LIBRARY DISTRIBUTION: failed" ; exit 1; }

echo "/***** LIBRARY DOCUMENTATION ****/"
npm run lib::docs || { echo "LIBRARY DOCUMENTATION: failed" ; exit 1; }

echo "/***** LIBRARY COVERAGE ****/"
npm run lib::coverage || { echo "LIBRARY COVERAGE: failed" ; exit 1; }

echo "EVERYTHING WORKS FINE!"
echo "DO YOU WANT TO RELEASE $RELEASE_NUM ONLINE? (y/n)"
read DO_RELEASE

if [ "$DO_RELEASE" == "y" ]
then
    echo "/**** BUMP PACKAGE VERSION ****/"
    npm --no-git-tag-version version $RELEASE_NUM

    echo "/***** COMMIT DEVELOPMENT ****/"
    git add .
    git commit -m "build $RELEASE_NUM"

    echo "/**** GITFLOW RELEASE :: $RELEASE_NUM ****/"
    git flow release start $RELEASE_NUM
    git flow release finish -m "release-$RELEASE_NUM" $RELEASE_NUM

    git checkout development

    echo "PUSH MASTER BRANCH TO PUBLISH YOUR BUILD WITH Travis CI!"
else
    echo "NOTHING TRANSMITTED! SEE YOU SOON."
fi

echo "/******************************************/"
echo "/****      WEB SYNTH RELEASE END       ****/"
echo "/******************************************/"
