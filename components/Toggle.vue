<script setup lang="ts">
const props = defineProps({
  defaultOpen: {
    type: Boolean,
    default: false,
  },
})

const isToggleOpen = ref(false)
const el = ref()

const { height } = useElementBounding(el)
const close = () => (isToggleOpen.value = false)

onMounted(() => {
  if (props.defaultOpen) isToggleOpen.value = true
})
</script>

<template>
  <div class="bg-gray-100 rounded-xl flex flex-col w-full overflow-hidden">
    <button class="px-4 py-3 flex justify-between items-center" @click="isToggleOpen = !isToggleOpen">
      <slot name="label"></slot>

      <div class="i-uil-angle-right text-2xl transform transition" :class="{ 'rotate-90': isToggleOpen }"></div>
    </button>

    <div
      class="px-4 bg-gray-50 transition-all duration-500 ease-in-out overflow-hidden"
      :style="[isToggleOpen ? `max-height: ${height}px` : 'max-height: 0px']"
    >
      <div ref="el" class="py-3">
        <slot :close="close"></slot>
      </div>
    </div>
  </div>
</template>
