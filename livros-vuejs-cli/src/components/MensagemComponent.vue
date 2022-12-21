<template>

<div class="notification" :class="tipoNotificacao" v-if="temMensagem">
    {{ mensagem }}
    <slot></slot>
</div>

</template>

<script lang="ts">
import { defineComponent } from 'vue';


export default defineComponent({
    name: "MensagemComponent",
    props: {
        tipo: String,
        mensagem: {
            type: String,
            default: "",
        }
    },
    computed: {
        tipoNotificacao(): string {
            if (this.$props.tipo === 'sucesso')
                return 'is-success'
            
            return 'is-danger'
        },
        temMensagem(): boolean {
            return this.mensagem.length > 0;
        }
    },
})

</script>

<style>

</style>