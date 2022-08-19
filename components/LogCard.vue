<script setup lang="ts">
import { PropType } from "vue"
import { Events } from "~~/utils/interface"

defineProps({
  data: Object as PropType<Events>,
})
</script>

<template>
  <div
    class="py-6 px-6 mx-4 mb-6 flex flex-col w-full max-w-132 bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
  >
    <div class="flex items-center justify-between">
      <div class="rounded-full bg-gray-50 w-9 h-9 flex items-center justify-center">
        {{ data.icon ?? "⚡️" }}
      </div>
      <p class="text-xs mt-1 text-gray-400">
        {{ useTimeAgo(data.created_at).value }} •
        {{
          new Date(data.created_at).toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric", hour12: true })
        }}
      </p>
    </div>
    <div class="mt-3 flex-grow">
      <div class="flex items-center">
        <h3 class="font-medium text-gray-800">{{ data.name }}</h3>
        <p class="text-xs font-medium rounded-full bg-green-200 text-green-500 px-2 py-1 ml-2" v-if="data.integration">
          {{ data.integration }}
        </p>
      </div>
      <LogDescription
        :description="data.description"
        class="whitespace-pre mt-1 text-sm text-gray-700"
      ></LogDescription>
    </div>
  </div>
</template>
