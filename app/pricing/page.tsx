"use client";

import { useState } from "react";
import { toast } from "sonner";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ExeebitBar from "@/components/exeebit-bar";
import Pricing from "@/components/pricing";
import Comparison from "@/components/comparison";
import FAQ from "@/components/faq";
import Testimonials from "@/components/testimonials";
import { ShieldCheck, CheckCircle2, DollarSign, Calculator, Sparkles, HelpCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PricingPage() {
  const [loadingTier, setLoadingTier] = useState<string | null>(null);
  const [siteCount, setSiteCount] = useState<number>(15);

  const handleBuy = async (tier: "single" | "unlimited" | "lifetime") => {
    setLoadingTier(tier);

    const promise = new Promise<{ url: string }>(async (resolve, reject) => {
      try {
        const res = await fetch("/api/checkout", {
          method: "POST",
          cache: "no-store",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tier }),
        });

        if (!res.ok) {
          if (res.status === 429) return reject("Rate limited");
          return reject("Checkout failed");
        }

        const data = await res.json();
        if (!data?.url) return reject("Checkout failed");
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });

    toast.promise(promise, {
      loading: "Opening secure checkout…",
      success: (data) => {
        window.location.href = data.url;
        return "Redirecting to Stripe…";
      },
      error: (err) => {
        setLoadingTier(null);
        if (err === "Rate limited") return "Too many attempts. Try again in a minute.";
        return "Couldn't open checkout. Try again.";
      },
    });
  };

  // Typical SaaS monitoring tools charge ~$3/month per site ($36/yr)
  const saasAnnualCost = siteCount * 36;
  const phpinfoCost = 69; // Unlimited tier
  const annualSavings = Math.max(0, saasAnnualCost - phpinfoCost);

  return (
    <main className="flex min-h-screen flex-col items-center overflow-x-clip pt-24 sm:pt-28 lg:pt-36 bg-zinc-50/50 dark:bg-zinc-950">
      <div className="fixed left-0 right-0 top-0 z-[60]">
        <ExeebitBar />
        <Header />
      </div>

      {/* Pricing Header Hero */}
      <section className="w-full max-w-6xl px-4 sm:px-6 lg:px-8 pt-4 pb-4 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3.5 py-1 text-xs font-semibold text-violet-700 dark:border-violet-900/60 dark:bg-violet-950/40 dark:text-violet-300 mb-3">
          <Sparkles className="h-3.5 w-3.5" /> 100% In-Admin &bull; No Monthly Per-Site Fees
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-900 dark:text-zinc-100 max-w-3xl mx-auto">
          Predictable Pricing for WordPress Professionals
        </h1>

        <p className="mt-3.5 text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
          One flat license. Zero per-site SaaS meter ticks. All Pro v8.0 features included with a 14-day 100% money-back guarantee.
        </p>
      </section>

      {/* Main Pricing Tiers Block */}
      <section className="w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <Pricing onBuy={handleBuy} loadingTier={loadingTier} />
      </section>

      {/* Interactive Agency Savings Calculator */}
      <section className="w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-violet-100 p-2.5 text-violet-700 dark:bg-violet-950 dark:text-violet-300">
              <Calculator className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                Agency SaaS Savings Calculator
              </h3>
              <p className="text-xs sm:text-sm text-zinc-500">
                See how much you save every year with phpinfo() WP Unlimited vs monthly per-site SaaS dashboards.
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <div className="flex items-center justify-between text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                <span>Number of Client Sites Managed:</span>
                <span className="text-lg font-bold text-violet-600">{siteCount} Sites</span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                value={siteCount}
                onChange={(e) => setSiteCount(Number(e.target.value))}
                className="w-full accent-violet-600 cursor-pointer h-2 bg-zinc-200 rounded-lg dark:bg-zinc-700"
              />
              <div className="flex justify-between text-[11px] text-zinc-400 mt-1">
                <span>1 site</span>
                <span>25 sites</span>
                <span>50 sites</span>
                <span>100 sites</span>
              </div>
            </div>

            <div className="rounded-xl bg-zinc-50 p-4 border border-zinc-200/80 dark:bg-zinc-950/40 dark:border-zinc-800 text-center">
              <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Estimated Annual Agency Savings</div>
              <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
                ${annualSavings.toLocaleString()} <span className="text-xs font-normal text-zinc-500">/year</span>
              </div>
              <div className="text-xs text-zinc-500 mt-1">
                (Based on average $3/mo per site SaaS charges vs $69/yr flat unlimited)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full Feature Comparison Matrix */}
      <section className="w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
        <Comparison />
      </section>

      {/* Customer Testimonials */}
      <section className="w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
        <Testimonials />
      </section>

      {/* Pricing FAQs */}
      <section className="w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        <FAQ />
      </section>

      <Footer />
    </main>
  );
}
