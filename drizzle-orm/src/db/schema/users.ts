import { pgTable, serial, integer, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { profile, posts } from "src/db/schema/loader";

export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    email: varchar("email", { length: 255 }).notNull(),
});

export const profileOneToOneRelation = relations(users, ( { one } ) => ({
    profile: one(profile, {
        fields: [users.id],
        references: [profile.userId],
    })
}));

export const postsOneToManyRelation = relations(users, ({ many }) => ({
    posts: many(posts),
}));

export type User = typeof users.$inferSelect;