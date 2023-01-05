import { NaoAutorizadoError } from "@/errors/nao-autorizado-error";
import { IUsuarioParam } from "@/interfaces/IUsuarioParam";
import TokenJson from "@/interfaces/token-json";
import Usuario from "@/models/usuario";
import { HttpAxiosService } from ".";

export default class EntrarService {
    private url = 'api/login'

    constructor(private axios = new HttpAxiosService()) { }

    public async entrar(usuario: Usuario): Promise<TokenJson | undefined> {
        const response = await this.axios.getComParametros<IUsuarioParam>(this.url, { nome: usuario.nome, senha: usuario.senha })

        if (response.status === 200) {
            const data: TokenJson = response.data

            return data
        } else if (response.status === 401) {
            throw new NaoAutorizadoError()
        }
    }
}