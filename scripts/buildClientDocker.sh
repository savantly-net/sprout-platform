#!/bin/bash

REPO_URL=savantly/sprout-webapp

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

cd $DIR/../frontend/

docker build -t $REPO_URL .