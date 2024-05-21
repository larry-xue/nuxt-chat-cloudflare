<template>
  <div class="flex flex-col h-screen w-full overflow-hidden" :class="`bg-${$colorMode}-900`">
    <!-- header bar -->
    <HeaderNav>
      <slot name="header" />
    </HeaderNav>

    <!-- content -->
    <div class="p-4 overflow-auto overflow-x-hidden h-full w-full">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useColorMode } from '@vueuse/core'
import HeaderNav from './HeaderNav.vue';

const $colorMode = useColorMode()
</script>