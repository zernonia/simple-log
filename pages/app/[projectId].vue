<script setup lang="ts">
const { params } = toRefs(useRoute())
</script>

<template>
  <div>
    <div>Project {{ params.projectId }}</div>

    <NuxtPage></NuxtPage>
  </div>
</template>
