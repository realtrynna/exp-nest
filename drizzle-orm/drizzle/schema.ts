import { pgTable, uuid, text, varchar, bigint, primaryKey, integer } from "drizzle-orm/pg-core"

import { sql } from "drizzle-orm"


export const soft = pgTable("soft", {
	uploadTextbookMetaId: uuid("uploadTextbookMetaId"),
	activityName: text("activityName"),
	age: text("age"),
	type: text("type"),
	isUsed: text("isUsed"),
	month: text("month"),
	week: text("week"),
	videoCallCount: varchar("videoCallCount"),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	total: bigint("total", { mode: "number" }),
});

export const tblUploadTextbookFileDefault = pgTable("tbl_upload_textbook_file_default", {
	uploadDefaultId: integer("upload_default_id").notNull(),
	fileType: text("file_type"),
	fileName: text("file_name").notNull(),
	ext: text("ext"),
	path: text("path"),
	size: integer("size"),
},
(table) => {
	return {
		tblUploadTextbookFileDefaultPkey: primaryKey(table.uploadDefaultId, table.fileName)
	}
});