import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe, INVOICE_RENDERING_TEMPLATE } from "@/lib/stripe";
import {
  getLicenseBySessionId,
  getLicenseByCustomerId,
  getLicenseBySubscriptionId,
  revokeLicense,
  updateLicenseExp,
} from "@/lib/db";
import { issueLicenseForSession } from "@/lib/license-issue";

// Stripe webhooks require the raw body for signature verification.
// Disable Next.js body parsing for this route.
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature");
  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const rawBody = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err) {
    console.error("[webhook] signature verification failed", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "customer.created": {
        const customer = event.data.object as Stripe.Customer;
        if (customer?.id) {
          try {
            await stripe.customers.update(customer.id, {
              invoice_settings: {
                rendering_options: {
                  template: INVOICE_RENDERING_TEMPLATE,
                },
              },
            });
          } catch (tmplErr) {
            console.warn("[webhook] failed to apply invoice template to new customer", tmplErr);
          }
        }
        break;
      }
      case "invoice.created": {
        const invoice = event.data.object as Stripe.Invoice;
        if (invoice?.id && invoice.status === "draft") {
          try {
            await stripe.invoices.update(invoice.id, {
              rendering: {
                template: INVOICE_RENDERING_TEMPLATE,
              },
            });
          } catch (invErr) {
            console.warn("[webhook] failed to apply invoice template directly to draft invoice", invErr);
          }
        }
        const customerId = typeof invoice.customer === "string" ? invoice.customer : invoice.customer?.id;
        if (customerId) {
          try {
            await stripe.customers.update(customerId, {
              invoice_settings: {
                rendering_options: {
                  template: INVOICE_RENDERING_TEMPLATE,
                },
              },
            });
          } catch (tmplErr) {
            console.warn("[webhook] failed to apply invoice template to customer on invoice.created", tmplErr);
          }
        }
        break;
      }
      case "checkout.session.completed":
        await issueLicenseForSession(event.data.object as Stripe.Checkout.Session);
        break;

      case "invoice.payment_succeeded":
        await handleInvoicePaid(event.data.object as Stripe.Invoice);
        break;

      case "charge.refunded":
        await handleChargeRefunded(event.data.object as Stripe.Charge, "refund");
        break;

      case "charge.dispute.created":
        await handleDisputeCreated(event.data.object as Stripe.Dispute);
        break;

      case "customer.subscription.deleted":
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
        break;

      default:
        // Acknowledge other events so Stripe stops retrying
        break;
    }
  } catch (err) {
    console.error(`[webhook] handler failed for ${event.type}`, err);
    // 500 makes Stripe retry - only return 500 for transient failures.
    return NextResponse.json({ error: "Handler error" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

// Subscription renewals. The first payment fires both checkout.session.completed
// AND invoice.payment_succeeded - we skip the latter for "subscription_create"
// so we don't double-issue. Only renewal cycles ("subscription_cycle") and plan
// upgrades ("subscription_update") extend the existing license.
async function handleInvoicePaid(invoice: Stripe.Invoice) {
  if (
    invoice.billing_reason !== "subscription_cycle" &&
    invoice.billing_reason !== "subscription_update"
  ) {
    return;
  }

  const customerId =
    typeof invoice.customer === "string"
      ? invoice.customer
      : invoice.customer?.id;
  if (!customerId) return;

  const lic = await getLicenseByCustomerId(customerId);
  if (!lic) {
    console.warn(`[webhook] renewal for customer ${customerId} but no license found`);
    return;
  }

  const subId =
    typeof (invoice as any).subscription === "string"
      ? (invoice as any).subscription
      : (invoice as any).subscription?.id;
  if (!subId) return;

  // Source of truth = Stripe's current_period_end. Avoids drift between our
  // exp and what Stripe actually billed the customer for.
  const sub = await stripe.subscriptions.retrieve(subId);
  const newExp = (sub as any).current_period_end;
  if (newExp <= lic.exp) return; // no-op if Stripe's period end is behind ours

  await updateLicenseExp(lic.key, newExp);
  console.log(`[webhook] extended license ${lic.key} → exp ${newExp}`);
}

async function handleChargeRefunded(charge: Stripe.Charge, reason: "refund" | "dispute" = "refund") {
  // 1. Try finding checkout session linked to payment intent
  const sessionId =
    typeof charge.payment_intent === "string"
      ? await findSessionByPaymentIntent(charge.payment_intent)
      : null;

  let lic = sessionId ? await getLicenseBySessionId(sessionId) : null;

  // 2. If no session found (e.g. renewal invoice refund), try invoice subscription
  if (!lic && (charge as any).invoice) {
    const invoiceId = typeof (charge as any).invoice === "string" ? (charge as any).invoice : (charge as any).invoice?.id;
    try {
      const inv = await stripe.invoices.retrieve(invoiceId);
      const subId = typeof (inv as any).subscription === "string" ? (inv as any).subscription : (inv as any).subscription?.id;
      if (subId) {
        lic = await getLicenseBySubscriptionId(subId);
      }
    } catch (err) {
      console.warn(`[webhook] failed to retrieve invoice ${invoiceId} for refund`, err);
    }
  }

  // 3. Fallback to customer ID
  if (!lic && charge.customer) {
    const customerId =
      typeof charge.customer === "string"
        ? charge.customer
        : charge.customer.id;
    lic = await getLicenseByCustomerId(customerId);
  }

  if (!lic) {
    console.warn(`[webhook] could not link refund ${charge.id} to any license`);
    return;
  }

  await revokeLicense(lic.key, reason);
  console.log(`[webhook] revoked license ${lic.key} after ${reason}`);
}

async function handleDisputeCreated(dispute: Stripe.Dispute) {
  const chargeId = typeof dispute.charge === "string" ? dispute.charge : dispute.charge?.id;
  if (!chargeId) return;
  try {
    const charge = await stripe.charges.retrieve(chargeId);
    await handleChargeRefunded(charge, "dispute");
  } catch (err) {
    console.warn(`[webhook] failed to retrieve charge ${chargeId} for dispute ${dispute.id}`, err);
  }
}

async function handleSubscriptionDeleted(sub: Stripe.Subscription) {
  const customerId =
    typeof sub.customer === "string" ? sub.customer : sub.customer?.id;

  let lic = await getLicenseBySubscriptionId(sub.id);
  if (!lic && customerId) {
    lic = await getLicenseByCustomerId(customerId);
  }

  if (!lic) {
    console.warn(`[webhook] subscription ${sub.id} deleted but no license found`);
    return;
  }

  // If the license was gifted or upgraded to lifetime, do NOT revoke it
  if (lic.tier === "lifetime") {
    console.log(`[webhook] subscription ${sub.id} deleted for ${lic.email}, but license is lifetime. Skipping revocation.`);
    return;
  }

  await revokeLicense(lic.key, "subscription_cancelled");
  console.log(`[webhook] revoked license ${lic.key} after subscription ${sub.id} was deleted`);
}

async function findSessionByPaymentIntent(piId: string): Promise<string | null> {
  try {
    const sessions = await stripe.checkout.sessions.list({
      payment_intent: piId,
      limit: 1,
    });
    return sessions.data[0]?.id ?? null;
  } catch {
    return null;
  }
}
