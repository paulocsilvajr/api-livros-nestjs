<template>
    <div class="mb-6">
        <div class="tabs is-boxed">
            <ul>
                <li :class="guiaAtiva == guiaCadastro ? 'is-active' : ''" @click="defineGuia(guiaCadastro)"><a>Novo
                        cadastro</a></li>
                <li :class="guiaAtiva == guiaListagem ? 'is-active' : ''" @click="defineGuia(guiaListagem)">
                    <a>Listagem</a>
                </li>
            </ul>
        </div>
        
        <slot name="guia01" v-if="guiaAtiva == guiaCadastro">

        </slot>

        <slot name="guia02" v-if="guiaAtiva == guiaListagem">

        </slot>
    </div>
</template>

<script lang="ts">

import { computed, defineComponent } from 'vue';
import { Guias } from '@/enums/Guias'
import { useStore } from '@/store';
import { DEFINIR_GUIA_ATIVA } from '@/store/tipos-mutacoes'

export default defineComponent({
    name: 'GuiasComponent',
    data() {
        return {
            guiaCadastro: Guias.Cadastro,
            guiaListagem: Guias.Listagem
        }
    },
    methods: {
        defineGuia(guia: Guias) {
            this.store.commit(DEFINIR_GUIA_ATIVA, guia)
        },
    },
    setup() {
        const store = useStore()
        const guiaAtiva = computed(() => store.state.guiaAtiva)

        return {
            store,
            guiaAtiva
        }
    }
})
</script>

<style scoped>

</style>