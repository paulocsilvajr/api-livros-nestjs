export class TamanhoError extends Error {
    constructor(msg?: string) {
        if (!msg)
            msg = 'Tamanho incorreto'
                    
        super(msg)
    }
}