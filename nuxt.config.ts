import { defineNuxtConfig } from "nuxt"
import transformerDirective from "@unocss/transformer-directives"

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ["@unocss/nuxt", "@nuxtjs/supabase", "@vueuse/nuxt", "@formkit/nuxt", "@nuxt/content"],
  css: ["@unocss/reset/tailwind.css", "~~/assets/formkit.css", "~~/assets/main.css"],
  formkit: {
    configFile: "./formkit.config.ts",
  },
  unocss: {
    // presets
    uno: true, // enabled `@unocss/preset-uno`
    icons: true, // enabled `@unocss/preset-icons`,
    typography: {
      cssExtend: {
        h1: {
          "font-weight": 700,
        },
        h2: {
          "font-weight": 700,
        },
        h3: {
          "font-weight": 700,
        },
        code: {
          padding: "0.25rem 0.35rem",
          background: "#f2f4f6 !important",
          "border-radius": "0.25rem",
        },
        a: {
          color: "#9ca3af",
        },
        "a:hover": {
          color: "#202938",
        },
      },
    },
    transformers: [transformerDirective({ enforce: "pre" })], // enabled `@unocss/transformer-directives`,

    // core options
    shortcuts: [
      {
        btn: " text-sm md:text-base font-medium rounded-lg py-2 px-3 outline-none transition ring-3 ring-transparent disabled:opacity-50 relative inline-flex justify-center items-center",
        "btn-primary": "btn bg-gray-900 text-white focus:ring-gray-300",
        "btn-secondary": "btn bg-gray-100 hover:bg-gray-200 focus:ring-gray-300",
        "btn-danger": "btn bg-red-500 text-white hover:bg-red-600 focus:ring-red-300",
      },
    ],
    rules: [],
  },
  nitro: {
    externals: {
      inline: ["@nuxtjs/supabase", "websocket"],
    },
  },
  content: {
    highlight: {
      theme: "poimandres",
    },
  },
  runtimeConfig: {
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: process.env.REDIS_PORT,
    REDIS_USERNAME: process.env.REDIS_USERNAME,
    REDIS_PASSWORD: process.env.REDIS_PASSWORD,
    VAPID_PRIVATE_KEY: process.env.VAPID_PRIVATE_KEY,
    VAPID_SUBJECT: process.env.VAPID_SUBJECT,
    public: {
      VAPID_PUBLIC_KEY: process.env.VAPID_PUBLIC_KEY,
    },
  },
})
