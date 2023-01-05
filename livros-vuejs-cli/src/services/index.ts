import axios, { AxiosInstance, AxiosResponse } from "axios"
import VariaveisAmbiente from "@/utils/variaveis-ambiente"

class HttpAxiosService {
    private ax: AxiosInstance

    constructor() {
        this.ax = axios.create({
            baseURL: `${VariaveisAmbiente.apiUrl}`,
            headers: { 'Content-Type': 'application/json' },
        })
    }

    public async get(url: string): Promise<AxiosResponse> {
        return this.ax.get(url)
            .then(response => {
                return response
            })
            .catch(err => {
                return err.response as AxiosResponse
            });
    }

    public async getComParametros<P>(url: string, parametros: P): Promise<AxiosResponse> {
        return this.ax.get(url, { params: parametros })
            .then(response => {
                return response
            })
            .catch(err => {
                return err.response as AxiosResponse
            });
    }

    public async getComToken(url: string, token: string): Promise<AxiosResponse> {
        return this.ax.get(url, {
            headers: this.headerToken(token)
        })
            .then(response => {
                return response
            })
            .catch(err => {
                return err.response as AxiosResponse
            });
    }

    public async postComToken<P>(url: string, token: string, dados: P): Promise<AxiosResponse> {
        return this.ax.post(url, JSON.stringify(dados), {
            headers: this.headerToken(token)
        })
            .then(response => {
                return response
            })
            .catch(err => {
                return err.response as AxiosResponse
            });
    }

    public async putComToken<P>(url: string, token: string, dados: P): Promise<AxiosResponse> {
        return this.ax.put(url, JSON.stringify(dados), {
            headers: this.headerToken(token)
        })
            .then(response => {
                return response
            })
            .catch(err => {
                return err.response as AxiosResponse
            });
    }

    public async deleteComToken(url: string, token: string): Promise<AxiosResponse> {
        return this.ax.delete(url, {
            headers: this.headerToken(token)
        })
            .then(response => {
                return response
            })
            .catch(err => {
                return err.response as AxiosResponse
            });
    }

    private headerToken(token: string) {
        return { 'Authorization': `Bearer ${token}` }
    }
}

export { HttpAxiosService }