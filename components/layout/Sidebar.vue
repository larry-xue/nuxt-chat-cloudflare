<template>
  <!-- side bar menu -->
  <div class="w-64 h-screen p-4 border-r border-gray-200 dark:border-gray-800"
    :class="[`bg-${$colorMode.value}-900`, isMobile && 'border-none w-screen']">
    <!-- logo & header -->
    <div class="mb-4 w-full">
      <div class="w-full flex items-center gap-2 mb-2 dark:text-white justify-between">
        <div class="flex items-center gap-2">
          <i class="i-logos-vue"></i>
          <h1 class="text-black text-md font-bold dark:text-white flex gap-2">
            <img class="w-6 h-6" src="../../public/favicon.ico" alt="">
            <span>
              {{ header }}
            </span>
          </h1>
        </div>
        <!-- close icon -->
        <div v-show="isMobile" class="cursor-pointer">
          <UButton icon="i-heroicons-x-mark" variant="ghost" color="gray" @click="$emit('update:isShowSidebar', false)">
          </UButton>
        </div>
      </div>
      <p class="ext-sm">
        {{ description }}
      </p>
    </div>

    <UDivider class="my-4" />

    <div v-for="item in menu" class="mb-4 text-white text-sm">
      <p class="mb-2 font-bold w-full">
        <UButton class="w-full" :variant="currentMenu === item.link ? 'outline' : 'ghost'"
          :color="currentMenu === item.link ? 'primary' : 'gray'" :icon="item.icon" @click="goTo(item)">{{ item.name }}
        </UButton />
      </p>
    </div>

    <UDivider class="my-4" />

    <div class="mb-4 text-white text-sm">
      <!-- switch theme -->
      <UButton variant="ghost" color="primary" :trailing="false" class="w-full"
        :icon="$colorMode === 'light' ? 'i-heroicons-sun' : 'i-heroicons-moon'"
        @click="$colorMode = $colorMode === 'light' ? 'dark' : 'light'">
        {{ $colorMode === 'light' ? 'Light' : 'Dark' }}
      </UButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useColorMode, breakpointsTailwind, useBreakpoints } from '@vueuse/core'

export interface SideMenuItem {
  name: string
  icon: string
  link: string
  sort: number
  children?: SideMenuItem[]
}

defineProps({
  header: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
})

const $emit = defineEmits(['update:isShowSidebar'])

const router = useRouter()
const $colorMode = useColorMode()
const menu = ref<SideMenuItem[]>([])
const breakpoints = useBreakpoints(breakpointsTailwind)
const isMobile = breakpoints.smaller('md')

const currentMenu = computed(() => router.currentRoute.value.path)

onMounted(() => {
  const routes = router.options.routes;
  routes.forEach((route) => {
    const { icon, title, sort } = (route?.meta as any) || {}
    menu.value.push({
      name: title,
      icon,
      link: route.path,
      sort,
    })
  })

  menu.value.sort((a, b) => a.sort - b.sort)
})

const goTo = (to: SideMenuItem) => {
  if ((to.link as any) !== currentMenu) {
    router.push(to.link)
    $emit('update:isShowSidebar', false)
  }
}
</script>