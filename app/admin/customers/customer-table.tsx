"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { TierBadge, LicenseStatusPill, EmailPill } from "../_components/pills";
import { formatDate, formatMoney, formatEur } from "../_components/format";
import { convertSaleToEur } from "@/lib/currency";
import { IssueLicenseModal } from "./_components/issue-license-modal";
import { Pagination } from "../_components/pagination";
import { toast } from "sonner";
import {
  Search,
  Filter,
  Download,
  PlusCircle,
  Copy,
  Check,
  ExternalLink,
  Globe,
  ArrowUpRight,
  ShieldCheck,
  X,
} from "lucide-react";
import type { LicenseRecord } from "@/lib/db";

export function CustomerTable({
  initialLicenses,
}: {
  initialLicenses: LicenseRecord[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [q, setQ] = useState(searchParams.get("q") || "");
  const [tier, setTier] = useState(searchParams.get("tier") || "all");
  const [status, setStatus] = useState(searchParams.get("status") || "all");
  const [isIssueModalOpen, setIsIssueModalOpen] = useState(
    searchParams.get("action") === "issue"
  );
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const now = Math.floor(Date.now() / 1000);

  const filtered = useMemo(() => {
    return initialLicenses.filter((r) => {
      if (q.trim()) {
        const query = q.trim().toLowerCase();
        const hay = `${r.email} ${r.customer_name ?? ""} ${r.key} ${r.stripe_customer_id ?? ""} ${r.stripe_session_id ?? ""}`.toLowerCase();
        const acts = (r.activations ?? []).map((a) => a.site_url.toLowerCase()).join(" ");
        if (!hay.includes(query) && !acts.includes(query)) return false;
      }
      if (tier !== "all" && r.tier !== tier) return false;
      if (status === "active" && (r.revoked || r.exp < now)) return false;
      if (status === "expired" && (r.revoked || r.exp >= now)) return false;
      if (status === "revoked" && !r.revoked) return false;
      if (status === "expiring_soon") {
        const daysLeft = (r.exp - now) / 86400;
        if (r.revoked || r.exp < now || r.tier === "lifetime" || daysLeft > 30) return false;
      }
      return true;
    });
  }, [initialLicenses, q, tier, status, now]);

    const pageSize = 15;
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, currentPage]);

  function copyKey(key: string) {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    toast.success("License key copied to clipboard");
    setTimeout(() => setCopiedKey(null), 2000);
  }

  return (
    <div>
      <IssueLicenseModal
        isOpen={isIssueModalOpen}
        onClose={() => setIsIssueModalOpen(false)}
        onSuccess={() => {
          setIsIssueModalOpen(false);
          router.refresh();
        }}
      />

      {/* Control Toolbar */}
      <div className="mb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            value={q}
            onChange={(e) => { setQ(e.target.value); setCurrentPage(1); }}
            placeholder="Search email, name, domain, license key, Stripe ID…"
            className="w-full rounded-xl border border-zinc-200/80 bg-white pl-9 pr-8 py-2 text-xs text-zinc-900 placeholder:text-zinc-400 shadow-2xs focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
          />
          {q && (
            <button
              onClick={() => setQ("")}
              className="absolute right-2.5 top-2.5 text-zinc-400 hover:text-zinc-600"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Filter Controls & Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Tier Filter */}
          <select
            value={tier}
            onChange={(e) => { setTier(e.target.value); setCurrentPage(1); }}
            className="rounded-xl border border-zinc-200/80 bg-white px-3 py-2 text-zinc-700 shadow-2xs focus:border-violet-500 focus:outline-none"
          >
            <option value="all">All Tiers</option>
            <option value="single">Single Site</option>
            <option value="unlimited">Unlimited</option>
            <option value="lifetime">Lifetime</option>
          </select>

          {/* Status Filter */}
          <select
            value={status}
            onChange={(e) => { setStatus(e.target.value); setCurrentPage(1); }}
            className="rounded-xl border border-zinc-200/80 bg-white px-3 py-2 text-zinc-700 shadow-2xs focus:border-violet-500 focus:outline-none"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="expiring_soon">Expiring Soon (&lt;30d)</option>
            <option value="expired">Expired</option>
            <option value="revoked">Revoked</option>
          </select>

          {/* CSV Export */}
          <a
            href="/api/admin/export/customers"
            className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200/90 bg-white px-3 py-2 font-medium text-zinc-700 shadow-2xs hover:bg-zinc-50 transition-colors"
          >
            <Download className="h-3.5 w-3.5 text-zinc-400" />
            Export CSV
          </a>

          {/* Issue License Button */}
          <button
            onClick={() => setIsIssueModalOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-xl bg-violet-600 px-3 py-2 font-semibold text-white shadow-2xs hover:bg-violet-500 transition-colors"
          >
            <PlusCircle className="h-3.5 w-3.5" />
            Issue License
          </button>
        </div>
      </div>

      {/* Counter summary */}
      <div className="mb-3 flex items-center justify-between text-xs text-zinc-500 px-1">
        <span>
          Showing <strong className="text-zinc-900">{filtered.length}</strong> of {initialLicenses.length} licenses
        </span>
        {(q || tier !== "all" || status !== "all") && (
          <button
            onClick={() => { setQ(""); setTier("all"); setStatus("all"); setCurrentPage(1); }}
            className="text-violet-600 hover:underline"
          >
            Reset filters
          </button>
        )}
      </div>

      {/* Data Table */}
      <div className="overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-100 text-[10px] font-medium uppercase tracking-wider text-zinc-400 bg-zinc-50/50">
                <th className="px-5 py-3.5">Customer</th>
                <th className="px-5 py-3.5">Tier</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5">Activations</th>
                <th className="px-5 py-3.5">Expiry</th>
                <th className="px-5 py-3.5">Amount</th>
                <th className="px-5 py-3.5">Key</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {paginated.map((r) => {
                const acts = r.activations ?? [];
                const uniqueDomains = Array.from(new Set(acts.map((a) => a.site_url.toLowerCase().replace(/\/+$/, ""))));
                const daysLeft = Math.floor((r.exp - now) / 86400);
                const isExpiringSoon = !r.revoked && r.tier !== "lifetime" && daysLeft >= 0 && daysLeft <= 30;

                const initials = (r.customer_name || r.email)
                  .split(/[@\s]/)[0]
                  .slice(0, 2)
                  .toUpperCase();

                return (
                  <tr key={r.key} className="hover:bg-zinc-50/80 transition-colors group">
                    {/* Customer */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-50 text-[11px] font-bold text-violet-700 border border-violet-100">
                          {initials}
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-semibold text-zinc-900 truncate">{r.email}</div>
                          <div className="text-[11px] text-zinc-400 truncate">
                            {r.customer_name ? r.customer_name : formatDate(r.iat)}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Tier */}
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <TierBadge tier={r.tier} />
                    </td>

                    {/* Status */}
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <LicenseStatusPill revoked={r.revoked} exp={r.exp} />
                    </td>

                    {/* Activations */}
                    <td className="px-5 py-3.5 max-w-[170px]">
                      {uniqueDomains.length > 0 ? (
                        <div className="flex items-center gap-1.5" title={uniqueDomains.join(", ")}>
                          <Globe className="h-3 w-3 text-zinc-400 shrink-0" />
                          <span className="font-mono text-xs text-zinc-700 truncate">
                            {uniqueDomains.length} {uniqueDomains.length === 1 ? "site" : "sites"}
                          </span>
                        </div>
                      ) : (
                        <span className="text-[11px] text-zinc-300">No activations</span>
                      )}
                    </td>

                    {/* Expiry */}
                    <td className="px-5 py-3.5 text-xs whitespace-nowrap">
                      {r.tier === "lifetime" ? (
                        <span className="font-medium text-emerald-700">Never</span>
                      ) : (
                        <div>
                          <div className="font-mono text-zinc-700">{formatDate(r.exp)}</div>
                          {isExpiringSoon && (
                            <span className="text-[10px] font-semibold text-amber-600">
                              {daysLeft}d left
                            </span>
                          )}
                        </div>
                      )}
                    </td>

                    {/* Amount in EUR (ECB conversion on sale date) */}
                    <td className="px-5 py-3.5 text-xs font-semibold font-mono text-zinc-900 whitespace-nowrap">
                      {(() => {
                        const conv = convertSaleToEur(r.amount_total ?? 0, r.currency || "usd", r.iat);
                        const isForeign = r.currency && r.currency.toLowerCase() !== "eur";
                        return (
                          <div className="flex flex-col">
                            <span className="text-zinc-950 font-bold">{formatEur(conv.grossEurCents)}</span>
                            {isForeign && (
                              <span className="text-[10px] text-zinc-400 font-normal">
                                {formatMoney(r.amount_total ?? 0, r.currency)}
                              </span>
                            )}
                          </div>
                        );
                      })()}
                    </td>

                    {/* License Key Quick Copy */}
                    <td className="px-5 py-3.5 max-w-[120px]">
                      <button
                        onClick={() => copyKey(r.key)}
                        className="inline-flex items-center gap-1 rounded-md border border-zinc-200 bg-zinc-50 px-2 py-1 text-[11px] font-mono text-zinc-600 hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700 transition-colors"
                        title="Click to copy full license key"
                      >
                        {copiedKey === r.key ? (
                          <>
                            <Check className="h-3 w-3 text-emerald-600" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3 text-zinc-400" />
                            <span>{r.key.slice(0, 8)}…</span>
                          </>
                        )}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-3.5 text-right whitespace-nowrap">
                      {r.stripe_session_id ? (
                        <Link
                          href={`/admin/customers/${encodeURIComponent(r.stripe_session_id)}`}
                          className="inline-flex items-center gap-1 rounded-lg bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-700 hover:bg-violet-50 hover:text-violet-700 transition-colors"
                        >
                          Manage <ArrowUpRight className="h-3 w-3" />
                        </Link>
                      ) : (
                        <span className="text-[11px] text-zinc-400 font-mono">Manual</span>
                      )}
                    </td>
                  </tr>
                );
              })}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-5 py-12 text-center text-sm text-zinc-400">
                    No customers match your search filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* 15-Item Pagination */}
        <Pagination
          totalItems={filtered.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
