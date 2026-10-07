"use client";

import React from "react";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ExeebitBar from "@/components/exeebit-bar";
import {
  Check,
  X,
  ChevronRight,
  ExternalLink,
  Cpu,
  ShieldCheck,
} from "lucide-react";

export default function VsWpServerStatsPage() {
  const comparisonRows = [
    {
      capability: "Core Focus",
      phpinfo: "Comprehensive WordPress Server Ops, Update Guard & Security",
      wpServerStats: "Basic real-time CPU & RAM resource usage gauges",
    },
    {
      capability: "Pre-Update Crash Safety",
      phpinfo: "Automated AST scan for breaking PHP/WP floor mismatches",
      wpServerStats: "None. No update protection or safeguards",
    },
    {
      capability: "Database Bloat & Autoload Scanner",
      phpinfo: "Identifies unindexed tables, slow transients, and autoload size",
      wpServerStats: "Basic database size indicator only",
    },
    {
      capability: "PHP Configuration & .htaccess Editor",
      phpinfo: "In-admin syntax-checked editor with auto-rollback",
      wpServerStats: "Raw phpinfo dump view only",
    },
    {
      capability: "Executive White-Label PDF Reports",
      phpinfo: "One-click branded client audit reports with health grading",
      wpServerStats: "None. No reporting capabilities",
    },
    {
      capability: "Security Audit Log & SSL Monitor",
      phpinfo: "Tracks admin login events, file edits, and SSL certificate expiry",
      wpServerStats: "None",
    },
    {
      capability: "Isolated Troubleshooting Mode",
      phpinfo: "Single-admin debug sandbox without affecting live visitors",
      wpServerStats: "None",
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
          <span className="text-zinc-900 dark:text-zinc-100 font-medium">vs WP Server Stats</span>
        </nav>

        {/* Hero Header */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3.5 py-1 text-xs font-semibold text-violet-700 dark:border-violet-900/60 dark:bg-violet-950/40 dark:text-violet-300 mb-4">
            <span>WP Server Stats Alternative</span>
          </div>
          <h1 className="max-w-4xl mx-auto text-balance text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl md:text-6xl leading-[1.12]">
            phpinfo() WP vs. WP Server Stats
          </h1>
          <p className="mx-auto max-w-2xl text-balance text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed mt-4">
            WP Server Stats displays basic server gauges. <strong>phpinfo() WP</strong> delivers complete WordPress server operations, automated update safeguards, database performance scanning, and white-label client PDF audit reports.
          </p>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="p-6 rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-2">WP Server Stats</h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Provides visual speedometer-style gauges for CPU, Memory, and Server Load. Useful for a quick surface-level glance, but offers no actionable tools, no database tuning, no update crash guards, and no client reporting.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-violet-300/80 bg-violet-50/40 dark:border-violet-900/60 dark:bg-violet-950/20">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-2">phpinfo() WP Pro</h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              A full server operations command center. In addition to memory telemetry, it validates PHP directives, prevents plugin update crashes, uncovers database bloat, inspects security headers, and exports executive audit PDFs.
            </p>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="rounded-2xl border border-zinc-200 bg-white overflow-hidden shadow-xs dark:border-zinc-800 dark:bg-zinc-900 mb-12">
          <div className="p-6 border-b border-zinc-100 dark:border-zinc-800">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
              Feature Matrix
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
                <tr>
                  <th className="py-3.5 px-6 font-semibold text-zinc-900 dark:text-zinc-100">Capability</th>
                  <th className="py-3.5 px-6 font-semibold text-violet-700 dark:text-violet-400">phpinfo() WP Pro</th>
                  <th className="py-3.5 px-6 font-semibold text-zinc-600 dark:text-zinc-400">WP Server Stats</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/40 transition-colors">
                    <td className="py-4 px-6 font-medium text-zinc-900 dark:text-zinc-100">{row.capability}</td>
                    <td className="py-4 px-6 text-zinc-800 dark:text-zinc-200 font-medium">{row.phpinfo}</td>
                    <td className="py-4 px-6 text-zinc-500 dark:text-zinc-400">{row.wpServerStats}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-3xl border border-violet-200 bg-gradient-to-r from-violet-600 to-indigo-600 p-8 sm:p-10 text-center text-white shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-bold">
            Move beyond simple gauges to full server control.
          </h2>
          <p className="mt-2 text-sm sm:text-base text-violet-100 max-w-xl mx-auto">
            Get active safeguards, automated update protection, and agency audit reporting in one lightweight plugin.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center h-11 rounded-xl bg-white px-6 text-sm font-bold text-violet-900 shadow hover:bg-zinc-100 transition-colors">
              View Pricing ($39 - $79)
            </Link>
            <a
              href="https://demo.phpinfowp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-11 rounded-xl border border-white/40 bg-white/10 px-5 text-sm font-semibold text-white hover:bg-white/20 transition-colors">
              Explore Live Demo
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
