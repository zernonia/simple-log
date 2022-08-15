import Redis from "ioredis"

const { REDIS_HOST, REDIS_PORT, REDIS_USERNAME, REDIS_PASSWORD } = useRuntimeConfig()
export const redis = new Redis({
  host: REDIS_HOST,
  port: +REDIS_PORT,
  username: REDIS_USERNAME,
  password: REDIS_PASSWORD,
})
