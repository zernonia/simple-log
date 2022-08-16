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
        id: "2ab170cd-bfe8-494b-bcdf-7788ac663850",
        name: plugin,
        owner_id: user.value.id,
        project_name: "simple-log",
        channel_name: "test",
      },
    },
  })
  refresh()
}

const { copy } = useClipboard()

const computeUrl = (integration: Integrations) => {
  if (integration.name === "supabase") {
    return window.location.origin + "/api/v1/supabase/" + integration.id
  }
}
</script>

<template>
  <ContentLayout>
    <template #header>Plugins</template>

    <div class="max-w-120 mt-6 w-full mx-auto">
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
  </ContentLayout>
</template>
