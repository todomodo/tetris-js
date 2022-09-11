#!/bin/bash
# Start container in default (server) with app dir mounted
# directly to host
#
CONTAINER_NAME=tetjs
APP_ROOT=$PWD/app

echo
echo "starting $CONTAINER_NAME with APP_ROOT=\"$APP_ROOT\"..."
echo

docker run -it --rm \
  --name $CONTAINER_NAME \
  -v $APP_ROOT:/root/app \
  -p 3010:3000 \
  tetjs-rapidant
