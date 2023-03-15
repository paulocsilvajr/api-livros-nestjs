export class NaoAutorizadoError extends Error {
    constructor(msg?: string) {
        if (!msg)
            msg = 'Acesso não autorizado'
        
        super(msg)
    }
}