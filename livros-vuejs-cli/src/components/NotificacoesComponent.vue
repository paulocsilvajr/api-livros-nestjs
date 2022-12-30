<template>
    <div class="notificacoes">
        <div class="notification" :class="contexto[notificacao.tipo]" v-for="notificacao in notificacoes" :key="notificacao.id">
            <button class="delete" @click="fechaMensagem(notificacao)"></button>
            {{ notificacao.texto }}
        </div>
    </div>
</template>

<script lang="ts">
import { INotificacao, TipoNotificacao } from '@/interfaces/INotificacoes';
import { useStore } from '@/store';
import { REMOVER_NOTIFICACAO } from '@/store/tipos-mutacoes';
import { defineComponent, computed } from 'vue';


export default defineComponent({
    name: "NotificacoesComponent",
    data () {
        return {
            contexto: {
                [TipoNotificacao.SUCESSO]: 'is-success',
                [TipoNotificacao.ATENCAO]: 'is-warning',
                [TipoNotificacao.FALHA]: 'is-danger',
                [TipoNotificacao.INFO]: 'is-info',
            }
        }
    },
    methods: {
        fechaMensagem(notificacao: INotificacao) {
            this.store.commit(REMOVER_NOTIFICACAO, notificacao)
        }
    },
    setup() {
        const store = useStore()
        return {
            store,
            notificacoes: computed(() => store.state.notificacoes)
        }
    }

})

</script>

<style scoped>
.notificacoes {
    position: absolute;
    right: 0;
    width: 300px;
    padding: 8px;
    z-index: 101;
}
</style>