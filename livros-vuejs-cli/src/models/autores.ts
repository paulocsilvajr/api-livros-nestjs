import AutorJson from "@/interfaces/IAutor";
import { Autor } from "./autor";

export class Autores {
    static fromJsonArray(listaOriginal: AutorJson[]): Autor[] {
        const novaLista = [] as Autor[]
        listaOriginal.forEach(elemento => {
            novaLista.push(Autor.fromJson(elemento))
        })

        return novaLista
    }
}