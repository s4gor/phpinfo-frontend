import Link from "next/link";
import { Tag, Code2, ChevronRight, ExternalLink } from "lucide-react";
import AnimatedArrow from "@/components/ui/animated-arrow";
import CookieSettingsButton from "@/components/cookie-trigger";

export default function Footer({ hideCTA = false }: { hideCTA?: boolean }) {
  return (
    <footer className="w-full mt-16 border-t border-zinc-200/80 bg-white dark:border-zinc-800/80 dark:bg-zinc-950 text-sm">
      {/* Pre-footer Stripe-style CTA section */}
      {!hideCTA && (
        <div className="border-b border-zinc-200/70 dark:border-zinc-800/80 bg-white dark:bg-zinc-950">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              {/* Left Column: Heading + Subtitle + Buttons */}
              <div className="lg:col-span-6 flex flex-col items-start">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-2.5">
                  Ready to get started?
                </h2>
                <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6 max-w-md">
                  Take control of your WordPress server operations, prevent breaking updates, and export executive white-label audit reports today.
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    href="/pricing"
                    className="group inline-flex items-center justify-center h-10 rounded-xl bg-violet-500 hover:bg-violet-600 px-4 sm:px-5 text-sm font-semibold text-white shadow-[0_0_20px_-6px_rgba(167,139,250,0.6)] transition-all duration-150 ease-linear">
                    <span>Get pro</span>
                    <AnimatedArrow className="ml-1.5 sm:ml-2" />
                  </Link>

                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center h-10 rounded-xl border border-violet-200 bg-white hover:bg-zinc-50 px-4 py-2 text-sm font-semibold text-violet-700 transition-colors dark:border-violet-900/60 dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:text-violet-300">
                    Contact us
                  </Link>
                </div>
              </div>

              {/* Right Column: Two Feature Mini-Cards */}
              <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-8 lg:pt-1">
                {/* Feature 1 */}
                <div className="flex flex-col items-start">
                  <div className="mb-3.5 flex h-9 w-9 items-center justify-center rounded-lg border border-violet-200/90 bg-violet-50 text-violet-600 shadow-2xs dark:border-violet-900/60 dark:bg-violet-950/40 dark:text-violet-400">
                    <Tag className="h-4 w-4" />
                  </div>
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-1">
                    See what you&apos;ll pay
                  </h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mb-3">
                    Transparent flat pricing for single sites and agency retainers with zero hidden fees.
                  </p>
                  <Link
                    href="/pricing"
                    className="group inline-flex items-center gap-1 text-xs font-semibold text-violet-600 hover:text-violet-700 transition-colors dark:text-violet-400">
                    <span>Pricing details</span>
                    <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>

                {/* Feature 2 */}
                <div className="flex flex-col items-start">
                  <div className="mb-3.5 flex h-9 w-9 items-center justify-center rounded-lg border border-violet-200/90 bg-violet-50 text-violet-600 shadow-2xs dark:border-violet-900/60 dark:bg-violet-950/40 dark:text-violet-400">
                    <Code2 className="h-4 w-4" />
                  </div>
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-1">
                    Start building
                  </h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mb-3">
                    Test drive the live diagnostic engine and update simulator in our interactive demo.
                  </p>
                  <a
                    href="https://demo.phpinfowp.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1 text-xs font-semibold text-violet-600 hover:text-violet-700 transition-colors dark:text-violet-400">
                    <span>Integration options</span>
                    <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modern, clean, full-width footer columns (Linear/Raycast style) */}
      <div className="mx-auto max-w-6xl px-4 pt-14 pb-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 pb-10">
          {/* Column 1: Product */}
          <div>
            <h3 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight mb-4">
              Product
            </h3>
            <ul className="space-y-3 text-[13px]">
              <li>
                <Link
                  href="/features"
                  className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors">
                  Features &amp; Pillars
                </Link>
              </li>
              <li>
                <Link
                  href="/agencies"
                  className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors">
                  Agency Solutions
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors">
                  Pricing &amp; Plans
                </Link>
              </li>
              <li>
                <Link
                  href="/compare"
                  className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors">
                  Compare Alternatives
                </Link>
              </li>
              <li>
                <Link
                  href="/changelog"
                  className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors">
                  Version Changelog
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Resources */}
          <div>
            <h3 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight mb-4">
              Resources
            </h3>
            <ul className="space-y-3 text-[13px]">
              <li>
                <Link
                  href="/docs"
                  className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <a
                  href="https://demo.phpinfowp.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors">
                  Interactive Demo
                </a>
              </li>
              <li>
                <a
                  href="https://wordpress.org/plugins/phpinfo-wp/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors">
                  <span>Free WP Plugin</span>
                  <ExternalLink className="h-3 w-3 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/exeebit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors">
                  <span>GitHub Repository</span>
                  <ExternalLink className="h-3 w-3 opacity-60" />
                </a>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors">
                  Help &amp; Support Hub
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h3 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight mb-4">
              Company
            </h3>
            <ul className="space-y-3 text-[13px]">
              <li>
                <Link
                  href="/about"
                  className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/#reviews"
                  className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors">
                  Customer Reviews
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <a
                  href="https://wordpress.org/support/plugin/phpinfo-wp/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors">
                  <span>Community Forum</span>
                  <ExternalLink className="h-3 w-3 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://s4gor.exeebit.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors">
                  <span>Founder Portfolio</span>
                  <ExternalLink className="h-3 w-3 opacity-60" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h3 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight mb-4">
              Legal
            </h3>
            <ul className="space-y-3 text-[13px]">
              <li>
                <Link
                  href="/privacy"
                  className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/refund"
                  className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors">
                  14-Day Refund Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/impressum"
                  className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors">
                  Impressum
                </Link>
              </li>
              <li>
                <CookieSettingsButton />
              </li>
            </ul>
          </div>
        </div>

        {/* Subtle Horizontal Competitor Directory for SEO */}
        <div className="pt-6 pb-6 border-t border-zinc-100 dark:border-zinc-800/80 flex flex-wrap items-center justify-between gap-y-2 text-xs text-zinc-500 dark:text-zinc-400">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="font-semibold text-zinc-700 dark:text-zinc-300">Compare Alternatives:</span>
            <Link href="/vs/query-monitor" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">vs. Query Monitor</Link>
            <span className="text-zinc-300 dark:text-zinc-700">&bull;</span>
            <Link href="/vs/health-check-troubleshooting" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">vs. Health Check</Link>
            <span className="text-zinc-300 dark:text-zinc-700">&bull;</span>
            <Link href="/vs/wp-server-stats" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">vs. WP Server Stats</Link>
          </div>
          <span className="text-[11px] text-zinc-400 dark:text-zinc-500">
            EU GDPR &bull; § 5 DDG Compliant
          </span>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-zinc-200/80 dark:border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div>
            &copy; {new Date().getFullYear()} phpinfo() WP &bull; A Product of{" "}
            <a
              href="https://exeebit.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-700 dark:text-zinc-300 underline underline-offset-2 hover:text-violet-700">
              Exeebit
            </a>
          </div>

          {/* Elephant icon mascot only on right side */}
          <Link
            href="/"
            aria-label="phpinfo() WP home"
            className="group shrink-0 inline-flex items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.svg"
              alt="phpinfo() WP Cyber ElePHPant"
              className="h-[23px] w-auto shrink-0 object-contain transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:grayscale group-hover:contrast-125 dark:group-hover:brightness-125"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}
