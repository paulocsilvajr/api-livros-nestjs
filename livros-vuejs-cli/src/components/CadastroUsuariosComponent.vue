<template>
    <div class="container">

        <h1 class="title is-1 has-text-centered mt-6 mb-6">{{ titulo }}</h1>

        <form class="box" @submit.prevent="salvaUsuario">

            <div class="columns">

                <div class="column">
                    <div class="field">
                        <label for="username">Nome</label>
                        <div class="control">
                            <input type="text" class="input" placeholder="Nome do usuário" id="username"
                                v-model.trim="usuario.nome" required>
                        </div>
                    </div>
                </div>

                <div class="column">
                    <div class="field">
                        <label for="email">Email</label>
                        <div class="control">
                            <input type="email" class="input" placeholder="Email do usuário" id="email"
                                v-model.trim="usuario.email" required>
                        </div>
                    </div>
                </div>

                <div class="column">
                    <div class="field">
                        <label for="password">Senha</label>
                        <div class="control">
                            <input type="password" class="input" placeholder="Senha do usuário" id="password"
                                v-model.trim="usuario.senha" required>
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
                            <button class="button is-warning is-fullwidth" @click="defineUsuarioVazio">
                                <span class="icon is-small">
                                    <i class="fas fa-times"></i>
                                </span>
                                <span>Limpar</span>
                            </button>
                        </div>
                        <div class="column" v-if="exibirBotaoVoltar">
                            <button class="button is-primary is-fullwidth" @click="voltaParaLogin">
                                <span class="icon is-small">
                                    <i class="fas fa-arrow-left"></i>
                                </span>
                                <span>Voltar</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </form>

    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'
import { Usuario, verificarUsuario } from '@/models/usuario'
import UsuarioService from '@/services/usuario-service'
import { CadastrarError } from '@/errors/cadastrar-error'
import { APIError } from '@/errors/api-error'
import useNotificador from '@/hooks/notificador'
import { TipoNotificacao } from '@/interfaces/INotificacoes'
import { TamanhoError } from '@/errors/tamanho-error'

export default defineComponent({
    name: "CadastroUsuariosComponent",
    components: {

    },
    data() {
        return {
            usuarioService: new UsuarioService(),
            titulo: "Cadastro de usuários",
            usuario: new Usuario(),
            msg: "",
            carregando: {
                salvar: false
            }
        }
    },
    methods: {
        defineUsuarioVazio() {
            this.usuario = new Usuario()
        },
        async salvaUsuario() {
            this.carregando.salvar = true

            try {
                if (verificarUsuario(this.usuario)) {
                    const usuarioCadastrado = await this.usuarioService.salvaUsuario(this.usuario)

                    if (usuarioCadastrado) {
                        const msg = `Usuário '${usuarioCadastrado.nome}' cadastrado com sucesso`
                        this.notificar(msg, TipoNotificacao.SUCESSO)
                        console.log(msg);
    
                        this.defineUsuarioVazio()
                    }
                }
            } catch (error) {
                if (error instanceof APIError) {
                    this.notificar(error.message, TipoNotificacao.FALHA)
                } else if (error instanceof TamanhoError) {
                    this.notificar(error.message, TipoNotificacao.FALHA)
                } else if (error instanceof CadastrarError) {
                    this.notificar("Erro ao cadastrar usuário", TipoNotificacao.FALHA)
                }
            }

            this.carregando.salvar = false
        },
        async buscaUsuarioLogado() {
            try {
                const usuarioLogado = await this.usuarioService.buscaUsuarioPorNome(this.store.state.usuario.nomeUsuario, this.token)
                if (usuarioLogado) {
                    console.log('Usuário logado', usuarioLogado)
                }
            } catch (error) {
                if (error instanceof Error) {
                    console.warn(error.message)
                }
            }
        },
        voltaParaLogin() {
            this.$router.push({ name: "login" })
        }
    },
    beforeMount() {
        this.buscaUsuarioLogado()
    },
    setup() {
        const store = useStore()
        const exibirBotaoVoltar = computed(() => store.getters.semToken)
        const token = computed(() => store.state.usuario.token)

        const { notificar } = useNotificador()

        return {
            exibirBotaoVoltar,
            notificar,
            store,
            token,
        }
    }
})
</script>

<style>

</style>