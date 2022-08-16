<template>
  <div class="flex flex-col h-full">
    <h3 class="sticky top-0 bg-white p-4 border-b font-semibold flex items-center">
      <slot name="header"></slot>
    </h3>
    <slot></slot>
  </div>
</template>
