import { serverSupabaseServiceRole } from "#supabase/server"
import { Tokens } from "~~/utils/interface"
import { redis } from "~~/utils/redis"

export default defineEventHandler(async (event) => {
  try {
    const { payload } = await useBody(event)
    const client = serverSupabaseServiceRole(event)

    const { data } = await client.from<Tokens>("tokens").upsert(payload).single()

    const redisResponse = await redis.set(data.id, JSON.stringify(payload))
    const redisGet = await redis.get(data.id)

    return {
      payload,
      redisResponse,
      redisGet,
    }
  } catch (err) {
    sendError(event, err, true)
  }
})
