import { NextResponse } from "next/server";
import { getAdminFromCookies } from "@/lib/admin-auth";
import { getAllLicenses } from "@/lib/db";

export const dynamic = "force-dynamic";

function escapeCsv(val: unknown): string {
  if (val === null || val === undefined) return "";
  const str = String(val);
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return '"' + str.replace(/"/g, '""') + '"';
  }
  return str;
}

export async function GET() {
  const admin = await getAdminFromCookies();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const licenses = await getAllLicenses();
  const now = Math.floor(Date.now() / 1000);

  const headers = [
    "Email",
    "Customer Name",
    "Tier",
    "Status",
    "License Key",
    "Issued (UTC)",
    "Expires (UTC)",
    "Amount",
    "Currency",
    "Stripe Customer ID",
    "Stripe Subscription ID",
    "Stripe Session ID",
    "Email Delivery",
    "Activations Count",
    "Activated Domains",
  ];

  const rows = licenses.map((lic) => {
    let status = "active";
    if (lic.revoked) status = "revoked";
    else if (lic.exp < now) status = "expired";

    const acts = lic.activations ?? [];
    const domains = Array.from(new Set(acts.map((a) => a.site_url))).join("; ");

    const issuedIso = new Date(lic.iat * 1000).toISOString();
    const expiresIso = lic.tier === "lifetime" ? "Never" : new Date(lic.exp * 1000).toISOString();
    const amountFormatted = ((lic.amount_total ?? 0) / 100).toFixed(2);

    return [
      escapeCsv(lic.email),
      escapeCsv(lic.customer_name ?? ""),
      escapeCsv(lic.tier),
      escapeCsv(status),
      escapeCsv(lic.key),
      escapeCsv(issuedIso),
      escapeCsv(expiresIso),
      escapeCsv(amountFormatted),
      escapeCsv((lic.currency ?? "usd").toUpperCase()),
      escapeCsv(lic.stripe_customer_id ?? ""),
      escapeCsv(lic.stripe_subscription_id ?? ""),
      escapeCsv(lic.stripe_session_id ?? ""),
      escapeCsv(lic.email_status ?? "none"),
      escapeCsv(acts.length),
      escapeCsv(domains),
    ].join(",");
  });

  const csv = [headers.join(","), ...rows].join("\n");
  const today = new Date().toISOString().slice(0, 10);

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="phpinfo-wp-customers-${today}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
