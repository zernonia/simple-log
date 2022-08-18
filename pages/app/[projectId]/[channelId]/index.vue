<script setup lang="ts">
const { params } = toRefs(useRoute())
const { selectedChannel } = useProjects()
const { currentChannelEvents, isPendingEvents } = useEvents()
</script>

<template>
  <ContentLayout>
    <template #header>
      <div class="i-ph-hash-bold mr-2"></div>
      {{ selectedChannel?.name }}</template
    >
    <div class="bg-gray-50 flex-grow">
      <div class="w-max mx-auto p-4 mt-6">
        <Loader v-if="isPendingEvents" />
        <div v-auto-animate>
          <div class="text-xl font-medium text-gray-400" v-if="!isPendingEvents && !currentChannelEvents?.length">
            No events yet...
          </div>
          <div v-else class="relative" v-for="event in currentChannelEvents" :key="event.id">
            <NuxtLink :to="`${params.channelId}/${event.id}`">
              <LogCard :data="event"></LogCard>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </ContentLayout>
</template>
