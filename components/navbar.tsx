"use client";

import { useState } from "react";
import Link from "next/link";
import { Terminal, BookOpen, Sparkles, Menu, X, ArrowUpRight } from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-4">
      <nav className="max-w-6xl mx-auto rounded-2xl px-4 py-3 flex items-center justify-between shadow-sm border border-slate-200/90 backdrop-blur-xl bg-white/90">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 p-[1px] shadow-sm group-hover:scale-105 transition-transform duration-300">
            <div className="h-full w-full bg-white rounded-[11px] flex items-center justify-center">
              <Terminal className="h-4 w-4 text-violet-600" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold tracking-tight text-slate-900 text-base sm:text-lg font-mono">
              phpinfo<span className="text-violet-600">()</span>
              <span className="text-emerald-700 font-sans text-xs ml-1 font-semibold px-1.5 py-0.5 rounded bg-emerald-50 border border-emerald-200">WP</span>
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full bg-violet-50 text-violet-700 border border-violet-200">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              v8.0 Pro
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1 text-sm font-medium text-slate-600">
          <Link href="/#features" className="px-3.5 py-1.5 rounded-lg hover:text-slate-900 hover:bg-slate-100 transition-colors">
            Features
          </Link>
          <Link href="/#demo" className="px-3.5 py-1.5 rounded-lg hover:text-slate-900 hover:bg-slate-100 transition-colors flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            Live Preview
          </Link>
          <Link href="/docs" className="px-3.5 py-1.5 rounded-lg hover:text-slate-900 hover:bg-slate-100 transition-colors flex items-center gap-1.5">
            <BookOpen className="h-3.5 w-3.5 text-violet-600" />
            28 Modules Docs
          </Link>
          <Link href="/#pricing" className="px-3.5 py-1.5 rounded-lg hover:text-slate-900 hover:bg-slate-100 transition-colors">
            Pricing
          </Link>
          <Link href="/changelog" className="px-3.5 py-1.5 rounded-lg hover:text-slate-900 hover:bg-slate-100 transition-colors">
            Changelog
          </Link>
        </div>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="https://wordpress.org/plugins/phpinfo-wp/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium text-slate-700 hover:text-slate-900 px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors flex items-center gap-1"
          >
            WP.org Free
            <ArrowUpRight className="h-3 w-3 text-slate-400" />
          </a>
          <a
            href="/#pricing"
            className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold text-xs shadow-md shadow-violet-500/20 hover:shadow-violet-500/30 transition-all flex items-center gap-1.5"
          >
            <span>Get Pro Access</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-violet-200" />
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden mt-2 max-w-6xl mx-auto rounded-2xl p-4 flex flex-col gap-2.5 shadow-xl border border-slate-200 bg-white/95 backdrop-blur-xl">
          <Link
            href="/#features"
            onClick={() => setMobileOpen(false)}
            className="px-3 py-2 text-sm text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg"
          >
            Features
          </Link>
          <Link
            href="/#demo"
            onClick={() => setMobileOpen(false)}
            className="px-3 py-2 text-sm text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg flex items-center gap-2"
          >
            <Sparkles className="h-4 w-4 text-amber-500" />
            Live Preview
          </Link>
          <Link
            href="/docs"
            onClick={() => setMobileOpen(false)}
            className="px-3 py-2 text-sm text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg flex items-center gap-2"
          >
            <BookOpen className="h-4 w-4 text-violet-600" />
            28 Modules Docs
          </Link>
          <Link
            href="/#pricing"
            onClick={() => setMobileOpen(false)}
            className="px-3 py-2 text-sm text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg"
          >
            Pricing
          </Link>
          <Link
            href="/changelog"
            onClick={() => setMobileOpen(false)}
            className="px-3 py-2 text-sm text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg"
          >
            Changelog
          </Link>
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <a
              href="https://wordpress.org/plugins/phpinfo-wp/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-center text-xs text-slate-700 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50"
            >
              WordPress.org Free Download
            </a>
            <a
              href="/#pricing"
              onClick={() => setMobileOpen(false)}
              className="text-center text-xs font-semibold py-2.5 rounded-xl bg-violet-600 text-white shadow-md"
            >
              Get Pro Access
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
