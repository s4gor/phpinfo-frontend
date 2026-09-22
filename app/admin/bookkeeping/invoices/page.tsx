import { redirect } from "next/navigation";
import { getAdminFromCookies } from "@/lib/admin-auth";
import { getAllLicenses } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { AdminShell } from "../../_components/admin-shell";
import { InvoicesClient, type SerializedStripeInvoice } from "./invoices-client";

export const dynamic = "force-dynamic";

export default async function InvoicesPage() {
  const admin = await getAdminFromCookies();
  if (!admin) redirect("/admin/login");

  const [allLicenses, stripeInvoicesList] = await Promise.all([
    getAllLicenses(),
    stripe.invoices.list({ limit: 100 }).catch((err) => {
      console.error("Failed to fetch Stripe invoices:", err);
      return { data: [] };
    }),
  ]);

  const searchCustomers = allLicenses.map((r) => ({
    email: r.email,
    name: r.customer_name,
    tier: r.tier,
    key: r.key,
    sessionId: r.stripe_session_id,
  }));

  const stripeInvoices: SerializedStripeInvoice[] = stripeInvoicesList.data.map((inv) => ({
    id: inv.id,
    number: inv.number || "",
    created: inv.created,
    status: inv.status || "paid",
    amount_paid: inv.amount_paid,
    currency: inv.currency,
    customer_id: typeof inv.customer === "string" ? inv.customer : inv.customer?.id || null,
    customer_name: inv.customer_name || null,
    customer_email: inv.customer_email || null,
    subscription_id: typeof (inv as any).subscription === "string" ? (inv as any).subscription : (inv as any).subscription?.id || null,
    invoice_pdf: inv.invoice_pdf || null,
    hosted_invoice_url: inv.hosted_invoice_url || null,
  }));

  return (
    <AdminShell email={admin.sub} customers={searchCustomers}>
      <InvoicesClient licenses={allLicenses} stripeInvoices={stripeInvoices} />
    </AdminShell>
  );
}
