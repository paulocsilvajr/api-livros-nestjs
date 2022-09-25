import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// https://typeorm.io/entities
@Entity()
export class Livro {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column({ nullable: true })
    autor: string;

    @Column()
    numeroPaginas: number;

    @Column({ default: new Date() })
    dataCompra: Date;

    @Column()
    lido: boolean;

    constructor(nome: string, autor: string, numeroPagina: number, dataCompra: Date, lido: boolean) {
        this.nome = nome;
        this.autor = autor;
        this.numeroPaginas = numeroPagina;
        this.dataCompra = dataCompra;
        this.lido = lido;
    }

    altera(nome: string, autor: string, numeroPagina: number, dataCompra: Date, lido: boolean) {
        this.nome = nome;
        this.autor = autor;
        this.numeroPaginas = numeroPagina;
        this.dataCompra = dataCompra;
        this.lido = lido;
    }
}