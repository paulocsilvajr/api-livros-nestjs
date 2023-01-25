import { Guias } from "@/enums/Guias"
import { store } from "@/store"
import { DEFINIR_GUIA_ATIVA } from "@/store/tipos-mutacoes"

type DefinidorGuiaAtiva = {
    definirGuiaAtiva: (guia: Guias) => void
}

export default () : DefinidorGuiaAtiva => {
    const definirGuiaAtiva = (guia: Guias): void => {
        store.commit(DEFINIR_GUIA_ATIVA, guia)
    }

    return {
        definirGuiaAtiva
    }
}