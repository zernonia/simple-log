<script setup lang="ts">
import { PropType } from "vue"
import { Events } from "~~/utils/interface"

defineProps({
  mini: { type: Boolean, default: false },
  data: Object as PropType<Events>,
})
</script>

<template>
  <div
    class="p-3 sm:p-4 md:p-6 mb-4 md:mb-6 w-full flex md:w-120 bg-gray-100 rounded-xl hover:shadow-md transition-all duration-300 ease-in-out"
    v-auto-animate
  >
    <div v-if="mini" class="flex items-center justify-between w-full">
      <div class="flex-shrink-0 rounded-full bg-white w-9 h-9 flex items-center justify-center">
        {{ data.icon ?? "⚡️" }}
      </div>
      <div class="flex flex-col truncate text-sm mx-4 flex-grow text-light-400">
        <p class="font-semibold mr-2 text-gray-800 truncate">{{ data.name }}</p>
        <p class="text-xs text-gray-400 truncate">{{ data.description }}</p>
      </div>
      <p class="flex-shrink-0 text-10px sm:text-xs">{{ useTimeAgo(data.created_at).value }}</p>
    </div>

    <div v-else class="w-full flex flex-col">
      <div class="flex items-center justify-between">
        <div class="rounded-full bg-white w-9 h-9 flex items-center justify-center">
          {{ data.icon ?? "⚡️" }}
        </div>
        <p class="text-10px sm:text-xs mt-1 text-gray-400">
          {{ useTimeAgo(data.created_at).value }} •
          {{
            new Date(data.created_at).toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric", hour12: true })
          }}
        </p>
      </div>
      <div class="mt-3 pb-3 flex-grow overflow-x-auto">
        <div class="flex items-center">
          <h3 class="text-sm sm:text-base font-medium text-gray-800">{{ data.name }}</h3>
          <p
            class="text-10px sm:text-xs font-medium rounded-full bg-green-200 text-green-500 px-2 py-1 ml-2"
            v-if="data.integration"
          >
            {{ data.integration }}
          </p>
        </div>
        <LogDescription
          :description="data.description"
          class="whitespace-pre mt-1 text-sm text-gray-700"
        ></LogDescription>
      </div>
    </div>
  </div>
</template>
