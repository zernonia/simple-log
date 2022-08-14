<script setup lang="ts"></script>

<template>
  <div class="h-screen w-screen flex">
    <div class="p-4 w-20 flex flex-col flex-shrink-0">
      <button class="rounded-full border-3 w-12 h-12 flex justify-center items-center">
        <div class="i-uil-box text-xl"></div>
      </button>
    </div>
    <div class="p-4 w-52 flex flex-col flex-shrink-0 border-x">
      <h4 class="my-2">Channel</h4>
      <button class="flex items-center">
        <div class="i-ph-hash-bold mr-2"></div>
        Pro
      </button>
    </div>
    <h1 class="text-3xl font-extrabold">App layout</h1>
    <div>
      <slot></slot>
    </div>
  </div>
</template>
