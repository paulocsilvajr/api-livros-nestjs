import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import CadastroLivrosView from '@/views/CadastroLivrosView.vue'
import EntrarView from '@/views/EntrarView.vue'
import CadastroUsuariosView from '@/views/CadastroUsuariosView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'cadastro-livros',
    component: CadastroLivrosView
  },
  {
    path: '/usuarios',
    name: 'cadastro-usuarios',
    component: CadastroUsuariosView
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
  history: createWebHistory(),
  routes
})

export default router
