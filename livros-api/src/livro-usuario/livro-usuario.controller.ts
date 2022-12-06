import { Controller, Get, NotFoundException } from "@nestjs/common";
import { LivroUsuario } from "./livro-usuario.entity";
import { LivroUsuarioService } from "./livro-usuario.service";

@Controller('api/livrosusuarios')
export class LivroUsuarioController {

    constructor(private livroUsuarioService: LivroUsuarioService) {}

    @Get()
    public async buscaLivrosUsuarios(): Promise<LivroUsuario[]> {
        const livrosUsuarios = await this.livroUsuarioService.buscaLivrosUsuarios();
        if (livrosUsuarios.length > 0)
            return livrosUsuarios;
        
        throw new NotFoundException('Não há livros associados a usuários cadastrados');
    }

}