#!/bin/bash

REPO_URL=savantly/sprout-server

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

cd $DIR/..
./gradlew :sprout-server:build

cd ./backend/server

docker build -t $REPO_URL .