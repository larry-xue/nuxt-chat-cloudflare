import { defineStore } from 'pinia'
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
