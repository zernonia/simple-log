import { defineNuxtModule } from "@nuxt/kit"
import { copyFile, cp } from "fs/promises"

export default defineNuxtModule({
  setup(options, nuxt) {
    nuxt.hook("bundler:done", async () => {
      // Your custom code here
      console.log("bundler done")
    })
    nuxt.hook("close", async () => {
      // Your custom code here
      console.log("bundler progress aaaaa")
      console.log(process.cwd())
      await cp("assets/docs", ".vercel/output/functions/index.func/assets/docs", { recursive: true })
    })
  },
})
