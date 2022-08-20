<script setup lang="ts">
import { castLowercaseHyphen } from "~~/utils/formkit"

const user = useSupabaseUser()
const { refresh } = useProjects()

const payload = ref({
  project: "",
  channel: "",
})

const submit = async () => {
  const data = await $fetch("/api/setup", {
    method: "POST",
    body: { payload: payload.value },
    headers: useRequestHeaders(["cookie"]),
  })
  await refresh()
  if (data?.channelData?.length && data.projectData) {
    navigateTo("/app/settings/token")
  }
}
</script>

<template>
  <div class="flex flex-col max-w-102 mx-auto">
    <div class="p-4 mt-12">
      <h1 class="text-4xl font-bold">Welcome {{ user?.user_metadata?.full_name }}!</h1>
      <p class="mt-4">Let's create your first project and channel!</p>

      <div class="mt-12">
        <FormKit type="form" @submit="submit" v-model="payload">
          <FormKit
            label="Project name"
            name="project"
            type="text"
            placeholder="Enter a project name"
            validation="required"
            :plugins="[castLowercaseHyphen]"
          />
          <FormKit
            type="text"
            label="Channel name"
            name="channel"
            placeholder="Enter a channel name"
            validation="required"
            :plugins="[castLowercaseHyphen]"
          />
        </FormKit>
      </div>
    </div>
  </div>
</template>
