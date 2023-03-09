import { APIError } from "@/errors/api-error";
import { CadastrarError } from "@/errors/cadastrar-error";
import { NaoAutorizadoError } from "@/errors/nao-autorizado-error";
import { UnauthorizedJson } from "@/interfaces/INaoAutorizado";
import UsuarioJson from "@/interfaces/IUsuario";
import { Usuario } from "@/models/usuario";
import { HttpAxiosService } from ".";

export default class UsuarioService {
    private url = 'api/usuarios'

    constructor(private axios = new HttpAxiosService()) { }

    public async salvaUsuario(usuario: Usuario): Promise<UsuarioJson> {
        const response = await this.axios.post<Usuario>(this.url, usuario)

        if (response.status === 201) {
            const data: UsuarioJson = response.data

            return data
        } else if ([ 400, 406 ].includes(response.status) ) {
            throw new APIError(response)
        } else if(response.status === 401) {
            const json: UnauthorizedJson = response.data

            throw new NaoAutorizadoError(json.message)
        } else {
            console.warn(response.data.message.toString())
            throw new CadastrarError('usuário')
        }
    }

    public async buscaUsuarioPorNome(nome: string, token: string): Promise<UsuarioJson> {
        const url = `${this.url}/${nome}`
        const response = await this.axios.getComToken(url, token)

        if (response.status === 200) {
            const data: UsuarioJson = response.data

            return data
        } else if(response.status === 401) {
            const json: UnauthorizedJson = response.data

            throw new NaoAutorizadoError(json.message)
        } else {
            throw new APIError(response)
        }
    }
}