<script setup lang="ts">
import { Events } from "~~/utils/interface"

const client = useSupabaseClient()
const searchText = ref("")
const throttled = refThrottled(searchText, 1000, undefined, false)

watch(throttled, () => {
  search()
})
const search = async () => {
  const { data, error } = await client
    .from<Events>("events")
    .select("id,name, description")
    .textSearch("description", searchText.value)
  console.log({ data })
}
</script>

<template>
  <div>
    <input
      class="text-base font-medium outline-none w-24 focus:w-64 py-1 px-2 bg-white focus:bg-gray-100 focus:placeholder-gray-500 transition-all ease-in-out px-4 rounded-lg"
      type="text"
      placeholder="Search"
      v-model="searchText"
    />
  </div>
</template>
