"use client";

import { useState, useEffect } from "react";
import AnimatedShinyText from "@/components/ui/shimmer-text";
import Link from "next/link";
import { SiWordpress } from "react-icons/si";
import { Star, RefreshCcw, Download, ShieldCheck } from "lucide-react";
import AnimatedArrow from "@/components/ui/animated-arrow";
import HeroShowcase from "@/components/hero-showcase";

const WP_ORG_URL = "https://wordpress.org/plugins/phpinfo-wp/";

export default function CTA() {
  const [lastUpdated, setLastUpdated] = useState("2 days ago");
  const [wpRating, setWpRating] = useState("4.5");
  const [version, setVersion] = useState("8.0.4");
  const [activeInstalls, setActiveInstalls] = useState("3,000+");

  useEffect(() => {
    fetch("/api/wp-plugin-info")
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          if (data.version) {
            setVersion(data.version);
          }
          if (data.active_installs) {
            const count = parseInt(data.active_installs, 10);
            if (!isNaN(count)) {
              setActiveInstalls(count.toLocaleString() + "+");
            }
          }
          if (data.rating) {
            setWpRating((data.rating / 20).toFixed(1));
          }
          if (data.last_updated) {
            const match = data.last_updated.match(
              /^(\d{4})-(\d{2})-(\d{2})\s+(\d{1,2}):(\d{2})(am|pm)/i
            );
            let date: Date | null = null;
            if (match) {
              let [, year, month, day, hours, minutes, meridiem] = match;
              let h = parseInt(hours, 10);
              if (meridiem.toLowerCase() === "pm" && h !== 12) h += 12;
              if (meridiem.toLowerCase() === "am" && h === 12) h = 0;
              date = new Date(
                Date.UTC(
                  parseInt(year),
                  parseInt(month) - 1,
                  parseInt(day),
                  h,
                  parseInt(minutes)
                )
              );
            } else {
              date = new Date(data.last_updated);
              if (isNaN(date.getTime())) date = null;
            }
            if (date && !isNaN(date.getTime())) {
              const now = new Date();
              const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

              const intervals = [
                { label: "year", seconds: 31536000 },
                { label: "month", seconds: 2592000 },
                { label: "day", seconds: 86400 },
                { label: "hour", seconds: 3600 },
                { label: "minute", seconds: 60 },
              ];

              for (let i = 0; i < intervals.length; i++) {
                const interval = intervals[i];
                const count = Math.floor(diffInSeconds / interval.seconds);
                if (count >= 1) {
                  setLastUpdated(`${count} ${interval.label}${count !== 1 ? "s" : ""} ago`);
                  return;
                }
              }
              setLastUpdated("just now");
            }
          }
        }
      })
      .catch((err) => console.error("Failed to fetch plugin info:", err));
  }, []);

  return (
    <div className="flex w-full flex-col items-center">
      {/* Text, Buttons & Proof Pills - identical styling & hierarchy to all other pages */}
      <div className="flex w-full max-w-4xl flex-col items-center text-center">

        {/* Release Announcement Pill */}
        <div className="mb-3.5">
          <Link
            href="#pricing"
            className="group inline-flex items-center gap-2 rounded-full border border-violet-200/90 bg-violet-50/90 hover:bg-violet-100/90 px-3.5 py-1.5 text-center transition-all duration-150 shadow-xs">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <AnimatedShinyText className="text-xs font-semibold text-violet-800">
              <span>New in 8.0: Update Guard catches breaking updates before they break you</span>
            </AnimatedShinyText>
            <AnimatedArrow className="ml-1 text-violet-600" />
          </Link>
        </div>

        {/* Hero Headline - Exactly matches other pages (pricing, features, compare, etc.) */}
        <h1 className="max-w-4xl text-balance text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl md:text-6xl leading-[1.12] mx-auto">
          Complete server clarity.{" "}
          <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Right inside WordPress.
          </span>
        </h1>

        {/* Subheading - Exactly matches other pages (pricing, features, compare, etc.) */}
        <p className="mt-3.5 text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
          Stop juggling five disconnected diagnostic plugins and risky info.php files. Get instant, in-admin clarity on site & server health with 1-click fixes. Zero SaaS fees.
        </p>

        {/* CTA Button Group */}
        <div className="mt-6 flex flex-col items-center gap-4">
          <div className="flex flex-col items-stretch gap-2.5 sm:flex-row sm:items-center sm:gap-3">
            <Link
              href="/pricing"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_20px_-6px_rgba(167,139,250,0.6)] transition-all duration-150 ease-linear hover:bg-violet-700">
              <span>Get Pro - From $39/yr</span>
              <AnimatedArrow className="ml-1" />
            </Link>
            <a
              href="https://demo.phpinfowp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-300 bg-emerald-50/60 px-5 py-2.5 text-sm font-semibold text-emerald-900 shadow-xs transition hover:bg-emerald-100/70 dark:border-emerald-800/60 dark:bg-emerald-950/40 dark:text-emerald-300">
              <span className="relative flex h-2 w-2 mr-0.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Explore the Live Demo</span>
              <AnimatedArrow className="ml-1 text-emerald-600 dark:text-emerald-400" />
            </a>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
            <span>License key emailed right after checkout</span>
            <span className="text-zinc-300 dark:text-zinc-700">·</span>
            <span className="inline-flex items-center text-emerald-700 dark:text-emerald-400 font-medium">
              <ShieldCheck className="mr-1 h-3.5 w-3.5" />
              14-day refund, no questions asked
            </span>
          </p>
        </div>

        {/* Proof Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mt-4">
          <a
            href={WP_ORG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs text-zinc-800 shadow-2xs transition hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
            <SiWordpress className="h-3.5 w-3.5 text-violet-700 dark:text-violet-400" />
            <span className="font-semibold">{activeInstalls}</span>
            <span className="text-zinc-500 dark:text-zinc-400">active sites</span>
          </a>
          <a
            href={WP_ORG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs text-amber-800 transition hover:border-amber-300 dark:border-amber-900/40 dark:bg-amber-950/30 dark:text-amber-300">
            <span className="flex items-center gap-0.5" aria-hidden>
              {[0, 1, 2, 3].map((i) => (
                <Star key={i} className="h-3 w-3 fill-amber-500 text-amber-600" />
              ))}
              <span className="relative inline-flex items-center justify-center h-3 w-3">
                <Star className="h-3 w-3 text-amber-600" />
                <span className="absolute inset-y-0 left-0 w-1/2 overflow-hidden">
                  <Star className="h-3 w-3 fill-amber-500 text-amber-600 max-w-none" />
                </span>
              </span>
            </span>
            <span className="font-semibold">{wpRating}</span>
            <span className="text-amber-700 dark:text-amber-400">on WP.org</span>
          </a>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs text-emerald-800 dark:border-emerald-900/40 dark:bg-emerald-950/30 dark:text-emerald-300">
            <RefreshCcw className="h-3 w-3" />
            <span>Updated {lastUpdated}</span>
          </span>
        </div>
      </div>

      {/* Hero Showcase & Feature Suite Cards - Full Width (max-w-[1400px]) */}
      <div className="w-full max-w-[1400px] mt-2 sm:mt-4">
        <HeroShowcase />
      </div>
    </div>
  );
}
