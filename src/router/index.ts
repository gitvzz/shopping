import { createRouter, createWebHistory } from 'vue-router'

import DemoPage from '@/pages/DemoPage.vue'
import IndexPage from '@/pages/IndexPage.vue'

const routes = [
  {
    path: '/',
    component: IndexPage,
    meta: {
      title: 'GitHub Shopping',
    },
  },
  {
    path: '/demo/',
    component: DemoPage,
    meta: {
      title: 'Demo title',
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
