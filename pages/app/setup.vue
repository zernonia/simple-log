<script setup lang="ts">
const client = useSupabaseClient()

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

      <button @click="submit">Submit</button>
    </div>
  </div>
</template>
