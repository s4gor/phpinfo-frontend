"use client";

import React from "react";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ExeebitBar from "@/components/exeebit-bar";
import {
  Check,
  X,
  AlertTriangle,
  ShieldAlert,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

export default function VsHealthCheckPage() {
  const comparisonRows = [
    {
      capability: "Maintenance & Updates",
      phpinfo: "Actively maintained (V8.0 with WordPress 6.8 & PHP 8.4 engine)",
      healthCheck: "Neglected / unmaintained for over 2 years on WordPress.org",
    },
    {
      capability: "Troubleshooting Mode Safety",
      phpinfo: "Isolated to admin session only. Auto-restore safeguard prevents lockouts",
      healthCheck: "Known bugs can deactivate all plugins globally, leaving admins locked out",
    },
    {
      capability: "Update Guard (Pre-Flight Checks)",
      phpinfo: "Automated AST scan for breaking PHP/WP floor mismatches before update",
      healthCheck: "None. No pre-update or post-update safeguards",
    },
    {
      capability: "Client Retainer Deliverables",
      phpinfo: "White-label branded PDF audit reports with executive health grading",
      healthCheck: "Raw plain text copy/paste debug dump only",
    },
    {
      capability: "PHP Configuration & .htaccess",
      phpinfo: "In-admin syntax-validated editor with instant rollback",
      healthCheck: "Passive read-only info screen only",
    },
    {
      capability: "PHP EOL Timeline & Scanner",
      phpinfo: "Interactive lifecycle countdown & static compatibility analyzer",
      healthCheck: "Basic PHP version number warning only",
    },
    {
      capability: "Security Headers & SSL Monitor",
      phpinfo: "Live inspection of HSTS, CSP, X-Frame, and SSL certificate expiry",
      healthCheck: "Basic HTTPS status check only",
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
          <span className="text-zinc-900 dark:text-zinc-100 font-medium">vs Health Check &amp; Troubleshooting</span>
        </nav>

        {/* Hero Header */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3.5 py-1 text-xs font-semibold text-violet-700 dark:border-violet-900/60 dark:bg-violet-950/40 dark:text-violet-300 mb-4">
            <span>Modern Health Check Replacement</span>
          </div>
          <h1 className="max-w-4xl mx-auto text-balance text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl md:text-6xl leading-[1.12]">
            phpinfo() WP vs. Health Check &amp; Troubleshooting
          </h1>
          <p className="mx-auto max-w-2xl text-balance text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed mt-4">
            Health Check &amp; Troubleshooting was once the go-to plugin. Today, it suffers from abandoned development and dangerous lockout bugs. Here is why developers and agencies are upgrading to <strong>phpinfo() WP</strong>.
          </p>
        </div>

        {/* Callout Warning on Legacy Plugin */}
        <div className="rounded-2xl border border-amber-200 bg-amber-50/80 p-6 dark:border-amber-900/50 dark:bg-amber-950/30 mb-12 flex items-start gap-4">
          <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-amber-900 dark:text-amber-200">
              The Dangerous Lockout Bug in Health Check &amp; Troubleshooting
            </h3>
            <p className="text-xs sm:text-sm text-amber-800 dark:text-amber-300 leading-relaxed">
              When using the legacy Health Check plugin&apos;s Troubleshooting Mode, if a fatal error happens or your session expires, all plugins can remain disabled indefinitely, locking administrators out of their site. phpinfo() WP rebuilt Troubleshooting Mode from the ground up: sessions are strictly per-user, isolated, time-limited, and include an emergency 1-click restore mechanism.
            </p>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="rounded-2xl border border-zinc-200 bg-white overflow-hidden shadow-xs dark:border-zinc-800 dark:bg-zinc-900 mb-12">
          <div className="p-6 border-b border-zinc-100 dark:border-zinc-800">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
              Side-by-Side Breakdown
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
                <tr>
                  <th className="py-3.5 px-6 font-semibold text-zinc-900 dark:text-zinc-100">Capability</th>
                  <th className="py-3.5 px-6 font-semibold text-violet-700 dark:text-violet-400">phpinfo() WP Pro</th>
                  <th className="py-3.5 px-6 font-semibold text-zinc-600 dark:text-zinc-400">Health Check &amp; Troubleshooting</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/40 transition-colors">
                    <td className="py-4 px-6 font-medium text-zinc-900 dark:text-zinc-100">{row.capability}</td>
                    <td className="py-4 px-6 text-zinc-800 dark:text-zinc-200 font-medium">{row.phpinfo}</td>
                    <td className="py-4 px-6 text-zinc-500 dark:text-zinc-400">{row.healthCheck}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Migration Note */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 dark:border-zinc-800 dark:bg-zinc-900 mb-12 space-y-3">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
            Effortless Drop-In Replacement
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Replacing Health Check takes less than 60 seconds: deactivate Health Check &amp; Troubleshooting, install phpinfo() WP, and immediately access modern server diagnostics, the PHP EOL tracker, Update Guard safeguards, and one-click PDF audits.
          </p>
        </div>

        {/* Conversion CTA */}
        <div className="rounded-3xl border border-violet-200 bg-gradient-to-r from-violet-600 to-indigo-600 p-8 sm:p-10 text-center text-white shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-bold">
            Upgrade to a modern, supported diagnostics engine.
          </h2>
          <p className="mt-2 text-sm sm:text-base text-violet-100 max-w-xl mx-auto">
            Say goodbye to abandoned plugins and lockout bugs. Try phpinfo() WP risk-free with our 14-day refund guarantee.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center h-11 rounded-xl bg-white px-6 text-sm font-bold text-violet-900 shadow hover:bg-zinc-100 transition-colors">
              View Plans &amp; Pricing ($39 - $79)
            </Link>
            <a
              href="https://demo.phpinfowp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-11 rounded-xl border border-white/40 bg-white/10 px-5 text-sm font-semibold text-white hover:bg-white/20 transition-colors">
              Test Live Interactive Demo
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
