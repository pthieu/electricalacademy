#!/bin/bash

# Variables
LOG_DIR='log' #log folder, located in same level as this script
APP_NAME='electricalacademy'
APP_PORT='6969'

# Check if log directory exists, if not, then created
if [ ! -d "$LOG_DIR" ]; then
  # Control will enter here if $LOG_DIR exists.
  echo "NOTE: $LOG_DIR folder not detected, creating..."
  mkdir -pv "$LOG_DIR"
  touch ~/www/$APP_NAME/log/forever.log
fi

# Invoke the Forever module (to START our Node.js server).
# NOTE: if log folder doesn't exist, this script will break, TODO: add folder check and if not exist, create
NODE_ENV=production \
PORT=$APP_PORT \
forever \
start \
-al ~/www/$APP_NAME/log/forever.log \
-ao log/out.log \
-ae log/err.log \
~/www/$APP_NAME/dist/server/app.js
