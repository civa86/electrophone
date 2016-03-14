#!/bin/bash

echo "/*****************************************/"
echo "/*****    PUBLISH GH-PAGES :: START   ****/"
echo "/*****************************************/"

echo "/***** INSTALL LIBRARY DEPENDENCIES ****/"
npm install || { echo 'INSTALL LIBRARY DEPENDENCIES: failed' ; exit 1; }

echo "/***** CLEAN DISTRIBUTION ****/"
rm -rf app/dist
mkdir app/dist

#TODO change with dist for unit testing....
echo "/***** LIBRARY DISTRIBUTION ****/"
npm run lib::build || { echo 'LIBRARY DISTRIBUTION: failed' ; exit 1; }

echo "/***** LIBRARY DOCUMENTATION ****/"
npm run lib::docs::public || { echo 'LIBRARY DOCS: failed' ; exit 1; }

echo "/***** ENTER APPLICATION DIRECTORY ****/"
cd app

echo "/***** INSTALL APPLICATION DEPENDENCIES ****/"
npm install || { echo 'INSTALL APPLICATION DEPENDENCIES: failed' ; exit 1; }

echo "/***** APPLICATION DISTRIBUTION ****/"
npm run app::dist || { echo 'APPLICATION DISTRIBUTION: failed' ; exit 1; }

echo "/***** ENTER APPLICATION DIST DIRECTORY ****/"
cd dist

echo "/***** CREATE TMP REPO TO PUBLISH ****/"
git init

git config user.name "Publisher Flow"
git config user.email "dario.civallero@gmail.com"
git add .

echo "/***** COMMIT VERSION ****/"
PUBLISH_TIME="`date +'%Y-%m-%d %H:%M:%S'`"
#TODO discover repo by cmd line...
GH_REF="github.com/civa86/web-synth.git"

git commit -m "[$PUBLISH_TIME] Publish gh-pages"

git push --force --quiet "https://${GH_TOKEN}@$GH_REF" master:gh-pages > /dev/null 2>&1

echo "/***** CLEAN TMP REPO ****/"
rm -rf .git

echo "/*****************************************/"
echo "/*****    PUBLISH GH-PAGES :: END     ****/"
echo "/*****************************************/"
