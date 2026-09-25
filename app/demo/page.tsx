"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ExeebitBar from "@/components/exeebit-bar";
import { Button } from "@/components/ui/button";
import AnimatedArrow from "@/components/ui/animated-arrow";
import {
  Sparkles,
  Zap,
  ShieldAlert,
  ShieldCheck,
  Activity,
  FileText,
  Terminal,
  RefreshCw,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Server,
  Cpu,
  Database,
  Lock,
  ExternalLink,
  Laptop,
  Check,
  ChevronRight,
  Eye,
  Sliders,
  Flame,
} from "lucide-react";
import { SiWordpress } from "react-icons/si";

type DemoTab = "scanner" | "guard" | "telemetry" | "report";

export default function TryItLivePage() {
  const [activeTab, setActiveTab] = useState<DemoTab>("scanner");

  // Scanner state
  const [phpVersion, setPhpVersion] = useState("8.4");
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanCompleted, setScanCompleted] = useState(true);

  // Update Guard state
  const [guardStatus, setGuardStatus] = useState<"idle" | "running" | "safe" | "rolled-back">("safe");
  const [guardLog, setGuardLog] = useState<string[]>([
    "[02:14:02] Pre-flight AST scan: WooCommerce 9.4.0 verified safe.",
    "[02:14:03] Staging isolated loopback request: HTTP 200 OK (112ms).",
    "[02:14:05] Automated 60s health diagnostic: Zero PHP Fatal Errors.",
    "[02:14:05] Update verified 100% stable. Zero downtime recorded.",
  ]);

  // Telemetry state
  const [troubleshootingActive, setTroubleshootingActive] = useState(false);
  const [activeSnippets, setActiveSnippets] = useState({
    gzip: true,
    cache: true,
    headers: true,
  });

  // Report state
  const [agencyName, setAgencyName] = useState("Apex Digital Agency");
  const [clientSite, setClientSite] = useState("store.acme-client.com");

  const runScannerDemo = () => {
    setIsScanning(true);
    setScanProgress(0);
    setScanCompleted(false);

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          setScanCompleted(true);
          return 100;
        }
        return prev + 25;
      });
    }, 250);
  };

  const simulateUpdateGuard = (type: "safe" | "crash") => {
    setGuardStatus("running");
    setGuardLog([`[Just now] Initializing Update Guard pre-flight check for ${type === "safe" ? "WooCommerce 9.4" : "Legacy Abandoned Plugin"}...`]);

    setTimeout(() => {
      if (type === "safe") {
        setGuardStatus("safe");
        setGuardLog([
          "[00:01] Pre-flight AST scan: Compatible with current PHP 8.3 & WP 6.7.",
          "[00:02] Executed atomic update in isolated staging memory.",
          "[00:03] 60-second live loopback diagnostic: 0 fatal errors, 0 warnings.",
          "[00:04] Site verified healthy. 0.00s customer downtime.",
        ]);
      } else {
        setGuardStatus("rolled-back");
        setGuardLog([
          "[00:01] Pre-flight scan detected legacy function create_function() removed in PHP 8.x!",
          "[00:02] Test loopback failed with simulated Fatal Error (500).",
          "[00:03] AUTOMATIC SAFETY TRIGGERED: Restoring plugin files to pre-update snapshot...",
          "[00:04] Rollback completed in 320ms. Site is healthy. Visitors never saw a crash!",
        ]);
      }
    }, 1200);
  };

  return (
    <main className="flex min-h-screen flex-col items-center overflow-x-clip pt-24 sm:pt-28 lg:pt-36 bg-zinc-50/60 dark:bg-zinc-950">
      <div className="fixed left-0 right-0 top-0 z-[60]">
        <ExeebitBar />
        <Header />
      </div>

      {/* Hero Section */}
      <section className="w-full max-w-6xl px-4 sm:px-6 lg:px-8 pt-4 pb-8 sm:pb-12 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-emerald-50 px-3.5 py-1 text-xs font-semibold text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 mb-4 shadow-xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Interactive Live Sandbox &bull; No Installation Required
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-normal text-zinc-900 dark:text-zinc-100 max-w-4xl mx-auto leading-snug sm:leading-tight">
          Experience <span className="text-violet-600">phpinfo() WP</span> Live in Your Browser
        </h1>

        <p className="mt-3.5 text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
          Test real-time PHP 8.4 upgrade delta scanning, test-fire our Update Guard crash rollback simulator, and inspect live server telemetry before installing on your sites.
        </p>

        {/* Quick Action Badges */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
          <div className="flex items-center gap-1.5 rounded-lg border border-zinc-200/80 bg-white px-3 py-1.5 shadow-2xs dark:border-zinc-800 dark:bg-zinc-900">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <span>Zero Server Setup</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-lg border border-zinc-200/80 bg-white px-3 py-1.5 shadow-2xs dark:border-zinc-800 dark:bg-zinc-900">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <span>Real Logic Simulation</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-lg border border-zinc-200/80 bg-white px-3 py-1.5 shadow-2xs dark:border-zinc-800 dark:bg-zinc-900">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <span>Full Pro v8.0 Capabilities</span>
          </div>
        </div>
      </section>

      {/* Interactive Sandbox Window */}
      <section className="w-full max-w-6xl px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
        <div className="rounded-2xl border border-zinc-200/80 bg-white shadow-xl overflow-hidden dark:border-zinc-800 dark:bg-zinc-900">
          {/* Simulated Mac / Browser Window Chrome */}
          <div className="flex items-center justify-between border-b border-zinc-200 bg-zinc-100/80 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-400/80 inline-block"></span>
              <span className="h-3 w-3 rounded-full bg-amber-400/80 inline-block"></span>
              <span className="h-3 w-3 rounded-full bg-emerald-400/80 inline-block"></span>
              <span className="ml-2 text-xs font-medium text-zinc-500 hidden sm:inline">
                wp-admin &gt; phpinfo() WP &gt; Interactive Cockpit
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-md bg-violet-100 px-2.5 py-0.5 text-xs font-semibold text-violet-700 dark:bg-violet-950/50 dark:text-violet-300">
                <Sparkles className="h-3 w-3" /> Pro Sandbox
              </span>
              <Link href="/pricing">
                <Button size="sm" className="h-7 text-xs bg-violet-600 hover:bg-violet-700 text-white rounded-lg">
                  Get Pro
                </Button>
              </Link>
            </div>
          </div>

          {/* Tab Selector */}
          <div className="flex border-b border-zinc-200 bg-zinc-50/50 px-3 pt-2 gap-1 overflow-x-auto dark:border-zinc-800 dark:bg-zinc-950/30">
            <button
              onClick={() => setActiveTab("scanner")}
              className={`flex items-center gap-2 px-3.5 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
                activeTab === "scanner"
                  ? "border-violet-600 text-violet-700 bg-white dark:bg-zinc-900 dark:text-violet-400"
                  : "border-transparent text-zinc-600 hover:text-zinc-900 dark:text-zinc-400"
              }`}>
              <Cpu className="h-4 w-4" />
              <span>1. Smart PHP 8.4 Upgrade Scanner</span>
            </button>

            <button
              onClick={() => setActiveTab("guard")}
              className={`flex items-center gap-2 px-3.5 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
                activeTab === "guard"
                  ? "border-violet-600 text-violet-700 bg-white dark:bg-zinc-900 dark:text-violet-400"
                  : "border-transparent text-zinc-600 hover:text-zinc-900 dark:text-zinc-400"
              }`}>
              <ShieldAlert className="h-4 w-4" />
              <span>2. Update Guard &amp; Rollback Simulator</span>
            </button>

            <button
              onClick={() => setActiveTab("telemetry")}
              className={`flex items-center gap-2 px-3.5 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
                activeTab === "telemetry"
                  ? "border-violet-600 text-violet-700 bg-white dark:bg-zinc-900 dark:text-violet-400"
                  : "border-transparent text-zinc-600 hover:text-zinc-900 dark:text-zinc-400"
              }`}>
              <Activity className="h-4 w-4" />
              <span>3. Server Telemetry &amp; OPcache</span>
            </button>

            <button
              onClick={() => setActiveTab("report")}
              className={`flex items-center gap-2 px-3.5 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
                activeTab === "report"
                  ? "border-violet-600 text-violet-700 bg-white dark:bg-zinc-900 dark:text-violet-400"
                  : "border-transparent text-zinc-600 hover:text-zinc-900 dark:text-zinc-400"
              }`}>
              <FileText className="h-4 w-4" />
              <span>4. White-Label Client PDF Studio</span>
            </button>
          </div>

          {/* Tab 1: PHP Upgrade Scanner */}
          {activeTab === "scanner" && (
            <div className="p-4 sm:p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800">
                <div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                    <span>Smart PHP Compatibility Engine (Zero False Alarms)</span>
                    <span className="rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-xs px-2 py-0.5">
                      Delta Scanning
                    </span>
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-500 mt-1">
                    Unlike outdated scanners that trigger 400+ false alarms on polyfills in vendor folders, phpinfo() WP only flags real fatal breaks on active code paths.
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Target PHP:</span>
                    <select
                      value={phpVersion}
                      onChange={(e) => setPhpVersion(e.target.value)}
                      className="rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-sm font-medium text-zinc-800 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
                      <option value="8.2">PHP 8.2</option>
                      <option value="8.3">PHP 8.3</option>
                      <option value="8.4">PHP 8.4 (Latest)</option>
                    </select>
                  </div>

                  <Button
                    onClick={runScannerDemo}
                    disabled={isScanning}
                    className="h-9 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 shadow-sm">
                    {isScanning ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        <span>Scanning ({scanProgress}%)...</span>
                      </>
                    ) : (
                      <>
                        <Play className="h-3.5 w-3.5" />
                        <span>Run Test Scan</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Scan Results Grid */}
              <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                  <div className="rounded-xl border border-zinc-200 bg-zinc-50/50 p-4 dark:border-zinc-800 dark:bg-zinc-950/40">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">Scan Verdict for PHP {phpVersion}</span>
                      <span className="rounded-full bg-emerald-500/10 text-emerald-600 px-2.5 py-0.5 text-xs font-bold flex items-center gap-1">
                        <CheckCircle2 className="h-3.5 w-3.5" /> 98.4% Upgrade Ready
                      </span>
                    </div>

                    <div className="mt-3 grid grid-cols-3 gap-3 text-center">
                      <div className="rounded-lg bg-white p-2.5 shadow-2xs border border-zinc-200/60 dark:bg-zinc-900 dark:border-zinc-800">
                        <div className="text-xl font-black text-zinc-900 dark:text-zinc-100">42</div>
                        <div className="text-[11px] text-zinc-500">Plugins &amp; Themes</div>
                      </div>
                      <div className="rounded-lg bg-white p-2.5 shadow-2xs border border-zinc-200/60 dark:bg-zinc-900 dark:border-zinc-800">
                        <div className="text-xl font-black text-emerald-600">0</div>
                        <div className="text-[11px] text-zinc-500">Breaking Fatalities</div>
                      </div>
                      <div className="rounded-lg bg-white p-2.5 shadow-2xs border border-zinc-200/60 dark:bg-zinc-900 dark:border-zinc-800">
                        <div className="text-xl font-black text-amber-600">2</div>
                        <div className="text-[11px] text-zinc-500">Deprecations (Non-fatal)</div>
                      </div>
                    </div>
                  </div>

                  {/* Scanned Items Sample List */}
                  <div className="rounded-xl border border-zinc-200 overflow-hidden dark:border-zinc-800">
                    <div className="bg-zinc-100/70 px-4 py-2 text-xs font-bold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                      Component Compatibility Breakdown
                    </div>
                    <div className="divide-y divide-zinc-200 dark:divide-zinc-800 text-xs">
                      <div className="flex items-center justify-between p-3 bg-white dark:bg-zinc-900">
                        <div className="flex items-center gap-2">
                          <SiWordpress className="h-4 w-4 text-violet-600" />
                          <span className="font-semibold text-zinc-800 dark:text-zinc-200">WordPress Core 6.7</span>
                        </div>
                        <span className="text-emerald-600 font-semibold flex items-center gap-1">
                          <Check className="h-3.5 w-3.5" /> Fully Compatible with PHP {phpVersion}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white dark:bg-zinc-900">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-zinc-800 dark:text-zinc-200">WooCommerce 9.4.0</span>
                        </div>
                        <span className="text-emerald-600 font-semibold flex items-center gap-1">
                          <Check className="h-3.5 w-3.5" /> 100% Validated
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white dark:bg-zinc-900">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-zinc-800 dark:text-zinc-200">Custom Child Theme (functions.php)</span>
                        </div>
                        <span className="text-amber-600 font-medium flex items-center gap-1">
                          <AlertTriangle className="h-3.5 w-3.5" /> Deprecated: Implicit null parameter on L42
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Auto-Fix Sidebar */}
                <div className="rounded-xl border border-violet-200 bg-violet-50/50 p-4 dark:border-violet-900/50 dark:bg-violet-950/20">
                  <div className="flex items-center gap-2 text-violet-700 dark:text-violet-300 font-bold text-sm">
                    <Sparkles className="h-4 w-4" />
                    <span>Native AI Fix Recipe</span>
                  </div>
                  <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    phpinfo() WP generates instant 1-click diffs for any detected deprecations before you upgrade your hosting PHP version.
                  </p>

                  <div className="mt-3 rounded-lg bg-zinc-900 p-3 font-mono text-[11px] text-zinc-200 overflow-x-auto">
                    <div className="text-red-400">- function render($tag = null)</div>
                    <div className="text-emerald-400">+ function render(?string $tag = null)</div>
                  </div>

                  <div className="mt-4">
                    <Button size="sm" className="w-full bg-violet-600 hover:bg-violet-700 text-white rounded-lg text-xs font-semibold">
                      Auto-apply Safe Patch
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Update Guard Simulator */}
          {activeTab === "guard" && (
            <div className="p-4 sm:p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800">
                <div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                    <span>Update Guard Pre-Flight &amp; 60s Loopback Diagnostic</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-500 mt-1">
                    Never fear clicking &quot;Update Plugin&quot; again. Watch how Update Guard automatically detects breaking bugs and safely rolls back in milliseconds.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    onClick={() => simulateUpdateGuard("safe")}
                    variant="outline"
                    className="h-9 text-xs sm:text-sm border-zinc-300 rounded-xl">
                    Simulate Normal Update
                  </Button>
                  <Button
                    onClick={() => simulateUpdateGuard("crash")}
                    className="h-9 bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm rounded-xl font-semibold">
                    Simulate Fatal Crash &amp; Rollback
                  </Button>
                </div>
              </div>

              {/* Status Display */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">Live Terminal Activity Stream</h4>
                  <div className="rounded-xl bg-zinc-950 p-4 font-mono text-xs text-zinc-300 min-h-[190px] flex flex-col justify-between border border-zinc-800">
                    <div className="space-y-1.5">
                      {guardLog.map((log, idx) => (
                        <div
                          key={idx}
                          className={`${
                            log.includes("AUTOMATIC SAFETY") || log.includes("failed")
                              ? "text-red-400 font-bold"
                              : log.includes("Rollback completed")
                              ? "text-amber-400 font-bold"
                              : log.includes("verified") || log.includes("100%")
                              ? "text-emerald-400"
                              : "text-zinc-400"
                          }`}>
                          {log}
                        </div>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-500">
                      <span>Status: {guardStatus.toUpperCase()}</span>
                      <span>Target: Isolated Process Memory</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-xl border border-zinc-200 bg-zinc-50/60 p-4 dark:border-zinc-800 dark:bg-zinc-900/40">
                    <h4 className="text-sm font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-emerald-600" />
                      <span>Why Update Guard is 100x Safer than Standard WP</span>
                    </h4>
                    <ul className="mt-3 space-y-2 text-xs text-zinc-600 dark:text-zinc-400">
                      <li className="flex items-start gap-2">
                        <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>Pre-checks PHP floor requirements before replacing code</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>Parses changelog keywords for &quot;breaking change&quot;, &quot;renamed hook&quot;, &quot;deprecated API&quot;</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>Triggers non-blocking 60-second loopback health check immediately post-update</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>Automatic atomic rollback: zero blank white screen of death</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-3.5 rounded-xl bg-violet-50 border border-violet-200 dark:bg-violet-950/30 dark:border-violet-900 text-xs text-violet-800 dark:text-violet-300">
                    <strong>Real agency tip:</strong> Enable Auto-Updates safely on client retainers with Update Guard standing by to protect revenue.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Server Telemetry */}
          {activeTab === "telemetry" && (
            <div className="p-4 sm:p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800">
                <div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                    <span>Live Server Intelligence &amp; OPcache Telemetry</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-500 mt-1">
                    Direct in-admin monitoring. Uncover hidden memory bottlenecks, autoload bloat, and server snippets without editing raw nginx / .htaccess files.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => setTroubleshootingActive(!troubleshootingActive)}
                    className={`h-9 text-xs sm:text-sm font-semibold rounded-xl ${
                      troubleshootingActive
                        ? "bg-amber-600 hover:bg-amber-700 text-white"
                        : "bg-zinc-800 hover:bg-zinc-900 text-white"
                    }`}>
                    {troubleshootingActive ? "Exit Troubleshooting Mode" : "Test Isolated Troubleshooting Mode"}
                  </Button>
                </div>
              </div>

              {troubleshootingActive && (
                <div className="mt-4 rounded-xl border border-amber-300 bg-amber-50 p-3 text-xs text-amber-900 flex items-center justify-between dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-200">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
                    <span>
                      <strong>Troubleshooting Mode Active:</strong> Running default theme and vanilla plugin state ONLY for your logged-in session. Live visitors see your normal site.
                    </span>
                  </div>
                  <span className="font-semibold text-amber-700 underline cursor-pointer" onClick={() => setTroubleshootingActive(false)}>
                    End Session
                  </span>
                </div>
              )}

              {/* Real-Time Gauges */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-2xs dark:border-zinc-800 dark:bg-zinc-900">
                  <div className="text-xs font-semibold text-zinc-500 flex items-center justify-between">
                    <span>PHP Memory Usage</span>
                    <span className="text-emerald-600 font-bold">Safe</span>
                  </div>
                  <div className="mt-2 text-2xl font-black text-zinc-900 dark:text-zinc-100">114 MB <span className="text-xs font-normal text-zinc-500">/ 512M</span></div>
                  <div className="mt-2 w-full bg-zinc-100 rounded-full h-2 dark:bg-zinc-800 overflow-hidden">
                    <div className="bg-emerald-500 h-2 rounded-full" style={{ width: "22%" }}></div>
                  </div>
                  <span className="mt-1 text-[11px] text-zinc-400 block">22% consumed</span>
                </div>

                <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-2xs dark:border-zinc-800 dark:bg-zinc-900">
                  <div className="text-xs font-semibold text-zinc-500 flex items-center justify-between">
                    <span>OPcache Hit Rate</span>
                    <span className="text-emerald-600 font-bold">96.4%</span>
                  </div>
                  <div className="mt-2 text-2xl font-black text-zinc-900 dark:text-zinc-100">12,410 <span className="text-xs font-normal text-zinc-500">files</span></div>
                  <div className="mt-2 w-full bg-zinc-100 rounded-full h-2 dark:bg-zinc-800 overflow-hidden">
                    <div className="bg-violet-600 h-2 rounded-full" style={{ width: "96%" }}></div>
                  </div>
                  <span className="mt-1 text-[11px] text-zinc-400 block">0 restarts in 14 days</span>
                </div>

                <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-2xs dark:border-zinc-800 dark:bg-zinc-900">
                  <div className="text-xs font-semibold text-zinc-500 flex items-center justify-between">
                    <span>Autoload Bloat</span>
                    <span className="text-emerald-600 font-bold">142 KB</span>
                  </div>
                  <div className="mt-2 text-2xl font-black text-zinc-900 dark:text-zinc-100">Grade A <span className="text-xs font-normal text-zinc-500">(Fast TTFB)</span></div>
                  <div className="mt-2 w-full bg-zinc-100 rounded-full h-2 dark:bg-zinc-800 overflow-hidden">
                    <div className="bg-emerald-500 h-2 rounded-full" style={{ width: "15%" }}></div>
                  </div>
                  <span className="mt-1 text-[11px] text-zinc-400 block">Target &lt; 800 KB</span>
                </div>

                <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-2xs dark:border-zinc-800 dark:bg-zinc-900">
                  <div className="text-xs font-semibold text-zinc-500 flex items-center justify-between">
                    <span>WP-Cron Queue</span>
                    <span className="text-emerald-600 font-bold">Active</span>
                  </div>
                  <div className="mt-2 text-2xl font-black text-zinc-900 dark:text-zinc-100">0 Stuck <span className="text-xs font-normal text-zinc-500">jobs</span></div>
                  <div className="mt-2 w-full bg-zinc-100 rounded-full h-2 dark:bg-zinc-800 overflow-hidden">
                    <div className="bg-emerald-500 h-2 rounded-full" style={{ width: "100%" }}></div>
                  </div>
                  <span className="mt-1 text-[11px] text-zinc-400 block">Next job runs in 42s</span>
                </div>
              </div>

              {/* 1-Click Server Snippets Toggles */}
              <div className="mt-6 rounded-xl border border-zinc-200 p-4 bg-zinc-50/50 dark:border-zinc-800 dark:bg-zinc-950/40">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-300">
                    Live Web Server Snippet Injector (Apache &bull; Nginx &bull; LiteSpeed)
                  </span>
                  <span className="text-xs text-zinc-500">Built-in rollback safety</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div
                    onClick={() => setActiveSnippets({ ...activeSnippets, gzip: !activeSnippets.gzip })}
                    className={`cursor-pointer rounded-lg border p-3 flex items-center justify-between transition-all ${
                      activeSnippets.gzip
                        ? "border-emerald-300 bg-emerald-50/60 dark:border-emerald-900 dark:bg-emerald-950/30"
                        : "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 opacity-60"
                    }`}>
                    <div>
                      <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100">Brotli / Gzip Compression</div>
                      <div className="text-[11px] text-zinc-500">Saves 68% payload size</div>
                    </div>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${activeSnippets.gzip ? "bg-emerald-500 text-white" : "bg-zinc-200 text-zinc-600"}`}>
                      {activeSnippets.gzip ? "Active" : "Off"}
                    </span>
                  </div>

                  <div
                    onClick={() => setActiveSnippets({ ...activeSnippets, cache: !activeSnippets.cache })}
                    className={`cursor-pointer rounded-lg border p-3 flex items-center justify-between transition-all ${
                      activeSnippets.cache
                        ? "border-emerald-300 bg-emerald-50/60 dark:border-emerald-900 dark:bg-emerald-950/30"
                        : "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 opacity-60"
                    }`}>
                    <div>
                      <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100">Browser Cache (Expires 1y)</div>
                      <div className="text-[11px] text-zinc-500">Caches static assets</div>
                    </div>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${activeSnippets.cache ? "bg-emerald-500 text-white" : "bg-zinc-200 text-zinc-600"}`}>
                      {activeSnippets.cache ? "Active" : "Off"}
                    </span>
                  </div>

                  <div
                    onClick={() => setActiveSnippets({ ...activeSnippets, headers: !activeSnippets.headers })}
                    className={`cursor-pointer rounded-lg border p-3 flex items-center justify-between transition-all ${
                      activeSnippets.headers
                        ? "border-emerald-300 bg-emerald-50/60 dark:border-emerald-900 dark:bg-emerald-950/30"
                        : "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 opacity-60"
                    }`}>
                    <div>
                      <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100">Security Headers (CSP/HSTS)</div>
                      <div className="text-[11px] text-zinc-500">Grade A security audit</div>
                    </div>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${activeSnippets.headers ? "bg-emerald-500 text-white" : "bg-zinc-200 text-zinc-600"}`}>
                      {activeSnippets.headers ? "Active" : "Off"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: White-Label PDF Studio */}
          {activeTab === "report" && (
            <div className="p-4 sm:p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800">
                <div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                    <span>Agency White-Label Audit PDF Studio</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-500 mt-1">
                    Turn technical server audits into premium client retainer deliverables with your own logo, branding, and executive summary.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Link href="/pricing">
                    <Button size="sm" className="h-9 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-xs sm:text-sm font-semibold">
                      Unlock Unlimited PDF Reports
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Form Controls */}
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Your Agency Name</label>
                    <input
                      type="text"
                      value={agencyName}
                      onChange={(e) => setAgencyName(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-800 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Client Domain</label>
                    <input
                      type="text"
                      value={clientSite}
                      onChange={(e) => setClientSite(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-800 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
                    />
                  </div>

                  <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/40 text-xs text-zinc-600 dark:text-zinc-400 space-y-2">
                    <p className="font-semibold text-zinc-800 dark:text-zinc-200">Included in the White-Label PDF:</p>
                    <div className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-emerald-500" /> Overall Server Health Grade (A+)</div>
                    <div className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-emerald-500" /> PHP Version EOL Status &amp; Roadmap</div>
                    <div className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-emerald-500" /> Security Headers &amp; SSL Certificate Check</div>
                    <div className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-emerald-500" /> Autoload &amp; Database Health Grade</div>
                    <div className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-emerald-500" /> Zero phpinfo() WP or Exeebit branding</div>
                  </div>
                </div>

                {/* Live PDF Mock Preview */}
                <div className="lg:col-span-2 rounded-xl border border-zinc-300 bg-white p-6 shadow-md dark:border-zinc-700 dark:bg-zinc-950 font-sans">
                  {/* PDF Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800">
                    <div>
                      <div className="text-lg font-black text-violet-700 dark:text-violet-400">{agencyName}</div>
                      <div className="text-xs text-zinc-500">WordPress Infrastructure &amp; Security Audit</div>
                    </div>
                    <div className="text-right">
                      <span className="inline-block rounded-md bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-mono font-bold text-xs px-2.5 py-1">
                        HEALTH SCORE: 98/100 (GRADE A)
                      </span>
                      <div className="text-[10px] text-zinc-400 mt-1">Generated: {new Date().toLocaleDateString()}</div>
                    </div>
                  </div>

                  {/* PDF Meta */}
                  <div className="mt-4 p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900 text-xs flex justify-between text-zinc-600 dark:text-zinc-400">
                    <div>Client: <strong className="text-zinc-800 dark:text-zinc-200">{clientSite}</strong></div>
                    <div>Environment: <strong className="text-zinc-800 dark:text-zinc-200">Production (LiteSpeed / PHP 8.3)</strong></div>
                  </div>

                  {/* Summary Checklist */}
                  <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                    <div className="rounded-lg border border-zinc-200 p-2.5 dark:border-zinc-800">
                      <div className="font-semibold text-zinc-800 dark:text-zinc-200">PHP 8.4 Readiness</div>
                      <div className="text-emerald-600 font-medium">Passed: 0 fatal syntax errors</div>
                    </div>
                    <div className="rounded-lg border border-zinc-200 p-2.5 dark:border-zinc-800">
                      <div className="font-semibold text-zinc-800 dark:text-zinc-200">Update Guard Status</div>
                      <div className="text-emerald-600 font-medium">Protected: Atomic Rollbacks Armed</div>
                    </div>
                    <div className="rounded-lg border border-zinc-200 p-2.5 dark:border-zinc-800">
                      <div className="font-semibold text-zinc-800 dark:text-zinc-200">Security Directives</div>
                      <div className="text-emerald-600 font-medium">Hardened: display_errors OFF</div>
                    </div>
                    <div className="rounded-lg border border-zinc-200 p-2.5 dark:border-zinc-800">
                      <div className="font-semibold text-zinc-800 dark:text-zinc-200">Database Autoload</div>
                      <div className="text-emerald-600 font-medium">Optimal: 142 KB (Under 800 KB)</div>
                    </div>
                  </div>

                  <div className="mt-6 text-center">
                    <Link href="/pricing">
                      <Button size="sm" className="bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-xs font-semibold px-4">
                        Unlock Real Branded PDF Generator in Pro &rarr;
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom CTA Block */}
        <div className="mt-12 rounded-2xl bg-gradient-to-br from-violet-600 via-violet-700 to-purple-800 p-8 sm:p-12 text-white text-center shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Ready to bring this level of intelligence to your WordPress sites?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-violet-100 max-w-xl mx-auto">
            Install the free version from WordPress.org, or unlock the full Pro v8.0 suite with a 14-day money-back guarantee.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link href="/pricing">
              <Button size="lg" className="rounded-xl bg-white text-violet-700 hover:bg-zinc-100 font-semibold px-6 shadow-md">
                <span>View Plans &amp; Pricing</span>
                <AnimatedArrow className="ml-2" />
              </Button>
            </Link>
            <Link href="https://wordpress.org/plugins//" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="ghost" className="rounded-xl text-white hover:bg-white/10 font-semibold px-5 border border-white/20">
                <SiWordpress className="mr-2 h-4 w-4" />
                <span>Download Free Version</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
