import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CadastraAutorDto } from "./autor.dto";
import { Autor } from "./autor.entity";

@Injectable()
export class AutorService {
    constructor(
        @InjectRepository(Autor) private autorRepository: Repository<Autor>,
    ) {}

    public async buscaAutores(): Promise<Autor[]>
    {
        return this.autorRepository.find();
    }

    public async cadastraAutor(autor: CadastraAutorDto): Promise<Autor> {
        const novoAutor = new Autor(autor);

        return this.autorRepository.save(novoAutor);
    }
}