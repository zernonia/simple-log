<script setup lang="ts">
const { back } = useRouter()

const { selectedProject, refresh } = useProjects()
const client = useSupabaseClient()
</script>

<template>
  <ContentLayout>
    <template #header>
      <div class="flex items-center">
        <button @click="back"><div class="i-uil-angle-left text-2xl mr-2"></div></button>
        <h3>Project Settings</h3>
      </div>
    </template>

    <Loader v-if="!selectedProject"></Loader>
    <div v-else class="max-w-120 mt-12 w-full mx-auto">
      <h3 class="formkit-label">Project Name</h3>
      <p>{{ selectedProject.name }}</p>

      <h3 class="formkit-label mt-12">Channels</h3>

      <ul>
        <ProjectChannel
          @refresh="refresh"
          v-for="channel in selectedProject.channels"
          :channel="channel"
        ></ProjectChannel>
      </ul>
    </div>
  </ContentLayout>
</template>
