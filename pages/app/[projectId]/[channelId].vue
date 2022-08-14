<script setup lang="ts">
import { Events } from "~~/utils/interface"

const { params } = toRefs(useRoute())

const client = useSupabaseClient()
const { data: events } = useLazyAsyncData(
  `events-${params.value.channelId}`,
  async () => {
    const { data } = await client
      .from<Events>("events")
      .select("id, name, description, created_at")
      .order("created_at", { ascending: false })
    return data
  },
  { server: false }
)
</script>

<template>
  <div>
    <LogCard v-for="event in events" :data="event"></LogCard>
  </div>
</template>
