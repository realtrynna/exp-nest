import { pgTable, serial, integer, varchar, primaryKey } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { users, groups } from "src/db/schemas/loader";

export const usersToGroups = pgTable("users_to_groups", {
    userId: integer("user_id").references(() => users.id),
    groupId: integer("group_id").references(() => groups.id),
}, (t) => ({
    pk: primaryKey(t.userId, t.groupId),
}));

export const usersToGroupsRelations = relations(usersToGroups, ({ one }) => ({
    user: one(users, {
        fields: [usersToGroups.userId],
        references: [users.id],
    }),
    group: one(groups, {
        fields: [usersToGroups.groupId],
        references: [groups.id],
    }),
}));

