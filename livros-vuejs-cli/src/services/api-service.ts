
export default class ApiService {
    private url = process.env.API_URL

    public async apiEstaOnline(): Promise<boolean> {
        try {
            const response = await fetch(this.url);
            const data = await response.text()
            console.warn(`Resposta da API: ${data}`);

            if (response.status === 200) {
                console.log('API ONLINE');
                return true;
            }
            
            return false;
        } catch (err) {
            console.error(err);
            return false;
        }
    }

    public getUrl(): string {
        return this.url;
    }
}