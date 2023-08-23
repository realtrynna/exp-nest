import { pgTable, serial, integer, varchar, boolean, jsonb } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { users } from "src/db/schema/loader";

export const profile = pgTable("profile", {
    gender: boolean("gender").notNull(),
    userId: integer("user_id").references(() => users.id),
    metadata: jsonb("metadata"),
});