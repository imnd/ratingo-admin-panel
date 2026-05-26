<script setup>
import { navigateTo } from '#app'

definePageMeta({
  middleware: 'auth'
})

await navigateTo('/analytics')
</script>

<template>
  <div></div>
</template>
