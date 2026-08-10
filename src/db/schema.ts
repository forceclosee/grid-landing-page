import { pgTable, varchar, real } from "drizzle-orm/pg-core";

export const stats = pgTable("stats", {
	stat: real("stat").notNull(),
	name: varchar("name", { length: 30 }).notNull(),
	description: varchar("description", { length: 80 }).notNull(),
});
