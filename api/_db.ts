import { createClient } from "@libsql/client/web";
import { drizzle, LibSQLDatabase } from "drizzle-orm/libsql";

export interface Env {
  TURSO_AUTH_TOKEN?: string;
  TURSO_URL?: string;
}

export const buildDbClient = (env: Env): LibSQLDatabase => {
  const url = env.TURSO_URL?.trim();
  if (url === undefined) {
    throw new Error("TURSO_URL is not defined");
  }

  const authToken = env.TURSO_AUTH_TOKEN?.trim();
  if (authToken === undefined) {
    throw new Error("TURSO_AUTH_TOKEN is not defined");
  }

  return drizzle(createClient({ url, authToken }));
};
