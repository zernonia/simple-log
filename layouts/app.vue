<script setup lang="ts">
import type { Users, Projects } from "~~/utils/interface"

const { params, name } = toRefs(useRoute())
const client = useSupabaseClient()

const { data: user } = useLazyAsyncData(
  "user",
  async () => {
    const { data } = await client.from<Users>("users").select("*").single()
    return data
  },
  { server: false }
)

const { data: projects } = useLazyAsyncData(
  "projects",
  async () => {
    const { data } = await client.from<Projects>("projects").select("*, channels!project_id(*), events!project_id(*)")
    return data
  },
  { server: false }
)

const selectedProject = computed(() => projects.value?.find((i) => i.id === params.value.projectId))

onMounted(() => {
  const subscribeEvent = client
    .from("events")
    .on("INSERT", (payload) => {
      console.log("Change received!", payload)
    })
    .subscribe()
})
</script>

<template>
  <div class="h-screen w-screen flex">
    <div class="p-4 w-20 flex flex-col justify-between flex-shrink-0">
      <div class="flex flex-col space-y-2">
        <NuxtLink to="/app/" class="rounded-full border-3 w-12 h-12 flex justify-center items-center">
          <div class="i-uil-box text-xl"></div>
        </NuxtLink>
        <NuxtLink
          v-for="project in projects"
          :to="`/app/${project.id}`"
          class="rounded-full border-3 w-12 h-12 flex justify-center items-center"
        >
          <div class="text-xl">{{ project.name.slice(0, 2) }}</div>
        </NuxtLink>
      </div>

      <div class="flex flex-col space-y-4">
        <NuxtLink to="/app/test" class="rounded-full border-3 w-12 h-12 flex justify-center items-center">
          <div class="i-uil-map text-xl"></div>
        </NuxtLink>
        <NuxtLink to="/app/setup" class="rounded-full border-3 w-12 h-12 flex justify-center items-center">
          <div class="i-uil-star text-xl"></div>
        </NuxtLink>
        <NuxtLink
          to="/app/settings/profile"
          class="rounded-full border-3 w-12 h-12 flex justify-center items-center overflow-hidden"
        >
          <img :src="user.avatar_url" :alt="user.full_name" v-if="user" />
          <div class="i-uil-user text-xl" v-else></div>
        </NuxtLink>
      </div>
    </div>

    <div
      :class="[name === 'app' ? 'w-0 p-0 border-r' : 'w-52 p-4 border-x ']"
      class="flex flex-col flex-shrink-0 transition-all ease-in-out duration-500"
    >
      <div v-if="name.toString().includes('settings')" class="flex flex-col">
        <NuxtLink to="/app/settings/profile">Profile </NuxtLink>
        <NuxtLink to="/app/settings/billing">Billing </NuxtLink>
        <NuxtLink to="/app/settings/token">Token </NuxtLink>
      </div>

      <div v-if="selectedProject?.channels">
        <h4 class="my-2">Channel</h4>
        <NuxtLink
          v-for="channel in selectedProject.channels"
          :to="`/app/${params.projectId}/${channel.id}`"
          class="flex items-center"
        >
          <div class="i-ph-hash-bold mr-2"></div>
          {{ channel.name }}
        </NuxtLink>
      </div>
    </div>
    <div>
      <slot></slot>
    </div>
  </div>
</template>
