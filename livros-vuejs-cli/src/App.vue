<template>
  <nav v-if="exibirNavegacao">
    <router-link to="/login">Login</router-link> |
    <router-link to="/">Cadastro de Livros</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <NotificacoesComponent></NotificacoesComponent>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import NotificacoesComponent from './components/NotificacoesComponent.vue'
import { useStore } from './store';

export default defineComponent({
  name: 'App',
  components: {
    NotificacoesComponent
  },
  setup() {
    const store = useStore()

    const exibirNavegacao = computed(() => !store.getters.semToken)

    return {
      exibirNavegacao
    }
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
