#!/bin/bash

# exit when any command fails
set -e

# keep track of the last executed command
trap 'last_command=$current_command; current_command=$BASH_COMMAND' DEBUG
# echo an error message before exiting
trap 'echo "\"${last_command}\" command failed with exit code $?."' EXIT

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

cd $DIR

GIT_READY=$(git status --porcelain | wc -l)
if [ $GIT_READY > 0 ]; then
    echo 'your git workspace is not pristine'
    exit 1
fi

rush change
rush check
rush update
rush build
rush version --bump
rush build
rush publish --include-all --version-policy sprout \
  --target-branch development  --add-commit-details \
  --apply --publish --pack --release-folder dist

rush npm:publish