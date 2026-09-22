import crypto from "crypto";
import { cookies } from "next/headers";

// Single-admin auth. Magic-link flow:
//   1. POST /api/admin/auth/login { email }  -> if email matches ADMIN_EMAIL,
//      a signed token is emailed as a /api/admin/auth/callback?token=... link.
//   2. GET /api/admin/auth/callback verifies token (15-min TTL), sets
//      `piwp_admin` cookie (HS256 signed, 7-day TTL).
//   3. Middleware + API routes check `requireAdmin(req)`.
//
// All signing uses a single HS256-style HMAC with ADMIN_SESSION_SECRET.

const SESSION_COOKIE = "piwp_admin";
const SESSION_TTL_SEC = 7 * 24 * 60 * 60;       // 7 days
const MAGIC_LINK_TTL_SEC = 15 * 60;             // 15 minutes

function secret(): Buffer {
  const s = process.env.ADMIN_SESSION_SECRET || "";
  if (!s && process.env.NODE_ENV === "production") {
    throw new Error("ADMIN_SESSION_SECRET is required in production");
  }
  return Buffer.from(s || "dev-admin-secret-change-me", "utf8");
}

function b64u(input: Buffer | string): string {
  const buf = typeof input === "string" ? Buffer.from(input, "utf8") : input;
  return buf.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function b64uDecode(input: string): Buffer {
  const pad = input.length % 4 === 0 ? "" : "=".repeat(4 - (input.length % 4));
  return Buffer.from(input.replace(/-/g, "+").replace(/_/g, "/") + pad, "base64");
}

function hmac(data: string): string {
  return b64u(crypto.createHmac("sha256", secret()).update(data).digest());
}

interface TokenPayload {
  sub: string;     // email
  exp: number;     // unix seconds
  iat: number;
  purpose: "magic" | "session";
  nonce?: string;
}

export function signToken(payload: TokenPayload): string {
  const body = b64u(JSON.stringify(payload));
  const sig = hmac(body);
  return `${body}.${sig}`;
}

export function verifyToken(token: string, purpose: TokenPayload["purpose"]): TokenPayload | null {
  if (!token || typeof token !== "string") return null;
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  const expected = hmac(body);
  if (sig.length !== expected.length) return null;
  try {
    if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null;
  } catch {
    return null;
  }
  let payload: TokenPayload;
  try {
    payload = JSON.parse(b64uDecode(body).toString("utf8")) as TokenPayload;
  } catch {
    return null;
  }
  if (payload.purpose !== purpose) return null;
  if (typeof payload.exp !== "number" || payload.exp < Math.floor(Date.now() / 1000)) return null;
  return payload;
}

export function adminEmail(): string {
  return (process.env.ADMIN_EMAIL || "").toLowerCase().trim();
}

export function isAdminEmail(email: string): boolean {
  const admin = adminEmail();
  if (!admin) return false;
  return email.toLowerCase().trim() === admin;
}

export function createMagicLinkToken(email: string): string {
  const now = Math.floor(Date.now() / 1000);
  return signToken({
    sub: email.toLowerCase(),
    iat: now,
    exp: now + MAGIC_LINK_TTL_SEC,
    purpose: "magic",
    nonce: crypto.randomBytes(8).toString("hex"),
  });
}

export function createSessionToken(email: string): string {
  const now = Math.floor(Date.now() / 1000);
  return signToken({
    sub: email.toLowerCase(),
    iat: now,
    exp: now + SESSION_TTL_SEC,
    purpose: "session",
  });
}

export function sessionCookieName(): string {
  return SESSION_COOKIE;
}

export function sessionCookieMaxAge(): number {
  return SESSION_TTL_SEC;
}

// Server-component / API route helper.
export async function getAdminFromCookies(): Promise<TokenPayload | null> {
  const cookieStore = await cookies();
  const c = cookieStore.get(SESSION_COOKIE)?.value;
  if (!c) return null;
  const t = verifyToken(c, "session");
  if (!t) return null;
  if (!isAdminEmail(t.sub)) return null;
  return t;
}

// Throws a NextResponse-friendly error if the caller isn't admin. Use in
// API route handlers. Returns the admin email on success.
export async function assertAdmin(): Promise<string> {
  const t = await getAdminFromCookies();
  if (!t) throw new Error("UNAUTHORIZED");
  return t.sub;
}
