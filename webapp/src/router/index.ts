import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/inicio'
  },
  {
    path: '/inicio',
    name: 'Inicio',
    component: Home
  },
  {
    path: '/proximamente',
    name: 'Próximamente',
    component: () => import('../views/ComingSoon.vue')
  },
  {
    path: '/noticias',
    name: 'Noticias',
    component: () => import('../views/News.vue')
  },
  {
    path: '/buscar',
    name: 'Buscar',
    component: () => import('../views/Search.vue')
  },
  {
    path: '/Cartelera',
    name: 'cartelera',
    component: () => import('../views/Showtimes.vue')
  },
  {
    path: '/noticias/:slug',
    name: 'Noticia',
    component: () => import('../views/NewsSingle.vue')
  },
  {
    path: '/peliculas/:slug',
    name: 'Película',
    component: () => import('../views/MovieSingle.vue')
  },
  {
    path: "/:pathMatch(.*)*",
    name: '404',
    component: function() {
        return import ('../views/404.vue')
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
