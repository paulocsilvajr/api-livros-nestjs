
export default abstract class VariaveisAmbiente {
    static get apiUrl(): string {
        return process.env.URL_API as string;
    }

    static get hostUrl(): string {
        return process.env.URL_HOST as string;
    }
}