<template>
    <div>
        <label for="senha" class="label">Senha</label>
        <div class="field has-addons">
            <div class="control is-expanded">
                <input type="password" class="input" placeholder="Senha do usuário" id="senha" ref="inputSenha" :value="modelValue" @input="updateValue" :required="required">
            </div>
            <div class="control">
                <button class="button" @click="alteraEstadoSenha()">
                    <i class="fas" :class="{ 'fa-eye-slash': exibePassword, 'fa-eye': !exibePassword }"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: "InputSenhaComponent",
    components: { },
    props: {
        modelValue: String,
        required: {
            type: Boolean,
            default: false
        }
    },
    emits:
        ['update:modelValue'],
    data() {
        return {
            content: this.value,
            exibePassword: false,
        }
    },
    methods: {
        updateValue(event: Event) {
            console.log(event, typeof event);
            this.$emit('update:modelValue', (event.target as HTMLInputElement).value);
        },
        alteraEstadoSenha() {
            const inputSenha = this.$refs['inputSenha'] as HTMLInputElement;

            if (inputSenha.type === 'password')
                inputSenha.type = 'text';
            else
                inputSenha.type = 'password';
            
            this.exibePassword = !this.exibePassword;
        },
    }
})
</script>

<style>

</style>