import { Resend } from "resend";
import { render } from "@react-email/render";
import Stripe from "stripe";
import { stripe, INVOICE_RENDERING_TEMPLATE } from "./stripe";
import {
  saveLicense,
  updateLicense,
  alreadyProcessed,
  getLicenseBySessionId,
  type LicenseRecord,
  type LicenseTier,
} from "./db";
import { generateLicenseKey, expiryForTier, upgradeToV2Key } from "./license";
import UpgradedLicenseEmail from "../emails/upgraded";
import LicenseEmail from "../emails";

const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy");

// Shared license-issue path. Called from both the Stripe webhook and the
// success page's Stripe fallback. Idempotent - running twice for the same
// session returns the existing record without re-saving or re-emailing.
//
// Returns the saved record, or null if the session lacks an email or
// hasn't been paid.
export async function issueLicenseForSession(
  session: Stripe.Checkout.Session,
): Promise<LicenseRecord | null> {
  if (await alreadyProcessed(session.id)) {
    return getLicenseBySessionId(session.id);
  }

  // Refuse to issue for sessions that haven't actually been paid - the
  // success page fallback could otherwise be tricked by replaying a stale
  // session_id from a cancelled checkout.
  if (session.payment_status && session.payment_status !== "paid" && session.payment_status !== "no_payment_required") {
    return null;
  }

  const tier = (session.metadata?.tier as LicenseTier) || "single";
  const email = session.customer_details?.email || session.customer_email;
  if (!email) {
    console.error(`[issue] no email on session ${session.id}`);
    return null;
  }

  const exp = expiryForTier(tier);
  const key = generateLicenseKey(email, "*", exp);

  const subscriptionId =
    typeof session.subscription === "string"
      ? session.subscription
      : session.subscription?.id;

  const record: LicenseRecord = {
    key,
    email,
    tier,
    site_url: "*",
    exp,
    iat: Math.floor(Date.now() / 1000),
    stripe_customer_id:
      typeof session.customer === "string"
        ? session.customer
        : session.customer?.id,
    stripe_session_id: session.id,
    stripe_subscription_id: subscriptionId,
    subscription_status: subscriptionId ? "active" : undefined,
    customer_name: session.customer_details?.name ?? undefined,
    amount_total: session.amount_total ?? undefined,
    currency: session.currency ?? undefined,
    email_status: "pending",
    email_status_at: Math.floor(Date.now() / 1000),
  };
  await saveLicense(record);

  // Ensure customer has the custom invoice template configured for all current and future invoices
  if (record.stripe_customer_id) {
    try {
      await stripe.customers.update(record.stripe_customer_id, {
        invoice_settings: {
          rendering_options: {
            template: INVOICE_RENDERING_TEMPLATE,
          },
        },
      });
    } catch (tmplErr) {
      console.warn("[issue] failed to apply invoice template to customer", tmplErr);
    }
  }

  try {
    const res = await resend.emails.send({
      from: process.env.RESEND_FROM || "phpinfo() WP <licenses@exeebit.com>",
      to: [email],
      subject: "Your phpinfo() WP Pro license",
      replyTo: "support@exeebit.com",
      html: await render(LicenseEmail({ email, tier, licenseKey: key })),
    });
    const msgId = res.data?.id;
    if (msgId) {
      await updateLicense(key, {
        resend_message_id: msgId,
        email_status: "sent",
        email_status_at: Math.floor(Date.now() / 1000),
      });
      record.resend_message_id = msgId;
      record.email_status = "sent";
    } else if (res.error) {
      await updateLicense(key, {
        email_status: "failed",
        email_last_error: String(res.error.message ?? res.error),
        email_status_at: Math.floor(Date.now() / 1000),
      });
    }
  } catch (err) {
    console.error(`[issue] failed to send license email to ${email}`, err);
    await updateLicense(key, {
      email_status: "failed",
      email_last_error: err instanceof Error ? err.message : String(err),
      email_status_at: Math.floor(Date.now() / 1000),
    });
  }

  return record;
}

// Resend an existing license email. Used by the admin dashboard.
export async function resendLicenseEmail(rec: LicenseRecord): Promise<{ ok: boolean; error?: string; messageId?: string }> {
  try {
    const res = await resend.emails.send({
      from: process.env.RESEND_FROM || "phpinfo() WP <licenses@exeebit.com>",
      to: [rec.email],
      subject: "Your phpinfo() WP Pro license",
      replyTo: "support@exeebit.com",
      html: await render(LicenseEmail({ email: rec.email, tier: rec.tier, licenseKey: rec.key })),
    });
    const msgId = res.data?.id;
    if (msgId) {
      await updateLicense(rec.key, {
        resend_message_id: msgId,
        email_status: "sent",
        email_status_at: Math.floor(Date.now() / 1000),
        email_last_error: undefined,
      });
      return { ok: true, messageId: msgId };
    }
    const errMsg = res.error ? String(res.error.message ?? res.error) : "no message id returned";
    await updateLicense(rec.key, {
      email_status: "failed",
      email_last_error: errMsg,
      email_status_at: Math.floor(Date.now() / 1000),
    });
    return { ok: false, error: errMsg };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    await updateLicense(rec.key, {
      email_status: "failed",
      email_last_error: msg,
      email_status_at: Math.floor(Date.now() / 1000),
    });
    return { ok: false, error: msg };
  }
}

// Send upgraded V2 license email to existing customers with legacy keys
export async function sendUpgradedLicenseEmail(
  rec: LicenseRecord
): Promise<{ ok: boolean; error?: string; messageId?: string; v2Key?: string }> {
  try {
    const v2Key = rec.key.startsWith("PIWP2-") ? rec.key : upgradeToV2Key(rec.key);
    if (!v2Key) {
      return { ok: false, error: "Failed to derive V2 key from record" };
    }

    // Save upgraded key & index in Redis so both resolve
    const updated = await updateLicense(rec.key, {
      upgraded_key: v2Key,
    });
    // Also index the new key in Redis directly if different
    if (v2Key !== rec.key) {
      const v2Record: LicenseRecord = {
        ...(updated || rec),
        key: v2Key,
        upgraded_from: rec.key,
      };
      await saveLicense(v2Record);
    }

    const res = await resend.emails.send({
      from: process.env.RESEND_FROM || "phpinfo() WP <licenses@exeebit.com>",
      to: [rec.email],
      subject: "Your updated phpinfo() WP Pro license key",
      replyTo: "support@exeebit.com",
      html: await render(
        UpgradedLicenseEmail({
          email: rec.email,
          tier: rec.tier,
          v2Key,
          legacyKey: rec.key,
        })
      ),
    });

    const msgId = res.data?.id;
    if (msgId) {
      await updateLicense(rec.key, {
        resend_message_id: msgId,
        email_status: "sent",
        email_status_at: Math.floor(Date.now() / 1000),
        email_last_error: undefined,
      });
      if (v2Key !== rec.key) {
        await updateLicense(v2Key, {
          resend_message_id: msgId,
          email_status: "sent",
          email_status_at: Math.floor(Date.now() / 1000),
        });
      }
      return { ok: true, messageId: msgId, v2Key };
    }

    const errMsg = res.error ? String(res.error.message ?? res.error) : "No message ID returned from Resend";
    return { ok: false, error: errMsg };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return { ok: false, error: msg };
  }
}
