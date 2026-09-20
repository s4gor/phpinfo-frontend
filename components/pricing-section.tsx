"use client";

import { useState } from "react";
import confetti from "canvas-confetti";
import { Check, Zap, ShieldCheck, ArrowRight } from "lucide-react";

export default function PricingSection() {
  const [loadingTier, setLoadingTier] = useState<string | null>(null);

  const handleCheckout = (tier: string) => {
    setLoadingTier(tier);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });
    // Redirect to checkout or exeebit endpoint
    window.location.href = `https://exeebit.com/api/checkout?tier=${tier}`;
  };

  const tiers = [
    {
      id: "single",
      name: "Single Site",
      price: "$39",
      cadence: "/year",
      blurb: "You own one site and want it running at its absolute best.",
      popular: false,
      features: [
        "All Pro v8.0 features on 1 active site",
        "Standard PDF audit reports (Branded)",
        "1 External API latency monitor & 3 snapshots",
        "1 year of updates & email support",
      ],
      buttonText: "Buy Single Site ($39)",
    },
    {
      id: "unlimited",
      name: "Unlimited Sites",
      price: "$69",
      prevPrice: "$79",
      cadence: "/1st yr",
      blurb: "You manage multiple client or agency sites. One license covers all.",
      popular: true,
      features: [
        "All Pro v8.0 features on unlimited sites",
        "Fully white-labeled PDF reports (Custom Logo)",
        "Weekly email digests & Slack/Discord alerts",
        "Unlimited snapshots & API monitors",
        "Priority email support & Multi-site network support",
      ],
      buttonText: "Buy Unlimited ($69)",
      notice: "Price Increases Sept 30: Get Unlimited at $69 for your first year before it increases to $79/year on September 30. Subsequent renewals at $79/year."
    },
    {
      id: "lifetime",
      name: "Founder Lifetime",
      price: "$149",
      prevPrice: "$249",
      cadence: "once",
      blurb: "One payment. Updates and support forever. Zero renewal fees.",
      popular: false,
      flag: "55 Sold Out · Extended +5 Spots",
      features: [
        "All Pro v8.0 features on unlimited sites",
        "Fully white-labeled PDF reports (Custom Logo)",
        "Weekly email digests & Slack/Discord alerts",
        "Lifetime updates & priority support forever",
        "Zero renewal fees ever",
      ],
      buttonText: "Buy Founder Lifetime ($149)",
      isLifetime: true,
    },
  ];

  return (
    <section id="pricing" className="py-24 relative bg-mesh-radial">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Start in 60 Seconds.
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Install free from WordPress.org, or go straight to Pro with our 14-day refund policy, no questions asked.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {tiers.map((t) => (
            <div
              key={t.id}
              className={`rounded-2xl p-7 flex flex-col justify-between transition-all duration-300 relative ${
                t.popular
                  ? "glass-panel border-violet-500/50 shadow-2xl shadow-violet-500/20 bg-slate-900/80 md:scale-105 z-10"
                  : "glass-panel border-white/10 bg-slate-950/60"
              }`}
            >
              {t.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-violet-600 text-white shadow-md">
                  Most Popular · Increases Sept 30
                </span>
              )}
              {t.flag && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500 text-slate-950 shadow-md">
                  {t.flag}
                </span>
              )}

              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  {t.name}
                </div>
                <div className="flex items-baseline gap-1.5 mb-2">
                  {t.prevPrice && (
                    <span className="text-sm font-medium text-slate-500 line-through">
                      {t.prevPrice}
                    </span>
                  )}
                  <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                    {t.price}
                  </span>
                  <span className="text-sm text-slate-400 font-medium">
                    {t.cadence}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mb-5 min-h-[34px]">
                  {t.blurb}
                </p>

                {/* Unlimited Notice Box */}
                {t.notice && (
                  <div className="mb-5 rounded-xl bg-violet-500/10 border border-violet-500/20 p-3 text-[11px] text-violet-200 leading-snug">
                    <strong>⚡ Notice:</strong> {t.notice}
                  </div>
                )}

                {/* Lifetime Compact Extension Widget */}
                {t.isLifetime && (
                  <div className="mb-5 rounded-xl bg-gradient-to-r from-amber-500/10 to-emerald-500/10 border border-amber-500/20 p-3 text-[11px] leading-snug flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-amber-300 flex items-center gap-1">
                        <Zap className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                        Set to increase at 55: Extended +5!
                      </span>
                      <span className="text-slate-300 font-medium">
                        <strong className="text-emerald-400 font-bold">5 left</strong> at $149 ($249 after that)
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-semibold">
                      <div className="flex items-center gap-1 text-amber-300 bg-amber-500/10 border border-amber-500/20 rounded px-1.5 py-0.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                        <span>55 Original (Filled)</span>
                      </div>
                      <div className="flex items-center gap-1 text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 rounded px-1.5 py-0.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>+5 Extended (5 left)</span>
                      </div>
                    </div>

                    <div className="flex h-1.5 w-full gap-1 items-center">
                      <div className="h-1.5 flex-1 rounded-full bg-amber-400" title="55 Original: Sold Out" />
                      <div className="h-1.5 w-14 rounded-full bg-emerald-950 border border-emerald-500/40 overflow-hidden">
                        <div className="h-full bg-emerald-400 w-0" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Features List */}
                <ul className="space-y-2.5 mb-8 text-xs text-slate-300">
                  {t.features.map((f, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-violet-400 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handleCheckout(t.id)}
                disabled={loadingTier !== null}
                className={`w-full py-3 rounded-xl font-semibold text-xs transition-all duration-200 shadow-lg ${
                  t.popular
                    ? "bg-violet-600 hover:bg-violet-500 text-white shadow-violet-600/30"
                    : "bg-white/10 hover:bg-white/20 text-white border border-white/10"
                }`}
              >
                {loadingTier === t.id ? "Redirecting..." : t.buttonText}
              </button>
            </div>
          ))}
        </div>

        {/* Guarantee Badge */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-400">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400">
            <ShieldCheck className="h-4 w-4" />
            <span>14-day refund guarantee, no questions asked</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-slate-300">
            <span>Instant HMAC license delivery</span>
          </div>
        </div>

      </div>
    </section>
  );
}
