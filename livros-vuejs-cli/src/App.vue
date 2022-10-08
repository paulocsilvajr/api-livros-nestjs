<template>
  <main class="container p-2">

    <div class="columns">
      <div class="column mt-6">
        <h1 class="title is-1 has-text-centered">{{ titulo }}</h1>
      </div>
    </div>

    <div class="columns is-vcentered">

      <input type="text" id="id" hidden v-model="livro.id">

      <div class="column is-three-quarters">
        <div class="field">
          <label for="nome">Título</label>
          <div class="control">
            <input type="text" class="input" placeholder="Título do livro" id="nome" v-model.trim="livro.nome">
          </div>
        </div>
      </div>

      <div class="column">
        <div class="field">
          <label for="autor">Autor</label>
          <div class="control">
            <input type="text" class="input" placeholder="Nome do autor" id="autor"  v-model.trim="livro.autor">
          </div>
        </div>
      </div>

    </div>

    <div class="columns is-vcentered">

      <div class="column">
        <div class="field">
          <label for="npaginas">Número de páginas</label>
          <div class="control">
            <input type="number" class="input" placeholder="Número de páginas" id="npaginas"  v-model="livro.numeroPaginas">
          </div>
        </div>
      </div>

      <div class="column">
        <div class="field">
          <label for="datacompra">Data de compra</label>
          <div class="control">
            <input type="date" class="input" placeholder="Data de compra" id="datacompra"  v-model="livro.dataCompraInput">
          </div>
        </div>
      </div>

      <div class="column is-one-quarter">
        <div class="field">
          <div class="control">
            <label class="checkbox" for="lido">
              <input type="checkbox" id="lido" v-model="livro.lido">
              Lido
            </label>
          </div>
        </div>
      </div>

    </div>

    <div class="colums">

      <div class="buttons has-addons">
        <button class="button is-success" @click="salvaLivro">
          <span class="icon is-small">
            <i class="fas fa-check"></i>
          </span>
          <span>Salvar</span>
        </button>
        <button class="button is-warning" @click="defineLivroVazio">
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
            <th></th>
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
            <td>
              <div class="buttons has-addons is-centered">
                <button class="button is-info is-small">Alterar</button>
                <button class="button is-danger is-small">Remover</button>
              </div>
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
import LivroService from './services/livro-service';

export default defineComponent({
  name: 'App',
  components: {
  },
  data() {
    return {
      livroService: new LivroService(),
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
      this.livroService.buscaLivros(this.livros)
    },
    salvaLivro() {
      if(this.livro.nome === '') {
        alert('Informe o título do livro')
        return
      } else if (this.livro.autor === '') {
        alert('Informe o nome do autor')
        return
      } else if (this.livro.numeroPaginas < 1) {
        alert('Informe o número de páginas')
        return
      }

      this.livroService.salvaLivro(this.livro, this.livros)

      this.defineLivroVazio()
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
