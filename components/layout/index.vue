<template>
  <div class="flex flex-col h-screen w-full overflow-hidden" :class="`bg-${$colorMode}-900`">
    <ClientOnly>
      <div class="flex flex-1">
        <!-- sidebar -->
        <Sidebar v-show="isShowSidebar" :header="header" :description="description" :menu="menu" />

        <div class="flex flex-1 flex-col sm:w-0" :class="{ 'md:w-full': isShowSidebar }">
          <NavBar v-show="isMobile" :header />
          <!-- content -->
          <div :class="[isMobile && 'page-wrapper', 'p-4 overflow-auto w-full h-screen']">
            <NuxtPage />
          </div>
        </div>
      </div>
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
import { useColorMode, breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import Sidebar, { type SideMenuItem } from './Sidebar.vue';
import NavBar from './HeaderNav.vue';

const breakpoints = useBreakpoints(breakpointsTailwind)
const isMobile = breakpoints.smaller('md')

const isShowSidebar = computed(() => !isMobile.value)

const $colorMode = useColorMode()

defineProps({
  header: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  menu: {
    type: Array as () => SideMenuItem[],
    default: () => [],
  },
})
</script>

<style lang="scss" scoped>
.page-wrapper {
  height: calc(100vh - 4rem);
}
</style>