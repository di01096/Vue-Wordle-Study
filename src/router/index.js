import {createRouter, createWebHistory} from 'vue-router'
import ErrorPage from '../components/ErrorPage.vue'
import GroundPage from '../components/GroundPage.vue'

export default createRouter({
  mode: 'history',
  history: createWebHistory(process.env.BASE_URL),
  routes: [
      {
          path: '/',
          name : 'home',
          component: GroundPage
      },
      {
          path: '/errorPage',
          name: 'errorPage',
          component: ErrorPage
      },
      {
          path: '/:pathMatch(.*)*',
          redirect: "/errorPage"
      }
  ]
})