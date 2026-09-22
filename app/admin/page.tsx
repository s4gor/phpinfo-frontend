import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminFromCookies } from "@/lib/admin-auth";
import { computeStats } from "@/lib/admin-stats";
import { AdminShell } from "./_components/admin-shell";
import { formatMoney, formatDate } from "./_components/format";
import { TierBadge, LicenseStatusPill, EmailPill } from "./_components/pills";
import { TrendChart } from "./_components/trend-chart";
import {
  TrendingUp,
  DollarSign,
  Users,
  Globe,
  MailCheck,
  ShieldAlert,
  ArrowUpRight,
  Download,
  PlusCircle,
  ExternalLink,
  Sparkles,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminOverviewPage() {
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

  const mrrFormatted = formatMoney(s.mrrCents);
  const arrFormatted = formatMoney(s.arrCents);
  const lifetimeFormatted = formatMoney(s.revenueLifetimeCents);
  const thisMonthFormatted = formatMoney(s.revenueThisMonthCents);

  return (
    <AdminShell email={admin.sub} customers={searchCustomers}>
      {/* Cockpit Top Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900">Mission Control</h1>
            <span className="rounded-full bg-violet-50 px-2.5 py-0.5 text-xs font-semibold text-violet-700 border border-violet-100">
              phpinfo() WP Pro
            </span>
          </div>
          <p className="mt-1 text-xs text-zinc-500">
            Real-time business telemetry, licensing operations & client telemetry.
          </p>
        </div>

        {/* Header Action Shortcuts */}
        <div className="flex flex-wrap items-center gap-2">
          <a
            href="/api/admin/export/customers"
            className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200/90 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 shadow-2xs hover:bg-zinc-50 hover:text-zinc-900 transition-colors"
          >
            <Download className="h-3.5 w-3.5 text-zinc-400" />
            Export CSV
          </a>
          <Link
            href="/admin/customers?action=issue"
            className="inline-flex items-center gap-1.5 rounded-lg bg-violet-600 px-3 py-1.5 text-xs font-semibold text-white shadow-2xs hover:bg-violet-500 transition-colors"
          >
            <PlusCircle className="h-3.5 w-3.5" />
            Issue License
          </Link>
        </div>
      </div>

      {/* Hero KPI Strip (5 Grid Cards) */}
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
        {/* MRR Card */}
        <div className="rounded-2xl border border-zinc-200/80 bg-white p-4 sm:p-5 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">MRR</span>
            <DollarSign className="h-4 w-4 text-violet-500" />
          </div>
          <div className="text-2xl font-bold tracking-tight text-zinc-900 font-mono">
            {mrrFormatted}
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px]">
            <span className="text-zinc-500">ARR: <strong className="text-zinc-800 font-mono">{arrFormatted}</strong></span>
            <span className="font-semibold text-emerald-600">Active subs</span>
          </div>
        </div>

        {/* Gross Volume Card */}
        <div className="rounded-2xl border border-zinc-200/80 bg-white p-4 sm:p-5 shadow-xs">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Gross Volume</span>
            <TrendingUp className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold tracking-tight text-zinc-900 font-mono">
            {lifetimeFormatted}
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px]">
            <span className="text-zinc-500">This Month: <strong className="text-zinc-800 font-mono">{thisMonthFormatted}</strong></span>
            {s.revenueGrowthPct !== null && (
              <span className={`font-semibold ${s.revenueGrowthPct >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
                {s.revenueGrowthPct >= 0 ? "+" : ""}{s.revenueGrowthPct}%
              </span>
            )}
          </div>
        </div>

        {/* Active Licenses Card */}
        <div className="rounded-2xl border border-zinc-200/80 bg-white p-4 sm:p-5 shadow-xs">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Active Licenses</span>
            <Users className="h-4 w-4 text-cyan-500" />
          </div>
          <div className="text-2xl font-bold tracking-tight text-zinc-900 font-mono">
            {s.activeLicenses}
            <span className="text-xs text-zinc-400 font-normal ml-1.5">/ {s.totalSales}</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-zinc-500">
            <span>{s.expired} expired</span>
            <span>{s.revoked} revoked</span>
          </div>
        </div>

        {/* Live Sites Card */}
        <div className="rounded-2xl border border-zinc-200/80 bg-white p-4 sm:p-5 shadow-xs">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Live Sites</span>
            <Globe className="h-4 w-4 text-indigo-500" />
          </div>
          <div className="text-2xl font-bold tracking-tight text-zinc-900 font-mono">
            {s.totalActivations}
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px]">
            <span className="flex items-center gap-1 text-emerald-600 font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              {s.domainsActiveCount} active &lt;7d
            </span>
            <span className="text-zinc-400">{s.domainsStaleCount + s.domainsDormantCount} stale</span>
          </div>
        </div>

        {/* Email Delivery Card */}
        <div className="rounded-2xl border border-zinc-200/80 bg-white p-4 sm:p-5 shadow-xs">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Deliverability</span>
            <MailCheck className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold tracking-tight text-zinc-900 font-mono">
            {s.emailDeliveryRate}%
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-zinc-500">
            <span>{s.emailDelivered} delivered</span>
            <span className="text-rose-600">{s.emailBounced} failed</span>
          </div>
        </div>
      </div>

      {/* Abuse Sentinel Alert Banner if any single site license over limits */}
      {s.abuseAlertsCount > 0 && (
        <div className="mb-6 flex items-center justify-between rounded-xl border border-amber-200 bg-amber-50/70 p-3.5 text-amber-900 text-xs">
          <div className="flex items-center gap-2.5">
            <ShieldAlert className="h-4 w-4 text-amber-600 shrink-0" />
            <div>
              <span className="font-semibold">{s.abuseAlertsCount} single-site license(s)</span> have multiple activated domains.
            </div>
          </div>
          <Link
            href="/admin/activations?filter=abuse"
            className="font-medium text-amber-800 hover:text-amber-950 underline shrink-0"
          >
            Review Violations →
          </Link>
        </div>
      )}

      {/* Trend Velocity Chart */}
      <div className="mb-6">
        <TrendChart
          data30={s.last30.map((b) => ({ label: b.date, sales: b.sales, revenueCents: b.revenueCents }))}
          data90={s.last90.map((b) => ({ label: b.date, sales: b.sales, revenueCents: b.revenueCents }))}
          data12m={s.last12Months.map((b) => ({ label: b.month, sales: b.sales, revenueCents: b.revenueCents }))}
        />
      </div>

      {/* Product & Operational Health 2-Column Grid */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Tier Distribution Card */}
        <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between border-b border-zinc-100 pb-3 mb-4">
            <div>
              <h2 className="text-sm font-semibold text-zinc-900">Product Tier Distribution</h2>
              <p className="text-xs text-zinc-400">Contribution and average revenue per tier</p>
            </div>
            <span className="text-xs font-mono font-medium text-zinc-500">
              ARPU: {formatMoney(s.arpuCents)}
            </span>
          </div>

          <div className="space-y-4">
            {s.tierBreakdown.map((t) => {
              const pct = s.totalSales > 0 ? Math.round((t.count / s.totalSales) * 100) : 0;
              const tierArpu = t.count > 0 ? Math.round(t.revenueCents / t.count) : 0;
              return (
                <div key={t.tier}>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: t.color }} />
                      <span className="font-medium text-zinc-800">{t.label}</span>
                      <span className="text-[11px] text-zinc-400">({t.count} · {pct}%)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] text-zinc-400">Avg: {formatMoney(tierArpu)}</span>
                      <span className="font-semibold font-mono text-zinc-900">{formatMoney(t.revenueCents)}</span>
                    </div>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-100">
                    <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: t.color }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Operational Health & Subscriptions */}
        <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between border-b border-zinc-100 pb-3 mb-4">
            <div>
              <h2 className="text-sm font-semibold text-zinc-900">Operational Health & Telemetry</h2>
              <p className="text-xs text-zinc-400">Client validation pings and recurring renewals</p>
            </div>
            <Link href="/admin/subscriptions" className="text-xs font-medium text-violet-600 hover:underline">
              Subscriptions →
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="rounded-xl border border-zinc-100 bg-zinc-50/50 p-3">
              <div className="text-[11px] text-zinc-400 font-medium uppercase tracking-wider">Activation Rate</div>
              <div className="mt-1 text-xl font-bold text-zinc-900 font-mono">{s.activationRate}%</div>
              <div className="text-[10px] text-zinc-500 mt-0.5">{s.licensesWithActivations} of {s.totalSales} installed</div>
            </div>

            <div className="rounded-xl border border-zinc-100 bg-zinc-50/50 p-3">
              <div className="text-[11px] text-zinc-400 font-medium uppercase tracking-wider">30D Renewals</div>
              <div className="mt-1 text-xl font-bold text-violet-600 font-mono">{s.upcomingRenewals30d}</div>
              <div className="text-[10px] text-zinc-500 mt-0.5">Recurring cycles upcoming</div>
            </div>
          </div>

          <div className="space-y-2.5 text-xs text-zinc-600">
            <div className="flex items-center justify-between py-1 border-b border-zinc-50">
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Active Domains (&lt;7 days)
              </span>
              <span className="font-mono font-medium text-zinc-800">{s.domainsActiveCount}</span>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-zinc-50">
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                Stale Domains (7–30 days)
              </span>
              <span className="font-mono font-medium text-zinc-800">{s.domainsStaleCount}</span>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-zinc-50">
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-zinc-400" />
                Dormant Domains (&gt;30 days)
              </span>
              <span className="font-mono font-medium text-zinc-800">{s.domainsDormantCount}</span>
            </div>
            <div className="flex items-center justify-between py-1">
              <span>Avg Days Until License Expiry</span>
              <span className="font-mono font-medium text-zinc-800">{s.avgDaysToExpiry} days</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions Stream */}
      <div className="overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-xs">
        <div className="flex items-center justify-between border-b border-zinc-100 px-5 py-4">
          <div>
            <h2 className="text-sm font-semibold text-zinc-900">Recent Customer Activity</h2>
            <p className="text-xs text-zinc-400">Latest transaction events and license creations</p>
          </div>
          <Link
            href="/admin/customers"
            className="rounded-lg border border-zinc-200/90 bg-zinc-50 px-3 py-1.5 text-xs font-medium text-zinc-700 hover:border-violet-300 hover:text-violet-600 transition-colors"
          >
            All {s.totalSales} Customers →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-100 text-[10px] font-medium uppercase tracking-wider text-zinc-400">
                <th className="px-5 py-3">Issued Date</th>
                <th className="px-5 py-3">Customer</th>
                <th className="px-5 py-3">Tier</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Email</th>
                <th className="px-5 py-3">Amount</th>
                <th className="px-5 py-3">Active Domain</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {s.recent.map((r) => {
                const acts = r.activations ?? [];
                const firstDomain = acts.length > 0 ? acts[0].site_url : null;

                return (
                  <tr key={r.key} className="hover:bg-zinc-50/80 transition-colors">
                    <td className="px-5 py-3 text-xs text-zinc-400 whitespace-nowrap">
                      {formatDate(r.iat)}
                    </td>
                    <td className="px-5 py-3">
                      <div className="text-xs font-medium text-zinc-900">{r.email}</div>
                      {r.customer_name && <div className="text-[10px] text-zinc-400">{r.customer_name}</div>}
                    </td>
                    <td className="px-5 py-3">
                      <TierBadge tier={r.tier} />
                    </td>
                    <td className="px-5 py-3">
                      <LicenseStatusPill revoked={r.revoked} exp={r.exp} />
                    </td>
                    <td className="px-5 py-3">
                      <EmailPill status={r.email_status} />
                    </td>
                    <td className="px-5 py-3 text-xs font-semibold font-mono text-zinc-900 whitespace-nowrap">
                      {formatMoney(r.amount_total ?? 0, r.currency)}
                    </td>
                    <td className="px-5 py-3 max-w-[160px]">
                      {firstDomain ? (
                        <span className="truncate block font-mono text-[11px] text-zinc-600" title={firstDomain}>
                          {firstDomain}
                        </span>
                      ) : (
                        <span className="text-[11px] text-zinc-300">Not activated</span>
                      )}
                    </td>
                    <td className="px-5 py-3 text-right">
                      {r.stripe_session_id ? (
                        <Link
                          href={`/admin/customers/${encodeURIComponent(r.stripe_session_id)}`}
                          className="inline-flex items-center gap-1 text-xs font-medium text-violet-600 hover:text-violet-800 hover:underline"
                        >
                          View <ArrowUpRight className="h-3 w-3" />
                        </Link>
                      ) : (
                        <Link
                          href={`/admin/customers?q=${encodeURIComponent(r.email)}`}
                          className="text-xs font-medium text-violet-600 hover:underline"
                        >
                          View
                        </Link>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  );
}
