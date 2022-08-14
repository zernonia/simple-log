<script setup lang="ts">
const client = useSupabaseClient()

const payload = ref({
  project: "",
  channel: "",
  event: "",
  description: "",
  icon: "",
  notify: true,
})

const submit = async () => {
  const data = await $fetch("/api/v1/log", {
    method: "POST",
    headers: { Authorization: `Bearer ccff374e-d2d6-440a-9b69-93d9f8a55967` },
    body: { payload: payload.value },
  })
}
</script>

<template>
  <div class="flex flex-col">
    <h1>Initial setup</h1>

    <div class="flex flex-col">
      <label for="project">Project name</label>
      <input type="text" v-model="payload.project" />
      <label for="project">Channel name</label>
      <input type="text" v-model="payload.channel" />
      <label for="project">Event name</label>
      <input type="text" v-model="payload.event" />
      <label for="project">Description</label>
      <input type="text" v-model="payload.description" />

      <button @click="submit">Submit</button>
    </div>
  </div>
</template>
