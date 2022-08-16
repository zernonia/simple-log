<script setup lang="ts">
const { params } = toRefs(useRoute())
const { selectedChannel } = useProjects()
const { events, isPendingEvents } = useEvents()
</script>

<template>
  <ContentLayout>
    <template #header>
      <div class="i-ph-hash-bold mr-2"></div>
      {{ selectedChannel?.name }}</template
    >

    <div class="bg-gray-50 flex-grow">
      <div class="w-max mx-auto p-4">
        <Loader v-if="isPendingEvents" />
        <NuxtLink v-else v-for="event in events" :key="event.id" :to="`${params.channelId}/${event.id}`">
          <LogCard :data="event"></LogCard>
        </NuxtLink>
      </div>
    </div>
  </ContentLayout>
</template>
