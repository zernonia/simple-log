<script setup lang="ts">
defineProps({
  loading: Boolean,
})
</script>

<template>
  <button :data-loading="loading" :disabled="loading" class="btn-loader" v-bind="$attrs">
    <slot></slot>
  </button>
</template>
