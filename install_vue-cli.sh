#!/usr/bin/env bash

npm install -g @vue/cli &&
    echo "vue/cli version: $(vue --version)" ||
    echo "Algum problema ocorreu na instalação do vue/cli. Se for problema de permissão, execute esse script como root"
