"use client";

import { useState, useMemo } from "react";
import { formatDateTime } from "../_components/format";
import { Pagination } from "../_components/pagination";
import type { AuditEntry } from "@/lib/db";
import {
  History,
  Search,
  Key,
  ShieldCheck,
  RotateCcw,
  Ban,
  Mail,
  PlusCircle,
  Copy,
  Check,
} from "lucide-react";
import { toast } from "sonner";

export function AuditClient({ initialLogs }: { initialLogs: AuditEntry[] }) {
  const [q, setQ] = useState("");
  const [actionFilter, setActionFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return initialLogs.filter((entry) => {
      if (actionFilter !== "all" && entry.action !== actionFilter) return false;
      if (q.trim()) {
        const query = q.trim().toLowerCase();
        const detailsStr = entry.details ? JSON.stringify(entry.details).toLowerCase() : "";
        const hay = `${entry.actor} ${entry.action} ${entry.target} ${detailsStr}`.toLowerCase();
        if (!hay.includes(query)) return false;
      }
      return true;
    });
  }, [initialLogs, q, actionFilter]);

  const pageSize = 15;
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, currentPage]);

  function copyText(text: string) {
    navigator.clipboard.writeText(text);
    setCopiedKey(text);
    toast.success("Target key copied to clipboard");
    setTimeout(() => setCopiedKey(null), 2000);
  }

  function getActionBadge(action: string) {
    switch (action) {
      case "manual_issue":
        return (
          <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-700 uppercase">
            <PlusCircle className="h-3 w-3" /> Manual Issue
          </span>
        );
      case "extend":
        return (
          <span className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-[10px] font-semibold text-amber-700 uppercase">
            <ClockIcon className="h-3 w-3" /> Extend Expiry
          </span>
        );
      case "revoke":
        return (
          <span className="inline-flex items-center gap-1 rounded-full border border-rose-200 bg-rose-50 px-2.5 py-0.5 text-[10px] font-semibold text-rose-700 uppercase">
            <Ban className="h-3 w-3" /> Revoke
          </span>
        );
      case "unrevoke":
        return (
          <span className="inline-flex items-center gap-1 rounded-full border border-cyan-200 bg-cyan-50 px-2.5 py-0.5 text-[10px] font-semibold text-cyan-700 uppercase">
            <RotateCcw className="h-3 w-3" /> Unrevoke
          </span>
        );
      case "resend-email":
      case "resend_email":
        return (
          <span className="inline-flex items-center gap-1 rounded-full border border-violet-200 bg-violet-50 px-2.5 py-0.5 text-[10px] font-semibold text-violet-700 uppercase">
            <Mail className="h-3 w-3" /> Resend Email
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 rounded-full border border-zinc-200 bg-zinc-100 px-2.5 py-0.5 text-[10px] font-semibold text-zinc-700 uppercase">
            {action}
          </span>
        );
    }
  }

  return (
    <div>
      {/* Search & Filter Toolbar */}
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            value={q}
            onChange={(e) => { setQ(e.target.value); setCurrentPage(1); }}
            placeholder="Search actor email, action, license key, or details…"
            className="w-full rounded-xl border border-zinc-200/80 bg-white pl-9 pr-3 py-2 text-xs text-zinc-900 placeholder:text-zinc-400 shadow-2xs focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <select
            value={actionFilter}
            onChange={(e) => { setActionFilter(e.target.value); setCurrentPage(1); }}
            className="rounded-xl border border-zinc-200/80 bg-white px-3 py-2 text-zinc-700 shadow-2xs focus:border-violet-500 focus:outline-none"
          >
            <option value="all">All Actions</option>
            <option value="manual_issue">Manual Issue</option>
            <option value="extend">Extend Expiry</option>
            <option value="revoke">Revoke</option>
            <option value="unrevoke">Unrevoke</option>
            <option value="resend-email">Resend Email</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-100 text-[10px] font-medium uppercase tracking-wider text-zinc-400 bg-zinc-50/50">
                <th className="px-5 py-3.5">Timestamp (UTC)</th>
                <th className="px-5 py-3.5">Action</th>
                <th className="px-5 py-3.5">Actor</th>
                <th className="px-5 py-3.5">Target Key</th>
                <th className="px-5 py-3.5">Metadata & Diff</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {paginated.map((entry, i) => {
                return (
                  <tr key={i} className="hover:bg-zinc-50/80 transition-colors">
                    {/* Timestamp */}
                    <td className="px-5 py-3.5 text-xs text-zinc-500 whitespace-nowrap font-mono">
                      {formatDateTime(entry.ts)}
                    </td>

                    {/* Action Badge */}
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      {getActionBadge(entry.action)}
                    </td>

                    {/* Actor */}
                    <td className="px-5 py-3.5 text-xs font-medium text-zinc-900">
                      {entry.actor}
                    </td>

                    {/* Target Key */}
                    <td className="px-5 py-3.5">
                      <button
                        onClick={() => copyText(entry.target)}
                        className="inline-flex items-center gap-1 rounded-md border border-zinc-200 bg-zinc-50 px-2 py-1 text-[11px] font-mono text-zinc-600 hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700 transition-colors"
                        title="Click to copy target license key"
                      >
                        {copiedKey === entry.target ? (
                          <>
                            <Check className="h-3 w-3 text-emerald-600" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3 text-zinc-400" />
                            <span>{entry.target.slice(0, 12)}…</span>
                          </>
                        )}
                      </button>
                    </td>

                    {/* Metadata Details */}
                    <td className="px-5 py-3.5 max-w-xs">
                      {entry.details ? (
                        <div className="flex flex-wrap gap-1 text-[11px]">
                          {Object.entries(entry.details).map(([k, v]) => (
                            <span
                              key={k}
                              className="rounded border border-zinc-100 bg-zinc-50 px-1.5 py-0.5 font-mono text-zinc-600"
                            >
                              <strong className="text-zinc-400">{k}:</strong> {String(v)}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-zinc-300 text-xs">-</span>
                      )}
                    </td>
                  </tr>
                );
              })}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center text-sm text-zinc-400">
                    No audit records match your query.
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

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
