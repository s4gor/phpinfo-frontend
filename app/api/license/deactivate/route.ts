import { NextRequest, NextResponse } from "next/server";
import { getLicense, trackDeactivation } from "@/lib/db";
import { parseLicenseKey } from "@/lib/license";
import { redis } from "@/lib/db";

export async function POST(req: NextRequest) {
  let licenseKey = "";
  let siteUrl = "";

  const ct = req.headers.get("content-type") || "";
  if (ct.includes("application/json")) {
    const body = await req.json().catch(() => ({}));
    licenseKey = String(body.license_key || "");
    siteUrl    = String(body.site_url    || "");
  } else {
    const form = await req.formData().catch(() => null);
    if (form) {
      licenseKey = String(form.get("license_key") || "");
      siteUrl    = String(form.get("site_url")    || "");
    }
  }

  if (!licenseKey) {
    return NextResponse.json({ ok: false, error: "missing_key" }, { status: 400 });
  }

  const payload = parseLicenseKey(licenseKey);
  if (!payload) {
    return NextResponse.json({ ok: false, error: "bad_signature" }, { status: 400 });
  }

  let record = await getLicense(licenseKey);
  if (!record && licenseKey.startsWith("PIWP2-")) {
    const emailKeys = (await redis.smembers(`email:${payload.email.toLowerCase()}`)) as string[];
    if (Array.isArray(emailKeys)) {
      for (const k of emailKeys) {
        const r = await getLicense(k);
        if (r) {
          record = r;
          break;
        }
      }
    }
  }

  if (record && siteUrl) {
    await trackDeactivation(record.key, siteUrl);
  }

  return NextResponse.json({
    ok: true,
    message: "License deactivated for site",
    site_url: siteUrl,
  });
}

export async function GET() {
  return NextResponse.json({ ok: true, hint: "POST with license_key + site_url to deactivate" });
}
