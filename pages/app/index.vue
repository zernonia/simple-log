<script setup lang="ts">
import { Events } from "~~/utils/interface"

const client = useSupabaseClient()
const {
  data: events,
  pending,
  refresh,
} = useLazyAsyncData(
  "logs",
  async () => {
    const { data } = await client
      .from<Events>("events")
      .select("id, name, description, created_at")
      .order("created_at", { ascending: false })
      .limit(50)
    return data
  },
  { server: false }
)

onMounted(() => refresh())
</script>

<template>
  <div class="mx-auto w-max">
    <Loader v-if="pending && !events" />
    <LogCard v-else v-for="event in events" :data="event"></LogCard>
  </div>
</template>
