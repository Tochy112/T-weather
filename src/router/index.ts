// Composables
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import City from '@/views/City.vue'

const routes = [
  {
    path: '/',
    children: [
      {
        path: '',
        name: 'home',
        component: Home,
      },
      {
        path: 'city/:state/:city',
        name: 'city',
        component: City,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
