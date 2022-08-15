<script setup lang="ts">
const props = defineProps({
  description: String,
})

const isStringParsable = (text: string) => {
  try { 
    JSON.parse(text)
    if (text?.[0] != "{") return false
  } catch (e) {
    return false
  }
  return true
}
 
</script>

<template>
  <div>
    <div v-if="isStringParsable(description)" class="p-4 rounded-xl bg-gray-50 overflow-y-auto">
      <!-- {{ description }} -->
      <p v-for="(value, key) in JSON.parse(description)">
        {{ key }}:  
        <p class="ml-4" v-if="typeof value === 'object'" v-for="(child_value, child_key) in value">
          {{ child_key }}: {{ child_value }}
        </p>
        <span v-else>{{ value }}</span>
      </p>
    </div>
    <div v-else class="whitespace-pre-wrap">{{ description }}</div>
  </div>
</template>
