<template>
  <main class="container p-2">

    <div class="columns">
      <div class="column mt-6">
        <h1 class="title is-1 has-text-centered">{{ titulo }}</h1>
      </div>
    </div>

    <div class="columns is-vcentered">

      <div class="column is-three-quarters">
        <div class="field">
          <label for="nome">Título</label>
          <div class="control">
            <input type="text" class="input" placeholder="Título do livro" id="nome">
          </div>
        </div>
      </div>

      <div class="column">
        <div class="field">
          <label for="autor">Autor</label>
          <div class="control">
            <input type="text" class="input" placeholder="Nome do autor" id="autor">
          </div>
        </div>
      </div>

    </div>

    <div class="columns is-vcentered">

      <div class="column">
        <div class="field">
          <label for="npaginas">Número de páginas</label>
          <div class="control">
            <input type="number" class="input" placeholder="Número de páginas" id="npaginas">
          </div>
        </div>
      </div>

      <div class="column">
        <div class="field">
          <label for="datacompra">Data de compra</label>
          <div class="control">
            <input type="date" class="input" placeholder="Data de compra" id="datacompra">
          </div>
        </div>
      </div>

      <div class="column is-one-quarter">
        <div class="field">
          <div class="control">
            <label class="checkbox" for="lido">
              <input type="checkbox" id="lido">
              Lido
            </label>
          </div>
        </div>
      </div>

    </div>

    <div class="colums">

      <div class="buttons has-addons">
        <button class="button is-success">
          <span class="icon is-small">
            <i class="fas fa-check"></i>
          </span>
          <span>Salvar</span>
        </button>
        <button class="button is-warning">
          <span class="icon is-small">
            <i class="fas fa-times"></i>
          </span>
          <span>Limpar</span>
        </button>
      </div>

    </div>


    <div class="table-container mt-6">

      <table class="table is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th>#</th>
            <th>Título</th>
            <th>Autor</th>
            <th>N° páginas</th>
            <th>Compra</th>
            <th>Lido</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="l in livros" :key="l.id">
            <th>{{ l.id }}</th>
            <td>{{ l.nome }}</td>
            <td>{{ l.autor }}</td>
            <td>{{ l.numeroPaginas }}</td>
            <td>{{ formataDataBR(l.dataCompra) }}</td>
            <td>
              <strong v-if="l.lido">SIM</strong>
              <span v-else>não</span>
            </td>
          </tr>
          <!-- <tr class="is-selected">
            <th>2</th>
            <td>A coisa</td>
            <td>Stephen King</td>
            <td>1200</td>
            <td>01/02/2000</td>
            <td>não</td>
          </tr> -->
        </tbody>
      </table>

    </div>

  </main>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Livro from './models/livro';

export default defineComponent({
  name: 'App',
  components: {
  },
  created() {
    return {
      URL: 'http://localhost:3000/api/livros'
    }
  },
  data() {
    return {
      titulo: 'Cadastro de livros',
      livro: new Livro(),
      livros: new Array<Livro>(),
    }
  },
  methods: {
    defineLivroVazio() {
      this.livro = new Livro()
    },
    buscaLivros() {
      const l1 = new Livro(1, 'A espera de um milagre', 'Stephen King', 1023, new Date('2022-01-03'), true)
      const l2 = new Livro(2, 'It', 'Stephen King', 1200, new Date('2021-12-11'), false)

      this.livros.push(l1)
      this.livros.push(l2)
    },
    formataDataBR(data: Date) {
      return data.toLocaleDateString('pt-BR', { timeZone: 'UTC' })
    },
  },
  beforeMount() {
    this.defineLivroVazio()
    this.buscaLivros();
  }
});
</script>

<style>

</style>
