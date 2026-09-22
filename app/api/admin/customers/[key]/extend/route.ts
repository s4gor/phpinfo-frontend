import { NextResponse } from "next/server";
import { getAdminFromCookies } from "@/lib/admin-auth";
import { getLicense, updateLicenseExp, appendAudit } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(req: Request, { params }: { params: Promise<{ key: string }> }) {
  const admin = await getAdminFromCookies();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { key: rawKey } = await params;
  const key = decodeURIComponent(rawKey);
  const lic = await getLicense(key);
  if (!lic) return NextResponse.json({ error: "Not found" }, { status: 404 });

  let body: { exp?: number } = {};
  try { body = await req.json(); } catch { /* ignore */ }
  const exp = Number(body.exp);
  if (!Number.isFinite(exp) || exp < Math.floor(Date.now() / 1000)) {
    return NextResponse.json({ error: "Invalid exp (must be a future unix timestamp)" }, { status: 400 });
  }

  await updateLicenseExp(key, exp);
  await appendAudit({
    ts: Math.floor(Date.now() / 1000),
    actor: admin.sub,
    action: "extend",
    target: key,
    details: { newExp: exp, previousExp: lic.exp },
  });
  return NextResponse.json({ ok: true, message: `Expiry extended to ${new Date(exp * 1000).toISOString().slice(0, 10)}.` });
}
