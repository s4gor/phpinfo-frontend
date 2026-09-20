import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Sparkles, ArrowRight, CheckCircle2, ShieldCheck, Zap } from "lucide-react";

export default function ChangelogPage() {
  const releases = [
    {
      version: "v8.0.0",
      date: "September 2026",
      tag: "Latest Major",
      badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-300",
      headline: "1-Click Permissions Auto-Fix & Host Lock Detection Engine",
      highlights: [
        "Added 1-Click Auto-Fix Permissions button directly in the WordPress admin to harden wp-config.php (0600) and directories (0755) via native PHP.",
        "Introduced Host Lock Detection to detect whether directives take effect via .user.ini, php.ini, or host dashboards.",
        "Refactored Safe Mode with cookie-based mu-plugin isolation, ensuring 100% zero downtime for live visitors during plugin troubleshooting.",
        "Added WP-CLI headless scan and permissions auto-fix commands (wp phpinfo fix-perms).",
      ],
    },
    {
      version: "v7.8.0",
      date: "August 2026",
      tag: "Feature Release",
      badgeColor: "bg-violet-50 text-violet-700 border-violet-200",
      headline: "Update Guard Pre-Flight Scanner & OPcache Telemetry",
      highlights: [
        "Launched Update Guard: pre-update safety probe that inspects pending plugin upgrades for deprecated PHP 8.3/8.4 syntax.",
        "New OPcache Engine Visualizer with live hit-rate ratio, memory consumption buffer, and restart alert counters.",
        "Integrated white-labeled Executive PDF Audit report generator with custom agency logo upload.",
      ],
    },
    {
      version: "v7.0.0",
      date: "June 2026",
      tag: "Major Architecture",
      badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
      headline: "PHP 8.3 Compatibility Engine & Security Headers Matrix",
      highlights: [
        "Asynchronous non-blocking background queue for full plugin and theme PHP 8.3 compatibility scans.",
        "OWASP security header auditor: grades CSP, HSTS, X-Frame-Options, and referrer policy.",
        "Visual .htaccess and .user.ini IDE with self-healing syntax probe and automatic HTTP 500 rollback.",
      ],
    },
    {
      version: "v6.0.0",
      date: "March 2026",
      tag: "Performance Milestone",
      badgeColor: "bg-slate-100 text-[#425466] border-[#e6e8eb]",
      headline: "Database Index Telemetry & WP-Cron Inspector",
      highlights: [
        "Added MySQL table fragmentation telemetry, InnoDB buffer hit ratios, and unindexed query detection.",
        "Visual WP-Cron scheduled task monitor with overdue job detection and orphaned callback alerts.",
        "Outbound HTTP latency probe measuring DNS and API socket speeds to Stripe, PayPal, and WordPress.org.",
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#0a2540] selection:bg-violet-500 selection:text-white">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-xs font-semibold text-violet-300 mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Product Updates</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0a2540] tracking-tight mb-4">
            Changelog & Roadmap
          </h1>
          <p className="text-[#425466] text-base sm:text-lg">
            See everything new, improved, and fixed across every phpinfo() WP release.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative border-l border-[#e6e8eb] pl-6 sm:pl-8 ml-2 sm:ml-4 space-y-12">
          {releases.map((rel, idx) => (
            <div key={idx} className="relative">
              
              {/* Timeline Indicator Dot */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 h-4 w-4 rounded-full bg-[#635bff] border-4 border-white shadow-sm ring-2 ring-violet-500" />

              <div className="flex flex-wrap items-center gap-2.5 mb-2">
                <span className="font-mono text-base font-bold text-[#0a2540]">
                  {rel.version}
                </span>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${rel.badgeColor}`}>
                  {rel.tag}
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  {rel.date}
                </span>
              </div>

              <h2 className="text-lg sm:text-xl font-bold text-slate-800 mb-3 tracking-tight">
                {rel.headline}
              </h2>

              <ul className="space-y-2 p-5 rounded-2xl border border-[#e6e8eb] bg-white shadow-sm">
                {rel.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#425466]">
                    <CheckCircle2 className="h-4 w-4 text-[#635bff] shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

            </div>
          ))}
        </div>

        {/* Pro Banner */}
        <div className="mt-16 rounded-2xl p-8 border border-[#e6e8eb] bg-slate-50 text-center">
          <h3 className="text-xl font-bold text-[#0a2540] mb-2">
            Get Lifetime Access to All v8.x and Future Releases
          </h3>
          <p className="text-xs sm:text-sm text-[#425466] max-w-lg mx-auto mb-6">
            All minor and patch updates are included free. Lifetime licenses receive all major releases forever with zero renewal fees.
          </p>
          <a
            href="/#pricing"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#635bff] hover:bg-violet-500 text-white font-semibold text-xs shadow-lg shadow-violet-600/30 transition-all"
          >
            <span>View Pricing & Licenses</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

      </main>

      <Footer />
    </div>
  );
}
