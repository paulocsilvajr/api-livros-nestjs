<template>

    <div class="container">

        <h1 class="title is-1 has-text-centered mt-6 mb-6">{{ titulo }}</h1>

    </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'EmprestimoLivrosComponent',
    components: {

    },
    data() {
        return {
            titulo: "Emprestimo de livros",
        }
    },
})
</script>

<style scoped>

</style>