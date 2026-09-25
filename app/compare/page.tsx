"use client";

import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ExeebitBar from "@/components/exeebit-bar";
import { Button } from "@/components/ui/button";
import AnimatedArrow from "@/components/ui/animated-arrow";
import Comparison from "@/components/comparison";
import FAQ from "@/components/faq";
import {
  Check,
  X,
  Minus,
  Sparkles,
  ShieldCheck,
  Lock,
  DollarSign,
  Zap,
  Play,
  ArrowRight,
} from "lucide-react";
import { SiWordpress } from "react-icons/si";

export default function ComparePage() {
  const comparisonItems = [
    {
      feature: "Architecture & Privacy",
      phpinfo: "100% In-Admin, zero external SaaS servers, zero client data leaves server",
      healthCheck: "In-Admin, but unmaintained for 2 years with known lockout bugs",
      queryMonitor: "In-Admin, but focused strictly on raw database queries during page generation",
      saas: "External SaaS servers hold API keys and read client databases",
    },
    {
      feature: "Cost & Pricing Model",
      phpinfo: "One flat annual or lifetime license ($39 - $69/yr). Unlimited sites.",
      healthCheck: "Free, but abandoned features and no Pro support",
      queryMonitor: "Free, but no agency reporting or update safeguards",
      saas: "Recurring monthly fee ($2 - $5/month) per connected website",
    },
    {
      feature: "Update Crash Safety",
      phpinfo: "Update Guard suite with pre-flight AST scan, 60s health diagnostic & auto-rollback",
      healthCheck: "None. Updates run standard WP routines",
      queryMonitor: "None. Only inspects queries after crash occurs",
      saas: "Basic uptime ping, no deep in-admin AST syntax pre-flight checks",
    },
    {
      feature: "Smart PHP 8.4 Upgrade Scanner",
      phpinfo: "Zero false-alarm delta engine with AI 1-click patch generator",
      healthCheck: "Basic PHP version string check only",
      queryMonitor: "No forward-looking PHP upgrade scanner",
      saas: "Basic PHP version report, no AST code compatibility scanner",
    },
    {
      feature: "Client Retainer Deliverables",
      phpinfo: "White-label branded PDF audit reports with overall health grade (A+)",
      healthCheck: "Plain text debug copy-paste only",
      queryMonitor: "None. Strict technical dev bar only",
      saas: "SaaS-branded report with extra fees for custom domain white-labeling",
    },
    {
      feature: "Troubleshooting Isolation",
      phpinfo: "Per-user, time-limited, reversible. Visitors never see a broken theme.",
      healthCheck: "Known bug can leave entire site locked out with all plugins disabled",
      queryMonitor: "No troubleshooting isolation mode",
      saas: "Requires putting site into global maintenance mode",
    },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center overflow-x-clip pt-24 sm:pt-28 lg:pt-36 bg-zinc-50/50 dark:bg-zinc-950">
      <div className="fixed left-0 right-0 top-0 z-[60]">
        <ExeebitBar />
        <Header />
      </div>

      {/* Hero Section */}
      <section className="w-full max-w-6xl px-4 sm:px-6 lg:px-8 pt-4 pb-8 sm:pb-12 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3.5 py-1 text-xs font-semibold text-violet-700 dark:border-violet-900/60 dark:bg-violet-950/40 dark:text-violet-300 mb-3">
          <Sparkles className="h-3.5 w-3.5" /> Direct Objective Comparison
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-normal text-zinc-900 dark:text-zinc-100 max-w-4xl mx-auto leading-snug sm:leading-tight">
          How phpinfo() WP Compares to the Alternatives
        </h1>

        <p className="mt-3.5 text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
          See why modern WordPress agencies and site owners choose phpinfo() WP Pro over abandoned plugins and expensive per-site monthly SaaS tools.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link href="/demo">
            <Button size="lg" className="rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold px-6 shadow-sm">
              <Play className="mr-2 h-4 w-4" />
              <span>Try It Live In Browser</span>
            </Button>
          </Link>
          <Link href="/pricing">
            <Button size="lg" variant="outline" className="rounded-xl border-zinc-300 font-semibold px-6">
              <span>View Pricing Plans</span>
              <AnimatedArrow className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Comparison Matrix Table */}
      <section className="w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm overflow-hidden dark:border-zinc-800 dark:bg-zinc-900">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-zinc-200 bg-zinc-100/70 dark:border-zinc-800 dark:bg-zinc-800/60">
                  <th className="p-4 sm:p-5 font-bold text-zinc-900 dark:text-zinc-100 w-1/4">Feature / Aspect</th>
                  <th className="p-4 sm:p-5 font-bold text-violet-700 dark:text-violet-400 bg-violet-50/60 dark:bg-violet-950/30 w-1/4">
                    phpinfo() WP Pro 8.0
                  </th>
                  <th className="p-4 sm:p-5 font-bold text-zinc-600 dark:text-zinc-300 w-1/4">
                    Health Check (WP.org)
                  </th>
                  <th className="p-4 sm:p-5 font-bold text-zinc-600 dark:text-zinc-300 w-1/4">
                    SaaS (ManageWP / Umbrella)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {comparisonItems.map((item, idx) => (
                  <tr key={idx} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/20 transition-colors">
                    <td className="p-4 sm:p-5 font-semibold text-zinc-900 dark:text-zinc-100">
                      {item.feature}
                    </td>
                    <td className="p-4 sm:p-5 text-zinc-800 dark:text-zinc-200 bg-violet-50/30 dark:bg-violet-950/10 font-medium">
                      <div className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item.phpinfo}</span>
                      </div>
                    </td>
                    <td className="p-4 sm:p-5 text-zinc-600 dark:text-zinc-400">
                      <div className="flex items-start gap-2">
                        <Minus className="h-4 w-4 text-zinc-400 shrink-0 mt-0.5" />
                        <span>{item.healthCheck}</span>
                      </div>
                    </td>
                    <td className="p-4 sm:p-5 text-zinc-600 dark:text-zinc-400">
                      <div className="flex items-start gap-2">
                        <X className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                        <span>{item.saas}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4 Architectural Advantages */}
      <section className="w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            The 4 Reasons WordPress Teams Switch to phpinfo() WP
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xs dark:border-zinc-800 dark:bg-zinc-900 space-y-3">
            <div className="rounded-xl bg-violet-100 p-2.5 text-violet-700 w-fit dark:bg-violet-950 dark:text-violet-300">
              <Lock className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">1. Zero Client Data Security Exposure</h3>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              External SaaS dashboards store admin tokens, server credentials, and database contents on their servers. When an external SaaS gets breached, all your client sites are compromised. phpinfo() WP runs 100% locally in your WordPress database with zero third-party data transmission.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xs dark:border-zinc-800 dark:bg-zinc-900 space-y-3">
            <div className="rounded-xl bg-emerald-100 p-2.5 text-emerald-700 w-fit dark:bg-emerald-950 dark:text-emerald-300">
              <DollarSign className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">2. Save Thousands in Monthly Per-Site SaaS Fees</h3>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              If you manage 25 sites at $3/month, you are paying $900 every single year. With 50 sites, that climbs to $1,800/year. phpinfo() WP Unlimited is a flat $69/year license for unlimited websites, saving your agency thousands of dollars annually.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xs dark:border-zinc-800 dark:bg-zinc-900 space-y-3">
            <div className="rounded-xl bg-amber-100 p-2.5 text-amber-700 w-fit dark:bg-amber-950 dark:text-amber-300">
              <Zap className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">3. Safe Troubleshooting That Never Locks You Out</h3>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              The official Health Check &amp; Troubleshooting plugin hasn&apos;t received core maintenance in over 2 years and has a widely reported bug where users are locked out with all plugins disabled. Our Troubleshooting Mode is per-user, time-limited, and features an instant reversible escape hatch.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xs dark:border-zinc-800 dark:bg-zinc-900 space-y-3">
            <div className="rounded-xl bg-blue-100 p-2.5 text-blue-700 w-fit dark:bg-blue-950 dark:text-blue-300">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">4. Turn Server Audits into Client Retainers</h3>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Neither Query Monitor nor Health Check can generate executive client-ready deliverables. With phpinfo() WP Pro, you get 100% white-label PDF audit reports with health grades (A+) that you can brand with your agency logo to justify your monthly client maintenance retainers.
            </p>
          </div>
        </div>
      </section>

      {/* Full Comparison Table Component */}
      <section className="w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
        <Comparison />
      </section>

      {/* Bottom CTA Block */}
      <section className="w-full max-w-4xl px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
        <div className="rounded-3xl bg-gradient-to-br from-violet-600 to-indigo-800 p-8 sm:p-12 text-white text-center shadow-xl">
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
            Ready to upgrade your WordPress management?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-violet-100 max-w-lg mx-auto">
            Get started with phpinfo() WP Pro today. Fully backed by our 14-day 100% money-back guarantee.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link href="/pricing">
              <Button size="lg" className="rounded-xl bg-white text-violet-700 hover:bg-zinc-100 font-semibold px-6 shadow-md">
                <span>View Pricing &amp; Plans</span>
                <AnimatedArrow className="ml-2" />
              </Button>
            </Link>
            <Link href="/demo">
              <Button size="lg" variant="ghost" className="rounded-xl text-white hover:bg-white/10 font-semibold px-5 border border-white/20">
                <Play className="mr-2 h-4 w-4" />
                <span>Test Live Demo</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
