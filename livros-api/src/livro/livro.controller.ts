import { Body, Controller, Delete, Get, InternalServerErrorException, NotAcceptableException, NotFoundException, Param, Patch, Post, Put } from "@nestjs/common";
import { QueryFailedError } from "typeorm";
import { CadastraLivroDto } from "./livro.dto";
import { Livro } from "./livro.entity";
import { LivroService } from "./livro.service";

@Controller('api/livros')
export class LivroControler {
    
    constructor(private livroService: LivroService) {}
    
    @Get()
    public async buscaLivros(): Promise<Livro[]> {
        const livros = await this.livroService.buscaLivros();

        return this.verificaLivros(livros);
    }

    @Get('/autor')
    public async buscaLivrosComAutor(): Promise<Livro[]> {
        const livros = await this.livroService.buscaLivrosComAutor();
        
        return this.verificaLivros(livros);
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

    // @Put(':id')
    // public async alteraLivro(@Body() livro: Livro, @Param('id') idLivro: number): Promise<Livro> {
    //     return this.livroService.alteraLivro(idLivro, livro);
    // }

    // @Patch(':id')
    // public async alteraEstadoLivro(@Body() body, @Param('id') idLivro: number): Promise<Livro> {
    //     if (typeof body.lido !== 'boolean')
    //         throw new NotAcceptableException('JSON informado em corpo da requisição inválido')

    //     const estado: boolean = body.lido;
        
    //     return this.livroService.alteraEstadoLivro(idLivro, estado);
    // }

    // @Delete(':id')
    // public async removeLivro(@Param('id') idLivro: number) {
    //     return this.livroService.removeLivro(idLivro);
    // }

    private verificaLivros(livros: Livro[]): Livro[] {
        if (livros.length > 0)
            return livros
        
        throw new NotFoundException('Não há livros cadastrados')
    }
}