#!bin/bash

yarn
yarn run build
docker build -t tor-frontend:v0.1 .
