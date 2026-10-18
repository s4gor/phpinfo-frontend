import { ShieldCheck, Zap, Mail, Server, Code } from "lucide-react";

export default function Founder() {
  return (
    <div className="flex w-full max-w-6xl flex-col items-center gap-2 pt-16 md:pt-24">
      <div className="relative w-full overflow-hidden rounded-2xl border border-zinc-200/80 bg-gradient-to-b from-white to-zinc-50/60 p-6 sm:p-8 shadow-xs dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-950/80">
        
        {/* Top Header Row with Studio Badge */}
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-200/80 bg-violet-50/80 px-3 py-0.5 text-xs font-semibold text-violet-700 dark:border-violet-800/60 dark:bg-violet-950/40 dark:text-violet-300">
              <Server className="h-3.5 w-3.5 text-violet-600 dark:text-violet-400" />
              <span>Exeebit Studio · Paderborn, Germany</span>
            </span>
            <span className="text-[11px] font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/70 dark:border-emerald-900/40 rounded-full px-2.5 py-0.5 inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Engineered with Obsession
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 mt-1">
            Built for people who refuse to accept downtime.
          </h3>

          <div className="space-y-2 text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-400 max-w-6xl">
            <p>
              When a WordPress site breaks, everybody points fingers. Your web host blames your plugins.
              Plugin authors blame your hosting setup. Meanwhile, your checkout is stalled, your visitors are leaving,
              and you are left holding the bill.
            </p>
            <p>
              We built phpinfo() WP in Paderborn, Germany, because we believe server diagnostics should be effortless,
              honest, and crystal clear. We don&apos;t phone home. We don&apos;t charge monthly SaaS tolls. And we never touch
              your front-end performance. Every single tool is built to one standard: complete server clarity,
              instant 1-click fixes, and absolute respect for your site&apos;s privacy.
            </p>
          </div>
        </div>

        {/* 3-Column Studio Pillars Grid */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
          <div className="rounded-xl border border-zinc-200/80 bg-white p-4 sm:p-5 shadow-2xs dark:border-zinc-800 dark:bg-zinc-900/60 transition-all hover:border-zinc-300 dark:hover:border-zinc-700">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-900/40 mb-2.5">
              <ShieldCheck className="h-4.5 w-4.5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              100% Private. Always.
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1.5 leading-relaxed">
              Your server telemetry never leaves your machine. Zero tracking, zero third-party cloud connections, and 100% local in-admin execution.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-200/80 bg-white p-4 sm:p-5 shadow-2xs dark:border-zinc-800 dark:bg-zinc-900/60 transition-all hover:border-zinc-300 dark:hover:border-zinc-700">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50 dark:bg-violet-950/40 border border-violet-200/60 dark:border-violet-900/40 mb-2.5">
              <Zap className="h-4.5 w-4.5 text-violet-600 dark:text-violet-400" />
            </div>
            <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              0.00ms Visitor Impact
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1.5 leading-relaxed">
              Strict on-demand execution inside wp-admin only. Zero background polling. Your visitors will never notice it, except that your site runs faster.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-200/80 bg-white p-4 sm:p-5 shadow-2xs dark:border-zinc-800 dark:bg-zinc-900/60 transition-all hover:border-zinc-300 dark:hover:border-zinc-700">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-900/40 mb-2.5">
              <Code className="h-4.5 w-4.5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Direct Engineer Support
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1.5 leading-relaxed">
              No ticket bots. No outsourced helpdesk scripts. When you reach out, you talk directly with the engineers in Germany who wrote the software.
            </p>
          </div>
        </div>

        {/* Footer Credit & Direct Contact */}
        <div className="mt-7 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-zinc-200/70 dark:border-zinc-800/80 pt-4 text-xs text-zinc-500 dark:text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-zinc-800 dark:text-zinc-200">
              Exeebit · Software Studio, Germany
            </span>
            <span className="text-zinc-300 dark:text-zinc-700">·</span>
            <span>Paderborn, North Rhine-Westphalia</span>
          </div>
          <a
            href="mailto:support@phpinfowp.com"
            className="inline-flex items-center gap-1.5 font-semibold text-violet-700 hover:text-violet-800 dark:text-violet-400 dark:hover:text-violet-300 transition-colors">
            <Mail className="h-3.5 w-3.5" />
            <span>Have a pre-sales question? Email our engineers directly</span>
          </a>
        </div>

      </div>
    </div>
  );
}
