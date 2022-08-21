<script setup lang="ts">
useCustomHead("Docs")

const docsQuery = (await queryContent("docs").find()).filter((i) => !i._path.includes("plugins"))
const pluginQuery = await queryContent("docs", "plugins").find()
</script>

<template>
  <div class="flex flex-col md:flex-row my-4">
    <nav class="mr-8 w-56">
      <h4 class="my-3 uppercase text-sm font-bold text-gray-400">Documentation</h4>
      <div class="w-full" v-for="link in docsQuery">
        <NuxtLink
          :to="link._path"
          class="px-4 py-2 rounded-lg flex text-base font-semibold bg-white text-gray-800 hover:text-gray-400 transition"
        >
          {{ link.title }}
        </NuxtLink>
      </div>

      <h4 class="mt-8 mb-3 uppercase text-sm font-bold text-gray-400">Plugins</h4>
      <div v-for="link in pluginQuery" class="w-full">
        <NuxtLink
          class="w-full rounded-lg border flex items-center px-4 py-3 font-semibold bg-white hover:bg-gray-100 transition"
          :to="link._path"
        >
          <div :class="link.icon" class="mr-4 text-4xl"></div>
          <p>{{ link.slug }}</p>
        </NuxtLink>
      </div>
    </nav>

    <NuxtPage class="prose w-full md:max-w-screen-sm mx-auto"></NuxtPage>
  </div>
</template>

<style scoped lang="postcss">
.router-link-exact-active {
  @apply text-gray-400 bg-gray-100;
}
</style>
