import { serverSupabaseServiceRole, serverSupabaseUser } from "#supabase/server"
import { redis } from "~~/utils/redis"
import type { Integrations } from "~~/utils/interface"
import type { SupabasePayload } from "~~/utils/types/supabase"

export default defineEventHandler(async (event) => {
  try {
    const { tokenId } = getRouterParams(event)
    const { payload } = await useBody<{
      payload: SupabasePayload
    }>(event)

    // const tokenId = headers.authorization.split("Bearer")[1].trim()
    const tokenData = JSON.parse(await redis.get(`integrations-${tokenId}`)) as Integrations

    const mapType = (type: SupabasePayload["type"]) => {
      switch (type) {
        case "INSERT": {
          return { name: "New", icon: "✨" }
        }
        case "UPDATE": {
          return { name: "Updated", icon: "💫" }
        }
        case "DELETE": {
          return { name: "Deleted", icon: "🗑" }
        }
      }
    }

    const client = serverSupabaseServiceRole(event)
    const { data, error } = await client.rpc("log_event", {
      input_owner_id: tokenData.owner_id,
      input_project: tokenData.project_id,
      input_channel: tokenData.channel_name,
      input_name: `${mapType(payload.type).name} record on ${payload.table}`,
      input_description: JSON.stringify({ new: payload.record, old: payload.old_record }),
      input_icon: mapType(payload.type).icon,
      input_notify: false,
      input_integration: "supabase",
    })

    return { data, error }
  } catch (err) {
    sendError(event, err, true)
  }
})
