"use client";

import { useState } from "react";
import { 
  ShieldAlert, 
  ShieldCheck, 
  Wrench, 
  Play, 
  Terminal, 
  AlertOctagon, 
  CheckCircle2, 
  Sparkles, 
  Code2, 
  FileCode, 
  Flame,
  ArrowRight,
  Eye,
  Lock
} from "lucide-react";

export default function TelemetryDemo() {
  const [activeTab, setActiveTab] = useState<"perms" | "update_guard" | "safemode" | "ide">("perms");
  const [permsFixed, setPermsFixed] = useState(false);
  const [fixing, setFixing] = useState(false);
  const [safeModeActive, setSafeModeActive] = useState(false);

  const handleAutoFix = () => {
    setFixing(true);
    setTimeout(() => {
      setFixing(false);
      setPermsFixed(true);
    }, 700);
  };

  return (
    <section id="demo" className="py-24 relative bg-slate-950/60 border-y border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-xs font-semibold text-violet-400 mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Interactive Simulator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Test Real Diagnostic Workflows In Your Browser
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Experience how phpinfo() WP turns complex server commands into one-click safe actions.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 rounded-2xl glass-panel border border-white/10 overflow-x-auto max-w-full">
            <button
              onClick={() => setActiveTab("perms")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === "perms"
                  ? "bg-violet-600 text-white shadow-lg shadow-violet-600/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <ShieldCheck className="h-4 w-4" />
              <span>1-Click Permissions Hardener</span>
            </button>
            <button
              onClick={() => setActiveTab("update_guard")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === "update_guard"
                  ? "bg-violet-600 text-white shadow-lg shadow-violet-600/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Flame className="h-4 w-4 text-amber-400" />
              <span>Update Guard Scanner</span>
            </button>
            <button
              onClick={() => setActiveTab("safemode")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === "safemode"
                  ? "bg-violet-600 text-white shadow-lg shadow-violet-600/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Lock className="h-4 w-4 text-emerald-400" />
              <span>Safe Mode Sandbox</span>
            </button>
            <button
              onClick={() => setActiveTab("ide")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === "ide"
                  ? "bg-violet-600 text-white shadow-lg shadow-violet-600/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Code2 className="h-4 w-4 text-indigo-400" />
              <span>Config IDE & Rollback</span>
            </button>
          </div>
        </div>

        {/* Tab Showcase Card */}
        <div className="max-w-4xl mx-auto glass-panel rounded-2xl border border-white/10 p-6 sm:p-8 bg-slate-900/60 shadow-2xl">
          
          {/* TAB 1: 1-Click Permissions Auto-Fix */}
          {activeTab === "perms" && (
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-6">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <span>File & Directory Permissions Audit</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-violet-500/20 text-violet-300 border border-violet-500/30">
                      Pro Feature
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Detects dangerously loose permissions (0777, 0666) and hardens files directly via PHP.
                  </p>
                </div>
                <button
                  onClick={handleAutoFix}
                  disabled={fixing || permsFixed}
                  className={`px-4 py-2.5 rounded-xl font-semibold text-xs flex items-center gap-2 transition-all ${
                    permsFixed
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 cursor-default"
                      : "bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-lg shadow-violet-600/25"
                  }`}
                >
                  <Wrench className={`h-4 w-4 ${fixing ? "animate-spin" : ""}`} />
                  <span>{fixing ? "Hardening Permissions..." : permsFixed ? "✓ All Hardened (Protected)" : "Run 1-Click Auto-Fix"}</span>
                </button>
              </div>

              {/* Items List */}
              <div className="space-y-3 font-mono text-xs">
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileCode className="h-4 w-4 text-slate-400" />
                    <div>
                      <span className="text-white font-semibold">wp-config.php</span>
                      <span className="block text-[11px] text-slate-500 font-sans">Database credentials, salts & security keys</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 rounded font-bold ${
                      permsFixed ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30" : "bg-rose-500/15 text-rose-400 border border-rose-500/30"
                    }`}>
                      {permsFixed ? "0600 (Secure)" : "0666 (Insecure)"}
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileCode className="h-4 w-4 text-slate-400" />
                    <div>
                      <span className="text-white font-semibold">wp-content/uploads</span>
                      <span className="block text-[11px] text-slate-500 font-sans">User uploaded media & attachment directory</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 rounded font-bold ${
                      permsFixed ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30" : "bg-rose-500/15 text-rose-400 border border-rose-500/30"
                    }`}>
                      {permsFixed ? "0755 (Optimal)" : "0777 (World Writable)"}
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileCode className="h-4 w-4 text-slate-400" />
                    <div>
                      <span className="text-white font-semibold">.htaccess / .user.ini</span>
                      <span className="block text-[11px] text-slate-500 font-sans">Server routing and PHP runtime overrides</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                      0644 (Standard)
                    </span>
                  </div>
                </div>
              </div>

              {permsFixed && (
                <div className="mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center gap-2 text-xs text-emerald-300">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                  <span>Permissions successfully tightened without needing SSH or root access!</span>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Update Guard Pre-Update Checker */}
          {activeTab === "update_guard" && (
            <div>
              <div className="pb-6 border-b border-white/10 mb-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>Update Guard: Pre-Update Compatibility Probe</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Pro Active
                  </span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Scans target plugin code for deprecated PHP 8.3/8.4 syntax before you click &apos;Update&apos; in WordPress.
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-4 rounded-xl bg-slate-950/70 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 font-bold text-white text-sm">
                      <span>WooCommerce Stripe Gateway</span>
                      <span className="text-xs text-slate-500 font-normal">v7.8 &rarr; v8.1</span>
                    </div>
                    <span className="text-slate-400 text-xs mt-0.5 block">
                      Scanned 42 classes against PHP 8.3 ruleset.
                    </span>
                  </div>
                  <span className="self-start sm:self-auto px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Safe to Update
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/70 border border-amber-500/30 bg-amber-500/[0.03] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 font-bold text-white text-sm">
                      <span>Custom Legacy PDF Invoicer</span>
                      <span className="text-xs text-slate-500 font-normal">v2.1 &rarr; v2.2</span>
                    </div>
                    <span className="text-amber-300 text-xs mt-0.5 block font-mono">
                      Deprecated call: utf8_encode() at class-pdf.php:124
                    </span>
                  </div>
                  <span className="self-start sm:self-auto px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/30 flex items-center gap-1">
                    <AlertOctagon className="h-3.5 w-3.5" />
                    Risky: Review First
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Safe Mode Sandbox */}
          {activeTab === "safemode" && (
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-6">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <span>Safe Mode: Zero-Downtime Troubleshooting</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Isolate faulty plugins strictly for your admin session without disabling them for public visitors.
                  </p>
                </div>
                <button
                  onClick={() => setSafeModeActive(!safeModeActive)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                    safeModeActive
                      ? "bg-rose-500 text-white shadow-lg shadow-rose-500/30"
                      : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30"
                  }`}
                >
                  <Eye className="h-4 w-4" />
                  <span>{safeModeActive ? "Exit Sandbox" : "Engage Sandbox"}</span>
                </button>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-white/5 space-y-3">
                <div className="flex items-center justify-between text-xs pb-3 border-b border-white/5">
                  <span className="text-slate-400 font-mono">Your Admin View:</span>
                  <span className={`font-bold ${safeModeActive ? "text-amber-400" : "text-slate-300"}`}>
                    {safeModeActive ? "Plugins Isolated (Clean Sandbox)" : "Normal Admin View"}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs pb-3 border-b border-white/5">
                  <span className="text-slate-400 font-mono">Live Visitors (Checkout/Traffic):</span>
                  <span className="font-bold text-emerald-400">100% Unaffected (Normal Traffic)</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono">Database active_plugins table:</span>
                  <span className="font-bold text-indigo-400">Never Modified (Zero Risk of Lockout)</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Config IDE & Rollback */}
          {activeTab === "ide" && (
            <div>
              <div className="pb-6 border-b border-white/10 mb-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>Visual .htaccess & .user.ini Editor</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Edit rewrite rules and PHP values with automatic syntax safety probe and self-healing rollback.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 font-mono text-xs text-slate-300 border border-white/10">
                <div className="text-slate-500 mb-2"># phpinfo() WP Automated Health Check Guard</div>
                <div className="text-emerald-400">upload_max_filesize = 64M</div>
                <div className="text-emerald-400">post_max_size = 64M</div>
                <div className="text-emerald-400">memory_limit = 512M</div>
                <div className="text-slate-500 mt-3"># If an invalid directive triggers HTTP 500:</div>
                <div className="text-violet-400">✓ Auto-Rollback kicks in instantly (Restores last known safe config)</div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
