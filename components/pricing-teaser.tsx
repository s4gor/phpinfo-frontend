"use client";

import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

const tiers = [
  { id: "single",    name: "Single",    price: "$39",  cadence: "/year", blurb: "1 site you own" },
  { id: "unlimited", name: "Unlimited", price: "$79",  cadence: "/year", blurb: "Unlimited sites", featured: true },
  { id: "lifetime",  name: "Lifetime",  price: "$249", cadence: "once",  blurb: "Pays for itself in 3 years" },
];

export default function PricingTeaser() {
  return (
    <div
      className="flex w-full max-w-3xl flex-col items-center gap-3 pt-8 md:pt-12">
      <div
        className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3">
        {tiers.map((t) => (
          <Link
            key={t.id}
            href="#pricing"
            className={cn(
              "group flex flex-col rounded-lg border bg-white/60 px-4 py-3 text-left transition-all dark:bg-zinc-900/60",
              t.featured
                ? "border-violet-400/40 shadow-[0_0_30px_-10px_rgba(167,139,250,0.35)] hover:border-violet-300/60 dark:border-violet-600/50"
                : "border-zinc-200 hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700"
            )}>
            <div className="flex items-baseline justify-between">
              <span className={cn(
                "text-[10px] font-bold uppercase tracking-wider",
                t.featured ? "text-violet-700 dark:text-violet-400" : "text-zinc-600 dark:text-zinc-400"
              )}>
                {t.name}
                {t.featured ? <span className="ml-1.5 text-violet-700/80 dark:text-violet-400/80">· popular</span> : null}
              </span>
              <span className="flex items-baseline gap-0.5">
                <span className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{t.price}</span>
                <span className="text-[11px] text-zinc-500 dark:text-zinc-400">{t.cadence}</span>
              </span>
            </div>
            <div className="mt-0.5 text-xs text-zinc-600 dark:text-zinc-400">{t.blurb}</div>
          </Link>
        ))}
      </div>

      <div>
        <Link
          href="#compare"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-violet-700 transition hover:text-violet-800 dark:text-violet-400 dark:hover:text-violet-300">
          Compare plans
          <ArrowDown className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
