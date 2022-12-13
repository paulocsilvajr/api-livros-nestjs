import { Body, ClassSerializerInterceptor, Controller, Delete, Get, InternalServerErrorException, NotAcceptableException, NotFoundException, Param, Post, Put, UseInterceptors } from "@nestjs/common";
import { verificaArray } from "src/util/verifica-entidade";
import { QueryFailedError } from "typeorm";
import { AlteraLivroUsuarioDto, CadastraLivroUsuarioDto } from "./livro-usuario.dto";
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

    @Get('/livro/:id')
    public async buscaLivrosUsuariosPorLivro(@Param('id') idLivro: number): Promise<LivroUsuario[]> {
        const livrosUsuarios = await this.livroUsuarioService.buscaLivrosUsuariosPorLivro(idLivro);

        verificaArray(livrosUsuarios, 'livros associados a usuários');

        return livrosUsuarios;
    }

    @Get('/usuario/:nome')
    public async buscaLivrosUsuariosPorUsuario(@Param('nome') nomeUsuario: string): Promise<LivroUsuario[]> {
        const livrosUsuarios = await this.livroUsuarioService.buscaLivrosUsuariosPorUsuario(nomeUsuario);

        verificaArray(livrosUsuarios, 'livros associados a usuários');

        return livrosUsuarios;
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

    @UseInterceptors(ClassSerializerInterceptor)
    @Put(':id')
    public async alteraLivroUsuario(@Body() livroUsuario: AlteraLivroUsuarioDto, @Param('id') idLivroUsuario: number): Promise<LivroUsuario> {
        return this.livroUsuarioService.alteraLivroUsuario(idLivroUsuario, livroUsuario);
    }

    @Delete(':id')
    public async removeLivroUsuario(@Param('id') idLivroUsuario: number) {
        return this.livroUsuarioService.removeLivroUsuario(idLivroUsuario);
    }
}