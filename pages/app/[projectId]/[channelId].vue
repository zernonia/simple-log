<script setup lang="ts">
import { Events } from "~~/utils/interface"
const { params } = toRefs(useRoute())

const { channelEvents, isPendingEvents } = useEvents()

const client = useSupabaseClient()
const { pending } = useLazyAsyncData(
  `events-${params.value.channelId}`,
  async () => {
    const { data } = await client
      .from<Events>("events")
      .select("id, icon, name, description, created_at, integration")
      .eq("channel_id", params.value.channelId.toString())
      .order("created_at", { ascending: false })
    channelEvents.value[params.value.channelId.toString()] = data

    return data
  },
  { server: false }
)
syncRef(isPendingEvents, pending, { direction: "rtl" })
</script>

<template>
  <div class="w-full h-full">
    <NuxtPage></NuxtPage>
  </div>
</template>
