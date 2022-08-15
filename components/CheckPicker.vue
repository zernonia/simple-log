<script setup lang="ts">
defineProps({
  modelValue: Boolean,
})
const emits = defineEmits(["update:modelValue"])

const el = ref()
</script>

<template>
  <div class="relative" ref="el">
    <div
      class="w-12 h-12 flex items-center justify-center rounded-lg border cursor-pointer"
      @click="emits('update:modelValue', !modelValue)"
    >
      <div class="i-uil-check text-2xl" v-if="modelValue"></div>
      <div class="i-uil-times text-2xl" v-else></div>
    </div>
  </div>
</template>
