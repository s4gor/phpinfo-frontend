"use client";

import React from "react";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ExeebitBar from "@/components/exeebit-bar";
import AnimatedArrow from "@/components/ui/animated-arrow";
import {
  Check,
  X,
  Minus,
  Sparkles,
  ShieldCheck,
  Lock,
  DollarSign,
  Zap,
  ArrowRight,
  ExternalLink,
  ChevronRight,
} from "lucide-react";

export default function VsQueryMonitorPage() {
  const comparisonRows = [
    {
      feature: "Target Use Case",
      phpinfo: "Production Server Operations, Safeguards & Client Audits",
      queryMonitor: "Local / Staging SQL query profiling & hook inspection",
    },
    {
      feature: "Front-End Performance Overhead",
      phpinfo: "0.00ms (All scanning is asynchronous & on-demand in Admin)",
      queryMonitor: "Measurable overhead (Instruments every DB query and PHP hook)",
    },
    {
      feature: "Update Crash Safety (Update Guard)",
      phpinfo: "✅ Pre-flight AST syntax check & automatic crash rollback",
      queryMonitor: "❌ None. Only displays query errors after execution",
    },
    {
      feature: "White-Label Client PDF Audits",
      phpinfo: "✅ Branded executive health reports with A-F grading",
      queryMonitor: "❌ None. Only raw in-browser developer admin-bar output",
    },
    {
      feature: "PHP EOL Timeline & 8.4 Upgrade Scanner",
      phpinfo: "✅ Proactive AST scanner with 1-click patch generator",
      queryMonitor: "❌ No forward-looking PHP upgrade scanner",
    },
    {
      feature: "Server Hardening & .htaccess / .user.ini",
      phpinfo: "✅ Built-in safe syntax editor with backup & revert",
      queryMonitor: "❌ Read-only inspection only",
    },
    {
      feature: "Troubleshooting Mode",
      phpinfo: "✅ Session-isolated (safe on live stores, auto-restores)",
      queryMonitor: "❌ No built-in theme/plugin troubleshooting sandbox",
    },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center overflow-x-clip bg-zinc-50/50 dark:bg-zinc-950 pt-24 sm:pt-28 lg:pt-36">
      <div className="fixed left-0 right-0 top-0 z-[60]">
        <ExeebitBar />
        <Header />
      </div>

      <div className="w-full max-w-5xl px-4 sm:px-6 lg:px-8 pt-4 pb-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-zinc-500 mb-6">
          <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-100">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/compare" className="hover:text-zinc-900 dark:hover:text-zinc-100">Compare</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-zinc-900 dark:text-zinc-100 font-medium">vs Query Monitor</span>
        </nav>

        {/* Hero Header */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3.5 py-1 text-xs font-semibold text-violet-700 dark:border-violet-900/60 dark:bg-violet-950/40 dark:text-violet-300 mb-4">
            <span>Query Monitor Alternative for Production Operations</span>
          </div>
          <h1 className="max-w-4xl mx-auto text-balance text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl md:text-6xl leading-[1.12]">
            phpinfo() WP vs. Query Monitor
          </h1>
          <p className="mx-auto max-w-2xl text-balance text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed mt-4">
            Query Monitor is legendary for finding slow SQL queries during development. But for live server operations, update crash prevention, and client reporting, you need <strong>phpinfo() WP</strong>.
          </p>
        </div>

        {/* Side-by-Side Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="p-6 rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
            <div className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">When to use</div>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">Query Monitor</h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Use Query Monitor in local development environments (`localhost` or staging) when writing custom PHP plugins and optimizing slow database queries (`SELECT * ...`). It renders an in-depth developer bar attached to page renders.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-violet-300/80 bg-violet-50/40 dark:border-violet-900/60 dark:bg-violet-950/20">
            <div className="text-xs font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400 mb-2">When to use</div>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">phpinfo() WP Pro</h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Use phpinfo() WP on live production and client websites. It runs with zero front-end overhead, prevents fatal update crashes before they break stores, grades PHP/server health, and exports polished white-label PDF audit reports.
            </p>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="rounded-2xl border border-zinc-200 bg-white overflow-hidden shadow-xs dark:border-zinc-800 dark:bg-zinc-900 mb-12">
          <div className="p-6 border-b border-zinc-100 dark:border-zinc-800">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
              Detailed Feature Comparison
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
                <tr>
                  <th className="py-3.5 px-6 font-semibold text-zinc-900 dark:text-zinc-100">Capability</th>
                  <th className="py-3.5 px-6 font-semibold text-violet-700 dark:text-violet-400">phpinfo() WP Pro</th>
                  <th className="py-3.5 px-6 font-semibold text-zinc-600 dark:text-zinc-400">Query Monitor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/40 transition-colors">
                    <td className="py-4 px-6 font-medium text-zinc-900 dark:text-zinc-100">{row.feature}</td>
                    <td className="py-4 px-6 text-zinc-800 dark:text-zinc-200 font-medium">{row.phpinfo}</td>
                    <td className="py-4 px-6 text-zinc-500 dark:text-zinc-400">{row.queryMonitor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Common Question: Can they run together? */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 dark:border-zinc-800 dark:bg-zinc-900 mb-12 space-y-3">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
            Can I run both Query Monitor and phpinfo() WP simultaneously?
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            <strong>Yes, perfectly.</strong> They serve complementary roles. Query Monitor inspects SQL query bottlenecks during theme/plugin coding, while phpinfo() WP manages live server telemetry, pre-update safeguards, server security configurations, and client deliverables. Many agencies keep both in their developer toolbox.
          </p>
        </div>

        {/* Conversion CTA */}
        <div className="rounded-3xl border border-violet-200 bg-gradient-to-r from-violet-600 to-indigo-600 p-8 sm:p-10 text-center text-white shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-bold">
            Ready for production-grade WordPress operations?
          </h2>
          <p className="mt-2 text-sm sm:text-base text-violet-100 max-w-xl mx-auto">
            Upgrade your WordPress maintenance stack with zero front-end overhead and automated crash safeguards.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center h-11 rounded-xl bg-white px-6 text-sm font-bold text-violet-900 shadow hover:bg-zinc-100 transition-colors">
              Explore Pricing Plans ($39 - $79)
            </Link>
            <a
              href="https://demo.phpinfowp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-11 rounded-xl border border-white/40 bg-white/10 px-5 text-sm font-semibold text-white hover:bg-white/20 transition-colors">
              Test Live Demo
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
