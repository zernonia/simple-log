<script setup lang="ts">
const user = useSupabaseUser()
const runtime = useRuntimeConfig()

const urlB64ToUint8Array = (base64String: string) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/")
  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}
onMounted(() => {
  getSubscription()
})

const isUserSubscribed = ref(false)
const getSubscription = async () => {
  const registration = await navigator.serviceWorker.getRegistration()
  const subscription = await registration.pushManager.getSubscription()
  if (subscription) isUserSubscribed.value = true
}

const subscribe = async () => {
  const registration = await navigator.serviceWorker.getRegistration()
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlB64ToUint8Array(runtime.public.VAPID_PUBLIC_KEY),
  })
  const result = await $fetch("/api/notify/create", {
    method: "POST",
    body: {
      subscription,
      user: user.value,
    },
  })
}
</script>

<template>
  <ContentLayout show-nav-button>
    <template #header>Notifcation</template>

    <div class="p-4 mt-6 mx-auto w-120" v-if="user">
      <div class="flex flex-col">
        user is subscribe: {{ isUserSubscribed }}
        <button class="btn-primary" @click="subscribe">Notify</button>
      </div>
    </div>
  </ContentLayout>
</template>
