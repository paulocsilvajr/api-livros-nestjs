import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import CadastroLivrosView from '@/views/CadastroLivrosView.vue'
import EntrarView from '@/views/EntrarView.vue'
import VariaveisAmbiente from '@/utils/variaveis-ambiente'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'cadastro-livros',
    component: CadastroLivrosView
  },
  {
    path: '/login',
    name: 'login',
    component: EntrarView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(VariaveisAmbiente.baseUrl),
  routes
})

export default router
