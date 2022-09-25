import { Injectable, NotFoundException } from "@nestjs/common";
import { Livro } from "./livro.entity";

@Injectable()
export class LivroService {
    private livros: Array<Livro> = [
        new Livro('Novembro de 63', 'Stephen King', 1056, new Date(2022, 1, 15), true),
        new Livro('1984', 'George Orwell', 482, new Date(2021, 11, 13), true),new Livro('Rápido e devagar: Duas formar de pensar', 'Daniel Kahneman', 746, new Date(2021, 7, 12), false)
    ];
    
    private contador: number = this.livros.length;
    
    public buscaLivros(): Array<Livro> {
        if (typeof this.livros !== 'undefined' && this.livros.length > 0)
        return this.livros;
        
        throw new NotFoundException('Não há livros cadastrados')
    }
    
    public buscaLivroPorId(idLivro: number): Livro {
        const livroEncontrado = this.livros.find(livro => livro.id == idLivro);
        if (typeof livroEncontrado !== 'undefined')
        return livroEncontrado
        
        throw new NotFoundException(`Não existe um livro cadastrado com o id ${idLivro}`)
    }
    
    public cadastraLivro(livro: Livro): Livro {
        const dataCompraConvertida = new Date(livro.dataCompra);
        const livroNovo = new Livro(livro.nome, livro.autor, livro.numeroPaginas, dataCompraConvertida, livro.lido);
        
        this.livros.push(livroNovo);
        
        return livroNovo;
    }
    
    public alteraLivro(idLivro: number, livroAlterado: Livro): Livro {
        const posicaoLivro = this.posicaoLivro(idLivro);
        
        this.livros[posicaoLivro].nome = livroAlterado.nome;
        this.livros[posicaoLivro].autor = livroAlterado.autor;
        this.livros[posicaoLivro].numeroPaginas = livroAlterado.numeroPaginas;
        this.livros[posicaoLivro].dataCompra = livroAlterado.dataCompra;
        this.livros[posicaoLivro].lido = livroAlterado.lido;
        
        return this.livros[posicaoLivro];
    }

    private posicaoLivro(idLivro: number): number {
        const posicaoLivro = this.livros.findIndex(livro => livro.id == idLivro);
        
        if (posicaoLivro == -1)
        throw new NotFoundException(`Livro com id ${idLivro} não existe`)
        
        return posicaoLivro; 
    }
    
    public removeLivro(idLivro: number) {
        const posicaoLivro = this.posicaoLivro(idLivro);
        
        if (posicaoLivro == -1)
            throw new NotFoundException(`Livro com id ${idLivro} não existe`);
        
        this.livros.splice(posicaoLivro, 1);
    }

    public alteraEstadoLivro(idLivro: number, estado: boolean): Livro {
        const posicaoLivro = this.posicaoLivro(idLivro);

        if (posicaoLivro == -1)
            throw new NotFoundException(`Livro com id ${idLivro}não existe`);
        
        this.livros[posicaoLivro].lido = estado;

        return this.livros[posicaoLivro];
    }
}
