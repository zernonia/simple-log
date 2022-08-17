<template>
  <div class="flex flex-col min-h-screen">
    <h3 class="sticky top-0 bg-white p-4 z-10 text-lg border-b font-semibold flex items-center">
      <slot name="header"></slot>
    </h3>
    <slot></slot>
  </div>
</template>
