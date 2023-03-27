#!/usr/bin/env bash

# Ativado proxy em http-server para que as rotas funcionem ao recarregar(F5) as páginas
# fonte: https://stackoverflow.com/questions/69143139/how-do-i-configure-http-server-for-history-mode-in-vue-js-2
http-server -P http://localhost:8080? dist


# Para ativar esse recurso no Apache, Nginx e outros, siga os exemplos do link abaixo:
# https://v3.router.vuejs.org/guide/essentials/history-mode.html#example-server-configurations
