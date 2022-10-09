# API-LIVROS-NESTJS
## API desenvolvida em NestJS para cadastro de livros. Conexão com banco de dados PostgreSQL via docker-compose. Interface Web via VUE.js. Desenvolvido em Ubuntu22.04+ ou derivados.

Este repositório contém um API desenvolvida em [NestJS](https://nestjs.com/) para o cadastro de livros, um docker-compose configurado para criar um [container PostgreSQL](https://hub.docker.com/_/postgres), para salvar os dados, e uma interface web desenvolvida em [Vue.js](https://vuejs.org/) para cadastro dos livros.
O propósito deste repositório é o estudo dos frameworks apontados e a integração entre eles.
O repositório contém shell scripts para automatizar a tarefa de instalação dos frameworks citados e do container docker.


### Pré-requisitos

Instalar o **Node.js** com o *install_node_snap_ubuntu20.04+.sh* e instalar o **NestJS** com o script *install_nestjs-cli.sh*, se necessário. Scripts desenvolvidos para o *Ubuntu 22.04*+ ou derivados.

A pasta *livros-api* contém o projeto desenvolvido em **NestJS**:
- Para instalar as dependências, execute: `npm install`.
- Para iniciar a API, execute `npm run start` ou `npm run start:dev`. Obs: o banco de dados deve estar em execução para evitar erro de conexão.
- O arquivo *.env* possui variáveis de ambiente que configuram a conexão com o banco. Altere de acordo com a sua conexão com o banco. 
- API configurada para conexão como **PostgreSQL**. Para conectar com outro banco de dados, altere o nome do banco de dados no arquivo *src/app.module.ts*, na propriedade *type* de *TypeOrmModule*. Como a API foi desenvolvido com o [TypeORM](https://typeorm.io/), deve se adaptar a outros bancos de dados.
- Quando em execução, a API está disponível no endereço **http://localhost:3000**.

O arquivo *livros-api.postman_collection.json* contém testes efetuados via [Postman](https://www.postman.com/). Importe esse arquivo no Postman para visualizar os testes e criar novos.

Detalhes dos scripts *postgres_docker*:
- O script *postgres_docker_up.sh* cria as pastas *data* e *docker-entrypoint-initdb.d*, se não existirem, e inicia o conteiner *postgres-api-livros-nestjs* baseado no arquivo *docker-compose.yml*. A pasta *data* mantém a base de dados do PostgreSQL(volume Docker) e *docker-entrypoint-initdb.d* contém a definição do usuário *docker*(senha "masterkey") para o PostgreSQL e do banco de dados *livros*.
- O script *postgres_docker_down.sh* para a execução do conteiner e o script *postgres_docker_ps.sh* mostra o estado do conteiner.
- O script *postgres_docker_reset.sh* para o conteiner e remove a pasta *data*, resetando as informações do banco de dados.

A pasta *livros-vuejs* contém a interface web para cadastro de livros. Foi desenvolvida em **Vue.js**, usando um componente simples no proprio HTML da página, usando o *Bootstrap* e o *CND do Vue.js* como dependências.


### Licença

[Licença MIT](https://github.com/paulocsilvajr/api-livros-nestjs/blob/master/license_mit.txt), arquivo em anexo no repositório.


### Contato

Paulo Carvalho da Silva Junior - pauluscave@gmail.com
