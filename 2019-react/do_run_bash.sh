#!/bin/bash
#
# Run container in anonymous bash mode:
#
#   * the container is nameless
#   * there is no web server
#   * exposed ports are not mapped
#   * the app folder is directly mounted

docker run -it --rm -v $PWD/app:/root/app tetjs-rapidant bash
