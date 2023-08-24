import { pgTable, serial, integer, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { type InferInsertModel } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

import { profile, posts, comments, usersToGroups } from "src/db/schemas/loader";

export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    email: varchar("email", { length: 255 })
});

export const usersRelations = relations(users, ({ one, many }) => ({
    profile: one(profile, {
        fields: [users.id],
        references: [profile.userId],
    }),
    posts: many(posts),
    comments: many(comments),
    usersToGroups: many(usersToGroups),
}))

export const insertUserSchema = createInsertSchema(users, {
    email: z.string().email(),
});

export type NewUser = typeof users.$inferInsert;
export type InsertUser = InferInsertModel<typeof users>;