<script setup lang="ts">
import { Events } from "~~/utils/interface"
const { params } = toRefs(useRoute())

const { channelEvents, isPendingEvents } = useEvents()

const client = useSupabaseClient()
const total = ref(0)
const { pending, refresh } = useLazyAsyncData(
  `events-${params.value.channelId}`,
  async () => {
    const { data, count } = await client
      .from<Events>("events")
      .select("id, icon, name, description, created_at, integration", { count: "exact" })
      .eq("channel_id", params.value.channelId.toString())
      .order("created_at", { ascending: false })
      //@ts-ignore
      .range(...range.value)

    channelEvents.value[params.value.channelId.toString()] = [
      ...(channelEvents.value[params.value.channelId.toString()] ?? []),
      ...data,
    ]
    total.value = count
    return data
  },
  { server: false }
)

const { range } = usePagination(total, 25, refresh)
syncRef(isPendingEvents, pending, { direction: "rtl" })
</script>

<template>
  <div class="w-full h-full">
    <NuxtPage></NuxtPage>
  </div>
</template>
