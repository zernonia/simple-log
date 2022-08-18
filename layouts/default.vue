<script setup lang="ts"></script>

<template>
  <div class="w-full flex p-6">
    <div class="flex flex-col w-full max-w-screen-xl mx-auto">
      <nav class="flex items-center justify-between">
        <NuxtLink to="/" class="text-2xl font-bold">SimpleLog</NuxtLink>

        <div class="flex items-center space-x-4">
          <NuxtLink class="btn-secondary bg-white" to="/docs/">
            <div class="i-uil-file mr-2"></div>
            Docs</NuxtLink
          >
          <NuxtLink class="btn-secondary bg-white" to="/">
            <div class="i-uil-star mr-2"></div>
            Features</NuxtLink
          >
          <NuxtLink class="btn-primary px-4" to="/app/">
            <div class="i-uil-apps mr-2"></div>
            Apps</NuxtLink
          >
        </div>
      </nav>
      <slot></slot>
    </div>
  </div>
</template>
