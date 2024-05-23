<template>
  <div class="flex items-center p-2 gap-2 h-16" :class="`bg-${$colorMode}-900`" style="height: 60px">
    <!-- back to homepage -->
    <div class="flex items-center gap-2">
      <div class="cursor-pointer">
        <UButton icon="i-heroicons-adjustments-horizontal" color="green" @click="showFullScreenModal"></UButton>
      </div>
      <h2 class="text-2xl font-bold">
        {{ currentRoute.meta.title }}
      </h2>
    </div>
    <UModal v-model="isOpen" fullscreen>
      <Sidebar @update:is-show-sidebar="isOpen = false" :header="header" />
    </UModal>
  </div>
</template>

<script lang="ts" setup>
import { useColorMode } from '@vueuse/core'
import Sidebar from './Sidebar.vue';

// get current route info
const router = useRouter()
const currentRoute = computed(() => router.currentRoute.value)
const isOpen = ref(false)

defineProps({
  title: {
    type: String,
    default: '',
  },
  subtitle: {
    type: String,
    default: '',
  },
  header: {
    type: String,
    default: '',
  },
})

const $colorMode = useColorMode()

const showFullScreenModal = () => {
  isOpen.value = true
}
</script>