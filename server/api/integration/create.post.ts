import { serverSupabaseServiceRole } from "#supabase/server"
import { Integrations, Tokens } from "~~/utils/interface"
import { redis } from "~~/utils/redis"

export default defineEventHandler(async (event) => {
  try {
    const { payload } = await useBody(event)
    const client = serverSupabaseServiceRole(event)

    const { data, error } = await client.from<Integrations>("integrations").upsert(payload).single()
    if (error) throw error
    const redisResponse = await redis.set(`integrations-${data.id}`, JSON.stringify(payload))
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
