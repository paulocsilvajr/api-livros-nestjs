import { MigrationInterface, QueryRunner } from "typeorm";

export class AdicionadoTimestamptzAosTiposDateDeTypeORMDeEntitiesLivroELivroUsuario1670416049816 implements MigrationInterface {
    name = 'AdicionadoTimestamptzAosTiposDateDeTypeORMDeEntitiesLivroELivroUsuario1670416049816'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "livro" DROP COLUMN "dataCompra"`);
        await queryRunner.query(`ALTER TABLE "livro" ADD "dataCompra" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "livro_usuario" DROP COLUMN "dataInicioLeitura"`);
        await queryRunner.query(`ALTER TABLE "livro_usuario" ADD "dataInicioLeitura" TIMESTAMP WITH TIME ZONE NOT NULL`);
        await queryRunner.query(`ALTER TABLE "livro_usuario" DROP COLUMN "dataFimLeitura"`);
        await queryRunner.query(`ALTER TABLE "livro_usuario" ADD "dataFimLeitura" TIMESTAMP WITH TIME ZONE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "livro_usuario" DROP COLUMN "dataFimLeitura"`);
        await queryRunner.query(`ALTER TABLE "livro_usuario" ADD "dataFimLeitura" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "livro_usuario" DROP COLUMN "dataInicioLeitura"`);
        await queryRunner.query(`ALTER TABLE "livro_usuario" ADD "dataInicioLeitura" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "livro" DROP COLUMN "dataCompra"`);
        await queryRunner.query(`ALTER TABLE "livro" ADD "dataCompra" TIMESTAMP NOT NULL DEFAULT now()`);
    }

}
