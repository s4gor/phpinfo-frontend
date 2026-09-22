import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "@/lib/db";
import { adminEmail, isAdminEmail, createMagicLinkToken } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy");

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "10 m"),
});

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "127.0.0.1";
  const rl = await ratelimit.limit(`admin-login:${ip}`);
  if (!rl.success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let body: { email?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const email = (body.email || "").trim().toLowerCase();
  if (!email) {
    return NextResponse.json({ error: "Email required" }, { status: 400 });
  }

  // Generic response - never confirm whether the email matches admin.
  const ok = NextResponse.json({ ok: true });

  if (!isAdminEmail(email)) {
    // Constant-ish time pause to obscure the mismatch.
    await new Promise((r) => setTimeout(r, 200));
    return ok;
  }

  const origin =
    process.env.NEXT_PUBLIC_SITE_URL ||
    req.headers.get("origin") ||
    "https://exeebit.com";
  const token = createMagicLinkToken(email);
  const link = `${origin}/api/admin/auth/callback?token=${encodeURIComponent(token)}`;

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM || "phpinfo() WP <licenses@exeebit.com>",
      to: [adminEmail()],
      subject: "Sign in to phpinfo() WP admin",
      replyTo: "support@exeebit.com",
      html: magicLinkHtml(link),
    });
  } catch (err) {
    console.error("[admin-login] failed to send magic link", err);
    return NextResponse.json({ error: "Failed to send link" }, { status: 500 });
  }
  return ok;
}

function magicLinkHtml(link: string): string {
  return `
  <div style="font-family:system-ui,-apple-system,Segoe UI,Helvetica,Arial,sans-serif;max-width:520px;margin:0 auto;padding:24px;background:#161618;color:#d4d4d8;border-radius:12px">
    <h2 style="color:#fafafa;margin:0 0 12px">Sign in to phpinfo() WP admin</h2>
    <p style="line-height:24px">Click the link below to sign in. It expires in 15 minutes.</p>
    <p style="margin:24px 0">
      <a href="${link}" style="display:inline-block;background:#7c3aed;color:#fff;padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:600">Sign in</a>
    </p>
    <p style="font-size:12px;color:#71717a;word-break:break-all">Or paste this URL into your browser:<br>${link}</p>
  </div>`;
}
