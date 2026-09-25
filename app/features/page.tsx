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
  Activity,
  FileText,
  Cpu,
  CheckCircle2,
  Lock,
  ArrowRight,
  Database,
  Terminal,
  Play,
  Sparkles,
  Server,
  Layers,
  FileSpreadsheet,
} from "lucide-react";
import { SiWordpress } from "react-icons/si";

export default function FeaturesPage() {
  const pillars = [
    {
      id: "safeguard",
      icon: Shield,
      badge: "Pillar 1 &bull; Crash Prevention",
      title: "Update Guard & Zero-Downtime Safe Deployments",
      lead: "Never fear clicking 'Update' again. Pre-flight floor checks and automated 60-second loopback health tests ensure your WooCommerce store never drops offline.",
      points: [
        "Pre-flight compatibility scanning (PHP floor, WP minimum, changelog risk parsing)",
        "Automated 60-second loopback health check immediately post-update",
        "Instant automatic rollback on fatal errors with zero visitor interruption",
        "Per-user isolated Troubleshooting Mode (your visitors never see a broken layout)",
      ],
      codeSample: `// Update Guard Pre-Flight Execution
$guard = new PIWP_Update_Guard([
    'target_plugin' => 'woocommerce/woocommerce.php',
    'php_floor'      => '7.4',
    'wp_floor'       => '6.5',
    'auto_rollback'  => true
]);
$status = $guard->execute_safe_stage(); // -> Status: HEALTHY`,
    },
    {
      id: "scanner",
      icon: Cpu,
      badge: "Pillar 2 &bull; Delta Compatibility",
      title: "Smart PHP 8.4 Upgrade Scanner (Zero False Alarms)",
      lead: "Older scanners flood you with 500+ false alarms on polyfills inside dormant vendor folders. phpinfo() WP tests real active code paths so you can upgrade hosting PHP with 100% confidence.",
      points: [
        "Relative delta scanning specifically for PHP 8.2 ➜ 8.3 ➜ 8.4 migrations",
        "Detects breaking syntax changes, implicit null deprecations, and removed functions",
        "Native AI plain-English explanations explaining why a function is deprecated",
        "1-click safe code patch generation for custom child themes and functions.php",
      ],
      codeSample: `// Smart Delta Scan Result
[PHP 8.4 Delta] 0 Fatal syntax errors detected
[Deprecation] functions.php:42 -> Implicitly nullable parameter $tax
[AI Fix Suggestion] Change "string $tax = null" to "?string $tax = null"
[Safety Index] 99.4% Ready for Host PHP 8.4 switch`,
    },
    {
      id: "optimize",
      icon: Zap,
      badge: "Pillar 3 &bull; TTFB & Throughput",
      title: "Live OPcache, Autoload Bloat & Server Snippets",
      lead: "Cut server TTFB in half without touching raw server configs. Inspect live OPcache hit rates, clean database autoload bloat, and inject safe Apache/Nginx rules with instant rollback.",
      points: [
        "Live OPcache visualizer (memory usage, hit rates, cached script counter)",
        "wp_options Autoload bloat scanner (identifies massive transient bloat draining RAM)",
        "Missing MySQL database index detector for high-traffic WooCommerce sites",
        "1-click Server Snippet library (Brotli compression, Expires headers, Bad Bots blocker)",
      ],
      codeSample: `# Generated Safe Server Snippet (Apache / Nginx)
# Expires Headers: Static Assets 1 Year
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
</IfModule>`,
    },
    {
      id: "monitor",
      icon: Activity,
      badge: "Pillar 4 &bull; Security & Auditing",
      title: "Admin Activity Log & Loopback Security Audit",
      lead: "Know exactly who changed what, when, and from what IP address. Auto-fix missing security headers and track SSL certificate expiry days before disaster strikes.",
      points: [
        "Real-time Admin Activity Log: plugin changes, logins, role updates with 1-click CSV export",
        "Real visitor IP resolution behind Cloudflare, LiteSpeed, and reverse proxies",
        "Loopback Security Headers auditor with 1-click auto-fix injection",
        "SSL certificate expiry monitor & stuck WP-Cron queue alerts",
      ],
      codeSample: `// Security Audit Loopback Result
[Header Audit] Missing: Content-Security-Policy, X-Frame-Options
[Action Available] Click "Auto-Fix Missing Headers"
[Result] Security Grade improved from F (Zero headers) to A+ (All 6 active)`,
    },
    {
      id: "deliver",
      icon: FileText,
      badge: "Pillar 5 &bull; Client Deliverables",
      title: "White-Label PDF Reports for Agencies & Freelancers",
      lead: "Turn routine server maintenance into recurring retainer revenue. Export beautifully branded executive audit reports customized with your agency logo and colors.",
      points: [
        "100% white-label client PDF audit reports (zero phpinfo() WP branding)",
        "Custom agency logo, company name, and client domain headers",
        "Executive summaries with overall health score (A to F) ready for client review",
        "Scheduled weekly/monthly health digests delivered directly to client inboxes",
      ],
      codeSample: `// Generated Client Deliverable
Agency: Apex Digital Web Studio
Client: Acme eCommerce Store
Grade: A+ (98/100)
Executive Summary: 0 security vulnerabilities, OPcache optimal (96%),
Update Guard active, PHP 8.3 certified.`,
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

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-normal text-zinc-900 dark:text-zinc-100 max-w-4xl mx-auto leading-snug sm:leading-tight">
          Everything You Need to Run Bulletproof WordPress Servers
        </h1>

        <p className="mt-3.5 text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
          From automated pre-flight update protection to live OPcache telemetry and white-label client reporting — all inside your native WP admin.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link href="/demo">
            <Button size="lg" className="rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold px-6 shadow-sm">
              <Play className="mr-2 h-4 w-4" />
              <span>Try It Live In Sandbox</span>
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

      {/* Feature Deep Dive Pillars */}
      <section className="w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-8 space-y-16">
        {pillars.map((pillar, idx) => {
          const Icon = pillar.icon;
          const isEven = idx % 2 === 1;

          return (
            <div
              key={pillar.id}
              className={`rounded-3xl border border-zinc-200 bg-white p-6 sm:p-10 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center`}>
              <div className={`lg:col-span-7 space-y-4 ${isEven ? "lg:order-2" : ""}`}>
                <div className="inline-flex items-center gap-2 rounded-md bg-violet-100 px-2.5 py-1 text-xs font-bold text-violet-700 dark:bg-violet-950 dark:text-violet-300">
                  <Icon className="h-3.5 w-3.5" />
                  <span dangerouslySetInnerHTML={{ __html: pillar.badge }} />
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
                  {pillar.title}
                </h2>

                <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {pillar.lead}
                </p>

                <ul className="space-y-2.5 pt-2">
                  {pillar.points.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Code / Visual Box */}
              <div className={`lg:col-span-5 ${isEven ? "lg:order-1" : ""}`}>
                <div className="rounded-2xl bg-zinc-950 p-5 font-mono text-xs text-zinc-300 shadow-md border border-zinc-800 overflow-x-auto">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-800/80 text-[11px] text-zinc-500">
                    <span className="flex items-center gap-1.5">
                      <Terminal className="h-3.5 w-3.5 text-violet-400" />
                      <span>Live Intelligence Stream</span>
                    </span>
                    <span className="text-emerald-400 font-bold">READY</span>
                  </div>
                  <pre className="text-[11px] sm:text-xs leading-relaxed text-zinc-300 whitespace-pre-wrap">
                    {pillar.codeSample}
                  </pre>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Screenshots Gallery Section */}
      <section className="w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Engineered for Modern WordPress Dashboards
          </h2>
          <p className="mt-2 text-sm text-zinc-500">
            Intuitive, lightning fast, and crafted with attention to every pixel.
          </p>
        </div>
        <Screenshots />
      </section>

      {/* Bottom CTA Banner */}
      <section className="w-full max-w-6xl px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
        <div className="rounded-3xl bg-zinc-900 p-8 sm:p-12 text-white text-center shadow-xl border border-zinc-800">
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
            Stop guessing server health. Start managing it like a pro.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-400 max-w-xl mx-auto">
            Join thousands of WordPress agencies, store owners, and freelancers who rely on phpinfo() WP every day.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link href="/pricing">
              <Button size="lg" className="rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold px-6">
                <span>Get Pro License</span>
                <AnimatedArrow className="ml-2" />
              </Button>
            </Link>
            <Link href="/demo">
              <Button size="lg" variant="ghost" className="rounded-xl text-zinc-300 hover:text-white hover:bg-zinc-800 font-semibold px-5 border border-zinc-700">
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
