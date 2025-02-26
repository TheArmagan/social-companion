import { createClient, RedisClientType } from "redis"

export const redis: RedisClientType = createClient({
  url: process.env.REDIS_URL,
  database: parseInt(process.env.REDIS_DB || "0"),
  password: process.env.REDIS_PASSWORD,
});