import { verificaTamanhoMinimoAtributo, verificaTamanhoMaximoAtributo } from "@/utils/verifica-atributos"

class Usuario {
    constructor(
        public nome: string = '',
        public senha: string = '',
        public email: string = '',
    ) { }
}

function verificarUsuario(usuario: Usuario): boolean {
    return verificarNomeUsuario(usuario) &&
        verificarEmailUsuario(usuario)
}

function verificarNomeUsuario(usuario: Usuario) {
    const minimo = 5
    const maximo = 50
    const nomeAtributo = 'Nome de usuário'

    return verificaTamanhoMinimoAtributo(nomeAtributo, usuario.nome, minimo) &&
        verificaTamanhoMaximoAtributo(nomeAtributo, usuario.nome, maximo)
}

function verificarEmailUsuario(usuario: Usuario): boolean {
    const minimo = 6
    const nomeAtributo = 'Email do usuário'

    return verificaTamanhoMinimoAtributo(nomeAtributo, usuario.nome, minimo)
}

export { Usuario, verificarUsuario }