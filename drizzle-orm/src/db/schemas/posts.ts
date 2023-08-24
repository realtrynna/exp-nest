import { pgTable, serial, integer, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { users, comments } from "src/db/schemas/loader";

export const posts = pgTable("posts", {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 255 }),
    authorId: integer("author_id").references(() => users.id),
});

export const postsRelations = relations(posts, ({ one, many }) => ({
    author: one(users, {
        fields: [posts.authorId],
        references: [users.id],
    }),
    comments: many(comments),
}));