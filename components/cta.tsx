"use client";

import { useState, useEffect } from "react";
import AnimatedShinyText from "@/components/ui/shimmer-text";
import Link from "next/link";
import { SiWordpress } from "react-icons/si";
import { Star, RefreshCcw, Download, ShieldCheck } from "lucide-react";
import AnimatedArrow from "@/components/ui/animated-arrow";
import HeroShowcase from "@/components/hero-showcase";

const WP_ORG_URL = "https://wordpress.org/plugins//";

export default function CTA() {
  const [lastUpdated, setLastUpdated] = useState("2 days ago");
  const [wpRating, setWpRating] = useState("4.3");
  const [version, setVersion] = useState("8.0.0");
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
      {/* Text, Buttons & Proof Pills - cleanly constrained to max-w-4xl */}
      <div className="flex w-full max-w-4xl flex-col items-center gap-5 text-center">

        {/* Release Announcement Pill */}
        <div>
          <Link
            href="#pricing"
            className="group inline-flex items-center gap-2 rounded-full border border-violet-200/90 bg-violet-50/90 hover:bg-violet-100/90 px-3.5 py-1.5 text-center transition-all duration-150 shadow-xs">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <AnimatedShinyText className="text-xs font-semibold text-violet-800">
              <span>Version 8.0 Live: Live Telemetry, Update Guard & Activity Log</span>
            </AnimatedShinyText>
            <AnimatedArrow className="ml-1 text-violet-600" />
          </Link>
        </div>

        {/* Punchy Hero Headline */}
        <h1 className="max-w-4xl text-balance text-3xl font-semibold tracking-tight text-zinc-900 sm:text-5xl md:text-6xl leading-[1.12]">
          Stop WordPress update crashes{" "}
          <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            before they take you down.
          </span>
        </h1>

        {/* Subheading */}
        <p className="mx-auto max-w-2xl text-balance text-base sm:text-lg text-zinc-600 leading-relaxed">
          Real-time server health, update warnings, and security reports - all in your WP admin, no SaaS fees, no downtime.
        </p>

        {/* CTA Button Group */}
        <div className="mt-2 flex flex-col items-center gap-3">
          <div className="flex flex-col items-stretch gap-2.5 sm:flex-row sm:items-center sm:gap-3">
            <Link
              href="/pricing"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_0_20px_-6px_rgba(167,139,250,0.6)] transition-all duration-150 ease-linear hover:bg-violet-700">
              <span>See plans & pricing</span>
              <AnimatedArrow className="ml-1" />
            </Link>
            <Link
              href="/demo"
              className="group inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-300 bg-emerald-50/60 px-5 py-3 text-sm font-semibold text-emerald-900 shadow-xs transition hover:bg-emerald-100/70">
              <span className="relative flex h-2 w-2 mr-0.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Try It Live</span>
              <AnimatedArrow className="ml-1 text-emerald-600" />
            </Link>
          </div>
          <p className="text-xs text-zinc-500 flex items-center gap-1.5 mt-1">
            <span>From <strong className="font-semibold text-zinc-800">$39/year</strong></span>
            <span className="text-zinc-300">·</span>
            <span className="inline-flex items-center text-emerald-700 font-medium">
              <ShieldCheck className="mr-1 h-3.5 w-3.5" />
              14-day money-back guarantee
            </span>
          </p>
        </div>

        {/* Proof Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
          <a
            href={WP_ORG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs text-zinc-800 shadow-2xs transition hover:border-zinc-300 hover:bg-zinc-50">
            <SiWordpress className="h-3.5 w-3.5 text-violet-700" />
            <span className="font-semibold">{activeInstalls}</span>
            <span className="text-zinc-500">active sites</span>
          </a>
          <a
            href={WP_ORG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs text-amber-800 transition hover:border-amber-300">
            <span className="flex items-center" aria-hidden>
              {[0, 1, 2, 3].map((i) => (
                <Star key={i} className="h-3 w-3 fill-amber-500 text-amber-600" />
              ))}
              <Star className="h-3 w-3 text-amber-600" />
            </span>
            <span className="font-semibold">{wpRating}</span>
            <span className="text-amber-700">on WP.org</span>
          </a>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs text-emerald-800">
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
