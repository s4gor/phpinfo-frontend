import { NextResponse } from "next/server";
import { getAdminFromCookies } from "@/lib/admin-auth";
import { getLicense, changeLicenseTier, updateLicenseExp, appendAudit, type LicenseTier } from "@/lib/db";
import { stripe } from "@/lib/stripe";

export const dynamic = "force-dynamic";

export async function POST(req: Request, { params }: { params: Promise<{ key: string }> }) {
  const admin = await getAdminFromCookies();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { key: rawKey } = await params;
  const key = decodeURIComponent(rawKey);
  const lic = await getLicense(key);
  if (!lic) return NextResponse.json({ error: "License not found" }, { status: 404 });

  let body: { tier?: string } = {};
  try { body = await req.json(); } catch { /* ignore */ }
  const newTier = body.tier as LicenseTier;
  if (!["single", "unlimited", "lifetime"].includes(newTier)) {
    return NextResponse.json({ error: "Invalid tier. Must be single, unlimited, or lifetime." }, { status: 400 });
  }

  const prevTier = lic.tier;
  await changeLicenseTier(key, newTier);

  let subCanceled = false;
  // If upgrading to lifetime, automatically grant lifetime expiry and cancel recurring Stripe subscription
  if (newTier === "lifetime") {
    await updateLicenseExp(key, 4070908800); // Year 2099
    if (lic.stripe_subscription_id) {
      try {
        await stripe.subscriptions.cancel(lic.stripe_subscription_id);
        subCanceled = true;
      } catch (err) {
        console.warn("[change-tier] failed to cancel active stripe subscription", err);
      }
    }
  }

  await appendAudit({
    ts: Math.floor(Date.now() / 1000),
    actor: admin.sub,
    action: "change-tier",
    target: key,
    details: { previousTier: prevTier, newTier, stripeSubCanceled: subCanceled },
  });

  let message = `License tier changed to ${newTier}.`;
  if (newTier === "lifetime") {
    message = subCanceled
      ? "Upgraded to Lifetime. Expiry extended permanently, and active recurring Stripe subscription was automatically canceled to stop future renewals."
      : "Upgraded to Lifetime with permanent validity.";
  }

  return NextResponse.json({ ok: true, message });
}
