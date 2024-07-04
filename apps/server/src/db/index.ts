import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { env } from "@/lib/env";
import * as schema from "@/db/schema";

/**
 * cache the database connection in development
 */
const globalForDb = globalThis as unknown as {
  conn: Pool | undefined;
};

const conn =
  globalForDb.conn ?? new Pool({ connectionString: env.DATABASE_URL, max: 1 });
if (env.NODE_ENV !== "production") globalForDb.conn = conn;

export const db: any = drizzle(conn, { schema, logger: true });
