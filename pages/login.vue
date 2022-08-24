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

const { hash } = toRefs(useRoute())
watch(
  hash,
  (n) => {
    if (n)
      nextTick(() => {
        isLoading.value = true
      })
  },
  { immediate: true }
)
</script>

<template>
  <div class="flex flex-col items-center mt-20">
    <h2 class="text-5xl font-extrabold">Login</h2>
    {{ isLoading }}

    <ButtonLoader :loading="isLoading" class="btn-primary mt-8" @click="signIn">
      <div class="i-uil-github mr-2 text-xl"></div>
      Login with GitHub
    </ButtonLoader>

    <p class="max-w-64 text-center text-gray-400 text-sm mt-8">
      If you sign in here, I will receive notification in SimpleLog 😉
    </p>
  </div>
</template>
