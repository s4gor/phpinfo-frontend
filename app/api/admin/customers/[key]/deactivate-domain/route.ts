import { NextResponse } from "next/server";
import { getAdminFromCookies } from "@/lib/admin-auth";
import { getLicense, trackDeactivation, appendAudit } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(req: Request, { params }: { params: Promise<{ key: string }> }) {
  const admin = await getAdminFromCookies();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { key: rawKey } = await params;
  const key = decodeURIComponent(rawKey);
  const lic = await getLicense(key);
  if (!lic) return NextResponse.json({ error: "License not found" }, { status: 404 });

  let body: { siteUrl?: string } = {};
  try { body = await req.json(); } catch { /* ignore */ }
  const siteUrl = body.siteUrl?.trim();
  if (!siteUrl) {
    return NextResponse.json({ error: "siteUrl is required" }, { status: 400 });
  }

  await trackDeactivation(key, siteUrl);
  await appendAudit({
    ts: Math.floor(Date.now() / 1000),
    actor: admin.sub,
    action: "deactivate-domain",
    target: key,
    details: { siteUrl },
  });

  return NextResponse.json({ ok: true, message: `Site ${siteUrl} disconnected and deactivated.` });
}
