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
                                    <button type="submit" class="button is-success is-fullwidth"
                                        :class="carregando.salvar ? 'is-loading' : ''">
                                        <span class="icon is-small">
                                            <i class="fas fa-check"></i>
                                        </span>
                                        <span>Salvar</span>
                                    </button>
                                </div>
                                <div class="column">
                                    <button class="button is-warning is-fullwidth" @click="defineLivroEPesquisaVazia">
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

                <div class="columns">
                    <div class="column">
                        <div class="control has-icons-left">
                            <input class="input" type="text" placeholder="Search" v-model="pesquisa"
                                v-on:keyup.enter="filtraLivros">
                            <span class="icon is-left">
                                <i class="fas fa-search" aria-hidden="true"></i>
                            </span>
                        </div>
                    </div>
                </div>

                <div class="table-container mt-1">

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
                            <tr v-for="l in livros" :key="l.id" :class="livro.id == l.id ? 'is-selected' : ''">
                                <th class="is-vcentered">{{ l.id }}</th>
                                <td class="has-text-left is-vcentered">{{ l.titulo }}</td>
                                <td class="has-text-left is-vcentered" :id="l.autorId.toString()">{{ retornaNomeAutor(l.autorId) }}</td>
                                <td class="has-text-left is-vcentered">{{ l.numeroPaginas }}</td>
                                <td class="has-text-left is-vcentered">{{ formataData(l.dataCompra) }}</td>
                                <td class="has-text-left is-vcentered">{{ l.resumo }}</td>
                                <td class="is-vcentered">
                                    <div class="field has-addons">
                                        <p class="control">
                                            <button class="button is-primary is-small" @click="alteraLivro(l)">
                                                <span class="icon is-small">
                                                    <i class="fas fa-pencil"></i>
                                                </span>
                                                <span>Alterar</span>
                                            </button>
                                        </p>
                                        <p class="control">
                                            <button class="button is-danger is-small" @click="exibeModalExclusao(l)">
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

    <ModalConfirmacaoComponent titulo="Confirmar exclusão de livro"
        :mensagem="'Deseja realmente excluir o autor ' + livro.titulo " texto-botao="Excluir"
        @ao-clicar-confirmacao="excluiLivro" @ao-fechar-modal="fechaModal" v-if="exibeModal">
    </ModalConfirmacaoComponent>

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
import ModalConfirmacaoComponent from '@/components/ModalConfirmacaoComponent.vue'
import { LivroJson } from '@/interfaces/ILivro'
import { filtraLista } from '@/utils/filtra-lista'
import { Autores } from '@/models/autores'
import { Livros } from '@/models/livros'
import { formataDataBR } from '@/utils/formataData'
// import UsuarioService from '@/services/usuario-service'
// import { NaoAutorizadoError } from '@/errors/nao-autorizado-error'
// import { LIMPAR_INFORMACOES_USUARIO } from '@/store/tipos-mutacoes'

export default defineComponent({
    name: "CadastroLivrosComponent",
    components: {
        GuiasComponent,
        ModalConfirmacaoComponent,
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
            exibeModal: false,
            pesquisa: "",
        }
    },
    computed: {
        totalLivros(): string {
            return `${this.livros.length} livro${this.livros.length != 1 ? "s" : ""}`
        }
    },
    methods: {
        defineLivroEPesquisaVazia() {
            this.livro = new Livro()
            this.pesquisa = ""
        },
        async buscaAutores() {
            console.log("Buscando autores em API")
            const autoresBanco = await this.autorService.buscaAutores(this.token)

            if (autoresBanco) {
                this.autores = Autores.fromJsonArray(autoresBanco)
            }
        },
        async buscaLivros() {
            console.log("Buscando livros em API")
            const livrosBanco = await this.livroService.buscaLivros(this.token)

            if (livrosBanco) {
                this.livros = Livros.fromJsonArray(livrosBanco)
            }
        },
        async salvaLivro() {
            this.carregando.salvar = true

            try {
                let livro: LivroJson
                let msg: string

                if (this.livro.id === 0) {
                    livro = await this.livroService.salvaLivro(this.livro, this.token)
                    msg = `Livro '${livro.titulo}' cadastrado com sucesso`
                } else {
                    livro = await this.livroService.alteraLivro(this.livro, this.token)
                    msg = `Livro '${livro.titulo}' alterado com sucesso`
                }

                if (livro) {
                    if (!this.livro.id) {
                        this.livros.push(Livro.fromJson(livro))
                    }

                    this.notificar(msg, TipoNotificacao.SUCESSO)
                    console.log(msg)

                    this.defineLivroEPesquisaVazia()
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
        async excluiLivro() {
            try {
                if (await this.livroService.excluiLivro(this.livro, this.token)) {
                    this.notificar(`Excluído livro '${this.livro.titulo}'`, TipoNotificacao.SUCESSO)

                    this.livros = this.livros.filter((l) => l.id != this.livro.id)
                }
            } catch (error) {
                if (error instanceof Error) {
                    this.notificar(`Livro '${this.livro.titulo}' não pode ser excluído. Verifique se o livro foi emprestado`, TipoNotificacao.FALHA)
                }
            }

            this.fechaModal()
        },
        filtraLivros() {
            this.buscaLivros().then(() => {
                if (this.pesquisa) {
                    this.livros = filtraLista(this.livros, this.pesquisa) as Livro[]
                }
            })
        },
        formataData(data: Date) {
            return formataDataBR(data)
        },
        retornaNomeAutor(id: number) {
            const autorEncontrado = this.autores.find(autor => autor.id === id)
            return autorEncontrado?.nome
        },
        exibeModalExclusao(livro: Livro) {
            this.exibeModal = true;
            this.livro = livro;
        },
        fechaModal() {
            this.exibeModal = false
            this.defineLivroEPesquisaVazia()
        },
    },
    beforeMount() {
        // const usuarioService = new UsuarioService()
        
        // try {
        //     await usuarioService.buscaUsuarioPorNome(this.nomeUsuario, this.token)
        //     console.log('TOKEN ainda válido')
        // } catch (error) {
        //     if (error instanceof NaoAutorizadoError) {
        //         console.warn(error.message)
        //         this.store.commit(LIMPAR_INFORMACOES_USUARIO)
        //     }
        // }
        

        // if (this.semToken) {
        //     this.$router.push({ name: "login" })

        //     return
        // }

        this.defineLivroEPesquisaVazia()

        this.buscaAutores()
        this.buscaLivros()
    },
    setup() {
        const store = useStore()
        const token = computed(() => store.state.usuario.token)
        const { definirGuiaAtiva } = useDefinidorGuiaAtiva()
        // const semToken = computed(() => store.getters.semToken)
        // const nomeUsuario =  computed(() => store.state.usuario.nomeUsuario)

        const { notificar } = useNotificador()

        return {
            token,
            notificar,
            definirGuiaAtiva,
            // store,
            // semToken,
            // nomeUsuario,
        }
    }
})
</script>

<style>

</style>