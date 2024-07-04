import "dotenv/config";
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z
      .string()
      .url()
      .min(1, { message: "Postgres database url is not mentioned in .env" }),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    PORT: z.number().min(1, { message: "Port must be mentioned" }),
  },
  // clientPrefix: "PUBLIC_",
  // client: {},
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
  },
});
