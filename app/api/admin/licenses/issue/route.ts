import { NextResponse } from "next/server";
import { getAdminFromCookies } from "@/lib/admin-auth";
import { saveLicense, updateLicense, appendAudit, type LicenseRecord, type LicenseTier } from "@/lib/db";
import { generateLicenseKey, expiryForTier } from "@/lib/license";
import { Resend } from "resend";
import { render } from "@react-email/render";
import LicenseEmail from "@/emails";

export const dynamic = "force-dynamic";

const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy");

export async function POST(req: Request) {
  const admin = await getAdminFromCookies();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: {
    email?: string;
    customer_name?: string;
    tier?: LicenseTier;
    exp?: number;
    send_email?: boolean;
    note?: string;
  } = {};

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const email = (body.email || "").trim().toLowerCase();
  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Valid customer email is required" }, { status: 400 });
  }

  const tier: LicenseTier = body.tier === "unlimited" || body.tier === "lifetime" ? body.tier : "single";
  const now = Math.floor(Date.now() / 1000);
  const exp = body.exp && body.exp > now ? body.exp : expiryForTier(tier);
  const customerName = (body.customer_name || "").trim() || undefined;
  const sendEmail = body.send_email === true;

  const key = generateLicenseKey(email, "*", exp, now);

  const record: LicenseRecord = {
    key,
    email,
    customer_name: customerName,
    tier,
    site_url: "*",
    exp,
    iat: now,
    amount_total: 0,
    currency: "usd",
    email_status: sendEmail ? "pending" : undefined,
    email_status_at: sendEmail ? now : undefined,
  };

  await saveLicense(record);

  if (sendEmail) {
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
        record.email_status = "failed";
      }
    } catch (err) {
      console.error("[manual issue] failed to send email", err);
      await updateLicense(key, {
        email_status: "failed",
        email_last_error: err instanceof Error ? err.message : String(err),
        email_status_at: Math.floor(Date.now() / 1000),
      });
      record.email_status = "failed";
    }
  }

  await appendAudit({
    ts: now,
    actor: admin.sub,
    action: "manual_issue",
    target: key,
    details: {
      email,
      tier,
      exp,
      customerName,
      sendEmail,
      note: body.note,
    },
  });

  return NextResponse.json({ ok: true, license: record });
}
