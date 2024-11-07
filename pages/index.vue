<template>
  <div class="h-full flex justify-center">
    <div class="text-center p-6 pt-20 bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg">
      <h1 ref="heading" class="text-4xl font-bold mb-4 text-gradient">🚀 Welcome to Larry's AI Site</h1>
      <p ref="paragraph" class="text-lg mb-4">This site is currently under development. If you have any questions, please contact me on GitHub.</p>
      <div ref="links" class="space-x-4 mb-4">
        <a href="https://github.com/larry-xue" class="text-lg font-semibold underline hover:text-gray-300">GitHub</a>
        <a href="https://blog.larryxue.dev" class="text-lg font-semibold underline hover:text-gray-300">Blog</a>
      </div>
      <div ref="intro" class="text-left">
        <p class="text-lg mb-2">✨ Features:</p>
        <ul class="list-disc list-inside mb-4">
          <li>💬 Chat with multiple Cloudflare free models</li>
          <li>🌐 Translate functionality</li>
          <li>🖼️ Text to image</li>
        </ul>
        <p class="text-lg">Developed by Nuxt.js and powered by Cloudflare.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

const heading = ref(null)
const paragraph = ref(null)
const links = ref(null)
const intro = ref(null)

onMounted(() => {
  gsap.from(heading.value, { opacity: 0, y: -50, duration: 1 })
  gsap.from(paragraph.value, { opacity: 0, y: 50, duration: 1, delay: 0.5 })
  gsap.from(links.value, { opacity: 0, y: 50, duration: 1, delay: 1 })
  gsap.from(intro.value, { opacity: 0, y: 50, duration: 1, delay: 1.5 })
})

definePageMeta({
  icon: 'i-heroicons-home',
  title: 'Home',
  sort: 0
})
</script>

<style scoped>
.text-gradient {
  background: linear-gradient(90deg, #4ade80, #feb47b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
