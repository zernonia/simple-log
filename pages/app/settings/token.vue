<script setup lang="ts">
import { Tokens } from "~~/utils/interface"

const client = useSupabaseClient()
const user = useSupabaseUser()

const isCreatingNewToken = ref(false)
const newToken = ref({
  name: "captain",
})
const resetCreateNewToken = () => {
  isCreatingNewToken.value = false
  newToken.value = {
    name: "captain",
  }
}

const {
  data: tokens,
  pending,
  refresh,
} = useLazyAsyncData(
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
        name: newToken.value.name,
        private: true,
        owner_id: user.value.id,
      },
    },
  })
  await refresh()
  resetCreateNewToken()
}

const updateToken = async (token: Tokens) => {
  const data = await $fetch("/api/token/create", {
    method: "POST",
    body: {
      payload: {
        id: token.id,
        name: token.name,
      },
    },
  })
  refresh()
}

const deleteToken = () => {}

const { copy } = useClipboard()
</script>

<template>
  <ContentLayout>
    <template #header>API</template>

    <div class="max-w-120 mt-6 w-full mx-auto">
      <button class="btn w-max" :disabled="isCreatingNewToken" @click="isCreatingNewToken = true">Create token</button>

      <h3 class="mt-6 font-semibold text-lg">My Tokens</h3>
      <p class="text-sm text-gray-400">Tokens are required for publishing your events to SimpleLog</p>

      <ul class="w-full mt-6">
        <Loader v-if="pending && !tokens"></Loader>
        <Toggle v-else class="mb-4" v-for="token in tokens">
          <template #label>
            <div class="text-left">
              <h5 class="text-lg font-medium">{{ token.name }}</h5>
              <p class="text-xs text-gray-400">Created on {{ new Date(token.created_at).toLocaleDateString() }}</p>
            </div>
          </template>

          <div class="flex-shrink-0">
            <div class="flex items-end justify-between px-1 opacity-50 delay-300 hover:opacity-100 transition">
              <FormKit
                outer-class="flex-grow mr-2"
                type="text"
                label="Name"
                v-model="token.name"
                validation="required"
              />
              <FormKit type="submit" name="Save" @click="updateToken(token)" />
            </div>

            <div class="mt-1 mx-1 flex justify-between items-center">
              <button class="btn-secondary text-xs" @click="copy(token.id)">
                <div class="i-uil-clipboard text-base mr-2"></div>
                Copy token
              </button>

              <button class="text-xs inline-flex text-red-500 hover:underline underline-offset-2" @click="deleteToken">
                Delete Token
              </button>
            </div>
          </div>
        </Toggle>

        <Toggle v-if="isCreatingNewToken" default-open class="border-gray-800">
          <template #label>
            <div class="text-left">
              <h5 class="text-lg font-medium">{{ newToken.name }}</h5>
            </div>
          </template>

          <div class="flex-shrink-0">
            <div class="flex items-end justify-between px-1">
              <FormKit
                outer-class="flex-grow mr-2"
                type="text"
                label="Name"
                v-model="newToken.name"
                validation="required"
              />
              <FormKit type="submit" name="Save" @click="createToken" />
            </div>

            <button class="btn-danger mx-1 text-xs" @click="resetCreateNewToken">Cancel</button>
          </div>
        </Toggle>
      </ul>
    </div>
  </ContentLayout>
</template>
