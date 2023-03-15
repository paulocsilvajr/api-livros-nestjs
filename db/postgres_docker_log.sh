#!/usr/bin/env bash

echo -e "CTRL + C para parar\n"
docker-compose -p postgres-api-livros-nestjs logs -f
