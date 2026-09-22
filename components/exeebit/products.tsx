"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/lib/animation-variants";
import TextBlur from "@/components/ui/text-blur";
import { ArrowRight, Wrench } from "lucide-react";
import MimonousIcon from "@/components/mimonous-icon";
import { CLEARSITE_VERSION } from "@/lib/clearsite";

const bentoCell =
  "group relative flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white p-6 transition-all duration-200 sm:p-7";

function ProductBadge({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  return (
    <div
      className={`absolute right-5 top-5 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest sm:right-6 sm:top-6 ${className}`}>
      {children}
    </div>
  );
}

function ProductCta({
  label,
  className,
}: {
  label: string;
  className: string;
}) {
  return (
    <div
      className={`mt-auto flex items-center gap-2 pt-5 text-sm font-semibold transition-all group-hover:gap-3 ${className}`}>
      {label}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </div>
  );
}

function PhpinfoIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      className="h-8 w-8"
      fill="#7C3AED"
      aria-hidden="true">
      <path d="M7.4 2.6 C 3.4 6.2 3.4 13.8 7.4 17.4 L 9 16 C 5.8 12.8 5.8 7.2 9 4 Z" />
      <path d="M12.6 2.6 C 16.6 6.2 16.6 13.8 12.6 17.4 L 11 16 C 14.2 12.8 14.2 7.2 11 4 Z" />
      <circle cx="10" cy="10" r="1.6" />
    </svg>
  );
}

export default function ExeebitProducts() {
  const [activeInstalls, setActiveInstalls] = useState("3,000+");

  useEffect(() => {
    fetch("/api/wp-plugin-info")
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          if (data.active_installs) {
            const count = parseInt(data.active_installs, 10);
            if (!isNaN(count)) setActiveInstalls(count.toLocaleString() + "+");
          }
        }
      })
      .catch((err) => console.error("Failed to fetch products info:", err));
  }, []);

  return (
    <motion.section
      id="products"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="flex w-full max-w-5xl flex-col gap-3 pt-24 md:pt-32">

      <motion.div variants={itemVariants}>
        <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-[#0216D1]">
          What we&apos;re building
        </p>
      </motion.div>

      <motion.div variants={itemVariants}>
        <TextBlur
          className="text-center text-3xl font-medium tracking-tight text-zinc-900 sm:text-4xl"
          text="Small tools. Real impact."
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <TextBlur
          className="mx-auto max-w-xl pt-2 text-center text-base leading-relaxed text-zinc-600"
          text="Five products live today. More on the way. Each shipped only when it earns the right to exist."
          duration={0.8}
        />
      </motion.div>

      {/* Bento grid: hero left + tall right, compact row, Inkbind half-width below */}
      <motion.div
        variants={itemVariants}
        className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-6">

        {/* phpinfo() WP - hero cell */}
        <div
          className={`${bentoCell} md:col-span-4 md:row-span-2 md:min-h-[340px] bg-gradient-to-br from-violet-50/90 via-white to-white hover:border-violet-300 hover:shadow-[0_0_60px_-15px_rgba(167,139,250,0.3)]`}>
          <ProductBadge className="border-violet-300 bg-violet-100 text-violet-700">
            v8.0 · Available now
          </ProductBadge>

          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-violet-100">
            <PhpinfoIcon />
          </div>

          <h3 className="text-2xl font-semibold tracking-tight text-zinc-900">
            phpinfo() WP
          </h3>
          <p className="mt-1 text-sm font-medium text-violet-700">
            WordPress server health &amp; audit suite
          </p>

          <p className="mt-3 max-w-lg text-sm leading-relaxed text-zinc-600">
            Automated Update Guard, live OPcache/RAM telemetry, admin security
            activity log, database index scanner, and white-label PDF audit reports.
          </p>

          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-zinc-500">
            <span>
              <strong className="text-zinc-700">{activeInstalls}</strong> active installs
            </span>
            <span>
              <strong className="text-zinc-700">4.4★</strong> on WordPress.org
            </span>
            <span>
              <strong className="text-zinc-700">15</strong> Pro modules
            </span>
          </div>

          <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-violet-700 transition-all hover:gap-3">
              Explore phpinfo() WP
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="https://wordpress.org/plugins//"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-zinc-500 underline-offset-2 transition-colors hover:text-violet-700 hover:underline">
              Install free on WordPress.org
            </a>
          </div>
        </div>

        {/* Nilow - tall right cell */}
        <Link
          href="/nilow"
          className={`${bentoCell} md:col-span-2 md:row-span-2 md:min-h-[340px] bg-gradient-to-br from-emerald-50/80 via-white to-white hover:border-emerald-300 hover:shadow-[0_0_50px_-12px_rgba(5,150,105,0.28)]`}>
          <ProductBadge className="border-emerald-300 bg-emerald-100 text-emerald-700">
            Android app
          </ProductBadge>

          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50">
            <img src="/nilow-icon.svg" alt="" className="h-8 w-8 rounded-lg" aria-hidden="true" />
          </div>

          <h3 className="text-xl font-semibold tracking-tight text-zinc-900">Nilow</h3>
          <p className="mt-1 text-sm font-medium text-emerald-700">
            Split expenses with friends
          </p>

          <p className="mt-3 text-sm leading-relaxed text-zinc-600">
            Scan receipts, split any way, settle in the fewest payments. Offline-first,
            any currency, no ads.
          </p>

          <div className="mt-4 flex flex-col gap-1.5 text-xs text-zinc-500">
            <span>
              <strong className="text-zinc-700">Offline</strong>-first
            </span>
            <span>
              <strong className="text-zinc-700">Free</strong> forever
            </span>
          </div>

          <ProductCta label="Explore Nilow" className="text-emerald-700" />
        </Link>

        {/* ClearSite - bottom left */}
        <Link
          href="/clearsite"
          className={`${bentoCell} md:col-span-3 md:min-h-[200px] bg-gradient-to-br from-blue-50/70 via-white to-white hover:border-blue-300 hover:shadow-[0_0_50px_-12px_rgba(37,99,235,0.25)]`}>
          <ProductBadge className="border-blue-300 bg-blue-100 text-blue-700">
            v{CLEARSITE_VERSION} · Chrome
          </ProductBadge>

          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-blue-50">
              <img src="/clearsite-icon.png" alt="" className="h-8 w-8" aria-hidden="true" />
            </div>
            <div className="min-w-0 flex-1 pr-16">
              <h3 className="text-lg font-semibold tracking-tight text-zinc-900">ClearSite</h3>
              <p className="mt-0.5 text-sm font-medium text-blue-700">
                Delete site history &amp; cache
              </p>
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-zinc-600">
                Erase any website from Chrome in one click. 100% local, no tracking.
              </p>
            </div>
          </div>

          <ProductCta label="Explore ClearSite" className="text-blue-700" />
        </Link>

        {/* Mimonous - bottom right */}
        <Link
          href="https://mimonous.com"
          target="_blank"
          rel="noopener noreferrer"
          className={`${bentoCell} md:col-span-3 md:min-h-[200px] bg-gradient-to-br from-[#7C3AED]/5 via-white to-white hover:border-[#7C3AED]/40 hover:shadow-[0_0_50px_-12px_rgba(124,58,237,0.25)]`}>
          <ProductBadge className="border-[#7C3AED]/30 bg-[#7C3AED]/10 text-[#7C3AED]">
            Public beta
          </ProductBadge>

          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 scale-90">
              <MimonousIcon />
            </div>
            <div className="min-w-0 flex-1 pr-14">
              <h3 className="text-lg font-semibold tracking-tight text-zinc-900">Mimonous</h3>
              <p className="mt-0.5 text-sm font-medium text-[#7C3AED]">
                Two-way invoicing for teams
              </p>
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-zinc-600">
                Your invoice becomes their bill instantly. Multi-currency, free in beta.
              </p>
            </div>
          </div>

          <ProductCta label="Open Mimonous" className="text-[#7C3AED]" />
        </Link>

        {/* Inkbind - half-width row below ClearSite & Mimonous */}
        <Link
          href="/inkbind"
          className={`${bentoCell} md:col-span-3 md:min-h-[200px] bg-gradient-to-br from-[#0123D2]/5 via-white to-white hover:border-[#0123D2]/30 hover:shadow-[0_0_50px_-12px_rgba(1,35,210,0.25)]`}>
          <ProductBadge className="border-[#0123D2]/25 bg-[#0123D2]/10 text-[#0123D2]">
            Shopify app
          </ProductBadge>

          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[#0123D2]/5">
              <img src="/inkbind-icon.svg" alt="" className="h-8 w-8 rounded-lg" aria-hidden="true" />
            </div>
            <div className="min-w-0 flex-1 pr-16">
              <h3 className="text-lg font-semibold tracking-tight text-zinc-900">Inkbind</h3>
              <p className="mt-0.5 text-sm font-medium text-[#0123D2]">
                B2B quotes &amp; deposits for Shopify
              </p>
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-zinc-600">
                Quote, negotiate, get paid - deposit now, balance later - on any plan.
              </p>
            </div>
          </div>

          <ProductCta label="Explore Inkbind" className="text-[#0123D2]" />
        </Link>

        {/* Future product placeholder - other half */}
        <div className="hidden md:col-span-3 md:block">
          <div className="flex items-start gap-4 rounded-xl border border-dashed border-zinc-200 p-6">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-white">
              <Wrench className="h-5 w-5 text-zinc-400" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                In the workshop
              </div>
              <h3 className="mt-1 text-base font-semibold text-zinc-700">
                Next product, when it&apos;s ready
              </h3>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}
