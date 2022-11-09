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

    @Column()
    dataInicioLeitura: Date;

    @Column({ nullable: true })
    dataFimLeitura: Date;
}