"use client";

import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ExeebitBar from "@/components/exeebit-bar";
import { Button } from "@/components/ui/button";
import AnimatedArrow from "@/components/ui/animated-arrow";
import Screenshots from "@/components/screenshots";
import {
  Shield,
  Zap,
  Cpu,
  FileText,
  Play,
  Sparkles,
  CheckCircle2,
  Lock,
  ArrowRight,
  Database,
  Terminal,
  Server,
  Layers,
} from "lucide-react";

export default function FeaturesPage() {
  const pillars = [
    {
      id: "compatibility",
      icon: Cpu,
      badge: "Suite 1 &bull; Compatibility & Upgrades",
      title: "The Compatibility Suite",
      lead: "PHP 7.4-8.4 syntax scanner, WordPress 6.8 readiness, and deprecated function alerts. Upgrade hosting PHP versions with zero fear of fatal crashes or white-screens.",
      points: [
        "Pre-flight PHP 7.4-8.4 AST syntax scanner (know what breaks BEFORE updating)",
        "WordPress 6.8 readiness check & deprecated function alerts",
        "Smart delta scanning: zero false alarms inside dormant vendor libraries",
        "1-click safe code patch generation for child themes & functions.php",
      ],
      codeSample: `// Compatibility Suite: Pre-Flight AST Scanner
$scanner = new PIWP_Compat_Scanner(['target_php' => '8.4', 'wp_core' => '6.8']);
$report  = $scanner->run_preflight();
// -> Result: 0 Fatal syntax errors, 1 deprecation in functions.php:42
// -> Status: 100% Ready for Host PHP 8.4 Switch`,
    },
    {
      id: "performance",
      icon: Zap,
      badge: "Suite 2 &bull; Speed & Throughput",
      title: "The Performance Suite",
      lead: "Live OPcache hit rate telemetry, MySQL missing index scanner, and autoload bloat visualizer. Cut server TTFB in half without touching raw server configs.",
      points: [
        "Live OPcache & Object Cache telemetry (memory usage, hit rates, script counts)",
        "Missing MySQL database index detector for high-traffic WooCommerce sites",
        "wp_options autoload bloat visualizer (identifies transient leaks draining RAM)",
        "1-click Server Snippet library (Brotli compression, Expires headers, Bad Bots)",
      ],
      codeSample: `# Performance Suite: Server Telemetry
[OPcache] 96.4% Hit Rate · 1,420 Cached Scripts · 42MB Free Buffer
[Database] 2 Missing Indexes detected on wp_woocommerce_order_items
[Autoload] 1.8MB options table bloat scanned · 1-Click Clean available`,
    },
    {
      id: "safe-operations",
      icon: Shield,
      badge: "Suite 3 &bull; Risk & Downtime Prevention",
      title: "The Safe-Operations Suite",
      lead: "Per-user isolated troubleshooting mode, sensitive file exposure audit, and .htaccess editor with automatic backup. Fix bugs live without real customers noticing.",
      points: [
        "Safe per-user Troubleshooting Mode (your visitors never see a broken layout)",
        "Update Guard: automated 60-second loopback health checks post-update",
        "Sensitive file exposure & 777 permissions scanner (.env, backup zips, git folders)",
        "In-admin .htaccess & nginx snippet editor with instant automatic rollback",
      ],
      codeSample: `// Safe-Operations Suite: Per-User Session Isolation
$session = new PIWP_Troubleshooter(['admin_user_id' => 1]);
$session->isolate_theme('twentytwentyfour');
// -> Live store visitors continue seeing active storefront
// -> Only Admin #1 experiences isolated troubleshooting environment`,
    },
    {
      id: "agency",
      icon: FileText,
      badge: "Suite 4 &bull; Client Deliverables",
      title: "The Agency Suite",
      lead: "White-label PDF exporter, Slack/Discord health webhooks, and centralized network multi-site support. Turn routine maintenance into recurring retainer revenue.",
      points: [
        "100% white-label client PDF audit reports (branded with your agency logo)",
        "Slack and Discord webhook alerts so you hear about server issues before clients do",
        "Multi-site (Network) centralized dashboard across all client installs",
        "Executive summaries with overall health score (A to F) ready for client invoices",
      ],
      codeSample: `// Agency Suite: White-Label Deliverable
Agency: Apex Digital Web Studio
Client: Acme Store (Staging & Production)
Grade: A+ (99/100)
Executive Summary: 0 breaking deprecations, OPcache optimal,
PHP 8.4 certified, 0 security vulnerabilities.`,
    },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center overflow-x-clip pt-24 sm:pt-28 lg:pt-36 bg-zinc-50/50 dark:bg-zinc-950">
      <div className="fixed left-0 right-0 top-0 z-[60]">
        <ExeebitBar />
        <Header />
      </div>

      {/* Hero Section */}
      <section className="w-full max-w-6xl px-4 sm:px-6 lg:px-8 pt-4 pb-12 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3.5 py-1 text-xs font-semibold text-violet-700 dark:border-violet-900/60 dark:bg-violet-950/40 dark:text-violet-300 mb-3">
          <Sparkles className="h-3.5 w-3.5" /> Complete Pro v8.0 Capabilities
        </div>

        <h1 className="max-w-4xl text-balance text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl md:text-6xl leading-[1.12] mx-auto">
          Everything You Need to Run Bulletproof WordPress Servers
        </h1>

        <p className="mt-3.5 text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
          Four cohesive suites in one native dashboard: Compatibility, Performance, Safe Operations, and Agency Deliverables - with zero SaaS fees and zero telemetry.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a href="https://demo.phpinfowp.com" target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold px-6 shadow-sm">
              <Play className="mr-2 h-4 w-4" />
              <span>Try it live In Sandbox</span>
            </Button>
          </a>
          <Link href="/pricing">
            <Button size="lg" variant="outline" className="rounded-xl border-zinc-300 font-semibold px-6 dark:border-zinc-800 dark:text-zinc-200">
              <span>View Pricing Plans</span>
              <AnimatedArrow className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Feature Deep Dive Pillars */}
      <section className="w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-8 space-y-16">
        {pillars.map((pillar, idx) => {
          const Icon = pillar.icon;
          const isEven = idx % 2 === 1;

          return (
            <div
              key={pillar.id}
              id={pillar.id}
              className={`flex flex-col lg:flex-row items-center gap-10 lg:gap-14 ${
                isEven ? "lg:flex-row-reverse" : ""
              }`}>
              {/* Text Description Column */}
              <div className="flex-1 space-y-4">
                <span
                  className="inline-flex items-center gap-1.5 rounded-full bg-violet-100 dark:bg-violet-950/60 px-3 py-1 text-xs font-semibold text-violet-800 dark:text-violet-300"
                  dangerouslySetInnerHTML={{ __html: pillar.badge }}
                />

                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                  {pillar.title}
                </h2>

                <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {pillar.lead}
                </p>

                <ul className="space-y-2.5 pt-2">
                  {pillar.points.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2.5 text-sm text-zinc-700 dark:text-zinc-300">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-2">
                  <a
                    href="https://demo.phpinfowp.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-violet-700 hover:text-violet-800 dark:text-violet-400 dark:hover:text-violet-300">
                    <span>Test this feature live in sandbox</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>

              {/* Terminal Code Mockup Column */}
              <div className="flex-1 w-full max-w-xl">
                <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-900 text-zinc-100 shadow-xl overflow-hidden font-mono text-xs">
                  {/* Window Bar */}
                  <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-950 border-b border-zinc-800">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    </div>
                    <span className="text-[11px] text-zinc-500">{pillar.id}.engine.log</span>
                    <Icon className="h-3.5 w-3.5 text-zinc-400" />
                  </div>
                  {/* Code Body */}
                  <div className="p-5 overflow-x-auto">
                    <pre className="text-emerald-400 font-mono text-xs leading-relaxed whitespace-pre">
                      {pillar.codeSample}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Screenshots Gallery Section */}
      <section className="w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
        <Screenshots />
      </section>

      <Footer />
    </main>
  );
}
