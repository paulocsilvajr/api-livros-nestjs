import { Body, ClassSerializerInterceptor, Controller, Get, InternalServerErrorException, NotAcceptableException, NotFoundException, Post, UseInterceptors } from "@nestjs/common";
import { QueryFailedError } from "typeorm";
import { CadastraLivroUsuarioDto } from "./livro-usuario.dto";
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

    @UseInterceptors(ClassSerializerInterceptor)
    @Get('/detalhado')
    public async buscaLivrosUsuariosDetalhado(): Promise<LivroUsuario[]> {
        const livrosUsuarios = await this.livroUsuarioService.buscaLivrosUsuariosDetalhado();
        if (livrosUsuarios.length > 0)
            return livrosUsuarios;
        
        throw new NotFoundException('Não há livros associados a usuários cadastrados');
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Post()
    public async cadastraLivroUsuario(@Body() livrousuario: CadastraLivroUsuarioDto): Promise<LivroUsuario> {
        try {
            return await this.livroUsuarioService.cadastraLivroUsuario(livrousuario);
        } catch (error) {
            if (error instanceof QueryFailedError) {
                throw new NotAcceptableException(error.message);
            } else if (error instanceof Error) {
                throw new InternalServerErrorException(error.message);
            }
        }
    }

}