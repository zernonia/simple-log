<script setup lang="ts">
import { PropType } from "vue"
import { Tokens } from "~~/utils/interface"
import { castLowercaseHyphen } from "~~/utils/formkit"

const props = defineProps({
  token: Object as PropType<Tokens>,
  isNew: Boolean,
})
const emits = defineEmits(["save", "cancel", "delete"])

const { copy, copied } = useClipboard()

const isConfirmDeleting = ref(false)
const confirmDelete = () => {
  emits("delete")
  isConfirmDeleting.value = false
}
</script>

<template>
  <Toggle v-bind="$attrs" class="mb-4">
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
          :plugins="[castLowercaseHyphen]"
        />
        <FormKit type="submit" name="Save" @click="emits('save')" />
      </div>

      <div class="mt-1 mx-1 flex justify-between items-center">
        <button class="btn-secondary text-sm" @click="copy(token.id)">
          <div class="i-uil-clipboard text-base mr-2"></div>
          Copy token
        </button>

        <button
          class="text-sm inline-flex text-red-500 hover:underline underline-offset-2"
          @click="isConfirmDeleting = true"
        >
          Delete Token
        </button>
      </div>
    </div>

    <Modal v-model:open="isConfirmDeleting">
      <template #header>Delete</template>
      <p class="text-gray-800 mb-6">Are you sure you want to delete the token? This action cannot be undone.</p>

      <template #footer="{ cancel }">
        <button class="btn-secondary bg-gray-50" @click="cancel">Cancel</button>
        <button class="btn-danger" @click="confirmDelete">Delete</button>
      </template>
    </Modal>
  </Toggle>
</template>
