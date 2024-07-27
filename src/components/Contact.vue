<template>
    <div>
        <div>
            <h2 class="text-lg font-medium text-gray-900">Contact information</h2>

            <div class="mt-4">
                <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
                <div class="mt-1">
                    <input v-model="formData.email" type="email" id="email" name="email" autocomplete="email"
                        :class="[...fieldClass, formData.email === '' ? 'border-red-300' : 'border-gray-300']" />
                </div>
            </div>
        </div>

        <div class="mt-10 border-t border-gray-200 pt-10">
            <h2 class="text-lg font-medium text-gray-900">Shipping information</h2>

            <div class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                <div>
                    <label for="firstName" class="block text-sm font-medium text-gray-700">First name</label>
                    <div class="mt-1">
                        <input v-model="formData.firstName" type="text" id="firstName" name="firstName"
                            autocomplete="given-name"
                            :class="[...fieldClass, formData.firstName === '' ? 'border-red-300' : 'border-gray-300']" />
                    </div>
                </div>

                <div>
                    <label for="lastName" class="block text-sm font-medium text-gray-700">Last name</label>
                    <div class="mt-1">
                        <input v-model="formData.lastName" type="text" id="lastName" name="lastName"
                            autocomplete="family-name"
                            :class="[...fieldClass, formData.lastName === '' ? 'border-red-300' : 'border-gray-300']" />
                    </div>
                </div>


                <div class="sm:col-span-2">
                    <label for="address" class="block text-sm font-medium text-gray-700">Address</label>
                    <div class="mt-1">
                        <input v-model="formData.address" type="text" name="address" id="address"
                            autocomplete="street-address"
                            :class="[...fieldClass, formData.address === '' ? 'border-red-300' : 'border-gray-300']" />
                    </div>
                </div>

                <div class="sm:col-span-2">
                    <label for="apartment" class="block text-sm font-medium text-gray-700">Apartment, suite,
                        etc.</label>
                    <div class="mt-1">
                        <input v-model="formData.apartment" type="text" name="apartment" id="apartment"
                            :class="[...fieldClass, formData.apartment === '' ? 'border-red-300' : 'border-gray-300']" />
                    </div>
                </div>

                <div>
                    <label for="city" class="block text-sm font-medium text-gray-700">City</label>
                    <div class="mt-1">
                        <input v-model="formData.city" type="text" name="city" id="city" autocomplete="address-level2"
                            :class="[...fieldClass, formData.city === '' ? 'border-red-300' : 'border-gray-300']" />
                    </div>
                </div>

                <div>
                    <label for="country" class="block text-sm font-medium text-gray-700">Country</label>
                    <div class="mt-1">
                        <select v-model="formData.country" id="country" name="country" autocomplete="country-name"
                            :class="[...fieldClass, formData.country === '' ? 'border-red-300' : 'border-gray-300']">
                            <option v-for="country in store.countries" :key="country.id" :value="country.id">{{
                                country.name }}</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label for="region" class="block text-sm font-medium text-gray-700">State / Province</label>
                    <div class="mt-1">
                        <input v-model="formData.region" type="text" name="region" id="region"
                            autocomplete="address-level1"
                            :class="[...fieldClass, formData.region === '' ? 'border-red-300' : 'border-gray-300']" />
                    </div>
                </div>

                <div>
                    <label for="zip" class="block text-sm font-medium text-gray-700">Postal code</label>
                    <div class="mt-1">
                        <input v-model="formData.zip" type="text" name="zip" id="zip" autocomplete="postal-code"
                            :class="[...fieldClass, formData.zip === '' ? 'border-red-300' : 'border-gray-300']" />
                    </div>
                </div>

                <div class="sm:col-span-2">
                    <label for="phone" class="block text-sm font-medium text-gray-700">Phone</label>
                    <div class="mt-1">
                        <input v-model="formData.phone" type="text" name="phone" id="phone" autocomplete="tel"
                            :class="[...fieldClass, formData.phone === '' ? 'border-red-300' : 'border-gray-300']" />
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import $ from "@/utils"
const store = useStore()


const formData = reactive<{ [key: string]: string | null }>({
    "email": null,
    "firstName": null,
    "lastName": null,
    "address": null,
    "apartment": null,
    "city": null,
    "country": null,
    "region": null,
    "zip": null,
    "phone": null
})
const fieldClass = ['block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm']

const getData = () => {
    let valid = true
    Object.keys(formData).forEach(key => {
        if (formData[key] === null) {
            formData[key] = ''
        }
        if (!formData[key]) {
            valid = false
        }
    })
    if (!valid) { return }

    const content = JSON.stringify(formData)

    const publicKey = import.meta.env.VITE_PUB_KEY

    const sign = $.encrypt(publicKey, content)
    return {
        sign,
        data:formData
    }
    /* console.log(sign)
    const privateKey = import.meta.env.VITE_PRI_KEY
    const value = $.decrypt(privateKey, sign.split('\n'))
    console.log(value) */
}

defineExpose({ getData })
</script>