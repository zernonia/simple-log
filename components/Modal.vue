<script setup lang="ts">
const props = defineProps({ open: Boolean, confirmAction: Function })
const emits = defineEmits(["update:open"])

const el = ref()
onClickOutside(el, () => {
  if (isLoading.value) return
  emits("update:open", !props.open)
})

const isLoading = ref(false)
const cancel = () => emits("update:open", !props.open)
const confirm = async () => {
  isLoading.value = true
  await props.confirmAction()
  isLoading.value = false
  emits("update:open", !props.open)
}

watch(
  () => props.open,
  (n) => {
    if (!n) return
    nextTick(() => {
      const input = el.value?.querySelector("input")
      if (input) input.focus()
    })
  }
)
</script>

<template>
  <transition name="fade">
    <div
      v-if="open"
      class="fixed top-0 left-0 w-screen h-screen z-100 flex items-center justify-center bg-white bg-opacity-70"
    >
      <div ref="el" class="inner w-full mx-4 max-w-112 bg-white rounded-xl shadow-2xl overflow-hidden">
        <FormKit type="form" :actions="false" @submit="confirm" messages-class="hidden">
          <section class="px-6 mt-5 mb-2 text-base md:text-[22px] font-semibold text-gray-800">
            <slot name="header">Header</slot>
          </section>
          <section class="px-6 py-3 text-sm md:text-[15px]">
            <slot>this is body</slot>
          </section>
          <section
            class="px-6 py-4 bg-gray-50 flex justify-end space-x-2 transition modal-footer"
            :class="{ 'pointer-events-none opacity-50': isLoading }"
          >
            <slot name="footer" :cancel="cancel" :confirm="confirm" :loading="isLoading">
              <button class="btn-danger">Cancel</button>
              <button :data-loading="isLoading" class="btn-primary">Confirm</button>
            </slot>
          </section>
        </FormKit>
      </div>
    </div>
  </transition>
</template>
