"use client";

import { useState } from "react";
import Link from "next/link";
import { Terminal, BookOpen, Sparkles, Menu, X, ArrowUpRight } from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-4">
      <nav className="max-w-6xl mx-auto rounded-full px-5 py-3 flex items-center justify-between border border-[#e6e8eb] backdrop-blur-xl bg-white/85 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-[#635bff] to-[#00d4b2] p-[1px] shadow-sm group-hover:scale-105 transition-transform duration-300">
            <div className="h-full w-full bg-white rounded-[11px] flex items-center justify-center">
              <Terminal className="h-4 w-4 text-[#635bff]" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-extrabold tracking-tight text-[#0a2540] text-base sm:text-lg font-mono">
              phpinfo<span className="text-[#635bff]">()</span>
              <span className="text-[#00a389] font-sans text-xs ml-1 font-bold px-1.5 py-0.5 rounded-full bg-[#e6fbf7] border border-[#a3f3e5]">WP</span>
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-[#f0f3ff] text-[#635bff] border border-[#d6dcff]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00d4b2] animate-pulse" />
              v8.0 Pro
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1 text-sm font-semibold text-[#425466]">
          <Link href="/#features" className="px-3.5 py-1.5 rounded-full hover:text-[#0a2540] hover:bg-[#f8faff] transition-colors">
            Features
          </Link>
          <Link href="/#demo" className="px-3.5 py-1.5 rounded-full hover:text-[#0a2540] hover:bg-[#f8faff] transition-colors flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-[#ff8a00]" />
            Live Preview
          </Link>
          <Link href="/docs" className="px-3.5 py-1.5 rounded-full hover:text-[#0a2540] hover:bg-[#f8faff] transition-colors flex items-center gap-1.5">
            <BookOpen className="h-3.5 w-3.5 text-[#635bff]" />
            28 Modules Docs
          </Link>
          <Link href="/#pricing" className="px-3.5 py-1.5 rounded-full hover:text-[#0a2540] hover:bg-[#f8faff] transition-colors">
            Pricing
          </Link>
          <Link href="/changelog" className="px-3.5 py-1.5 rounded-full hover:text-[#0a2540] hover:bg-[#f8faff] transition-colors">
            Changelog
          </Link>
        </div>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="https://wordpress.org/plugins/phpinfo-wp/"
            target="_blank"
            rel="noopener noreferrer"
            className="stripe-button-secondary text-xs px-4 py-2 flex items-center gap-1"
          >
            WP.org Free
            <ArrowUpRight className="h-3 w-3 text-[#697386]" />
          </a>
          <a
            href="/#pricing"
            className="stripe-button-primary text-xs px-5 py-2 flex items-center gap-1.5"
          >
            <span>Get Pro Access</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-white/90" />
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-[#425466] hover:text-[#0a2540] rounded-full hover:bg-slate-100"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden mt-2 max-w-6xl mx-auto rounded-2xl p-4 flex flex-col gap-2 shadow-xl border border-[#e6e8eb] bg-white/95 backdrop-blur-xl">
          <Link
            href="/#features"
            onClick={() => setMobileOpen(false)}
            className="px-3 py-2 text-sm text-[#425466] hover:text-[#0a2540] hover:bg-[#f8faff] rounded-xl font-medium"
          >
            Features
          </Link>
          <Link
            href="/#demo"
            onClick={() => setMobileOpen(false)}
            className="px-3 py-2 text-sm text-[#425466] hover:text-[#0a2540] hover:bg-[#f8faff] rounded-xl font-medium flex items-center gap-2"
          >
            <Sparkles className="h-4 w-4 text-[#ff8a00]" />
            Live Preview
          </Link>
          <Link
            href="/docs"
            onClick={() => setMobileOpen(false)}
            className="px-3 py-2 text-sm text-[#425466] hover:text-[#0a2540] hover:bg-[#f8faff] rounded-xl font-medium flex items-center gap-2"
          >
            <BookOpen className="h-4 w-4 text-[#635bff]" />
            28 Modules Docs
          </Link>
          <Link
            href="/#pricing"
            onClick={() => setMobileOpen(false)}
            className="px-3 py-2 text-sm text-[#425466] hover:text-[#0a2540] hover:bg-[#f8faff] rounded-xl font-medium"
          >
            Pricing
          </Link>
          <Link
            href="/changelog"
            onClick={() => setMobileOpen(false)}
            className="px-3 py-2 text-sm text-[#425466] hover:text-[#0a2540] hover:bg-[#f8faff] rounded-xl font-medium"
          >
            Changelog
          </Link>
          <div className="pt-2 border-t border-[#e6e8eb] flex flex-col gap-2">
            <a
              href="https://wordpress.org/plugins/phpinfo-wp/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-center text-xs text-[#0a2540] font-semibold py-2.5 rounded-full border border-[#e6e8eb] hover:bg-[#f8faff]"
            >
              WordPress.org Free Download
            </a>
            <a
              href="/#pricing"
              onClick={() => setMobileOpen(false)}
              className="text-center text-xs font-semibold py-2.5 rounded-full bg-[#635bff] text-white shadow-md"
            >
              Get Pro Access
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
