import { Body, Controller, Delete, Get, InternalServerErrorException, NotAcceptableException, NotFoundException, Param, Patch, Post, Put } from "@nestjs/common";
import { verificaArray } from "src/util/verifica-entidade";
import { QueryFailedError } from "typeorm";
import { AlteraLivroDto, CadastraLivroDto } from "./livro.dto";
import { Livro } from "./livro.entity";
import { LivroService } from "./livro.service";

@Controller('api/livros')
export class LivroControler {
    
    constructor(private livroService: LivroService) {}
    
    @Get()
    public async buscaLivros(): Promise<Livro[]> {
        const livros = await this.livroService.buscaLivros();

        verificaArray(livros, 'livros');

        return livros;
    }

    @Get('/autor')
    public async buscaLivrosComAutor(): Promise<Livro[]> {
        const livros = await this.livroService.buscaLivrosComAutor();
        
        verificaArray(livros, 'livros');

        return livros;
    }
    
    @Get(':id')
    public async buscaLivroPorId(@Param('id') idLivro: number): Promise<Livro> {
        return this.livroService.buscaLivroPorId(idLivro);
    }

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

    @Put(':id')
    public async alteraLivro(@Body() livro: AlteraLivroDto, @Param('id') idLivro: number): Promise<Livro> {
        return this.livroService.alteraLivro(idLivro, livro);
    }

    @Delete(':id')
    public async removeLivro(@Param('id') idLivro: number) {
        return this.livroService.removeLivro(idLivro);
    }
}