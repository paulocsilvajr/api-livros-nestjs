import { MigrationInterface, QueryRunner } from "typeorm";

export class tabelasIniciaisAutorLivroUsuarioLivrousuario1669298893842 implements MigrationInterface {
    name = 'tabelasIniciaisAutorLivroUsuarioLivrousuario1669298893842'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "autor" ("id" SERIAL NOT NULL, "nome" character varying NOT NULL, "descricao" character varying, CONSTRAINT "UQ_f89c2b0b39675e5b481bdfbbc7a" UNIQUE ("nome"), CONSTRAINT "PK_51d3959df48c82010ae1c4907fb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "livro" ("id" SERIAL NOT NULL, "titulo" character varying NOT NULL, "resumo" character varying, "numeroPaginas" integer NOT NULL DEFAULT '1', "dataCompra" TIMESTAMP NOT NULL DEFAULT '"2022-11-24T14:08:17.200Z"', "autorId" integer, CONSTRAINT "PK_5601163ea69da49108c4f7854cf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_f3c07f0aa1c1f2c009bcc709b2" ON "livro" ("titulo", "autorId") `);
        await queryRunner.query(`CREATE TABLE "livro_usuario" ("id" SERIAL NOT NULL, "dataInicioLeitura" TIMESTAMP NOT NULL, "dataFimLeitura" TIMESTAMP, "usuarioNome" character varying, "livroId" integer, CONSTRAINT "PK_676043806ff270d93e77a592556" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "usuario" ("nome" character varying NOT NULL, "email" character varying NOT NULL, "senha" character varying NOT NULL, CONSTRAINT "UQ_2863682842e688ca198eb25c124" UNIQUE ("email"), CONSTRAINT "PK_aa7d78895f0998f84649d3902c3" PRIMARY KEY ("nome"))`);
        await queryRunner.query(`ALTER TABLE "livro" ADD CONSTRAINT "FK_d591802ea54b1c8a09abeb80cec" FOREIGN KEY ("autorId") REFERENCES "autor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "livro_usuario" ADD CONSTRAINT "FK_6ab562fece1710bd60efef6e22d" FOREIGN KEY ("usuarioNome") REFERENCES "usuario"("nome") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "livro_usuario" ADD CONSTRAINT "FK_fb7259dec74f7d1224d50f588bf" FOREIGN KEY ("livroId") REFERENCES "livro"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "livro_usuario" DROP CONSTRAINT "FK_fb7259dec74f7d1224d50f588bf"`);
        await queryRunner.query(`ALTER TABLE "livro_usuario" DROP CONSTRAINT "FK_6ab562fece1710bd60efef6e22d"`);
        await queryRunner.query(`ALTER TABLE "livro" DROP CONSTRAINT "FK_d591802ea54b1c8a09abeb80cec"`);
        await queryRunner.query(`DROP TABLE "usuario"`);
        await queryRunner.query(`DROP TABLE "livro_usuario"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f3c07f0aa1c1f2c009bcc709b2"`);
        await queryRunner.query(`DROP TABLE "livro"`);
        await queryRunner.query(`DROP TABLE "autor"`);
    }

}
