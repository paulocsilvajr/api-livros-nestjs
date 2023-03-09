import { APIError } from "@/errors/api-error";
import { CadastrarError } from "@/errors/cadastrar-error";
import { NaoAutorizadoError } from "@/errors/nao-autorizado-error";
import AutorJson from "@/interfaces/IAutor";
import { Autor } from "@/models/autor";
import { AxiosResponse } from "axios";
import { HttpAxiosService } from ".";
import { UnauthorizedJson } from "@/interfaces/INaoAutorizado"

export default class AutorService {
    private url = 'api/autores'

    constructor(private axios = new HttpAxiosService()) { }

    public async buscaAutores(token: string): Promise<AutorJson[] | undefined > {
        const response = await this.axios.getComToken(this.url, token)

        if (response.status === 200) {
            const data: AutorJson[] = response.data

            return data
        } else if(response.status === 401) {
            const json: UnauthorizedJson = response.data

            throw new NaoAutorizadoError(json.message)
        }
    }

    public async salvaAutor(autor: Autor, token: string): Promise<AutorJson> {
        let response: AxiosResponse

        if (autor.descricao.length === 0) {
            const autorSemDescricao = {
                id: autor.id,
                nome: autor.nome
            }

            response = await this.axios.postComToken(this.url, token, autorSemDescricao)
        } else {
            response = await this.axios.postComToken<Autor>(this.url, token, autor)
        }

        if (response.status === 201) {
            const data: AutorJson = response.data

            return data
        } else if (response.status === 400) {
            throw new APIError(response)
        } else if (response.status === 406){
            throw new CadastrarError('autor', 'Autor com nome informado já cadastrado')
        } else if(response.status === 401) {
            const json: UnauthorizedJson = response.data

            throw new NaoAutorizadoError(json.message)
        } else {
            throw new CadastrarError('autor')
        }
    }

    public async excluiAutor(autor: Autor, token: string): Promise<boolean> {
        const response = await this.axios.deleteComToken(this.url, token, autor)
    
        if (response.status === 200) {
            return true
        } else if(response.status === 401) {
            const json: UnauthorizedJson = response.data

            throw new NaoAutorizadoError(json.message)
        } else {
            throw new APIError(response)
        }
    }

}