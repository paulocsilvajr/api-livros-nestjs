import AutorJson from "@/interfaces/autor-json";
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
}