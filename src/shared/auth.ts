import { cookies } from "next/headers";
import crypto from "crypto";

const COOKIE_NAME = "admin_session";
const SESSION_DURATION_MS = 8 * 60 * 60 * 1000; // 8 hours

export function verifyPassword(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;

  const inputBuf = Buffer.from(input);
  const expectedBuf = Buffer.from(expected);

  if (inputBuf.length !== expectedBuf.length) return false;
  return crypto.timingSafeEqual(inputBuf, expectedBuf);
}

export async function setAdminSession(): Promise<void> {
  const store = await cookies();
  store.set(COOKIE_NAME, "1", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_DURATION_MS / 1000,
    path: "/",
  });
}

export async function isAdminLoggedIn(): Promise<boolean> {
  const store = await cookies();
  return store.get(COOKIE_NAME)?.value === "1";
}

export async function clearAdminSession(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}
