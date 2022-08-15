<script setup lang="ts">
import { RealtimeSubscription } from "@supabase/realtime-js"
import type { Users, Projects } from "~~/utils/interface"

const { params, name, meta } = toRefs(useRoute())
const client = useSupabaseClient()
const { projects } = useProjects()

const { data: user } = useLazyAsyncData(
  "user",
  async () => {
    const { data } = await client.from<Users>("users").select("*").single()
    return data
  },
  { server: false }
)

useLazyAsyncData(
  "projects",
  async () => {
    const { data } = await client.from<Projects>("projects").select("*, channels!project_id(*)")
    projects.value = data
    return data
  },
  { server: false }
)

const selectedProject = computed(() => projects.value?.find((i) => i.id === params.value.projectId))

let subscribeEvent: RealtimeSubscription
onMounted(() => {
  subscribeEvent = client
    .from("events")
    .on("INSERT", (payload) => {
      console.log("Change received!", payload)
    })
    .subscribe()
})

onUnmounted(() => {
  subscribeEvent.unsubscribe()
})
</script>

<template>
  <div class="h-screen w-screen overflow-hidden flex">
    <div class="p-4 w-20 flex flex-col justify-between flex-shrink-0">
      <div class="flex flex-col space-y-2">
        <NuxtLink to="/app/" class="circle-panel">
          <div class="i-uil-box text-xl"></div>
        </NuxtLink>
        <NuxtLink
          v-for="project in projects"
          :to="`/app/${project.id}`"
          class="circle-panel"
          :class="{ 'circle-panel-active': name.toString().includes('app-projectId') }"
        >
          <div class="text-xl">{{ project.name.slice(0, 2) }}</div>
        </NuxtLink>
      </div>

      <div class="flex flex-col space-y-4">
        <NuxtLink to="/app/playground" class="circle-panel">
          <div class="i-uil-play text-xl"></div>
        </NuxtLink>
        <NuxtLink to="/app/setup" class="circle-panel">
          <div class="i-uil-star text-xl"></div>
        </NuxtLink>
        <NuxtLink
          to="/app/settings/plugins"
          class="circle-panel"
          :class="{ 'circle-panel-active': name.toString().includes('app-settings') }"
        >
          <div class="i-uil-cog text-xl"></div>
        </NuxtLink>
        <NuxtLink to="/app/settings/profile" class="circle-panel overflow-hidden">
          <img :src="user.avatar_url" :alt="user.full_name" v-if="user" />
          <div class="i-uil-user text-xl" v-else></div>
        </NuxtLink>
      </div>
    </div>

    <div
      :class="[meta.sidePanel ? 'w-60 p-4 border-x ' : 'w-0 p-0 border-r']"
      class="flex flex-col flex-shrink-0 transition-all ease-in-out duration-500"
    >
      <div v-if="name.toString().includes('settings')" class="flex flex-col">
        <h4 class="my-3 uppercase text-sm font-bold text-gray-400">Settings</h4>

        <NuxtLink class="panel" to="/app/settings/profile">Profile </NuxtLink>
        <NuxtLink class="panel" to="/app/settings/billing">Billing </NuxtLink>
        <NuxtLink class="panel" to="/app/settings/token">Token </NuxtLink>
        <NuxtLink class="panel" to="/app/settings/plugins">Plugins</NuxtLink>
      </div>

      <div v-if="selectedProject?.channels">
        <h2 class="text-xl font-bold pb-3">{{ selectedProject.name }}</h2>
        <div class="my-3 flex justify-between">
          <h4 class="uppercase text-sm font-bold text-gray-400">Channel</h4>
          <button><div class="i-uil-plus"></div></button>
        </div>
        <NuxtLink
          v-for="channel in selectedProject.channels"
          :to="`/app/${params.projectId}/${channel.id}`"
          class="panel"
        >
          <div class="i-ph-hash-bold mr-2"></div>
          {{ channel.name }}
        </NuxtLink>
      </div>
    </div>
    <div class="w-full flex-grow overflow-y-auto">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="postcss">
.circle-panel {
  @apply rounded-full border-3 border-transparent w-12 h-12 flex justify-center items-center hover:text-gray-400 transition duration-500;
}
.router-link-exact-active.circle-panel,
.circle-panel-active {
  @apply border-gray-200 !text-gray-400;
}

.panel {
  @apply flex items-center px-3 py-1.5 font-medium rounded-lg bg-transparent hover:text-gray-400 transition duration-500;
}
.router-link-active.panel {
  @apply bg-gray-100 !text-gray-400;
}
</style>
