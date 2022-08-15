<script setup lang="ts">
import { PropType } from "vue"
import { Events } from "~~/utils/interface"

defineProps({
  data: Object as PropType<Events>,
})
</script>

<template>
  <div class="py-6 mx-4 flex flex-col w-104 border-b">
    <div class="flex items-center justify-between">
      <div class="rounded-full bg-gray-50 w-9 h-9 flex items-center justify-center">
        {{ data.icon ?? "⚡️" }}
      </div>
      <p class="text-xs mt-1 text-gray-400">{{ useTimeAgo(data.created_at).value }}</p>
    </div>
    <div class="mt-3 flex-grow">
      <h3 class="font-medium text-gray-900">{{ data.name }}</h3>
      <LogDescription
        :description="data.description"
        class="whitespace-pre mt-1 text-sm text-gray-700"
      ></LogDescription>
    </div>
  </div>
</template>
