<script setup lang="ts">
import { ref } from 'vue'
const route = useRoute()

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

const visible = ref(false)
const goods_visible = ref(false)
const card_visible = ref(false)

const show = () => {
  visible.value = true
}

</script>
<template>

<div v-for="product in store.products" :key="product.name">
    <!-- Image gallery -->
    <div class="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
      <div class="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
        <img :src="product.images[0].src" :alt="product.images[0].alt"
          class="h-full w-full object-cover object-center" />
      </div>
      <div class="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
        <div class="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
          <img :src="product.images[1].src" :alt="product.images[1].alt"
            class="h-full w-full object-cover object-center" />
        </div>
        <div class="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
          <img :src="product.images[2].src" :alt="product.images[2].alt"
            class="h-full w-full object-cover object-center" />
        </div>
      </div>
      <div class="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
        <img :src="product.images[3].src" :alt="product.images[3].alt"
          class="h-full w-full object-cover object-center" />
      </div>
    </div>

    <!-- Product info -->
    <div
      class="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
      <div class="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
        <h1 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{{ product.name }}</h1>
      </div>

      <!-- Options -->
      <div class="mt-4 lg:row-span-3 lg:mt-0">
        <h2 class="sr-only">Product information</h2>
        <p class="text-3xl tracking-tight text-gray-900">￥{{ selectedPrice(product) }}</p>


        <form class="mt-10">
          <!-- Sizes -->
          <div>
            <div class="flex items-center justify-between">
              <h3 class="text-sm font-medium text-gray-900">Grade</h3>
            </div>

            <fieldset aria-label="Choose a size" class="mt-4">
              <RadioGroup v-model="product.selectedSize" class="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                <RadioGroupOption as="template" v-for="size in product.sizes" :key="size.name" :value="size.name"
                  :disabled="!size.inStock" v-slot="{ active, checked }">
                  <div
                    :class="[size.inStock ? 'cursor-pointer bg-white text-gray-900 shadow-sm' : 'cursor-not-allowed bg-gray-50 text-gray-200', active ? 'ring-2 ring-indigo-500' : '', 'group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6']">
                    <span>{{ size.name }}</span>
                    <span v-if="size.inStock"
                      :class="[active ? 'border' : 'border-2', checked ? 'border-indigo-500' : 'border-transparent', 'pointer-events-none absolute -inset-px rounded-md']"
                      aria-hidden="true" />
                    <span v-else aria-hidden="true"
                      class="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200">
                      <svg class="absolute inset-0 h-full w-full stroke-2 text-gray-200" viewBox="0 0 100 100"
                        preserveAspectRatio="none" stroke="currentColor">
                        <line x1="0" y1="100" x2="100" y2="0" vector-effect="non-scaling-stroke" />
                      </svg>
                    </span>
                  </div>
                </RadioGroupOption>
              </RadioGroup>
            </fieldset>
          </div>

          <!-- Quantity -->
          <div class="mt-10">
            <h3 class="text-sm font-medium text-gray-900">Quantity (g)</h3>

            <fieldset aria-label="Choose a color" class="mt-4">
              <input v-model="product.quantity" type="number" name="quantity" id="quantity"
                placeholder="please input quantity" required
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </fieldset>
          </div>

          <button type="button" @click="addToCart(product)"
            class="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Add to bag
          </button>
        </form>
      </div>

      <div class="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
        <!-- Description and details -->
        <div>
          <h3 class="sr-only">Description</h3>

          <div class="space-y-6">
            <p class="text-base text-gray-900">{{ product.description }} <a
                href="https://en.wikipedia.org/wiki/Da_Hong_Pao" class="underline" target="_blank">[wikipedia]</a></p>
          </div>
        </div>

        <div class="mt-10">
          <h3 class="text-sm font-medium text-gray-900">Highlights</h3>

          <div class="mt-4">
            <ul role="list" class="list-disc space-y-2 pl-4 text-sm">
              <li v-for="highlight in product.highlights" :key="highlight" class="text-gray-400">
                <span class="text-gray-600">{{ highlight }}</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="mt-10">
          <h2 class="text-sm font-medium text-gray-900">Special Features</h2>
          <ul role="list" class="list-disc space-y-2 pl-4 text-sm">
            <li v-for="item in product.features" :key="item.title" class="text-gray-400">
              <span class="text-gray-800">{{ item.title }}</span>
              <p class="text-sm text-gray-600">{{ item.content }}</p>
            </li>
          </ul>

        </div>
      </div>
    </div>
  </div>

</template>
