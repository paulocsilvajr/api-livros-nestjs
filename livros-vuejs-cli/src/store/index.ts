import { createStore, Store, useStore as vuexUseStore } from 'vuex'
import { INotificacao } from '@/interfaces/INotificacoes'
import { InjectionKey } from 'vue'
import { SALVAR_INFORMACOES_USUARIO, LIMPAR_INFORMACOES_USUARIO, NOTIFICAR, REMOVER_NOTIFICACAO, ATUALIZAR_TOKEN, DEFINIR_GUIA_ATIVA } from '@/store/tipos-mutacoes'
import { Guias } from '@/enums/Guias'

interface InformacoesUsuario {
  nomeUsuario: string,
  senha: string,
  token: string
}

interface Estado {
  usuario: InformacoesUsuario,
  notificacoes: INotificacao[],
  guiaAtiva: Guias,
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
    guiaAtiva: Guias.Listagem,
  },
  mutations: {
    [LIMPAR_INFORMACOES_USUARIO](state) {
      console.log('Limpando informações de usuário/token armazenadas')

      state.usuario.nomeUsuario = ''
      state.usuario.senha = ''
      state.usuario.token = ''

      localStorage.removeItem('usuario')
    },
    [SALVAR_INFORMACOES_USUARIO](state, usuario: InformacoesUsuario) {
      console.log('Salvando informações de usuário e token')

      state.usuario.nomeUsuario = usuario.nomeUsuario
      state.usuario.senha = usuario.senha
      state.usuario.token = usuario.token

      const usuarioArmazenamento = JSON.stringify(state.usuario)
      localStorage.setItem('usuario', usuarioArmazenamento)
    },
    [ATUALIZAR_TOKEN](state, token: string) {
      console.log('Salvando token')

      state.usuario.token = token

      const usuarioArmazenamento = JSON.stringify(state.usuario)
      localStorage.setItem('usuario', usuarioArmazenamento)
    },
    [NOTIFICAR](state, novaNotificacao: INotificacao) {
      novaNotificacao.id = new Date().getTime()
      state.notificacoes.push(novaNotificacao)

      console.log(`Notificação\ntipo: ${novaNotificacao.tipo}\nmsg: ${novaNotificacao.texto}`)

      const segundos = 5
      const tempoEmMilisegundos = segundos * 1000
      setTimeout(() => {
        state.notificacoes = state.notificacoes.filter(notificacao => notificacao.id != novaNotificacao.id)
      }, tempoEmMilisegundos)
    },
    [REMOVER_NOTIFICACAO](state, notificacao: INotificacao) {
      state.notificacoes = state.notificacoes.filter(n => n.id != notificacao.id)
    },
    [DEFINIR_GUIA_ATIVA](state, guia: Guias) {
      state.guiaAtiva = guia
    },
  },
  getters: {
    semToken(state) {
      const usuarioLocal = localStorage.getItem('usuario')
      if (usuarioLocal) {
        console.log('Carregando informações de usuário no localStorage')

        const usuario: InformacoesUsuario = JSON.parse(usuarioLocal)

        state.usuario.nomeUsuario = usuario.nomeUsuario
        state.usuario.senha = usuario.senha
        state.usuario.token = usuario.token
      }

      const semToken = state.usuario.token.length === 0
      if (semToken) {
        console.log('SEM token')
      }

      return semToken
    }
  },
  actions: {
  },
  modules: {
  }
})

export function useStore(): Store<Estado> {
  return vuexUseStore(key)
}
