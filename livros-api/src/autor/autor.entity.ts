import { Livro } from "../livro/livro.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Autor {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    nome: string;

    @Column({ nullable: true })
    descricao: string;

    @OneToMany(() => Livro, (livro) => livro.autor)
    livros: Livro[]

    constructor(partial: Partial<Autor>) {
        Object.assign(this, partial);
    }
}