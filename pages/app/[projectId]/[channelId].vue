<script setup lang="ts">
import { Events } from "~~/utils/interface"
const { params } = toRefs(useRoute())

const { events, isPendingEvents } = useEvents()

const client = useSupabaseClient()
const { data, pending } = useLazyAsyncData(
  `events-${params.value.channelId}`,
  async () => {
    const { data } = await client
      .from<Events>("events")
      .select("id, name, description, created_at, integration")
      .eq("channel_id", params.value.channelId.toString())
      .order("created_at", { ascending: false })
    events.value = data
    return data
  },
  { server: false }
)
syncRef(events, data, { direction: "rtl" })
syncRef(isPendingEvents, pending, { direction: "rtl" })
</script>

<template>
  <div class="w-full h-full">
    <NuxtPage></NuxtPage>
  </div>
</template>
