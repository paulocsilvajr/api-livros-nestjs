import { LivroUsuario } from "../livro-usuario/livro-usuario.entity";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Exclude } from 'class-transformer';
import * as bcrypt from "bcryptjs";

@Entity()
export class Usuario {
    @PrimaryColumn()
    nome: string;

    @Column({ unique: true })
    email: string;

    @Exclude()
    @Column()
    senha: string;

    @OneToMany(() => LivroUsuario, (livrosusuarios) => livrosusuarios.usuario)
    livrosUsuarios: LivroUsuario[];

    constructor(partial: Partial<Usuario>) {
        Object.assign(this, partial);
    }

    async geraHashSenha() {
        const senhaHash = await bcrypt.hash(this.senha, 10);
        this.senha = senhaHash;
        return this
    }
}