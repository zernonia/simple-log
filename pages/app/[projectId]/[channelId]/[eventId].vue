<script setup lang="ts">
const { event } = useEvents()
const { back } = useRouter()
</script>

<template>
  <div class="flex flex-col h-full">
    <div class="p-4 border-b font-semibold flex items-center">
      <button @click="back"><div class="i-uil-angle-left text-2xl mr-2"></div></button>
      <h3>Details</h3>
    </div>
    <div class="bg-gray-50 flex-grow">
      <div class="w-max mx-auto p-4">
        <Loader v-if="!event" />
        <div v-else>
          <LogCard :data="event"></LogCard>
        </div>
      </div>
    </div>
  </div>
</template>
