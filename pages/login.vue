<script setup lang="ts">
const client = useSupabaseClient()
const user = useSupabaseUser()

const isLoading = ref(false)
const signIn = async () => {
  isLoading.value = true
  await client.auth.signIn({ provider: "github" }, { redirectTo: window.location.href })
}

watch(
  user,
  (n) => {
    if (n?.id) navigateTo("/app/")
  },
  { immediate: true }
)
</script>

<template>
  <div class="flex flex-col items-center mt-20">
    <h2 class="text-5xl font-extrabold">Login</h2>

    <ButtonLoader :loading="isLoading" class="btn-primary mt-8" @click="signIn">
      <div class="i-uil-github mr-2 text-xl"></div>
      Login with GitHub
    </ButtonLoader>
  </div>
</template>
