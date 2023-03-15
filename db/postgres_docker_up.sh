#!/usr/bin/env bash

DIR=$(dirname $0)

mkdir ${DIR}/data

docker-compose -p postgres-api-livros-nestjs up -d
