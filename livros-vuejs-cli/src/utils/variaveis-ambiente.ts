
export default abstract class VariaveisAmbiente {
    static get apiUrl(): string {
        return process.env.API_URL as string;
    }

    static get baseUrl(): string {
        return process.env.API_URL as string;
    }
}