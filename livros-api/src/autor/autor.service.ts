import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AlteraAutorDto, CadastraAutorDto } from "./autor.dto";
import { Autor } from "./autor.entity";

@Injectable()
export class AutorService {
    constructor(
        @InjectRepository(Autor) private autorRepository: Repository<Autor>,
    ) { }

    public async buscaAutores(): Promise<Autor[]> {
        return this.autorRepository.find({
            order: {
                id: 'ASC'
            }
        });
    }

    public async buscaAutorPorId(id: number): Promise<Autor> {
        const autorBanco = await this.autorRepository.findOneBy({ id });
        console.log(autorBanco);
        if (!autorBanco)
            throw new NotFoundException(`Autor com ID(${id}) informado não existe`);

        return autorBanco;
    }

    public async cadastraAutor(autor: CadastraAutorDto): Promise<Autor> {
        const novoAutor = new Autor(autor);

        return this.autorRepository.save(novoAutor);
    }

    public async alteraAutor(id: number, autor: AlteraAutorDto): Promise<Autor> {
        const autorBanco = await this.buscaAutorPorId(id);

        autorBanco.nome = autor.nome;
        autorBanco.descricao = autor.descricao;

        return this.autorRepository.save(autorBanco);
    }

    public async removeAutor(id: number): Promise<void> {
        const autorBanco = await this.buscaAutorPorId(id);

        const result = await this.autorRepository.delete({ id });
        console.log(result);
    }

}