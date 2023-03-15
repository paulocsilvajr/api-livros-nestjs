import VariaveisAmbiente from "@/utils/variaveis-ambiente";
import { HttpAxiosService } from ".";

export default class ApiService {

    constructor(private axios = new HttpAxiosService()) { }

    public async apiEstaOnline(): Promise<boolean> {
        try {
            const response = await this.axios.get();

            console.warn(`Resposta da API: ${response.data}`);
            if (response.status === 200) {
                console.log('API ONLINE');
                return true
            }
            
            return false;
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
            }
            return false;
        }
    }

    public getUrl(): string {
        return VariaveisAmbiente.apiUrl;
    }
}