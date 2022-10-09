import LivroJson from "@/interfaces/livro-json"

export default class Livro {
    constructor(
        public id: number = 0,
        public nome: string = '',
        public autor: string = '',
        public numeroPaginas: number = 1,
        public dataCompra: Date = new Date(),
        public lido: boolean = false
    ) { }

    public set dataCompraInput(data: string) {
        this.dataCompra = new Date(data)
    }

    public get dataCompraInput(): string {
        try {
            return this.dataCompra.toISOString().split('T')[0]
        } catch (error) {
            return ''
        }
    }

    public copia(): Livro {
        return new Livro(
            this.id,
            this.nome,
            this.autor,
            this.numeroPaginas,
            this.dataCompra,
            this.lido
            )
    }

    static fromJson(livro: LivroJson): Livro {
        return new Livro(
            livro.id,
            livro.nome,
            livro.autor,
            livro.numeroPaginas,
            new Date(livro.dataCompra),
            livro.lido)
    }

    static toJson(livro: Livro): string {
        return JSON.stringify(livro)
    }
}