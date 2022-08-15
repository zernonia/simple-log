<script setup lang="ts">
const { params } = toRefs(useRoute())

definePageMeta({
  sidePanel: true,
})
</script>

<template>
  <div class="w-full h-full">
    <NuxtPage></NuxtPage>
  </div>
</template>
