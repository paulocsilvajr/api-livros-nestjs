<template>
    <h1>Login</h1>
</template>

<script lang="ts">
import { defineComponent } from 'vue';


export default defineComponent({
    name: "EntrarComponent",
    components: { },
    data() {
        return {
            msg: '',
        }
    },
    computed: {
        msgFormatada() {
            // torna primeira letra maiúscula
            return this.msg.charAt(0).toUpperCase() + this.msg.slice(1)
        }
    },
    methods: {

    },
    beforeMount() {
        console.log('método beforeMount')
    },
})

</script>

<style>

</style>