#!/usr/bin/env bash

if [ $# -eq 0 ]; then
    echo "Informe o nome da Migration com parâmetro"
    exit 1
fi

parametros="$@"
nome_migration="${parametros// /_}" # substituição de espaços( ) por underline(_)

npm run typeorm:generate-migration --name=$nome_migration