import { IFiltro } from "@/interfaces/IFiltro"
import { LivroJson } from "@/interfaces/ILivro"

class Livro implements IFiltro {
    constructor(
        public id: number = 0,
        public titulo: string = '',
        public autorId: number = 0,
        public resumo: string = '',
        public numeroPaginas: number = 1,
        public dataCompra: Date = new Date(),
    ) { }

    get filtro(): string {
        return this.titulo
    }

    public get dataCompraInput(): string {
        try {
            return this.dataCompra.toISOString().split('T')[0]
        } catch (error) {
            return ''
        }
    }

    public set dataCompraInput(data: string) {
        this.dataCompra = new Date(data)
    }

    static fromJson(livro: LivroJson): Livro {
        return new Livro(
            livro.id,
            livro.titulo,
            livro.autorId,
            livro.resumo,
            livro.numeroPaginas,
            new Date(livro.dataCompra)
        )
    }
}

export { Livro }