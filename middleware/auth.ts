export default defineNuxtRouteMiddleware((to, from) => {
  const user = useSupabaseUser()
  console.log(user.value)
  if (!user.value) {
    return navigateTo("/login")
  }
})
