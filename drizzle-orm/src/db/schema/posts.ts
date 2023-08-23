import { pgTable, serial, integer, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { users } from "src/db/schema/loader";

export const posts = pgTable("posts", {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 255 }),
    authorId: integer("author_id"),
});

export const usersRelation = relations(posts, ({ one }) => ({
    author: one(users, {
        fields: [posts.authorId],
        references: [users.id],
    })
}));