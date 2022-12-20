<template>

<div class="notification" :class="tipoNotificacao">
    <slot></slot>
</div>

</template>

<script lang="ts">
import { defineComponent, Comment } from 'vue';


export default defineComponent({
    name: "MensagemComponent",
    props: {
        tipo: String,
    },
    computed: {
        tipoNotificacao(): string {
            if (this.$props.tipo === 'sucesso')
                return 'is-success'
            
            return 'is-danger'
        },
    },
})

</script>

<style>

</style>