import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { LivroUsuario } from "./livro-usuario.entity";

@Injectable()
export class LivroUsuarioService {
    constructor(
        @InjectRepository(LivroUsuario) private livroUsuarioRepository: Repository<LivroUsuario>,
    ) {}

    public async buscaLivrosUsuarios(): Promise<LivroUsuario[]> {
        return this.livroUsuarioRepository.find();
    }
}