#!/usr/bin/env bash

docker exec $(docker-compose -p postgres-api-livros-nestjs ps -q) sh /backup/backup.sh && echo "Gerado backup de BD em pasta backup" &&
    docker-compose -p postgres-api-livros-nestjs down
