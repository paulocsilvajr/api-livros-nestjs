import { NaoAutorizadoError } from "@/errors/nao-autorizado-error";
import LivroDisponivelJson from "@/interfaces/ILivroDisponivel";
import { UnauthorizedJson } from "@/interfaces/INaoAutorizado";
import { HttpAxiosService } from ".";

export default class LivroDisponivelService {
    private url = 'api/livrosdisponiveis'

    constructor(private axios = new HttpAxiosService()) { }

    public async buscaLivrosDisponiveis(token: string): Promise<LivroDisponivelJson[] | undefined> {
        const response = await this.axios.getComToken(this.url, token)

        if (response.status === 200) {
            const data: LivroDisponivelJson[] = response.data

            return data
        } else if(response.status === 401) {
            const json: UnauthorizedJson = response.data

            throw new NaoAutorizadoError(json.message)
        }
    }
}