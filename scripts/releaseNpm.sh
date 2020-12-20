#!/bin/bash

# Suppress the spinner in the toolkit, because it appears as warnings when building
SUPPRESS_SPINNER=true

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

cd $DIR

GIT_READY=$(git status --porcelain | wc -l)
if [ $GIT_READY -gt 0 ]; then
    echo 'your git workspace is not pristine'
    exit 1
fi


# exit when any command fails
set -e

rush change
rush check
rush update

echo 'Building everything but the webapp. If the inter-project dependencies change, we may need to adjust these commands'
rush build -t ui
rush build sprout-runtime


# keep track of the last executed command
trap 'last_command=$current_command; current_command=$BASH_COMMAND' DEBUG
# echo an error message before exiting
trap 'echo "\"${last_command}\" command failed with exit code $?."' EXIT

rush publish --include-all --version-policy sprout \
  --target-branch master  --add-commit-details \
  --apply --pack --release-folder dist

rush npm:publish