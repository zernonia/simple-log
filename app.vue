<script setup lang="ts">
useHead({
  charset: "utf-8",
  titleTemplate: (title) => `${title} | SimpleLog`,
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
    <Link rel="icon" href="images/icons/icon-512x512.png" />
    <Meta name="apple-mobile-web-app-status-bar" content="#121827" />
    <Meta name="theme-color" content="#121827" />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
