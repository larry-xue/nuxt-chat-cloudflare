<template>
  <UModal>
    <UCard>
      <div class="space-y-2">
        <h1 class="text-2xl font-bold">Logout</h1>
        <p class="text-lg">Are you sure you want to logout?</p>
        <div class="flex justify-end space-x-2">
          <UButton color="gray" @click="onCancel">Cancel</UButton>
          <UButton color="red" @click="onSuccess">Logout</UButton>
        </div>
      </div>
    </UCard>
  </UModal>
</template>

<script lang="ts" setup>
const emit = defineEmits(['success', 'cancel'])

function onSuccess () {
  emit('success')
}

function onCancel () {
  emit('cancel')
}
</script>