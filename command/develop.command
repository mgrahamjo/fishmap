#!/bin/bash

cd "$(dirname "$0")" && cd ..

npm run watch & (cd dist && python3 -m http.server 8080)
