<template>
  <div class="flex items-center p-2" :class="`bg-${$colorMode}-900`" style="height: 60px">
    <!-- back to homepage -->
    <div class="p-2 cursor-pointer">
      <UButton icon="i-heroicons-home" color="green" to="/"></UButton>
    </div>
    <div class="flex items-center gap-2 px-2">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useColorMode } from '@vueuse/core'

const $colorMode = useColorMode()
</script>