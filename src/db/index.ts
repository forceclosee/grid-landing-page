import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

const databaseUrl: string =
	import.meta.env?.DATABASE_URL ?? process.env.DATABASE_URL;

const sql = neon(databaseUrl);

export const db = drizzle({ client: sql });
