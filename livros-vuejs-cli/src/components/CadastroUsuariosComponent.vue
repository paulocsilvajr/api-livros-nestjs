<template>
    <div class="container">

        <div class="columns">
            <div class="column mt-6">
                <h1 class="title is-1 has-text-centered">{{ titulo }}</h1>
            </div>
        </div>

        <div class="box">

            <div class="columns">

                <div class="column">
                    <div class="field">
                        <label for="username">Nome</label>
                        <div class="control">
                            <input type="text" class="input" placeholder="Nome do usuário" id="username"
                                v-model.trim="usuario.nome">
                        </div>
                        <p class="help is-danger" v-if="validacaoCampos.nome">Informe um nome de usuário</p>
                    </div>
                </div>

                <div class="column">
                    <div class="field">
                        <label for="email">Email</label>
                        <div class="control">
                            <input type="email" class="input" placeholder="Email do usuário" id="email"
                                v-model.trim="usuario.email">
                        </div>
                        <p class="help is-danger" v-if="validacaoCampos.email">Informe um email para o usuário</p>
                    </div>
                </div>

                <div class="column">
                    <div class="field">
                        <label for="password">Senha</label>
                        <div class="control">
                            <input type="password" class="input" placeholder="Senha do usuário" id="password"
                                v-model.trim="usuario.senha">
                        </div>
                        <p class="help is-danger" v-if="validacaoCampos.senha">Informe uma senha para o usuário</p>
                    </div>
                </div>

            </div>

            <div class="colums is-desktop">
                <div class="column is-half">
                    <div class="columns">
                        <div class="column">
                            <button class="button is-success is-fullwidth" @click="salvaUsuario">
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

        </div>

    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'
import { Usuario, verificarUsuario } from '@/models/usuario'
import UsuarioService from '@/services/usuario-service'
import { CadastrarError } from '@/errors/cadastrar-error'
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
            validacaoCampos: { nome: false, senha: false, email: false },
        }
    },
    methods: {
        defineUsuarioVazio() {
            this.usuario = new Usuario()
            this.validacaoCampos.nome = this.validacaoCampos.senha = this.validacaoCampos.email = false
        },
        async salvaUsuario() {
            try {
                this.validacaoCampos.nome = this.usuario.nome === ""
                this.validacaoCampos.senha = this.usuario.email === ""
                this.validacaoCampos.email = this.usuario.senha === ""

                if (this.validacaoCampos.nome ||
                    this.validacaoCampos.email ||
                    this.validacaoCampos.senha) {
                    return
                }

                try {
                    verificarUsuario(this.usuario)
                } catch (error) {
                    if (error instanceof TamanhoError) {
                        this.notificar(error.message, TipoNotificacao.FALHA)
                    } 
                    return                   
                }

                const usuarioCadastrado = await this.usuarioService.salvaUsuario(this.usuario)

                this.notificar(`Usuário '${this.usuario.nome}' cadastrado com sucesso`, TipoNotificacao.SUCESSO)
                console.log("Usuário cadastrado: ", usuarioCadastrado);

                this.defineUsuarioVazio()
            } catch (error) {
                if (error instanceof CadastrarError) {
                    this.notificar("Erro ao cadastrar usuário", TipoNotificacao.FALHA)
                }
            }
        },
        voltaParaLogin() {
            this.$router.push({ name: "login" })
        }
    },
    setup() {
        const store = useStore()
        const exibirBotaoVoltar = computed(() => store.getters.semToken)

        const { notificar } = useNotificador()

        return {
            exibirBotaoVoltar,
            notificar
        }
    }
})
</script>

<style>

</style>