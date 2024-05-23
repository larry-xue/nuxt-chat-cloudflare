<template>
  <div class="h-full flex justify-center">
    <div class="text-center p-6 pt-20bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg">
      <h1 class="text-4xl font-bold mb-4">Welcome to Larry's AI Site</h1>
      <p class="text-lg mb-4">This site is currently under development. If you have any questions, please contact me on GitHub.</p>
      <div class="space-x-4">
        <a href="https://github.com/larry-xue" class="text-lg font-semibold underline hover:text-gray-300">GitHub</a>
        <a href="https://blog.larryxue.dev" class="text-lg font-semibold underline hover:text-gray-300">Blog</a>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  icon: 'i-heroicons-home',
  title: 'Home',
  sort: 0
})
</script>