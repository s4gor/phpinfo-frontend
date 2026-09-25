"use client";

import React from "react";
import HeroSocialProof from "./hero-social-proof";

export default function HeroShowcase() {
  return (
    <div className="w-full mt-0 sm:mt-10 mb-0 overflow-visible">
      {/* ──────────────────────────────────────────────────────────
          3D HERO CARDS DECK
          Fanned out interactive card stack with hover choreography
         ────────────────────────────────────────────────────────── */}
      <div className="hero-deck-viewport">
        <div className="hero-deck-row">
          {/* ──────────────────────────────────────────────────────────
              CARD 1: LEFT STACK (Server Intelligence & Health Command)
             ────────────────────────────────────────────────────────── */}
          <article
            className="hero-deck-card deck-left select-none"
            tabIndex={0}
            aria-label="Server Intelligence & Health Command"
          >
            {/* Handwritten Note with Arrow */}
            <div className="hero-deck-note" aria-hidden="true">
              <span>Real-time server diagnostics</span>
              <svg className="hero-deck-note-arrow" viewBox="0 0 40 36" aria-hidden="true">
                <path d="M 14 4 C 16 14 22 22 20 30" />
                <path d="M 14 24 L 20 32 L 26 24" />
              </svg>
            </div>

            {/* Card Content */}
            <div className="p-3.5 flex flex-col gap-2 font-sans flex-1 overflow-visible relative">
              {/* Header Bar */}
              <div className="flex flex-col gap-1 pb-1.5 mb-1 border-b border-dashed border-slate-200">
                <div className="flex items-center gap-1.5">
                  <span className="inline-flex items-center gap-1 text-[8px] font-bold tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-full px-1.5 py-0.5 uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> LIVE SERVER TELEMETRY
                  </span>
                  <span className="text-[8px] font-extrabold tracking-wider text-white bg-indigo-500 rounded-full px-1.5 py-0.5 uppercase">
                    PRO ACTIVE
                  </span>
                </div>
                <h3 className="text-[13.5px] font-extrabold text-slate-900 leading-tight tracking-tight m-0">
                  Server Intelligence &amp; Health Command
                </h3>
              </div>

              {/* Spec Strip: PHP, DB, Memory */}
              <div className="grid grid-cols-[1.25fr_1.15fr_0.75fr] gap-1.5 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 mb-1">
                <div className="flex flex-col">
                  <span className="text-[7px] font-bold text-slate-500 tracking-wider uppercase">PHP VERSION</span>
                  <div className="flex items-center gap-1 mt-0.5">
                    <b className="text-[10px] font-bold text-slate-900">8.3.33</b>
                    <span className="text-[7px] font-bold text-emerald-700 bg-emerald-100 rounded px-1 py-0.5">Supported ✓</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-[7px] font-bold text-slate-500 tracking-wider uppercase">DATABASE</span>
                  <div className="flex items-center gap-1 mt-0.5">
                    <b className="text-[10px] font-bold text-slate-900">MariaDB 10.11</b>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-[7px] font-bold text-slate-500 tracking-wider uppercase">MEMORY</span>
                  <div className="flex items-center gap-1 mt-0.5">
                    <b className="text-[10px] font-bold text-slate-900">512M</b>
                  </div>
                </div>
              </div>

              {/* Main Score Box: PHP Server Health & Configuration */}
              <div className="bg-white border border-slate-200 rounded-[10px] p-2.5 mb-1 shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
                <div className="flex items-start justify-between mb-1.5">
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold text-slate-900 leading-tight">PHP Server Health &amp; Configuration</span>
                    <span className="text-[8px] text-slate-500 mt-0.5">Automated audit against standards</span>
                  </div>
                  <span className="text-[11px] font-extrabold text-emerald-600 bg-emerald-100 border border-emerald-300 rounded-md px-1.5 py-0.5 leading-tight">
                    A+
                  </span>
                </div>

                <div className="flex items-baseline justify-between mb-1">
                  <div className="flex items-baseline gap-0.5">
                    <span className="text-[21px] font-extrabold text-slate-900 tracking-tight leading-none">100</span>
                    <span className="text-[11px] font-semibold text-slate-400">/100</span>
                  </div>
                  <span className="text-[9.5px] font-bold text-emerald-600">Optimal Configuration ✓</span>
                </div>

                {/* Progress Bar */}
                <div className="h-1 bg-slate-100 rounded-full overflow-hidden mb-2">
                  <div className="h-full bg-emerald-500 rounded-full w-full" />
                </div>

                {/* Directives Badges */}
                <div className="flex items-center gap-1 flex-wrap mb-2">
                  <span className="text-[8px] font-semibold text-emerald-800 bg-emerald-100 rounded px-1.5 py-0.5">19 Passed</span>
                  <span className="text-[8px] font-semibold text-slate-600 bg-slate-100 rounded px-1.5 py-0.5">0 Warnings</span>
                  <span className="text-[8px] font-semibold text-slate-600 bg-slate-100 rounded px-1.5 py-0.5">0 Failing</span>
                  <span className="text-[8px] font-semibold text-slate-700 bg-slate-200 rounded px-1.5 py-0.5 ml-auto">25 Total</span>
                </div>

                {/* Review Directives Button */}
                <button
                  type="button"
                  className="flex items-center justify-center gap-1.5 w-full py-1.5 px-2 bg-[#5b40d9] hover:bg-[#4a32b8] text-white rounded-md text-[9.5px] font-bold cursor-pointer transition-colors shadow-sm"
                  tabIndex={-1}
                >
                  <span>Review &amp; Auto-Fix Directives</span>
                  <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3" stroke="currentColor">
                    <path d="M 3 8 H 13 M 9 4 L 13 8 L 9 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>

              {/* Memory Engine Mini Card */}
              <div className="bg-white border border-slate-200 rounded-[10px] p-2 shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <div className="w-4 h-4 rounded bg-indigo-100 text-indigo-600 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-2.5 h-2.5">
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                    </svg>
                  </div>
                  <span className="text-[9.5px] font-bold text-slate-900">PHP Memory Engine</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="relative w-9 h-9 shrink-0">
                    <svg viewBox="0 0 36 36" className="w-9 h-9 -rotate-90">
                      <path
                        className="fill-none stroke-slate-200"
                        strokeWidth="3.8"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="fill-none stroke-emerald-500"
                        strokeWidth="3.8"
                        strokeDasharray="13, 100"
                        strokeLinecap="round"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-[8.5px] font-extrabold text-slate-900">
                      13%
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5 flex-1">
                    <div className="flex items-baseline gap-1.5 mb-0.5">
                      <b className="text-[11px] font-extrabold text-slate-900">64 MB</b>
                      <span className="text-[7.5px] text-slate-500">Limit: 512M</span>
                    </div>
                    <div className="flex items-center justify-between text-[7.5px] text-slate-500">
                      <span>Upload Max:</span>
                      <b className="font-bold text-slate-800">128M</b>
                    </div>
                    <div className="flex items-center justify-between text-[7.5px] text-slate-500">
                      <span>Post Max:</span>
                      <b className="font-bold text-slate-800">256M</b>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* ──────────────────────────────────────────────────────────
              CARD 2: CENTER STACK (Update Guard: Zero-Downtime Insurance)
             ────────────────────────────────────────────────────────── */}
          <article
            className="hero-deck-card deck-center select-none"
            tabIndex={0}
            aria-label="Update Guard: Zero-Downtime Insurance"
          >
            {/* Handwritten Note with Arrow */}
            <div className="hero-deck-note" aria-hidden="true">
              <span>Prevent update crashes with guard</span>
              <svg className="hero-deck-note-arrow" viewBox="0 0 40 36" aria-hidden="true">
                <path d="M 14 4 C 16 14 22 22 20 30" />
                <path d="M 14 24 L 20 32 L 26 24" />
              </svg>
            </div>

            {/* Card Content */}
            <div className="p-3 pb-2.5 flex flex-col gap-1.5 font-sans flex-1 overflow-visible relative">
              {/* Header Bar */}
              <div className="flex flex-col gap-0.5 pb-1.5 mb-0.5 border-b border-dashed border-slate-200">
                <div className="flex items-center gap-1.5">
                  <span className="inline-flex items-center gap-1 text-[8px] font-bold tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-full px-1.5 py-0.5 uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" /> UPDATE GUARD
                  </span>
                  <span className="text-[8px] font-extrabold tracking-wider text-white bg-indigo-500 rounded-full px-1.5 py-0.5 uppercase">
                    SECURITY SUITE
                  </span>
                </div>
                <h3 className="text-[13px] font-extrabold text-slate-900 leading-tight tracking-tight m-0">
                  Update Guard: Zero-Downtime Insurance
                </h3>
              </div>

              {/* Tabs Bar */}
              <div className="flex items-center gap-2 border-b border-slate-200 pb-1 text-[8px] font-semibold text-slate-500">
                <div className="flex items-center gap-1 text-indigo-600 border-b-2 border-indigo-600 -mb-[5px] pb-0.5 font-bold cursor-pointer">
                  <span>Plugins &amp; Themes Guard</span>
                  <span className="bg-red-500 text-white rounded-full px-1 text-[7.5px] font-extrabold leading-3">11</span>
                </div>
                <div className="flex items-center gap-1 cursor-pointer hover:text-slate-700">
                  <span>Core Audit</span>
                </div>
                <div className="flex items-center gap-1 cursor-pointer hover:text-slate-700">
                  <span>History &amp; Health</span>
                </div>
              </div>

              {/* Pending Updates Scan Summary Box */}
              <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 gap-1.5">
                <div className="flex flex-col gap-0.5 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-amber-500 text-white font-black text-[10px] flex items-center justify-center shrink-0">
                      !
                    </span>
                    <div>
                      <div className="text-[9.5px] font-extrabold text-slate-900 leading-tight">Update with caution</div>
                      <div className="text-[7px] text-slate-500 leading-tight">11 updates scanned before applying</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="text-[7px] font-semibold rounded px-1 py-0.5 text-emerald-700 bg-emerald-100"><b>4</b> Safe</span>
                    <span className="text-[7px] font-semibold rounded px-1 py-0.5 text-amber-800 bg-amber-100"><b>9</b> Caution</span>
                    <span className="text-[7px] font-semibold rounded px-1 py-0.5 text-sky-700 bg-sky-100"><b>0</b> Risky</span>
                  </div>
                </div>
                <button
                  type="button"
                  className="bg-[#5b40d9] hover:bg-[#4a32b8] text-white border-0 rounded px-1.5 py-1 text-[7.5px] font-bold flex items-center gap-1 cursor-pointer shrink-0 whitespace-nowrap transition-colors"
                  tabIndex={-1}
                >
                  <svg viewBox="0 0 16 16" fill="none" className="w-2.5 h-2.5" stroke="currentColor">
                    <circle cx="7" cy="7" r="4.5" strokeWidth="1.8" />
                    <path d="M10.5 10.5L14 14" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                  <span>Scan Updates</span>
                </button>
              </div>

              {/* Plugin Item 1: Complianz */}
              <div className="bg-white border border-slate-200 border-l-[3px] border-l-amber-500 rounded-md px-1.5 py-1 flex flex-col gap-0.5 shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 min-w-0">
                    <span className="bg-indigo-500 text-white text-[6.5px] font-extrabold px-1 py-0.5 rounded-[2.5px] uppercase">
                      Plugin
                    </span>
                    <span className="text-[8.5px] font-bold text-slate-900 truncate">Complianz</span>
                    <span className="text-[7px] text-slate-500 bg-slate-100 px-1 py-0.5 rounded font-mono">1.3.0 → 1.4.0</span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <span className="text-[6.5px] font-bold text-emerald-700 bg-emerald-100 border border-emerald-300 rounded-full px-1 py-0.5">
                      Stability: 100%
                    </span>
                    <span className="text-[6.5px] font-extrabold text-white bg-amber-500 rounded px-1 py-0.5 uppercase tracking-wider">
                      CAUTION
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-0.5 mt-0.5">
                  <div className="flex items-center gap-1 text-[7.5px] text-slate-700 leading-tight">
                    <span className="w-2.5 h-2.5 rounded-full font-black text-[6.5px] flex items-center justify-center shrink-0 bg-amber-100 text-amber-600">!</span>
                    <span className="flex-1 truncate">Tested up to WordPress 7.0.4 (you run 7.1)</span>
                    <span className="text-[6.5px] font-semibold text-indigo-600 underline cursor-pointer shrink-0 ml-auto">Explain with AI</span>
                  </div>
                  <div className="flex items-center gap-1 text-[7.5px] text-slate-700 leading-tight">
                    <span className="w-2.5 h-2.5 rounded-full font-black text-[6.5px] flex items-center justify-center shrink-0 bg-amber-100 text-amber-600">!</span>
                    <span className="flex-1 truncate">Changelog mentions: &quot;removed&quot;</span>
                    <span className="text-[6.5px] font-semibold text-indigo-600 underline cursor-pointer shrink-0 ml-auto">Explain with AI</span>
                  </div>
                  <div className="flex items-center gap-1 text-[7.5px] text-slate-700 leading-tight">
                    <span className="w-2.5 h-2.5 rounded-full font-black text-[6.5px] flex items-center justify-center shrink-0 bg-sky-100 text-sky-600">i</span>
                    <span className="flex-1 truncate">Changelog mentions: &quot;deprecated&quot;</span>
                    <span className="text-[6.5px] font-semibold text-indigo-600 underline cursor-pointer shrink-0 ml-auto">Explain with AI</span>
                  </div>
                </div>
              </div>

              {/* Plugin Item 2: WPCode Lite */}
              <div className="bg-white border border-slate-200 border-l-[3px] border-l-amber-500 rounded-md px-1.5 py-1 flex flex-col gap-0.5 shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 min-w-0">
                    <span className="bg-indigo-500 text-white text-[6.5px] font-extrabold px-1 py-0.5 rounded-[2.5px] uppercase">
                      Plugin
                    </span>
                    <span className="text-[8.5px] font-bold text-slate-900 truncate">WPCode Lite</span>
                    <span className="text-[7px] text-slate-500 bg-slate-100 px-1 py-0.5 rounded font-mono">2.3.6 → 2.3.8</span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <span className="text-[6.5px] font-extrabold text-white bg-amber-500 rounded px-1 py-0.5 uppercase tracking-wider">
                      CAUTION
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-0.5 mt-0.5">
                  <div className="flex items-center gap-1 text-[7.5px] text-slate-700 leading-tight">
                    <span className="w-2.5 h-2.5 rounded-full font-black text-[6.5px] flex items-center justify-center shrink-0 bg-amber-100 text-amber-600">!</span>
                    <span className="flex-1 truncate">Changelog mentions: &quot;fatal&quot;</span>
                    <span className="text-[6.5px] font-semibold text-indigo-600 underline cursor-pointer shrink-0 ml-auto">Explain with AI</span>
                  </div>
                  <div className="flex items-center gap-1 text-[7.5px] text-slate-700 leading-tight">
                    <span className="w-2.5 h-2.5 rounded-full font-black text-[6.5px] flex items-center justify-center shrink-0 bg-sky-100 text-sky-600">i</span>
                    <span className="flex-1 truncate">Changelog mentions: &quot;requires wordpress&quot;</span>
                    <span className="text-[6.5px] font-semibold text-indigo-600 underline cursor-pointer shrink-0 ml-auto">Explain with AI</span>
                  </div>
                </div>
              </div>

              {/* AI Insight Box */}
              <div className="bg-gradient-to-b from-purple-50 to-purple-100/70 border border-purple-200 rounded-lg p-1.5 flex flex-col gap-1 shadow-[0_4px_12px_-6px_rgba(109,40,217,0.15)]">
                <div className="flex items-center gap-1">
                  <span className="w-3.5 h-3.5 rounded bg-purple-200 text-purple-700 text-[9px] flex items-center justify-center">✦</span>
                  <span className="text-[9px] font-extrabold text-purple-900">Update Guard AI</span>
                  <span className="ml-auto text-[7px] font-extrabold text-purple-600 tracking-wider uppercase">INSIGHT</span>
                </div>
                <div className="text-[8px] leading-relaxed text-purple-950">
                  Complianz 1.4 has 1 deprecated call removed in PHP 8.3. Safety snapshot created &amp; 60s rollback armed.
                </div>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="text-[7px] font-mono text-purple-800 bg-white border border-purple-300 rounded-full px-1.5 py-0.5">inspect breaking lines</span>
                  <span className="text-[7px] font-mono text-purple-800 bg-white border border-purple-300 rounded-full px-1.5 py-0.5">auto-rollback ready</span>
                </div>
              </div>

              {/* Bottom Warning Pill */}
              <div className="inline-flex items-center gap-1.5 text-[8.5px] font-bold text-amber-700 bg-amber-50 border border-amber-200/80 rounded-full px-2.5 py-1 mt-auto mx-auto shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                pre-flight score: 96/100 · zero downtime
              </div>
            </div>
          </article>

          {/* ──────────────────────────────────────────────────────────
              CARD 3: RIGHT STACK (Config Grader: Production Benchmark)
             ────────────────────────────────────────────────────────── */}
          <article
            className="hero-deck-card deck-right select-none"
            tabIndex={0}
            aria-label="Config Grader: Production Benchmark"
          >
            {/* Handwritten Note with Arrow */}
            <div className="hero-deck-note" aria-hidden="true">
              <span>Fix Server issue with config audit</span>
              <svg className="hero-deck-note-arrow" viewBox="0 0 40 36" aria-hidden="true">
                <path d="M 14 4 C 16 14 22 22 20 30" />
                <path d="M 14 24 L 20 32 L 26 24" />
              </svg>
            </div>

            {/* Card Content */}
            <div className="p-3 pb-2.5 flex flex-col gap-1.5 font-sans flex-1 overflow-visible relative">
              {/* Header Bar */}
              <div className="flex flex-col gap-0.5 pb-1.5 mb-0.5 border-b border-dashed border-slate-200">
                <div className="flex items-center gap-1.5">
                  <span className="inline-flex items-center gap-1 text-[8px] font-bold tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-1.5 py-0.5 uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> CONFIG GRADER
                  </span>
                  <span className="text-[8px] font-extrabold tracking-wider text-white bg-indigo-500 rounded-full px-1.5 py-0.5 uppercase">
                    PRO BENCHMARK
                  </span>
                </div>
                <h3 className="text-[13px] font-extrabold text-slate-900 leading-tight tracking-tight m-0">
                  Config Grader: Production Standard
                </h3>
              </div>

              {/* Tabs Bar */}
              <div className="flex items-center gap-2 border-b border-slate-200 pb-1 text-[8px] font-semibold text-slate-500">
                <div className="flex items-center gap-1 text-blue-600 border-b-2 border-blue-600 -mb-[5px] pb-0.5 font-bold cursor-pointer">
                  <span>All Directives &amp; Categories</span>
                </div>
                <div className="flex items-center gap-1 cursor-pointer hover:text-slate-700">
                  <span>Actionable Issues ✓</span>
                </div>
                <div className="flex items-center gap-1 cursor-pointer hover:text-slate-700">
                  <svg viewBox="0 0 16 16" fill="none" className="w-2.5 h-2.5 inline" stroke="currentColor">
                    <rect x="3" y="6" width="10" height="8" rx="1.5" strokeWidth="1.5" />
                    <path d="M5 6V4a3 3 0 0 1 6 0v2" strokeWidth="1.5" />
                  </svg>
                  <span>Locked (6)</span>
                </div>
              </div>

              {/* Filter Pills */}
              <div className="flex items-center gap-1 overflow-x-hidden">
                <span className="text-[7px] font-bold px-1.5 py-0.5 rounded-full bg-blue-600 text-white whitespace-nowrap cursor-pointer">All Checks (25)</span>
                <span className="text-[7px] font-semibold px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-600 whitespace-nowrap cursor-pointer hover:bg-slate-200">⚡ Performance</span>
                <span className="text-[7px] font-semibold px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-600 whitespace-nowrap cursor-pointer hover:bg-slate-200">🔒 Security</span>
                <span className="text-[7px] font-semibold px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-600 whitespace-nowrap cursor-pointer hover:bg-slate-200">⚡ OPcache</span>
                <span className="text-[7px] font-semibold px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-600 whitespace-nowrap cursor-pointer hover:bg-slate-200">⚙ Config</span>
              </div>

              {/* Score / Grade Summary Row */}
              <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5">
                <div className="flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-500 text-white text-[9.5px] font-black flex items-center justify-center shadow-[0_1px_3px_rgba(16,185,129,0.3)]">
                    A+
                  </span>
                  <div className="flex flex-col">
                    <div className="text-[10px] font-extrabold text-slate-900 leading-none">
                      100<span className="text-[7.5px] text-slate-500 font-semibold">/100</span>
                    </div>
                    <span className="text-[6.5px] font-bold tracking-wider text-emerald-700 uppercase mt-0.5">CONFIG GRADE</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[7.5px] font-bold px-1.5 py-0.5 rounded text-emerald-700 bg-emerald-100 border border-emerald-200">19 Passing</span>
                  <span className="text-[7.5px] font-bold px-1.5 py-0.5 rounded text-slate-600 bg-slate-100">25 Total Checks</span>
                </div>
              </div>

              {/* Directive Item 1: allow_url_include */}
              <div className="bg-white border border-slate-200 border-l-[3px] border-l-emerald-500 rounded-md px-1.5 py-1 flex flex-col gap-0.5 shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 text-white text-[7px] font-black flex items-center justify-center shrink-0">✓</span>
                    <span className="font-mono text-[8.5px] font-bold text-slate-900">allow_url_include</span>
                  </div>
                  <span className="text-[7px] text-slate-500 bg-slate-100 px-1 py-0.5 rounded">Security</span>
                </div>
                <div className="text-[7px] leading-tight text-slate-800 flex items-center gap-1 mt-0.5">
                  <span>Current: <b>(not set)</b> →</span>
                  <span className="bg-emerald-100 text-emerald-800 px-1 py-0.5 rounded font-bold font-mono">Recommended: Off (critical RCE vector)</span>
                </div>
                <div className="text-[7px] text-slate-500 leading-tight truncate">
                  Lets PHP &apos;include&apos; remote URLs. Single biggest RCE foot-gun in PHP.
                </div>
              </div>

              {/* Directive Item 2: display_errors */}
              <div className="bg-white border border-slate-200 border-l-[3px] border-l-emerald-500 rounded-md px-1.5 py-1 flex flex-col gap-0.5 shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 text-white text-[7px] font-black flex items-center justify-center shrink-0">✓</span>
                    <span className="font-mono text-[8.5px] font-bold text-slate-900">display_errors</span>
                  </div>
                  <span className="text-[7px] text-slate-500 bg-slate-100 px-1 py-0.5 rounded">Security</span>
                </div>
                <div className="text-[7px] leading-tight text-slate-800 flex items-center gap-1 mt-0.5">
                  <span>Current: <b>0</b> →</span>
                  <span className="bg-emerald-100 text-emerald-800 px-1 py-0.5 rounded font-bold font-mono">Recommended: Off (production)</span>
                </div>
                <div className="text-[7px] text-slate-500 leading-tight truncate">
                  When on, PHP errors print to response. Stack traces leak credentials and paths.
                </div>
              </div>

              {/* Directive Item 3: memory_limit */}
              <div className="bg-white border border-slate-200 border-l-[3px] border-l-emerald-500 rounded-md px-1.5 py-1 flex flex-col gap-0.5 shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 text-white text-[7px] font-black flex items-center justify-center shrink-0">✓</span>
                    <span className="font-mono text-[8.5px] font-bold text-slate-900">memory_limit</span>
                  </div>
                  <span className="text-[7px] text-slate-500 bg-slate-100 px-1 py-0.5 rounded">Performance</span>
                </div>
                <div className="text-[7px] leading-tight text-slate-800 flex items-center gap-1 mt-0.5">
                  <span>Current: <b>512M</b> →</span>
                  <span className="bg-emerald-100 text-emerald-800 px-1 py-0.5 rounded font-bold font-mono">Recommended: 256M+</span>
                </div>
                <div className="text-[7px] text-slate-500 leading-tight truncate">
                  PHP memory ceiling. WordPress baseline is 256M; WooCommerce &amp; LMS need 512M+.
                </div>
              </div>

              {/* AI Verification Box */}
              <div className="bg-gradient-to-b from-emerald-50 to-emerald-100/60 border border-emerald-200 rounded-lg p-1.5 flex flex-col gap-1 shadow-[0_4px_12px_-6px_rgba(16,185,129,0.15)]">
                <div className="flex items-center gap-1">
                  <span className="w-3.5 h-3.5 rounded bg-emerald-200 text-emerald-700 text-[9px] flex items-center justify-center">✦</span>
                  <span className="text-[9px] font-extrabold text-emerald-900">Config Grader AI</span>
                  <span className="ml-auto text-[7px] font-extrabold text-emerald-700 tracking-wider uppercase">OPTIMAL</span>
                </div>
                <div className="text-[8px] leading-relaxed text-emerald-950">
                  25/25 directives evaluated against WordPress &amp; WooCommerce benchmarks. Grade A+ configuration verified.
                </div>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="text-[7px] font-mono text-emerald-800 bg-white border border-emerald-300 rounded-full px-1.5 py-0.5">auto-fix php.ini</span>
                  <span className="text-[7px] font-mono text-emerald-800 bg-white border border-emerald-300 rounded-full px-1.5 py-0.5">export compliance PDF</span>
                </div>
              </div>

              {/* Bottom Pill */}
              <div className="inline-flex items-center gap-1.5 text-[8.5px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/80 rounded-full px-2.5 py-1 mt-auto mx-auto shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                config grade: 100/100 · zero security leaks
              </div>
            </div>
          </article>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────
          BOTTOM SECTION: Social Proof Strip with Infinite Marquee
         ────────────────────────────────────────────────────────── */}
      <HeroSocialProof />
    </div>
  );
}
