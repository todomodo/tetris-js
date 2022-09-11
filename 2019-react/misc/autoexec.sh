#!/bin/bash
set -e

# change into the app folder
APP_ROOT=/root/app
cd $APP_ROOT

# Exec the container's main process (what's set as CMD in the Dockerfile).
exec "$@"
