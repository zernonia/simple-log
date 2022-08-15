<script setup lang="ts">
import { Tokens } from "~~/utils/interface"

const client = useSupabaseClient()
const user = useSupabaseUser()
const inputModel = ref({
  name: "",
})
const { data: tokens, refresh } = useLazyAsyncData(
  "tokens",
  async () => {
    const { data } = await client.from<Tokens>("tokens").select("*")
    return data
  },
  { server: false }
)

const createToken = async () => {
  const data = await $fetch("/api/token/create", {
    method: "POST",
    body: {
      payload: {
        id: "ccff374e-d2d6-440a-9b69-93d9f8a55967",
        name: inputModel.value.name,
        private: true,
        owner_id: user.value.id,
      },
    },
  })
  refresh()
}
</script>

<template>
  <div>
    <div>Token page</div>

    <input type="text" v-model="inputModel.name" />
    <button @click="createToken">Create token</button>

    <ul>
      <li v-for="token in tokens">{{ token }}</li>
    </ul>
  </div>
</template>
