// reference: https://github.com/pi0/nuxt-shiki-demo/blob/main/composables/shiki.ts
import { ref, Ref } from "vue"

export const useShiki = async (code: Ref<string>, hlOptions = {}) => {
  const codeToHtml = ref(() => code.value)
  const init = async () => {
    const { getHighlighter } = await import("shiki-es")
    const highlighter = await getHighlighter({ theme: "poimandres", ...hlOptions })
    codeToHtml.value = () => highlighter.codeToHtml(code.value, hlOptions)
  }
  if (process.server) {
    await init()
  } else {
    init()
  }
  return computed(() => codeToHtml.value())
}
