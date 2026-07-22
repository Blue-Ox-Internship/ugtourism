import { pgTable, serial, integer, text, timestamp, unique } from "drizzle-orm/pg-core";
import { usersTable } from "./users";

export const cardScansTable = pgTable(
  "card_scans",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id")
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    cardId: text("card_id").notNull(),
    cardType: text("card_type").notNull(),
    region: text("region").notNull(),
    scannedAt: timestamp("scanned_at").defaultNow().notNull(),
  },
  (t) => [unique().on(t.userId, t.cardId)],
);

export type CardScan = typeof cardScansTable.$inferSelect;
export type NewCardScan = typeof cardScansTable.$inferInsert;
