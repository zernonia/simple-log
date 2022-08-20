import { serverSupabaseServiceRole } from "#supabase/server"
import { sendNotification } from "~~/utils/functions"
import { Users } from "~~/utils/interface"

export default defineEventHandler(async (event) => {
  const payload = await useBody(event)
  const client = serverSupabaseServiceRole(event)

  try {
    //@ts-ignore
    const { data, error } = await client
      .from<Users>("users")
      .select("id, vapid!user_id(subscription)")
      .eq("id", payload.record.owner_id)
      .single()

    if (data.vapid?.length) {
      const subscriptions = data.vapid.map((i) => i.subscription)
      const result = await sendNotification(subscriptions, payload.record)
      return {
        result,
      }
    } else {
      return "no notification yet"
    }
  } catch (err) {
    sendError(event, err, true)
  }
})
