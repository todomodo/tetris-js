#!/bin/bash
# Start container in default (server) mode
#
CONTAINER_NAME=tetjs

echo
echo "starting $CONTAINER_NAME ..."
echo

docker run -it --rm \
  --name $CONTAINER_NAME \
  -p 3010:3000 \
  tetjs-rapidant
