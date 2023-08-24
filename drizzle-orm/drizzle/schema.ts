import { pgTable, foreignKey, serial, varchar, integer, boolean, jsonb, primaryKey } from "drizzle-orm/pg-core"

import { sql } from "drizzle-orm"


export const posts = pgTable("posts", {
	id: serial("id").primaryKey().notNull(),
	title: varchar("title", { length: 255 }),
	authorId: integer("author_id").references(() => users.id),
});

export const users = pgTable("users", {
	id: serial("id").primaryKey().notNull(),
	email: varchar("email", { length: 255 }).notNull(),
});

export const comments = pgTable("comments", {
	id: serial("id").primaryKey().notNull(),
	comment: varchar("comment").notNull(),
	authorId: integer("author_id").references(() => users.id),
	postId: integer("post_id").references(() => posts.id),
});

export const profile = pgTable("profile", {
	gender: boolean("gender").notNull(),
	userId: integer("user_id").references(() => users.id),
	metadata: jsonb("metadata"),
});

export const groups = pgTable("groups", {
	id: serial("id").primaryKey().notNull(),
	title: varchar("title", { length: 32 }).notNull(),
});

export const usersToGroups = pgTable("users_to_groups", {
	userId: integer("user_id").notNull().references(() => users.id),
	groupId: integer("group_id").notNull().references(() => groups.id),
},
(table) => {
	return {
		usersToGroupsUserIdGroupId: primaryKey(table.userId, table.groupId)
	}
});