<script setup lang="ts">
const { settings } = useAppSettings()
</script>

<template>
  <button @click="settings.isNavBarShowing = true" class="flex items-center justify-center md:hidden">
    <div class="i-uil-bars text-gray-800 text-xl"></div>
  </button>
</template>
