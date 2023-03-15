--CREATE DATABASE livros;

CREATE TABLE IF NOT EXISTS usuario (
	nome VARCHAR(100) PRIMARY KEY NOT NULL,
	email VARCHAR(100) UNIQUE NOT NULL,
	senha VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS autor (
	id SERIAL PRIMARY KEY,
	nome VARCHAR(100) UNIQUE NOT NULL,
	descricao VARCHAR(255) NULL
);

CREATE TABLE IF NOT EXISTS livro (
	id SERIAL PRIMARY KEY,
	titulo VARCHAR(100) NOT NULL,
	autor_id INTEGER NOT NULL,
	numero_paginas INTEGER NOT NULL DEFAULT 1,
	resumo VARCHAR(255) NULL,
	data_compra DATE NULL DEFAULT now(),
	UNIQUE (titulo, autor_id),
	CONSTRAINT fk_autor
		FOREIGN KEY(autor_id) REFERENCES autor(id)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS livro_usuario (
	id SERIAL PRIMARY KEY,
	usuario_nome VARCHAR(100) NOT NULL,
	livro_id INTEGER NOT NULL,
	data_inicio_leitura TIMESTAMP NOT NULL,
	data_fim_leitura TIMESTAMP NULL,
	CONSTRAINT fk_usuario
		FOREIGN KEY(usuario_nome) REFERENCES usuario(nome)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
	CONSTRAINT fk_livro
		FOREIGN KEY(livro_id) REFERENCES livro(id)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);

--DROP table livro_usuario, livro, autor, usuario;

--INSERT INTO 
--	usuario(nome, email, senha) 
--VALUES
--	('usuario01', 'usuairo01@email.com', 'S3nh401'),
--	('usuario02', 'usuairo02@email.com', 'S3nh402'),
--	('usuario03', 'usuairo03@email.com', 'S3nh403'),
--	('usuario04', 'usuairo04@email.com', 'S3nh404'),
--	('usuario05', 'usuairo05@email.com', 'S3nh405');
--	
--INSERT INTO
--	autor(nome, descricao)
--VALUES
--	('Stephen King', NULL),
--	('Josten Garden', NULL),
--	('Douglas Adams', '42');
--	
--INSERT INTO
--	livro(titulo, autor_id, numero_paginas, data_compra)
--VALUES
--	('a coisa', 1, 1104, '20221109'),
--	('carrie', 1, 200, '20221001'),
--	('o mundo de sofia', 2, 568, '20220102'),
--	('o guia do mochileiro das galáxias', 3, 208, '20220304');
--
--INSERT INTO
--	livro(titulo, autor_id, numero_paginas, data_compra)
--VALUES
--	('o iluminado', 1, 464, '20221001'),
--	('doutor sono', 1, 480, '20221025');
--
--
--INSERT INTO
--	livro_usuario(usuario_nome, livro_id, data_inicio_leitura, data_fim_leitura)
--VALUES
--	('usuario01', 2, '20221109', null),
--	('usuario02', 1, '20221109', null);
	
SELECT * FROM usuario;

SELECT * FROM autor;

--CONSULTA DE LIVROS ORDENADOS POR ID DO AUTOR
SELECT
	l.id,
	l.titulo,
	l.numero_paginas,
	l.data_compra,
	l.resumo,
	l.autor_id,
	a.nome as autor
FROM
	livro l
INNER JOIN autor a ON l.autor_id = a.id
ORDER BY l.autor_id;

--CONSULTA DE LIVROS ASSOCIADOS À USUÁRIO
SELECT
	lu.id,
	u.nome AS usuario,
	l.titulo,
	a.nome,
	lu.data_inicio_leitura,
	lu.data_fim_leitura 
FROM
	livro_usuario lu
INNER JOIN usuario u ON lu.usuario_nome = u.nome
INNER JOIN livro l ON lu.livro_id = l.id
INNER JOIN autor a ON l.autor_id = a.id;

	
	
	
	
	
	
