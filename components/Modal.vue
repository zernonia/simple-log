<script setup lang="ts">
const props = defineProps({ open: Boolean })
const emits = defineEmits(["update:open", "confirm"])

const el = ref()
onClickOutside(el, () => {
  emits("update:open", !props.open)
})

const cancel = () => emits("update:open", !props.open)
const confirm = () => emits("confirm")
</script>

<template>
  <transition name="fade">
    <div
      v-if="open"
      class="fixed top-0 left-0 w-screen h-screen z-100 flex items-center justify-center bg-white bg-opacity-70"
    >
      <div ref="el" class="inner w-full max-w-112 bg-white rounded-xl shadow-2xl overflow-hidden">
        <section class="px-6 mt-5 mb-2 text-[22px] font-semibold text-gray-800">
          <slot name="header">Header</slot>
        </section>
        <section class="px-6 py-3 text-[15px]">
          <slot>this is body</slot>
        </section>
        <section class="px-6 py-4 bg-gray-50 flex justify-end space-x-2">
          <slot name="footer" :cancel="cancel" :confirm="confirm">
            <button class="btn-danger">Cancel</button>
            <button class="btn">Confirm</button>
          </slot>
        </section>
      </div>
    </div>
  </transition>
</template>
