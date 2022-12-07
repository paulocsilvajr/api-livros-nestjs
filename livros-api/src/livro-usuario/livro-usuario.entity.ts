import { Livro } from "../livro/livro.entity";
import { Usuario } from "../usuario/usuario.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class LivroUsuario {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Usuario, (usuario) => usuario.livrosUsuarios)
    usuario: Usuario;

    @ManyToOne(() => Livro, (livro) => livro.livrosUsuarios)
    livro: Livro;

    @Column({ type: 'timestamptz' })
    dataInicioLeitura: Date;

    @Column({ type: 'timestamptz', nullable: true })
    dataFimLeitura: Date;

    constructor(partial: Partial<LivroUsuario>) {
        Object.assign(this, partial);
    }
}