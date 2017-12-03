#!/bin/bash

# This is an example of an environment variable:
API_URL="http:\/\/jsonplaceholder.typicode.com"

HTML=$(cat dist/$1.html)

insert() {
    HTML=$(echo "$HTML" | perl -p0e "s/<!--insert:$1-->/$2/s" )
}

insert "API_URL" "$API_URL"

echo "$HTML" > "dist/$1.html"
