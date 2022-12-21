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
            switch (this.$props.tipo) {
                case 'sucesso':
                    return 'is-success';
                case 'alerta':
                    return 'is-warning';
                case 'info':
                    return 'is-info';
                default:
                    return 'is-danger';
            }
        },
        temMensagem(): boolean {
            return this.mensagem.length > 0;
        }
    },
})

</script>

<style>

</style>