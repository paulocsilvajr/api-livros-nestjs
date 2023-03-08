import { APIError } from "@/errors/api-error";
import { LivroUsuarioJson, LivroUsuarioCadastro } from "@/interfaces/ILivroUsuario"
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
        }
    }

    public async salvaLivroUsuario(token: string, idLivro: number, usuario: string): Promise<LivroUsuarioJson | undefined> {
        const livroUsuarioCadastro: LivroUsuarioCadastro = {
            livro: idLivro,
            usuario: usuario,
            dataInicioLeitura: new Date().toISOString()
        }

        const url = `${this.url}`

        const response = await this.axios.postComToken(url, token, livroUsuarioCadastro)

        if (response.status === 201) {
            const data: LivroUsuarioJson = response.data

            return data
        } else {
            throw new APIError(response)
        }
    }
}