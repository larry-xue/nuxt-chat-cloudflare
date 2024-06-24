<script setup lang="ts">
import { useConfigStore } from '~/store';
import type { ChatSettingForm } from '../types';
import { models } from '../data';

const emit = defineEmits(['success', 'close'])
const form = reactive<ChatSettingForm>({
  model: '@cf/meta/llama-2-7b-chat-fp16',
  contextSize: 3
})
const configStore = useConfigStore()

onMounted(() => {
  form.model = configStore.chatModel
  form.contextSize = configStore.contextSize
})

function onSuccess() {
  emit('success', form)
}

function onClose() {
  emit('close')
}

function customSearch(text: string) {
  return models.filter((model) => model.toLowerCase().includes(text.toLowerCase()))
}
</script>

<template>
  <UModal prevent-close>
    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            Settings
          </h3>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="onClose" />
        </div>
      </template>

      <div class="px-4">
        <UForm :state="form" :validate-on="['submit']" @submit="onSuccess" class="space-y-4">
          <UFormGroup label="Model" name="model">
            <USelectMenu :searchable="customSearch" v-model="form.model" :options="models"></USelectMenu>
          </UFormGroup>
          <UFormGroup :label="`Context Size: ${form.contextSize}`" name="contextSize">
            <URange :min="1" :step="1" :max="15" v-model="form.contextSize" />
          </UFormGroup>
          <UFormGroup class="flex justify-end">
            <UButton @click="onClose" variant="ghost" label="Close" />
            <UButton class="ml-2" type="submit" variant="solid" color="primary" label="Save" />
          </UFormGroup>
        </UForm>
      </div>
    </UCard>
  </UModal>
</template>
