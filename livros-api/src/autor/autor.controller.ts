import { Body, Controller, Delete, Get, InternalServerErrorException, NotAcceptableException, NotFoundException, Param, Post, Put, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { verificaArray } from "src/util/verifica-entidade";
import { QueryFailedError } from "typeorm";
import { AlteraAutorDto, CadastraAutorDto } from "./autor.dto";
import { Autor } from "./autor.entity";
import { AutorService } from "./autor.service";

@Controller('api/autores')
export class AutorController {

    constructor(private autorService: AutorService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    public async buscaAutores(): Promise<Autor[]> {
        const autores = await this.autorService.buscaAutores();

        verificaArray(autores, 'autores');

        return autores;
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    public async buscaAutorPorId(@Param('id') idAutor: number): Promise<Autor> {
        return this.autorService.buscaAutorPorId(idAutor);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    public async cadastraAutor(@Body() autor: CadastraAutorDto): Promise<Autor> {
        try {
            return await this.autorService.cadastraAutor(autor);
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
    public async alteraAutor(@Body() autor: AlteraAutorDto, @Param('id') idAutor: number): Promise<Autor> {
        return this.autorService.alteraAutor(idAutor, autor);
    }   

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    public async removeAutor(@Param('id') idAutor: number) {
        return this.autorService.removeAutor(idAutor);
    }
}