<script setup lang="ts">
import { castLowercaseHyphen } from "~~/utils/formkit"

const { params } = toRefs(useRoute())
const { selectedProject } = useProjects()

const isCreatingNewChannel = ref(false)
const newChannelName = ref("")
const confirmCreate = () => {
  isCreatingNewChannel.value = false
  newChannelName.value = ""
}
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold pb-3">{{ selectedProject.name }}</h2>
    <div class="my-3 flex justify-between">
      <h4 class="uppercase text-sm font-bold text-gray-400">Channel</h4>
      <button @click="isCreatingNewChannel = true"><div class="i-uil-plus"></div></button>
    </div>
    <NuxtLink v-for="channel in selectedProject.channels" :to="`/app/${params.projectId}/${channel.id}`" class="panel">
      <div class="i-ph-hash-bold mr-2"></div>
      {{ channel.name }}
    </NuxtLink>

    <Modal v-model:open="isCreatingNewChannel">
      <template #header>Create Channel</template>

      <div>
        <FormKit v-model="newChannelName" label="Channel Name" type="text" :plugins="[castLowercaseHyphen]">
          <template #prefix><div class="i-ph-hash-bold text-lg mr-2"></div></template>
        </FormKit>
      </div>
      <!-- <p class="text-gray-800 mb-6">Are you sure you want to delete the token? This action cannot be undone.</p> -->

      <template #footer="{ cancel }">
        <button class="btn-secondary bg-gray-50" @click="cancel">Cancel</button>
        <button class="btn" @click="confirmCreate">Create Channel</button>
      </template>
    </Modal>
  </div>
</template>
