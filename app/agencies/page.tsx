"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ExeebitBar from "@/components/exeebit-bar";
import AnimatedArrow from "@/components/ui/animated-arrow";
import TextBlur from "@/components/ui/text-blur";
import {
  ShieldCheck,
  FileCheck2,
  Zap,
  DollarSign,
  TrendingUp,
  Server,
  Layers,
  CheckCircle2,
  Lock,
  ArrowRight,
  Sparkles,
  ExternalLink,
  Laptop,
  Users2,
  Sliders,
} from "lucide-react";

export default function AgenciesPage() {
  const [siteCount, setSiteCount] = useState<number>(35);

  // ROI Math
  // Typical SaaS competitor charges ~$4 / site / month ($48/yr/site)
  const saasAnnualCost = siteCount * 4 * 12;
  const phpinfoAnnualCost = 79;
  const annualSavings = Math.max(0, saasAnnualCost - phpinfoAnnualCost);
  const lifetimeSavings5Yr = siteCount * 4 * 60 - 249;

  return (
    <main className="flex min-h-screen flex-col items-center overflow-x-clip bg-zinc-50/50 dark:bg-zinc-950 pt-24 sm:pt-28 lg:pt-36">
      <div className="fixed left-0 right-0 top-0 z-[60]">
        <ExeebitBar />
        <Header />
      </div>

      {/* Hero Section */}
      <section className="w-full max-w-6xl px-4 sm:px-6 lg:px-8 pt-4 pb-16 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3.5 py-1 text-xs font-semibold text-violet-700 dark:border-violet-900/60 dark:bg-violet-950/40 dark:text-violet-300 mb-6">
          <Sparkles className="h-3.5 w-3.5 text-violet-600 dark:text-violet-400" />
          <span>Agency Operations Stack • Unlimited Client Sites</span>
        </div>

        <h1 className="max-w-4xl mx-auto text-balance text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl md:text-6xl leading-[1.12]">
          The WordPress operations stack built for modern agencies.
        </h1>

        <p className="mx-auto max-w-2xl text-balance text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed mt-4">
          Prevent breaking client updates, eliminate $3-$10/mo per-site SaaS tax, and export white-label executive audit PDFs that prove monthly maintenance value to your clients.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/pricing#unlimited"
            className="group inline-flex items-center justify-center h-12 rounded-xl bg-violet-600 hover:bg-violet-700 px-6 text-sm font-semibold text-white shadow-[0_0_25px_-5px_rgba(147,51,234,0.5)] transition-all">
            <span>Get Agency Unlimited ($79/yr)</span>
            <AnimatedArrow className="ml-2" />
          </Link>

          <Link
            href="/pricing#lifetime"
            className="inline-flex items-center justify-center h-12 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 px-6 text-sm font-semibold text-zinc-800 transition-colors dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:text-zinc-200">
            Agency Lifetime ($249 Once)
          </Link>

          <a
            href="https://demo.phpinfowp.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors py-2 px-3">
            <span>Explore Live Demo</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Trust Badges */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <span>Unlimited Client Sites</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <span>100% In-Admin &amp; GDPR Compliant</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <span>White-Label Client PDF Exports</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <span>14-Day Money-Back Guarantee</span>
          </div>
        </div>
      </section>

      {/* Interactive ROI Calculator Section */}
      <section className="w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="rounded-3xl border border-violet-200/80 bg-gradient-to-b from-white to-violet-50/30 p-6 sm:p-10 shadow-sm dark:border-violet-900/40 dark:from-zinc-900 dark:to-zinc-950">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-violet-100 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300 px-3 py-1 text-xs font-semibold mb-3">
              <DollarSign className="h-3.5 w-3.5" />
              <span>Agency ROI Calculator</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              Stop paying monthly per-site SaaS tolls.
            </h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              External SaaS monitors charge $3-$10/month for every site you manage. See how much your agency keeps with phpinfo() WP Unlimited.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Slider Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm font-semibold">
                  <span className="text-zinc-700 dark:text-zinc-300">Client Websites Under Management:</span>
                  <span className="text-2xl font-bold text-violet-600 dark:text-violet-400 font-mono">
                    {siteCount} sites
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="150"
                  step="5"
                  value={siteCount}
                  onChange={(e) => setSiteCount(Number(e.target.value))}
                  className="w-full h-2.5 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-violet-600"
                />
                <div className="flex justify-between text-xs text-zinc-400">
                  <span>5 sites (Boutique)</span>
                  <span>50 sites (Mid Agency)</span>
                  <span>150+ sites (Fleet)</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl border border-zinc-200 bg-white/70 dark:border-zinc-800 dark:bg-zinc-900/50">
                  <div className="text-xs text-zinc-500 mb-1">Standard SaaS Model (~$4/mo/site)</div>
                  <div className="text-xl sm:text-2xl font-bold text-zinc-700 dark:text-zinc-300 font-mono">
                    ${saasAnnualCost.toLocaleString()}/yr
                  </div>
                  <div className="text-[11px] text-zinc-400 mt-0.5">Recurring monthly cost</div>
                </div>

                <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 dark:border-emerald-900/40 dark:bg-emerald-950/20">
                  <div className="text-xs text-emerald-700 dark:text-emerald-300 mb-1 font-semibold">
                    phpinfo() WP Unlimited
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-emerald-700 dark:text-emerald-300 font-mono">
                    $79/yr flat
                  </div>
                  <div className="text-[11px] text-emerald-600/80 dark:text-emerald-400/80 mt-0.5">
                    Zero per-site fees
                  </div>
                </div>
              </div>
            </div>

            {/* Savings Callout Card */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-zinc-900 text-white dark:bg-zinc-800 text-center space-y-4 shadow-md">
              <div className="text-xs uppercase tracking-wider text-violet-300 font-semibold">
                Your Agency Net Savings
              </div>
              <div className="text-4xl sm:text-5xl font-black text-emerald-400 font-mono tracking-tight">
                +${annualSavings.toLocaleString()}
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Money kept directly in your agency&apos;s pocket each year, with 5-year savings exceeding <strong>${lifetimeSavings5Yr.toLocaleString()}</strong> on our Lifetime license.
              </p>
              <Link
                href="/pricing#unlimited"
                className="inline-flex w-full items-center justify-center h-11 rounded-xl bg-violet-500 hover:bg-violet-600 text-sm font-semibold text-white transition-colors">
                Claim Agency Unlimited Plan
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Pillars of the Agency Stack */}
      <section className="w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Four features agencies depend on daily.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            Engineered to safeguard client trust, eliminate emergency troubleshooting, and monetize routine maintenance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1 */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-7 shadow-xs dark:border-zinc-800 dark:bg-zinc-900 space-y-4">
            <div className="h-11 w-11 rounded-xl bg-violet-100 dark:bg-violet-950 text-violet-600 dark:text-violet-400 flex items-center justify-center">
              <FileCheck2 className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
              1. White-Label Client PDF Audits
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              When clients ask, <em>&quot;What are we paying you $150/month for?&quot;</em>, generate an executive-ready PDF audit in one click. Branded with your agency logo, primary brand color, and company details. Highlights security headers, PHP EOL safety, and overall server health grade (A+).
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-violet-600 dark:text-violet-400">
              <span>Included in Pro &amp; Agency licenses</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </div>

          {/* Card 2 */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-7 shadow-xs dark:border-zinc-800 dark:bg-zinc-900 space-y-4">
            <div className="h-11 w-11 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
              2. Update Guard Suite &amp; Pre-Flight AST Scans
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Never let an unexpected WooCommerce or Elementor update take down a client store again. Update Guard inspects plugins before updating for PHP version mismatches and breaking changelog keywords, and tests loopback health automatically.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <span>Automatic crash rollback &amp; loopback checks</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </div>

          {/* Card 3 */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-7 shadow-xs dark:border-zinc-800 dark:bg-zinc-900 space-y-4">
            <div className="h-11 w-11 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Laptop className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
              3. Client-Safe Troubleshooting Mode
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Standard troubleshooting plugins switch the theme or deactivate plugins for everyone, breaking live sales. Our session-isolated Troubleshooting Mode applies debugging exclusively to your agency user account. Normal visitors never notice a thing.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400">
              <span>Zero client disruption • Auto-restore safeguard</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </div>

          {/* Card 4 */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-7 shadow-xs dark:border-zinc-800 dark:bg-zinc-900 space-y-4">
            <div className="h-11 w-11 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Lock className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
              4. 100% In-Admin Security &amp; Strict GDPR
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Enterprise and EU clients strictly forbid third-party SaaS services from collecting server access keys or reading customer databases. phpinfo() WP runs 100% inside your WordPress install. No external data telemetry, zero liability risk.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-amber-600 dark:text-amber-400">
              <span>Compliant with strict EU GDPR § 5 DDG</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </div>
        </div>
      </section>

      {/* Agency FAQ Section */}
      <section className="w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-14">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-zinc-900 dark:text-zinc-100 mb-8">
          Frequently asked by agency founders
        </h2>

        <div className="space-y-4">
          <details className="group rounded-xl border border-zinc-200 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
            <summary className="flex cursor-pointer items-center justify-between font-semibold text-sm sm:text-base text-zinc-900 dark:text-zinc-100">
              <span>Can I install the Agency license on client sites indefinitely?</span>
              <span className="text-violet-600 transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Yes. The Unlimited ($79/yr) and Lifetime ($249 once) licenses can be activated on as many client domains, subdomains, staging servers, and local environments as your agency manages. There are zero per-site caps.
            </p>
          </details>

          <details className="group rounded-xl border border-zinc-200 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
            <summary className="flex cursor-pointer items-center justify-between font-semibold text-sm sm:text-base text-zinc-900 dark:text-zinc-100">
              <span>Can we add our agency logo and custom colors to the PDF audit report?</span>
              <span className="text-violet-600 transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Absolutely. In the White-Label settings tab, you can upload your agency logo, define your primary brand hex color, specify your support email, and remove all references to phpinfo() WP. The exported client reports look 100% custom-built by your firm.
            </p>
          </details>

          <details className="group rounded-xl border border-zinc-200 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
            <summary className="flex cursor-pointer items-center justify-between font-semibold text-sm sm:text-base text-zinc-900 dark:text-zinc-100">
              <span>What happens if a client decides to leave our maintenance care?</span>
              <span className="text-violet-600 transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              You can simply deactivate the license key from their WordPress admin in one click, or remotely revoke that specific domain anytime from your agency customer portal.
            </p>
          </details>
        </div>
      </section>

      {/* Pre-footer Call to Action */}
      <section className="w-full max-w-5xl px-4 sm:px-6 lg:px-8 pb-20 pt-6">
        <div className="rounded-3xl border border-violet-200 bg-gradient-to-br from-violet-600 to-indigo-700 p-8 sm:p-12 text-center text-white shadow-xl dark:border-violet-900/50">
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">
            Elevate your agency maintenance retainers today.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-violet-100 max-w-2xl mx-auto leading-relaxed">
            Join hundreds of WordPress development agencies, maintenance shops, and high-volume site builders saving thousands of dollars every year.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/pricing#unlimited"
              className="inline-flex items-center justify-center h-12 rounded-xl bg-white px-6 text-sm font-bold text-violet-900 shadow-md hover:bg-zinc-100 transition-colors">
              Get Agency Unlimited - $79/year
            </Link>
            <Link
              href="/pricing#lifetime"
              className="inline-flex items-center justify-center h-12 rounded-xl border border-white/30 bg-white/10 px-6 text-sm font-semibold text-white hover:bg-white/20 transition-colors">
              Agency Lifetime - $249 Once
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
