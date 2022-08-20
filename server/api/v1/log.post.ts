import { serverSupabaseServiceRole, serverSupabaseUser } from "#supabase/server"
import { redis } from "~~/utils/redis"
import type { Events, Tokens, Vapid } from "~~/utils/interface"
import { sendNotification } from "~~/utils/functions"

export default defineEventHandler(async (event) => {
  try {
    const { headers } = event.req
    const { payload } = await useBody<{
      payload: { project: string; channel: string; event: string; description: string; icon: string; notify: boolean }
    }>(event)

    const tokenId = headers.authorization.split("Bearer")[1].trim()
    const tokenData = JSON.parse(await redis.get(tokenId)) as Tokens

    const client = serverSupabaseServiceRole(event)
    const [{ data, error }, { data: vapidData }] = await Promise.all([
      client.rpc("log_event", {
        input_owner_id: tokenData.owner_id,
        input_project: payload.project,
        input_channel: payload.channel,
        input_name: payload.event,
        input_description: payload.description,
        input_icon: payload.icon,
        input_notify: payload.notify,
        input_integration: null,
      }),
      client.from<Vapid>("vapid").select("subscription").eq("user_id", tokenData.owner_id),
    ])

    if (payload.notify && vapidData?.length) {
      const subscriptions = vapidData.map((i) => i.subscription)
      const ids = await sendNotification(subscriptions, data as unknown as Events)
      console.log({ data, vapidData, ids })
    }

    return { data, error }
  } catch (err) {
    sendError(event, err, true)
  }
})
