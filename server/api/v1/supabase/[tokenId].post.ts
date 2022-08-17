import { serverSupabaseServiceRole } from "#supabase/server"
import { redis } from "~~/utils/redis"
import type { Integrations } from "~~/utils/interface"
import type { SupabasePayload } from "~~/utils/types/supabase"

export default defineEventHandler(async (event) => {
  try {
    const { tokenId } = getRouterParams(event)
    const payload = await useBody<SupabasePayload>(event)
    const tokenData = JSON.parse(await redis.get(`integrations-${tokenId}`)) as Integrations

    const mapType = (payload: SupabasePayload) => {
      switch (payload.type) {
        case "INSERT": {
          return { name: "New", icon: "✨", description: JSON.stringify({ new: payload.record }) }
        }
        case "UPDATE": {
          const getDifference = (a: any, b: any) =>
            Object.fromEntries(Object.entries(b).filter(([key, val]) => key in a && a[key] !== val))

          return {
            name: "Updated",
            icon: "💫",
            description: JSON.stringify({ update: getDifference(payload.old_record, payload.record) }),
          }
        }
        case "DELETE": {
          return { name: "Deleted", icon: "🗑", description: JSON.stringify({ old: payload.old_record }) }
        }
      }
    }

    const client = serverSupabaseServiceRole(event)
    const { data, error } = await client.rpc("log_event", {
      input_owner_id: tokenData.owner_id,
      input_project: tokenData.project_name,
      input_channel: tokenData.channel_name,
      input_name: `${mapType(payload).name} record on ${payload.table}`,
      input_description: mapType(payload).description,
      input_icon: mapType(payload).icon,
      input_notify: false,
      input_integration: "supabase",
    })

    return { data, error }
  } catch (err) {
    sendError(event, err, true)
  }
})
