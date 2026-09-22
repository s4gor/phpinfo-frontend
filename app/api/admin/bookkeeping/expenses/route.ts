import { NextResponse } from "next/server";
import { getAdminFromCookies } from "@/lib/admin-auth";
import {
  saveExpense,
  getAllExpenses,
  deleteExpense,
  appendAudit,
  type ExpenseRecord,
  type ExpenseCategory,
} from "@/lib/db";
import { computeEuerReport } from "@/lib/bookkeeping";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const admin = await getAdminFromCookies();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const year = parseInt(searchParams.get("year") || "", 10) || new Date().getFullYear();

  const report = await computeEuerReport(year);
  return NextResponse.json(report);
}

export async function POST(req: Request) {
  const admin = await getAdminFromCookies();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: {
    date?: string;
    amount?: number; // in EUR or USD
    currency?: string;
    vendor?: string;
    description?: string;
    category?: ExpenseCategory;
    is_recurring?: boolean;
    recurring_interval?: "daily" | "monthly" | "yearly";
    tax_deductible_pct?: number;
  } = {};

  try { body = await req.json(); } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const vendor = (body.vendor || "").trim();
  const description = (body.description || "").trim() || vendor;
  const amount = Number(body.amount);
  if (!vendor || !Number.isFinite(amount) || amount <= 0) {
    return NextResponse.json({ error: "Valid vendor and positive amount required" }, { status: 400 });
  }

  const category: ExpenseCategory = body.category || "other";
  const date = body.date || new Date().toISOString().slice(0, 10);
  const currency = (body.currency || "eur").toLowerCase();
  const amountCents = Math.round(amount * 100);
  const taxDeductiblePct = Math.min(100, Math.max(0, Number(body.tax_deductible_pct) || 100));

  const id = "exp_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7);
  const record: ExpenseRecord = {
    id,
    date,
    amountCents,
    currency,
    vendor,
    description,
    category,
    isRecurring: body.is_recurring === true,
    recurringInterval: body.recurring_interval,
    taxDeductiblePct,
    createdAt: Math.floor(Date.now() / 1000),
  };

  await saveExpense(record);

  await appendAudit({
    ts: Math.floor(Date.now() / 1000),
    actor: admin.sub,
    action: "expense_created",
    target: id,
    details: { vendor, amountCents, currency, category, date },
  });

  return NextResponse.json({ ok: true, expense: record });
}

export async function DELETE(req: Request) {
  const admin = await getAdminFromCookies();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  await deleteExpense(id);
  await appendAudit({
    ts: Math.floor(Date.now() / 1000),
    actor: admin.sub,
    action: "expense_deleted",
    target: id,
  });

  return NextResponse.json({ ok: true });
}
