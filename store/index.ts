import { defineStore } from 'pinia'
import type { MessageProps } from '~/components/message/Message.client.vue'
import useStorage from '~/storage'

const storage = useStorage()

export const useConfigStore = defineStore('config', {
  state: () => {
    const chatConfig = storage.get('chatConfig')
    return {
      chatModel: chatConfig?.model || 'gpt-3.5-turbo',
      contextSize: chatConfig?.contextSize || 2048
    }
  },
  actions: {
    setChatModel(model: string) {
      this.chatModel = model
      storage.set('chatConfig', {
        model,
        contextSize: this.contextSize
      })
    },
    setContextSize(size: number) {
      this.contextSize = size
      storage.set('chatConfig', {
        model: this.chatModel,
        contextSize: size
      })
    }
  }
})

// TODO: use template later
const getDefaultMessage = () => {
  return {
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
}

export const useChatHistoryStore = defineStore('chatHistory', {
  state: (): { messages: MessageProps[], currentChatId: string } => {
    return {
      messages: [getDefaultMessage()],
      currentChatId: `chat_history_${+new Date()}`,
    }
  },
  getters: {
    getMessages: (state) => state.messages
  },
  actions: {
    addMessage(message: MessageProps) {
      this.messages.push(message)
      storage.set(`${this.currentChatId}`, this.messages)
    },
    removeMessage(index: number) {
      this.messages.splice(index, 1)
      storage.set(`${this.currentChatId}`, this.messages)
    },
    startNewChat() {
      this.messages = [getDefaultMessage()]
      this.currentChatId = `chat_history_${+new Date()}`
    }
  }
})
