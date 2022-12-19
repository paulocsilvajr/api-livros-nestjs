<template>
    <h1 class="title is-1 mt-3 mb-6">Login</h1>
    
    <div class="columns is-flex is-justify-content-center">
        <div class="column is-6 is-4-desktop">
            <div class="box">
                <div class="field mb-5">
                    <label for="usuario" class="label">Usuário</label>
                    <div class="control">
                        <input type="text" class="input" placeholder="Nome do usuário" id="usuario" v-model="usuario.nome">
                    </div>
                </div>
                <div class="mb-6">
                    <InputSenhaComponent v-model="usuario.senha"/>
                </div>

                <div class="notification" :class="mensagem.tipo" v-if="mensagem.ativa">
                    <button class="delete" @click="fechaNotificacao()"></button>
                    {{ msgFormatada }}
                </div>

                <button class="button is-primary is-fullwidth mb-5" @click="entra()">Entrar</button>

                <a href="/cadastro-usuario">Cadastrar um novo usuário</a>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Usuario from '@/models/usuario';
import InputSenhaComponent from '@/components/InputSenhaComponent.vue';


export default defineComponent({
    name: "EntrarComponent",
    components: { 
        InputSenhaComponent,
    },
    data() {
        return {
            mensagem: {
                texto: 'mensagem',
                tipo: 'is-danger',
                ativa: true 
            },
            usuario: new Usuario(),
        }
    },
    computed: {
        msgFormatada(): string {
            // torna primeira letra maiúscula
            return this.mensagem.texto.charAt(0).toUpperCase() + this.mensagem.texto.slice(1);
        }
    },
    methods: {
        entra() {
            console.log(`Entrando em API com usuário '${this.usuario.nome}'...`);
            
            this.$store.state.nomeUsuario = this.usuario.nome;
            this.$store.state.senha = this.usuario.senha;
            console.log(this.$store.state, this.usuario);

            this.limparCampos();
        },
        limparCampos() {
            this.usuario.nome = '';
            this.usuario.senha = '';
        },
        fechaNotificacao() {
            this.mensagem.ativa = false;
        }
    },
    beforeMount() {
        console.log('método beforeMount');
    },
})

</script>

<style>

</style>