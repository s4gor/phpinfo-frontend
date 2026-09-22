"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { containerVariants, itemVariants } from "@/lib/animation-variants";
import TextBlur from "./ui/text-blur";
import {
  FileText,
  Activity,
  Shield,
  Database,
  Lock,
  AlertTriangle,
  Code2,
  CheckCircle2,
  ZoomIn,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowUpRight,
  ImageIcon,
} from "lucide-react";

interface Shot {
  id: string;
  tabLabel: string;
  src: string;
  alt: string;
  title: string;
  tagline: string;
  badge: { icon: React.ComponentType<{ className?: string }>; label: string };
  callout: { text: string; subtext?: string };
  highlights: [
    { title: string; desc: string },
    { title: string; desc: string },
    { title: string; desc: string }
  ];
}

// 8 Screenshots in Serial Priority
const shots: Shot[] = [
  // 1. Overview & Live Telemetry
  {
    id: "dashboard",
    tabLabel: "Overview",
    src: "/screenshots/dashboard.v8.png",
    alt: "Live Server Operations & Telemetry Overview",
    title: "Live Operations & Server Telemetry",
    tagline: "Real-time OPcache, RAM, Object Cache & system health vitals at a glance.",
    badge: { icon: Activity, label: "Live Telemetry" },
    callout: {
      text: "Live OPcache & RAM Telemetry",
      subtext: "Instant visual gauges & memory thresholds",
    },
    highlights: [
      { title: "Real-Time Gauges", desc: "Live OPcache hit rate, memory consumption, and peak RAM allocation." },
      { title: "Active Issue Radar", desc: "Instantly flags failing headers, orphaned crons, and PHP bottlenecks." },
      { title: "Zero SaaS Overhead", desc: "Runs 100% locally inside WordPress admin without third-party tracking." },
    ],
  },
  // 2. White-Label Client PDF Audit Report
  {
    id: "pdf-cover",
    tabLabel: "PDF Report",
    src: "/screenshots/pdf-cover.v8.png",
    alt: "White-label Client PDF Audit Report",
    title: "Client-Ready White-Label PDF Audits",
    tagline: "Export comprehensive server and security audit reports with your custom agency logo.",
    badge: { icon: FileText, label: "PDF Reports" },
    callout: {
      text: "White-Label Agency Branding",
      subtext: "1-click export with your logo & company colors",
    },
    highlights: [
      { title: "Custom Branding", desc: "Replace all Exeebit branding with your agency logo and custom footer notes." },
      { title: "Executive Summaries", desc: "Clear A-F config grades and issue breakdowns clients immediately understand." },
      { title: "1-Click PDF Generation", desc: "Generates vector-crisp multi-page PDF documents in under 2 seconds." },
    ],
  },
  // 3. Update Guard Suite
  {
    id: "update-guard",
    tabLabel: "Update Guard",
    src: "/screenshots/update-guard.v8.png",
    alt: "Update Guard Pre and Post Update Health Loopback",
    title: "Update Guard: Zero-Downtime Insurance",
    tagline: "Pre-update risk analysis + 60-second automated post-update loopback diagnostics.",
    badge: { icon: Shield, label: "Update Guard" },
    callout: {
      text: "Pre-Update Risk Shield",
      subtext: "Scans plugin changelogs & monitors update rollouts",
    },
    highlights: [
      { title: "Pre-Update Risk Scan", desc: "Detects breaking PHP version requirements and dangerous DB migrations before you click update." },
      { title: "60s Health Loopback", desc: "Monitors HTTP response codes and error logs immediately after core/plugin updates." },
      { title: "Automated Safety Net", desc: "Prevents silent white-screen crashes and plugin conflicts across your site." },
    ],
  },
  // 4. Admin Security Activity Log
  {
    id: "admin-log",
    tabLabel: "Admin Log",
    src: "/screenshots/admin-log.v8.png",
    alt: "WordPress Admin Security Activity Log with Real IP Tags",
    title: "Admin Activity Log & Real IP Resolution",
    tagline: "Granular audit trail with Cloudflare/proxy real IP resolution and brute force alerts.",
    badge: { icon: Lock, label: "Admin Log" },
    callout: {
      text: "Real IP Resolution",
      subtext: "Bypasses Cloudflare / reverse proxy IP masking",
    },
    highlights: [
      { title: "Accurate Real IP", desc: "Resolves actual visitor and admin IPs through Cloudflare, Fastly, and Nginx proxies." },
      { title: "Privilege Tracking", desc: "Logs user role promotions, password resets, and critical file modifications." },
      { title: "Brute Force Defense", desc: "Tracks failed login spikes and exports suspicious IP blocks in one click." },
    ],
  },
  // 5. Database Health & Missing Index Scanner
  {
    id: "db-health",
    tabLabel: "DB Health",
    src: "/screenshots/db-health.v8.png",
    alt: "Database Health Autoload Bloat & MySQL Missing Index Scanner",
    title: "Database Health & MySQL Index Scanner",
    tagline: "Detect wp_options autoload bloat, missing table indexes, and silent query latency.",
    badge: { icon: Database, label: "DB Engine" },
    callout: {
      text: "Autoload Size Diagnostic",
      subtext: "Pinpoints bloated options causing slow TTFB",
    },
    highlights: [
      { title: "Autoload Bloat Scanner", desc: "Flags transient debris and oversized options dragging down page load times." },
      { title: "Missing MySQL Indexes", desc: "Spots unindexed WooCommerce tables and high-traffic query bottlenecks." },
      { title: "Storage Engine Health", desc: "Checks InnoDB vs MyISAM status and table fragmentation levels." },
    ],
  },
  // 6. PHP Compatibility Scanner
  {
    id: "compat",
    tabLabel: "Compatibility",
    src: "/screenshots/compat.v8.png",
    alt: "PHP Compatibility Scanner up to PHP 8.4",
    title: "PHP Compatibility Scanner (PHP 7.4 - 8.4)",
    tagline: "Safe static compatibility scanner that works on shared, VPS, and managed hosts.",
    badge: { icon: AlertTriangle, label: "Compatibility" },
    callout: {
      text: "Static AST Code Scanner",
      subtext: "Scans plugins & themes without crashing live traffic",
    },
    highlights: [
      { title: "Full 7.4 - 8.4 Coverage", desc: "Identifies deprecated functions and fatal syntax changes before upgrading server PHP." },
      { title: "Zero Production Risk", desc: "Performs static syntax analysis in isolated threads without executing active code." },
      { title: "Plugin Breakdown", desc: "Pinpoints exactly which plugin or theme file contains incompatible code." },
    ],
  },
  // 7. Web Server Snippet Library
  {
    id: "server-snippets",
    tabLabel: "Server Snippets",
    src: "/screenshots/server-snippets.v8.png",
    alt: "Web Server Snippet Library for Nginx, Apache and LiteSpeed",
    title: "Curated Server Snippet Library",
    tagline: "Production-ready security and performance rules with one-click copy and rollback.",
    badge: { icon: Code2, label: "Server Snippets" },
    callout: {
      text: "Nginx, Apache & LiteSpeed",
      subtext: "Hardened configurations with syntax verification",
    },
    highlights: [
      { title: "Multi-Server Support", desc: "Ready-to-use snippets formatted specifically for Nginx, Apache (.htaccess), and LiteSpeed." },
      { title: "Security Directives", desc: "Block XML-RPC attacks, protect wp-config.php, and disable sensitive file execution." },
      { title: "Performance Rules", desc: "Fine-tune browser caching headers, Gzip compression, and OPcache timeouts." },
    ],
  },
  // 8. Config Grader & Security Score
  {
    id: "config-grader",
    tabLabel: "Config Grader",
    src: "/screenshots/config-grader.v8.png",
    alt: "PHP Config Grader and 1-Click Fixes",
    title: "Config Grader & Security Score",
    tagline: "Comprehensive A through F server grading with plain-English AI fix explanations.",
    badge: { icon: CheckCircle2, label: "Config Grader" },
    callout: {
      text: "A - F Scoreboard",
      subtext: "AI-assisted explanations for failing directives",
    },
    highlights: [
      { title: "Instant Scorecard", desc: "Evaluates 25+ PHP, MySQL, and server settings into a clean 0-100 health score." },
      { title: "1-Click Auto Fix", desc: "Safely adjusts memory limits, upload sizes, and timeout limits with one click." },
      { title: "Plain-English Guidance", desc: "Explains exactly why a setting failed and how to resolve it with your hosting provider." },
    ],
  },
];

export default function Screenshots() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [imgErrorMap, setImgErrorMap] = useState<Record<string, boolean>>({});

  const activeShot = shots[selectedIdx];
  const BadgeIcon = activeShot.badge.icon;

  const handleImageError = (id: string) => {
    setImgErrorMap((prev) => ({ ...prev, [id]: true }));
  };

  const openLightbox = (index: number) => setLightboxIdx(index);
  const closeLightbox = () => setLightboxIdx(null);

  const prevLightbox = useCallback(() => {
    setLightboxIdx((curr) => (curr !== null ? (curr === 0 ? shots.length - 1 : curr - 1) : null));
  }, []);

  const nextLightbox = useCallback(() => {
    setLightboxIdx((curr) => (curr !== null ? (curr === shots.length - 1 ? 0 : curr + 1) : null));
  }, []);

  // Lightbox keyboard controls
  useEffect(() => {
    if (lightboxIdx === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevLightbox();
      if (e.key === "ArrowRight") nextLightbox();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxIdx, prevLightbox, nextLightbox]);

  return (
    <motion.div
      id="screenshots"
      className="flex w-full max-w-5xl flex-col items-center gap-2 pt-16 md:pt-24 scroll-mt-24"
      variants={containerVariants}
      initial="hidden"
      animate="visible">

      <motion.div variants={itemVariants}>
        <TextBlur
          className="text-center text-2xl font-medium tracking-tight text-zinc-800 md:text-3xl"
          text="The exact operations suite you'll run."
        />
      </motion.div>
      <motion.div variants={itemVariants}>
        <TextBlur
          className="mx-auto max-w-[34rem] text-center text-base text-zinc-700 sm:text-lg"
          text="From live server telemetry and pre-update guards to client-ready PDF audits - built directly into WordPress."
          duration={0.8}
        />
      </motion.div>

      {/* Segmented Interactive Tab Navigation */}
      <motion.div
        variants={itemVariants}
        className="mt-6 w-full max-w-5xl">
        <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-1.5 p-1.5 rounded-xl border border-zinc-200/80 bg-zinc-100/70 backdrop-blur-sm shadow-2xs">
          {shots.map((shot, idx) => {
            const Icon = shot.badge.icon;
            const isSelected = selectedIdx === idx;
            return (
              <button
                key={shot.id}
                onClick={() => setSelectedIdx(idx)}
                className={`relative flex items-center gap-1.5 rounded-xl px-2.5 sm:px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${
                  isSelected
                    ? "text-violet-900 shadow-xs"
                    : "text-zinc-600 hover:text-zinc-900 hover:bg-white/60"
                }`}>
                {isSelected && (
                  <motion.div
                    layoutId="activeTabBadge"
                    className="absolute inset-0 rounded-xl bg-white border border-violet-200/90 shadow-sm"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <Icon className={`h-3.5 w-3.5 ${isSelected ? "text-violet-600" : "text-zinc-500"}`} />
                  <span>{shot.tabLabel}</span>
                </span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Primary Cinematic Showcase Stage */}
      <motion.div
        variants={itemVariants}
        className="relative mt-5 w-full">
        {/* Soft Ambient Violet Glow Behind Window */}
        <div className="absolute -inset-3 rounded-2xl bg-gradient-to-r from-violet-400/20 via-purple-400/15 to-indigo-400/20 blur-2xl opacity-70 pointer-events-none" />

        {/* macOS Style Window Frame */}
        <div className="relative overflow-hidden rounded-xl border border-zinc-200/90 bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.12),0_0_30px_-8px_rgba(167,139,250,0.25)] transition-all">
          {/* Window Header Bar */}
          <div className="flex items-center justify-between border-b border-zinc-200/80 bg-zinc-50/90 px-4 py-3">
            {/* 3 macOS Traffic Light Dots */}
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/50" />
              <span className="h-3 w-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/50" />
              <span className="h-3 w-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/50" />
            </div>

            {/* URL / Window Title Bar */}
            <div className="hidden sm:flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-1 text-xs font-medium text-zinc-600 shadow-2xs">
              <BadgeIcon className="h-3.5 w-3.5 text-violet-600" />
              <span className="font-mono text-[11px] text-zinc-500">wp-admin/admin.php?page=phpinfo-wp</span>
              <span className="text-zinc-300">·</span>
              <span className="font-semibold text-zinc-800">{activeShot.title}</span>
            </div>

            {/* Inspect / Zoom Button */}
            <button
              onClick={() => openLightbox(selectedIdx)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-violet-200 bg-violet-50/80 px-2.5 py-1 text-xs font-semibold text-violet-700 transition hover:bg-violet-100">
              <ZoomIn className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Zoom Screen</span>
            </button>
          </div>

          {/* Screenshot Viewport Area */}
          <div
            onClick={() => openLightbox(selectedIdx)}
            className="group relative aspect-[16/10] w-full cursor-pointer overflow-hidden bg-zinc-950">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeShot.id}
                initial={{ opacity: 0, scale: 0.99 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.01 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="relative h-full w-full">
                {!imgErrorMap[activeShot.id] ? (
                  <img
                    src={activeShot.src}
                    alt={activeShot.alt}
                    onError={() => handleImageError(activeShot.id)}
                    className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.015]"
                  />
                ) : (
                  /* Fallback Placeholder */
                  <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-12 text-center text-zinc-400 bg-gradient-to-b from-zinc-900 to-zinc-950">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-violet-400 shadow-inner">
                      <BadgeIcon className="h-7 w-7" />
                    </div>
                    <p className="text-base font-semibold text-zinc-200">{activeShot.title}</p>
                    <p className="text-xs text-zinc-500">Save screenshot to {activeShot.src} to render live</p>
                  </div>
                )}

                {/* Floating Contextual Feature Chip */}
                <div className="absolute top-4 left-4 pointer-events-none hidden sm:flex items-center gap-2 rounded-xl bg-black/75 backdrop-blur-md border border-white/20 p-2.5 shadow-2xl text-left">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-violet-600/30 border border-violet-400/40 text-violet-300">
                    <Sparkles className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white leading-none">
                      {activeShot.callout.text}
                    </p>
                    {activeShot.callout.subtext && (
                      <p className="text-[10px] text-zinc-400 leading-none mt-1">
                        {activeShot.callout.subtext}
                      </p>
                    )}
                  </div>
                </div>

                {/* Hover Zoom Prompt */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 backdrop-blur-[1.5px] transition-opacity duration-200 group-hover:opacity-100">
                  <span className="inline-flex items-center gap-2 rounded-full bg-violet-500 px-5 py-2.5 text-sm font-semibold text-white shadow-xl transition-transform group-hover:scale-105 hover:bg-violet-600">
                    <ZoomIn className="h-4 w-4" />
                    <span>Click to Inspect Full Screen</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Stage Subtitle */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-zinc-200/80 bg-zinc-50/70 px-4 py-3 text-xs text-zinc-600">
            <span className="font-medium text-zinc-800">{activeShot.tagline}</span>
            <span className="text-zinc-500">Screen {selectedIdx + 1} of {shots.length} · Pro v8.0</span>
          </div>
        </div>
      </motion.div>

      {/* 3 Value Pillars for Active Screen */}
      <motion.div
        variants={itemVariants}
        className="mt-4 grid w-full grid-cols-1 sm:grid-cols-3 gap-3.5">
        {activeShot.highlights.map((h, i) => (
          <div
            key={i}
            className="flex flex-col rounded-xl border border-zinc-200/90 bg-white p-4 shadow-xs text-left transition hover:border-violet-300/60 hover:shadow-sm">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 flex items-center gap-1.5">
              <span className="flex h-2 w-2 rounded-full bg-violet-500" />
              {h.title}
            </h4>
            <p className="mt-1.5 text-xs text-zinc-600 leading-relaxed">
              {h.desc}
            </p>
          </div>
        ))}
      </motion.div>

      {/* Fullscreen Interactive Lightbox Modal */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <LightboxModal
            shot={shots[lightboxIdx]}
            currentIndex={lightboxIdx}
            totalCount={shots.length}
            onClose={closeLightbox}
            onPrev={prevLightbox}
            onNext={nextLightbox}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function LightboxModal({
  shot,
  currentIndex,
  totalCount,
  onClose,
  onPrev,
  onNext,
}: {
  shot: Shot;
  currentIndex: number;
  totalCount: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const [modalImgError, setModalImgError] = useState(false);
  const BadgeIcon = shot.badge.icon;

  useEffect(() => {
    setModalImgError(false);
  }, [shot.src]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/90 p-3 sm:p-6 backdrop-blur-md">

      {/* Top Bar with Title & Close Button */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="mb-3 flex w-full max-w-5xl items-center justify-between gap-4 px-2 text-white">
        <div className="flex items-center gap-2.5">
          <span className="flex items-center gap-1 rounded-md bg-violet-600/80 px-2 py-0.5 text-xs font-semibold">
            <BadgeIcon className="h-3.5 w-3.5" />
            {shot.badge.label}
          </span>
          <h3 className="text-sm sm:text-base font-semibold text-zinc-100 truncate">
            {shot.title}
          </h3>
          <span className="text-xs text-zinc-400">
            ({currentIndex + 1} of {totalCount})
          </span>
        </div>

        <button
          onClick={onClose}
          aria-label="Close lightbox"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-zinc-300 transition-colors hover:bg-white/20 hover:text-white">
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Center Image Stage with Next/Prev Buttons */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[75vh] w-full max-w-5xl items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 shadow-2xl">
        {!modalImgError ? (
          <img
            src={shot.src}
            alt={shot.alt}
            onError={() => setModalImgError(true)}
            className="max-h-[75vh] w-full object-contain"
          />
        ) : (
          <div className="flex flex-col items-center justify-center gap-3 p-16 text-center text-zinc-400">
            <ImageIcon className="h-12 w-12 text-zinc-600" />
            <p className="text-base font-semibold text-zinc-200">{shot.title}</p>
            <p className="text-xs text-zinc-500">Screenshot coming soon in Pro v8.0</p>
          </div>
        )}

        {/* Previous Navigation Button */}
        <button
          onClick={onPrev}
          aria-label="Previous screenshot"
          className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm border border-white/10 transition-all hover:bg-violet-600 hover:scale-105">
          <ChevronLeft className="h-6 w-6" />
        </button>

        {/* Next Navigation Button */}
        <button
          onClick={onNext}
          aria-label="Next screenshot"
          className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm border border-white/10 transition-all hover:bg-violet-600 hover:scale-105">
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Bottom Caption */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="mt-3 flex max-w-2xl text-center">
        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
          {shot.tagline}
        </p>
      </div>
    </motion.div>
  );
}
