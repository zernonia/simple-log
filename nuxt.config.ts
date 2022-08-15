import { defineNuxtConfig } from "nuxt"
import transformerDirective from "@unocss/transformer-directives"

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ["@unocss/nuxt", "@nuxtjs/supabase", "@vueuse/nuxt", "@formkit/nuxt"],
  css: ["@unocss/reset/tailwind.css", "~~/assets/formkit.css", "~~/assets/main.css"],
  unocss: {
    // presets
    uno: true, // enabled `@unocss/preset-uno`
    icons: true, // enabled `@unocss/preset-icons`,
    transformers: [transformerDirective()], // enabled `@unocss/transformer-directives`,

    // core options
    shortcuts: [],
    rules: [],
  },
  nitro: {
    externals: {
      inline: ["@nuxtjs/supabase", "websocket"],
    },
  },
  runtimeConfig: {
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: process.env.REDIS_PORT,
    REDIS_USERNAME: process.env.REDIS_USERNAME,
    REDIS_PASSWORD: process.env.REDIS_PASSWORD,
  },
})
