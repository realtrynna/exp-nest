import { pgTable, serial, integer, varchar, boolean, jsonb } from "drizzle-orm/pg-core";
import { InferInsertModel, relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

import { users } from "src/db/schemas/loader";

export const profile = pgTable("profile", {
    gender: boolean("gender").notNull(),
    userId: integer("user_id").references(() => users.id),
    metadata: jsonb("metadata"),
});

export type InsertProfile = InferInsertModel<typeof profile>;

export const insertProfileSchema = createInsertSchema(profile, {
    gender: z.boolean()
});