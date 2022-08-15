<script setup lang="ts">
import { Integrations, Tokens } from "~~/utils/interface"

const client = useSupabaseClient()
const user = useSupabaseUser()
const inputModel = ref({
  name: "",
})
const { data: integrations, refresh } = useLazyAsyncData(
  "integrations",
  async () => {
    const { data } = await client.from<Integrations>("integrations").select("*")
    return data
  },
  { server: false }
)

const createToken = async (plugin: string) => {
  const data = await $fetch("/api/integration/create", {
    method: "POST",
    body: {
      payload: {
        name: plugin,
        owner_id: user.value.id,
        project_id: "c46d7c62-541f-4d3c-a3fc-872af78764d9",
        channel_name: "test",
      },
    },
  })
  refresh()
}

const { copy } = useClipboard()

const computeUrl = (integration: Integrations) => {
  if (integration.name === "supabase") {
    return window.location.host + "/api/v1/supabase/" + integration.id
  }
}
</script>

<template>
  <div class="flex flex-col p-4">
    <h1 class="text-2xl font-bold pb-4">Plugins</h1>

    <div class="max-w-120 w-full mx-auto">
      <button class="w-full border-3 rounded-xl p-3 flex items-center" @click="createToken('supabase')">
        <div class="i-logos-supabase-icon text-3xl mr-4"></div>
        <p class="font-medium">Supabase</p>
      </button>

      <ul class="mt-8">
        <li v-for="integration in integrations" class="">
          <h3>{{ integration.name }}</h3>
          <div class="w-full rounded-xl border-3 p-3 text-sm flex items-center justify-between">
            <div class="flex w-full">
              <div class="i-logos-supabase-icon flex-shrink-0 text-3xl mr-4"></div>
              <input type="text" :value="computeUrl(integration)" class="w-full disabled:bg-transparent" disabled />
            </div>

            <div class="flex-shrink-0">
              <button @click="copy(computeUrl(integration))"><div class="i-uil-clipboard text-lg mr-2"></div></button>
              <!-- <button><div class="i-uil-cog text-lg"></div></button> -->
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
