<template>
    <div class="modal is-active modalConfirmacao">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">{{ titulo }}</p>
                <button class="delete" aria-label="close" @click="fechaModal"></button>
            </header>
            <section class="modal-card-body">
                <p>{{ mensagem }}</p>
            </section>
            <footer class="modal-card-foot">
                <button class="button is-danger" :class="carregando ? 'is-loading' : ''"
                    @click="confirmacao">{{ textoBotao }}</button>
                <button class="button" @click="fechaModal">Cancelar</button>
            </footer>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';


export default defineComponent({
    name: "ModalConfirmacaoComponent",
    emits: ['aoClicarConfirmacao', 'aoFecharModal'],
    data() {
        return {
            carregando: false,
        }
    },
    props: {
        titulo: {
            type: String,
            required: true
        },
        mensagem: {
            type: String,
            required: true
        },
        textoBotao: {
            type: String,
            required: true
        }
    },
    methods: {
        confirmacao() {
            this.carregando = true
            
            this.$emit('aoClicarConfirmacao')

            this.carregando = false
        },
        fechaModal() {
            this.$emit('aoFecharModal')
        }
    }
    
})

</script>

<style scoped>
.modalConfirmacao {
    z-index: 100;
}
</style>