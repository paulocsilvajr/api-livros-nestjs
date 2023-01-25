import LivroJson from "@/interfaces/livro-json"

class Livro {
    constructor(
        public id: number = 0,
        public titulo: string = '',
        public autorId: number = 0,
        public numeroPaginas: number = 1,
        public dataCompra: Date = new Date(),
        public lido: boolean = false
    ) { }

    public get dataCompraInput(): string {
        try {
            return this.dataCompra.toISOString().split('T')[0]
        } catch (error) {
            return ''
        }
    }

    static fromJson(livro: LivroJson): Livro {
        return new Livro(
            livro.id,
            livro.titulo,
            livro.autorId,
            livro.numeroPaginas,
            new Date(livro.dataCompra),
            livro.lido)
    }
}

export { Livro }

// import LivroJson from "@/interfaces/livro-json"

// public set dataCompraInput(data: string) {
//     this.dataCompra = new Date(data)
// }

// public copia(): Livro {
//     return new Livro(
//         this.id,
//         this.nome,
//         this.autor,
//         this.numeroPaginas,
//         this.dataCompra,
//         this.lido
//         )
// }

// static toJson(livro: Livro): string {
//     return JSON.stringify(livro)
// }