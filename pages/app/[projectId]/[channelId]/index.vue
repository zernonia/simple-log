<script setup lang="ts">
const { params } = toRefs(useRoute())
const { selectedChannel } = useProjects()
const { currentChannelEvents, isPendingEvents } = useEvents()

const isListView = useLocalStorage("is-list-view", true)
</script>

<template>
  <ContentLayout show-nav-button>
    <template #header>
      <div class="w-full flex items-center justify-between">
        <div class="flex items-center">
          <div class="i-ph-hash-bold mr-2"></div>
          {{ selectedChannel?.name }}
        </div>

        <ClientOnly>
          <div class="flex items-center">
            <button
              @click="isListView = true"
              class="px-2 text-lg transition"
              :class="[isListView ? 'text-gray-800' : 'text-gray-400']"
            >
              <div class="i-uil-list-ul"></div>
            </button>
            <button
              @click="isListView = false"
              class="px-2 text-lg transition"
              :class="[!isListView ? 'text-gray-800' : 'text-gray-400']"
            >
              <div class="i-uil-postcard"></div>
            </button>
          </div>
        </ClientOnly>
        <!-- <TextSearch></TextSearch> -->
      </div>
    </template>
    <div class="bg-white flex-grow">
      <div class="sm:w-max mx-auto p-3 sm:p-4 mt-4 sm:mt-6">
        <Loader v-if="isPendingEvents" />
        <div v-auto-animate>
          <div
            class="text-xl text-center font-medium text-gray-400"
            v-if="!isPendingEvents && !currentChannelEvents?.length"
          >
            No events yet...
          </div>
          <div v-else class="relative" v-for="event in currentChannelEvents" :key="event.id">
            <NuxtLink :to="`${params.channelId}/${event.id}`">
              <LogCard :mini="isListView" :data="event"></LogCard>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </ContentLayout>
</template>
