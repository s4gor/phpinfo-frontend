"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import ExeebitBar from "@/components/exeebit-bar";
import AnimatedShinyText from "@/components/ui/shimmer-text";

const changelog = [
  {
    version: "8.0.6",
    changes: [
      {
        type: "Feature",
        text: "Server Security Scanner: Automatically detects dangerous server configuration weaknesses and provides one-click fixes, plus pre-written support messages you can copy and send directly to your web hosting company.",
      },
      {
        type: "Compatibility",
        text: "Tested and confirmed full compatibility with WordPress version 7.1.3.",
      },
      {
        type: "Improved",
        text: "Added fast search and filtering options so you can find specific server settings, active PHP extensions, and error records in seconds.",
      },
      {
        type: "Improved",
        text: "Refined screen designs with cleaner spacing, uniform layouts, and polished typography across all administration pages.",
      },
      {
        type: "Fix",
        text: "Resolved minor background issues and improved general plugin stability.",
      },
    ],
  },
  {
    version: "8.0.5",
    changes: [
      {
        type: "Improved",
        text: "Made license activation more reliable when operating on strict managed hosting environments. Special thanks to Nick Safford for reporting this.",
      },
      {
        type: "Improved",
        text: "Enhanced documentation navigation and polished button styling across the screens.",
      },
      {
        type: "Fix",
        text: "Resolved small background issues to make routine health checks run smoothly.",
      },
    ],
  },
  {
    version: "8.0.4",
    changes: [
      {
        type: "Fix",
        text: "Fixed minor database communication issues and improved overall system performance.",
      },
      {
        type: "Improved",
        text: "Polished user interface elements and typography across the dashboard.",
      },
    ],
  },
  {
    version: "8.0.3",
    changes: [
      {
        type: "Compatibility",
        text: "Tested and confirmed full compatibility with WordPress version 7.1.2.",
      },
      {
        type: "Fix",
        text: "Fixed an issue where automated setting fixes would sometimes undo themselves even when the server accepted the change.",
      },
      {
        type: "Improved",
        text: "Made scheduled background task monitoring clearer by highlighting orphaned jobs that no longer belong to any active plugin.",
      },
      {
        type: "Improved",
        text: "Strengthened safety checks to prevent unexpected warnings during routine health tests.",
      },
    ],
  },
  {
    version: "8.0.2",
    changes: [
      {
        type: "Fix",
        text: "Corrected small interface glitches and improved reliability during background scans.",
      },
      {
        type: "Improved",
        text: "Updated styling and alignment across several settings panels.",
      },
    ],
  },
  {
    version: "8.0.1",
    changes: [
      {
        type: "Fix",
        text: "Prevented rare conflicts with third-party themes or plugins that caused errors in the WordPress administration footer.",
      },
      {
        type: "Improved",
        text: "Added defensive safety checks so external plugins cannot interrupt phpinfo WP while loading admin pages.",
      },
    ],
  },
  {
    version: "8.0.0",
    changes: [
      {
        type: "Major Release",
        text: "Server Health Dashboard: View your live memory consumption, resource ceilings, database size, and script caching status immediately upon opening the administration area.",
      },
      {
        type: "Feature",
        text: "Security Activity Log: Keep an automatic record of user logins, failed password attempts with visitor internet addresses, plugin changes, and core settings adjustments, with one click spreadsheet downloads.",
      },
      {
        type: "Feature",
        text: "Intelligent Compatibility Scanner: Test your themes and plugins before upgrading to newer PHP versions without getting false alarms from harmless legacy fallback code.",
      },
      {
        type: "Feature",
        text: "Database Autoload and Index Checker: Find oversized autoloaded settings and missing database indexes that cause slow page loading times.",
      },
      {
        type: "Feature",
        text: "Human Explanations for Issues: When a server check fails, read a simple, clear explanation in normal everyday language explaining why it matters and how to solve it.",
      },
      {
        type: "Improved",
        text: "One-click fixes automatically detect your server file setup and reverse changes immediately if your server experiences an error.",
      },
      {
        type: "Improved",
        text: "Removed distracting notices from other plugins while viewing diagnostic tools so you can focus on server maintenance.",
      },
      {
        type: "Compatibility",
        text: "Confirmed complete compatibility with WordPress version 7.1.1.",
      },
    ],
  },
  {
    version: "7.2.7",
    changes: [
      {
        type: "Feature",
        text: "Update Guard Safety Checks: Inspect upcoming plugin updates for breaking changes before installing them, and run automated health checks one minute after updating to verify the site is healthy.",
      },
      {
        type: "Fix",
        text: "Updated administration links to prevent strict hosting firewalls and security rules from blocking diagnostic pages. Special thanks to Simon Richards for reporting this.",
      },
      {
        type: "Improved",
        text: "License key verification now happens instantly in the background without refreshing the browser window.",
      },
      {
        type: "Improved",
        text: "Organized technical diagnostic and support information into clearer, beginner-friendly panels.",
      },
      {
        type: "Fix",
        text: "Cleaned up text wrapping in the server error log viewer for easier reading on smaller screens.",
      },
    ],
  },
  {
    version: "7.2.6",
    changes: [
      {
        type: "Compatibility",
        text: "Tested and confirmed full compatibility with WordPress version 7.1.",
      },
    ],
  },
  {
    version: "7.2.5",
    changes: [
      {
        type: "Improved",
        text: "Updated informational messages so you can see which specific server issues on your site would benefit from the upgraded version.",
      },
      {
        type: "Improved",
        text: "Visual polish and alignment improvements across the main overview.",
      },
    ],
  },
  {
    version: "7.2.4",
    changes: [
      {
        type: "Feature",
        text: "Added complete translations for French, German, Spanish, Italian, and Dutch.",
      },
      {
        type: "Improved",
        text: "Made life cycle timelines and security header recommendations easier to understand at a glance.",
      },
    ],
  },
  {
    version: "7.2.3",
    changes: [
      {
        type: "Improved",
        text: "Clarified plan boundaries while ensuring all existing customers continue to keep their original unrestricted access.",
      },
      {
        type: "Improved",
        text: "Improved mobile screen layouts for easier navigation on smartphones and tablets.",
      },
    ],
  },
  {
    version: "7.0.0",
    changes: [
      {
        type: "Major Release",
        text: "Transformed phpinfo WP into a complete server health and safety suite. Added private troubleshooting mode that isolates plugin tests to your own account, a host-friendly compatibility scanner, automatic server configuration grading, and professional PDF audit reports.",
      },
    ],
  },
];

const badgeColors: Record<string, string> = {
  Feature: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800",
  Fix: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800",
  Improved: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
  Compatibility: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800",
  "Major Release": "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400 border-violet-200 dark:border-violet-800",
};

export default function Changelog() {
  return (
    <main className="flex min-h-screen flex-col items-center overflow-x-clip pt-24 sm:pt-28 lg:pt-36">
      <div className="fixed left-0 right-0 top-0 z-[60]">
        <ExeebitBar />
        <Header />
      </div>

      <section className="flex w-full max-w-4xl flex-col items-center px-4 sm:px-6 lg:px-8 pt-4">
        <div className="flex w-full max-w-4xl flex-col items-center text-center mb-16">
          <div className="mb-3.5">
            <div className="group inline-flex items-center gap-2 rounded-full border border-violet-200/90 bg-violet-50/90 hover:bg-violet-100/90 px-3.5 py-1.5 text-center transition-all duration-150 shadow-xs dark:border-violet-900/60 dark:bg-violet-950/40">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <AnimatedShinyText className="text-xs font-semibold text-violet-800 dark:text-violet-300">
                <span>Version Releases &amp; Product Updates</span>
              </AnimatedShinyText>
            </div>
          </div>

          <h1 className="max-w-4xl text-balance text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl md:text-6xl leading-[1.12] mx-auto">
            Product changelog &amp;{" "}
            <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              release notes.
            </span>
          </h1>

          <p className="md:mt-5 mt-3.5 text-base text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Every release, continuous improvement, and new security safeguard shipped for phpinfo() WP Pro.
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
