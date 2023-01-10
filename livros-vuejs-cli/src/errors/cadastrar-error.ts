export class CadastrarError extends Error {
    constructor(entidade: string, msg?: string) {
        if (!msg)
            msg = `Erro no cadastro de ${entidade}`
        else
            msg = `${entidade}: ${msg}`
        
        super(msg)
    }
}