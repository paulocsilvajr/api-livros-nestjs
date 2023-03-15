import { IFiltro } from "@/interfaces/IFiltro";
import ILivroDisponivel from "@/interfaces/ILivroDisponivel"

export class LivroDisponivel implements IFiltro {
    constructor(
        public id: number = 0,
        public titulo: string = "",
        public resumo: string = "",
        public numeroPaginas: number = 0,
        public dataCompra: Date = new Date(),
        public autorId: number = 0
    ) { }

    get filtro(): string {
        return this.titulo
    }

    toJson(): ILivroDisponivel {
        return {
            id: this.id,
            titulo: this.titulo,
            resumo: this.resumo,
            numeroPaginas: this.numeroPaginas,
            dataCompra: this.dataCompra,
            autorId: this.autorId
        }
    }

    fromJson(livroDisponivel: ILivroDisponivel): LivroDisponivel {
        this.id = livroDisponivel.id
        this.titulo = livroDisponivel.titulo
        this.resumo = livroDisponivel.resumo
        this.numeroPaginas = livroDisponivel.numeroPaginas
        this.dataCompra = livroDisponivel.dataCompra
        this.autorId = livroDisponivel.autorId

        return this
    }
}