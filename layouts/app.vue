<script setup lang="ts">
import { RealtimeSubscription } from "@supabase/realtime-js"
import type { Users } from "~~/utils/interface"

const { name, meta } = toRefs(useRoute())
const client = useSupabaseClient()
const user = useUser()
const { projects, selectedProject } = useProjects()

const { data: userData } = useLazyAsyncData(
  "user",
  async () => {
    const { data } = await client.from<Users>("users").select("*").single()
    return data
  },
  { server: false }
)
syncRef(user, userData, { direction: "rtl" })

const { events, channelEvents } = useEvents()
const { play } = useSound()
let subscribeEvent: RealtimeSubscription
onMounted(() => {
  subscribeEvent = client
    .from("events")
    .on("INSERT", (payload) => {
      play()
      if (events.value.length) events.value = [payload.new, ...events.value]
      if (channelEvents.value[payload.new.channel_id])
        channelEvents.value[payload.new.channel_id] = [payload.new, ...channelEvents.value[payload.new.channel_id]]
    })
    .subscribe()
})

onUnmounted(() => {
  subscribeEvent.unsubscribe()
})

const app = useAppSettings()
const el = ref()
onClickOutside(el, () => {
  app.value.isNavBarShowing = false
})

onMounted(async () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((res) => console.log("service worker registered"))
      .catch((err) => console.log("service worker not registered", err))

    navigator.serviceWorker.addEventListener("message", (event) => {
      console.log(event.data)
    })
  }
})

useCustomHead("App")
</script>

<template>
  <div class="h-screen w-screen overflow-hidden flex p-4 bg-gray-50">
    <div
      ref="el"
      :class="[app.isNavBarShowing ? '-translate-x-1rem' : '-translate-x-[120%]']"
      class="bg-gray-50 md:bg-transparent absolute md:static !md:translate-x-0 h-full z-100 transition flex duration-300 ease-in-out"
    >
      <div class="p-2 py-0 md:p-3 md:w-18 flex flex-col justify-between flex-shrink-0">
        <div class="flex flex-col space-y-2">
          <NuxtLink to="/app/" class="circle-panel">
            <!-- <div class="i-uil-box text-xl"></div> -->
            <img src="~~/assets/logo.svg" class="p-1.5 filter opacity-100 hover:opacity-50 transition" />
          </NuxtLink>
          <NuxtLink
            v-for="project in projects"
            :to="`/app/${project.id}/${project.channels?.[0].id}`"
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
          <NuxtLink v-if="!projects.length" to="/app/setup" class="circle-panel">
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
        :class="[meta.sidePanel ? 'w-60 md:w-64' : 'w-0']"
        class="flex flex-col flex-shrink-0 transition-width ease-in-out duration-500"
      >
        <transition name="fade">
          <div class="p-2 py-0 md:p-4 overflow-hidden" v-if="meta.sidePanel">
            <div v-if="name.toString().includes('app-settings')" class="flex flex-col">
              <h4 class="my-3 uppercase text-sm font-bold text-gray-400">Settings</h4>

              <NuxtLink class="panel" to="/app/settings/notification">Notification</NuxtLink>
              <NuxtLink class="panel" to="/app/settings/profile">Profile </NuxtLink>
              <!-- <NuxtLink class="panel" to="/app/settings/billing">Billing </NuxtLink> -->
              <NuxtLink class="panel" to="/app/settings/token">Token </NuxtLink>
              <NuxtLink class="panel" to="/app/settings/plugins">Plugins</NuxtLink>
            </div>

            <SidepanelChannel v-if="selectedProject?.channels"></SidepanelChannel>
          </div>
        </transition>
      </div>
    </div>
    <div
      :class="[app.isNavBarShowing ? 'opacity-50 pointer-events-none' : 'opacity-100']"
      class="w-full flex-grow overflow-y-auto overflow-x-hidden transition ease-in-out rounded-3xl bg-white md:shadow-xl shadow-gray-200"
    >
      <slot></slot>
    </div>
  </div>
</template>
