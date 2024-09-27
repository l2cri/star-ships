import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import StarShipView from '../views/StarShipView.vue'
import type { HomeQueryInterface, StarShipDetailProps } from './pageInterface'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      props(route): HomeQueryInterface {
        let page = 1
        let search
        if (typeof route.query.page === 'string') {
          page = parseInt(route.query.page)
        }
        if (route.query.search) {
          search = String(route.query.search)
        }

        return { page, search }
      }
    },
    {
      path: '/:id',
      name: 'star-ship',
      component: StarShipView,
      props(route): StarShipDetailProps {
        const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id

        return { id: parseInt(id) }
      }
    }
  ]
})

export default router
