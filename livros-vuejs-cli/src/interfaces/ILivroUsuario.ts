interface LivroUsuarioJson {
    id: number,
    usuarioNome: string,
    livroId: number,
    dataInicioLeitura: string,
    dataFimLeitura: string
}

interface LivroUsuarioCadastro {
    livro: number,
    usuario: string,
    dataInicioLeitura: string,
    dataFimLeitura?: string
}

export { LivroUsuarioJson, LivroUsuarioCadastro }