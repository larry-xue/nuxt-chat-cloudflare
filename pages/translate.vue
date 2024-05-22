<template>
  <Layout class="box-border overflow-hidden">
    <template #header>
      <div class="flex gap-4 items-center w-full justify-around">
        <h1 class="text-3xl font-bold">Translate</h1>
      </div>
    </template>

    <UDivider class="mb-4" />

    <UForm :state="state" :validate-on="['submit']"
      class="flex gap-2 flex-nowrap w-full box-border px-2 shrink-0 form-wrapper overflow-auto flex-col md:flex-row pt-2">
      <UFormGroup label="" name="input" class="shrink w-full">
        <UTextarea autoresize :disabled="pending" :rows="12" :max-rows="12" v-model="state.left" placeholder="请输入中文..."
          @input="onInput('left')" />
      </UFormGroup>
      <UFormGroup label="" name="output" class="shrink-0 w-auto flex justify-center">
        <UButton v-bind:loading="pending" @click="onTranslate" class="w-full">
          <div class="flex items-center gap-2 flex-col sm:items-center">
            <span>Translate</span>
            <i class="i-heroicons-arrows-right-left"></i>
          </div>
        </UButton>
      </UFormGroup>
      <UFormGroup label="" name="input" class="shrink w-full">
        <UTextarea autoresize :disabled="pending" :rows="12" :max-rows="12" v-model="state.right"
          placeholder="please input English..." @input="onInput('right')" />
      </UFormGroup>
    </UForm>
  </Layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Layout from '@/components/layout/index.vue'
const toast = useToast()

const state = ref<{
  left: string
  right: string
  target: 'left' | 'right'
}>({
  left: '',
  right: '',
  target: 'left'
})
const pending = ref(false)

const langMap: Record<string, 'zh' | 'en'> = {
  'left': 'zh',
  'right': 'en'
}

const onTranslate = () => {
  const payload = {
    source_lang: langMap[state.value.target],
    target_lang: langMap[state.value.target === 'left' ? 'right' : 'left'],
    text: state.value[state.value.target]
  }

  if (payload.text === '') {
    toast.add({
      title: 'Notification',
      description: 'Please enter some text.',
      color: 'gray',
      icon: 'i-heroicons-exclamation-circle',
      timeout: 3000,
    })

    return
  }
  pending.value = true;

  $fetch('/api/translate', {
    method: 'POST',
    body: payload
  }).then((data) => {
    const { translated_text } = data

    state.value[state.value.target === 'left' ? 'right' : 'left'] = translated_text
  }).catch((e) => {
    console.log(e)
    toast.add({
      title: 'Error',
      description: 'Something went wrong. Please try again later.',
      color: 'gray',
      icon: 'i-heroicons-exclamation-circle',
      timeout: 3000,
    })
  }).finally(() => {
    pending.value = false
  })
}

const onInput = (type: 'left' | 'right') => {
  state.value.target = type;
}
</script>

<style lang="scss" scoped>
.form-wrapper {
  height: calc(100% - 20px);
}
</style>