export class LivroDisponivel {
    id: number
    titulo: string
    resumo: string
    numeroPaginas: number
    dataCompra: Date
    autorId: number

    constructor(partial: Partial<LivroDisponivel>) {
        Object.assign(this, partial);
    }
}