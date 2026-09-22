import { NextRequest, NextResponse } from "next/server";
import {
  verifyToken,
  isAdminEmail,
  createSessionToken,
  sessionCookieName,
  sessionCookieMaxAge,
} from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  if (!token) {
    return NextResponse.redirect(new URL("/admin/login?e=missing", req.url));
  }
  const payload = verifyToken(token, "magic");
  if (!payload || !isAdminEmail(payload.sub)) {
    return NextResponse.redirect(new URL("/admin/login?e=invalid", req.url));
  }
  const session = createSessionToken(payload.sub);
  const res = NextResponse.redirect(new URL("/admin", req.url));
  res.cookies.set({
    name: sessionCookieName(),
    value: session,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: sessionCookieMaxAge(),
  });
  return res;
}
