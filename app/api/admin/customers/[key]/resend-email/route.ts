import { NextResponse } from "next/server";
import { getAdminFromCookies } from "@/lib/admin-auth";
import { getLicense, appendAudit } from "@/lib/db";
import { resendLicenseEmail } from "@/lib/license-issue";

export const dynamic = "force-dynamic";

export async function POST(_req: Request, { params }: { params: Promise<{ key: string }> }) {
  const admin = await getAdminFromCookies();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { key: rawKey } = await params;
  const key = decodeURIComponent(rawKey);
  const lic = await getLicense(key);
  if (!lic) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const result = await resendLicenseEmail(lic);
  await appendAudit({
    ts: Math.floor(Date.now() / 1000),
    actor: admin.sub,
    action: "resend-email",
    target: key,
    details: { ok: result.ok, error: result.error },
  });

  if (!result.ok) {
    return NextResponse.json({ error: result.error || "Send failed" }, { status: 500 });
  }
  return NextResponse.json({ ok: true, message: `Email resent (id ${result.messageId}).` });
}
