<script setup lang="ts">
const { back } = useRouter()
</script>

<template>
  <ContentLayout>
    <template #header>
      <div class="flex items-center">
        <button @click="back"><div class="i-uil-angle-left text-2xl mr-2"></div></button>
        <h3>Project Settings</h3>
      </div>
    </template>

    <div class="p-6">Project settings</div>
  </ContentLayout>
</template>
