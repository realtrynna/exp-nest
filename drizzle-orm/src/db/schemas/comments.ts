import { pgTable, serial, integer, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { users, posts } from "src/db/schemas/loader";

export const comments = pgTable("comments", {
    id: serial("id").primaryKey(),
    comment: varchar("comment").notNull(),
    authorId: integer("author_id").references(() => users.id),
    postId: integer("post_id").references(() => posts.id),
});

export const commentsRelations = relations(comments, ({ one }) => ({
    user: one(users, {
        fields: [comments.id],
        references: [users.id]
    }),
    post: one(posts, {
        fields: [comments.id],
        references: [posts.id],
    }),
}));



