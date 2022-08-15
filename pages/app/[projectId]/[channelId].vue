<script setup lang="ts">
import { Events } from "~~/utils/interface"

const { params } = toRefs(useRoute())

const client = useSupabaseClient()
const { data: events, pending } = useLazyAsyncData(
  `events-${params.value.channelId}`,
  async () => {
    const { data } = await client
      .from<Events>("events")
      .select("id, name, description, created_at")
      .eq("channel_id", params.value.channelId.toString())
      .order("created_at", { ascending: false })
    return data
  },
  { server: false }
)
</script>

<template>
  <div>
    <div class="p-4 border-b">header</div>
    <div class="w-max mx-auto p-4">
      <Loader v-if="pending" />
      <LogCard v-else v-for="event in events" :data="event"></LogCard>
    </div>
  </div>
</template>
