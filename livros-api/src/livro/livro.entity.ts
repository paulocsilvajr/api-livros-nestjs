import { Autor } from "../autor/autor.entity";
import { LivroUsuario } from "../livro-usuario/livro-usuario.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

// https://typeorm.io/entities
@Entity()
export class Livro {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    titulo: string;

    @ManyToOne(() => Autor, (autor) => autor.livros)
    autor: Autor;

    @Column({ nullable: true })
    resumo: string;

    @Column({ default: 1 })
    numeroPaginas: number;

    @Column({ default: new Date() })
    dataCompra: Date;

    @OneToMany(() => LivroUsuario, (livrosusuarios) => livrosusuarios.livro)
    livrosUsuarios: LivroUsuario[];

    // constructor(titulo: string, autor: Autor, resumo: string, numeroPagina: number, dataCompra: Date) {
    //     this.titulo = titulo;
    //     this.autor = autor;
    //     this.numeroPaginas = numeroPagina;
    //     this.dataCompra = dataCompra;
    // }

    // altera(titulo: string, autor: Autor, numeroPagina: number, dataCompra: Date) {
    //     this.titulo = titulo;
    //     this.autor = autor;
    //     this.numeroPaginas = numeroPagina;
    //     this.dataCompra = dataCompra;
    // }
}