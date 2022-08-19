<script setup lang="ts">
const urlB64ToUint8Array = (base64String: string) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/")
  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

const user = useSupabaseUser()
const runtime = useRuntimeConfig()
onMounted(async () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((res) => console.log("service worker registered"))
      .catch((err) => console.log("service worker not registered", err))
  }
})

const subscribe = async () => {
  const registration = await navigator.serviceWorker.getRegistration()
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlB64ToUint8Array(runtime.public.VAPID_PUBLIC_KEY),
  })
  const a = await $fetch("/api/notify/create", {
    method: "POST",
    body: {
      subscription,
      user: user.value,
    },
  })
}
</script>

<template>
  <div>
    <Link rel="manifest" href="manifest.json" />
    <!-- ios support -->
    <Link rel="apple-touch-icon" href="images/icons/icon-72x72.png" />
    <Link rel="apple-touch-icon" href="images/icons/icon-96x96.png" />
    <Link rel="apple-touch-icon" href="images/icons/icon-128x128.png" />
    <Link rel="apple-touch-icon" href="images/icons/icon-144x144.png" />
    <Link rel="apple-touch-icon" href="images/icons/icon-152x152.png" />
    <Link rel="apple-touch-icon" href="images/icons/icon-192x192.png" />
    <Link rel="apple-touch-icon" href="images/icons/icon-384x384.png" />
    <Link rel="apple-touch-icon" href="images/icons/icon-512x512.png" />
    <Meta name="apple-mobile-web-app-status-bar" content="#121827" />
    <Meta name="theme-color" content="#121827" />

    <button @click="subscribe">subscribe</button>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
