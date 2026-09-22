import { NextResponse } from "next/server";
import { getAdminFromCookies } from "@/lib/admin-auth";
import { unrevokeLicense, getLicense, appendAudit } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(_req: Request, { params }: { params: Promise<{ key: string }> }) {
  const admin = await getAdminFromCookies();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { key: rawKey } = await params;
  const key = decodeURIComponent(rawKey);
  const lic = await getLicense(key);
  if (!lic) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await unrevokeLicense(key);
  await appendAudit({
    ts: Math.floor(Date.now() / 1000),
    actor: admin.sub,
    action: "unrevoke",
    target: key,
  });
  return NextResponse.json({ ok: true, message: "License restored." });
}
