<template>
    <div class="mt-10 lg:mt-0">
        <h2 class="text-lg font-medium text-gray-900">Order summary</h2>

        <div class="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
            <h3 class="sr-only">Items in your cart</h3>
            <ul role="list" class="divide-y divide-gray-200">
                <li v-for="o in orders" :key="o.name" class="flex px-4 py-6 sm:px-6">
                    <div class="flex-shrink-0">
                        <img :src="o.image" :alt="o.alt" class="w-20 rounded-md" />
                    </div>

                    <div class="ml-6 flex flex-1 flex-col">
                        <div class="flex">
                            <div class="min-w-0 flex-1">
                                <h4 class="text-sm">
                                    {{ o.name }}
                                </h4>
                                <p class="mt-1 text-sm text-gray-500">Standard: {{ o.standard }}</p>
                                <p class="mt-1 text-sm text-gray-500">Quantity: {{ o.quantity }}g</p>
                            </div>

                            <div class="ml-4 flow-root flex-shrink-0">
                                <button type="button" @click="remove(o)"
                                    class="-m-2.5 flex items-center justify-center bg-white p-2.5 text-gray-400 hover:text-gray-500">
                                    <span class="sr-only">Remove</span>
                                    <TrashIcon class="h-5 w-5" aria-hidden="true" />
                                </button>
                            </div>
                        </div>

                        <div class="flex flex-1 items-end justify-between pt-2">
                            <p class="mt-1 text-sm font-medium text-gray-900">￥{{ o.price }}</p>
                        </div>
                    </div>
                </li>
            </ul>
            <dl class="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
                <div class="flex items-center justify-between">
                    <dt class="text-sm">Subtotal</dt>
                    <dd class="text-sm font-medium text-gray-900">￥{{ subtotal }}</dd>
                </div>
                <div class="flex items-center justify-between">
                    <dt class="text-sm">Freight</dt>
                    <dd class="text-sm font-medium text-gray-900">￥{{ freight }}</dd>
                </div>
                <!-- <div class="flex items-center justify-between">
                            <dt class="text-sm">Taxes</dt>
                            <dd class="text-sm font-medium text-gray-900">￥{{ taxes }}</dd>
                        </div> -->
                <div class="flex items-center justify-between border-t border-gray-200 pt-6">
                    <dt class="text-base font-medium">Total</dt>
                    <dd class="text-base font-medium text-gray-900">￥{{ subtotal + freight }}</dd>
                </div>
            </dl>

            <div class="border-t border-gray-200 px-4 py-6 sm:px-6" v-if="orders.length > 0">
                <button type="button" @click="handleSubmit"
                    class="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50">Confirm
                    order</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { TrashIcon } from '@heroicons/vue/20/solid'

const emit = defineEmits(['submit'])
const handleSubmit = () => {
    // 触发父组件传递的submit事件
    let content = orders.value.map((item: any) => {
        return `### ${item.category} - ${item.name}\n- Standard: ${item.standard}\n- Quantity: ${item.quantity}g\n- Price: ￥${item.price}`
    }).join('\n')
    content += `\n### Total\n- Subtotal: ￥${subtotal.value}\n- Freight: ￥5\n- Total: ￥${subtotal.value + 5}`

    emit('submit',`Order - Total: ￥${subtotal.value}`, content)
}
const store = useStore()

const orders = computed(() => store.orders.filter((o) => o.inBag).map(o => {
    return {
        "name": o.name,
        "category": o.category,
        "standard": o.standard,
        "quantity": o.quantity,
        "price": o.standards.find(s => s.name === o.standard)!.price * o.quantity! / o.defaultQuantity,
        "image": o.images[0].src,
        "alt": o.images[0].alt
    }
}))

const subtotal = computed(() => orders.value.reduce((acc, o) => acc + o.price, 0))

const freight = 5
const remove = (o: any) => {
    const item = store.products.find(p => p.name === o.name && p.category === o.category)
    if (item) {
        item.inBag = false
    }
}

</script>