<template>
  <Layout class="box-border overflow-hidden">
    <template #header>
      <div class="flex gap-4 items-center w-full justify-around">
        <h1 class="text-3xl font-bold">Chat with me</h1>
        <!-- <UFormGroup label="" name="model" class="w-100">
          <USelect v-model="state.model" :options="['gpt-3.5-turbo', 'gpt-4']">
          </USelect>
        </UFormGroup> -->
      </div>
    </template>

    <UDivider class="mb-4" />

    <div class="flex flex-col w-full chat-box-wrapper">
      <div class="w-full h-full p-2 overflow-x-hidden overflow-y-auto chat-messages">
        <ClientOnly class="w-full">
          <div v-for="msg in messages" :ref="(el) => messageBoxRef = el">
            <Message :is-me="msg.isMe" :message="msg.message" />
          </div>
        </ClientOnly>
      </div>

      <UForm :state="state" :validate-on="['submit']"
        class="flex gap-1 flex-nowrap w-full box-border px-2 shrink-0 h-fit">
        <UFormGroup label="" name="input" class="shrink w-full">
          <UTextarea autoresize :rows="1" @keyup.enter.exact="sendMessage" v-model="state.message" :maxrows="10"
            placeholder="Type a message..." :ref="(el) => textareaRef = el" />
        </UFormGroup>
        <UFormGroup label="" name="output" class="shrink-0 w-auto flex items-end">
          <UButton v-bind:loading="pending" @click="sendMessage" label="Send" class="w-full" />
        </UFormGroup>
      </UForm>
    </div>
  </Layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Layout from '@/components/layout/index.vue'
import type { MessageProps } from '@/components/message/Message.client.vue';
const toast = useToast()

const state = ref({
  model: 'gpt-3.5-turbo',
  message: ''
})
const messageBoxRef = ref<Element | ComponentPublicInstance>()
const textareaRef = ref<Element | ComponentPublicInstance>()
const pending = ref(false)

const messages = ref<MessageProps[]>([
  {
    isMe: false,
    message: {
      from: {
        name: 'Bot',
        avatar: 'https://i.pravatar.cc/300'
      },
      body: 'Hello, how can I help you today?',
    },
    isPending: false
  }
])


function getRecentMessage() {
  // get latest 3 messages
  return messages.value.slice(-3).filter(m => m.isMe || m.gotResponse).map(m => {
    return { role: m.isMe ? 'user' : 'assistant', content: m.message.body }
  })
}

async function getAiResponse() {
  const data = await $fetch<{
    response: string
  }>(
    '/api/chat', {
    method: 'POST',
    body: getRecentMessage()
  })
  return data.response || "I'm sorry, I don't have an answer for that."
}

function sendMessage() {
  if (pending.value) return
  if (!state.value.message) {
    // notify
    return toast.add({
      title: 'Notification',
      description: 'Please enter a message.',
      color: 'gray',
      icon: 'i-heroicons-exclamation-circle',
      timeout: 3000,
    })
  }

  const message = {
    isMe: true,
    message: {
      from: {
        name: 'Me',
      },
      body: state.value.message
    },
    isPending: false,
  }
  messages.value.push(message)

  // get ai response
  const botResponse = {
    isMe: false,
    message: {
      from: {
        name: 'Bot',
        avatar: 'https://i.pravatar.cc/300'
      },
      body: '...',
    },
    isPending: true,
    gotResponse: false
  }

  pending.value = true
  getAiResponse().then((response) => {
    messages.value[messages.value.length - 1].message.body = response
    messages.value[messages.value.length - 1].gotResponse = true;
    nextTick(() => {
      (messageBoxRef.value as Element).scrollIntoView({ behavior: 'smooth' });
    })
  }).catch((e) => {
    toast.add({ title: 'Error', description: 'Something went wrong...', color: 'red', icon: 'i-heroicons-exclamation-circle' })
    messages.value[messages.value.length - 1].message.body = "I'm sorry, something went wrong, please try again.";
  }).finally(() => {
    pending.value = false
  })

  messages.value.push(botResponse)

  nextTick(() => {
    // focus textarea
  })

  state.value.message = ''
}
</script>

<style lang="scss" scoped>
.chat-box-wrapper {
  height: calc(100% - 20px);
}
</style>