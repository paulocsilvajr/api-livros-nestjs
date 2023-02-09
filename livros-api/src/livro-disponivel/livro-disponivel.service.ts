import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { LivroDisponivel } from "./livro-disponivel.entity";

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

        return livrosDisponiveisBanco
    }
}