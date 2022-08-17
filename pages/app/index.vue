<script setup lang="ts">
import { Events } from "~~/utils/interface"

const { event: ev, events } = useEvents()
const client = useSupabaseClient()
const { data, pending, refresh } = useLazyAsyncData(
  "logs",
  async () => {
    const { data } = await client
      .from<Events>("events")
      .select("id, icon, name, description, created_at, integration, project_id, channel_id")
      .order("created_at", { ascending: false })
      .limit(50)
    return data
  },
  { server: false }
)
syncRef(events, data)
onMounted(() => refresh())
</script>

<template>
  <div class="bg-gray-50 min-h-screen py-12">
    <div class="mx-auto w-max">
      <Loader v-if="pending && !events.length" />
      <div v-auto-animate>
        <div class="relative" v-for="event in events" :key="event.id">
          <NuxtLink @click="ev = event" :to="`/app/${event.project_id}/${event.channel_id}/${event.id}`">
            <LogCard :data="event"></LogCard>
          </NuxtLink>

          <!-- <button class="absolute left-full">a</button> -->
        </div>
      </div>
    </div>
  </div>
</template>
