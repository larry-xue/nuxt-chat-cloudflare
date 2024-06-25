<script lang="ts" setup>
import { useConfigStore } from '~/store';
import SettingsModal from './settingsModal.vue'
import type { ChatSettingForm } from '../types';

const modal = useModal()
const toast = useToast()
const configStore = useConfigStore()

const showSettings = () => {
  modal.open(SettingsModal, {
    onSuccess: (form: ChatSettingForm) => {
      modal.close()

      configStore.setChatModel(form.model)
      configStore.setContextSize(form.contextSize)

      toast.add({
        title: 'Notification',
        description: 'Settings saved successfully',
        color: 'gray',
        icon: 'i-heroicons-exclamation-circle',
        timeout: 3000,
      })

    },
    onClose: () => {
      modal.close()
    }
  })
}
</script>

<template>
  <div class="absolute top-4 border-b border-gray-200 dark:border-gray-800 w-full pb-2">
    <UButton icon="i-heroicons-bars-3-center-left" size="sm" color="gray" square variant="solid"
      @click="showSettings" />
  </div>
</template>
