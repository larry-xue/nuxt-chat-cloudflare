<template>
  <div class="flex flex-col h-screen w-full bg:-gray-900">
    <!-- langding page to /chat and /translate -->
    <Ucard class="w-full h-full">
      <div class="flex justify-center items-center h-full">
        <div class="text-white">
          <p class="text-3xl font-bold mb-4 text-center text-green-500">Welcome to my ai bot site</p>
          <p class="text-3xl font-bold text-gray-300 text-center">Please select a page to start</p>
          <div class="flex mt-4 gap-2 justify-center">
            <UButton to="/chat" color="green">Chat</UButton>
            <UButton color="violet" variant="solid" to="/translate">Translate</UButton>
          </div>
        </div>
      </div>
    </Ucard>
  </div>
</template>

<script lang="ts" setup>
// redirect to /chat
// useRouter().push('/chat')
</script>