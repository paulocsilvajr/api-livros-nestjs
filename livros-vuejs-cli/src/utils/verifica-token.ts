import { NaoAutorizadoError } from "@/errors/nao-autorizado-error"
import UsuarioService from "@/services/usuario-service"
import { store } from "@/store"
import { LIMPAR_INFORMACOES_USUARIO } from "@/store/tipos-mutacoes"
import { Router } from "vue-router"

async function verificaToken(nomeUsuario: string, token: string): Promise<void> {
    console.log("Verificando TOKEN...")
    const usuarioService = new UsuarioService()

    try {
        await usuarioService.buscaUsuarioPorNome(nomeUsuario, token)
        console.log("TOKEN válido")
    } catch (error) {
        if (error instanceof NaoAutorizadoError) {
            console.log("TOKEN inválido")
            store.commit(LIMPAR_INFORMACOES_USUARIO)
        }
    }
}

/** redirecionaParaLoginSeNaoTemToken verifica o TOKEN na API e retorna o boleano true se o TOKEN está inválido. Quando utilizar essa função, deve-se seguir a seguinte sintaxe:
 * 
 * if (await redirecionaParaLoginSeNaoTemToken(nomeUsuario, token, vueRouter)) {
 *     return
 * }
 * @type {async function(string, string, Router): Promise<boolean>}
 **/
async function redirecionaParaLoginSeNaoTemToken(nomeUsuario: string, token: string, router: Router): Promise<boolean> {
    // token = "T8k3n1nV4l1d0"  // token inválido para teste
    await verificaToken(nomeUsuario, token)

    const semToken = store.getters.semToken
    if (semToken) {
        alert("Sessão atingiu o tempo limite, redirecionando para login...")

        router.push({ name: "login" })

        return true
    }
    return false
}

export { redirecionaParaLoginSeNaoTemToken }