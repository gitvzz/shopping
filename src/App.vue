<script setup lang="ts">
import { ref, computed } from 'vue'
import { RadioGroup, RadioGroupOption } from '@headlessui/vue'
import { useStore } from './store';
const route = useRoute()
const store = useStore()
useHead({
  title: () => route.meta.title || 'GitHub Shopping',
  meta: [
    {
      property: 'og:title',
      content: () => route.meta.title,
    },
    {
      name: 'twitter:title',
      content: () => route.meta.title,
    },
  ],
})

const VERSION = import.meta.env.VITE_APP_VERSION
const BUILD_DATE = import.meta.env.VITE_APP_BUILD_EPOCH
  ? new Date(Number(import.meta.env.VITE_APP_BUILD_EPOCH))
  : undefined
const thisYear = new Date().getFullYear()

onMounted(() => {
  store.initApp()
})
</script>
<template>

  <div class="bg-gray-100">
    <Head />
    <router-view />
    <footer aria-labelledby="footer-heading" class="border-t border-gray-200 bg-white">
      <div class="border-t border-gray-100 py-10 text-center">
          <p class="text-sm text-gray-500">&copy; 2021 Your Company, Inc. All rights reserved.</p>
        </div>
    </footer>
  </div>

</template>
