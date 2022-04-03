#!/bin/bash

REPO_URL=savantly/sprout-server:latest

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

cd $DIR/..
./gradlew :sprout-server:build

cd ./backend/server

docker buildx build --platform linux/arm64,linux/amd64  -t $REPO_URL .