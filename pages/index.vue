<script setup lang="ts"></script>

<template>
  <main>
    <section class="my-20">
      <div class="flex flex-col items-center">
        <NuxtLink
          to="https://madewithsupabase.com"
          target="_blank"
          class="px-4 py-3 rounded-full border bg-gray-50 text-xs font-semibold"
        >
          Supabase Launch Week 5 Submission
        </NuxtLink>

        <h1 class="mt-6 text-6xl text-center font-extrabold">Event tracking all in 1 place</h1>
        <h2 class="mt-2 text-2xl text-center font-semibold text-gray-300">
          Checking events notification should be easy and simple
        </h2>

        <LandingAnimation></LandingAnimation>

        <NuxtLink class="btn-primary mt-12" to="/app/">Try now</NuxtLink>
      </div>
    </section>

    <section class="my-20 rounded-xl">
      <!-- <h3 class="text-4xl font-bold text-purple-500">Features</h3> -->
    </section>
  </main>
</template>
