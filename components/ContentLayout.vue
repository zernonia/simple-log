<script setup lang="ts">
const app = useAppSettings()

defineProps({
  showNavButton: { type: Boolean, default: false },
})
</script>

<template>
  <div class="flex flex-col min-h-screen bg-white">
    <div class="sticky bg-white bg-opacity-70 backdrop-filter backdrop-blur-md top-0 p-3 md:p-4 z-10 flex items-center">
      <button
        v-if="showNavButton"
        @click="app.isNavBarShowing = true"
        class="flex items-center justify-center md:hidden mr-4"
      >
        <div class="i-uil-bars text-gray-800 text-xl"></div>
      </button>
      <h3 class="md:text-lg font-semibold flex items-center">
        <slot name="header"></slot>
      </h3>
    </div>
    <slot></slot>
  </div>
</template>
