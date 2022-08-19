import { serverSupabaseServiceRole } from "#supabase/server"
import { Users } from "~~/utils/interface"

export default defineEventHandler(async (event) => {
  const { user, subscription } = await useBody(event)
  const client = serverSupabaseServiceRole(event)

  const { data } = await client
    .from<Users>("users")
    .update({
      sub: subscription,
    })
    .eq("id", user.id)

  return {
    data,
  }
})
