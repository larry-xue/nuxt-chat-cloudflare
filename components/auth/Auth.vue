<!-- file: ~/pages/login.vue -->
<template>
  <div class="w-full" v-if="!isAuthenticated">
    <UButton class="w-full" icon="i-heroicons-user-circle"
      :color="$colorMode = $colorMode === 'light' ? 'black' : 'gray'" variant="ghost" @click="signIn('github')">Login
      with Github
    </UButton>
  </div>
  <div class="w-full" v-else>
    <UDropdown class="w-full" mode="hover" :items="dropdownItems">
      <UButton class="w-full" :color="$colorMode = $colorMode === 'light' ? 'black' : 'gray'" variant="ghost">{{
        userInfo.name }}
        <template #leading>
          <UAvatar :src="userInfo.avatar" size="2xs" />
        </template>
      </UButton>
    </UDropdown>
  </div>
</template>

<script setup lang="ts">
import { useColorMode } from '@vueuse/core'
import ConfirmLogout from './ConfirmLogout.vue';

const { signIn, signOut, status, getSession } = useAuth()
const $colorMode = useColorMode()
const modal = useModal();
const isAuthenticated = computed(() => status.value === 'authenticated')
const userInfo = ref({
  name: '',
  avatar: '',
  email: ''
})

const dropdownItems = computed(() => {
  return [[
    {
      label: 'Logout',
      icon: 'i-heroicons-arrow-left-on-rectangle',
      click: () => {
        modal.open(ConfirmLogout, {
          onSuccess: () => {
            signOut()
          },
          onCancel: () => {
            modal.close()
          }
        })
      }
    },]
  ]
})

onBeforeMount(async () => {
  getSession().then((res) => {
    console.log('res = ', res)
    if (isAuthenticated.value) {
      userInfo.value = {
        name: res?.user?.name || '',
        avatar: res?.user?.image || '',
        email: res?.user?.email || ''
      }
    }
  })
})
</script>
