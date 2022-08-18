<script setup lang="ts">
const { event } = useEvents()
const { back } = useRouter()
</script>

<template>
  <ContentLayout>
    <template #header>
      <div class="flex items-center">
        <button @click="back"><div class="i-uil-angle-left text-2xl mr-2"></div></button>
        <h3>Details</h3>
      </div>
    </template>

    <div class="bg-gray-50 flex-grow">
      <div class="w-max mx-auto p-4 mt-6">
        <Loader v-if="!event" />
        <div v-else>
          <LogCard :data="event"></LogCard>
        </div>
      </div>
    </div>
  </ContentLayout>
</template>
