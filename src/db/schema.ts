
import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  index,
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

export const refreshSessions = pgTable("refresh_sessions",
  {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  tokenHash: text("token_hash").notNull().unique(),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date"
  }).notNull(),
  revokedAt: timestamp("revoked_at", {
    withTimezone: true,
    mode: "date"
  }),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "date" })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("refresh_sessions_user_id_idx").on(table.userId),
  ],
);
