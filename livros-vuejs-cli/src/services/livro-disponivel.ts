import LivroDisponivelJson from "@/interfaces/ILivroDisponivel";
import { HttpAxiosService } from ".";

export default class LivroDisponivelService {
    private url = 'api/livrosdisponiveis'

    constructor(private axios = new HttpAxiosService()) { }

    public async buscaLivrosDisponiveis(token: string): Promise<LivroDisponivelJson[] | undefined> {
        const response = await this.axios.getComToken(this.url, token)

        if (response.status === 200) {
            const data: LivroDisponivelJson[] = response.data

            return data
        }
    }
}