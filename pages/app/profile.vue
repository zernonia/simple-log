<script setup lang="ts">
import { Tokens } from "~~/utils/interface"

const client = useSupabaseClient()
const user = useSupabaseUser()

const { data: tokens, refresh } = useLazyAsyncData(
  "tokens",
  async () => {
    const { data } = await client.from<Tokens>("tokens").select("*")
    return data
  },
  { server: false }
)

const createToken = async () => {
  const { data } = await client.from<Tokens>("tokens").insert({
    name: "test",
    private: true,
    owner_id: user.value.id,
  })
  refresh()
}
</script>

<template>
  <div>
    <div>profile</div>

    <button @click="createToken">Create token</button>

    <ul>
      <li v-for="token in tokens">{{ token }}</li>
    </ul>
  </div>
</template>
