import { serverSupabaseServiceRole } from "#supabase/server"
import { Integrations, Tokens } from "~~/utils/interface"
import { redis } from "~~/utils/redis"

export default defineEventHandler(async (event) => {
  try {
    const { payload } = await useBody(event)
    const client = serverSupabaseServiceRole(event)

    const { data, error } = await client.from<Integrations>("integrations").delete().eq("id", payload.id).single()
    if (error) throw error
    const redisResponse = await redis.del(`integrations-${data.id}`)

    return {
      payload,
      redisResponse,
    }
  } catch (err) {
    sendError(event, err, true)
  }
})
