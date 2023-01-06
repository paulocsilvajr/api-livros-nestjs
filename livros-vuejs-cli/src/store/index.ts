import { createStore, Store, useStore as vuexUseStore } from 'vuex'
import { INotificacao } from '@/interfaces/INotificacoes'
import { InjectionKey } from 'vue'
import { SALVAR_INFORMACOES_USUARIO, LIMPAR_INFORMACOES_USUARIO, NOTIFICAR, REMOVER_NOTIFICACAO, ATUALIZAR_TOKEN } from '@/store/tipos-mutacoes'

interface InformacoesUsuario {
  nomeUsuario: string,
  senha: string,
  token: string
}

interface Estado {
  usuario: InformacoesUsuario,
  notificacoes: INotificacao[],
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
  state: {
    usuario: {
      nomeUsuario: '',
      senha: '',
      token: ''
    },
    notificacoes: [],
  },
  mutations: {
    [LIMPAR_INFORMACOES_USUARIO](state) {
      console.log('Limpando informações de usuário/token armazenadas')

      state.usuario.nomeUsuario = ''
      state.usuario.senha = ''
      state.usuario.token = ''
    },
    [SALVAR_INFORMACOES_USUARIO](state, usuario: InformacoesUsuario) {
      console.log('Salvando informações de usuário e token')

      state.usuario.nomeUsuario = usuario.nomeUsuario
      state.usuario.senha = usuario.senha
      state.usuario.token = usuario.token
    },
    [ATUALIZAR_TOKEN](state, token: string) {
      console.log('Salvando token')

      state.usuario.token = token
    },
    [NOTIFICAR](state, novaNotificacao: INotificacao) {
      novaNotificacao.id = new Date().getTime()
      state.notificacoes.push(novaNotificacao)

      const segundos = 5
      const tempoEmMilisegundos = segundos * 1000
      setTimeout(() => {
        state.notificacoes = state.notificacoes.filter(notificacao => notificacao.id != novaNotificacao.id)
      }, tempoEmMilisegundos)
    },
    [REMOVER_NOTIFICACAO](state, notificacao: INotificacao) {
      state.notificacoes = state.notificacoes.filter(n => n.id != notificacao.id)
    },
  },
  getters: {
  },
  actions: {
  },
  modules: {
  }
})

export function useStore(): Store<Estado> {
  return vuexUseStore(key)
}
