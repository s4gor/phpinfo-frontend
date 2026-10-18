import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ExeebitBar from "@/components/exeebit-bar";
import AnimatedArrow from "@/components/ui/animated-arrow";
import {
  Home,
  Play,
  Mail,
  Compass,
  ArrowUpRight,
  Terminal,
  ShieldCheck,
  Server,
  FileCode,
  CreditCard,
  BookOpen,
} from "lucide-react";

export const metadata: Metadata = {
  title: "404 - Page Not Found · phpinfo() WP",
  description: "The requested route does not exist or has been moved.",
  robots: { index: false, follow: false },
};

const SUGGESTED_LINKS = [
  {
    title: "Interactive Live Demo",
    desc: "Test-drive real OPcache telemetry and PHP compatibility in live wp-admin.",
    href: "https://demo.phpinfowp.com",
    badge: "Live WP Admin",
    icon: Play,
    isExternal: true,
  },
  {
    title: "Feature Suite",
    desc: "Deep server diagnostics, PHP 8.4 engine, and database scanner.",
    href: "/features",
    badge: "Product Tour",
    icon: Server,
    isExternal: false,
  },
  {
    title: "Plans & Pricing",
    desc: "Single site, unlimited agency, and lifetime license options from $39.",
    href: "/pricing",
    badge: "14-Day Refund",
    icon: CreditCard,
    isExternal: false,
  },
  {
    title: "Documentation",
    desc: "Step-by-step setup guides, server prerequisites, and directives.",
    href: "/docs",
    badge: "Guides",
    icon: BookOpen,
    isExternal: false,
  },
];

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-clip bg-zinc-50/50 dark:bg-zinc-950">
      <div className="fixed left-0 right-0 top-0 z-[60]">
        <ExeebitBar />
        <Header />
      </div>

      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 pt-32 pb-20 text-center sm:px-6 lg:px-8">
        {/* Ambient Glow */}
        <div className="absolute top-1/3 left-1/2 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/10 blur-3xl pointer-events-none" />

        {/* Status Pill */}
        <div className="inline-flex items-center gap-2 rounded-full border border-violet-200/90 bg-violet-50/90 px-3.5 py-1 text-xs font-semibold text-violet-800 shadow-2xs dark:border-violet-800/60 dark:bg-violet-950/50 dark:text-violet-300">
          <span className="flex h-2 w-2 rounded-full bg-violet-600 animate-pulse" />
          <span>HTTP 404 · Route Not Located</span>
        </div>

        {/* Huge 404 Heading */}
        <h1 className="mt-5 text-7xl font-extrabold tracking-tight sm:text-8xl md:text-9xl">
          <span className="bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-400 bg-clip-text text-transparent dark:from-white dark:via-zinc-200 dark:to-zinc-500">
            404
          </span>
        </h1>

        <h2 className="mt-4 max-w-lg text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-3xl">
          Server diagnostic: Endpoint not found.
        </h2>

        <p className="mt-3 max-w-md text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
          The URL you requested returned a 404 status. It may have been relocated, deleted, or entered with a typo in the route.
        </p>

        {/* Telemetry Diagnostic Card */}
        <div className="mt-6 w-full max-w-md rounded-xl border border-zinc-200 bg-white/90 p-4 text-left font-mono text-xs shadow-xs backdrop-blur-xs dark:border-zinc-800 dark:bg-zinc-900/90">
          <div className="flex items-center justify-between border-b border-zinc-100 pb-2 text-[11px] text-zinc-500 dark:border-zinc-800">
            <span className="flex items-center gap-1.5 font-sans font-medium text-zinc-700 dark:text-zinc-300">
              <Terminal className="h-3.5 w-3.5 text-violet-600 dark:text-violet-400" />
              Route Telemetry
            </span>
            <span className="rounded bg-rose-50 px-1.5 py-0.5 text-[10px] font-semibold text-rose-700 dark:bg-rose-950/60 dark:text-rose-400">
              ERR_HTTP_404
            </span>
          </div>
          <div className="space-y-1.5 pt-3 text-zinc-600 dark:text-zinc-400">
            <p className="flex justify-between">
              <span className="text-zinc-400 dark:text-zinc-500">status_code:</span>
              <span className="font-semibold text-rose-600 dark:text-rose-400">404 Not Found</span>
            </p>
            <p className="flex justify-between">
              <span className="text-zinc-400 dark:text-zinc-500">rewrite_status:</span>
              <span className="text-amber-600 dark:text-amber-400">NO_MATCHING_ENDPOINT</span>
            </p>
            <p className="flex justify-between">
              <span className="text-zinc-400 dark:text-zinc-500">telemetry_audit:</span>
              <span className="text-emerald-600 dark:text-emerald-400">100% In-Admin · Zero Leakage</span>
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_0_20px_-6px_rgba(167,139,250,0.6)] transition-all duration-150 ease-linear hover:bg-violet-700">
            <Home className="h-4 w-4" />
            <span>Return to Homepage</span>
            <AnimatedArrow className="ml-1" />
          </Link>
          <a
            href="https://demo.phpinfowp.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-300 bg-emerald-50/70 px-5 py-3 text-sm font-semibold text-emerald-900 shadow-xs transition hover:bg-emerald-100 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300">
            <span className="relative flex h-2 w-2 mr-0.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Explore Live Demo</span>
            <ArrowUpRight className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-5 py-3 text-sm font-semibold text-zinc-800 shadow-2xs transition hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800">
            <Mail className="h-4 w-4 text-violet-600 dark:text-violet-400" />
            <span>Contact Support</span>
          </Link>
        </div>

        {/* Suggested Destinations Grid */}
        <div className="mt-14 w-full max-w-2xl text-left">
          <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            <Compass className="h-3.5 w-3.5 text-violet-600 dark:text-violet-400" />
            <span>Verified Destinations</span>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {SUGGESTED_LINKS.map((link) => {
              const Icon = link.icon;
              const linkProps = link.isExternal
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {};
              return (
                <Link
                  key={link.title}
                  href={link.href}
                  {...linkProps}
                  className="group relative flex flex-col justify-between rounded-xl border border-zinc-200/90 bg-white/80 p-4 transition-all duration-150 hover:border-violet-300 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900/80 dark:hover:border-violet-700">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-50 text-violet-600 dark:bg-violet-950 dark:text-violet-400">
                          <Icon className="h-3.5 w-3.5" />
                        </div>
                        <span className="text-sm font-semibold text-zinc-900 group-hover:text-violet-600 dark:text-zinc-100 dark:group-hover:text-violet-400 transition-colors">
                          {link.title}
                        </span>
                      </div>
                      <span className="rounded-md bg-zinc-100 px-2 py-0.5 text-[10px] font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                        {link.badge}
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2">
                      {link.desc}
                    </p>
                  </div>
                  <div className="mt-3 flex items-center gap-1 text-[11px] font-semibold text-violet-600 dark:text-violet-400">
                    <span>Visit section</span>
                    {link.isExternal ? (
                      <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    ) : (
                      <AnimatedArrow className="ml-0.5" />
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
