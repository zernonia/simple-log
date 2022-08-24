<template>
  <div class="p-4 bg-gray-200">
    <div class="w-full min-h-[calc(100vh-2rem)] flex p-4 sm:p-5 md:p-6 bg-white rounded-2xl">
      <div class="flex flex-col w-full max-w-screen-xl mx-auto">
        <nav class="flex items-center justify-between">
          <NuxtLink to="/" class="text-lg md:text-2xl font-bold flex items-center">
            <img src="~~/assets/logo.svg" class="w-10 mr-2" alt="SimpleLog logo" />
            SimpleLog
          </NuxtLink>

          <div class="flex items-center space-x-4">
            <NuxtLink class="hidden sm:flex btn-secondary bg-white" to="/docs/">
              <div class="i-uil-file text-xl mr-2"></div>
              Docs</NuxtLink
            >
            <NuxtLink class="hidden sm:flex btn-secondary bg-white" to="/">
              <div class="i-uil-layers text-xl mr-2"></div>
              PWA</NuxtLink
            >
            <NuxtLink class="btn-primary px-4" to="/app/">
              <div class="i-uil-apps md:text-xl mr-2"></div>
              Apps</NuxtLink
            >
          </div>
        </nav>
        <slot></slot>
      </div>
    </div>
  </div>
</template>
