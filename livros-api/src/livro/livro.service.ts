import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AlteraLivroDto, CadastraLivroDto } from "./livro.dto";
import { Livro } from "./livro.entity";
import { AutorService } from "../autor/autor.service";

@Injectable()
export class LivroService {

    constructor(
        @InjectRepository(Livro) private livroRepository: Repository<Livro>,
        private autorService: AutorService,
    ) {}
    
    public async buscaLivros(): Promise<Livro[]> {
        return this.livroRepository.find({
            order: {
                id: 'ASC'
            }
        });
    }

    public async buscaLivrosComAutor(): Promise<Livro[]> {
        const query = this.livroRepository
            .createQueryBuilder('l')
            .orderBy()
            .innerJoinAndSelect('l.autor', 'a');
        const livros = await query.getMany();

        return livros;
    }
    
    public async buscaLivroPorId(idLivro: number): Promise<Livro> {
        const query = this.livroRepository
            .createQueryBuilder('l')
            .innerJoinAndSelect('l.autor', 'a')
            .where({ id: idLivro });
        const livroBanco = await query.getOne();

        this.verificaLivro(livroBanco, idLivro);
        
        return livroBanco;
    }
    
    public async cadastraLivro(livro: CadastraLivroDto): Promise<Livro> {
        const dataCompraConvertida = new Date(livro.dataCompra);

        const autor = await this.autorService.buscaAutorPorId(livro.autor);

        const livroNovo = new Livro({
            titulo: livro.titulo,
            autor: autor,
            resumo: livro.resumo,
            numeroPaginas: livro.numeroPaginas,
            dataCompra: dataCompraConvertida});
        
        return this.livroRepository.save(livroNovo);
    }
    
    public async alteraLivro(idLivro: number, livro: AlteraLivroDto): Promise<Livro> {
        const livroBanco = await this.buscaLivroPorId(idLivro);
        
        this.verificaLivro(livroBanco, idLivro);

        const autor = await this.autorService.buscaAutorPorId(livro.autor);

        const dataCompraConvertida = new Date(livro.dataCompra);

        livroBanco.titulo = livro.titulo;
        livroBanco.autor = autor;
        livroBanco.resumo = livro.resumo;
        livroBanco.numeroPaginas = livro.numeroPaginas;
        livroBanco.dataCompra = dataCompraConvertida;

        return this.livroRepository.save(livroBanco);
    }

    public async removeLivro(idLivro: number): Promise<void> {
        const livroBanco = await this.buscaLivroPorId(idLivro);
        
        this.verificaLivro(livroBanco, idLivro);

        await this.livroRepository.delete(idLivro);
    }

    private verificaLivro(livro: Livro, id: number) {
        if (!livro)
            throw new NotFoundException(`Livro com ID(${id}) informado não existe`)
    }
}
