#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
	CREATE USER docker PASSWORD 'masterkey';
	CREATE DATABASE livros;
	GRANT ALL PRIVILEGES ON DATABASE livros TO docker;
EOSQL
