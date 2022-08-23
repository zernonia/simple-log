import { defineNuxtPlugin } from "#app"

export default defineNuxtPlugin(() => {
  const moduleOptions = {
    scriptUrl: "https://umami-zernonia.vercel.app/umami.js",
    websiteId: "cb093b6c-e6df-449e-9472-141482cc9cb3",
    domains: "simple-log.vercel.app",
  }
  const options = { ...moduleOptions }

  loadScript(options)
})

function loadScript(options: any) {
  const head = document.head || document.getElementsByTagName("head")[0]
  const script = document.createElement("script")

  script.async = true
  script.defer = true
  script.dataset.websiteId = options.websiteId
  script.dataset.domains = options.domains
  script.src = options.scriptUrl

  head.appendChild(script)
}
