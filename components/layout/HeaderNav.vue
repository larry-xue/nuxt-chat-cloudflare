<template>
  <div class="flex items-center p-2 gap-2" :class="`bg-${$colorMode}-900`" style="height: 60px">
    <!-- back to homepage -->
    <div class="cursor-pointer">
      <UButton icon="i-heroicons-adjustments-horizontal" color="green" @click="showSidebar"></UButton>
    </div>
    <div class="md:flex gap-2">
      <h1 class="text-xl font-bold md:text-3xl">{{ title }}</h1>
      <p class="text-gray-400 text-sm md:text-lg md:pt-2">{{ subtitle }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useColorMode } from '@vueuse/core'

defineProps({
  title: {
    type: String,
    default: '',
  },
  subtitle: {
    type: String,
    default: '',
  },
})

const $colorMode = useColorMode()

const showSidebar = () => {
  console.log('showSidebar')
}
</script>