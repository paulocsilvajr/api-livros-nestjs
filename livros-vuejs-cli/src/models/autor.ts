import AutorJson from "@/interfaces/IAutor"
import { IFiltro } from "@/interfaces/IFiltro"

class Autor implements IFiltro {
    constructor(
        public id: number = 0,
        public nome: string = '',
        public descricao: string = '',
    ) { }

    get filtro(): string {
        return this.nome
    }

    static fromJson(autor: AutorJson): Autor {
        return new Autor(
            autor.id,
            autor.nome,
            autor.descricao,
        )
    }
}

export { Autor }