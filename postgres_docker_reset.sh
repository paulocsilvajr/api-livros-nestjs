#!/usr/bin/env bash

DIR=$(dirname $0)

$DIR/postgres_docker_down.sh &&
    $DIR/remove_postgres_data.sh
