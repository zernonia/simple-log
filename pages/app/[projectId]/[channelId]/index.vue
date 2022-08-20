<script setup lang="ts">
const { params } = toRefs(useRoute())
const { selectedChannel } = useProjects()
const { currentChannelEvents, isPendingEvents } = useEvents()
</script>

<template>
  <ContentLayout show-nav-button>
    <template #header>
      <div class="flex w-full items-center justify-between">
        <div class="flex items-center">
          <div class="i-ph-hash-bold mr-2"></div>
          {{ selectedChannel?.name }}
        </div>
        <TextSearch></TextSearch>
      </div>
    </template>
    <div class="bg-gray-50 sm:flex-grow">
      <div class="sm:w-max mx-auto p-3 sm:p-4 mt-4 sm:mt-6">
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
