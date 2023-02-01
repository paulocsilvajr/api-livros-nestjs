import { LivroJson } from "@/interfaces/ILivro"
import { Livro } from "./livro"

export class Livros {
    static fromJsonArray(listaOriginal: LivroJson[]): Livro[] {
        const novaLista = [] as Livro[]
        listaOriginal.forEach(elemento => {
            novaLista.push(Livro.fromJson(elemento))
        })

        return novaLista
    }
}