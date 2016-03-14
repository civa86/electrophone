#!/bin/bash

GIT_BRANCH=`git name-rev --name-only HEAD`
LATEST_TAG=`git describe --tags $(git rev-list --tags --max-count=1)`

if [ "$GIT_BRANCH" != "development" ]
then
    echo "Release start from development! switch your branch"
    exit 1
fi

echo "/******************************************/"
echo "/****     WEB SYNTH RELEASE START      ****/"
echo "/******************************************/"

echo "LATEST RELEASE: $LATEST_TAG"
echo "NEW RELEASE NUMBER: "
read RELEASE_NUM

echo "/**** BUMP PACKAGE VERSION ****/"
npm --no-git-tag-version version $RELEASE_NUM

#TODO change with dist for unit testing....
echo "/***** LIBRARY DISTRIBUTION ****/"
npm run lib::build || { echo 'LIBRARY DISTRIBUTION: failed' ; exit 1; }

echo "/***** COMMIT DEVELOPMENT ****/"
git add .
git commit -m "release $RELEASE_NUM"

echo "/**** GITFLOW RELEASE :: $RELEASE_NUM ****/"
git flow release start $RELEASE_NUM
git flow release finish $RELEASE_NUM

echo "/******************************************/"
echo "/****      WEB SYNTH RELEASE END       ****/"
echo "/******************************************/"
