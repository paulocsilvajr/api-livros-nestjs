export class Livro {
    public id: number;
    public nome: string;
    public autor: string;
    public numeroPaginas: number;
    public dataCompra: Date;
    public lido: boolean;

    private static contador: number = 0;

    constructor(nome: string, autor: string, numeroPagina: number, dataCompra: Date, lido: boolean) {
        this.id = this.proximoId()
        this.nome = nome;
        this.autor = autor;
        this.numeroPaginas = numeroPagina;
        this.dataCompra = dataCompra;
        this.lido = lido;
    }

    private proximoId(): number {
        Livro.contador += 1;
        return Livro.contador;
    }
}