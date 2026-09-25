import Link from "next/link";
import { SiWordpress } from "react-icons/si";
import { Play, Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-zinc-200/80 bg-white dark:border-zinc-800/80 dark:bg-zinc-950 text-sm">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand info */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 group mb-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.svg"
                alt="phpinfo() WP logo"
                className="h-5 sm:h-[22px] w-auto shrink-0 object-contain"
              />
              <span className="text-base font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                phpinfo<span className="text-zinc-900 dark:text-zinc-100">()</span>{" "}
                <span className="text-violet-600 font-extrabold">WP</span>
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-zinc-500 max-w-sm leading-relaxed mb-4">
              Actionable WordPress Server Operations, Update Guard, and Live Telemetry suite. Prevent crashes before they take your sites down.
            </p>
            <div className="flex items-center gap-2 text-xs text-zinc-500">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-500"></span>
              <span>100% In-Admin &bull; Zero external SaaS latency</span>
            </div>
          </div>

          {/* Product links */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 mb-3">
              Product
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
              <li>
                <Link href="/features" className="hover:text-violet-600 transition-colors">
                  Features &amp; Pillars
                </Link>
              </li>
              <li>
                <Link href="/demo" className="hover:text-emerald-600 font-semibold flex items-center gap-1.5 transition-colors">
                  <Play className="h-3.5 w-3.5 text-emerald-500" />
                  <span>Try It Live</span>
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-violet-600 transition-colors">
                  Pricing &amp; Plans
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-violet-600 transition-colors">
                  Compare Alternatives
                </Link>
              </li>
              <li>
                <Link href="/changelog" className="hover:text-violet-600 transition-colors flex items-center gap-1.5">
                  <span>Changelog</span>
                  <span className="rounded bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300 text-[10px] px-1 font-bold">
                    v8.0
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 mb-3">
              Resources
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
              <li>
                <Link href="/docs" className="hover:text-violet-600 transition-colors">
                  Full Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="https://wordpress.org/plugins//"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-violet-600 flex items-center gap-1.5 transition-colors">
                  <SiWordpress className="h-3.5 w-3.5" />
                  <span>Free WP.org Plugin</span>
                </Link>
              </li>
              <li>
                <Link
                  href="https://wordpress.org/support/plugin//"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-violet-600 transition-colors">
                  Community Support
                </Link>
              </li>
              <li>
                <a href="mailto:support@exeebit.com" className="hover:text-violet-600 transition-colors">
                  Email Support
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Company */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 mb-3">
              Legal &amp; Info
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
              <li>
                <Link href="/privacy" className="hover:text-violet-600 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-violet-600 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/refund" className="hover:text-violet-600 transition-colors">
                  14-Day Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/impressum" className="hover:text-violet-600 transition-colors">
                  Impressum
                </Link>
              </li>
              <li>
                <a
                  href="https://exeebit.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-violet-600 transition-colors">
                  Exeebit Company
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div>
            &copy; {new Date().getFullYear()} phpinfo() WP &bull; Built by{" "}
            <a
              href="https://s4gor.exeebit.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-700 dark:text-zinc-300 underline underline-offset-2 hover:text-violet-700">
              @s4gor
            </a>{" "}
            at{" "}
            <a
              href="https://exeebit.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-700 dark:text-zinc-300 underline underline-offset-2 hover:text-violet-700">
              Exeebit
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
