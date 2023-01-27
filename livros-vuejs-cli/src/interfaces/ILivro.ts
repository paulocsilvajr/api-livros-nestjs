interface LivroJson {
    id: number;
    titulo: string;
    autorId: number;
    resumo: string;
    numeroPaginas: number;
    dataCompra: string;
}

interface LivroCadastro {
    titulo: string,
    autor: number,
    resumo: string,
    numeroPaginas: number,
    dataCompra: string,
}

export { LivroJson, LivroCadastro }