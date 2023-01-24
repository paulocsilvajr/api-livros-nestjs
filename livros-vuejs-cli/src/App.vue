<template>
  <nav class="breadcrumb has-dot-separator is-centered top" aria-label="breadcrumbs" v-if="exibirNavegacao">
    <ul>
      <li>
        <router-link to="/">
          <span class="icon is-small">
            <i class="fas fa-home" aria-hidden="true"></i>
          </span>
          <span>Livros</span>
        </router-link>
      </li>
      <li>
        <router-link to="/autores">
          <span class="icon is-small">
            <i class="fas fa-book" aria-hidden="true"></i>
          </span>
          <span>Autores</span>
        </router-link>
      </li>
      <li>
        <router-link to="/usuarios">
          <span class="icon is-small">
            <i class="fas fa-user" aria-hidden="true"></i>
          </span>
          <span>Usuários</span>
        </router-link>
      </li>
      <li>
        <router-link to="/about">About</router-link>
      </li>
      <li>
        <router-link to="/login">
          <span class="icon is-small">
            <i class="fa-solid fa-right-from-bracket"></i>
          </span>
          <span>Logout</span>
        </router-link>
      </li>
    </ul>
  </nav>

  <div class="cabecalho">
    <NotificacoesComponent></NotificacoesComponent>
    <router-view/>
  </div>
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
  background-color: white;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.top {
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 100;
}

.cabecalho {
  padding-top: 3rem;
}

@media only screen and (max-width: 600px) {
  .cabecalho {
    padding-top: 6rem;
  }
}
</style>
