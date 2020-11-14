#!/bin/bash

set -e

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

cd $DIR

./buildClientProjects.sh
./buildClientDocker.sh
./buildServerDocker.sh
./deployDocker.sh
