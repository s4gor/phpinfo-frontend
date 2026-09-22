import { redirect } from "next/navigation";
import { getAdminFromCookies } from "@/lib/admin-auth";
import { getAllLicenses } from "@/lib/db";
import { computeStats } from "@/lib/admin-stats";
import { AdminShell } from "../_components/admin-shell";
import { SubscriptionsClient } from "./subscriptions-client";

export const dynamic = "force-dynamic";

export default async function SubscriptionsPage() {
  const admin = await getAdminFromCookies();
  if (!admin) redirect("/admin/login");

  const [allLicenses, s] = await Promise.all([
    getAllLicenses(),
    computeStats(),
  ]);

  const subscriptions = allLicenses
    .filter((lic) => !!lic.stripe_subscription_id)
    .sort((a, b) => b.iat - a.iat);

  const searchCustomers = allLicenses.map((r) => ({
    email: r.email,
    name: r.customer_name,
    tier: r.tier,
    key: r.key,
    sessionId: r.stripe_session_id,
  }));

  return (
    <AdminShell email={admin.sub} customers={searchCustomers}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900">Subscriptions & Billing</h1>
        <p className="mt-1 text-xs text-zinc-500">
          Recurring revenue streams, renewal schedules, and Stripe subscription linkages.
        </p>
      </div>

      <SubscriptionsClient
        licensesWithSubs={subscriptions}
        mrrCents={s.mrrCents}
        activeCount={s.activeSubscriptions}
        upcomingRenewals={s.upcomingRenewals30d}
      />
    </AdminShell>
  );
}
