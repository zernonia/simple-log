<script setup lang="ts">
const user = useUser()
const supabaseUser = useSupabaseUser()
</script>

<template>
  <ContentLayout show-nav-button>
    <template #header>Profile</template>

    <div class="px-3 mt-4 md:mt-12 mx-auto max-w-120 w-full" v-if="user">
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
