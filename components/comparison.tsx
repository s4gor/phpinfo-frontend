"use client";

import { Check, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

type Cell = boolean | string;

interface Row {
  label: string;
  free: Cell;
  single: Cell;
  unlimited: Cell;
  lifetime: Cell;
}

const rows: Row[] = [
  // Sites & licensing
  { label: "Sites", free: "1", single: "1", unlimited: "Unlimited", lifetime: "Unlimited" },
  { label: "Updates", free: "While free version is supported", single: "1 year", unlimited: "1 year", lifetime: "Lifetime" },
  { label: "Support", free: "Community (WP.org forum)", single: "Email", unlimited: "Priority email", lifetime: "Priority forever" },
  { label: "Early Beta Access (Pre-release builds)", free: false, single: false, unlimited: false, lifetime: true },

  // Free-tier features
  { label: "phpinfo() viewer", free: true, single: true, unlimited: true, lifetime: true },
  { label: ".htaccess editor", free: true, single: true, unlimited: true, lifetime: true },
  { label: "PHP EOL Timeline", free: true, single: true, unlimited: true, lifetime: true },
  { label: "Config Grade & Score", free: true, single: true, unlimited: true, lifetime: true },
  { label: "Troubleshooting Mode (Per-user)", free: true, single: true, unlimited: true, lifetime: true },
  { label: "PHP Compatibility Scanner (PHP 7.4-8.4)", free: true, single: true, unlimited: true, lifetime: true },

  // Pro depth & Version 8.0
  { label: "Update Guard Suite (Pre/Post update health checks)", free: false, single: true, unlimited: true, lifetime: true },
  { label: "Admin Security Activity Log (Real IP & logins)", free: false, single: true, unlimited: true, lifetime: true },
  { label: "Autoload Bloat & Missing MySQL Index Scanner", free: false, single: true, unlimited: true, lifetime: true },
  { label: "Live OPcache & Object Cache Telemetry", free: false, single: true, unlimited: true, lifetime: true },
  { label: "Detailed Directives & 1-Click Fixes", free: false, single: true, unlimited: true, lifetime: true },
  { label: "Web Server Snippet Library with Rollback", free: false, single: true, unlimited: true, lifetime: true },
  { label: "Security Headers audit", free: false, single: true, unlimited: true, lifetime: true },
  { label: "SSL certificate monitor", free: false, single: true, unlimited: true, lifetime: true },
  { label: "Error Log viewer", free: false, single: true, unlimited: true, lifetime: true },
  { label: "WP-Cron monitor & queue health", free: false, single: true, unlimited: true, lifetime: true },
  { label: "Mail deliverability check", free: false, single: true, unlimited: true, lifetime: true },

  // Deliverable & integrations
  { label: "Plain-English Directive Fix Guides", free: false, single: true, unlimited: true, lifetime: true },
  { label: "Email alerts on issues", free: false, single: true, unlimited: true, lifetime: true },
  { label: "External API Monitor", free: false, single: "1 Endpoint", unlimited: true, lifetime: true },
  { label: "Config Snapshots & diff", free: false, single: "Latest 3", unlimited: true, lifetime: true },
  { label: "PDF Audit Reports", free: false, single: "Branded", unlimited: "White-label", lifetime: "White-label" },
  { label: "Weekly health digest", free: false, single: false, unlimited: true, lifetime: true },
  { label: "Slack / Discord webhooks", free: false, single: false, unlimited: true, lifetime: true },
  { label: "Multi-site (Network) support", free: false, single: false, unlimited: true, lifetime: true },
];

const cols: Array<{
  id: "free" | "single" | "unlimited" | "lifetime";
  name: string;
  price: string;
  cadence: string;
  subprice?: string;
  featured?: boolean;
}> = [
  { id: "free", name: "Free", price: "$0", cadence: "WP.org" },
  { id: "single", name: "Single Site", price: "$39", cadence: "/year" },
  { id: "unlimited", name: "Unlimited", price: "$79", cadence: "/year", featured: true },
  { id: "lifetime", name: "Lifetime", price: "$249", cadence: "once", subprice: "Pays for itself in 3 yrs" },
];

export default function Comparison() {
  return (
    <div
      id="compare"
      className="flex w-full max-w-5xl flex-col gap-2 pt-16 md:pt-24">
      <h2
        className="max-w-4xl mx-auto text-center text-2xl font-medium tracking-tight text-zinc-800 md:text-3xl">
        Compare plans
      </h2>
      <p
        className="mx-auto max-w-[34rem] text-center text-base text-zinc-700 sm:text-lg">
        Everything in Free, plus the Pro depth - see exactly what you get at each tier.
      </p>

      <div
        className="mt-8 rounded-xl border border-zinc-200 bg-white shadow-xs">
        <div className="overflow-x-auto sm:overflow-x-visible">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm bg-white">
            <thead className="sticky top-[var(--header-height,0px)] z-20 transition-[top] duration-300 ease-in-out will-change-[top]">
              <tr className="border-b border-zinc-200 bg-white/95 backdrop-blur-md shadow-xs">
                <th className="sticky top-[var(--header-height,0px)] z-20 px-4 py-4 text-xs font-medium uppercase tracking-wider text-zinc-500 bg-white/95 backdrop-blur-md first:rounded-tl-xl transition-[top] duration-300 ease-in-out will-change-[top]">
                  Feature
                </th>
                {cols.map((c) => (
                  <th
                    key={c.id}
                    className={cn(
                      "sticky top-[var(--header-height,0px)] z-20 px-4 py-4 text-center backdrop-blur-md transition-[top] duration-300 ease-in-out will-change-[top]",
                      c.featured ? "bg-violet-50/95" : "bg-white/95",
                    )}>
                    <div className="text-xs font-bold uppercase tracking-wider text-zinc-600">
                      {c.name}
                    </div>
                    <div className="mt-1 flex items-baseline justify-center gap-1">
                      <span className="text-2xl font-semibold text-zinc-900">{c.price}</span>
                      <span className="text-xs text-zinc-500">{c.cadence}</span>
                    </div>
                    {c.subprice ? (
                      <div className="text-[10px] font-semibold text-emerald-600 mt-0.5">
                        {c.subprice}
                      </div>
                    ) : null}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white">
              {rows.map((r, i) => (
                <tr
                  key={i}
                  className={cn(
                    "border-b border-zinc-200/60 transition-colors hover:bg-zinc-50",
                    i === rows.length - 1 && "border-b-0",
                  )}>
                  <td className="px-4 py-3 text-zinc-700">{r.label}</td>
                  {(["free", "single", "unlimited", "lifetime"] as const).map((id) => {
                    const v = r[id];
                    const featured = id === "unlimited";
                    return (
                      <td
                        key={id}
                        className={cn(
                          "px-4 py-3 text-center",
                          featured && "bg-violet-500/[0.03]",
                        )}>
                        {typeof v === "boolean" ? (
                          v ? (
                            <Check className="mx-auto h-4 w-4 text-violet-600" />
                          ) : (
                            <Minus className="mx-auto h-4 w-4 text-zinc-300" />
                          )
                        ) : (
                          <span className="text-xs text-zinc-700">{v}</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
