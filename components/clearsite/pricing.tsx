"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Check, ShieldCheck, Lock, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { containerVariants, itemVariants } from "@/lib/animation-variants";
import { CLEARSITE_CHROME_STORE_URL } from "@/lib/clearsite";

const WAITLIST_MAILTO =
  "mailto:support@exeebit.com?subject=ClearSite%20Pro%20early%20access&body=I'd%20like%20early%20access%20to%20ClearSite%20Pro.";

// Early-bird launch offer. Update `claimed` from a real source when checkout
// goes live; 0 is the honest starting point at launch.
const EARLY_BIRD_CAP = 500;
const EARLY_BIRD_PRICE = "$14.99";
const LIFETIME_PRICE = "$24.99";

type PlanId = "free" | "annual" | "lifetime";

const plans: Array<{
  id: PlanId;
  name: string;
  price: string;
  cadence: string;
  blurb: string;
  features: string[];
  cta: string;
  featured?: boolean;
}> = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    cadence: "forever",
    blurb: "Everything you need for surgical, per-site erasure.",
    cta: "Add to Chrome",
    features: [
      "Full site erasure - history, cookies, cache, storage",
      "Replaces chrome://history",
      "Quick Clean presets",
      "30-second undo buffer",
      "Whitelist & auto-cleanup rules",
      "Never-log block list",
      "1 free footprint breakdown / week",
    ],
  },
  {
    id: "annual",
    name: "Pro · Annual",
    price: "$9.99",
    cadence: "/year",
    blurb: "For the hesitant. Renews yearly, cancel anytime.",
    cta: "Get Annual",
    features: [
      "Everything in Free",
      "Unlimited footprint breakdown",
      "Smart Category erasure",
      "Panic Clean (⌘⇧E)",
      "Handoff Mode",
      "Priority support",
    ],
  },
  {
    id: "lifetime",
    name: "Pro · Lifetime",
    price: LIFETIME_PRICE,
    cadence: "once",
    blurb: "Pay once, own it forever. The obvious choice.",
    cta: "Get Lifetime",
    featured: true,
    features: [
      "Everything in Annual",
      "Lifetime updates",
      "One-time payment - no renewals",
      "All future Pro features included",
      "Priority support",
    ],
  },
];

export default function ClearSitePricing() {
  const [claimed, setClaimed] = useState<number>(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Optional: wire to a real endpoint later. Fails silently → counter shows 0.
  useEffect(() => {
    let cancelled = false;
    fetch("/api/clearsite/pricing-stats", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!cancelled && d && typeof d.lifetimeClaimed === "number") {
          setClaimed(d.lifetimeClaimed);
        }
      })
      .catch(() => {
        /* silent - counter stays at launch value */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const remaining = Math.max(0, EARLY_BIRD_CAP - claimed);
  const earlyBirdActive = remaining > 0;
  const pct = Math.min(100, (claimed / EARLY_BIRD_CAP) * 100);

  const handleCta = (id: PlanId) => {
    if (id === "free") {
      window.open(CLEARSITE_CHROME_STORE_URL, "_blank", "noopener");
      return;
    }
    // Pro checkout not live yet → early-access waitlist.
    window.location.href = WAITLIST_MAILTO;
  };

  return (
    <motion.div
      id="pricing"
      ref={sectionRef}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="flex w-full max-w-5xl scroll-mt-32 flex-col gap-2 pt-24 md:scroll-mt-36">
      <motion.p
        variants={itemVariants}
        className="text-center text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
        Pricing
      </motion.p>
      <motion.h2
        variants={itemVariants}
        className="text-center text-3xl font-semibold tracking-tight text-zinc-900">
        Free to start. Pro when you need more.
      </motion.h2>
      <motion.p
        variants={itemVariants}
        className="mx-auto max-w-md pt-1 text-center text-sm text-zinc-600">
        Try every Pro feature free for 7 days - no card required.
      </motion.p>

      {/* Early-bird banner */}
      {earlyBirdActive && (
        <motion.div
          variants={itemVariants}
          className="mx-auto mt-5 flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-4 py-1.5 text-xs font-semibold text-amber-700">
          <Sparkles className="h-3.5 w-3.5" />
          Launch offer: Lifetime {EARLY_BIRD_PRICE} for the first {EARLY_BIRD_CAP} buyers
        </motion.div>
      )}

      <motion.div
        variants={itemVariants}
        className="mt-8 grid w-full grid-cols-1 items-stretch gap-4 md:grid-cols-3 md:gap-5">
        {plans.map((plan) => {
          const isLifetime = plan.id === "lifetime";
          const showEarlyBird = isLifetime && earlyBirdActive;
          return (
            <div
              key={plan.id}
              className={cn(
                "relative flex flex-col rounded-xl border bg-white p-6 transition-all duration-200",
                plan.featured
                  ? "border-blue-400/50 shadow-[0_0_40px_-10px_rgba(37,99,235,0.30)] md:scale-[1.02]"
                  : "border-zinc-200 md:hover:border-zinc-300"
              )}>
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-blue-300 bg-blue-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-700">
                  Best value
                </div>
              )}

              <div className="mb-1 text-xs font-bold uppercase tracking-wider text-zinc-600">
                {plan.name}
              </div>

              <div className="mb-1 flex items-baseline gap-1.5">
                {showEarlyBird ? (
                  <>
                    <span className="text-4xl font-bold tracking-tight text-zinc-900">
                      {EARLY_BIRD_PRICE}
                    </span>
                    <span className="text-base text-zinc-400 line-through">{LIFETIME_PRICE}</span>
                    <span className="text-sm text-zinc-500">once</span>
                  </>
                ) : (
                  <>
                    <span className="text-4xl font-bold tracking-tight text-zinc-900">
                      {plan.price}
                    </span>
                    <span className="text-sm text-zinc-500">{plan.cadence}</span>
                  </>
                )}
              </div>

              <div className="mb-5 text-sm text-zinc-600">{plan.blurb}</div>

              {showEarlyBird && (
                <div className="mb-4">
                  <div className="mb-1 flex items-baseline justify-between text-[10px] uppercase tracking-wider">
                    <span className="text-amber-700">{claimed} claimed</span>
                    <span className="text-zinc-500">
                      {remaining} left at {EARLY_BIRD_PRICE}
                    </span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-100">
                    <div
                      className="h-full bg-gradient-to-r from-amber-400/80 to-amber-300/80 transition-all duration-700"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              )}

              <ul className="mb-6 flex flex-grow flex-col gap-2 text-sm text-zinc-700">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check
                      className={cn(
                        "mt-0.5 h-4 w-4 flex-shrink-0",
                        plan.id === "free" ? "text-emerald-600" : "text-blue-600"
                      )}
                    />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleCta(plan.id)}
                className={cn(
                  "w-full rounded-lg px-4 py-2.5 text-sm font-semibold transition-all duration-150",
                  plan.featured
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "border border-zinc-200 bg-zinc-50 text-zinc-900 hover:bg-zinc-100"
                )}>
                {plan.cta}
              </button>
            </div>
          );
        })}
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700">
          <ShieldCheck className="h-4 w-4" />
          14-day refund · No questions asked
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-300 bg-white px-3 py-1.5 text-xs text-zinc-700">
          <Lock className="h-4 w-4 text-zinc-600" />
          Secure checkout by Stripe
        </span>
      </motion.div>

      <motion.p
        variants={itemVariants}
        className="mt-3 text-center text-xs text-zinc-500">
        Prices in USD · No extra taxes or hidden fees · 100% local - no account needed to use ClearSite
      </motion.p>
    </motion.div>
  );
}
