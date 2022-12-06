import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CadastraUsuarioDto } from "./usuario.dto";
import { Usuario } from "./usuario.entity";
import * as bcrypt from "bcryptjs";

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>,
    ) {}

    public async buscaUsuarios(): Promise<Usuario[]> {
        return this.usuarioRepository.find();
    }

    public async cadastraUsuario(usuario: CadastraUsuarioDto): Promise<Usuario> {
        const novoUsuario = new Usuario(usuario);

        const senhaHash = await bcrypt.hash(usuario.senha, 10);
        novoUsuario.senha = senhaHash;

        return this.usuarioRepository.save(novoUsuario);
    }

    public async buscaUsuarioPorNome(nome: string): Promise<Usuario> {
        return this.usuarioRepository.findOneBy({ 'nome': nome });
    }

    public async buscaUsuarioPorEmail(email: string): Promise<Usuario> {
        return this.usuarioRepository.findOneBy({ 'email': email });
    } 
}