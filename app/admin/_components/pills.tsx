import React from "react";
import { tierLabel } from "./format";

export function TierBadge({ tier }: { tier: string }) {
  const s: Record<string, string> = {
    single:    "bg-violet-50 text-violet-700 border-violet-200/80",
    unlimited: "bg-cyan-50 text-cyan-700 border-cyan-200/80",
    lifetime:  "bg-emerald-50 text-emerald-700 border-emerald-200/80",
  };
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${s[tier] ?? "bg-zinc-100 text-zinc-600 border-zinc-200"}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {tierLabel(tier)}
    </span>
  );
}

export function EmailPill({ status }: { status?: string }) {
  const map: Record<string, { label: string; cls: string }> = {
    delivered:  { label: "delivered",  cls: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    sent:       { label: "sent",       cls: "bg-sky-50 text-sky-700 border-sky-200" },
    pending:    { label: "pending",    cls: "bg-zinc-100 text-zinc-700 border-zinc-200" },
    bounced:    { label: "bounced",    cls: "bg-red-50 text-red-700 border-red-200" },
    complained: { label: "complained", cls: "bg-red-50 text-red-700 border-red-200" },
    failed:     { label: "failed",     cls: "bg-red-50 text-red-700 border-red-200" },
  };
  const v = map[status ?? "pending"] ?? map.pending;
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide ${v.cls}`}>
      {v.label}
    </span>
  );
}

export function LicenseStatusPill({
  revoked,
  exp,
}: {
  revoked?: boolean;
  exp: number;
}) {
  const now = Math.floor(Date.now() / 1000);
  let label: string;
  let cls: string;
  if (revoked) {
    label = "revoked";
    cls = "bg-rose-50 text-rose-700 border-rose-200";
  } else if (exp < now) {
    label = "expired";
    cls = "bg-amber-50 text-amber-700 border-amber-200";
  } else {
    label = "active";
    cls = "bg-emerald-50 text-emerald-700 border-emerald-200";
  }
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${cls}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" />
      {label}
    </span>
  );
}

export function DomainHeartbeatPill({ status }: { status: "active" | "stale" | "dormant" }) {
  if (status === "active") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[10px] font-medium text-emerald-700">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        Active (&lt;7d)
      </span>
    );
  }
  if (status === "stale") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-[10px] font-medium text-amber-700">
        <span className="h-2 w-2 rounded-full bg-amber-400" />
        Stale (7–30d)
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-100 px-2.5 py-0.5 text-[10px] font-medium text-zinc-600">
      <span className="h-2 w-2 rounded-full bg-zinc-400" />
      Dormant (&gt;30d)
    </span>
  );
}

export function SubscriptionStatusPill({ status }: { status?: string }) {
  const map: Record<string, { label: string; cls: string }> = {
    active:     { label: "Active",     cls: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    trialing:   { label: "Trialing",   cls: "bg-sky-50 text-sky-700 border-sky-200" },
    past_due:   { label: "Past Due",   cls: "bg-amber-50 text-amber-700 border-amber-200" },
    canceled:   { label: "Canceled",   cls: "bg-zinc-100 text-zinc-600 border-zinc-200" },
    unpaid:     { label: "Unpaid",     cls: "bg-rose-50 text-rose-700 border-rose-200" },
    incomplete: { label: "Incomplete", cls: "bg-zinc-100 text-zinc-500 border-zinc-200" },
  };
  const v = map[status ?? "active"] ?? { label: status ?? "unknown", cls: "bg-zinc-100 text-zinc-600 border-zinc-200" };
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider ${v.cls}`}>
      {v.label}
    </span>
  );
}
