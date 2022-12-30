import { TipoNotificacao } from "@/interfaces/INotificacoes"
import { store } from "@/store"
import { NOTIFICAR } from "@/store/tipos-mutacoes"

type Notificador = {
    notificar: (texto: string, tipo: TipoNotificacao) => void
}

export default () : Notificador => {
    const notificar = (texto: string, tipo: TipoNotificacao): void => {
        store.commit(NOTIFICAR, {
            texto: texto,
            tipo: tipo
        })
    }

    return {
        notificar
    }
}