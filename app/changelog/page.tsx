"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import ExeebitBar from "@/components/exeebit-bar";

const changelog = [
  {
    version: "8.0.0",
    changes: [
      {
        type: "Major Release",
        text: "Actionable Server Operations Dashboard: Completely reimagined the main overview to give you instant visibility into live PHP memory usage, key resource limits, and a real-time configuration grade with direct triage recommendations.",
      },
      {
        type: "Feature",
        text: "Full WordPress Admin Activity Log: Real-time security audit trail capturing user logins, failed authentication attempts (with IP tracking), plugin/theme activations and deletions, core setting updates, user role changes, and server operations with 1-click CSV export and automatic database pruning.",
      },
      {
        type: "Feature",
        text: "Smart PHP Upgrade Scanner (Zero False Alarms): Upgraded the compatibility engine with relative delta scanning and smart guard detection. It now focuses exclusively on real breaking changes for your upcoming PHP upgrade (e.g. PHP 8.3 ➜ 8.4), eliminating false positives from dormant legacy shims in popular plugins.",
      },
      {
        type: "Feature",
        text: "Priority Security & Config Triage: Automatically detects critical server vulnerabilities (such as display_errors in production, expose_php, and end-of-life PHP runtimes) with 1-click automated fix profiles tailored for page builders and high-traffic sites.",
      },
      {
        type: "Enhancement",
        text: "Streamlined Security Headers Audit: Re-architected header diagnostics to prioritize missing protections first, making it faster to inspect and auto-fix security headers with built-in rollback safety.",
      },
    ],
  },
  {
    version: "7.2.7",
    changes: [
      {
        type: "Feature",
        text: "Enriched Update Guard: Added Plugin & Theme pre-update compatibility scanning (PHP/WP floors, changelog risk parsing, abandonment checks), automated 60-second post-update health diagnostics (loopback, admin reachability, error log delta, cron integrity), and per-component stability tracking.",
      },
      {
        type: "Fix",
        text: "Renamed admin page query string slugs to `piwp-*` to prevent 403 Forbidden false-positives caused by 8G/7G Firewalls, BBQ (Block Bad Queries), and LiteSpeed rules blocklisting the `phpinfo` token in URL parameters. Special thanks to Simon Richards for discovering and reporting this.",
      },
      {
        type: "Enhancement",
        text: "Added seamless AJAX license activation and deactivation with instant inline validation and loading feedback.",
      },
      {
        type: "Enhancement",
        text: "Made Technical Support & Server Diagnostics accessible to all users with live environment signals.",
      },
      {
        type: "Fix",
        text: "Corrected whitespace formatting and line wrapping in PHP error log viewer.",
      },
    ],
  },
  {
    version: "7.2.6",
    changes: [
      {
        type: "Compatibility",
        text: "Tested up to WordPress 7.1.",
      },
    ],
  },
  {
    version: "7.2.5",
    changes: [
      {
        type: "Improved",
        text: "Enhanced upgrade prompts now surface your site's real config issues so you know exactly what Pro will fix on your site.",
      },
      {
        type: "Improved",
        text: "Minor UI polish across the admin dashboard and feature gate screens.",
      },
    ],
  },
  {
    version: "7.2.4",
    changes: [
      {
        type: "NEW",
        text: "Complete visual plugin localization and translation files for French, German, Spanish, Italian, and Dutch.",
      },
      {
        type: "Improved",
        text: "Optimized server EOL lifecycle gauges and HTTP header audits.",
      },
    ],
  },
  {
    version: "7.2.3",
    changes: [
      {
        type: "Pro",
        text: "Aligned Single Site plan feature restrictions with pricing tier limits. Capped Outbound API Monitors at 1, Config Snapshots at 3, locked Slack/Discord webhooks and Weekly digests, and set PDF audit reports to default branded styling.",
      },
      {
        type: "Pro",
        text: "Added license grandfathering to ensure existing Single Site license holders retain unlimited access to all features.",
      },
      {
        type: "Improved",
        text: "Standardized and optimized CSS layout margins and vertical padding on the landing page for visual consistency across desktop and mobile screens.",
      },
    ],
  },
  {
    version: "7.0.0",
    changes: [
      {
        type: "Major Release",
        text: "phpinfo() WP is now a full WordPress site-health and server-audit plugin, representing a modern, actively-maintained take on the Health Check & Troubleshooting workflow. Free adds Troubleshooting Mode (per-user safe-mode that cannot leave your site broken), PHP Compatibility Scanner that works on managed hosts, pre-update PHP-version warnings, PHP EOL Timeline, Config Grader summary, admin-bar health scoreboard, WordPress 7.0 Abilities API integration for AI assistants, and AI explanations on failing Config Grader checks. Pro adds one-click Config Auto-Fix, security headers, SSL monitor, OPcache dashboard, white-label PDF audit reports, and more.",
      },
    ],
  },
];

const badgeColors: Record<string, string> = {
  Feature: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800",
  Fix: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800",
  Enhancement: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800",
  Improved: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800",
  Compatibility: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-800",
  NEW: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200 dark:border-purple-800",
  Pro: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800",
  "Major Release": "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800",
};

export default function Changelog() {
  return (
    <main className="flex min-h-screen flex-col items-center overflow-x-clip pt-20">
      <div className="fixed left-0 right-0 top-0 z-[60]">
        <ExeebitBar />
        <Header />
      </div>

      <section className="flex w-full max-w-4xl flex-col px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="mb-16 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl mb-4">
            Changelog
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            New updates, features, and improvements to phpinfo() WP Pro.
          </p>
        </div>

        <div className="relative border-l border-gray-200 dark:border-gray-800 ml-4 md:ml-6">
          {changelog.map((release, index) => (
            <div key={release.version} className="mb-12 relative">
              {/* Timeline Dot */}
              <div className="absolute -left-[9px] top-2 h-4 w-4 rounded-full border-2 border-white dark:border-gray-950 bg-[#A78BFA] shadow" />

              <div className="pl-8 md:pl-12">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-3">
                  v{release.version}
                  {index === 0 && (
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                      Latest Version
                    </span>
                  )}
                </h2>

                <div className="mt-6 space-y-5">
                  {release.changes.map((change, i) => (
                    <div key={i} className="flex flex-col sm:flex-row sm:items-start gap-3">
                      <span
                        className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold shrink-0 sm:w-28 justify-center ${badgeColors[change.type] || "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
                          }`}
                      >
                        {change.type}
                      </span>
                      <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
                        {change.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
