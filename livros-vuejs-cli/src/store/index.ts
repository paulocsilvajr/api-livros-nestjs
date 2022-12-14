import { createStore } from 'vuex'

export const store = createStore({
  state: {
      nomeUsuario: '',
      senha: '',
      token: '',
  },
  mutations: {
    limpar(state) {
      console.log('Limpando informações de usuário armazenadas');
      
      state.nomeUsuario = '';
      state.senha = '';
      state.token = '';
    }
  },
})
