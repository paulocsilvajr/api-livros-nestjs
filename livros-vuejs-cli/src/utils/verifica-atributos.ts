import { TamanhoError } from "@/errors/tamanho-error"

function verificaTamanhoMinimoAtributo(identificacao: string, valor: string, minimo: number) {
    const temTamanhoMinimo = valor.length >= minimo
    
    if (!temTamanhoMinimo)
        throw new TamanhoError(`${identificacao} não tem o tamanho mínimo de ${minimo} caracteres`)
    
    return true
}

function verificaTamanhoMaximoAtributo(identificacao: string, valor: string, maximo: number) {
    const temTamanhoMaximo = valor.length > maximo
    
    if (temTamanhoMaximo)
        throw new TamanhoError(`${identificacao} ultrapassou 0 tamanho máximo de ${maximo} caracteres`)
    
    return true
}

export { verificaTamanhoMinimoAtributo, verificaTamanhoMaximoAtributo }