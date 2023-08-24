import { pgTable, serial, integer, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { usersToGroups } from "src/db/schemas/loader";

export const groups = pgTable("groups", {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 32 }).notNull(),
});

export const groupsRelations = relations(groups, ({ many }) => ({
    usersToGroups: many(usersToGroups),
}));