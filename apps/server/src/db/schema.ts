/**
 * @Note add sql schema here..
 */
import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

// sample schema for testing
export const UserTable = pgTable("user", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
});
