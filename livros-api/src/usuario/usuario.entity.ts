import { LivroUsuario } from "../livro-usuario/livro-usuario.entity";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

@Entity()
export class Usuario {
    @PrimaryColumn()
    nome: string;

    @Column({ unique: true })
    email: string;

    @Column()
    senha: string;

    @OneToMany(() => LivroUsuario, (livrosusuarios) => livrosusuarios.usuario)
    livrosUsuarios: LivroUsuario[];
}