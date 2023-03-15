#!/usr/bin/env bash

DIR=$(dirname $0)

$DIR/postgres_docker_down.sh &&
    $DIR/remove_postgres_data.sh ||
    echo "Container já estava finalizado. Remova a pasta 'data' com o script 'remove_postgres_data.sh'"
