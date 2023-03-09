import { APIError } from "@/errors/api-error";
import { NaoAutorizadoError } from "@/errors/nao-autorizado-error";
import { LivroUsuarioJson, LivroUsuarioCadastroAlteracao } from "@/interfaces/ILivroUsuario"
import { UnauthorizedJson } from "@/interfaces/INaoAutorizado";
import { HttpAxiosService } from ".";

export default class LivroUsuarioService {
    private url = 'api/livrosusuarios'

    constructor(private axios = new HttpAxiosService()) { }

    public async buscaLivroUsuarioPorUsuario(token: string, nomeUsuario: string): Promise<LivroUsuarioJson[] | undefined> {
        const url = `${this.url}/usuario/${nomeUsuario}`

        const response = await this.axios.getComToken(url, token)

        if (response.status === 200) {
            const data: LivroUsuarioJson[] = response.data

            return data
        } else if(response.status === 401) {
            const json: UnauthorizedJson = response.data

            throw new NaoAutorizadoError(json.message)
        }
    }

    public async salvaLivroUsuario(token: string, idLivro: number, usuario: string): Promise<LivroUsuarioJson | undefined> {
        const livroUsuarioCadastro: LivroUsuarioCadastroAlteracao = {
            livro: idLivro,
            usuario: usuario,
            dataInicioLeitura: new Date().toISOString()
        }

        const url = `${this.url}`

        const response = await this.axios.postComToken(url, token, livroUsuarioCadastro)

        if (response.status === 201) {
            const data: LivroUsuarioJson = response.data

            return data
        } else if(response.status === 401) {
            const json: UnauthorizedJson = response.data

            throw new NaoAutorizadoError(json.message)
        } else {
            throw new APIError(response)
        }
    }

    public async alteraLivroUsuario(token: string, livroUsuario: LivroUsuarioJson): Promise<LivroUsuarioJson | undefined> {
        const livroUsuarioAlteracao: LivroUsuarioCadastroAlteracao = {
            id: livroUsuario.id,
            livro: livroUsuario.livroId,
            usuario: livroUsuario.usuarioNome,
            dataInicioLeitura: livroUsuario.dataInicioLeitura,
            dataFimLeitura: new Date().toISOString()
        }

        const url = `${this.url}/${livroUsuario.id}`

        const response = await this.axios.putComToken(url, token, livroUsuarioAlteracao)

        if (response.status === 200) {
            const data: LivroUsuarioJson = response.data

            return data
        } else if(response.status === 401) {
            const json: UnauthorizedJson = response.data

            throw new NaoAutorizadoError(json.message)
        } else {
            throw new APIError(response)
        }
    }
}