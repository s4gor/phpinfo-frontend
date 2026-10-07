"use client";

import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ExeebitBar from "@/components/exeebit-bar";
import AnimatedArrow from "@/components/ui/animated-arrow";
import {
  ShieldCheck,
  Server,
  Heart,
  Globe2,
  Code2,
  Lock,
  Zap,
  ArrowRight,
  ExternalLink,
  Mail,
  CheckCircle2,
} from "lucide-react";

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col items-center overflow-x-clip bg-zinc-50/50 dark:bg-zinc-950 pt-24 sm:pt-28 lg:pt-36">
      <div className="fixed left-0 right-0 top-0 z-[60]">
        <ExeebitBar />
        <Header />
      </div>

      {/* Hero Section */}
      <section className="w-full max-w-5xl px-4 sm:px-6 lg:px-8 pt-4 pb-12 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3.5 py-1 text-xs font-semibold text-violet-700 dark:border-violet-900/60 dark:bg-violet-950/40 dark:text-violet-300 mb-4">
          <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500/20" />
          <span>About phpinfo() WP</span>
        </div>

        <h1 className="max-w-3xl text-balance text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl md:text-6xl leading-[1.12] mx-auto">
          Made with care by one person.
        </h1>

        <p className="mt-4 text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          phpinfo() WP is an independent software tool created by Emran Hossain Sagor (<a href="https://s4gor.exeebit.com" target="_blank" rel="noopener noreferrer" className="text-violet-600 dark:text-violet-400 font-semibold underline underline-offset-2 hover:text-violet-700">@s4gor</a>) to craft developer tools and WordPress software. Based in Germany.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
          <a
            href="mailto:emran@exeebit.com"
            className="flex items-center gap-1.5 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
            <Mail className="h-3.5 w-3.5" />
            <span>emran@exeebit.com</span>
          </a>
          <span className="text-zinc-300 dark:text-zinc-700">&bull;</span>
          <a
            href="https://s4gor.exeebit.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
            <Globe2 className="h-3.5 w-3.5" />
            <span>Portfolio</span>
          </a>
          <span className="text-zinc-300 dark:text-zinc-700">&bull;</span>
          <a
            href="https://github.com/exeebit"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
            <Code2 className="h-3.5 w-3.5" />
            <span>GitHub</span>
          </a>
          <span className="text-zinc-300 dark:text-zinc-700">&bull;</span>
          <a
            href="https://x.com/exeebit"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
            @exeebit
          </a>
        </div>
      </section>

      {/* Story & Philosophy */}
      <section className="w-full max-w-4xl px-4 sm:px-6 lg:px-8 pb-16">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-10 shadow-xs dark:border-zinc-800 dark:bg-zinc-900 space-y-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              The Story Behind phpinfo() WP
            </h2>
            <div className="mt-4 space-y-4 text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
              <p>
                Seven years of building software taught one recurring lesson: <em>stay small, ship slowly, and listen attentively to real engineering problems</em>.
              </p>
              <p>
                Every WordPress agency owner and developer knows the exact sinking feeling: an automatic or routine plugin update triggers a fatal PHP error or database mismatch, breaking a high-value client store in the middle of the day. Meanwhile, native WordPress diagnostic tools only show raw text tables or passive summaries without triage suggestions, and external SaaS monitors charge endless per-site subscriptions ($3-$5/month per site) while harvesting sensitive hosting credentials and error dumps onto remote servers.
              </p>
              <p>
                We built <strong className="text-zinc-900 dark:text-zinc-100">phpinfo() WP</strong> to eliminate both problems in one stroke. It delivers actionable, proactive server operations, automated pre/post-update safeguards, an admin security audit log, and white-labeled PDF health reports, completely inside your WordPress admin dashboard, with zero external SaaS dependencies.
              </p>
            </div>
          </div>

          <div className="border-t border-zinc-100 dark:border-zinc-800 pt-8">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-6">
              Our Core Principles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="rounded-xl border border-zinc-200/80 bg-zinc-50/70 p-5 dark:border-zinc-800 dark:bg-zinc-950/40">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300 mb-3">
                  <Lock className="h-4 w-4" />
                </div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-1.5">
                  100% In-Admin &amp; Private
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Your server diagnostics, database schemas, PHP configurations, and user audit trails never leave your host. No third-party data tracking, no external API latency.
                </p>
              </div>

              <div className="rounded-xl border border-zinc-200/80 bg-zinc-50/70 p-5 dark:border-zinc-800 dark:bg-zinc-950/40">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 mb-3">
                  <Zap className="h-4 w-4" />
                </div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-1.5">
                  Flat, Honest Pricing
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  No monthly per-site meter fees. Single $39/yr, Unlimited $79/yr, or Lifetime $249 once. Full feature parity, predictable budgeting, and 14-day money-back guarantee.
                </p>
              </div>

              <div className="rounded-xl border border-zinc-200/80 bg-zinc-50/70 p-5 dark:border-zinc-800 dark:bg-zinc-950/40">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 mb-3">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-1.5">
                  Zero Gimmicks &amp; No Bloat
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Engineered using strict WordPress coding standards. Lightweight asset footprint, lazy-loaded tab views, and zero background database polling clutter.
                </p>
              </div>

              <div className="rounded-xl border border-zinc-200/80 bg-zinc-50/70 p-5 dark:border-zinc-800 dark:bg-zinc-950/40">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300 mb-3">
                  <Server className="h-4 w-4" />
                </div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-1.5">
                  German Quality &amp; Compliance
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Operated pursuant to strict EU GDPR principles and German legal standards (§ 5 DDG). Built by an experienced sole proprietorship based in Germany.
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-zinc-100 dark:border-zinc-800 pt-8">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-4">
              Get in Touch Directly
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
              Have questions about roadmap plans, custom agency white-labeling, or enterprise deployments? I read and reply to every message personally.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center h-10 rounded-xl bg-violet-500 hover:bg-violet-600 px-5 text-sm font-semibold text-white shadow-[0_0_20px_-6px_rgba(167,139,250,0.6)] transition-all">
                <span>Contact Us</span>
                <AnimatedArrow className="ml-1.5" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center h-10 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 px-4 text-sm font-semibold text-zinc-800 transition-colors dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:text-zinc-200">
                View Pricing Plans
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
