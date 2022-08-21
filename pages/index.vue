<script setup lang="ts">
useCustomHead("Home")
</script>

<template>
  <main>
    <section class="my-10 md:my-20 relative">
      <div class="flex flex-col items-center">
        <NuxtLink
          to="https://madewithsupabase.com"
          target="_blank"
          class="px-4 py-3 rounded-full border bg-gray-50 hover:bg-gray-100 transition text-center text-10px sm:text-xs font-semibold text-gray-500"
        >
          Supabase Launch Week 5 Submission
        </NuxtLink>

        <h1 class="mt-6 text-4xl md:text-6xl md:leading-16 text-center font-extrabold">
          Event tracking <br />
          all in 1 place
        </h1>
        <h2 class="mt-2 md:text-xl text-center text-gray-500">
          Organize your events neatly in channels. Simple & Easy
        </h2>

        <NuxtLink class="btn-primary mt-6 md:mt-12 md:text-xl px-4" to="/app/">Try now</NuxtLink>

        <LandingAnimation></LandingAnimation>
      </div>
    </section>
  </main>
</template>
