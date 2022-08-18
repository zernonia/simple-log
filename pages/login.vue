<script setup lang="ts">
const client = useSupabaseClient()
const user = useSupabaseUser()

const signIn = async () => {
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

    <button class="btn-primary mt-8" @click="signIn">
      <div class="i-uil-github mr-2 text-xl"></div>
      Login with GitHub
    </button>
  </div>
</template>
