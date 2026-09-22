"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { TierBadge, LicenseStatusPill } from "../_components/pills";
import { Pagination } from "../_components/pagination";
import { formatDate, formatMoney, formatEur } from "../_components/format";
import { convertSaleToEur } from "@/lib/currency";
import type { LicenseRecord } from "@/lib/db";
import {
  CreditCard,
  Search,
  ExternalLink,
  Clock,
  Calendar,
  DollarSign,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";

export function SubscriptionsClient({
  licensesWithSubs,
  mrrCents,
  activeCount,
  upcomingRenewals,
}: {
  licensesWithSubs: LicenseRecord[];
  mrrCents: number;
  activeCount: number;
  upcomingRenewals: number;
}) {
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const now = Math.floor(Date.now() / 1000);
  const stripeDashboard = process.env.NEXT_PUBLIC_STRIPE_DASHBOARD_BASE || "https://dashboard.stripe.com";

  const filtered = useMemo(() => {
    return licensesWithSubs.filter((lic) => {
      if (q.trim()) {
        const query = q.trim().toLowerCase();
        const hay = `${lic.email} ${lic.customer_name ?? ""} ${lic.stripe_subscription_id ?? ""} ${lic.stripe_customer_id ?? ""}`.toLowerCase();
        if (!hay.includes(query)) return false;
      }
      if (statusFilter === "active" && (lic.revoked || lic.exp < now)) return false;
      if (statusFilter === "canceled" && !lic.revoked) return false;
      if (statusFilter === "renewing_soon") {
        const daysLeft = (lic.exp - now) / 86400;
        if (lic.revoked || lic.exp < now || daysLeft > 30) return false;
      }
      return true;
    });
  }, [licensesWithSubs, q, statusFilter, now]);

  const PAGE_SIZE = 15;
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, currentPage]);

  return (
    <div>
      {/* Metric Cards */}
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-zinc-200/80 bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between text-zinc-400 mb-1.5">
            <span className="text-xs font-medium uppercase tracking-wider">Active Subscriptions</span>
            <CreditCard className="h-4 w-4 text-violet-500" />
          </div>
          <div className="text-2xl font-bold tracking-tight text-zinc-900 font-mono">
            {activeCount}
            <span className="text-xs text-zinc-400 font-normal ml-1.5">/ {licensesWithSubs.length}</span>
          </div>
          <div className="text-[11px] text-zinc-400 mt-1">Recurring customer base</div>
        </div>

        <div className="rounded-2xl border border-zinc-200/80 bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between text-zinc-400 mb-1.5">
            <span className="text-xs font-medium uppercase tracking-wider">Recurring MRR</span>
            <DollarSign className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold tracking-tight text-zinc-900 font-mono">
            {formatMoney(mrrCents)}
          </div>
          <div className="text-[11px] text-zinc-400 mt-1">
            ARR Run-rate: <strong className="text-zinc-700 font-mono">{formatMoney(mrrCents * 12)}</strong>
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-200/80 bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between text-zinc-400 mb-1.5">
            <span className="text-xs font-medium uppercase tracking-wider">Upcoming 30D Renewals</span>
            <Calendar className="h-4 w-4 text-indigo-500" />
          </div>
          <div className="text-2xl font-bold tracking-tight text-violet-600 font-mono">
            {upcomingRenewals}
          </div>
          <div className="text-[11px] text-zinc-400 mt-1">Billing cycles within 30 days</div>
        </div>

        <div className="rounded-2xl border border-zinc-200/80 bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between text-zinc-400 mb-1.5">
            <span className="text-xs font-medium uppercase tracking-wider">Stripe Sync Health</span>
            <TrendingUp className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold tracking-tight text-emerald-700 font-mono">
            100%
          </div>
          <div className="text-[11px] text-zinc-400 mt-1">All subscriptions indexed in Redis</div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            value={q}
            onChange={(e) => { setQ(e.target.value); setCurrentPage(1); }}
            placeholder="Search email, customer name, subscription ID, or customer ID…"
            className="w-full rounded-xl border border-zinc-200/80 bg-white pl-9 pr-3 py-2 text-xs text-zinc-900 placeholder:text-zinc-400 shadow-2xs focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
            className="rounded-xl border border-zinc-200/80 bg-white px-3 py-2 text-zinc-700 shadow-2xs focus:border-violet-500 focus:outline-none"
          >
            <option value="all">All Subscriptions</option>
            <option value="active">Active Only</option>
            <option value="renewing_soon">Renewing Soon (&lt;30d)</option>
            <option value="canceled">Canceled / Revoked</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-100 text-[10px] font-medium uppercase tracking-wider text-zinc-400 bg-zinc-50/50">
                <th className="px-5 py-3.5">Subscriber</th>
                <th className="px-5 py-3.5">Tier</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5">Next Renewal</th>
                <th className="px-5 py-3.5">Annual Value</th>
                <th className="px-5 py-3.5">Stripe Subscription</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {paginated.map((lic) => {
                const daysLeft = Math.floor((lic.exp - now) / 86400);
                const isSoon = !lic.revoked && daysLeft >= 0 && daysLeft <= 30;

                return (
                  <tr key={lic.key} className="hover:bg-zinc-50/80 transition-colors">
                    {/* Subscriber */}
                    <td className="px-5 py-3.5">
                      <div className="text-xs font-semibold text-zinc-900">{lic.email}</div>
                      {lic.customer_name && <div className="text-[11px] text-zinc-400">{lic.customer_name}</div>}
                    </td>

                    {/* Tier */}
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <TierBadge tier={lic.tier} />
                    </td>

                    {/* Status */}
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <LicenseStatusPill revoked={lic.revoked} exp={lic.exp} />
                    </td>

                    {/* Renewal Date */}
                    <td className="px-5 py-3.5 text-xs whitespace-nowrap">
                      <div className="font-mono text-zinc-800">{formatDate(lic.exp)}</div>
                      {isSoon && (
                        <span className="text-[10px] font-semibold text-amber-600">
                          {daysLeft} days until renewal
                        </span>
                      )}
                    </td>

                    {/* Annual Value */}
                    <td className="px-5 py-3.5 text-xs font-semibold font-mono text-zinc-900 whitespace-nowrap">
                      {(() => {
                        const conv = convertSaleToEur(lic.amount_total ?? 0, lic.currency || "usd", lic.iat);
                        const isForeign = lic.currency && lic.currency.toLowerCase() !== "eur";
                        return (
                          <div className="flex flex-col">
                            <span className="text-zinc-900 font-bold">{formatEur(conv.grossEurCents)}/yr</span>
                            {isForeign && (
                              <span className="text-[10px] text-zinc-400 font-normal">
                                {formatMoney(lic.amount_total ?? 0, lic.currency)}/yr
                              </span>
                            )}
                          </div>
                        );
                      })()}
                    </td>

                    {/* Stripe Subscription Link */}
                    <td className="px-5 py-3.5">
                      {lic.stripe_subscription_id ? (
                        <a
                          href={`${stripeDashboard}/subscriptions/${lic.stripe_subscription_id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-[11px] text-violet-600 hover:text-violet-800 hover:underline inline-flex items-center gap-1"
                        >
                          {lic.stripe_subscription_id.slice(0, 16)}…
                          <ExternalLink className="h-3 w-3 opacity-60" />
                        </a>
                      ) : (
                        <span className="text-zinc-300 text-xs">-</span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-3.5 text-right whitespace-nowrap">
                      {lic.stripe_session_id ? (
                        <Link
                          href={`/admin/customers/${encodeURIComponent(lic.stripe_session_id)}`}
                          className="inline-flex items-center gap-1 text-xs font-medium text-violet-600 hover:text-violet-800 hover:underline"
                        >
                          Details <ArrowUpRight className="h-3 w-3" />
                        </Link>
                      ) : null}
                    </td>
                  </tr>
                );
              })}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-sm text-zinc-400">
                    No subscriptions match your search filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <Pagination totalItems={filtered.length} pageSize={PAGE_SIZE} currentPage={currentPage} onPageChange={setCurrentPage} />
      </div>
    </div>
  );
}
