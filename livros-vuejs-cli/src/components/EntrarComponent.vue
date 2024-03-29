<template>
    <h1 class="title is-1 mt-6 mb-6">Login</h1>

    <div class="columns is-flex is-justify-content-center">
        <div class="column is-6 is-4-desktop">
            <form class="box" @submit.prevent="entra()">
                <div class="field mb-5">
                    <label for="username" class="label">Usuário</label>
                    <div class="control">
                        <input type="text" class="input" placeholder="Nome do usuário" id="username"
                            v-model="usuario.nome" required>
                    </div>
                </div>
                <div class="mb-6">
                    <InputSenhaComponent v-model="usuario.senha" required />
                </div>

                <button class="button is-primary is-fullwidth mb-5" :class="carregando.entrar ? 'is-loading' : ''" type="submit">Entrar</button>

                <a href="/usuarios">Cadastrar um novo usuário</a>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { Usuario } from '@/models/usuario';
import InputSenhaComponent from '@/components/InputSenhaComponent.vue';
import ApiService from '@/services/api-service';
import EntrarService from '@/services/entrar-service';
import { NaoAutorizadoError } from '@/errors/nao-autorizado-error'
import { useStore } from '@/store';
import { TipoNotificacao } from '@/interfaces/INotificacoes'
import useNotificador from '@/hooks/notificador'
import { SALVAR_INFORMACOES_USUARIO, LIMPAR_INFORMACOES_USUARIO } from '@/store/tipos-mutacoes';

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
            carregando: {
                entrar: false
            }
        }
    },
    methods: {
        async entra() {
            if (!this.verificaLogin()) {
                this.notificar("Informe um usuário e senha", TipoNotificacao.FALHA)

                return
            }

            this.carregando.entrar = true

            try {
                const token = await this.entrarService.entrar(this.usuario)
                if (token) {
                    console.log(`Entrando como usuário '${this.usuario.nome}'...`)

                    this.store.commit(SALVAR_INFORMACOES_USUARIO, {
                        nomeUsuario: this.usuario.nome,
                        senha: this.usuario.senha,
                        token: token.access_token,
                    })

                    this.notificar(`Entrando como usuário ${this.nomeUsuario}...`, TipoNotificacao.SUCESSO)

                    this.limpaCampos()

                    this.$router.push({ name: "cadastro-livros" })
                }
            } catch (error) {
                if (error instanceof NaoAutorizadoError) {
                    this.notificar("Usuário ou senha inválida", TipoNotificacao.FALHA)

                    console.warn(error.message)
                }

                this.store.commit(LIMPAR_INFORMACOES_USUARIO)
            }
            
            this.carregando.entrar = false
        },
        limpaCampos() {
            this.usuario.nome = ''
            this.usuario.senha = ''
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
        this.store.commit(LIMPAR_INFORMACOES_USUARIO)

        this.verificaAPI()
    },
    setup() {
        const store = useStore()
        const { notificar } = useNotificador()
        const nomeUsuario = computed(() => store.state.usuario.nomeUsuario)

        return {
            store,
            nomeUsuario,
            notificar,
        }
    }
})

</script>

<style>

</style>