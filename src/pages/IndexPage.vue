<script setup lang="ts">
const store = useStore()
</script>
<template>
  <div class="p-4 mx-auto prose md:px-6 prose-indigo sm:rounded-md">
    <HelloWorld msg="Hello World Component" />

    <h2>Template Project Features</h2>

    <p>
      The idea of this template is to bundle as many often used and useful features pre-configured as possible. If you
      don't need something, just remove it!
      Routing using vue-router. See <router-link to="/demo/"> demo page </router-link>
    </p>

  </div>
</template>
