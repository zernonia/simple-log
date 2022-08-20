import { serverSupabaseServiceRole } from "#supabase/server"
import { redis } from "~~/utils/redis"
import type { Integrations, Vapid, Events } from "~~/utils/interface"
import type { SupabasePayload } from "~~/utils/types/supabase"
import { sendNotification } from "~~/utils/functions/sendNotification"
import { convertJSONToString } from "~~/utils/functions/convertJSONToString"

export default defineEventHandler(async (event) => {
  try {
    const { tokenId } = getRouterParams(event)
    const payload = await useBody<SupabasePayload>(event)
    const tokenData = JSON.parse(await redis.get(`integrations-${tokenId}`)) as Integrations

    const mapType = (payload: SupabasePayload) => {
      switch (payload.type) {
        case "INSERT": {
          return {
            name: "New",
            icon: "✨",
            description: "**New**\n" + convertJSONToString(JSON.stringify(payload.record)),
          }
        }
        case "UPDATE": {
          const getDifference = (a: any, b: any) =>
            Object.fromEntries(Object.entries(b).filter(([key, val]) => key in a && a[key] !== val))

          return {
            name: "Updated",
            icon: "💫",
            description:
              "**Updated**\n" + convertJSONToString(JSON.stringify(getDifference(payload.old_record, payload.record))),
          }
        }
        case "DELETE": {
          return {
            name: "Deleted",
            icon: "🗑",
            description: "**Deleted**\n" + convertJSONToString(JSON.stringify(payload.old_record)),
          }
        }
      }
    }

    const client = serverSupabaseServiceRole(event)

    const [{ data, error }, { data: vapidData }] = await Promise.all([
      client.rpc("log_event", {
        input_owner_id: tokenData.owner_id,
        input_project: tokenData.project_name,
        input_channel: tokenData.channel_name,
        input_name: `${mapType(payload).name} record on ${payload.table}`,
        input_description: mapType(payload).description,
        input_icon: mapType(payload).icon,
        input_notify: false,
        input_integration: "supabase",
      }),
      client.from<Vapid>("vapid").select("subscription").eq("user_id", tokenData.owner_id),
    ])

    if (vapidData?.length) {
      const subscriptions = vapidData.map((i) => i.subscription)
      const ids = await sendNotification(subscriptions, data as unknown as Events)
      console.log({ data, vapidData, ids })
    }

    return { data, error }
  } catch (err) {
    sendError(event, err, true)
  }
})
