export enum TipoNotificacao {
    SUCESSO,
    FALHA,
    ATENCAO,
    INFO
}

export interface INotificacao {
    texto: string
    tipo: TipoNotificacao
    id: number
}