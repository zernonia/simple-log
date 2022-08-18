import { serverSupabaseServiceRole } from "#supabase/server"
import { Tokens } from "~~/utils/interface"
import { redis } from "~~/utils/redis"

export default defineEventHandler(async (event) => {
  try {
    const { payload } = await useBody(event)
    const client = serverSupabaseServiceRole(event)

    const { data } = await client.from<Tokens>("tokens").delete().eq("id", payload.id).single()

    const redisResponse = await redis.del(`token-${data.id}`)

    return {
      payload,
      redisResponse,
    }
  } catch (err) {
    sendError(event, err, true)
  }
})
