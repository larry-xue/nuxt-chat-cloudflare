<script lang="ts" setup>
import { useChatHistoryStore, useConfigStore } from '~/store';
import SettingsModal from './settingsModal.vue'
import type { ChatSettingForm } from '../types';
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

const modal = useModal()
const toast = useToast()
const configStore = useConfigStore()
const chatHistoryStore = useChatHistoryStore()
const breakpoints = useBreakpoints(breakpointsTailwind)
const isMobile = breakpoints.smaller('md')

const showSettings = () => {
  modal.open(SettingsModal, {
    onSuccess: (form: ChatSettingForm) => {
      modal.close()

      configStore.setChatModel(form.model)
      configStore.setContextSize(form.contextSize)

      toast.add({
        title: 'Settings saved successfully',
        timeout: 1000,
      })

    },
    onClose: () => {
      modal.close()
    }
  })
}

const resetChatHistory = () => {
  chatHistoryStore.startNewChat()
  toast.add({
    title: 'Chat history reset successfully',
    timeout: 1000,
  })
}
</script>

<template>
<div class="absolute top-4 border-b border-gray-200 dark:border-gray-800 pb-2 flex gap-2" :class="[isMobile && 'right-4', 'border-b-0', 'top-3']">
    <UTooltip text="Settings">
      <UButton icon="i-heroicons-bars-3-center-left" size="sm" color="gray" square variant="solid"
        @click="showSettings" />
    </UTooltip>
    <UTooltip text="Start a new chat">
      <UButton icon=" i-heroicons-plus" size="sm" color="green" square variant="solid" @click="resetChatHistory" />
    </UTooltip>
    <!-- <UTooltip text="Start a new chat"">
    </UTooltip> -->
  </div>
</template>
