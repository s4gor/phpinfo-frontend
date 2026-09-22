import { NextResponse } from "next/server";
import { getAdminFromCookies } from "@/lib/admin-auth";
import { getLicense, appendAudit } from "@/lib/db";
import { sendUpgradedLicenseEmail } from "@/lib/license-issue";

export const dynamic = "force-dynamic";

export async function POST(_req: Request, { params }: { params: Promise<{ key: string }> }) {
  const admin = await getAdminFromCookies();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { key: rawKey } = await params;
  const key = decodeURIComponent(rawKey);
  const lic = await getLicense(key);
  if (!lic) return NextResponse.json({ error: "License not found" }, { status: 404 });

  if (!lic.key.startsWith("PIWP-") && !lic.key.startsWith("PIWP1-")) {
    return NextResponse.json(
      { error: "This customer already has a modern V2 Ed25519 cryptographic key." },
      { status: 400 }
    );
  }

  const result = await sendUpgradedLicenseEmail(lic);
  await appendAudit({
    ts: Math.floor(Date.now() / 1000),
    actor: admin.sub,
    action: "send-upgraded-key",
    target: key,
    details: { ok: result.ok, v2Key: result.v2Key, messageId: result.messageId, error: result.error },
  });

  if (!result.ok) {
    return NextResponse.json({ error: result.error || "Failed to send upgraded key email." }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    message: `Upgraded V2 key successfully sent to ${lic.email}.`,
    v2Key: result.v2Key,
  });
}
