import "dotenv/config";
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

function parseNumber(value: string | undefined): number | undefined {
  if (value == undefined) return undefined;
  const parsedValue = parseInt(value);

  return isNaN(parsedValue) ? undefined : parsedValue;
}

export const env = createEnv({
  server: {
    DATABASE_URL: z
      .string()
      .url()
      .min(1, { message: "Postgres database url is not mentioned in .env" }),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    PORT: z
      .number({ required_error: "port must be mentioned" })
      .or(z.string().transform(parseNumber)),
    REDIS_HOST: z.string().min(1, { message: "host should be mentioned" }),
    REDIS_PORT: z
      .number({ required_error: "redis port must be defined" })
      .or(z.string().transform(parseNumber)),
    POLL_DURATION: z
      .number({ required_error: "poll duration is not mentioned" })
      .or(z.string().transform(parseNumber)),
  },
  // clientPrefix: "PUBLIC_",
  // client: {},
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: process.env.REDIS_PORT,
    POLL_DURATION: process.env.POLL_DURATION,
  },
});
