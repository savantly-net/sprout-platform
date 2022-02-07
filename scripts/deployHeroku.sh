#!/bin/bash


DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd $DIR

heroku container:login

docker tag savantly/sprout-server:latest registry.heroku.com/sprout-server/web
docker push registry.heroku.com/sprout-server/web

docker tag savantly/sprout-webapp:latest registry.heroku.com/sprout-web/web
docker push registry.heroku.com/sprout-web/web

heroku container:release web -a sprout-server
heroku container:release web -a sprout-web
