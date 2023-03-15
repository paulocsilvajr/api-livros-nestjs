import { AxiosResponse } from "axios";

export class APIError extends Error {
    constructor(resposta: AxiosResponse) { 
        super(resposta.data.message.toString())
    }
}