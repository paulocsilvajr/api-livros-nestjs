import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from "@nestjs/common";
import { Livro } from "./livro.entity";
import { LivroService } from "./livro.service";

@Controller('api/livros')
export class LivroControler {
    
    constructor(private livroService: LivroService) {}
    
    @Get()
    public buscaLivros(): Array<Livro> {
        return this.livroService.buscaLivros();
    }
    
    @Get(':id')
    public buscaLivroPorId(@Param('id') idLivro: number): Livro {
        return this.livroService.buscaLivroPorId(idLivro);
    }

    @Post()
    public cadastraLivro(@Body() livro: Livro): Livro {
        return this.livroService.cadastraLivro(livro);
    }

    @Put(':id')
    public alteraLivro(@Body() livro: Livro, @Param('id') idLivro: number): Livro {
        return this.livroService.alteraLivro(idLivro, livro);
    }

    @Patch(':id')
    public alteraEstadoLivro(@Body() body, @Param('id') idLivro: number): Livro {
        const estado: boolean = body.lido;
        
        return this.livroService.alteraEstadoLivro(idLivro, estado);
    }

    @Delete(':id')
    public removeLivro(@Param('id') idLivro: number) {
        return this.livroService.removeLivro(idLivro);
    }
}