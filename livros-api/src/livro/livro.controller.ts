import { Body, Controller, Delete, Get, NotAcceptableException, NotFoundException, Param, Patch, Post, Put } from "@nestjs/common";
import { Livro } from "./livro.entity";
import { LivroService } from "./livro.service";

@Controller('api/livros')
export class LivroControler {
    
    constructor(private livroService: LivroService) {}
    
    // @Get()
    // public async buscaLivros(): Promise<Livro[]> {
    //     const livros = await this.livroService.buscaLivros();
    //     if (livros.length > 0)
    //         return livros
        
    //     throw new NotFoundException('Não há livros cadastrados')
    // }
    
    // @Get(':id')
    // public async buscaLivroPorId(@Param('id') idLivro: number): Promise<Livro> {
    //     const livro = await this.livroService.buscaLivroPorId(idLivro);
    //     if (!livro)
    //         throw new NotFoundException(`Não existe um livro cadastrado com o id ${idLivro}`)

    //     return livro;
    // }

    // @Post()
    // public async cadastraLivro(@Body() livro: Livro): Promise<Livro> {
    //     return this.livroService.cadastraLivro(livro);
    // }

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
}