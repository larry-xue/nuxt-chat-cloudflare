<template>
  <div class="flex justify-between items-center p-2" :class="`bg-${$colorMode}-900`" style="height: 60px">
    <!-- left -->
    <div class="flex items-center gap-2">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useColorMode } from '@vueuse/core'

const $colorMode = useColorMode()
</script>