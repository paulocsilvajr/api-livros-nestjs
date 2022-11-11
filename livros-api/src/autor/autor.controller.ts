import { Body, Controller, Delete, Get, InternalServerErrorException, NotAcceptableException, NotFoundException, Param, Post, Put } from "@nestjs/common";
import { QueryFailedError } from "typeorm";
import { AlteraAutorDto, CadastraAutorDto } from "./autor.dto";
import { Autor } from "./autor.entity";
import { AutorService } from "./autor.service";

@Controller('api/autores')
export class AutorController {

    constructor(private autorService: AutorService) {}

    @Get()
    public async buscaAutores(): Promise<Autor[]> {
        const autores = await this.autorService.buscaAutores();
        if (autores.length > 0)
            return autores;

        throw new NotFoundException('Não há autores cadastrados');
    }

    @Get(':id')
    public async buscaAutorPorId(@Param('id') idAutor: number): Promise<Autor> {
        return this.autorService.buscaAutorPorId(idAutor);
    }

    @Post()
    public async cadastraAutor(@Body() autor: CadastraAutorDto): Promise<Autor> {
        try {
            return await this.autorService.cadastraAutor(autor);
        } catch (error) {
            if (error instanceof QueryFailedError) {
                throw new NotAcceptableException(`Erro no banco de dados, JSON: {"nome": "nome do autor", "descricao": "descrição opcional, pode-se omitir"}. ERRO: ${error.message}`);
            } else if (error instanceof Error) {
                throw new InternalServerErrorException(error.message);
            }
        }
    }

    @Put(':id')
    public async alteraAutor(@Body() autor: AlteraAutorDto, @Param('id') idAutor: number): Promise<Autor> {
        return this.autorService.alteraAutor(idAutor, autor);
    }   

    @Delete(':id')
    public async removeAutor(@Param('id') idAutor: number) {
        return this.autorService.removeAutor(idAutor);
    }
}