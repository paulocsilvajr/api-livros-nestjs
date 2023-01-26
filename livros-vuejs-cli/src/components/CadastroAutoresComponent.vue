<template>
    <div class="container">

        <h1 class="title is-1 has-text-centered mt-6 mb-6">{{ titulo }}</h1>

        <GuiasComponent>

            <template v-slot:guia01>

                <form class="box" @submit.prevent="salvaAutor">

                    <div class="columns">

                        <input type="text" id="id" hidden v-model="autor.id">

                        <div class="column">
                            <div class="field">
                                <label for="nome">Nome do autor</label>
                                <div class="control">
                                    <input type="text" class="input" placeholder="Nome do autor" id="nome"
                                        v-model.trim="autor.nome" required>
                                </div>
                            </div>
                        </div>

                        <div class="column is-two-thirds">
                            <div class="field">
                                <label for="descricao">Descrição do autor</label>
                                <div class="control">
                                    <input type="text" class="input" placeholder="Descrição do autor" id="descricao"
                                        v-model.trim="autor.descricao">
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
                                    <button class="button is-warning is-fullwidth" @click="defineAutorVazio">
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

                    <table class="table is-hoverable is-fullwidth is-striped">
                        <thead>
                            <tr>
                                <th>Cód.</th>
                                <th>Nome</th>
                                <th>Descrição</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th colspan="2">Total</th>
                                <th colspan="2">{{ totalAutores }}</th>
                            </tr>
                        </tfoot>
                        <tbody>
                            <tr v-for="a in autores" :key="a.id" :class="autor.id == a.id ? 'is-selected' : ''">
                                <th class="is-vcentered">{{ a.id }}</th>
                                <td class="has-text-left is-vcentered" style="width: 20%;">{{ a.nome }}</td>
                                <td class="has-text-left is-vcentered">{{ a.descricao }}</td>
                                <td class="is-vcentered">
                                    <div class="field has-addons">
                                        <p class="control">
                                            <button class="button is-primary is-small" @click="alteraAutor(a)">
                                                <span class="icon is-small">
                                                    <i class="fas fa-pencil"></i>
                                                </span>
                                                <span>Alterar</span>
                                            </button>
                                        </p>
                                        <p class="control">
                                            <button class="button is-danger is-small" @click="exibeModalExclusao(a)">
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

    <ModalConfirmacaoComponent titulo="Confirmar exclusão de autor"
        :mensagem="'Deseja realmente excluir o autor ' + autor.nome " texto-botao="Excluir"
        @ao-clicar-confirmacao="excluiAutor" @ao-fechar-modal="fechaModal" v-if="exibeModal">
    </ModalConfirmacaoComponent>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'
import { Autor } from '@/models/autor'
import AutorService from '@/services/autor-service'
import useNotificador from '@/hooks/notificador'
import useDefinidorGuiaAtiva from '@/hooks/definidorGuiaAtiva'
import { TipoNotificacao } from '@/interfaces/INotificacoes'
import { APIError } from '@/errors/api-error'
import { CadastrarError } from '@/errors/cadastrar-error'
import GuiasComponent from '@/components/GuiasComponent.vue'
import { Guias } from '@/enums/Guias'
import ModalConfirmacaoComponent from './ModalConfirmacaoComponent.vue'

export default defineComponent({
    name: "CadastroAutoresComponent",
    components: {
        GuiasComponent,
        ModalConfirmacaoComponent,
    },
    data() {
        return {
            titulo: "Cadastro de autores",
            autores: [] as Autor[],
            autor: new Autor(),
            autorService: new AutorService(),
            exibeModal: false,
            carregando: {
                salvar: false,
            },
        }
    },
    computed: {
        totalAutores(): number {
            return this.autores.length
        }
    },
    methods: {
        defineAutorVazio() {
            this.autor = new Autor()
        },
        async salvaAutor() {
            this.carregando.salvar = true

            try {
                const autorCadastrado = await this.autorService.salvaAutor(this.autor, this.token)

                if (autorCadastrado) {
                    let msg: string
                    if (this.autor.id) {
                        msg = `Autor '${autorCadastrado.nome}' alterado com sucesso`
                    } else {
                        this.autores.push(autorCadastrado)
                        msg = `Autor '${autorCadastrado.nome}' cadastrado com sucesso`
                    }

                    this.notificar(msg, TipoNotificacao.SUCESSO)
                    console.log(msg)

                    this.defineAutorVazio()
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
        alteraAutor(autor: Autor) {
            this.autor = autor

            this.definirGuiaAtiva(Guias.Cadastro)
        },
        async excluiAutor() {
            try {
                if (await this.autorService.excluiAutor(this.autor, this.token)) {
                    this.notificar(`Excluído autor '${this.autor.nome}'`, TipoNotificacao.SUCESSO)

                    this.autores = this.autores.filter((a) => a.id != this.autor.id)
                }
            } catch (error) {
                if (error instanceof Error) {
                    this.notificar(`Autor '${this.autor.nome}' não pode ser excluído. Verifique se há livros associados com esse autor`, TipoNotificacao.FALHA)
                }
            }

            this.fechaModal()
        },
        async buscaAutores() {
            const autoresBanco = await this.autorService.buscaAutores(this.token)

            if (autoresBanco) {
                this.autores = autoresBanco
            }
        },
        exibeModalExclusao(autor: Autor) {
            this.exibeModal = true;
            this.autor = autor;
        },
        fechaModal() {
            this.exibeModal = false
            this.defineAutorVazio()
        },
    },
    beforeMount() {
        if (this.semToken) {
            this.$router.push({ name: "login" })

            return
        }

        this.buscaAutores()
    },
    setup() {
        const store = useStore()
        const semToken = computed(() => store.getters.semToken)
        const token = computed(() => store.state.usuario.token)

        const { notificar } = useNotificador()
        const { definirGuiaAtiva } = useDefinidorGuiaAtiva()

        return {
            semToken,
            notificar,
            token,
            definirGuiaAtiva
        }
    }
})
</script>

<style>

</style>