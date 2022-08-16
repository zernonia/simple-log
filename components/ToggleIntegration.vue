<script setup lang="ts">
import { PropType } from "vue"
import { Integrations } from "~~/utils/interface"

const props = defineProps({
  integration: Object as PropType<Integrations>,
  isNew: { type: Boolean, default: false },
})
const emits = defineEmits(["save", "cancel", "delete"])

const { copy, copied } = useClipboard()
const computeUrl = (integration: Integrations) => {
  if (integration.name === "supabase") {
    return window.location.origin + "/api/v1/supabase/" + integration.id
  }
}

const { projects } = useProjects()
const projectOptions = computed(() => projects.value?.map((i) => i.name) ?? [])
const channelOptions = computed(
  () => projects.value?.find((i) => i.name === props.integration.project_name)?.channels?.map((i) => i.name) ?? []
)
watch(
  () => props.integration.project_name,
  () => {
    if (!props.integration.channel_name) {
      props.integration.channel_name = channelOptions.value?.[0]
    }
  },
  { immediate: true }
)

const isConfirmDeleting = ref(false)
const confirmDelete = () => {
  emits("delete")
  isConfirmDeleting.value = false
}
</script>

<template>
  <Toggle class="mb-4" v-bind="$attrs">
    <template #label>
      <div class="flex items-center">
        <div class="i-logos-supabase-icon flex-shrink-0 text-4xl mr-4"></div>
        <div class="text-left">
          <h5 class="text-lg font-medium">{{ integration.name }}</h5>
          <p class="text-xs text-gray-400" v-if="integration.created_at">
            Created on {{ new Date(integration.created_at).toLocaleDateString() }}
          </p>
        </div>
      </div>
    </template>

    <div class="flex-shrink-0">
      <div class="flex items-end justify-between px-1 opacity-50 delay-300 hover:opacity-100 transition">
        <FormKit
          outer-class="w-1/2 mr-2"
          type="select"
          label="Project"
          v-model="integration.project_name"
          :options="projectOptions"
          validation="required"
        />
        <FormKit
          outer-class="w-1/2 mr-2"
          type="select"
          label="Channel"
          v-model="integration.channel_name"
          :options="channelOptions"
          validation="required"
        />
        <FormKit type="submit" name="Save" @click="emits('save')" />
      </div>

      <button v-if="isNew" class="btn-danger text-sm mx-1" @click="emits('cancel')">Cancel</button>
      <div v-else class="mt-1 mx-1 flex justify-between items-center">
        <button class="btn-secondary text-sm" @click="copy(computeUrl(integration))">
          <div class="i-uil-clipboard text-base mr-2"></div>
          {{ copied ? "Copied" : "Copy endpoint" }}
        </button>

        <button
          class="text-sm inline-flex text-red-500 hover:underline underline-offset-2"
          @click="isConfirmDeleting = true"
        >
          Delete Plugin
        </button>
      </div>
    </div>

    <Modal v-model:open="isConfirmDeleting">
      <template #header>Delete</template>
      <p class="text-gray-800 mb-6">Are you sure you want to delete the plugin? This action cannot be undone.</p>

      <template #footer="{ cancel }">
        <button class="btn-secondary bg-gray-50" @click="cancel">Cancel</button>
        <button class="btn-danger" @click="confirmDelete">Delete</button>
      </template>
    </Modal>
  </Toggle>
</template>
