import { noop } from "@vueuse/shared"
import { Ref } from "vue"

export const usePagination = (total: Ref<number>, size = 50, onPageChange = noop) => {
  const page = ref(0)
  const pending = ref(false)

  const range = computed(() => [page.value * size, (page.value + 1) * size - 1])

  const { paginationBus } = useAppSettings()
  paginationBus.on(async (ev: string) => {
    if (!pending.value && total.value > (page.value + 1) * size) {
      page.value++
      pending.value = true
      await onPageChange()
      pending.value = false
    }
  })

  return {
    page,
    range,
  }
}
