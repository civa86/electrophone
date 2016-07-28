#!/bin/bash

printf '%*s\n' "${COLUMNS:-$(tput cols)}" '' | tr ' ' -
echo "PUBLISH GH-PAGES :: START"
printf '%*s\n' "${COLUMNS:-$(tput cols)}" '' | tr ' ' -

echo "/***** INSTALL LIBRARY DEPENDENCIES ****/"
npm install || { echo 'INSTALL LIBRARY DEPENDENCIES: failed'; exit 1; }

echo "/***** LIBRARY DISTRIBUTION ****/"
npm run lib::dist || { echo 'LIBRARY DISTRIBUTION: failed'; exit 1; }

npm run lib::coverage || { echo 'LIBRARY COVERAGE: failed'; exit 1; }

echo "/***** ENTER APPLICATION DIRECTORY ****/"
cd app

echo "/***** INSTALL APPLICATION DEPENDENCIES ****/"
npm install || { echo 'INSTALL APPLICATION DEPENDENCIES: failed'; exit 1; }

echo "/***** APPLICATION DISTRIBUTION ****/"
npm run app::dist || { echo 'APPLICATION DISTRIBUTION: failed'; exit 1; }

echo "/***** LIBRARY LCOV >>> COVERALLS ****/"
cat ../coverage/lcov.info | ../node_modules/.bin/coveralls

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

printf '%*s\n' "${COLUMNS:-$(tput cols)}" '' | tr ' ' -
echo "PUBLISH GH-PAGES :: END"
printf '%*s\n' "${COLUMNS:-$(tput cols)}" '' | tr ' ' -
