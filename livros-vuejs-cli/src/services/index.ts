import axios from "axios"
import VariaveisAmbiente from "@/utils/variaveis-ambiente"

const ax = axios.create({
    baseURL: `${VariaveisAmbiente.apiUrl}`,
    headers: { 'Content-Type': 'application/json' },
})

const get = (url: string) => {
    return ax.get(url)
}

const getComParametros = (url: string, parametros: any) => {
    return ax.get(url, { params: parametros });
}

const headerToken = (token: string) => {
    return { 'Authorization': `Bearer ${token}` }
}

const getComToken = (url: string, token: string) => {
    return ax.get(url, {
        headers: headerToken(token)
    })
}

const postComToken = (url: string, token: string, dados: any) => {
    return ax.post(url, JSON.stringify(dados), {
        headers: headerToken(token)
    })
}

const putComToken = (url: string, token: string, dados: any) => {
    return ax.put(url, JSON.stringify(dados), {
        headers: headerToken(token)
    })
}

const deleteComToken = (url: string, token: string, dados: any) => {
    return ax.delete(url, {
        headers: headerToken(token)
    })
}

export { get, getComParametros, getComToken, postComToken, putComToken, deleteComToken }