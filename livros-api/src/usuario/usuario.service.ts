import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CadastraUsuarioDto } from "./usuario.dto";
import { Usuario } from "./usuario.entity";

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>,
    ) {}

    public async buscaUsuarios(): Promise<Usuario[]> {
        return this.usuarioRepository.find();
    }

    public async cadastraUsuario(usuario: CadastraUsuarioDto): Promise<Usuario> {
        const novoUsuario = new Usuario();
        novoUsuario.nome = usuario.nome;
        novoUsuario.email = usuario.email;
        novoUsuario.senha = usuario.senha;

        return this.usuarioRepository.save(novoUsuario);
    }
}