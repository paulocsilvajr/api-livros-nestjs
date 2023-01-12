import { APIError } from "@/errors/api-error";
import { CadastrarError } from "@/errors/cadastrar-error";
import UsuarioJson from "@/interfaces/usuario-json";
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
        } else if (response.status === 400) {
            throw new APIError(response)
        } else {
            throw new CadastrarError('usuário')
        }
    }
}