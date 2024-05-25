<template>
  <Layout header="Larry's AI Site"></Layout>
  <UModals />
</template>

<script lang="ts" setup>
useHead({
  title: 'Larry\'s AI Site',
  meta: [
    { name: 'description', content: 'Larry\'s AI Site' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ]
})
</script>

<style>
@import url('./style/global.css')
</style>