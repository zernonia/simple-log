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

const { copy } = useClipboard()
</script>

<template>
  <div class="flex flex-col p-4">
    <h1 class="text-2xl font-bold pb-4">Token</h1>

    <div class="max-w-120 w-full mx-auto">
      <input type="text" v-model="inputModel.name" />
      <button @click="createToken">Create token</button>

      <ul class="w-full">
        <li v-for="token in tokens" class="">
          <h3>{{ token.name }}</h3>
          <div class="w-full rounded-lg border-3 p-3 text-sm flex items-center justify-between">
            <input type="text" :value="token.id" class="w-full max-w-82 blur-sm hover:blur-0 transition" disabled />

            <div class="flex-shrink-0">
              <button @click="copy(token.id)"><div class="i-uil-clipboard text-lg mr-2"></div></button>
              <!-- <button><div class="i-uil-cog text-lg"></div></button> -->
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
