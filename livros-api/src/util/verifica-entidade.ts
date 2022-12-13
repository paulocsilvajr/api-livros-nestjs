import { NotFoundException } from "@nestjs/common"

function verifica(entidade: any, identificacao: any, msgIdentificacao: string) {
    if(!entidade)
        throw new NotFoundException(`${msgIdentificacao} com identificação '${identificacao}' informada não existe`)
}

function verificaArray(entidade: Array<any>, msgIdentificacao: string) {
    if (entidade.length <= 0)
        throw new NotFoundException(`Não há ${msgIdentificacao} cadastrados(as)`);
}

export { verifica, verificaArray }