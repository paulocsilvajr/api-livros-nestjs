#!/usr/bin/env bash

npm install -g @nestjs/cli &&
    echo "nest version: $(nest -v)" ||
    echo "Algum problema ocorreu na instalação do nestjs. Se for problema de permissão, execute esse script como root"
