import { NextResponse } from "next/server";
import { getAdminFromCookies } from "@/lib/admin-auth";
import { getLicense, resetDomainAllowance, appendAudit } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(_req: Request, { params }: { params: Promise<{ key: string }> }) {
  const admin = await getAdminFromCookies();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { key: rawKey } = await params;
  const key = decodeURIComponent(rawKey);
  const lic = await getLicense(key);
  if (!lic) return NextResponse.json({ error: "License not found" }, { status: 404 });

  await resetDomainAllowance(key);
  await appendAudit({
    ts: Math.floor(Date.now() / 1000),
    actor: admin.sub,
    action: "reset-domains",
    target: key,
    details: { email: lic.email },
  });

  return NextResponse.json({ ok: true, message: "Domain transfer allowance reset successfully." });
}
