import { Body, Controller, Get, NotAcceptableException, NotFoundException, Post } from "@nestjs/common";
import { QueryFailedError } from "typeorm";
import { CadastraAutorDto } from "./autor.dto";
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

    @Post()
    public async cadastraAutor(@Body() autor: CadastraAutorDto): Promise<Autor> {
        try {
            return await this.autorService.cadastraAutor(autor);
        } catch (error) {
            if (error instanceof QueryFailedError) {
                throw new NotAcceptableException(`Autor informado inválido[${error.message}]`);
            }
        }
    }
}