"use client";

import Link from "next/link";
import { Check, ShieldCheck, Lock, Clock, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import AnimatedArrow from "@/components/ui/animated-arrow";
import { useEffect, useRef, useState } from "react";
import { trackViewItemList, trackViewItem, trackBeginCheckout } from "@/lib/gtag";

type Tier = "single" | "unlimited" | "lifetime";

interface PricingProps {
  onBuy: (tier: Tier) => void;
  loadingTier: string | null;
}

const ORIGINAL_CAP = 55;
const EXTENDED_SPOTS = 5;
const LIFETIME_CAP = 60;
const TARGET_INCREASE_TIMESTAMP = new Date("2026-09-30T23:59:59Z").getTime();

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

const tiers: Array<{
  id: Tier;
  name: string;
  price: string;
  nextPrice?: string;
  cadence: string;
  blurb: string;
  features: string[];
  flagFor?: "lifetime" | "popular";
  featured?: boolean;
}> = [
  {
    id: "single",
    name: "Single Site",
    price: "$39",
    cadence: "/year",
    blurb: "You own one site and want it running at its best.",
    features: [
      "All Pro v8.0 features on 1 site",
      "Standard PDF reports (Branded)",
      "1 External API monitor & 3 config snapshots",
      "1 year of updates & email support",
    ],
  },
  {
    id: "unlimited",
    name: "Unlimited",
    price: "$69",
    nextPrice: "$79",
    cadence: "/1st yr",
    blurb: "You manage multiple sites. One license covers every one of them.",
    features: [
      "All Pro v8.0 features on unlimited sites",
      "Fully white-labeled PDF reports (Custom Logo)",
      "Weekly digests & Slack/Discord alerts",
      "Unlimited snapshots & API monitors",
      "Priority email support & Multi-site support",
    ],
    flagFor: "popular",
    featured: true,
  },
  {
    id: "lifetime",
    name: "Lifetime",
    price: "$149",
    nextPrice: "$249",
    cadence: "once",
    blurb: "One payment. Updates and support forever. Zero renewal fees.",
    features: [
      "All Pro v8.0 features on unlimited sites",
      "Fully white-labeled PDF reports (Custom Logo)",
      "Weekly digests & Slack/Discord alerts",
      "Lifetime updates & priority support forever",
    ],
    flagFor: "lifetime",
  },
];

export default function Pricing({ onBuy, loadingTier }: PricingProps) {
  const [lifetimeSold, setLifetimeSold] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });
  const [mounted, setMounted] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const listTracked = useRef(false);

  useEffect(() => {
    setMounted(true);
    const updateCountdown = () => {
      const now = Date.now();
      const diff = TARGET_INCREASE_TIMESTAMP - now;
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true });
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft({ days, hours, minutes, seconds, isExpired: false });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/pricing-stats", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (cancelled || !d) return;
        if (typeof d.lifetimeSold === "number") setLifetimeSold(d.lifetimeSold);
      })
      .catch(() => { /* silent - counter just stays hidden */ });
    return () => { cancelled = true; };
  }, []);

  // Fire view_item_list once when pricing section enters viewport
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !listTracked.current) {
          listTracked.current = true;
          trackViewItemList();
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const lifetimeSoldEffective = 55 + (lifetimeSold != null ? Math.max(0, lifetimeSold - 10) : 0);
  const lifetimeRemaining = Math.max(0, LIFETIME_CAP - lifetimeSoldEffective);

  return (
    <div
      id="pricing"
      ref={sectionRef}
      className="flex w-full max-w-5xl scroll-mt-24 flex-col gap-2 mt-16 md:mt-24">

      <h2
        className="text-center text-2xl font-medium tracking-tight text-zinc-800 md:text-3xl">
        Start in 60 seconds.
      </h2>
      <p
        className="mx-auto max-w-md text-center text-base text-zinc-600">
        Install free from WordPress.org, or go straight to Pro - 14-day refund, no questions asked.
      </p>

      {/* Price Increase Notice Banner with Live Countdown */}
      <div
        className="w-full bg-gradient-to-r from-amber-50/95 via-orange-50/70 to-violet-50/90 border border-amber-200/90 rounded-2xl p-4 sm:p-5 mt-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-sm shadow-sm">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 text-amber-700 font-bold text-base md:text-lg border border-amber-300/70">
            <Zap className="h-5 w-5 text-amber-600 fill-amber-500/30" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-base sm:text-lg tracking-tight text-zinc-900 font-semibold">
                Price Increase Notice: September 30, 2026
              </h3>
              <span className="rounded-md bg-amber-100/90 border border-amber-300 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Increasing Soon
              </span>
            </div>
            <p className="text-sm text-zinc-700 mt-1 leading-relaxed max-w-xl">
              On September 30, Unlimited increases to $79/year. Lifetime was set to increase at 55 spots and has been extended by +5 final spots ({lifetimeRemaining} spots left at $149 before jumping to $249). Secure current rates now.
            </p>
          </div>
        </div>

        {mounted && !timeLeft.isExpired && (
          <div className="flex shrink-0 items-center gap-1.5 self-stretch sm:self-auto justify-center bg-white border border-amber-200/90 rounded-xl px-4 py-2.5 shadow-xs">
            <div className="flex flex-col items-center px-1.5">
              <span className="font-mono text-base sm:text-lg font-bold text-zinc-900 leading-none">
                {String(timeLeft.days).padStart(2, "0")}
              </span>
              <span className="text-[9.5px] font-medium text-zinc-500 uppercase tracking-wider mt-1">days</span>
            </div>
            <span className="font-bold text-zinc-400 text-sm -mt-3">:</span>
            <div className="flex flex-col items-center px-1.5">
              <span className="font-mono text-base sm:text-lg font-bold text-zinc-900 leading-none">
                {String(timeLeft.hours).padStart(2, "0")}
              </span>
              <span className="text-[9.5px] font-medium text-zinc-500 uppercase tracking-wider mt-1">hrs</span>
            </div>
            <span className="font-bold text-zinc-400 text-sm -mt-3">:</span>
            <div className="flex flex-col items-center px-1.5">
              <span className="font-mono text-base sm:text-lg font-bold text-zinc-900 leading-none">
                {String(timeLeft.minutes).padStart(2, "0")}
              </span>
              <span className="text-[9.5px] font-medium text-zinc-500 uppercase tracking-wider mt-1">min</span>
            </div>
            <span className="font-bold text-zinc-400 text-sm -mt-3">:</span>
            <div className="flex flex-col items-center px-1.5">
              <span className="font-mono text-base sm:text-lg font-bold text-amber-600 leading-none">
                {String(timeLeft.seconds).padStart(2, "0")}
              </span>
              <span className="text-[9.5px] font-medium text-amber-600 uppercase tracking-wider mt-1">sec</span>
            </div>
          </div>
        )}
      </div>

      <div
        className="grid w-full grid-cols-1 items-stretch gap-4 md:grid-cols-3 md:gap-5 mt-6">
        {tiers.map((tier) => {
          const loading = loadingTier === tier.id;
          const disabled = loadingTier !== null && !loading;
          const isLifetime = tier.id === "lifetime";
          const isLifetimeCapped = isLifetime && lifetimeRemaining === 0;

          const displayPrice = isLifetimeCapped ? "$249" : tier.price;
          const displayNextPrice = isLifetimeCapped ? undefined : tier.nextPrice;

          const flagLabel =
            isLifetime
              ? isLifetimeCapped
                ? `All ${LIFETIME_CAP} Claimed · Now $249`
                : `55 Sold Out · Extended +5 Spots`
              : tier.flagFor === "popular"
                ? "Most Popular · Increases Sept 30"
                : null;
          const flagWarn = isLifetime;
          return (
            <div
              key={tier.id}
              onMouseEnter={() => trackViewItem(tier.id)}
              className={cn(
                "relative flex flex-col rounded-xl border bg-white p-6 transition-all duration-200",
                tier.featured
                  ? "border-violet-400/40 shadow-[0_0_40px_-10px_rgba(167,139,250,0.30)] md:scale-[1.02]"
                  : "border-border md:hover:border-zinc-300"
              )}>
              {flagLabel && (
                <div
                  className={cn(
                    "absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider",
                    flagWarn
                      ? "bg-amber-100 text-amber-700 border border-amber-300"
                      : "bg-violet-400/20 text-violet-700 border border-violet-300"
                  )}>
                  {flagLabel}
                </div>
              )}

              <div className="mb-1 text-xs font-bold uppercase tracking-wider text-zinc-600">
                {tier.name}
              </div>
              <div className="mb-1 flex items-baseline gap-1">
                {displayNextPrice && (
                  <span className="text-sm font-medium text-zinc-400 line-through mr-1">
                    {displayNextPrice}
                  </span>
                )}
                <span className="text-4xl font-bold tracking-tight text-zinc-900">
                  {displayPrice}
                </span>
                <span className="text-sm text-zinc-500">{tier.cadence}</span>
              </div>
              <div className="mb-5 text-sm text-zinc-600">{tier.blurb}</div>

              {tier.id === "unlimited" && (
                <div className="mb-4 rounded-lg bg-violet-50/80 border border-violet-200/70 p-3 text-[11.5px] text-violet-900 leading-snug">
                  <strong>⚡ Price Increases Sept 30:</strong> Get Unlimited at $69 for your first year before it increases to $79/year on September 30. Subsequent renewals at $79/year.
                </div>
              )}

              {isLifetime && (
                <div className="mb-4 rounded-lg bg-gradient-to-r from-amber-50/90 to-emerald-50/80 border border-amber-200/80 p-2.5 text-[11.5px] leading-snug">
                  {isLifetimeCapped ? (
                    <div><strong>⚡ All {LIFETIME_CAP} founder spots filled:</strong> Lifetime pricing is now $249. One payment, zero renewal fees forever.</div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-semibold text-amber-950 flex items-center gap-1">
                          <Zap className="h-3.5 w-3.5 text-amber-600 fill-amber-500 shrink-0" />
                          Set to increase at 55: Extended +5!
                        </span>
                        <span className="text-zinc-600 font-medium">
                          <strong className="text-emerald-700 font-bold">{lifetimeRemaining} left</strong> at $149 ($249 after that)
                        </span>
                      </div>

                      {/* Two distinct colored tabs: 55 Original in Amber, +5 Extended in Emerald */}
                      <div className="flex items-center justify-between text-[10px] font-semibold">
                        <div className="flex items-center gap-1 text-amber-800 bg-amber-100/90 border border-amber-300/80 rounded px-1.5 py-0.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
                          <span>55 Original (Filled)</span>
                        </div>
                        <div className="flex items-center gap-1 text-emerald-800 bg-emerald-100/90 border border-emerald-300/80 rounded px-1.5 py-0.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                          <span>+5 Extended ({isLifetimeCapped ? "0" : lifetimeRemaining} left)</span>
                        </div>
                      </div>

                      {/* Dual-color segmented progress bar */}
                      <div className="flex h-1.5 w-full gap-1 items-center">
                        <div className="h-1.5 flex-1 rounded-full bg-amber-500" title="55 Original Spots: 100% Sold Out"></div>
                        <div className="h-1.5 w-14 rounded-full bg-emerald-100 overflow-hidden border border-emerald-300/80" title={`5 Extended Spots: ${lifetimeRemaining} left`}>
                          <div
                            className="h-full bg-emerald-500 transition-all duration-700"
                            style={{ width: `${Math.min(100, Math.max(0, ((EXTENDED_SPOTS - lifetimeRemaining) / EXTENDED_SPOTS) * 100))}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <ul className="mb-6 flex flex-grow flex-col gap-2 text-sm text-zinc-700">
                {tier.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-violet-600" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => { trackBeginCheckout(tier.id); onBuy(tier.id); }}
                disabled={disabled || loading}
                className="group flex items-center justify-center gap-2 w-full rounded-xl bg-violet-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_20px_-6px_rgba(167,139,250,0.6)] transition-all duration-150 ease-linear hover:bg-violet-600 disabled:bg-violet-500/40 disabled:cursor-not-allowed">
                <span>{loading ? "Opening checkout…" : `Buy ${tier.name}`}</span>
                {!loading && <AnimatedArrow className="ml-2" />}
              </button>
            </div>
          );
        })}
      </div>

      <div
        className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-5">
        <Link
          href="/refund"
          className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 transition-colors hover:bg-emerald-100 hover:text-emerald-800">
          <ShieldCheck className="h-4 w-4" />
          14-day refund · No questions asked
        </Link>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-300 bg-white px-2.5 py-1 text-xs text-zinc-700">
          <Lock className="h-3.5 w-3.5 text-zinc-500 shrink-0" />
          <span>Secure checkout via</span>
          <StripeLogo className="h-3.5 w-auto inline-block" />
        </span>
        <div className="relative inline-flex items-center gap-3.5 rounded-full border border-zinc-300 bg-white px-3 py-1 text-xs text-zinc-700">
          <span className="absolute -top-[-2px] left-1/2 -translate-x-1/2 -translate-y-full inline-flex items-center rounded-full border border-zinc-300 bg-white px-2 py-0.5 text-[9px] font-semibold text-zinc-600 shadow-sm leading-none whitespace-nowrap">
            Available Methods
          </span>
          <CardLogo className="h-2.5 w-auto" />
          <VisaLogo className="h-2.5 w-auto" />
          <MastercardLogo className="h-3 w-auto" />
          <PaypalLogo className="h-[12px] w-auto" />
          <ApplePayLogo className="h-3 w-auto" />
          <GooglePayLogo className="h-3 w-auto" />
          <LinkLogo className="h-3.5 w-auto" />
        </div>
      </div>

      <p
        className="mt-3 text-center text-xs text-zinc-500">
        Prices in USD · No extra taxes or hidden fees · View our{" "}
        <Link href="/terms" className="underline hover:text-zinc-800">
          Terms
        </Link>{" "}
        and{" "}
        <Link href="/refund" className="underline hover:text-zinc-800">
          Refund Policy
        </Link>
      </p>
    </div>
  );
}

function StripeLogo({ className = "h-3.5 w-auto" }: { className?: string }) {
  return (
    <svg
      viewBox="54 36 360.02 149.84"
      fill="#635BFF"
      className={cn(className, "shrink-0")}
      aria-label="Stripe"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M414 113.4c0-25.6-12.4-45.8-36.1-45.8c-23.8 0-38.2 20.2-38.2 45.6c0 30.1 17 45.3 41.4 45.3c11.9 0 20.9-2.7 27.7-6.5v-20c-6.8 3.4-14.6 5.5-24.5 5.5c-9.7 0-18.3-3.4-19.4-15.2h48.9c0.2-2 0.4-7.2 0.4-9.6zm-49.4-9.5c0-11.3 6.9-16 13.2-16c6.1 0 12.6 4.7 12.6 16h-25.8z" />
      <path d="M301.1 67.6c-9.8 0-16.1 4.6-19.6 7.8l-1.3-6.2h-22v116.6l25-5.3l0.1-28.3c3.6 2.6 8.9 6.3 17.7 6.3c17.9 0 34.2-14.4 34.2-46.1c0-29-16.5-44.8-34.1-44.8zm-6 68.9c-5.9 0-9.4-2.1-11.8-4.7l-0.1-37.1c2.6-2.9 6.2-4.9 11.9-4.9c9.1 0 15.4 10.2 15.4 23.3c0 13.4-6.2 23.4-15.4 23.4z" />
      <polygon points="223.8 61.7 248.9 56.3 248.9 36 223.8 41.3" />
      <rect x="223.8" y="69.3" width="25.1" height="87.5" />
      <path d="M196.9 76.7l-1.6-7.4h-21.6v87.5h25V97.5c5.9-7.7 15.9-6.3 19-5.2v-23c-2.9-1.2-14.6-3.4-20.8 7.4z" />
      <path d="M146.9 47.6l-24.4 5.2l-0.1 80.1c0 14.8 11.1 25.7 25.9 25.7c8.2 0 14.2-1.5 17.5-3.3V135c-3.2 1.3-19 5.9-19-8.9V90.6h19V69.3h-19l0.4-21.7z" />
      <path d="M79.3 94.7c0-3.9 3.2-5.4 8.5-5.4c7.6 0 17.2 2.3 24.8 6.4V72.2c-8.3-3.3-16.5-4.6-24.8-4.6C67.5 67.6 54 78.2 54 95.9c0 27.6 38 23.2 38 35.1c0 4.6-4 6.1-9.6 6.1c-8.3 0-18.9-3.4-27.3-8v23.8c9.3 4 18.7 5.7 27.3 5.7c20.8 0 35.1-10.3 35.1-28.2c0-27-38.1-21.7-38.1-32.9z" />
    </svg>
  );
}

function PaypalLogo({ className = "h-[15px] w-auto" }: { className?: string }) {
  return (
    <svg
      className={cn(className, "shrink-0 inline-block")}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="PayPal"
    >
      <path
        d="M15.607 4.653H8.941L6.645 19.251H1.82L4.862 0h7.995c3.754 0 6.375 2.294 6.473 5.513-.648-.478-2.105-.86-3.722-.86"
        fill="#003087"
      />
      <path
        d="m22.177 10.199c0 3.41-3.01 6.853-6.958 6.853h-2.493L11.595 24H6.74l1.845-11.538h3.592c4.208 0 7.346-3.634 7.153-6.949a5.24 5.24 0 0 1 2.848 4.686"
        fill="#0079C1"
      />
      <path
        d="M9.653 5.546h6.408c.907 0 1.942.222 2.363.541-.195 2.741-2.655 5.483-6.441 5.483H8.714Z"
        fill="#00457C"
      />
    </svg>
  );
}

function ApplePayLogo({ className = "h-3 w-auto" }: { className?: string }) {
  return (
    <svg
      className={cn(className, "shrink-0 inline-block text-zinc-900")}
      viewBox="0 120 640 270"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Apple Pay"
    >
      <path d="M116.9 158.5c-7.5 8.9-19.5 15.9-31.5 14.9-1.5-12 4.4-24.8 11.3-32.6 7.5-9.1 20.6-15.6 31.3-16.1 1.2 12.4-3.7 24.7-11.1 33.8m10.9 17.2c-17.4-1-32.3 9.9-40.5 9.9-8.4 0-21-9.4-34.8-9.1-17.9.3-34.5 10.4-43.6 26.5-18.8 32.3-4.9 80 13.3 106.3 8.9 13 19.5 27.3 33.5 26.8 13.3-.5 18.5-8.6 34.5-8.6 16.1 0 20.8 8.6 34.8 8.4 14.5-.3 23.6-13 32.5-26 10.1-14.8 14.3-29.1 14.5-29.9-.3-.3-28-10.9-28.3-42.9-.3-26.8 21.9-39.5 22.9-40.3-12.5-18.6-32-20.6-38.8-21.1m100.4-36.2v194.9h30.3v-66.6h41.9c38.3 0 65.1-26.3 65.1-64.3s-26.4-64-64.1-64h-73.2zm30.3 25.5h34.9c26.3 0 41.3 14 41.3 38.6s-15 38.8-41.4 38.8h-34.8V165zm162.2 170.9c19 0 36.6-9.6 44.6-24.9h.6v23.4h28v-97c0-28.1-22.5-46.3-57.1-46.3-32.1 0-55.9 18.4-56.8 43.6h27.3c2.3-12 13.4-19.9 28.6-19.9 18.5 0 28.9 8.6 28.9 24.5v10.8l-37.8 2.3c-35.1 2.1-54.1 16.5-54.1 41.5.1 25.2 19.7 42 47.8 42zm8.2-23.1c-16.1 0-26.4-7.8-26.4-19.6 0-12.3 9.9-19.4 28.8-20.5l33.6-2.1v11c0 18.2-15.5 31.2-36 31.2zm102.5 74.6c29.5 0 43.4-11.3 55.5-45.4L640 193h-30.8l-35.6 115.1h-.6L537.4 193h-31.6L557 334.9l-2.8 8.6c-4.6 14.6-12.1 20.3-25.5 20.3-2.4 0-7-.3-8.9-.5v23.4c1.8.4 9.3.7 11.6.7z" />
    </svg>
  );
}

function GooglePayLogo({ className = "h-3.5 w-auto" }: { className?: string }) {
  return (
    <svg
      className={cn(className, "w-auto shrink-0 inline-block")}
      viewBox="0 0 65 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Google Pay"
    >
      <g transform="translate(1.5, 1.5) scale(0.875)">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
      </g>
      <path d="M 26,18.669498 V 0.99999755 h 5.998 c 1.0566,0 2.0156,0.23032995 2.8771,0.69098995 0.8615,0.4442 1.5442,1.07761 2.0481,1.90021 0.5202,0.80615 0.7802,1.74392 0.7802,2.81331 0,1.05293 -0.26,1.99069 -0.7802,2.81329 -0.5039,0.8226005 -1.1866,1.4642005 -2.0481,1.9249005 -0.8615,0.4442 -1.8205,0.6663 -2.8771,0.6663 h -3.316 v 6.8605 z m 2.682,-9.4270005 h 3.3892 c 0.6339,0 1.1703,-0.1316 1.6092,-0.3949 0.4389,-0.2796 0.7721,-0.6334 0.9997,-1.06112 0.2438,-0.44421 0.3657,-0.90486 0.3657,-1.38197 0,-0.47711 -0.1219,-0.92955 -0.3657,-1.3573 -0.2276,-0.42775 -0.5608,-0.78147 -0.9997,-1.06116 -0.4389,-0.27968 -0.9753,-0.41953 -1.6092,-0.41953 H 28.682 Z" fill="#3C4043"/>
      <path d="m 43.4403,19.064398 c -0.9103,0 -1.7067,-0.181 -2.3895,-0.5429 -0.6827,-0.362 -1.2272,-0.8556 -1.6336,-1.4807 -0.3901,-0.6417 -0.5851,-1.3738 -0.5851,-2.1964 0,-0.9048 0.2275,-1.6699 0.6827,-2.295 0.4714,-0.6252 1.089,-1.1023 1.853,-1.4314 0.7802,-0.329 1.6418,-0.4935 2.5845,-0.4935 0.5364,0 1.0241,0.0411 1.463,0.1234 0.4388,0.0658 0.829,0.148 1.1703,0.2467 0.3414,0.0987 0.6096,0.2057 0.8046,0.3209 v -0.6664 c 0,-0.8226005 -0.2926,-1.4806005 -0.8777,-1.9742005 -0.5852,-0.4936 -1.3411,-0.74035 -2.2676,-0.74035 -0.6339,0 -1.2353,0.14805 -1.8043,0.44425 -0.5689,0.2796 -1.0321,0.6663 -1.3898,1.1598 l -1.7798,-1.4066 c 0.3576,-0.51004 0.7883,-0.94602 1.2922,-1.30797 0.5202,-0.36194 1.0972,-0.64163 1.7311,-0.83905 0.634,-0.19743 1.3086,-0.29614 2.0238,-0.29614 1.788,0 3.1696,0.45243 4.1449,1.3573 0.9753,0.88841 1.463,2.13876 1.463,3.7510605 v 7.8723 h -2.5358 v -1.5547 h -0.1463 c -0.2275,0.329 -0.5283,0.6416 -0.9021,0.9378 -0.3576,0.2961 -0.7802,0.5347 -1.2679,0.7156 -0.4876,0.1975 -1.0322,0.2962 -1.6336,0.2962 z m 0.4633,-2.1717 c 0.6827,0 1.2841,-0.1645 1.8042,-0.4936 0.5202,-0.329 0.9266,-0.7568 1.2192,-1.2832 0.3088,-0.5429 0.4632,-1.127 0.4632,-1.7522 -0.3738,-0.2138 -0.8127,-0.3866 -1.3166,-0.5182 -0.5039,-0.1481 -1.0485,-0.2221 -1.6336,-0.2221 -1.0566,0 -1.8124,0.2139 -2.2676,0.6416 -0.4551,0.4278 -0.6827,0.9625 -0.6827,1.6041 0,0.5923 0.2113,1.0776 0.634,1.456 0.4388,0.3784 1.0321,0.5676 1.7799,0.5676 z" fill="#3C4043"/>
      <path d="m 56.5878,23.382998 c -0.0487,0.1152 -0.1056,0.2304 -0.1707,0.3455 -0.0487,0.1317 -0.0812,0.2221 -0.0975,0.2715 h -2.8039 c 0.0812,-0.181 0.195,-0.436 0.3413,-0.765 0.1626,-0.3291 0.317,-0.6581 0.4633,-0.9871 0.0975,-0.2139 0.195,-0.4443 0.2926,-0.691 0.1137,-0.2468 0.2275,-0.5018 0.3413,-0.7651 0.1301,-0.2632 0.252,-0.5182 0.3657,-0.765 l 0.9266,-2.0483 -5.1934,-11.8948105 h 2.9258 l 3.5598,8.5880105 h 0.1219 L 61.0985,6.0836875 H 64 L 57.5631,21.087998 c -0.1138,0.2797 -0.2438,0.5758 -0.3901,0.8884 -0.13,0.3126 -0.252,0.5923 -0.3657,0.839 -0.0976,0.2633 -0.1707,0.4525 -0.2195,0.5676 z" fill="#3C4043"/>
    </svg>
  );
}

function VisaLogo({ className = "h-3.5" }: { className?: string }) {
  return (
    <svg className={cn(className, "w-auto shrink-0 inline-block")} viewBox="0 7.8 24 8.6" fill="#1434CB" xmlns="http://www.w3.org/2000/svg" aria-label="Visa">
      <path d="M9.112 8.262L5.97 15.758H3.92L2.374 9.775c-.094-.368-.175-.503-.461-.658C1.447 8.864.677 8.627 0 8.479l.046-.217h3.3a.904.904 0 01.894.764l.817 4.338 2.018-5.102zm8.033 5.049c.008-1.979-2.736-2.088-2.717-2.972.006-.269.262-.555.822-.628a3.66 3.66 0 011.913.336l.34-1.59a5.207 5.207 0 00-1.814-.333c-1.917 0-3.266 1.02-3.278 2.479-.012 1.079.963 1.68 1.698 2.04.756.367 1.01.603 1.006.931-.005.504-.602.725-1.16.734-.975.015-1.54-.263-1.992-.473l-.351 1.642c.453.208 1.289.39 2.156.398 2.037 0 3.37-1.006 3.377-2.564m5.061 2.447H24l-1.565-7.496h-1.656a.883.883 0 00-.826.55l-2.909 6.946h2.036l.405-1.12h2.488zm-2.163-2.656l1.02-2.815.588 2.815zm-8.16-4.84l-1.603 7.496H8.34l1.605-7.496z"/>
    </svg>
  );
}

function MastercardLogo({ className = "h-3.5" }: { className?: string }) {
  return (
    <svg className={cn(className, "w-auto shrink-0 inline-block")} viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Mastercard">
      <circle cx="7" cy="8" r="7" fill="#EB001B"/>
      <circle cx="17" cy="8" r="7" fill="#F79E1B"/>
      <path d="M12 2.76a6.97 6.97 0 010 10.48 6.97 6.97 0 010-10.48z" fill="#FF5F00"/>
    </svg>
  );
}

function CardLogo({ className = "h-3 w-auto" }: { className?: string }) {
  return (
    <svg
      className={cn(className, "shrink-0 inline-block text-zinc-700")}
      viewBox="0 0 24 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Cards"
    >
      <rect x="0.75" y="0.75" width="22.5" height="14.5" rx="2.5" stroke="currentColor" strokeWidth="1.25" />
      <path d="M0.75 5h22.5" stroke="currentColor" strokeWidth="1.25" />
      <rect x="3.5" y="9.5" width="4.5" height="3" rx="0.75" fill="currentColor" />
      <rect x="10" y="10.5" width="5" height="1.2" rx="0.5" fill="currentColor" fillOpacity="0.5" />
    </svg>
  );
}

function LinkLogo({ className = "h-3 w-3" }: { className?: string }) {
  return (
    <svg
      className={cn(className, "shrink-0 inline-block")}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Link"
    >
      <rect width="40" height="40" rx="9" fill="#00D66F" />
      <path
        d="M19.08 8h-6.168c1.2 5.017 4.704 9.305 9.088 12-4.392 2.697-7.888 6.985-9.088 12h6.168c1.528-4.64 5.76-8.672 10.96-9.495v-5.017C24.832 16.672 20.6 12.64 19.08 8Z"
        fill="#011E0F"
      />
    </svg>
  );
}
