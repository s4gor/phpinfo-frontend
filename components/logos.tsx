import TextBlur from "./ui/text-blur";
import { Shield, Zap, Activity, FileText, CheckCircle2, XCircle } from "lucide-react";

const pillars = [
  {
    icon: Shield,
    name: "Safeguard",
    tag: "Stop site crashes before they happen.",
    items: [
      "Test plugin updates safely before applying them",
      "Check if plugins work with new PHP versions",
      "Safe test mode to fix bugs with zero visitor disruption",
      "Find risky file permissions and security holes",
    ],
  },
  {
    icon: Zap,
    name: "Optimize",
    tag: "Make your WordPress site load faster.",
    items: [
      "Live OPcache status with 1-click cache flush",
      "Clean up slow database clutter that drags down speed",
      "Find missing database indexes in 1 click",
      "Safe server speed tweaks with instant rollback",
    ],
  },
  {
    icon: Activity,
    name: "Monitor",
    tag: "Catch server issues before your visitors do.",
    items: [
      "Track admin logins, file edits, and real visitor IPs",
      "Get early alerts before your SSL certificate expires",
      "Spot slow checkout and payment gateway delays",
      "Catch stuck background tasks and missed post schedules",
    ],
  },
  {
    icon: FileText,
    name: "Deliver",
    tag: "Create professional reports for your clients.",
    items: [
      "1-click PDF reports branded with your agency logo",
      "Step-by-step fix guides written in plain English",
      "Automated weekly email summaries of your site health",
      "Instant alerts sent to your Slack or Discord",
      "Manage all your sites from one single dashboard",
    ],
  },
];

export default function Logos() {
  return (
    <div className="flex w-full flex-col gap-2 pt-16 md:pt-24">
      <div>
        <TextBlur
          className="text-center text-2xl font-medium tracking-tight text-zinc-800 md:text-3xl dark:text-zinc-100"
          text="Everything you need to keep your site fast and safe."
        />
      </div>

      <div>
        <TextBlur
          className="mx-auto max-w-[34rem] text-center text-base text-zinc-700 sm:text-lg dark:text-zinc-400"
          text="No monthly SaaS fees. No data leaves your server. Everything runs directly inside your WordPress admin."
          duration={0.8}
        />
      </div>

      <div className="mt-6 grid w-full grid-cols-1 items-stretch justify-center gap-4 md:mt-10 md:grid-cols-2 lg:grid-cols-4 md:gap-6">
        {pillars.map((pillar, index) => {
          const Icon = pillar.icon;
          return (
            <div
              key={index}
              className="flex flex-col rounded-xl border bg-white p-6 shadow-xs transition-all duration-150 ease-in-out md:hover:border-zinc-300 md:hover:bg-accent dark:border-zinc-800 dark:bg-zinc-900">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800">
                <Icon className="h-5 w-5 text-violet-700 dark:text-violet-400" strokeWidth={1.75} />
              </div>
              <h3 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                {pillar.name}
              </h3>
              <p className="mb-4 text-sm italic text-zinc-600 dark:text-zinc-400">{pillar.tag}</p>
              <ul className="flex flex-col gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                {pillar.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-violet-300/70" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* The Consolidation Visual - Styled identically to other flagship sections */}
      <div className="mt-16 sm:mt-24 w-full flex flex-col items-center">
        <div>
          <TextBlur
            className="text-center text-2xl font-medium tracking-tight text-zinc-800 md:text-3xl dark:text-zinc-100"
            text="Replace the clutter in your wp-admin."
          />
        </div>

        <div>
          <TextBlur
            className="mx-auto max-w-[34rem] text-center text-base text-zinc-700 sm:text-lg dark:text-zinc-400 mt-1"
            text="One plugin replaces six. All your server diagnostics in one place, right inside WordPress."
            duration={0.8}
          />
        </div>

        <div className="mt-8 grid w-full grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 max-w-5xl">
          {/* The Old Way */}
          <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 sm:p-7 shadow-xs dark:border-zinc-800 dark:bg-zinc-900 transition-all">
            <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-zinc-100 dark:border-zinc-800">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border border-rose-200/60 dark:border-rose-900/40 rounded-full px-2.5 py-0.5">
                <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                The Old Way (5 separate plugins)
              </span>
              <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
                Fragile &amp; Costly
              </span>
            </div>
            <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
              <li className="flex items-start gap-2.5">
                <XCircle className="h-4 w-4 text-rose-500/80 shrink-0 mt-0.5" />
                <span>Unmaintained &ldquo;Health Check&rdquo; plugin (breaks live themes)</span>
              </li>
              <li className="flex items-start gap-2.5">
                <XCircle className="h-4 w-4 text-rose-500/80 shrink-0 mt-0.5" />
                <span>Manual FTP info.php file (security hazard)</span>
              </li>
              <li className="flex items-start gap-2.5">
                <XCircle className="h-4 w-4 text-rose-500/80 shrink-0 mt-0.5" />
                <span>Standalone OPcache reset plugin</span>
              </li>
              <li className="flex items-start gap-2.5">
                <XCircle className="h-4 w-4 text-rose-500/80 shrink-0 mt-0.5" />
                <span>Standalone PHP compatibility scanner</span>
              </li>
              <li className="flex items-start gap-2.5">
                <XCircle className="h-4 w-4 text-rose-500/80 shrink-0 mt-0.5" />
                <span>External SaaS dashboard ($5/site/mo subscription tax)</span>
              </li>
            </ul>
          </div>

          {/* The phpinfo() WP Way */}
          <div className="relative overflow-hidden rounded-2xl border-2 border-violet-500/30 bg-gradient-to-b from-violet-50/40 via-white to-white p-6 sm:p-7 shadow-sm dark:border-violet-500/30 dark:from-violet-950/20 dark:via-zinc-900 dark:to-zinc-900 transition-all">
            <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-violet-100 dark:border-violet-900/40">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-violet-700 dark:text-violet-300 bg-violet-50 dark:bg-violet-950/50 border border-violet-200/80 dark:border-violet-800/60 rounded-full px-2.5 py-0.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                The phpinfo() WP Way
              </span>
              <span className="text-[11px] font-semibold text-violet-600 dark:text-violet-400">
                Unified In-Admin Engine
              </span>
            </div>
            <ul className="space-y-3 text-sm text-zinc-800 dark:text-zinc-200">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span className="font-medium">One unified dashboard</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span className="font-medium">Per-user safe troubleshooting (zero visitor disruption)</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span className="font-medium">100% in-admin, local privacy, zero monthly fees</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span className="font-medium">Pre-flight PHP 8.4 engine &amp; OPcache telemetry</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span className="font-medium">One-click white-label PDF audit reports</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
