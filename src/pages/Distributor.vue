<template>
    <div>Distributor</div>
</template>

<script setup lang="ts">
const route = useRoute()
watch(route, (newRoute) => {
    console.log('Route changed:', newRoute)
}, { immediate: true })
</script>