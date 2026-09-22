import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { getLicense } from "@/lib/db";
import { parseLicenseKey } from "@/lib/license";
import { getRuleset, RULESET_SCHEMA_VERSION } from "@/lib/update-guard-ruleset";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || "https://dummy.upstash.io",
  token: process.env.UPSTASH_REDIS_REST_TOKEN || "dummy",
});

// Pro sites pull at most every 12h (client-cached). 30/min/IP is ample.
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(30, "1 m"),
});

/**
 * Update Guard ruleset feed - Pro-only.
 *
 * Auth mirrors /api/license/validate: HMAC signature → expiry → DB lookup
 * (catches revoked/refunded keys). We don't enforce the per-tier site limit
 * here - any valid, unexpired, non-revoked key may pull rules.
 */
export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "127.0.0.1";
  const rl = await ratelimit.limit(ip);
  if (!rl.success) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  // Plugin posts form-encoded by default (wp_remote_post); accept JSON too.
  let licenseKey = "";
  const ct = req.headers.get("content-type") || "";
  if (ct.includes("application/json")) {
    const body = await req.json().catch(() => ({}));
    licenseKey = String(body.license_key || "");
  } else {
    const form = await req.formData().catch(() => null);
    licenseKey = form ? String(form.get("license_key") || "") : "";
  }

  if (!licenseKey) {
    return NextResponse.json({ error: "missing_key" }, { status: 400 });
  }

  const payload = parseLicenseKey(licenseKey);
  if (!payload) {
    return NextResponse.json({ error: "bad_signature" }, { status: 403 });
  }
  if (payload.exp < Math.floor(Date.now() / 1000)) {
    return NextResponse.json({ error: "expired" }, { status: 403 });
  }

  const record = await getLicense(licenseKey);
  if (!record) {
    return NextResponse.json({ error: "unknown_key" }, { status: 403 });
  }
  if (record.revoked) {
    return NextResponse.json({ error: record.revoke_reason || "revoked" }, { status: 403 });
  }

  const ruleset = await getRuleset();
  return NextResponse.json(ruleset, {
    headers: {
      // Edge-cache the (license-agnostic) ruleset briefly to shave load;
      // it changes rarely and the client also caches for 12h.
      "Cache-Control": "public, max-age=300, s-maxage=900",
    },
  });
}

// Browser pokes / health checks - never returns the gated ruleset.
export async function GET() {
  return NextResponse.json({
    ok: true,
    schema_version: RULESET_SCHEMA_VERSION,
    hint: "POST with license_key to fetch the Update Guard ruleset",
  });
}
