<template>
    <main class="mx-auto max-w-7xl px-4 pb-24 pt-16 sm:px-6 lg:px-8">
        <div v-if="!result.visible" class="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
            <Contact ref="contactRef" />
            <Order @submit="submit" />
        </div>
        <div v-else class="space-y-10 divide-y divide-gray-900/10">
            <div class="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
                <ul role="list" class="px-4 sm:px-0 space-y-6">
                    <li class="relative flex gap-x-4">
                        <div :class="['-bottom-6', 'absolute left-0 top-0 flex w-6 justify-center']">
                            <div class="w-px bg-gray-200" />
                        </div>
                        <div class="relative flex h-6 w-6 flex-none items-center justify-center">
                            <div class="h-1.5 w-1.5 rounded-full bg-red-100 ring-1 ring-red-300" />
                        </div>
                        <div class="flex-auto rounded-md p-3 ring-1 ring-inset ring-gray-200">
                            <div class="flex justify-between gap-x-4">
                                <div class="py-0.5 text-xs leading-5 text-gray-500">
                                    <span class="font-medium text-gray-900">1. New Issue</span>
                                    GitHub
                                </div>
                            </div>
                            <p class="text-sm leading-6 text-gray-500">
                                <a href="https://github.com/gitvzz/shopping/issues/new" target="_blank"
                                    class="font-medium text-gray-900 underline underline-offset-4">open shopping
                                    Isuse</a>
                            </p>
                        </div>
                    </li>

                    <li class="relative flex gap-x-4">
                        <div :class="['-bottom-6', 'absolute left-0 top-0 flex w-6 justify-center']">
                            <div class="w-px bg-gray-200" />
                        </div>
                        <div class="relative flex h-6 w-6 flex-none items-center justify-center">
                            <div class="h-1.5 w-1.5 rounded-full bg-red-100 ring-1 ring-red-300" />
                        </div>
                        <div class="flex-auto rounded-md p-3 ring-1 ring-inset ring-gray-200">
                            <div class="flex justify-between gap-x-4">
                                <div class="py-0.5 text-xs leading-5 text-gray-500">
                                    <span class="font-medium text-gray-900">2. Select Labels</span>
                                </div>
                            </div>
                            <p class="text-sm leading-6 text-gray-500">
                                Labels - order
                            </p>
                        </div>
                    </li>

                    <li class="relative flex gap-x-4">
                        <div :class="['-bottom-6', 'absolute left-0 top-0 flex w-6 justify-center']">
                            <div class="w-px bg-gray-200" />
                        </div>
                        <div class="relative flex h-6 w-6 flex-none items-center justify-center">
                            <div class="h-1.5 w-1.5 rounded-full bg-red-100 ring-1 ring-red-300" />
                        </div>
                        <div class="flex-auto rounded-md p-3 ring-1 ring-inset ring-gray-200">
                            <div class="flex justify-between gap-x-4">
                                <div class="py-0.5 text-xs leading-5 text-gray-500">
                                    <span class="font-medium text-gray-900">3. Copy Title</span>
                                </div>
                            </div>
                            <p class="text-sm leading-6 text-gray-500">
                                将title复制到Issue标题
                            </p>
                        </div>
                    </li>

                    <li class="relative flex gap-x-4">
                        <div :class="['-bottom-6', 'absolute left-0 top-0 flex w-6 justify-center']">
                            <div class="w-px bg-gray-200" />
                        </div>
                        <div class="relative flex h-6 w-6 flex-none items-center justify-center">
                            <div class="h-1.5 w-1.5 rounded-full bg-red-100 ring-1 ring-red-300" />
                        </div>
                        <div class="flex-auto rounded-md p-3 ring-1 ring-inset ring-gray-200">
                            <div class="flex justify-between gap-x-4">
                                <div class="py-0.5 text-xs leading-5 text-gray-500">
                                    <span class="font-medium text-gray-900">4. Copy Description</span>
                                </div>
                            </div>
                            <p class="text-sm leading-6 text-gray-500">
                                将description复制到Issue描述
                            </p>
                        </div>
                    </li>

                    <li class="relative flex gap-x-4">
                        <div :class="['h-6', 'absolute left-0 top-0 flex w-6 justify-center']">
                            <div class="w-px bg-gray-200" />
                        </div>
                        <div class="relative flex h-6 w-6 flex-none items-center justify-center">
                            <CheckCircleIcon class="h-6 w-6 text-indigo-600" aria-hidden="true" />
                        </div>
                        <div class="flex-auto rounded-md p-3 ring-1 ring-inset ring-gray-200">
                            <div class="flex justify-between gap-x-4">
                                <div class="py-0.5 text-xs leading-5 text-gray-500">
                                    <span class="font-medium text-gray-900">5. Submit</span>
                                </div>
                            </div>
                            <p class="text-sm leading-6 text-gray-500">
                                提交 Issue
                            </p>
                        </div>
                    </li>
                </ul>
                <div class="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
                    <div class="px-4 py-6 sm:p-8">
                        <div class="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div class="sm:col-span-4">
                                <label class="block text-sm font-medium leading-6 text-gray-900">
                                    Title
                                </label>
                                <div class="mt-2">
                                    <div
                                        class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <!-- <span class="flex select-none items-center pl-3 text-gray-500 sm:text-sm">http://</span> -->
                                        <input type="text" v-model="result.title" name="title" id="title" readonly
                                            class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" @focus="copyTitle" />
                                    </div>
                                </div>
                                <h3 class="text-sm font-medium text-green-800" v-if="result.copyTitled">title copied</h3>
                            </div>

                            <div class="col-span-full">
                                <label
                                    class="block text-sm font-medium leading-6 text-gray-900">Description</label>
                                <div class="mt-2">
                                    <textarea id="description" name="description" rows="15" readonly
                                        v-model="result.description"
                                        @focus="copyDescription"
                                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                                <h3 class="text-sm font-medium text-green-800" v-if="result.copyDescriptioned">description copied</h3>
                            </div>

                        </div>
                    </div>
                    <div class="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
                        <button type="button" class="text-sm font-semibold leading-6 text-gray-900"
                            @click="result.visible = false">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
import { CheckCircleIcon } from '@heroicons/vue/24/solid'
import $ from "@/utils"
const store = useStore()
import Contact from '@/components/Contact.vue'


const contactRef = ref<InstanceType<typeof Contact>>()

const result = reactive({
    visible: false,
    title: '',
    description: '',
    copyTitled: false,
    copyDescriptioned: false
})

const getFreight = () => {
    $.query({
        url: 'http://127.0.0.1:8880/solution',
        method: 'POST',
        data: {
            "fromCountryId": 1,
            "toCountryId": 228,
            "packageType": "NORMAL",
            "packageAmount": "1",
            "PackageQueryRequest": {
                "packageWeight": "1",
                "packageLength": "30",
                "packageHeight": "10",
                "packageWidth": "15"
            },
            "language": "zh",
            "siteType": "PORTAL"
        }
    }).then(console.log).catch(console.error)
}

const copyTitle = () => {
    $.copyText(result.title).then(()=>{
        result.copyTitled = true
        setTimeout(() => {
            result.copyTitled = false
        }, 2000)
    })
}
const copyDescription = () => {
    $.copyText(result.description).then(()=>{
        result.copyDescriptioned = true
        setTimeout(() => {
            result.copyDescriptioned = false
        }, 2000)
    })
}
const submit = (title: string, content: string) => {
    const data = contactRef.value!.getData()
    const array = [content, '### Information(Encrypted)']

    array.push('```\n' + data!.sign + '\n```')
    result.title = title
    const description = array.join('\n')
    result.description = `${description}\nmd5=${$.md5(title+description)}`
    result.visible = true
}

const activity = [
    { id: 1, type: 'created', person: { name: 'Chelsea Hagon' }, date: '7d ago', dateTime: '2023-01-23T10:32' },
    { id: 2, type: 'edited', person: { name: 'Chelsea Hagon' }, date: '6d ago', dateTime: '2023-01-23T11:03' },
    { id: 3, type: 'sent', person: { name: 'Chelsea Hagon' }, date: '6d ago', dateTime: '2023-01-23T11:24' },
    {
        id: 4,
        type: 'commented',
        person: {
            name: 'Chelsea Hagon',
            imageUrl:
                'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        comment: 'Called client, they reassured me the invoice would be paid by the 25th.',
        date: '3d ago',
        dateTime: '2023-01-23T15:56',
    },
    { id: 5, type: 'viewed', person: { name: 'Alex Curren' }, date: '2d ago', dateTime: '2023-01-24T09:12' },
    { id: 6, type: 'paid', person: { name: 'Alex Curren' }, date: '1d ago', dateTime: '2023-01-24T09:20' },
]
onMounted(() => { })

</script>