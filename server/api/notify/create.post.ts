import { serverSupabaseServiceRole } from "#supabase/server"
import { Users, Vapid } from "~~/utils/interface"

export default defineEventHandler(async (event) => {
  const { user, subscription } = await useBody(event)
  const client = serverSupabaseServiceRole(event)

  const { data } = await client.from<Vapid>("vapid").upsert({
    user_id: user.id,
    subscription,
    auth: subscription.keys.auth,
  })

  return {
    data,
  }
})
