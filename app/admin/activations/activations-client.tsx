"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { TierBadge, DomainHeartbeatPill } from "../_components/pills";
import { Pagination } from "../_components/pagination";
import { formatDateTime } from "../_components/format";
import type { DomainActivationItem } from "@/lib/admin-stats";
import {
  Globe,
  Search,
  ExternalLink,
  ShieldAlert,
  CheckCircle,
  Clock,
  Radio,
  ArrowUpRight,
} from "lucide-react";

export function ActivationsClient({
  domains,
  totalActivations,
  activeCount,
  staleCount,
  dormantCount,
  abuseCount,
}: {
  domains: DomainActivationItem[];
  totalActivations: number;
  activeCount: number;
  staleCount: number;
  dormantCount: number;
  abuseCount: number;
}) {
  const [q, setQ] = useState("");
  const [heartbeatFilter, setHeartbeatFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(() => {
    return domains.filter((d) => {
      if (q.trim()) {
        const query = q.trim().toLowerCase();
        const hay = `${d.siteUrl} ${d.email} ${d.customerName ?? ""} ${d.licenseKey}`.toLowerCase();
        if (!hay.includes(query)) return false;
      }
      if (heartbeatFilter === "active" && d.heartbeat !== "active") return false;
      if (heartbeatFilter === "stale" && d.heartbeat !== "stale") return false;
      if (heartbeatFilter === "dormant" && d.heartbeat !== "dormant") return false;
      if (heartbeatFilter === "abuse" && !d.isOverLimit) return false;
      return true;
    });
  }, [domains, q, heartbeatFilter]);

  const PAGE_SIZE = 15;
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, currentPage]);

  return (
    <div>
      {/* Metric Strip */}
      <div className="mb-6 grid grid-cols-2 lg:grid-cols-5 gap-3.5">
        <div className="rounded-2xl border border-zinc-200/80 bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between text-zinc-400 mb-1.5">
            <span className="text-xs font-medium uppercase tracking-wider">Total Domains</span>
            <Globe className="h-4 w-4 text-violet-500" />
          </div>
          <div className="text-2xl font-bold tracking-tight text-zinc-900 font-mono">
            {totalActivations}
          </div>
          <div className="text-[11px] text-zinc-400 mt-1">Unique sites ever tracked</div>
        </div>

        <div className="rounded-2xl border border-emerald-200/70 bg-emerald-50/40 p-4 shadow-xs">
          <div className="flex items-center justify-between text-emerald-700 mb-1.5">
            <span className="text-xs font-medium uppercase tracking-wider">Active &lt;7d</span>
            <Radio className="h-4 w-4 text-emerald-600 animate-pulse" />
          </div>
          <div className="text-2xl font-bold tracking-tight text-emerald-900 font-mono">
            {activeCount}
          </div>
          <div className="text-[11px] text-emerald-700 mt-1">Healthy weekly pings</div>
        </div>

        <div className="rounded-2xl border border-amber-200/70 bg-amber-50/40 p-4 shadow-xs">
          <div className="flex items-center justify-between text-amber-700 mb-1.5">
            <span className="text-xs font-medium uppercase tracking-wider">Stale 7–30d</span>
            <Clock className="h-4 w-4 text-amber-600" />
          </div>
          <div className="text-2xl font-bold tracking-tight text-amber-900 font-mono">
            {staleCount}
          </div>
          <div className="text-[11px] text-amber-700 mt-1">Check-in lagging</div>
        </div>

        <div className="rounded-2xl border border-zinc-200/80 bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between text-zinc-400 mb-1.5">
            <span className="text-xs font-medium uppercase tracking-wider">Dormant &gt;30d</span>
            <Clock className="h-4 w-4 text-zinc-400" />
          </div>
          <div className="text-2xl font-bold tracking-tight text-zinc-600 font-mono">
            {dormantCount}
          </div>
          <div className="text-[11px] text-zinc-400 mt-1">Staging or uninstalled</div>
        </div>

        <div className={`rounded-2xl border p-4 shadow-xs ${abuseCount > 0 ? "border-rose-200 bg-rose-50/50" : "border-zinc-200/80 bg-white"}`}>
          <div className="flex items-center justify-between text-zinc-400 mb-1.5">
            <span className={`text-xs font-medium uppercase tracking-wider ${abuseCount > 0 ? "text-rose-700" : ""}`}>Abuse Sentinel</span>
            <ShieldAlert className={`h-4 w-4 ${abuseCount > 0 ? "text-rose-600" : "text-zinc-400"}`} />
          </div>
          <div className={`text-2xl font-bold tracking-tight font-mono ${abuseCount > 0 ? "text-rose-900" : "text-zinc-900"}`}>
            {abuseCount}
          </div>
          <div className={`text-[11px] mt-1 ${abuseCount > 0 ? "text-rose-700 font-medium" : "text-zinc-400"}`}>
            {abuseCount > 0 ? "Single-site multi-domains" : "No violations flagged"}
          </div>
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
            placeholder="Search domain URL, customer email, name…"
            className="w-full rounded-xl border border-zinc-200/80 bg-white pl-9 pr-3 py-2 text-xs text-zinc-900 placeholder:text-zinc-400 shadow-2xs focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <select
            value={heartbeatFilter}
            onChange={(e) => { setHeartbeatFilter(e.target.value); setCurrentPage(1); }}
            className="rounded-xl border border-zinc-200/80 bg-white px-3 py-2 text-zinc-700 shadow-2xs focus:border-violet-500 focus:outline-none"
          >
            <option value="all">All Heartbeats</option>
            <option value="active">🟢 Active (&lt;7 days)</option>
            <option value="stale">🟡 Stale (7–30 days)</option>
            <option value="dormant">⚪ Dormant (&gt;30 days)</option>
            <option value="abuse">⚠️ Abuse Violations Only</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-100 text-[10px] font-medium uppercase tracking-wider text-zinc-400 bg-zinc-50/50">
                <th className="px-5 py-3.5">WordPress Site Domain</th>
                <th className="px-5 py-3.5">Heartbeat</th>
                <th className="px-5 py-3.5">Customer / License</th>
                <th className="px-5 py-3.5">Plan Tier</th>
                <th className="px-5 py-3.5">Last Seen (UTC)</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {paginated.map((d, i) => {
                return (
                  <tr key={i} className="hover:bg-zinc-50/80 transition-colors">
                    {/* Domain */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <a
                          href={d.siteUrl.startsWith("http") ? d.siteUrl : `https://${d.siteUrl}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-xs font-semibold text-zinc-900 hover:text-violet-600 hover:underline flex items-center gap-1"
                        >
                          {d.siteUrl}
                          <ExternalLink className="h-3 w-3 opacity-40 hover:opacity-100" />
                        </a>
                        {d.isOverLimit && (
                          <span className="inline-flex items-center gap-1 rounded-full border border-rose-200 bg-rose-50 px-2 py-0.5 text-[9px] font-bold text-rose-700 uppercase">
                            Multi-domain alert
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Heartbeat */}
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <DomainHeartbeatPill status={d.heartbeat} />
                    </td>

                    {/* Customer */}
                    <td className="px-5 py-3.5">
                      <div className="text-xs font-medium text-zinc-900">{d.email}</div>
                      {d.customerName && <div className="text-[10px] text-zinc-400">{d.customerName}</div>}
                    </td>

                    {/* Tier */}
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <TierBadge tier={d.tier} />
                    </td>

                    {/* Last Seen */}
                    <td className="px-5 py-3.5 text-xs text-zinc-500 whitespace-nowrap font-mono">
                      {formatDateTime(d.lastSeenAt)}
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-3.5 text-right whitespace-nowrap">
                      {d.stripeSessionId ? (
                        <Link
                          href={`/admin/customers/${encodeURIComponent(d.stripeSessionId)}`}
                          className="inline-flex items-center gap-1 text-xs font-medium text-violet-600 hover:text-violet-800 hover:underline"
                        >
                          Customer <ArrowUpRight className="h-3 w-3" />
                        </Link>
                      ) : (
                        <Link
                          href={`/admin/customers?q=${encodeURIComponent(d.email)}`}
                          className="text-xs font-medium text-violet-600 hover:underline"
                        >
                          Customer
                        </Link>
                      )}
                    </td>
                  </tr>
                );
              })}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-sm text-zinc-400">
                    No domains match your filters.
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
