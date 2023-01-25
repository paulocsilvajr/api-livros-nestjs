import { APIError } from "@/errors/api-error"
import LivroJson from "@/interfaces/livro-json"
import Livro from "@/models/livro"
import { HttpAxiosService } from "."

export default class LivroService {
    private url = 'api/livros'

    constructor(private axios = new HttpAxiosService()) { }

    public async buscaLivros(token: string): Promise<LivroJson[] | undefined> {
        const response = await this.axios.getComToken(this.url, token)

        if (response.status === 200) {
            const data: LivroJson[] = response.data

            return data
        }
    }

    public async salvaLivro(livro: Livro, token: string): Promise<LivroJson> {
        const response = await this.axios.postComToken<Livro>(this.url, token, livro)

        if (response.status == 201) {
            const data: LivroJson = response.data

            return data            
        } else {
            throw new APIError(response)
        }
    }

    public async excluiLivro(livro: Livro, token: string): Promise<boolean> {
        const response = await this.axios.deleteComToken(this.url, token, livro)

        if (response.status === 200) {
            return true
        } else {
            throw new APIError(response)
        }
    }
}