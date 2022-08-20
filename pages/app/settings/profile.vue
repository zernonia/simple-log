<script setup lang="ts">
const user = useUser()
const supabaseUser = useSupabaseUser()
</script>

<template>
  <ContentLayout show-nav-button>
    <template #header>Profile</template>

    <div class="p-4 mt-6 mx-auto w-120" v-if="user">
      <img :src="user.avatar_url" :alt="user.full_name" class="w-32 h-32 rounded-full" />

      <div class="mt-6">
        <FormKit type="form" :actions="false">
          <FormKit disabled type="text" label="Username" v-model="user.full_name"></FormKit>
          <FormKit disabled type="email" label="Email" v-model="supabaseUser.email"></FormKit>
        </FormKit>
      </div>
    </div>
  </ContentLayout>
</template>
