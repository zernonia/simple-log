<script setup lang="ts">
const app = useAppSettings()

defineProps({
  showNavButton: { type: Boolean, default: false },
})
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <div class="sticky top-0 bg-white p-3 md:p-4 z-10 border-b flex items-center">
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
