<template>


    <div class="columns">
        <div class="column mt-6">
            <h1 class="title is-1 has-text-centered">{{ titulo }}</h1>
        </div>
    </div>

    <div class="box">

        <div class="columns">

            <input type="text" id="id" hidden v-model="livro.id">

            <div class="column is-three-quarters">
                <div class="field">
                    <label for="nome">Título</label>
                    <div class="control">
                        <input type="text" class="input" placeholder="Título do livro" id="nome"
                            v-model.trim="livro.nome">
                    </div>
                    <p class="help is-danger" v-if="validacaoCampos.titulo">Informe um título</p>
                </div>
            </div>

            <div class="column">
                <div class="field">
                    <label for="autor">Autor</label>
                    <div class="control">
                        <input type="text" class="input" placeholder="Nome do autor" id="autor"
                            v-model.trim="livro.autor">
                    </div>
                    <p class="help is-danger" v-if="validacaoCampos.autor">Informe um autor</p>
                </div>
            </div>

        </div>

        <div class="columns is-vcentered">

            <div class="column">
                <div class="field">
                    <label for="npaginas">Número de páginas</label>
                    <div class="control">
                        <input type="number" min="1" class="input" placeholder="Número de páginas" id="npaginas"
                            v-model="livro.numeroPaginas">
                    </div>
                    <p class="help is-danger" v-if="validacaoCampos.numeroPaginas">Informe um número de páginas válido
                    </p>
                </div>
            </div>

            <div class="column">
                <div class="field">
                    <label for="datacompra">Data de compra</label>
                    <div class="control">
                        <input type="date" class="input" placeholder="Data de compra" id="datacompra"
                            v-model="livro.dataCompraInput">
                    </div>
                </div>
            </div>

            <div class="column is-one-quarter">
                <div class="field">
                    <div class="control">
                        <label class="checkbox" for="lido">
                            <input type="checkbox" id="lido" v-model="livro.lido">
                            Lido
                        </label>
                    </div>
                </div>
            </div>

        </div>

        <div class="colums is-desktop">
            <div class="column is-half">
                <div class="columns">
                    <div class="column">
                        <button class="button is-success is-fullwidth" @click="salvaLivro">
                            <span class="icon is-small">
                                <i class="fas fa-check"></i>
                            </span>
                            <span>Salvar</span>
                        </button>
                    </div>
                    <div class="column">
                        <button class="button is-warning is-fullwidth" @click="defineLivroVazio">
                            <span class="icon is-small">
                                <i class="fas fa-times"></i>
                            </span>
                            <span>Limpar</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

    </div>

    <div class="notification is-danger" v-if="msg.length > 0">
        {{ msg }}
    </div>


    <div class="table-container mt-6">

        <table class="table is-hoverable is-fullwidth">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Título</th>
                    <th>Autor</th>
                    <th>N° páginas</th>
                    <th>Compra</th>
                    <th>Lido</th>
                    <th></th>
                </tr>
            </thead>
            <tfoot>
                <tr>
                    <th>Total</th>
                    <th>{{ totalLivros }}</th>
                </tr>
            </tfoot>
            <tbody>
                <tr v-for="l in livros" :key="l.id">
                    <th>{{ l.id }}</th>
                    <td>{{ l.nome }}</td>
                    <td>{{ l.autor }}</td>
                    <td>{{ l.numeroPaginas }}</td>
                    <td>{{ formataDataBR(l.dataCompra) }}</td>
                    <td>
                        <strong v-if="l.lido">SIM</strong>
                        <span v-else>não</span>
                    </td>
                    <td>
                        <div class="buttons is-centered">
                            <button class="button is-info is-small is-outlined"
                                @click="alteraLivro(l.id)">Alterar</button>
                            <button class="button is-danger is-small is-outlined"
                                @click="removeLivro(l.id, l.nome)">Remover</button>
                        </div>
                    </td>
                </tr>

            </tbody>
        </table>

    </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Livro from '@/models/livro'
import LivroService from '@/services/livro-service'

export default defineComponent({
    name: "CadastroLivros",
    components: {

    },
    data() {
        return {
            livroService: new LivroService(),
            titulo: "Cadastro de livros",
            livro: new Livro(),
            livros: new Array<Livro>(),
            msg: "",
            validacaoCampos: { titulo: false, autor: false, numeroPaginas: false },
        }
    },
    computed: {
        totalLivros(): string {
            return `${this.livros.length} livro${this.livros.length != 1 ? "s" : ""}`
        }
    },
    methods: {
        defineLivroVazio() {
            this.livro = new Livro()
            this.validacaoCampos.titulo = this.validacaoCampos.autor = this.validacaoCampos.numeroPaginas = false
        },
        async buscaLivros() {
            this.msg = await this.livroService.buscaLivros(this.livros)
        },
        salvaLivro() {
            this.validacaoCampos.titulo = this.livro.nome === ""
            this.validacaoCampos.autor = this.livro.autor === ""
            this.validacaoCampos.numeroPaginas = this.livro.numeroPaginas < 1 || !Number.isInteger(this.livro.numeroPaginas)
            if (this.validacaoCampos.titulo ||
                this.validacaoCampos.autor ||
                this.validacaoCampos.numeroPaginas) {
                return
            }
            this.livroService.salvaLivro(this.livro, this.livros)
            this.defineLivroVazio()
        },
        alteraLivro(id: number) {
            const indice = this.livros.findIndex(l => l.id === id)
            const livroParaAlterar = this.livros[indice]
            this.livro = livroParaAlterar.copia()
        },
        removeLivro(id: number, titulo: string) {
            this.defineLivroVazio()
            if (confirm(`Deseja remover o livro '${id} - ${titulo}'`)) {
                this.livroService.removeLivro(id, this.livros)
            }
        },
        formataDataBR(data: Date) {
            return data.toLocaleDateString("pt-BR", { timeZone: "UTC" })
        },
    },
    beforeMount() {
        this.defineLivroVazio()
        this.buscaLivros()
    },
})
</script>

<style>

</style>