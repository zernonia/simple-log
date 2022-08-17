<script setup lang="ts">
const client = useSupabaseClient()
const { projects } = useProjects()

const payload = ref({
  project: "",
  channel: "",
  event: "",
  description: "",
  icon: "⚡️",
  notify: true,
})
const mappedPayload = computed(() => ({
  icon: payload.value.icon,
  created_at: new Date().toISOString(),
  name: payload.value.event,
  description: payload.value.description,
}))

const projectOptions = computed(() => projects.value?.map((i) => i.name) ?? [])
const channelOptions = computed(
  () => projects.value?.find((i) => i.name === payload.value.project)?.channels?.map((i) => i.name) ?? []
)

const submit = async () => {
  const data = await $fetch("/api/v1/log", {
    method: "POST",
    headers: { Authorization: `Bearer ccff374e-d2d6-440a-9b69-93d9f8a55967` },
    body: { payload: payload.value },
  })
}
</script>

<template>
  <ContentLayout>
    <template #header>Playground</template>

    <div class="mt-12 flex flex-col lg:flex-row max-w-screen-lg mx-auto">
      <div class="w-full min-w-80 mr-8">
        <FormKit type="form" @submit="submit" v-model="payload">
          <FormKit
            validation="required"
            type="select"
            :options="projectOptions"
            placeholder="Select a project"
            label="Project name"
            name="project"
            v-model="payload.project"
          />
          <FormKit
            validation="required"
            type="select"
            :options="channelOptions"
            label="Channel name"
            placeholder="Select a channel"
            name="channel"
          />
          <FormKit validation="required" type="text" label="Event name" placeholder="User Sign Up" name="event" />
          <FormKit type="textarea" label="Description (optional)" name="description" :rows="4" />

          <div class="formkit-outer flex">
            <div class="mr-4">
              <label for="icon" class="formkit-label">Icon</label>
              <EmojiPicker v-model="payload.icon"></EmojiPicker>
            </div>
            <div>
              <label for="icon" class="formkit-label">Notify</label>
              <CheckPicker v-model="payload.notify"></CheckPicker>
            </div>
          </div>
        </FormKit>
      </div>

      <div class="flex-shrink-0 bg-gray-50 rounded-xl flex items-center justify-center px-16 py-8">
        <LogCard :data="mappedPayload"></LogCard>
      </div>
    </div>
  </ContentLayout>
</template>
