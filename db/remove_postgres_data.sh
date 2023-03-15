#!/usr/bin/env bash

DIR=$(dirname $0)

read -p "Deseja realmente remover toda a base de dados? [sN] " confirmacao

case $confirmacao in
    s|sim|Sim|SIM)
        sudo rm -vrf ${DIR}/data
        ;;
    *)
        echo "Base de dados foi mantida"
        ;;
esac

