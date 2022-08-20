<script setup lang="ts">
import { Tokens } from "~~/utils/interface"

const client = useSupabaseClient()
const { projects } = useProjects()

const token = ref("")
const payload = ref({
  project: "",
  channel: "",
  event: "",
  description: "",
  icon: "⚡️",
  notify: true,
})
const payloadForLogCard = computed(() => ({
  icon: payload.value.icon,
  created_at: new Date().toISOString(),
  name: payload.value.event,
  description: payload.value.description,
}))

const { data: tokens } = useLazyAsyncData(
  "tokens",
  async () => {
    const { data } = await client.from<Tokens>("tokens").select("*")
    return data
  },
  { server: false }
)

const tokenOptions = computed(() => tokens.value?.map((i) => ({ label: i.name, value: i.id })) ?? [])
const projectOptions = computed(() => projects.value?.map((i) => i.name) ?? [])
const channelOptions = computed(
  () => projects.value?.find((i) => i.name === payload.value.project)?.channels?.map((i) => i.name) ?? []
)

const submit = async () => {
  try {
    const data = await $fetch("/api/v1/log", {
      method: "POST",
      headers: { Authorization: `Bearer ${token.value}` },
      body: payload.value,
    })
  } catch (err) {
    console.log(err.stack?.[0])
  }
}

const code = computed(
  () => `var payload = JSON.stringify(${JSON.stringify(payload.value, undefined, 2)});

var requestOptions = {
  method: 'POST',
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer ${token.value}"
  },
  body: payload,
};

fetch("https://simple-log.vercel.app/v1/log", requestOptions)
  .then(response => response.json())
  .catch(error => console.log('error', error));
`
)
const hlCode = await useShiki(code, { lang: "ts" })
</script>

<template>
  <ContentLayout show-nav-button>
    <template #header>Playground</template>
    <div class="mt-4 px-3 md:mt-12 flex flex-col lg:flex-row max-w-screen-lg mx-auto">
      <div class="md:min-w-80 md:mr-8">
        <FormKit type="form" @submit="submit">
          <FormKit
            validation="required"
            type="select"
            :options="tokenOptions"
            placeholder="Select a token"
            label="Token"
            name="token"
            v-model="token"
          />
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
            v-model="payload.channel"
          />
          <FormKit
            validation="required"
            type="text"
            label="Event name"
            placeholder="User Sign Up"
            name="event"
            v-model="payload.event"
          />
          <FormKit
            type="textarea"
            label="Description (optional)"
            name="description"
            :rows="4"
            v-model="payload.description"
          />

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

      <div class="flex-shrink-0 bg-gray-50 rounded-xl flex flex-col items-center justify-center px-3 md:px-16 py-8">
        <LogCard class="m-6 md:mt-12" :data="payloadForLogCard"></LogCard>

        <div class="md:mt-12 prose hlCode" v-html="hlCode"></div>
      </div>
    </div>
  </ContentLayout>
</template>

<style>
.hlCode pre code .line {
  display: inline;
}
</style>
