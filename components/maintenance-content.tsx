import {
  ShieldCheck,
  Zap,
  Database,
  FileText,
  Mail,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  MessageCircle,
  Sparkles,
  Star,
  Code2,
} from "lucide-react";
import { SiWordpress } from "react-icons/si";

const WP_ORG_URL = "https://wordpress.org/plugins/phpinfo/";

export default function MaintenanceContent() {

  return (
    <div className="relative min-h-screen w-full bg-white text-zinc-900 flex flex-col justify-between selection:bg-violet-600 selection:text-white overflow-x-hidden font-sans">
      {/* Light Ambient Mesh Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        {/* Top-center Violet Glow */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[650px] sm:w-[900px] h-[450px] bg-gradient-to-b from-violet-100/70 via-purple-50/40 to-transparent blur-[100px] rounded-full" />

        {/* Soft Emerald Glow on Left */}
        <div className="absolute top-1/3 -left-40 w-[420px] h-[420px] bg-emerald-50/60 blur-[110px] rounded-full" />

        {/* Soft Lavender Glow on Right */}
        <div className="absolute top-1/2 -right-40 w-[420px] h-[420px] bg-indigo-50/60 blur-[110px] rounded-full" />

        {/* Clean Micro-Dot Matrix */}
        <div
          className="absolute inset-0 opacity-[0.38]"
          style={{
            backgroundImage: `radial-gradient(rgba(124, 58, 237, 0.08) 1.2px, transparent 1.2px)`,
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      {/* Top Floating Navigation */}
      <header className="relative z-10 w-full border-b border-zinc-200/80 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.svg"
              alt="phpinfo() WP Cyber ElePHPant logo"
              className="h-7 sm:h-8 w-auto shrink-0 object-contain drop-shadow-[0_2px_8px_rgba(124,58,237,0.15)]"
            />
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-bold tracking-tight text-zinc-950">
                phpinfo<span className="text-zinc-400">()</span>{" "}
                <span className="text-violet-600 font-extrabold">WP</span>
              </span>
              <span className="rounded-md border border-emerald-200 bg-emerald-50 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-800">
                v8.0 LIVE
              </span>
            </div>
          </div>

          {/* Right Action: Get Plugin on WP.org & Contact */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={WP_ORG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-900 transition-all shadow-xs">
              <SiWordpress className="h-3.5 w-3.5 text-violet-700" />
              <span className="hidden sm:inline">WordPress.org</span>
              <ExternalLink className="h-3 w-3 text-zinc-400" />
            </a>

            <a
              href="mailto:support@phpinfowp.com"
              className="inline-flex items-center gap-1.5 rounded-xl bg-zinc-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-zinc-800 transition-all shadow-xs">
              <Mail className="h-3.5 w-3.5" />
              <span>Contact</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Hero & Content */}
      <main className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-4 py-12 sm:px-6 sm:py-16 text-center">
        {/* Mascot Showcase Card */}
        <div className="relative mb-6 sm:mb-8 group">
          <div className="absolute -inset-3 rounded-3xl bg-gradient-to-r from-violet-400/20 via-purple-300/20 to-emerald-400/20 blur-xl opacity-80 group-hover:opacity-100 transition duration-500" />

          <div className="relative flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-2xl border border-zinc-200/90 bg-white p-4 shadow-lg shadow-violet-500/5 backdrop-blur-md">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.svg"
              alt="Cyber ElePHPant"
              className="h-full w-full object-contain filter drop-shadow-[0_2px_10px_rgba(124,58,237,0.2)] transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          <span className="absolute -bottom-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-emerald-500 text-white shadow-md">
            <Sparkles className="h-3.5 w-3.5 stroke-[2.5]" />
          </span>
        </div>

        {/* Status Announcement Pill */}
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-200/90 bg-violet-50/90 px-3.5 py-1.5 text-xs font-semibold text-violet-900 shadow-xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span>Building Our New Website</span>
          <span className="text-violet-300">·</span>
          <span className="text-zinc-600 font-medium">phpinfo() WP v8.0 is Live & Active</span>
        </div>

        {/* Main Headline */}
        <h1 className="max-w-4xl text-balance text-3xl font-semibold tracking-tight text-zinc-900 sm:text-5xl md:text-6xl leading-[1.12]">
          Our brand-new website is{" "}
          <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            under construction.
          </span>
        </h1>

        {/* Subtitle Explaining v8 is already released */}
        <p className="mt-4 max-w-2xl text-balance text-sm sm:text-base md:text-lg text-zinc-600 leading-relaxed font-normal">
          We&apos;re currently developing our new digital home, documentation hub, and customer portal. In the meantime, <strong>phpinfo() WP Version 8.0 is already live</strong> and protecting 3,000+ WordPress installations.
        </p>

        {/* Action Buttons: Direct download on WP.org + Notify */}
        <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={WP_ORG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_20px_-6px_rgba(167,139,250,0.7)] hover:bg-violet-700 transition-all">
            <SiWordpress className="h-4 w-4" />
            <span>Download v8 on WordPress.org</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>

          <a
            href="https://wa.me/4917631168051"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-5 py-3 text-sm font-semibold text-zinc-800 hover:bg-zinc-50 hover:border-zinc-300 transition-all shadow-xs">
            <MessageCircle className="h-4 w-4 text-emerald-600" />
            <span>Chat via WhatsApp</span>
          </a>
        </div>

        {/* New Website Development Milestones Card */}
        <div className="mt-8 w-full max-w-xl rounded-2xl border border-zinc-200/90 bg-white/90 p-4 sm:p-5 backdrop-blur-md shadow-sm text-left">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-zinc-800">
              <Code2 className="h-3.5 w-3.5 text-violet-600" />
              New Website Revamp Progress
            </span>
            <span className="text-violet-700 font-bold bg-violet-50 border border-violet-100 px-2 py-0.5 rounded-full">
              In Active Development
            </span>
          </div>

          {/* Progress Bar */}
          <div className="relative mt-3 h-2.5 w-full overflow-hidden rounded-full bg-zinc-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-violet-600 via-purple-500 to-emerald-500"
              style={{ width: "88%" }}
            />
          </div>

          {/* Checkpoints Grid */}
          <div className="mt-3.5 grid grid-cols-2 gap-2 text-[11px] sm:text-xs">
            <div className="flex items-center gap-1.5 text-zinc-800 font-medium">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
              <span>Plugin v8.0: Live on WP.org</span>
            </div>
            <div className="flex items-center gap-1.5 text-zinc-700 font-medium">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
              <span>Update Guard & Telemetry</span>
            </div>
            <div className="flex items-center gap-1.5 text-violet-700 font-medium">
              <span className="h-2 w-2 rounded-full bg-violet-500 animate-pulse ml-0.5 mr-1" />
              <span>New Portal & Showcase</span>
            </div>
            <div className="flex items-center gap-1.5 text-violet-700 font-medium">
              <span className="h-2 w-2 rounded-full bg-violet-500 animate-pulse ml-0.5 mr-1" />
              <span>Docs & Knowledge Base</span>
            </div>
          </div>
        </div>



        {/* What's Live in Version 8.0 Cards */}
        <div className="mt-14 w-full">
          <div className="mb-4 text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-violet-700 bg-violet-50 border border-violet-100 px-2.5 py-1 rounded-md">
              Available Now in Plugin v8.0
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 text-left">
            {/* Card 1 */}
            <div className="group relative rounded-2xl border border-zinc-200/80 bg-white p-4 sm:p-5 shadow-xs transition-all duration-200 hover:border-violet-300 hover:shadow-md hover:-translate-y-0.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50 border border-violet-100 text-violet-700 mb-3 group-hover:scale-105 transition-transform">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-zinc-900 mb-1.5 flex items-center justify-between">
                Update Guard
                <span className="text-[10px] uppercase font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
                  Live
                </span>
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Pre-flight scans for PHP version mismatches, fatal error traps, and developer abandonment before updating plugins.
              </p>
            </div>

            {/* Card 2 */}
            <div className="group relative rounded-2xl border border-zinc-200/80 bg-white p-4 sm:p-5 shadow-xs transition-all duration-200 hover:border-violet-300 hover:shadow-md hover:-translate-y-0.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700 mb-3 group-hover:scale-105 transition-transform">
                <Zap className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-zinc-900 mb-1.5 flex items-center justify-between">
                Live Telemetry
                <span className="text-[10px] uppercase font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
                  Live
                </span>
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Real-time visual OPcache hit rates, RAM ceilings, and PHP execution metrics directly in your WordPress toolbar.
              </p>
            </div>

            {/* Card 3 */}
            <div className="group relative rounded-2xl border border-zinc-200/80 bg-white p-4 sm:p-5 shadow-xs transition-all duration-200 hover:border-violet-300 hover:shadow-md hover:-translate-y-0.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-700 mb-3 group-hover:scale-105 transition-transform">
                <Database className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-zinc-900 mb-1.5 flex items-center justify-between">
                Database Scanner
                <span className="text-[10px] uppercase font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
                  Live
                </span>
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Pinpoints missing SQL indexes, bloated autoload tables, and slow query logs before WooCommerce stalls.
              </p>
            </div>

            {/* Card 4 */}
            <div className="group relative rounded-2xl border border-zinc-200/80 bg-white p-4 sm:p-5 shadow-xs transition-all duration-200 hover:border-violet-300 hover:shadow-md hover:-translate-y-0.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-50 border border-purple-100 text-purple-700 mb-3 group-hover:scale-105 transition-transform">
                <FileText className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-zinc-900 mb-1.5 flex items-center justify-between">
                Client PDF Audits
                <span className="text-[10px] uppercase font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
                  Live
                </span>
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Generate branded white-label PDF server health reports for agency maintenance retainers in a single click.
              </p>
            </div>
          </div>
        </div>

        {/* WordPress Trust Badge Strip */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-xs">
          <a
            href={WP_ORG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3.5 py-1.5 text-zinc-800 shadow-2xs hover:border-zinc-300 hover:bg-zinc-50 transition-colors font-medium">
            <SiWordpress className="h-3.5 w-3.5 text-violet-700" />
            <span>3,000+ Active WordPress Installations</span>
          </a>

          <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3.5 py-1.5 text-zinc-800 shadow-2xs font-medium">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span>4.3 / 5 Rating on WordPress.org</span>
          </div>

          <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3.5 py-1.5 text-zinc-800 shadow-2xs font-medium">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            <span>14-Day Money-Back Guarantee</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full border-t border-zinc-200/80 bg-white py-6 text-center text-xs text-zinc-500">
        <div className="mx-auto flex max-w-6xl flex-col sm:flex-row items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex items-center gap-2 text-zinc-600">
            <span>© {new Date().getFullYear()} phpinfo() WP. Developed by Exeebit.</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-zinc-600">
            <a
              href={WP_ORG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-violet-600 transition-colors inline-flex items-center gap-1">
              <span>WordPress.org</span>
              <ExternalLink className="h-3 w-3" />
            </a>

            <a
              href="mailto:support@phpinfowp.com"
              className="hover:text-violet-600 transition-colors">
              support@phpinfowp.com
            </a>

            <a
              href="https://wa.me/4917631168051"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-700 transition-colors inline-flex items-center gap-1">
              <MessageCircle className="h-3 w-3" />
              <span>WhatsApp Support</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
