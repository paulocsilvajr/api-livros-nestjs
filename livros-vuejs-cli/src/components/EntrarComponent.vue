<template>
    <h1 class="title is-1 mt-3 mb-6">Login</h1>

    <div class="columns is-flex is-justify-content-center">
        <div class="column is-6 is-4-desktop">
            <form class="box" @submit.prevent="entra()">
                <div class="field mb-5">
                    <label for="usuario" class="label">Usuário</label>
                    <div class="control">
                        <input type="text" class="input" placeholder="Nome do usuário" id="usuario"
                            v-model="usuario.nome" required>
                    </div>
                </div>
                <div class="mb-6">
                    <InputSenhaComponent v-model="usuario.senha" required />
                </div>

                <button class="button is-primary is-fullwidth mb-5" type="submit">Entrar</button>

                <a href="/cadastro-usuario">Cadastrar um novo usuário</a>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Usuario from '@/models/usuario';
import InputSenhaComponent from '@/components/InputSenhaComponent.vue';
import ApiService from '@/services/api-service';
import EntrarService from '@/services/entrar-service';
import { NaoAutorizadoError } from '@/errors/nao-autorizado-error'
import { useStore } from '@/store';
import { TipoNotificacao } from '@/interfaces/INotificacoes'
import useNotificador from '@/hooks/notificador'

export default defineComponent({
    name: "EntrarComponent",
    components: {
        InputSenhaComponent,
    },
    data() {
        return {
            apiService: new ApiService(),
            usuario: new Usuario(),
            entrarService: new EntrarService(),
        }
    },
    methods: {
        async entra() {
            if (!this.verificaLogin()) {
                this.notificar("Informe um usuário e senha", TipoNotificacao.FALHA)

                return
            }

            try {
                console.log(`Entrando como usuário '${this.usuario.nome}'...`)

                const token = await this.entrarService.entrar(this.usuario)
                if (token) {
                    this.store.state.usuario.nomeUsuario = this.usuario.nome
                    this.store.state.usuario.senha = this.usuario.senha
                    this.store.state.usuario.token = token.access_token
                    console.log(this.store.state.usuario)

                    this.notificar("Entrando...", TipoNotificacao.SUCESSO)

                    this.limpaCampos()

                    this.$router.push({ name: "cadastro-livros" })
                }
            } catch (error) {
                if (error instanceof NaoAutorizadoError) {
                    this.notificar("Usuário ou senha inválida", TipoNotificacao.FALHA)

                    console.log(error.message)
                }
            }
        },
        limpaCampos() {
            this.usuario.nome = '';
            this.usuario.senha = '';
        },
        verificaLogin() {
            return this.usuario.nome.length > 0 && this.usuario.senha.length > 0
        },
        async verificaAPI() {
            if (await this.apiService.apiEstaOnline()) {
                this.notificar("API Online", TipoNotificacao.SUCESSO)

                return
            }

            this.notificar(`Ocorreu algum problema ao tentar conectar na API '${this.apiService.getUrl()}'`, TipoNotificacao.ATENCAO)
        },
    },
    beforeMount() {
        this.verificaAPI();
    },
    setup() {
        const store = useStore()
        const { notificar } = useNotificador()

        return {
            store,
            notificar,
        }
    }
})

</script>

<style>

</style>