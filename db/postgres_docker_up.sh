#!/usr/bin/env bash

mkdir data backup

docker-compose -p postgres-api-livros-nestjs up -d
