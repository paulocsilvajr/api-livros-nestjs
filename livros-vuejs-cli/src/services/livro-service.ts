import { APIError } from "@/errors/api-error"
import { CadastrarError } from "@/errors/cadastrar-error"
import { LivroJson, LivroCadastro} from "@/interfaces/ILivro"
import { Livro } from "@/models/livro"
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
        const livroCadastro: LivroCadastro = {
            titulo: livro.titulo,
            autor: livro.autorId,
            resumo: livro.resumo,
            numeroPaginas: livro.numeroPaginas,
            dataCompra: livro.dataCompra.toISOString(),
        }
        const response = await this.axios.postComToken(this.url, token, livroCadastro)

        if (response.status == 201) {
            const data: LivroJson = response.data

            return data  
        } else if (response.status === 400) {
            throw new APIError(response)
        } else if (response.status === 406){
            throw new CadastrarError('livro', 'Livro com nome informado já cadastrado')
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