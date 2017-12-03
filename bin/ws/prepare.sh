#!/bin/bash

rm -rf dist/*

mkdir -p dist

cp -rf src/images dist/images

cp -rf src/fonts dist/fonts

cp src/index.html dist/index.html
