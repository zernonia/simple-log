<script setup lang="ts">
import { PropType } from "vue"
import { Events } from "~~/utils/interface"

defineProps({
  data: Object as PropType<Events>,
})
</script>

<template>
  <div class="p-4 rounded-xl border-3 flex">
    <div class="mr-4 text-3xl">🔔</div>
    <div>
      <h3>{{ data.name }}</h3>
      <p>{{ data.description }}</p>
      <p>{{ useTimeAgo(data.created_at).value }}</p>
    </div>
  </div>
</template>
