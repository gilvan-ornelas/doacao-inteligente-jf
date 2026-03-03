import { createClient as createWebClient } from "@libsql/client/web";
import { createClient as createLocalClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";

const url = process.env.TURSO_DATABASE_URL!;

// Use local client for file: URLs (dev), HTTP client for libsql:// URLs (Vercel serverless)
const client = url.startsWith("file:")
  ? createLocalClient({ url })
  : createWebClient({ url, authToken: process.env.TURSO_AUTH_TOKEN });

export const db = drizzle(client, { schema });
