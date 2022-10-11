#!/usr/bin/env bash

mkdir data

docker-compose -p postgres-api-livros-nestjs up -d
