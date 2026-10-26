"use client";

import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ExeebitBar from "@/components/exeebit-bar";
import { Button } from "@/components/ui/button";
import AnimatedArrow from "@/components/ui/animated-arrow";
import AnimatedShinyText from "@/components/ui/shimmer-text";
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
      <section className="w-full max-w-6xl px-4 sm:px-6 lg:px-8 pt-4 text-center">
        <div className="flex w-full max-w-4xl mx-auto flex-col items-center text-center">
          <div className="mb-3.5">
            <div className="group inline-flex items-center gap-2 rounded-full border border-violet-200/90 bg-violet-50/90 hover:bg-violet-100/90 px-3.5 py-1.5 text-center transition-all duration-150 shadow-xs dark:border-violet-900/60 dark:bg-violet-950/40">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <AnimatedShinyText className="text-xs font-semibold text-violet-800 dark:text-violet-300">
                <span>Complete WordPress Server Diagnostic Suite</span>
              </AnimatedShinyText>
            </div>
          </div>

          <h1 className="max-w-4xl text-balance text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl md:text-6xl leading-[1.12] mx-auto">
            Everything you need to run{" "}
            <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              bulletproof WordPress servers.
            </span>
          </h1>

          <p className="md:mt-5 mt-3.5 text-base text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Four cohesive suites in one native dashboard: Compatibility, Performance, Safe Operations, and Agency Deliverables - with zero SaaS fees and zero telemetry.
          </p>
        </div>

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
      <section className="w-full max-w-6xl px-4 sm:px-6 lg:px-8 pt-16 md:pt-24 space-y-16">
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

              {/* Authentic WordPress Admin Plugin UI Preview Column */}
              <div className="flex-1 w-full max-w-xl">
                <div className="rounded-2xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xl overflow-hidden text-xs">
                  {/* Plugin Header Bar (matches WordPress Admin) */}
                  <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="font-semibold text-zinc-800 dark:text-zinc-200 text-xs">
                        {pillar.id === "compatibility" && "PHP Compatibility Scanner"}
                        {pillar.id === "performance" && "OPcache & Database Telemetry"}
                        {pillar.id === "safe-operations" && "Update Guard & Troubleshooting"}
                        {pillar.id === "agency" && "Executive Client PDF Audit"}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-violet-700 dark:text-violet-300 bg-violet-100 dark:bg-violet-950 px-2 py-0.5 rounded-full uppercase tracking-wider">
                      PRO ACTIVE
                    </span>
                  </div>

                  {/* Plugin Interface Body */}
                  <div className="p-4 sm:p-5 space-y-3 bg-zinc-50/50 dark:bg-zinc-900/50">
                    {/* Suite 1: Compatibility Scanner UI */}
                    {pillar.id === "compatibility" && (
                      <>
                        <div className="flex items-center justify-between p-2.5 rounded-xl border border-emerald-200/80 bg-emerald-50/70 dark:border-emerald-900/40 dark:bg-emerald-950/30">
                          <div className="flex items-center gap-2">
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white font-bold text-xs">✓</span>
                            <div>
                              <div className="font-bold text-emerald-900 dark:text-emerald-200 text-xs">PHP 8.4 Upgrade Safe</div>
                              <div className="text-[11px] text-emerald-700 dark:text-emerald-400">1,480 files scanned across active plugins &amp; themes</div>
                            </div>
                          </div>
                          <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300">
                            0 BREAKING
                          </span>
                        </div>

                        <div className="space-y-2">
                          <div className="rounded-xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-3 space-y-1.5 border-l-4 border-l-amber-500 shadow-2xs">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-zinc-900 dark:text-zinc-100 font-mono text-[11px]">functions.php:42</span>
                              <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                                DEPRECATED
                              </span>
                            </div>
                            <p className="text-[11px] text-zinc-600 dark:text-zinc-400 font-mono">
                              Deprecated in PHP 8.2: <code>utf8_encode()</code>
                            </p>
                            <div className="text-[11px] text-violet-700 dark:text-violet-400 font-medium pt-0.5 flex items-center justify-between">
                              <span>Recommended fix: <code>mb_convert_encoding()</code></span>
                              <span className="text-[10px] font-bold underline cursor-pointer">1-Click Patch</span>
                            </div>
                          </div>

                          <div className="rounded-xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-3 space-y-1.5 border-l-4 border-l-emerald-500 shadow-2xs">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-zinc-900 dark:text-zinc-100 text-xs">WooCommerce Core v9.2</span>
                              <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                                100% PASS
                              </span>
                            </div>
                            <p className="text-[11px] text-zinc-600 dark:text-zinc-400">
                              0 fatal syntax errors, 0 removed functions under PHP 8.4 runtime.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-1 text-[11px] text-zinc-500 dark:text-zinc-400">
                          <span>Target: PHP 8.4 · AST Delta Scanner</span>
                          <span className="font-semibold text-emerald-600 dark:text-emerald-400">Ready to Switch Host</span>
                        </div>
                      </>
                    )}

                    {/* Suite 2: Performance Suite UI */}
                    {pillar.id === "performance" && (
                      <>
                        <div className="grid grid-cols-3 gap-2 text-center">
                          <div className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xs">
                            <div className="text-[10px] text-zinc-500 uppercase font-bold">OPcache Hit Rate</div>
                            <div className="text-base font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5">96.4%</div>
                            <div className="text-[10px] text-zinc-400">1,420 Cached</div>
                          </div>
                          <div className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xs">
                            <div className="text-[10px] text-zinc-500 uppercase font-bold">Memory Ceiling</div>
                            <div className="text-base font-extrabold text-violet-600 dark:text-violet-400 mt-0.5">64M / 512M</div>
                            <div className="text-[10px] text-zinc-400">13% In Use</div>
                          </div>
                          <div className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xs">
                            <div className="text-[10px] text-zinc-500 uppercase font-bold">Autoload Size</div>
                            <div className="text-base font-extrabold text-amber-600 dark:text-amber-400 mt-0.5">380 KB</div>
                            <div className="text-[10px] text-zinc-400">Target &lt; 800K</div>
                          </div>
                        </div>

                        <div className="rounded-xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-3 space-y-2 shadow-2xs">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                              <Database className="h-3.5 w-3.5 text-violet-600" />
                              MySQL Index Scanner
                            </span>
                            <span className="text-[10px] font-bold text-amber-700 bg-amber-100 dark:bg-amber-950 dark:text-amber-300 px-2 py-0.5 rounded-full">
                              Optimization Available
                            </span>
                          </div>
                          <p className="text-[11px] text-zinc-600 dark:text-zinc-400">
                            Missing index on <code>wp_woocommerce_order_items (order_id)</code> slowing checkout lookups by ~180ms.
                          </p>
                          <div className="flex items-center justify-between pt-1">
                            <span className="text-[10px] font-mono text-zinc-400">InnoDB · 142 total tables</span>
                            <span className="text-[11px] font-bold text-violet-600 dark:text-violet-400 underline cursor-pointer">
                              Apply Index (1-Click)
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-1 text-[11px] text-zinc-500 dark:text-zinc-400">
                          <span>Live TTFB Monitor</span>
                          <span className="font-semibold text-emerald-600 dark:text-emerald-400">OPcache Buffer: 42MB Free</span>
                        </div>
                      </>
                    )}

                    {/* Suite 3: Safe Operations Suite UI */}
                    {pillar.id === "safe-operations" && (
                      <>
                        <div className="p-3 rounded-xl border border-violet-200 bg-gradient-to-r from-violet-50 to-indigo-50/40 dark:border-violet-900/50 dark:bg-violet-950/30 flex items-center justify-between">
                          <div>
                            <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                              <Shield className="h-3.5 w-3.5 text-violet-600" />
                              Troubleshooting Mode Active
                            </div>
                            <div className="text-[11px] text-zinc-600 dark:text-zinc-400 mt-0.5">
                              Only your session (Admin #1) sees debugging state. Visitors see live theme.
                            </div>
                          </div>
                          <span className="text-[10px] font-bold text-violet-800 dark:text-violet-300 bg-white dark:bg-zinc-900 px-2.5 py-1 rounded-lg border border-violet-200 dark:border-violet-800 shadow-2xs">
                            Isolated
                          </span>
                        </div>

                        <div className="rounded-xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-3 space-y-2 shadow-2xs border-l-4 border-l-emerald-500">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-zinc-900 dark:text-zinc-100 text-xs">Update Guard: Loopback Health Test</span>
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 uppercase">
                              PASS 200 OK
                            </span>
                          </div>
                          <p className="text-[11px] text-zinc-600 dark:text-zinc-400">
                            Automatic 60s post-update verification checked HTTP loopback, fatal errors, and background WP-Cron queue.
                          </p>
                          <div className="flex items-center justify-between pt-0.5 text-[10px] text-zinc-400">
                            <span>Auto-Rollback Snapshot: armed</span>
                            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Zero Store Disruption</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-1 text-[11px] text-zinc-500 dark:text-zinc-400">
                          <span>Safety Guard Suite v8.0</span>
                          <span className="font-semibold text-violet-600 dark:text-violet-400">Auto-Restore Safeguard Ready</span>
                        </div>
                      </>
                    )}

                    {/* Suite 4: Agency Suite UI */}
                    {pillar.id === "agency" && (
                      <>
                        <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xs space-y-2.5">
                          <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-2">
                            <div className="flex items-center gap-2">
                              <div className="h-6 w-6 rounded bg-violet-600 text-white font-bold flex items-center justify-center text-[10px]">
                                AD
                              </div>
                              <div>
                                <div className="font-bold text-zinc-900 dark:text-zinc-100 text-xs">Apex Digital Web Studio</div>
                                <div className="text-[10px] text-zinc-400">Prepared for Client: Acme Store</div>
                              </div>
                            </div>
                            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-extrabold text-xs">
                              A+
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-[11px]">
                            <div className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-950">
                              <span className="text-zinc-400 block text-[10px]">Security Directives</span>
                              <span className="font-bold text-zinc-800 dark:text-zinc-200">19 / 19 Passed (100%)</span>
                            </div>
                            <div className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-950">
                              <span className="text-zinc-400 block text-[10px]">PHP EOL Lifecycle</span>
                              <span className="font-bold text-emerald-600 dark:text-emerald-400">PHP 8.3 Supported ✓</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-1">
                            <span className="text-[10px] text-zinc-400">Custom Logo · Branded Hex Accent · No WP mentions</span>
                            <span className="text-[11px] font-bold text-violet-600 dark:text-violet-400 underline cursor-pointer">
                              Export PDF Report →
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-1 text-[11px] text-zinc-500 dark:text-zinc-400">
                          <span>Unlimited Client Retainers</span>
                          <span className="font-semibold text-emerald-600 dark:text-emerald-400">White-Label Unlocked</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Screenshots Gallery Section */}
      <section className="w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <Screenshots />
      </section>

      <Footer />
    </main>
  );
}
