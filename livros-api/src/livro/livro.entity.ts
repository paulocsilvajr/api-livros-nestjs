import { Autor } from "../autor/autor.entity";
import { LivroUsuario } from "../livro-usuario/livro-usuario.entity";
import { Column, CreateDateColumn, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

// https://typeorm.io/entities
@Entity()
@Index(['titulo', 'autor'], { unique: true })
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

    @CreateDateColumn({ type: 'timestamptz' })
    dataCompra: Date;

    @OneToMany(() => LivroUsuario, (livrosusuarios) => livrosusuarios.livro)
    livrosUsuarios: LivroUsuario[];

    constructor(partial: Partial<Livro>) {
        Object.assign(this, partial);
    }
}