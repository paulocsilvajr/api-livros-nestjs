# API-LIVROS-NESTJS
## API desenvolvida em NestJS para gerenciamento(cadastro e emprestimo) de livros. Conexão com banco de dados PostgreSQL via docker-compose. Interface Web via VUE.js. Desenvolvido em Ubuntu22.04+ ou derivados.

Este repositório contém uma API desenvolvida em [NestJS](https://nestjs.com/) para o gerenciamento de livros, um docker-compose configurado para criar um [conteiner PostgreSQL](https://hub.docker.com/_/postgres), para salvar a base de dados, e uma interface web desenvolvida em [Vue.js](https://vuejs.org/) para gerenciamento dos livros.
O propósito deste repositório é o estudo dos frameworks apontados e a integração entre eles.
O repositório contém shell scripts para automatizar a tarefa de instalação dos frameworks citados e de conteiners via docker.


### Pré-requisitos:

- Instalar o **Node.js** com o script *install_node_snap_ubuntu20.04+.sh* e instalar o **NestJS** com o script *install_nestjs-cli.sh*, se necessário.
- Instalar o **Docker** e **docker-compose** com o comando `sudo apt install docker.io docker-compose docker-doc` em Distribuição Linux baseadas no Ubuntu22.04+.
- Scripts desenvolvidos para o *Ubuntu 22.04*+ ou derivados.


### Docker-compose para o banco de dados PostgreSQL

Detalhes dos scripts em *db/*:
- O script *postgres_docker_up.sh* cria a pasta *data*, se não existir, e inicia o projeto *postgres-api-livros-nestjs* baseado no arquivo *docker-compose.yml*. A pasta *data* mantém a base de dados do PostgreSQL(volume Docker) e *docker-entrypoint-initdb.d* contém a definição do usuário *docker*(senha "masterkey") para o PostgreSQL e do banco de dados *livros*.
- O script *postgres_docker_ps.sh* mostra o estado do conteiner.
- O script *postgres_docker_down.sh* para a execução do conteiner. Ao executar esse script, é gerado um backup na pasta *backup*, montada dentro do conteiner(/backup), e depois é finalizado o conteiner.
- O script *postgres_docker_reset.sh* para o conteiner e remove a pasta *data*, resetando as informações do banco de dados.
- A pasta *backup* contém um script para fazer o backup(plain text) do banco de dados Livros. Esses backups são armazenados nesta pasta com o formato *YYYY-MM-DD_backup_db_livros.dump*.
- Quando em execução, a Base de Dados em Postgres está disponível no endereço **http://localhost:25432**.


### API em NestJS

A pasta *livros-api* contém a API do projeto desenvolvido em **NestJS**:
- Para instalar as dependências, execute: `npm install`.
- O arquivo *.env* possui variáveis de ambiente que configuram a conexão com o banco. Altere de acordo com a sua conexão com o banco. 
- API desenvolvida para conexão como **PostgreSQL** via [TypeORM](https://typeorm.io/). Foi utilizado migrations para criar a estrutura do banco e tabelas.
- Antes da primeira execução da API, deve-se executar o script `migration_run.sh` para criar a estrutura das tabelas e views definidas via migration. Para isso, o banco de dados Postgres via Docker deve estar rodando e a conexão ao banco deve estar correta no arquivo .env.
- Para iniciar a API, execute `npm run start` ou `npm run start:dev`. Obs: o banco de dados deve estar em execução para evitar erro de conexão.
- O script *create_user_admin.sh* cria um usuário inicial para acessar a interface WEB. Visualize esse arquivo para obter a senha do usuário *"admin"*. A API deve estar em execução para executar esse script.
- Quando em execução, a API está disponível no endereço **http://localhost:3000**.

O arquivo *livros-api.postman_collection.json* contém testes efetuados via [Postman](https://www.postman.com/). Importe esse arquivo no Postman para visualizar os testes e criar novos. Crie um *Environment* com a variável *token* para armazenar o token usado nas requisição.


### Interface WEB em Vue.js

A pasta *livros-vuejs-cli* contém a interface web desenvolvida em **Vue.js** a partir de um projeto gerado pelo CLI do Vuejs:
- Para testar essa aplicação, com o Node instalado, execute *npm install* para instalar todas as dependências.
- Use o script *run-serve.sh* para testar no modo desenvolvimento ou compile com o script *run-build.sh* para gerar a aplicação final na pasta *build*. Para rodar a interface WEB, o banco de dados e a API devem estar rodando.
- O script *install_http-server.sh* instala um servidor HTTP em Node para rodar a interface web. Use o script *run-server-http_dist.sh* para rodar o interface web que está na pasta *dist*.
- Na interface WEB é possível cadastrar um novo usuário já na tela inicial, gerenciar livros e autores e emprestar/devolver livros.
- Quando em execução, a interface WEB está disponível no endereço **http://localhost:8080**.


### Licença

[Licença MIT](https://github.com/paulocsilvajr/api-livros-nestjs/blob/master/license_mit.txt), arquivo em anexo no repositório.


### Contato

Paulo Carvalho da Silva Junior - pauluscave@gmail.com
