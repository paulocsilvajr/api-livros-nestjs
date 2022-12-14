import { Body, Controller, Delete, Get, InternalServerErrorException, NotAcceptableException, NotFoundException, Param, Patch, Post, Put, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { verificaArray } from "src/util/verifica-entidade";
import { QueryFailedError } from "typeorm";
import { AlteraLivroDto, CadastraLivroDto } from "./livro.dto";
import { Livro } from "./livro.entity";
import { LivroService } from "./livro.service";

@Controller('api/livros')
export class LivroControler {
    
    constructor(private livroService: LivroService) {}
    
    @UseGuards(JwtAuthGuard)
    @Get()
    public async buscaLivros(): Promise<Livro[]> {
        const livros = await this.livroService.buscaLivros();

        verificaArray(livros, 'livros');

        return livros;
    }

    @UseGuards(JwtAuthGuard)
    @Get('/autor')
    public async buscaLivrosComAutor(): Promise<Livro[]> {
        const livros = await this.livroService.buscaLivrosComAutor();
        
        verificaArray(livros, 'livros');

        return livros;
    }
    
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    public async buscaLivroPorId(@Param('id') idLivro: number): Promise<Livro> {
        return this.livroService.buscaLivroPorId(idLivro);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    public async cadastraLivro(@Body() livro: CadastraLivroDto): Promise<Livro> {
        try {
            return await this.livroService.cadastraLivro(livro);
        } catch (error) {
            if (error instanceof QueryFailedError) {
                throw new NotAcceptableException(error.message);
            } else if (error instanceof Error) {
                throw new InternalServerErrorException(error.message);
            }
        }
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    public async alteraLivro(@Body() livro: AlteraLivroDto, @Param('id') idLivro: number): Promise<Livro> {
        return this.livroService.alteraLivro(idLivro, livro);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    public async removeLivro(@Param('id') idLivro: number) {
        return this.livroService.removeLivro(idLivro);
    }
}