import { redirect } from "next/navigation";
import { getAdminFromCookies } from "@/lib/admin-auth";
import { computeStats } from "@/lib/admin-stats";
import { AdminShell } from "../_components/admin-shell";
import { ActivationsClient } from "./activations-client";

export const dynamic = "force-dynamic";

export default async function ActivationsPage() {
  const admin = await getAdminFromCookies();
  if (!admin) redirect("/admin/login");

  const s = await computeStats();

  const searchCustomers = s.recent.map((r) => ({
    email: r.email,
    name: r.customer_name,
    tier: r.tier,
    key: r.key,
    sessionId: r.stripe_session_id,
  }));

  return (
    <AdminShell email={admin.sub} customers={searchCustomers}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900">Live Activations & Domains</h1>
        <p className="mt-1 text-xs text-zinc-500">
          Telemetry of all registered WordPress domains, heartbeat health, and single-site compliance.
        </p>
      </div>

      <ActivationsClient
        domains={s.allDomains}
        totalActivations={s.totalActivations}
        activeCount={s.domainsActiveCount}
        staleCount={s.domainsStaleCount}
        dormantCount={s.domainsDormantCount}
        abuseCount={s.abuseAlertsCount}
      />
    </AdminShell>
  );
}
