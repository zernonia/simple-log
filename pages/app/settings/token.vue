<script setup lang="ts">
import { Tokens } from "~~/utils/interface"
import { castLowercaseHyphen } from "~~/utils/formkit"

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
</script>

<template>
  <ContentLayout show-nav-button>
    <template #header>API</template>

    <div class="max-w-120 px-3 mt-4 md:mt-12 w-full mx-auto">
      <button class="btn-primary w-max" :disabled="isCreatingNewToken" @click="isCreatingNewToken = true">
        Create token
      </button>

      <h3 class="mt-6 font-semibold text-lg">My Tokens</h3>
      <p class="text-sm text-gray-400">Tokens are required for publishing your events to SimpleLog</p>

      <ul class="w-full mt-6">
        <Loader v-if="pending && !tokens"></Loader>
        <ToggleToken :refresh="refresh" :token="token" v-else v-for="token in tokens"></ToggleToken>

        <Toggle v-if="isCreatingNewToken" default-open class="border-gray-800">
          <template #label>
            <div class="text-left">
              <h5 class="text-lg font-medium">{{ newToken.name }}</h5>
            </div>
          </template>

          <div class="flex-shrink-0">
            <FormKit type="form" :actions="false" @submit="createToken">
              <div class="flex items-end justify-between px-1">
                <FormKit
                  outer-class="flex-grow mr-2"
                  type="text"
                  label="Name"
                  v-model="newToken.name"
                  validation="required"
                  :plugins="[castLowercaseHyphen]"
                />
                <FormKit type="submit" name="Save" />
              </div>
            </FormKit>
            <button class="btn-danger mx-1 text-sm" @click="resetCreateNewToken">Cancel</button>
          </div>
        </Toggle>
      </ul>
    </div>
  </ContentLayout>
</template>
