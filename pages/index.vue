<template>
  <div class="flex flex-col w-full bg:-gray-900">
    <!-- langding page to /chat and /translate -->
    <Ucard class="w-full">
      <div class="flex justify-center pt-20">
        <div class="text-white">
          <p class="text-3xl font-bold mb-4 text-center text-green-500">Welcome to my ai bot site</p>
          <p class="text-3xl font-bold text-gray-300 text-center">Please select a page to start</p>
          <div class="flex mt-4 gap-2 justify-center">
            <UButton to="/chat" color="green">Chat</UButton>
            <UButton color="violet" variant="solid" to="/translate">Translate</UButton>
            <UButton color="blue" variant="solid" to="/text2image">Text to Image</UButton>
          </div>
        </div>
      </div>
    </Ucard>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  icon: 'i-heroicons-home',
  title: 'Home',
  sort: 0
})

</script>