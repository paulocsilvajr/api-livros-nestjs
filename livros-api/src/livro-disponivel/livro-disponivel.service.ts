import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { Livro } from "src/livro/livro.entity";
import { DataSource } from "typeorm";
import { LivroDisponivel } from "./livro-disponivel.entity";
import { verificaArray, verificaNaoDisponivel } from "src/util/verifica-entidade";

@Injectable()
export class LivroDisponivelService {
    constructor(
        @InjectDataSource() private readonly dataSource: DataSource
    ) {}

    public async buscaLivrosDisponiveis(): Promise<LivroDisponivel[]> {
        const livrosDisponiveisBanco = await this.dataSource.query(`
            select 
                id,
                titulo,
                resumo,
                "numeroPaginas",
                "dataCompra",
                "autorId"
            from
                livro_disponivel;
        `)

        verificaArray(livrosDisponiveisBanco, 'livros disponíveis')

        return livrosDisponiveisBanco
    }

    public async buscaLivroDisponivelPorId(id: number): Promise<Livro> {
        const livroDisponivelBanco = await this.dataSource.query(`
        select 
            id,
            titulo,
            resumo,
            "numeroPaginas",
            "dataCompra",
            "autorId"
        from
            livro_disponivel
        where
            id = ${id}
        `)

        verificaNaoDisponivel(livroDisponivelBanco, id, 'Livro');

        return livroDisponivelBanco[0]
    }
}