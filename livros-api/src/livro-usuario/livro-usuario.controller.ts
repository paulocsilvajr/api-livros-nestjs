import { Body, ClassSerializerInterceptor, Controller, Get, InternalServerErrorException, NotAcceptableException, NotFoundException, Param, Post, UseInterceptors } from "@nestjs/common";
import { verificaArray } from "src/util/verifica-entidade";
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

        verificaArray(livrosUsuarios, 'livros associados a usuários');

        return livrosUsuarios;
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get('/detalhado')
    public async buscaLivrosUsuariosDetalhado(): Promise<LivroUsuario[]> {
        const livrosUsuarios = await this.livroUsuarioService.buscaLivrosUsuariosDetalhado();

        verificaArray(livrosUsuarios, 'livros associados a usuários');

        return livrosUsuarios;
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get(':id')
    public async buscaLivroUsuarioPorId(@Param('id') idLivroUsuario: number): Promise<LivroUsuario> {
        return this.livroUsuarioService.buscaLivroUsuarioPorId(idLivroUsuario);
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