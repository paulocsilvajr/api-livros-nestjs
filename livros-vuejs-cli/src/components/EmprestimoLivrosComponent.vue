<template>

    <div class="container">

        <h1 class="title is-1 has-text-centered mt-6 mb-6">{{ titulo }}</h1>

        <GuiasComponent nome-guia01="Livros Emprestados" nome-guia02="Livros Disponíveis">

            <template v-slot:guia01>
                <div class="table-container mt-1">

                    <table class="table is-hoverable is-fullwidth is-striped mb-6">
                        <thead>
                            <tr>
                                <th>Livro</th>
                                <th>Autor</th>
                                <th>Início de Leitura</th>
                                <th>Fim da leitura</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th colspan="2">Total</th>
                                <th colspan="3">{{ totalLivrosUsuarios }}</th>
                                <th></th>
                            </tr>
                        </tfoot>
                        <tbody>
                            <tr v-for="lu in livrosUsuarios" :key="lu.id">
                                <th class="is-vcentered" :id="lu.livroId.toString()">{{ retornaTituloLivro(lu.livroId) }}</th>
                                <td class="has-text-left is-vcentered">{{ retornaNomeAutor( retornaIdAutorPorIdLivro(lu.livroId)) }}</td>
                                <td class="has-text-left is-vcentered">{{ formataData(lu.dataInicioLeitura) }}</td>
                                <td class="has-text-left is-vcentered">{{ formataData(lu.dataFimLeitura) }}</td>
                                <td class="is-vcentered">
                                    <div class="field has-addons">
                                        <p class="control">
                                            <button class="button is-primary is-small" @click="devolveLivro(lu.id)">
                                                <span class="icon is-small">
                                                    <i class="fas fa-arrow-up"></i>
                                                </span>
                                                <span>Devolver</span>
                                            </button>
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <h2 class="title is-5 has-text-left">Livros devolvidos</h2>

                    <table class="table is-hoverable is-fullwidth is-striped">
                        <thead>
                            <tr>
                                <th>Livro</th>
                                <th>Autor</th>
                                <th>Início de Leitura</th>
                                <th>Fim da leitura</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th colspan="2">Total</th>
                                <th colspan="3">{{ totalLivrosUsuariosDevolvidos }}</th>
                            </tr>
                        </tfoot>
                        <tbody>
                            <tr v-for="lu in livrosUsuariosDevolvidos" :key="lu.id">
                                <th class="is-vcentered" :id="lu.livroId.toString()">{{ retornaTituloLivro(lu.livroId) }}</th>
                                <td class="has-text-left is-vcentered">{{ retornaNomeAutor( retornaIdAutorPorIdLivro(lu.livroId)) }}</td>
                                <td class="has-text-left is-vcentered">{{ formataData(lu.dataInicioLeitura) }}</td>
                                <td class="has-text-left is-vcentered">{{ formataData(lu.dataFimLeitura) }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </template>

            <template v-slot:guia02>

                <div class="table-container mt-1">

                    <table class="table is-hoverable is-fullwidth is-striped">
                        <thead>
                            <tr>
                                <th>Cód.</th>
                                <th>Título</th>
                                <th>Autor</th>
                                <th>Resumo</th>
                                <th>Nº páginas</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th colspan="2">Total</th>
                                <th colspan="2">{{ totalLivrosDisponiveis }}</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </tfoot>
                        <tbody>
                            <tr v-for="ld in livrosDisponiveis" :key="ld.id">
                                <th class="is-vcentered">{{ ld.id }}</th>
                                <td class="has-text-left is-vcentered">{{ ld.titulo }}</td>
                                <td class="has-text-left is-vcentered">{{ retornaNomeAutor(ld.autorId) }}</td>
                                <td class="has-text-left is-vcentered">{{ ld.resumo }}</td>
                                <td class="is-vcentered">{{ ld.numeroPaginas }}</td>
                                <td class="is-vcentered">
                                    <div class="field has-addons">
                                        <p class="control">
                                            <button class="button is-primary is-small" @click="emprestaLivro(ld)">
                                                <span class="icon is-small">
                                                    <i class="fas fa-arrow-down"></i>
                                                </span>
                                                <span>Emprestar</span>
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
import { computed, defineComponent } from 'vue';
import GuiasComponent from '@/components/GuiasComponent.vue'
import { useStore } from '@/store'
import useNotificador from '@/hooks/notificador'
import useDefinidorGuiaAtiva from '@/hooks/definidorGuiaAtiva'
import LivroDisponivelService from '@/services/livro-disponivel'
import LivroDisponivelJson from '@/interfaces/ILivroDisponivel';
import AutorService from '@/services/autor-service';
import AutorJson from '@/interfaces/IAutor';
import LivroUsuarioService from '@/services/livro-usuario-service';
import { LivroUsuarioJson } from '@/interfaces/ILivroUsuario';
import { formataDataBR } from '@/utils/formataData';
import LivroService from '@/services/livro-service';
import { LivroJson } from '@/interfaces/ILivro';
import { APIError } from '@/errors/api-error';
import { TipoNotificacao } from '@/interfaces/INotificacoes';

export default defineComponent({
    name: 'EmprestimoLivrosComponent',
    components: {
        GuiasComponent,
    },
    data() {
        return {
            titulo: "Emprestimo de livros",
            livrosDisponiveis: [] as LivroDisponivelJson[],
            livroDisponivelService: new LivroDisponivelService(),
            autorService: new AutorService(),
            autores: [] as AutorJson[],
            livrosUsuarios: [] as LivroUsuarioJson[],
            livroUsuarioService: new LivroUsuarioService(),
            livrosUsuariosDevolvidos: [] as LivroUsuarioJson[],
            livroService: new LivroService(),
            livros: [] as LivroJson[],
        }
    },
    computed: {
        totalLivrosDisponiveis(): string {
            const tamanho = this.livrosDisponiveis.length
            return `${tamanho} livro${tamanho != 1 ? "s" : ""}`
        },
        totalLivrosUsuarios(): string {
            const tamanho = this.livrosUsuarios.length
            return `${tamanho} livro${tamanho != 1 ? "s" : ""}`
        }, 
        totalLivrosUsuariosDevolvidos(): string {
            const tamanho = this.livrosUsuariosDevolvidos.length
            return `${tamanho} livro${tamanho != 1 ? "s" : ""}`
        }
    },
    methods: {
        async buscaLivrosDisponiveis() {
            console.log("Buscando livros disponíveis em API")

            const livrosDisponiveisBanco = await this.livroDisponivelService.buscaLivrosDisponiveis(this.token)

            if (livrosDisponiveisBanco) {
                this.livrosDisponiveis = livrosDisponiveisBanco
            }
        },
        async buscaAutores() {
            console.log("Buscando autores em API")
            const autoresBanco = await this.autorService.buscaAutores(this.token)

            if (autoresBanco) {
                this.autores = autoresBanco
            }
        },
        async buscaLivrosUsuarios() {
            console.log("Buscando livros emprestados a usuários em API")
            const livrosUsuariosBanco = await this.livroUsuarioService.buscaLivroUsuarioPorUsuario(this.token, this.usuario)

            if (livrosUsuariosBanco) {
                this.livrosUsuarios = [] as LivroUsuarioJson[]
                this.livrosUsuariosDevolvidos = [] as LivroUsuarioJson[]

                console.log("Listando livros emprestados e devolvidos")

                livrosUsuariosBanco.forEach((lub) => {
                    if (!lub.dataFimLeitura) {
                        this.livrosUsuarios.push(lub)
                    } else {
                        this.livrosUsuariosDevolvidos.push(lub)
                    }
                })
            }
        },
        async buscaLivros() {
            console.log("Buscando livros em API")
            const livrosBanco = await this.livroService.buscaLivros(this.token)

            if (livrosBanco) {
                this.livros = livrosBanco
            }
        },
        async emprestaLivro(livro: LivroDisponivelJson) {
            console.log(`Emprestando livro ${livro.id} - ${livro.titulo}`)
            
            try {
                
                const livroEmprestado = await this.livroUsuarioService.salvaLivroUsuario(this.token, livro.id, this.usuario)

                if (livroEmprestado) {
                    this.buscaLivrosDisponiveis();
                    this.buscaLivrosUsuarios();

                    this.notificar(`Emprestado livro ${livro.titulo} para usuário ${this.usuario}`, TipoNotificacao.SUCESSO)
                }

            } catch (error) {
                if (error instanceof APIError) {
                    this.notificar(error.message, TipoNotificacao.FALHA)
                }
            }
            
        },
        async devolveLivro(idLivroUsuario: number) {
            const livroUsuario = this.livrosUsuarios.find(livroUsuario => livroUsuario.id == idLivroUsuario)

            if (livroUsuario) {
                const tituloLivro = this.retornaTituloLivro(livroUsuario.livroId)
                console.log(`Devolvendo livro ${tituloLivro}`)
    
                try {
                    
                    const livroDevolvido = await this.livroUsuarioService.alteraLivroUsuario(this.token, livroUsuario)
    
                    if (livroDevolvido) {
                        this.buscaLivrosDisponiveis();
                        this.buscaLivrosUsuarios();
    
                        this.notificar(`Devolvido livro ${tituloLivro}`, TipoNotificacao.SUCESSO)
                    }
    
                } catch (error) {
                    if (error instanceof APIError) {
                        this.notificar(error.message, TipoNotificacao.FALHA)
                    }
                }
            }
        },
        retornaNomeAutor(id: number) {
            const autorEncontrado = this.autores.find(autor => autor.id === id)
            return autorEncontrado?.nome
        },
        retornaTituloLivro(id: number) {
            const livroEncontrado = this.livros.find(livro => livro.id === id)
            return livroEncontrado?.titulo
        },
        retornaIdAutorPorIdLivro(id: number): number {
            const livroEncontrado = this.livros.find(livro => livro.id === id)
            if (livroEncontrado) {
                return livroEncontrado.autorId
            }
            return 0
        },
        formataData(data: string): string {
            if (!data) {
                return ""
            }

            const dataConvertida = new Date(data)

            return formataDataBR(dataConvertida)
        }
    },
    beforeMount() {
        if (this.semToken) {
            this.$router.push({ name: "login" })

            return
        }

        this.buscaAutores()
        this.buscaLivros()
        this.buscaLivrosDisponiveis()
        this.buscaLivrosUsuarios()
    },
    setup() {
        const store = useStore()
        const semToken = computed(() => store.getters.semToken)
        const token = computed(() => store.state.usuario.token)
        const usuario = computed(() => store.state.usuario.nomeUsuario)

        const { notificar } = useNotificador()
        const { definirGuiaAtiva } = useDefinidorGuiaAtiva()

        return {
            semToken,
            notificar,
            token,
            definirGuiaAtiva,
            usuario,
        }
    }
})
</script>

<style scoped>

</style>