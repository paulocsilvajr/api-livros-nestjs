<template>

    <div class="container">

        <h1 class="title is-1 has-text-centered mt-6 mb-6">{{ titulo }}</h1>

        <GuiasComponent nome-guia01="Livros Emprestados" nome-guia02="Livros Disponíveis">

            <template v-slot:guia01>
                <div class="table-container mt-1">

                    <table class="table is-hoverable is-fullwidth is-striped">
                        <thead>
                            <tr>
                                <th>A</th>
                                <th>B</th>
                                <th>C</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th colspan="2">Total</th>
                                <th colspan="2">???</th>
                            </tr>
                        </tfoot>
                        <tbody>
                            <tr>
                                <th class="is-vcentered">1</th>
                                <td class="has-text-left is-vcentered">2</td>
                                <td class="has-text-left is-vcentered">3</td>
                                <td class="is-vcentered">4</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </template>

            <template v-slot:guia02>

                <div class="table-container mt-1">

                    <table class="table is-hoverable is-fullwidth is-striped">
                        <thead>
                            <tr>
                                <th>Cód.</th>
                                <th>Título</th>
                                <th>Autor</th>
                                <th>Resumo</th>
                                <th>Nº páginas</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th colspan="2">Total</th>
                                <th colspan="2">{{ totalLivrosDisponiveis }}</th>
                            </tr>
                        </tfoot>
                        <tbody>
                            <tr v-for="ld in livrosDisponiveis" :key="ld.id">
                                <th class="is-vcentered">{{ ld.id }}</th>
                                <td class="has-text-left is-vcentered">{{ ld.titulo }}</td>
                                <td class="has-text-left is-vcentered">{{ retornaNomeAutor(ld.autorId) }}</td>
                                <td class="has-text-left is-vcentered">{{ ld.resumo }}</td>
                                <td class="is-vcentered">{{ ld.numeroPaginas }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </template>

        </GuiasComponent>

    </div>

</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import GuiasComponent from '@/components/GuiasComponent.vue'
import { useStore } from '@/store'
import useNotificador from '@/hooks/notificador'
import useDefinidorGuiaAtiva from '@/hooks/definidorGuiaAtiva'
import LivroDisponivelService from '@/services/livro-disponivel'
import LivroDisponivelJson from '@/interfaces/ILivroDisponivel';
import AutorService from '@/services/autor-service';
import AutorJson from '@/interfaces/IAutor';

export default defineComponent({
    name: 'EmprestimoLivrosComponent',
    components: {
        GuiasComponent,
    },
    data() {
        return {
            titulo: "Emprestimo de livros",
            livrosDisponiveis: [] as LivroDisponivelJson[],
            livroDisponivelService: new LivroDisponivelService(),
            autorService: new AutorService(),
            autores: [] as AutorJson[],
        }
    },
    computed: {
        totalLivrosDisponiveis(): string {
            const tamanho = this.livrosDisponiveis.length
            return `${tamanho} livro${tamanho != 1 ? "s" : ""}`
        }
    },
    methods: {
        async buscaLivrosDisponiveis() {
            console.log("Buscando livros disponíveis em API")

            const livrosDisponiveisBanco = await this.livroDisponivelService.buscaLivrosDisponiveis(this.token)

            if (livrosDisponiveisBanco) {
                this.livrosDisponiveis = livrosDisponiveisBanco
            }
        },
        async buscaAutores() {
            console.log("Buscando autores em API")
            const autoresBanco = await this.autorService.buscaAutores(this.token)

            if (autoresBanco) {
                this.autores = autoresBanco
            }
        },
        retornaNomeAutor(id: number) {
            const autorEncontrado = this.autores.find(autor => autor.id === id)
            return autorEncontrado?.nome
        },
    },
    beforeMount() {
        if (this.semToken) {
            this.$router.push({ name: "login" })

            return
        }

        this.buscaAutores()
        this.buscaLivrosDisponiveis()
    },
    setup() {
        const store = useStore()
        const semToken = computed(() => store.getters.semToken)
        const token = computed(() => store.state.usuario.token)

        const { notificar } = useNotificador()
        const { definirGuiaAtiva } = useDefinidorGuiaAtiva()

        return {
            semToken,
            notificar,
            token,
            definirGuiaAtiva
        }
    }
})
</script>

<style scoped>

</style>