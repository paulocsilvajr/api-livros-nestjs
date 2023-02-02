import { MigrationInterface, QueryRunner } from "typeorm"

export class adicionaViewLivroDisponivel1675364723996 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
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
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            drop view livro_disponivel;
        `)
    }

}
