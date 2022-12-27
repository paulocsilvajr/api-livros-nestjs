import { NaoAutorizadoError } from "@/errors/nao-autorizado-error";
import TokenJson from "@/interfaces/token-json";
import Usuario from "@/models/usuario";
import VariaveisAmbiente from "@/utils/variaveis-ambiente";

export default class EntrarService {
    private url = `${VariaveisAmbiente.apiUrl}/api/login`

    public async entrar(usuario: Usuario): Promise<TokenJson | undefined> {
        const metodo = "GET"
        const cabecalho = this.getCabecalhoJson()
        const url = this.getUrlComParametrosDoUsuario(usuario)

        const response = await fetch(url.toString(), { method: metodo, headers: cabecalho})
        
        if (response.status === 401) {
            throw new NaoAutorizadoError()
        } else if (response.status === 200) {
            const data: TokenJson = await response.json()
    
            return data
        }
    }

    private getCabecalhoJson(): Headers {
        const cabecalho = new Headers();
        cabecalho.append("Content-Type", "application/json")

        return cabecalho
    }

    private getUrlComParametrosDoUsuario(usuario: Usuario): URL {
        const parametros = new URLSearchParams({ nome: usuario.nome, senha: usuario.senha })
        const url = new URL(this.url)
        url.search = parametros.toString()

        return url
    }
}