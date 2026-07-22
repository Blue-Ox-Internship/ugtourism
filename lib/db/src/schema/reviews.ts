import { pgTable, serial, integer, text, timestamp } from "drizzle-orm/pg-core";
import { usersTable } from "./users";

export const reviewsTable = pgTable("reviews", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  targetType: text("target_type").notNull(), // 'destination' | 'partner' | 'general'
  targetId: text("target_id"),
  rating: integer("rating"),
  body: text("body").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Review = typeof reviewsTable.$inferSelect;
export type NewReview = typeof reviewsTable.$inferInsert;
