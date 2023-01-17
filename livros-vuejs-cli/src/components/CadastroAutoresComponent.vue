<template>
    <div class="container">

        <h1 class="title is-1 has-text-centered mt-6 mb-6">{{ titulo }}</h1>

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
                                v-model.trim="autor.descricao" required>
                        </div>
                    </div>
                </div>

            </div>

            <div class="colums is-desktop">
                <div class="column is-half p-0">
                    <div class="columns">
                        <div class="column">
                            <button type="submit" class="button is-success is-fullwidth">
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

        <div class="table-container mt-6">

            <table class="table is-hoverable is-fullwidth">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th></th>
                    </tr>
                </thead>
                <tfoot>
                    <tr>
                        <th>Total</th>
                        <th>{{ totalAutores }}</th>
                        <th></th>
                        <th></th>
                    </tr>
                </tfoot>
                <tbody>
                    <tr v-for="a in autores" :key="a.id">
                        <th>{{ a.id }}</th>
                        <td>{{ a.nome }}</td>
                        <td>{{ a.descricao }}</td>
                        <td></td>
                    </tr>
                </tbody>
            </table>

        </div>

    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'
import { Autor } from '@/models/autor'
import AutorService from '@/services/autor-service'
import useNotificador from '@/hooks/notificador'
import { TipoNotificacao } from '@/interfaces/INotificacoes'
import { APIError } from '@/errors/api-error'
import { CadastrarError } from '@/errors/cadastrar-error'

export default defineComponent({
    name: "CadastroAutoresComponent",
    components: {

    },
    data() {
        return {
            titulo: "Cadastro de autores",
            autores: [] as Autor[],
            autor: new Autor(),
            autorService: new AutorService(),
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
            try {
                const autorCadastrado = await this.autorService.salvaAutor(this.autor, this.token)

                if (autorCadastrado) {
                    this.autores.push(autorCadastrado)
    
                    const msg = `Autor '${autorCadastrado.nome}' cadastrado com sucesso`
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

        },
        async buscaAutores() {
            const autoresBanco = await this.autorService.buscaAutores(this.token)

            if (autoresBanco) {
                this.autores = autoresBanco
            }
        }
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

        return {
            semToken,
            notificar,
            token
        }
    }
})
</script>

<style>

</style>