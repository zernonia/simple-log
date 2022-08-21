<template>
  <div class="px-6 py-10 bg-gray-100 rounded-xl my-8">
    <img class="shadow rounded-lg" :src="src" :alt="alt" :width="width" :height="height" />
  </div>
</template>

<script setup lang="ts">
defineProps({
  src: {
    type: String,
    default: "",
  },
  alt: {
    type: String,
    default: "",
  },
  width: {
    type: [String, Number],
    default: undefined,
  },
  height: {
    type: [String, Number],
    default: undefined,
  },
})
</script>
