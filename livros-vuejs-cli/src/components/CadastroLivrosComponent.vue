<template>
    <div class="container">

        <h1 class="title is-1 has-text-centered mt-6 mb-6">{{ titulo }}</h1>

        <GuiasComponent>

            <template v-slot:guia01>

                <form class="box" @submit.prevent="salvaLivro">

                    <div class="columns">

                        <input type="text" id="id" hidden v-model="livro.id">

                        <div class="column is-three-quarters">
                            <div class="field">
                                <label for="nome">Título</label>
                                <div class="control">
                                    <input type="text" class="input" placeholder="Título do livro" id="nome"
                                        v-model.trim="livro.titulo" required>
                                </div>
                            </div>
                        </div>

                        <div class="column">
                            <div class="field">
                                <label for="autor">Autor</label>
                                <div class="control">
                                    <div class="select">
                                        <select v-model="livro.autorId" id="autor" required>
                                            <option v-for="a in autores" :key="a.id" :value="a.id">{{ a.nome }}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div class="columns is-vcentered">

                        <div class="column">
                            <div class="field">
                                <label for="npaginas">Número de páginas</label>
                                <div class="control">
                                    <input type="number" min="1" class="input" placeholder="Número de páginas"
                                        id="npaginas" v-model="livro.numeroPaginas" required>
                                </div>
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

                    </div>

                    <div class="columns is-vcentered">
                       
                        <div class="column">
                            <div class="field">
                                <label for="resumo">Resumo</label>
                                <div class="control">
                                    <textarea class="textarea" placeholder="Resumo da obra" id="resumo"
                                        v-model="livro.resumo" rows="2"></textarea>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div class="colums is-desktop">
                        <div class="column is-half p-0">
                            <div class="columns">
                                <div class="column">
                                    <button type="submit" class="button is-success is-fullwidth" :class="carregando.salvar ? 'is-loading' : ''">
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

                </form>

            </template>

            <template v-slot:guia02>

                <div class="table-container mt-6">

                    <table class="table is-hoverable is-fullwidth  is-striped">
                        <thead>
                            <tr>
                                <th>Cód.</th>
                                <th>Título</th>
                                <th>Autor</th>
                                <th>N° páginas</th>
                                <th>Compra</th>
                                <th>Resumo</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th colspan="2">Total</th>
                                <th colspan="5">{{ totalLivros }}</th>
                            </tr>
                        </tfoot>
                        <tbody>
                            <tr v-for="l in livros" :key="l.id"  :class="livro.id == l.id ? 'is-selected' : ''">
                                <th class="is-vcentered">{{ l.id }}</th>
                                <td class="has-text-left is-vcentered">{{ l.titulo }}</td>
                                <td class="has-text-left is-vcentered">{{ retornaNomeAutor(l.autorId) }}</td>
                                <td class="has-text-left is-vcentered">{{ l.numeroPaginas }}</td>
                                <td class="has-text-left is-vcentered">{{ formataDataBR(l.dataCompra) }}</td>
                                <td class="has-text-left is-vcentered">{{ l.resumo }}</td>
                                <td class="is-vcentered">
                                    <div class="field has-addons">
                                        <p class="control">
                                            <button class="button is-primary is-small"
                                                @click="alteraLivro(l)">
                                                <span class="icon is-small">
                                                    <i class="fas fa-pencil"></i>
                                                </span>
                                                <span>Alterar</span>
                                            </button>
                                        </p>
                                        <p class="control">
                                            <button class="button is-danger is-small"
                                                @click="excluiLivro(l)">
                                                <span>Excluir</span>
                                                <span class="icon is-small">
                                                    <i class="fas fa-times"></i>
                                                </span>
                                            </button>
                                        </p>
                                    </div>
                                </td>
                            </tr>

                        </tbody>
                    </table>

                </div>

            </template>

        </GuiasComponent>

    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import LivroService from '@/services/livro-service'
import { useStore } from '@/store'
import GuiasComponent from '@/components/GuiasComponent.vue'
import { Autor } from '@/models/autor'
import AutorService from '@/services/autor-service'
import { Livro } from '@/models/livro'
import { TipoNotificacao } from '@/interfaces/INotificacoes'
import useNotificador from '@/hooks/notificador'
import { APIError } from '@/errors/api-error'
import { CadastrarError } from '@/errors/cadastrar-error'
import useDefinidorGuiaAtiva from '@/hooks/definidorGuiaAtiva'
import { Guias } from '@/enums/Guias'

export default defineComponent({
    name: "CadastroLivrosComponent",
    components: {
        GuiasComponent,
    },
    data() {
        return {
            titulo: "Cadastro de livros",
            livroService: new LivroService(),
            livro: new Livro(),
            livros: [] as Livro[],
            autorService: new AutorService(),
            autores: [] as Autor[],
            carregando: {
                salvar: false,
            },
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
        },
        async buscaAutores() {
            const autoresBanco = await this.autorService.buscaAutores(this.token)

            if (autoresBanco) {
                this.autores = autoresBanco
            }
        },
        async buscaLivros() {
            const livrosBanco = await this.livroService.buscaLivros(this.token)

            if (livrosBanco) {
                this.livros = [] as Livro[]

                livrosBanco.forEach(livroJson => {
                    this.livros.push(Livro.fromJson(livroJson))
                })
            }
        },
        async salvaLivro() {
            this.carregando.salvar = true
            
            try {
                const livroCadastrado = await this.livroService.salvaLivro(this.livro, this.token)

                if (livroCadastrado) {
                    let msg: string
                    if (this.livro.id) {
                        msg = `Livro '${livroCadastrado.titulo}' alterado com sucesso`
                    } else {
                        this.livros.push(Livro.fromJson(livroCadastrado))
                        msg = `Livro '${livroCadastrado.titulo}' cadastrado com sucesso`
                    }

                    this.notificar(msg, TipoNotificacao.SUCESSO)
                    console.log(msg)

                    this.defineLivroVazio()
                }
            } catch (error) {
                if (error instanceof APIError) {
                    this.notificar(error.message, TipoNotificacao.FALHA)
                } else if (error instanceof CadastrarError) {
                    this.notificar(error.message, TipoNotificacao.FALHA)
                }
            }

            this.carregando.salvar = false
        },
        alteraLivro(livro: Livro) {
            this.livro = livro

            this.definirGuiaAtiva(Guias.Cadastro)
        },
        excluiLivro(livro: Livro) {
            console.log('excluiLivro', livro)
        },
        formataDataBR(data: Date) {
            return data.toLocaleDateString("pt-BR", { timeZone: "UTC" })
        },
        retornaNomeAutor(id: number) {
            const autorEncontrado = this.autores.find(autor => autor.id === id)
            return autorEncontrado?.nome
        }
    },
    beforeMount() {
        if (this.semToken) {
            this.$router.push({ name: "login" })

            return
        }

        this.defineLivroVazio()

        this.buscaAutores()
        this.buscaLivros()
    },
    setup() {
        const store = useStore()
        const semToken = computed(() => store.getters.semToken)
        const token = computed(() => store.state.usuario.token)
        const { definirGuiaAtiva } = useDefinidorGuiaAtiva()

        const { notificar } = useNotificador()

        return {
            semToken,
            token,
            notificar,
            definirGuiaAtiva,
        }
    }
})
</script>

<style>

</style>