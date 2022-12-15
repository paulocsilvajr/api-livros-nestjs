import { createStore } from 'vuex'

export default createStore({
  state: {
    nomeUsuario: '',
    senha: '',
    token: '',
  },
  mutations: {
    limpar(state) {
      console.log('Limpado informações de usuário armazenadas');
      
      state.nomeUsuario = '';
      state.senha = '';
      state.token = '';
    }
  },
  getters: {
  },
  actions: {
  },
  modules: {
  }
})
