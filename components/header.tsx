"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { SiWordpress } from "react-icons/si";
import { BookOpen, Sparkles, Menu, X, Play, ArrowRight, ShieldCheck, Scale, CreditCard } from "lucide-react";
import AnimatedArrow from "@/components/ui/animated-arrow";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const isVisibleRef = useRef(true);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Handle Mac elastic bounce (negative scrollY)
      if (currentScrollY < 0) return;

      const prevScrollY = lastScrollYRef.current;
      const diff = currentScrollY - prevScrollY;

      // Always show near the top of the page
      if (currentScrollY <= 40) {
        if (!isVisibleRef.current) {
          isVisibleRef.current = true;
          setIsVisible(true);
        }
      } else if (diff > 6 && currentScrollY > 80) {
        // Scrolling down past header -> hide with animation (slide up)
        if (isVisibleRef.current) {
          isVisibleRef.current = false;
          setIsVisible(false);
        }
      } else if (diff < -6) {
        // Scrolling up -> show with animation (slide down)
        if (!isVisibleRef.current) {
          isVisibleRef.current = true;
          setIsVisible(true);
        }
      }

      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHeaderVisible = isVisible || mobileMenuOpen;

  return (
    <header
      className={`relative border-b border-zinc-200/60 bg-white/85 backdrop-blur-md supports-[backdrop-filter]:bg-white/75 dark:border-zinc-800/80 dark:bg-zinc-950/85 transition-transform duration-300 ease-in-out will-change-transform ${
        isHeaderVisible ? "translate-y-0" : "-translate-y-full pointer-events-none"
      }`}>
      <div className="mx-auto max-w-6xl px-3 sm:px-6">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-4 py-3 sm:py-4">
          {/* Left navigation */}
          <div className="flex items-center justify-start gap-1 sm:gap-1.5">
            {/* Features link */}
            <Link href="/features" className="hidden lg:inline-flex">
              <Button
                size="sm"
                variant="ghost"
                className="h-9 sm:h-10 rounded-xl px-2.5 sm:px-3 text-zinc-700 transition-colors hover:bg-zinc-100/70 hover:text-violet-700 font-medium text-xs sm:text-sm dark:text-zinc-300 dark:hover:bg-zinc-800">
                <span>Features</span>
              </Button>
            </Link>

            {/* Try It Live link (highlighted with live green pulse) */}
            <Link href="/demo" className="inline-flex">
              <Button
                size="sm"
                variant="ghost"
                className="group relative h-9 sm:h-10 rounded-xl px-2.5 sm:px-3 text-zinc-800 font-semibold text-xs sm:text-sm hover:bg-emerald-50 hover:text-emerald-700 transition-colors dark:text-zinc-200 dark:hover:bg-emerald-950/30">
                <span className="relative flex h-2 w-2 mr-1.5 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>Try It Live</span>
              </Button>
            </Link>

            {/* Docs link */}
            <Link href="/docs" className="hidden md:inline-flex">
              <Button
                size="sm"
                variant="ghost"
                className="h-9 sm:h-10 rounded-xl px-2.5 sm:px-3 text-zinc-700 transition-colors hover:bg-zinc-100/70 hover:text-violet-700 font-medium text-xs sm:text-sm dark:text-zinc-300 dark:hover:bg-zinc-800"
                aria-label="Documentation">
                <BookOpen className="h-4 w-4 text-violet-500 shrink-0 mr-1.5" />
                <span>Docs</span>
              </Button>
            </Link>
          </div>

          {/* Center brand logo */}
          <div className="flex items-center justify-center">
            <Link href="/" className="flex items-center gap-1.5 group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.svg"
                alt="phpinfo() WP logo"
                className="h-[19px] sm:h-[28px] w-auto shrink-0 object-contain transition-transform duration-200 group-hover:scale-105"
              />
              <span className="text-[14.5px] sm:text-[18px] font-bold tracking-tight text-zinc-900 leading-none dark:text-zinc-100">
                phpinfo<span className="text-zinc-900 dark:text-zinc-100">()</span>{" "}
                <span className="text-violet-600 font-extrabold">WP</span>
              </span>
            </Link>
          </div>

          {/* Right navigation + Get Pro button */}
          <div className="flex items-center justify-end gap-1.5 sm:gap-2">
            {/* Compare link */}
            <Link href="/compare" className="hidden lg:inline-flex">
              <Button
                size="sm"
                variant="ghost"
                className="h-9 sm:h-10 rounded-xl px-2.5 sm:px-3 text-zinc-700 transition-colors hover:bg-zinc-100/70 hover:text-violet-700 font-medium text-xs sm:text-sm dark:text-zinc-300 dark:hover:bg-zinc-800">
                <span>Compare</span>
              </Button>
            </Link>

            {/* Pricing link */}
            <Link href="/pricing" className="hidden md:inline-flex">
              <Button
                size="sm"
                variant="ghost"
                className="h-9 sm:h-10 rounded-xl px-2.5 sm:px-3 text-zinc-700 transition-colors hover:bg-zinc-100/70 hover:text-violet-700 font-medium text-xs sm:text-sm dark:text-zinc-300 dark:hover:bg-zinc-800">
                <span>Pricing</span>
              </Button>
            </Link>

            {/* Get Pro button */}
            <Link href="/pricing">
              <Button
                size="sm"
                className="group h-9 sm:h-10 rounded-xl bg-violet-500 px-3.5 sm:px-5 text-white shadow-[0_0_20px_-6px_rgba(167,139,250,0.6)] transition-all duration-150 ease-linear hover:bg-violet-600 font-medium text-xs sm:text-sm">
                <span>Get Pro</span>
                <AnimatedArrow className="ml-1.5 sm:ml-2" />
              </Button>
            </Link>

            {/* Mobile menu hamburger toggle button */}
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="h-9 w-9 p-0 rounded-xl text-zinc-700 hover:bg-zinc-100 md:hidden dark:text-zinc-300 dark:hover:bg-zinc-800"
              aria-label="Toggle navigation menu">
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown Panel */}
      {mobileMenuOpen && (
        <div
          className="md:hidden border-t border-zinc-200/80 bg-white/95 backdrop-blur-md px-4 py-4 dark:border-zinc-800 dark:bg-zinc-950/95 shadow-xl">
            <div className="flex flex-col space-y-1 text-sm font-medium">
              <Link
                href="/features"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-zinc-100 text-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-800">
                <span className="flex items-center gap-2.5">
                  <Sparkles className="h-4 w-4 text-violet-500" />
                  <span>Features</span>
                </span>
                <ArrowRight className="h-4 w-4 text-zinc-400" />
              </Link>

              <Link
                href="/demo"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50/70 hover:bg-emerald-100/70 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300 font-semibold">
                <span className="flex items-center gap-2.5">
                  <Play className="h-4 w-4 text-emerald-600" />
                  <span>Try It Live (Interactive Sandbox)</span>
                </span>
                <span className="rounded-full bg-emerald-200/70 text-emerald-800 text-[10px] px-2 py-0.5 font-bold">
                  LIVE
                </span>
              </Link>

              <Link
                href="/pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-zinc-100 text-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-800">
                <span className="flex items-center gap-2.5">
                  <CreditCard className="h-4 w-4 text-violet-500" />
                  <span>Pricing &amp; Plans</span>
                </span>
                <ArrowRight className="h-4 w-4 text-zinc-400" />
              </Link>

              <Link
                href="/compare"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-zinc-100 text-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-800">
                <span className="flex items-center gap-2.5">
                  <Scale className="h-4 w-4 text-violet-500" />
                  <span>Compare vs Alternatives</span>
                </span>
                <ArrowRight className="h-4 w-4 text-zinc-400" />
              </Link>

              <Link
                href="/docs"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-zinc-100 text-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-800">
                <span className="flex items-center gap-2.5">
                  <BookOpen className="h-4 w-4 text-violet-500" />
                  <span>Documentation</span>
                </span>
                <ArrowRight className="h-4 w-4 text-zinc-400" />
              </Link>

              <Link
                href="/changelog"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-zinc-100 text-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-800">
                <span>Changelog</span>
                <span className="text-xs text-zinc-400">v8.0</span>
              </Link>

              <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800">
                <Link
                  href="https://wordpress.org/plugins//"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2.5 rounded-xl text-zinc-600 hover:text-violet-700">
                  <SiWordpress className="h-4 w-4" />
                  <span>WordPress.org Free Version</span>
                </Link>
              </div>
            </div>
          </div>
        )}
    </header>
  );
}
