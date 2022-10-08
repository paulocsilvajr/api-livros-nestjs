import LivroJson from "@/interfaces/livro-json"
import Livro from "@/models/livro"

type Livros = Promise<Array<Livro>>

export default class LivroService {
    private url = 'http://localhost:3000/api/livros'

    public async buscaLivros(livros: Array<Livro>): Livros {
        const response = await fetch(this.url)
        const data = await response.json()

        livros.splice(0, livros.length)
        if (response.status == 200) {
            data.forEach((livroJson: LivroJson) => {
                const livro = new Livro(
                    livroJson.id,
                    livroJson.nome,
                    livroJson.autor,
                    livroJson.numeroPaginas,
                    new Date(livroJson.dataCompra),
                    livroJson.lido)

                livros.push(livro)
            });
        }
        return livros
    }

    public async salvaLivro(livro: Livro, livros: Array<Livro>) {
        let response = new Response()
        if (this.ehNovoLivro(livro)) {
            console.log("Salvar livro ID:", livro.id)

            response = await fetch(this.url, {method: "POST", headers: {'Content-Type': 'application/json'}, body: Livro.toJson(livro)})
        } else {
            console.log("Alterar livro ID:", livro.id)
            
            response = await fetch(`${this.url}/${livro.id}`, {method: "PUT", headers: {'Content-Type': 'application/json'}, body: Livro.toJson(livro)})
        }

        const livroJson: LivroJson = await response.json()
        console.log("Livro(JSON) retornado após salvar/alterar:", livroJson)

        if (response.status == 201) {
            const livro = Livro.fromJson(livroJson)
            livros.push(livro)
        } else if (response.status == 200) {
            const indice = livros.findIndex(liv => liv.id === livroJson.id)
            livros[indice] = Livro.fromJson(livroJson)
        }
    }
    
    private ehNovoLivro(livro: Livro) {
        // NOVO livro, id == 0, senão ALTERAR livro
        return livro.id === 0
    }
}