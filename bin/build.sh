#!/bin/bash

. ./bin/util.sh

### Prepare workspace ###
./bin/ws/prepare.sh

########## JavaScript ##########

### lint ###
attempt eslint
eslint "src/**/*.js" && success || fail

### test ###
attempt karma
npm run test -- --single-run --browsers=ChromeHeadless && success || fail

### transpile ###
attempt webpack
webpack --config webpack.prod.js && success || fail

### Collapse whitespace ###
attempt whitespace
tr -s " " < dist/bundle.js > dist/tmp && mv dist/tmp dist/bundle.js && success || fail

############# CSS #############

### compile ###
attempt sass
node-sass src/css/main.scss dist/main.css --quiet && success || fail

### autoprefix ###
attempt autoprefix
postcss --use autoprefixer dist/main.css --replace && success || fail

### minify ###
attempt cleancss
cleancss -o dist/main.css dist/main.css && success || fail

############# HTML #############

### Copy HTML ###
cp src/index.html dist/index.html

### Minify HTML ###
attempt html-minifier
./bin/html/minify.sh && success || fail

### Hash filenames ###
attempt hash-filename
./bin/html/hash-filename.sh && success || fail

### Insert constants ###
attempt constants
./bin/html/constants.sh "index" && success || fail

### Clean up temp files ###
rm dist/bundle.js dist/main.css

### check status ###
if check_status; then

    print_green "✓ Done!"

fi
