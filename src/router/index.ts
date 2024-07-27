import { createRouter, createWebHistory } from 'vue-router'
import IndexPage from '@/pages/IndexPage.vue'
import CodeTea from '@/pages/CodeTea.vue'
import Distributor from '@/pages/Distributor.vue'
import ShoppingBag from '@/pages/ShoppingBag.vue'

const routes = [
  {
    path: '/',
    //redirect: '/CodeTea',
    component: IndexPage,
    meta: {
      title: 'GitHub Shopping',
    },
    
  },
  {
    path:'/CodeTea',
    name:'CodeTea',
    component: CodeTea,
    meta: {
      title: 'CodeTea',
    }
  },
  {
    path:'/Distributor',
    name:'Distributor',
    component: Distributor,
    meta: {
      title: 'Distributor',
    }
  },{
    path:'/ShoppingBag',
    name:'ShoppingBag',
    component: ShoppingBag,
    meta: {
      title: 'ShoppingBag',
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
