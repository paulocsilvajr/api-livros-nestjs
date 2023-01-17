import { APIError } from "@/errors/api-error";
import { CadastrarError } from "@/errors/cadastrar-error";
import AutorJson from "@/interfaces/autor-json";
import { Autor } from "@/models/autor";
import { HttpAxiosService } from ".";

export default class AutorService {
    private url = 'api/autores'

    constructor(private axios = new HttpAxiosService()) { }

    public async buscaAutores(token: string): Promise<AutorJson[] | undefined > {
        const response = await this.axios.getComToken(this.url, token)

        if (response.status === 200) {
            const data: AutorJson[] = response.data

            return data
        }
    }

    public async salvaAutor(autor: Autor, token: string): Promise<AutorJson> {
        const response = await this.axios.postComToken<Autor>(this.url, token, autor)

        if (response.status === 201) {
            const data: AutorJson = response.data

            return data
        } else if (response.status === 400) {
            throw new APIError(response)
        } else if (response.status === 406){
            throw new CadastrarError('autor', 'Autor com nome informado já cadastrado')
        } else {
            throw new CadastrarError('autor')
        }
    }
}