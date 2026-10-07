"use client";

import React from "react";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ExeebitBar from "@/components/exeebit-bar";
import { ArrowRight, ShieldCheck, Zap, Database, Server, ChevronRight } from "lucide-react";

export default function VsIndexPage() {
  const competitors = [
    {
      slug: "query-monitor",
      title: "phpinfo() WP vs. Query Monitor",
      subtitle: "Production Operations vs. Local Query Profiling",
      desc: "Why Query Monitor is great for local SQL queries, but phpinfo() WP is engineered for production with 0.00ms frontend overhead, Update Guard crash safeguards, and white-label client PDF audits.",
      icon: Database,
    },
    {
      slug: "health-check-troubleshooting",
      title: "phpinfo() WP vs. Health Check & Troubleshooting",
      subtitle: "Active Engineering vs. Unmaintained Legacy",
      desc: "Health Check has been unmaintained for over two years with critical lockout bugs. Discover why developers are upgrading to our safe, session-isolated diagnostic engine.",
      icon: ShieldCheck,
    },
    {
      slug: "wp-server-stats",
      title: "phpinfo() WP vs. WP Server Stats",
      subtitle: "Complete Operations Stack vs. Basic Gauges",
      desc: "Move beyond simple CPU/RAM dials. Discover actionable pre-update safeguards, autoload bloat scanning, PHP configuration editors, and executive audit reports.",
      icon: Server,
    },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center overflow-x-clip bg-zinc-50/50 dark:bg-zinc-950 pt-24 sm:pt-28 lg:pt-36">
      <div className="fixed left-0 right-0 top-0 z-[60]">
        <ExeebitBar />
        <Header />
      </div>

      <div className="w-full max-w-5xl px-4 sm:px-6 lg:px-8 pt-4 pb-20">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-zinc-500 mb-6">
          <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-100">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-zinc-900 dark:text-zinc-100 font-medium">Competitor Comparisons</span>
        </nav>

        <div className="text-center max-w-4xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3.5 py-1 text-xs font-semibold text-violet-700 dark:border-violet-900/60 dark:bg-violet-950/40 dark:text-violet-300 mb-4">
            <span>WordPress Diagnostic Plugin Alternatives</span>
          </div>
          <h1 className="max-w-4xl mx-auto text-balance text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl md:text-6xl leading-[1.12]">
            How phpinfo() WP Compares
          </h1>
          <p className="mx-auto max-w-2xl text-balance text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed mt-4">
            Unbiased architectural comparisons between phpinfo() WP and alternative WordPress diagnostic, maintenance, and monitoring tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {competitors.map((c) => {
            const Icon = c.icon;
            return (
              <Link
                key={c.slug}
                href={`/vs/${c.slug}`}
                className="group flex flex-col justify-between p-6 rounded-2xl border border-zinc-200 bg-white hover:border-violet-300 hover:shadow-md transition-all dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-violet-700">
                <div className="space-y-3">
                  <div className="h-10 w-10 rounded-xl bg-violet-100 dark:bg-violet-950 text-violet-600 dark:text-violet-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="text-xs font-semibold text-violet-600 dark:text-violet-400">
                    {c.subtitle}
                  </div>
                  <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                    {c.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {c.desc}
                  </p>
                </div>
                <div className="pt-6 flex items-center gap-1.5 text-xs font-semibold text-violet-600 dark:text-violet-400 group-hover:underline">
                  <span>Read full comparison</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Global Compare CTA */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 dark:border-zinc-800 dark:bg-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              Looking for our multi-tool comparison matrix?
            </h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              View our complete feature table comparing phpinfo() WP against Health Check, Query Monitor, and SaaS monitoring services.
            </p>
          </div>
          <Link
            href="/compare"
            className="shrink-0 inline-flex items-center justify-center h-11 rounded-xl bg-violet-600 hover:bg-violet-700 px-5 text-sm font-semibold text-white transition-colors">
            View Full Comparison Grid
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
