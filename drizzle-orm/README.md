https://orm.drizzle.team/

```cmd
npm i pg drizzle-orm zod drizzle-zod zod-error
npm i -D drizzle-kit @types/pg
```

## drizzle-kit(CLI)
- generate
```cmd
drizzle-kit generate:pg
```
- pull
```cmd
drizzle-kit introspect:pg
```
- push
```cmd
drizzle-kit push:pg
```
- 기존 마이그레이션 파일 삭제
```cmd
drizzle-kit drop
```
- Db와 ORM 동기화 여부 체크
```cmd
drizzle-kit check:pg
```

<br>

## Relation
1.One-to-one(사용자와 프로필)

```typescript
// schemas/users.ts
import { pgTable, serial, text, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { relations } from 'drizzle-orm';

import { profile } from "schemas/profile.ts"

export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    email: varchar("email", { length: 255 }).notNull(),
    password: varchar("password").notNull(),
});

export const usersToProfileOneToOne = relations(users, ({ one }) => ({
    profile: one(profile, {
        fields: [users.id],
        references: [profile.userId]
    })
}));

// schemas/profile.ts
import { users } from "schemas/users.ts"

export const profile = pgTable("profile", {
    id: serial("id").primaryKey(),
    userId: integer("user_id").references(() => users.id),
    metadata: jsonb("metadata"),
})
```

<br>

2.One-to-many(채팅방과 채팅)

```typescript
// schemas/users.ts
import { relations } from "drizzle-orm";

import { chats } from "schemas/chats.ts"
import { integer } from "drizzle-orm/pg-core";

export const rooms = pgTable("rooms", {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    private: boolean("private").notNull(),
})

export const roomsToChatsOneToMany = relations(rooms, ({ many }) => ({
    chats: many(chats)
}))

// schemas/chats.ts
import { rooms } from "schemas/rooms.ts";

export const chats = pgTable("chats", {
    id: serial("id").primaryKey(),
    content: varchar("content", { lenth: 255 }).notNull(),
    roomId: integer("room_id").notNull(),
})

export const chatsToRoomsManyToOne = relations(chats, ({ one }) => ({
    room: one(rooms, {
        fields: [chats.roomId],
        references: [rooms.id]
    })
}))
```

3.Many-to-many(사용자와 그룹)
- users.ts
```typescript
import { usersToGroups } from "schemas/users-to-groups.ts";

export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    email: varchar("email").notNull(),
    password: varchar("password").notNull(),
});

const usersRelations = relations(users, ({ many }) => ({
    usersToGroups: many(usersToGroups),
}));
```

- groups.ts
```typescript
import { usersToGroups } from "schemas/users-to-groups.ts";

export const groups = pgTable("groups", {
    id: serial("id").primaryKey(),
    title: text("title"),
});

export const groupsRelations = relations(groups, ({ many }) => ({
    usersToGroups: many(usersToGroups),
}));
```

- users-to-groups.ts
```typescript
import { primaryKey } from "drizzle-orm/pg-core";
import { users, groups } from "schemas/loader.ts";

export const usersToGroups = pgTable("users_to_groups", {
    userId: interger("user_id").notNull().references(() => users.id),
    groupId: integer("group_id").notNull().references(() => groups.id),
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
}))
```

<br>

### Foreign key
식별 관계와 비 식별 관계 설정이 가능하다. <br>
컬럼 작성 시 외래 키 컬럼에 명시적으로 references 메서드를 사용해 부모 키를 넣어주면 식별 관계, 그렇지 않으면 비 식별 관계

- 식별 관계
```typescript
import { users } from "schemas/users.ts";

export const posts = pgTable("posts", {
    id: serial("id").primaryKey(),
    title: varchar("title"),
    userId: integer("user_id").references(() => users.id)
})
```

- 비 식별
```typescript
import { users } from "schemas/users.ts";

export const posts = pgTable("posts", {
id: serial("id").primaryKey(),
title: varchar("title"),
userId: integer("user_id")
})
```








