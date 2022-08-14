<script setup lang="ts">
const client = useSupabaseClient()

const signIn = async () => {
  await client.auth.signIn({ provider: "github" }, { redirectTo: window.location.href })
}
</script>

<template>
  <div>
    <h2>Login</h2>
    <button @click="signIn">Login with GitHub</button>
  </div>
</template>
