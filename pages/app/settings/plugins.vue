<script setup lang="ts">
import { Integrations } from "~~/utils/interface"

const client = useSupabaseClient()
const user = useSupabaseUser()

const {
  data: integrations,
  pending,
  refresh,
} = useLazyAsyncData(
  "integrations",
  async () => {
    const { data } = await client.from<Integrations>("integrations").select("*")
    return data
  },
  { server: false }
)

const createToken = async (integration: Integrations) => {
  const data = await $fetch("/api/integration/create", {
    method: "POST",
    body: {
      payload: {
        owner_id: user.value.id,
        ...integration,
      },
    },
  })
  refresh()
}

const { projects } = useProjects()
const isCreatingNewIntegration = ref(false)
const newIntegration = ref<Integrations>({
  name: "",
})
const resetCreateNewToken = () => {
  isCreatingNewIntegration.value = false
  newIntegration.value = {
    name: "",
  }
}
const createIntegration = (type: "supabase") => {
  isCreatingNewIntegration.value = true
  newIntegration.value = {
    name: type,
    owner_id: user.value.id,
    project_name: projects.value?.[0]?.name,
    channel_name: "",
  }
}
</script>

<template>
  <ContentLayout>
    <template #header>Plugins</template>

    <div class="max-w-120 mt-6 w-full mx-auto">
      <div class="flex space-x-4">
        <button
          class="w-32 h-32 border-3 border-gray-100 hover:border-gray-800 transition rounded-xl p-3 flex flex-col justify-center items-center"
          @click="createIntegration('supabase')"
        >
          <div class="i-logos-supabase-icon text-5xl mb-4"></div>
          <p class="font-medium">Supabase</p>
        </button>

        <NuxtLink
          class="w-32 h-32 text-center text-gray-300 border-3 border-gray-100 hover:border-gray-800 hover:text-gray-800 transition rounded-xl p-3 flex flex-col justify-center items-center"
          to="https://github.com/zernonia/simple-log/issues"
          target="_blank"
        >
          <div class="i-uil-plus text-5xl"></div>
          <p class="text-sm">Suggest new integrations</p>
        </NuxtLink>
      </div>

      <h3 class="mt-6 font-semibold text-lg">My Integrations</h3>
      <p class="text-sm text-gray-400">Tokens are required for publishing your events to SimpleLog</p>

      <Loader v-if="pending && !integrations"></Loader>
      <ul class="mt-8" v-else>
        <ToggleIntegration
          v-for="integration in integrations"
          :integration="integration"
          @save="createToken(integration)"
        ></ToggleIntegration>

        <ToggleIntegration
          default-open
          is-new
          v-if="isCreatingNewIntegration"
          :integration="newIntegration"
          @save="createToken(newIntegration)"
          @cancel="resetCreateNewToken"
        ></ToggleIntegration>
      </ul>
    </div>
  </ContentLayout>
</template>
