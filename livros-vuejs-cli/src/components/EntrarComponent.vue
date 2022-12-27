<template>
    <h1 class="title is-1 mt-3 mb-6">Login</h1>
    
    <div class="columns is-flex is-justify-content-center">
        <div class="column is-6 is-4-desktop">
            <form class="box" @submit.prevent="entra()">
                <div class="field mb-5">
                    <label for="usuario" class="label">Usuário</label>
                    <div class="control">
                        <input type="text" class="input" placeholder="Nome do usuário" id="usuario" v-model="usuario.nome" required>
                    </div>
                </div>
                <div class="mb-6">
                    <InputSenhaComponent v-model="usuario.senha" required/>
                </div>

                <MensagemComponent :tipo="msg.tipo" :mensagem="msg.mensagem">
                    <button class="delete" @click="fechaMensagem()"></button>
                </MensagemComponent>

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
import MensagemComponent from '@/components/MensagemComponent.vue';
import ApiService from '@/services/api-service';
import EntrarService from '@/services/entrar-service';
import { NaoAutorizadoError } from '@/errors/nao-autorizado-error'

export default defineComponent({
    name: "EntrarComponent",
    components: { 
        InputSenhaComponent,
        MensagemComponent,
    },
    data() {
        return {
            apiService: new ApiService(),
            msg: {
                mensagem: "",
                tipo: "perigo",
            },
            usuario: new Usuario(),
            entrarService: new EntrarService(),
        }
    },
    methods: {
        async entra() {
            if (!this.verificaLogin()) {
                this.msg.mensagem = "Informe um usuário e senha"
                this.msg.tipo = "perigo"
                
                return
            }

            try {
                console.log(`Entrando como usuário '${this.usuario.nome}'...`)

                const token = await this.entrarService.entrar(this.usuario)
                if (token) {
                    this.$store.state.nomeUsuario = this.usuario.nome
                    this.$store.state.senha = this.usuario.senha
                    this.$store.state.token = token.access_token

                    this.msg.mensagem = "Entrando..."
                    this.msg.tipo = "sucesso"

                    this.limpaCampos()

                    this.$router.push({ name: "cadastro-livros" })
                }
            } catch (error) {
                if (error instanceof NaoAutorizadoError) {
                    this.msg.mensagem = `Usuário ou senha inválida`
                    this.msg.tipo = "perigo"

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
                this.msg.mensagem = "API Online"
                this.msg.tipo = "sucesso";

                return
            }

            this.msg.mensagem = `Ocorreu algum problema ao tentar conectar na API '${this.apiService.getUrl()}'`
        },
        fechaMensagem() {
            this.msg.mensagem = "";
        }
    },
    beforeMount() {
        this.verificaAPI();
    },
})

</script>

<style>

</style>