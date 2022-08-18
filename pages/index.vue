<script setup lang="ts">
import { Events } from "~~/utils/interface"

const events: Events[] = [
  {
    name: "",
    description: "",
    created_at: new Date().toString(),
    icon: "🎉",
  },
]
</script>

<template>
  <main>
    <section class="my-20 relative">
      <div class="flex flex-col items-center">
        <NuxtLink
          to="https://madewithsupabase.com"
          target="_blank"
          class="px-4 py-3 rounded-full border bg-gray-50 text-xs font-semibold text-gray-500"
        >
          Supabase Launch Week 5 Submission
        </NuxtLink>

        <h1 class="mt-6 text-6xl leading-16 text-center font-extrabold">
          Event tracking <br />
          all in 1 place
        </h1>
        <h2 class="mt-2 text-xl text-center text-gray-500">Checking events notification should be easy and simple</h2>

        <NuxtLink class="btn-primary mt-12 text-xl px-4" to="/app/">Try now</NuxtLink>

        <LandingAnimation></LandingAnimation>
      </div>
    </section>

    <section class="my-20 rounded-xl">
      <!-- <h3 class="text-4xl font-bold text-purple-500">Features</h3> -->
    </section>
  </main>
</template>
