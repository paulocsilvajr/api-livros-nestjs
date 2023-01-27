interface LivroJson {
    id: number;
    titulo: string;
    autorId: number;
    resumo: string;
    numeroPaginas: number;
    dataCompra: string;
}

interface LivroCadastroAlteracao {
    id: number,
    titulo: string,
    autor: number,
    resumo: string,
    numeroPaginas: number,
    dataCompra: string,
}

export { LivroJson, LivroCadastroAlteracao }