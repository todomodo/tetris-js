#!/bin/bash
set -e

print_info() {
  echo "PWD: $PWD"
  echo "USER: $USER_NAME"
  echo "platform: $(uname -m)"
  echo "$(lsb_release -d)"
  echo "node version: $(node --version)"
  echo "npm version: $(npm --version)"
}

print_hints() {
  echo "hints: ['npm install' 'npm start' 'npm test' 'npm upgrade']"
}

npm_run_dev() {
    npm install
    npm start
}

# change into the app folder
APP_ROOT=/usr/src/app
cd $APP_ROOT

# see what needs to be run based on the first command line parameter
case "$1" in
"")
  # When no parameters, we execute our default behavior - run in
  # dev server mode.
  echo "***dev***"
  print_info
  echo
  npm_run_dev
  ;;
*)
  # When there is a parameter - pass the command line to the container
  echo "***default***"
  print_info
  print_hints
  echo
  exec "$@"
  ;;
esac
