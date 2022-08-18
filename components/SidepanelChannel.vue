<script setup lang="ts">
import { castLowercaseHyphen } from "~~/utils/formkit"
import { Channels } from "~~/utils/interface"

const { params } = toRefs(useRoute())
const { selectedProject, refresh } = useProjects()
const client = useSupabaseClient()

const isCreatingNewChannel = ref(false)
const newChannelName = ref("")
const confirmCreate = async () => {
  const { data, error } = await client.from<Channels>("channels").insert({
    name: newChannelName.value,
    project_id: selectedProject.value.id,
  })
  await refresh()
  newChannelName.value = ""
}
</script>

<template>
  <div class="w-55">
    <div class="pb-3 flex items-center justify-between group">
      <h2 class="text-xl font-semibold">{{ selectedProject.name }}</h2>
      <NuxtLink :to="`/app/${params.projectId}/settings`"><div class="i-uil-cog text-lg transition"></div></NuxtLink>
    </div>
    <div class="my-3 flex justify-between">
      <h4 class="uppercase text-sm font-bold text-gray-400">Channel</h4>
      <button @click="isCreatingNewChannel = true"><div class="i-uil-plus"></div></button>
    </div>
    <NuxtLink
      v-for="channel in selectedProject.channels"
      :to="`/app/${params.projectId}/${channel.id}`"
      class="panel justify-between group"
    >
      <div class="flex items-center">
        <div class="i-ph-hash-bold mr-2"></div>
        {{ channel.name }}
      </div>
      <!-- <div class="flex opacity-0 transition group-hover:opacity-100 hover:text-gray-800">
        <NuxtLink :to="`/app/${params.projectId}/${channel.id}/settings`"><div class="i-uil-cog"></div></NuxtLink>
      </div> -->
    </NuxtLink>

    <Modal v-model:open="isCreatingNewChannel" :confirm-action="confirmCreate">
      <template #header>Create Channel</template>

      <div>
        <FormKit
          v-model="newChannelName"
          label="Channel Name"
          type="text"
          validation="required"
          :plugins="[castLowercaseHyphen]"
          @keypress.enter.prevent=""
        >
          <template #prefix><div class="i-ph-hash-bold text-lg mr-2"></div></template>
        </FormKit>
      </div>

      <template #footer="{ cancel, confirm }">
        <button class="btn btn-secondary bg-gray-50" @click.prevent.stop="cancel">Cancel</button>
        <FormKit type="submit" class="btn btn-primary">Create Channel</FormKit>
      </template>
    </Modal>
  </div>
</template>
