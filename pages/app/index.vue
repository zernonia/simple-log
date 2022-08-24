<script setup lang="ts">
import { Events } from "~~/utils/interface"
import { isSameDay } from "date-fns"

const { event: ev, events } = useEvents()
const client = useSupabaseClient()

const total = ref(0)
const { pending, refresh } = useLazyAsyncData(
  "logs",
  async () => {
    const { data, count } = await client
      .from<Events>("events")
      .select("id, icon, name, description, created_at, integration, project_id, channel_id", { count: "exact" })
      .order("created_at", { ascending: false })
      //@ts-ignore
      .range(...range.value)

    events.value = events.value.concat(data)
    total.value = count
    return data
  },
  { server: false }
)
onMounted(() => refresh())

const { range } = usePagination(total, 50, refresh)
const isListView = useLocalStorage("is-list-view", true)

const isNextDay = (dateLeft: string, dateRight: string) => {
  return !isSameDay(new Date(dateLeft), new Date(dateRight))
}
</script>

<template>
  <div class="flex flex-col">
    <div class="p-3">
      <NavBarButton></NavBarButton>
    </div>
    <div class="flex-grow">
      <div class="sm:w-max mx-auto p-3 sm:p-4 sm:mt-6">
        <Loader v-if="pending && !events.length" />
        <div v-auto-animate>
          <div class="text-xl text-center font-medium text-gray-400" v-if="!pending && !events.length">
            So quiet here...
          </div>
          <div class="relative" v-for="(event, index) in events" :key="event.id">
            <div class="font-bold text-gray-300 mb-2">
              <p v-if="index === 0">{{ new Date(event.created_at).toLocaleDateString() }}</p>
              <p v-else-if="isNextDay(event.created_at, events[Math.max(index - 1, 0)].created_at)">
                {{ new Date(event.created_at).toLocaleDateString() }}
              </p>
            </div>

            <NuxtLink @click="ev = event" :to="`/app/${event.project_id}/${event.channel_id}/${event.id}`">
              <LogCard :mini="isListView" :data="event"></LogCard>
            </NuxtLink>

            <!-- <button class="absolute left-full">a</button> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
