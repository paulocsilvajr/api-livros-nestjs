export default class Livro {

    constructor(
        public id: number = 0,
        public nome: string = '',
        public autor: string = '',
        public numeroPaginas: number = 0,
        public dataCompra: Date = new Date(),
        public lido: boolean = false
        ) {}
}