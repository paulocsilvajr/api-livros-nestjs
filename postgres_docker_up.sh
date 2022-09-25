#!/usr/bin/env bash

mkdir data docker-entrypoint-initdb.d

docker-compose -p postgres-api-livros-nestjs up -d
