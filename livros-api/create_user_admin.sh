#!/usr/bin/env bash

URL='localhost:3000/api/usuarios'

curl --location --request POST $URL \
--header 'Content-Type: application/json' \
--data-raw '{
    "nome": "admin",
    "email": "admin@admin.com.br",
    "senha": "ADMINinstrador@312"
}'
