import LivroUsuarioJson from "@/interfaces/ILivroUsuario";
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
}