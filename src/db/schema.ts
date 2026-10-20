
import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),

  email: varchar("email", { length: 320 })
    .notNull()
    .unique(),

  passwordHash: text("password_hash")
    .notNull(),

  displayName: varchar("display_name", { length: 100 }),

  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "date"
  })
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at", {
    withTimezone: true,
    mode: "date"
  })
    .defaultNow()
    .notNull()
});
