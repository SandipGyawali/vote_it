import Redis from "ioredis";
import { env } from "@/lib/env";

const redisClient = new Redis({
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,
});

redisClient.on("connect", () => {
  console.log(`Redis client connection on ${env.REDIS_HOST}:${env.REDIS_PORT}`);
});

redisClient.on("error", (err: any) => {
  console.error("Redis error:", err);
});

export { redisClient };
