<template>
  <main class="container p-2">

    <CadastroLivros></CadastroLivros>

  </main>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CadastroLivros from './components/CadastroLivros.vue'

export default defineComponent({
  name: 'App',
  components: {
    CadastroLivros
  },
});
</script>

<style>

</style>
