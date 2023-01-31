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
                                <th>D</th>
                                <th>E</th>
                                <th>F</th>
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
                                <th class="is-vcentered">5</th>
                                <td class="has-text-left is-vcentered">6</td>
                                <td class="has-text-left is-vcentered">7</td>
                                <td class="is-vcentered">8</td>
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

export default defineComponent({
    name: 'EmprestimoLivrosComponent',
    components: {
        GuiasComponent,
    },
    data() {
        return {
            titulo: "Emprestimo de livros",
        }
    },
    beforeMount() {
        if (this.semToken) {
            this.$router.push({ name: "login" })

            return
        }
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