import { defineStore } from 'pinia'
import type { IState, IShoppingBag, ICategory } from './state'

import $ from '@/utils'

const versionString =
  import.meta.env.MODE === 'development' ? import.meta.env.VITE_APP_VERSION + '-dev' : import.meta.env.VITE_APP_VERSION

  
export const useStore = defineStore('main', {
  state: (): IState => ({
    debug: import.meta.env.MODE === 'development',
    version: versionString,
    isInitialized: false,
    navigation: [
      { name: 'Distributor', href: '/Distributor', current: false },
      { name: 'GitHub', href: 'https://github.com/gitvzz/shopping', current: false },
    ],
    packages: [],
    countries: [],
    products: []
  }),

  actions: {
    initApp() {
      this.isInitialized = true
      $.query({url:import.meta.env.VITE_CONFIG_URL}).then((res) => {
        this.navigation = []
        this.products = []
        res.data.categories.forEach((category:ICategory) => {
          this.navigation.push({ name: category.name, router: category.name, current: false })
          category.products.forEach((product) => {
            product.category = category.name
            product.packageType = category.packageType
            product.standard = product.defaultStandard
            product.quantity = product.defaultQuantity
            this.products.push({...product})
          })
        })
        
        this.packages = res.data.packages
        this.countries = res.data.countries
        
        this.navigation.push({ name: 'Distributor', router: 'Distributor', current: false })
        this.navigation.push({ name: 'GitHub', href: 'https://github.com/gitvzz/shopping', current: false })

      })
    }
  },

  getters: {
    orders: (state) => {
      return state.products.filter((product) => product.inBag)
    }
  },
})
