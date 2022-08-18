<script setup lang="ts"></script>

<template>
  <div class="w-full flex p-6 min-h-screen">
    <div class="flex flex-col w-full max-w-screen-xl mx-auto">
      <nav class="flex items-center justify-between">
        <NuxtLink to="/" class="text-2xl font-bold flex items-center">
          <img src="~~/assets/logo.svg" class="w-10 mr-2" alt="SimpleLog logo" />
          SimpleLog
        </NuxtLink>

        <div class="flex items-center space-x-4">
          <NuxtLink class="btn-secondary bg-white" to="/docs/">
            <div class="i-uil-file text-xl mr-2"></div>
            Docs</NuxtLink
          >
          <NuxtLink class="btn-secondary bg-white" to="/">
            <div class="i-uil-star text-xl mr-2"></div>
            Features</NuxtLink
          >
          <NuxtLink class="btn-primary px-4" to="/app/">
            <div class="i-uil-apps text-xl mr-2"></div>
            Apps</NuxtLink
          >
        </div>
      </nav>
      <slot></slot>
    </div>
  </div>
</template>
