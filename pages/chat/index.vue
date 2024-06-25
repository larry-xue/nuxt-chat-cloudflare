<template>
  <ContentBox class="box-border py-2 pt-8">
    <Headerbar />
    <div class="w-full h-full grid grid-rows-[1fr_auto] grid-cols-1">
      <div class="w-full h-full p-2 overflow-x-hidden overflow-y-auto row-span-1">
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
  </ContentBox>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { MessageProps } from '@/components/message/Message.client.vue';
import ContentBox from '~/components/layout/ContentBox.vue';
import Headerbar from './components/headerbar.vue';
import { useConfigStore } from '~/store';

const toast = useToast()
const configStore = useConfigStore()

definePageMeta({
  icon: 'i-heroicons-chat-bubble-oval-left-ellipsis',
  title: 'Chat',
  sort: 1
})


const state = ref({
  message: ''
})
const messageBoxRef = ref<Element | ComponentPublicInstance | null>()
const textareaRef = ref<Element | ComponentPublicInstance | null>()
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
  return messages.value.slice(configStore.contextSize * -1).filter(m => m.isMe || m.gotResponse).map(m => {
    return { role: m.isMe ? 'user' : 'assistant', content: m.message.body }
  })
}

async function getAiResponse() {
  const data = await $fetch<{
    response: string
  }>(
    '/api/chat', {
    method: 'POST',
    body: {
      messages: getRecentMessage(),
      model: configStore.chatModel
    }
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
