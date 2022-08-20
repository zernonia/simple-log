<script setup lang="ts">
onMounted(async () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((res) => console.log("service worker registered"))
      .catch((err) => console.log("service worker not registered", err))
  }
})
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

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
