import LivroJson from "@/interfaces/livro-json"
import Livro from "@/models/livro"

export default class LivroService {
    private url = `${process.env.API_URL}/api/livros`

    public async buscaLivros(livros: Array<Livro>): Promise<string> {
        try {
            const response = await fetch(this.url)
            const data = await response.json()

            livros.splice(0, livros.length)
            if (response.status == 200) {
                data.forEach((livroJson: LivroJson) => {
                    const livro = Livro.fromJson(livroJson)

                    livros.push(livro)
                });
            }
            return ''
        } catch (err) {
            return `Erro na conexão com a API '${this.url}'`
        }
    }

    public async salvaLivro(livro: Livro, livros: Array<Livro>) {
        let response = new Response()
        if (this.ehNovoLivro(livro)) {
            console.log("Salvar livro ID:", livro.id)

            response = await fetch(this.url, { method: "POST", headers: { 'Content-Type': 'application/json' }, body: Livro.toJson(livro) })
        } else {
            console.log("Alterar livro ID:", livro.id)

            response = await fetch(`${this.url}/${livro.id}`, { method: "PUT", headers: { 'Content-Type': 'application/json' }, body: Livro.toJson(livro) })
        }

        const livroJson: LivroJson = await response.json()
        console.log("Livro(JSON) retornado após salvar/alterar:", livroJson)

        if (response.status == 201) {
            const livroSalvo = Livro.fromJson(livroJson)

            livros.push(livroSalvo)
        } else if (response.status == 200) {
            const indice = livros.findIndex(liv => liv.id === livroJson.id)
            const livroAlterado = Livro.fromJson(livroJson)

            livros[indice] = livroAlterado
        }
    }

    public async removeLivro(id: number, livros: Array<Livro>) {
        const response = await fetch(`${this.url}/${id}`, { method: "DELETE" })

        if (response.status == 200) {
            const indice = livros.findIndex(l => l.id === id)
            livros.splice(indice, 1)
        }
    }

    private ehNovoLivro(livro: Livro) {
        // NOVO livro, id == 0, senão ALTERAR livro
        return livro.id === 0
    }
}