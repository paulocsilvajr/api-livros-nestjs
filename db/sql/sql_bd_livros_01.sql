select
	lu.id,
	lu."livroId",
	l.titulo,
	lu."usuarioNome",
	lu."dataInicioLeitura",
	lu."dataFimLeitura"
from
	livro_usuario lu
right join livro l 
	on lu."livroId" = l.id;

select * from livro;

-- livros emprestados e não devolvidos
select
	l.id,
	l.titulo,
	lu."dataInicioLeitura",
	lu."dataFimLeitura"
from 
	livro l
left join livro_usuario lu 
	on l.id = lu."livroId"
where 
	lu."dataInicioLeitura" is not null and 
	lu."dataFimLeitura" is null;

-- livros emprestados e devolvidos
select
	l.id,
	l.titulo,
	lu."dataInicioLeitura",
	lu."dataFimLeitura"
from 
	livro l
left join livro_usuario lu 
	on l.id = lu."livroId"
where 
	lu."dataInicioLeitura" is not null and 
	lu."dataFimLeitura" is not null;

--  livros emprestados e não devolvidos - SOMENTE IDs
select
	l.id
from 
	livro l
left join livro_usuario lu 
	on l.id = lu."livroId"
where 
	lu."dataInicioLeitura" is not null and 
	lu."dataFimLeitura" is null;

-- Livros DISPONÍVEIS(não emprestados)
select
	l.id,
	l.titulo,
	l.resumo,
	l."numeroPaginas",
	l."dataCompra",
	l."autorId"
from 
	livro l
where
	l.id not in (
		select
			l.id
		from
			livro l
		left join livro_usuario lu 
			on l.id = lu."livroId"
		where
			lu."dataInicioLeitura" is not null and 
			lu."dataFimLeitura" is null
	);

-- View de livro_disponivel
create or replace view livro_disponivel as 
select
	l.id,
	l.titulo,
	l.resumo,
	l."numeroPaginas",
	l."dataCompra",
	l."autorId"
from 
	livro l
where
	l.id not in (
		select
			l.id
		from
			livro l
		left join livro_usuario lu 
			on l.id = lu."livroId"
		where
			lu."dataInicioLeitura" is not null and 
			lu."dataFimLeitura" is null
	);

-- remover view livro_disponivel
-- drop view livro_disponivel;

-- listagem livros com nome autor
select 
	l.*,
	a.nome
from
	livro l
inner join autor a 
	on l."autorId" = a.id;

-- contagem de registros em livro_usuario
select count(*) as "registros" from livro_usuario;

-- listagem livro_usuario com título do livro e nome do autor
select
	lu.*,
	l.titulo,
	a.id as "autorId",
	a.nome as "autor"
from
	livro_usuario lu
inner join livro l
	on lu."livroId" = l.id
inner join autor a
	on l."autorId" = a.id;

select * from livro_disponivel;
