import { NextResponse } from "next/server";
import { getAdminFromCookies } from "@/lib/admin-auth";
import { logHomeofficeDay, removeHomeofficeDay, getHomeofficeDays } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const admin = await getAdminFromCookies();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const year = parseInt(searchParams.get("year") || "", 10) || new Date().getFullYear();
  const days = await getHomeofficeDays(year);
  return NextResponse.json({ year, totalDays: days.length, days });
}

export async function POST(req: Request) {
  const admin = await getAdminFromCookies();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: { date?: string; bulk_dates?: string[] } = {};
  try { body = await req.json(); } catch { /* ignore */ }

  if (body.bulk_dates && Array.isArray(body.bulk_dates)) {
    let added = 0;
    for (const d of body.bulk_dates) {
      const res = await logHomeofficeDay(d);
      if (res.success) added++;
    }
    return NextResponse.json({ ok: true, message: `Bulk logged ${added} homeoffice days.` });
  }

  const date = body.date || new Date().toISOString().slice(0, 10);
  const res = await logHomeofficeDay(date);
  return NextResponse.json(res);
}

export async function DELETE(req: Request) {
  const admin = await getAdminFromCookies();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");
  if (!date) return NextResponse.json({ error: "Missing date" }, { status: 400 });

  const res = await removeHomeofficeDay(date);
  return NextResponse.json(res);
}
