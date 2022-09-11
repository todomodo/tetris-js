#!/bin/bash
set -e

# change into the app folder
APP_ROOT=/root/app
cd $APP_ROOT

# see what needs to be run
case "$1" in
server)
  # Run the container in NPM dev server mode
  echo "***server***"
  echo "PWD: $PWD"

  # install the NPM modules
  npm install
  npm start
  ;;
*)
  # Default behavior is to exec the container's main process, e.g.
  # what's set as CMD in the Dockerfile
  echo "***default***"
  echo "PWD: $PWD"
  exec "$@"
  ;;
esac
