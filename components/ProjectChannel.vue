<script setup lang="ts">
import { PropType } from "vue"
import { Channels } from "~~/utils/interface"

const props = defineProps({
  channel: Object as PropType<Channels>,
})
const emits = defineEmits(["delete", "refresh"])
const client = useSupabaseClient()

const isConfirmDeleting = ref(false)
const confirmDelete = async () => {
  const { data, error } = await client.from<Channels>("channels").delete().eq("id", props.channel.id)
  console.log(data, error)
  emits("refresh")
}
</script>

<template>
  <div class="flex items-center justify-between border rounded-lg p-4 mb-4 bg-gray-50">
    <p class="font-medium"># {{ channel.name }}</p>

    <div>
      <button @click="isConfirmDeleting = true" class="text-red-500 text-lg flex">
        <div class="i-uil-trash"></div>
      </button>
    </div>

    <Modal v-model:open="isConfirmDeleting" :confirm-action="confirmDelete">
      <template #header>Delete</template>
      <p class="text-gray-800 mb-6">
        Are you sure you want to delete<span class="mx-1 bg-gray-100 rounded font-semibold px-2 py-1"
          ># {{ channel.name }}</span
        >? This action will remove all the logs, and cannot be undone.
      </p>

      <template #footer="{ cancel, confirm, loading }">
        <button class="btn btn-secondary bg-gray-50" @click="cancel">Cancel</button>
        <ButtonLoader class="btn btn-danger" @click="confirm" :loading="loading">Delete</ButtonLoader>
      </template>
    </Modal>
  </div>
</template>
