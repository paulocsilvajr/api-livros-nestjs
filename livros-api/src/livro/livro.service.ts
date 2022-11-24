import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CadastraLivroDto } from "./livro.dto";
import { Livro } from "./livro.entity";
import { AutorService } from "../autor/autor.service";

@Injectable()
export class LivroService {

    constructor(
        @InjectRepository(Livro) private livroRepository: Repository<Livro>,
        private autorService: AutorService,
    ) {}
    
    // public async buscaLivros(): Promise<Livro[]> {
    //     return this.livroRepository.find();
    // }
    
    // public async buscaLivroPorId(idLivro: number): Promise<Livro> {
    //     return this.livroRepository.findOneBy({ id: idLivro });
    // }
    
    public async cadastraLivro(livro: CadastraLivroDto): Promise<Livro> {
        const dataCompraConvertida = new Date(livro.dataCompra);

        const autor = await this.autorService.buscaAutorPorId(livro.autor);

        console.log(livro);

        const livroNovo = new Livro({
            titulo: livro.titulo,
            autor: autor,
            resumo: livro.resumo,
            numeroPaginas: livro.numeroPaginas,
            dataCompra: dataCompraConvertida});
        
        return this.livroRepository.save(livroNovo);
    }
    
    // public async alteraLivro(idLivro: number, livroAlterado: Livro): Promise<Livro> {
    //     const livroEncontrado = await this.buscaLivroPorId(idLivro);
        
    //     if (!livroEncontrado)
    //         throw new NotFoundException(`Não existe um livro cadastrado com o id ${idLivro}`)

    //     livroEncontrado.altera(livroAlterado.nome, livroAlterado.autor, livroAlterado.numeroPaginas, livroAlterado.dataCompra, livroAlterado.lido);

    //     return this.livroRepository.save(livroEncontrado);
    // }

    // public async removeLivro(idLivro: number): Promise<void> {
    //     const livro = await this.buscaLivroPorId(idLivro);
    //     if (!livro)
    //         throw new NotFoundException(`Não existe um livro cadastrado com o id ${idLivro}`)

    //     await this.livroRepository.delete(idLivro);
    // }

    // public async alteraEstadoLivro(idLivro: number, estado: boolean): Promise<Livro> {
    //     var livroEncontrado = await this.buscaLivroPorId(idLivro);
    //     livroEncontrado.lido = estado

    //     return this.livroRepository.save(livroEncontrado);
    // }
}
