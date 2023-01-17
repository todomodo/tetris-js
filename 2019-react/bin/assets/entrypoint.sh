#!/bin/bash
set -e

# change into the app folder
APP_ROOT=/usr/src/app
cd $APP_ROOT

# see what needs to be run
case "$1" in
server)
  # Run the container in NPM dev server mode
  echo "***server***"
  echo "PWD: $PWD"
  echo "PLATFORM: $(uname -m)"
  echo "$(lsb_release -d)"
  echo
  # install the NPM modules
  npm install
  npm start
  ;;
*)
  # Default behavior is to exec the container's main process, e.g.
  # what's set as CMD in the Dockerfile
  echo "***default***"
  echo "PWD: $PWD"
  echo "PLATFORM: $(uname -m)"
  echo "$(lsb_release -d)"
  echo "hints: ['npm install' 'npm start' 'npm test' 'npm upgrade']"
  echo
  exec "$@"
  ;;
esac
