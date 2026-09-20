"use client";

import { useState } from "react";
import confetti from "canvas-confetti";
import { Check, Zap, ShieldCheck } from "lucide-react";

export default function PricingSection() {
  const [loadingTier, setLoadingTier] = useState<string | null>(null);

  const handleCheckout = (tier: string) => {
    setLoadingTier(tier);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });
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
    <section id="pricing" className="py-24 relative stripe-gradient-canvas">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0a2540] tracking-tight mb-4">
            Start in 60 Seconds.
          </h2>
          <p className="text-[#425466] text-base sm:text-lg">
            Install free from WordPress.org, or go straight to Pro with our 14-day refund policy, no questions asked.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {tiers.map((t) => (
            <div
              key={t.id}
              className={`stripe-card p-8 flex flex-col justify-between relative bg-white ${
                t.popular
                  ? "border-2 border-[#635bff] shadow-[0_20px_50px_rgba(99,91,255,0.15)] md:scale-105 z-10"
                  : ""
              }`}
            >
              {t.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#635bff] text-white shadow-sm">
                  Most Popular · Increases Sept 30
                </span>
              )}
              {t.flag && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#fff4e5] text-[#b25e00] border border-[#ffd8a8] shadow-xs">
                  {t.flag}
                </span>
              )}

              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#697386] mb-1">
                  {t.name}
                </div>
                <div className="flex items-baseline gap-1.5 mb-2">
                  {t.prevPrice && (
                    <span className="text-sm font-medium text-[#a1a8b3] line-through">
                      {t.prevPrice}
                    </span>
                  )}
                  <span className="text-4xl sm:text-5xl font-black text-[#0a2540] tracking-tight">
                    {t.price}
                  </span>
                  <span className="text-sm text-[#697386] font-medium">
                    {t.cadence}
                  </span>
                </div>
                <p className="text-xs text-[#425466] mb-5 min-h-[34px]">
                  {t.blurb}
                </p>

                {/* Unlimited Notice Box */}
                {t.notice && (
                  <div className="mb-5 rounded-2xl bg-[#f0f3ff] border border-[#d6dcff] p-3.5 text-[11.5px] text-[#4f45e5] leading-snug font-medium">
                    <strong className="text-[#0a2540]">⚡ Notice:</strong> {t.notice}
                  </div>
                )}

                {/* Lifetime Compact Extension Widget */}
                {t.isLifetime && (
                  <div className="mb-5 rounded-2xl bg-gradient-to-r from-[#fff4e5] to-[#e6fbf7] border border-[#ffd8a8] p-3 text-[11px] leading-snug flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#b25e00] flex items-center gap-1">
                        <Zap className="h-3.5 w-3.5 text-[#ff8a00] fill-[#ff8a00]" />
                        Set to increase at 55: Extended +5!
                      </span>
                      <span className="text-[#425466] font-medium">
                        <strong className="text-[#00a389] font-bold">5 left</strong> at $149 ($249 after that)
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-bold">
                      <div className="flex items-center gap-1 text-[#b25e00] bg-white/80 border border-[#ffd8a8] rounded-full px-2 py-0.5 shadow-xs">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#ff8a00]" />
                        <span>55 Original (Filled)</span>
                      </div>
                      <div className="flex items-center gap-1 text-[#00a389] bg-white/80 border border-[#a3f3e5] rounded-full px-2 py-0.5 shadow-xs">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#00d4b2] animate-pulse" />
                        <span>+5 Extended (5 left)</span>
                      </div>
                    </div>

                    <div className="flex h-2 w-full gap-1 items-center">
                      <div className="h-1.5 flex-1 rounded-full bg-[#ff8a00]" title="55 Original: Sold Out" />
                      <div className="h-1.5 w-14 rounded-full bg-[#e6fbf7] border border-[#a3f3e5] overflow-hidden">
                        <div className="h-full bg-[#00d4b2] w-0" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Features List */}
                <ul className="space-y-3 mb-8 text-xs sm:text-sm text-[#425466]">
                  {t.features.map((f, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-[#635bff] shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handleCheckout(t.id)}
                disabled={loadingTier !== null}
                className={`w-full py-3.5 rounded-full font-bold text-xs transition-all duration-200 ${
                  t.popular
                    ? "stripe-button-primary"
                    : "stripe-button-secondary"
                }`}
              >
                {loadingTier === t.id ? "Redirecting..." : t.buttonText}
              </button>
            </div>
          ))}
        </div>

        {/* Guarantee Badge */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 text-xs text-[#425466]">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-[#a3f3e5] bg-[#e6fbf7] text-[#00a389] font-bold shadow-xs">
            <ShieldCheck className="h-4 w-4 text-[#00a389]" />
            <span>14-day refund guarantee, no questions asked</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-[#e6e8eb] bg-white text-[#0a2540] font-semibold shadow-xs">
            <span>Instant HMAC license delivery</span>
          </div>
        </div>

      </div>
    </section>
  );
}
