#!/bin/bash

cd "$(dirname "$0")" && cd ..

npm run build

cd dist

python3 -m http.server 8080
