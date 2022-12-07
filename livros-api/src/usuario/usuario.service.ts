import { Injectable, NotFoundException } from "@nestjs/common";
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
        const novoUsuario = await new Usuario(usuario).geraHashSenha();

        return this.usuarioRepository.save(novoUsuario);
    }

    public async buscaUsuarioPorNome(nome: string): Promise<Usuario> {
        const usuario = await this.usuarioRepository.findOneBy({ 'nome': nome });

        this.verificaUsuario(usuario, nome);

        return usuario;
    }

    public async buscaUsuarioPorEmail(email: string): Promise<Usuario> {
        const usuario = await this.usuarioRepository.findOneBy({ 'email': email });

        this.verificaUsuario(usuario, email);

        return usuario;
    } 

    private verificaUsuario(usuario: Usuario, identificacao: string) {
        if (!usuario)
            throw new NotFoundException(`Usuário com identificação(${identificacao}) informada não existe`);
    }
}