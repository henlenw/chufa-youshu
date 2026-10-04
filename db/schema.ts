// Intentionally empty by default.
// Add Drizzle tables here when the site actually needs a database.
// See examples/d1/db/schema.ts for an opt-in example.
import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core";
export const settings=sqliteTable("settings",{key:text("key").primaryKey(),value:text("value").notNull()});
export const codes=sqliteTable("codes",{code:text("code").primaryKey(),tier:text("tier").notNull().default("full"),enabled:integer("enabled").notNull().default(1),uses:integer("uses").notNull().default(0),created:integer("created").notNull(),lastUsed:integer("last_used")});
export const sessions=sqliteTable("sessions",{hash:text("hash").primaryKey(),kind:text("kind").notNull(),code:text("code"),expires:integer("expires").notNull()},t=>[index("sessions_code_idx").on(t.code),index("sessions_expiry_idx").on(t.expires)]);
export const metrics=sqliteTable("metrics",{key:text("key").primaryKey(),value:integer("value").notNull().default(0)});
export const attempts=sqliteTable("attempts",{key:text("key").primaryKey(),count:integer("count").notNull().default(0),until:integer("until").notNull()});
