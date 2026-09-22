import { NextResponse } from "next/server";
import { getAdminFromCookies } from "@/lib/admin-auth";
import { revokeLicense, getLicense, appendAudit } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(req: Request, { params }: { params: Promise<{ key: string }> }) {
  const admin = await getAdminFromCookies();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { key: rawKey } = await params;
  const key = decodeURIComponent(rawKey);
  const lic = await getLicense(key);
  if (!lic) return NextResponse.json({ error: "Not found" }, { status: 404 });

  let body: { reason?: string } = {};
  try { body = await req.json(); } catch { /* ignore */ }
  const reason = (body.reason || "manual revoke").slice(0, 200);

  await revokeLicense(key, reason);
  await appendAudit({
    ts: Math.floor(Date.now() / 1000),
    actor: admin.sub,
    action: "revoke",
    target: key,
    details: { reason },
  });
  return NextResponse.json({ ok: true, message: "License revoked." });
}
