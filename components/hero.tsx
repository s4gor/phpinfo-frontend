"use client";

import { useState } from "react";
import { 
  Zap, 
  ShieldCheck, 
  Cpu, 
  Activity, 
  CheckCircle2, 
  ArrowRight, 
  Download, 
  RefreshCw,
  Lock
} from "lucide-react";

export default function Hero() {
  const [selectedEnv, setSelectedEnv] = useState<"prod" | "staging" | "legacy">("prod");
  const [isScanning, setIsScanning] = useState(false);

  const envData = {
    prod: {
      php: "PHP 8.3.8",
      server: "LiteSpeed / Nginx Reverse Proxy",
      score: "99/100",
      grade: "A+",
      gradeColor: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
      opcache: "99.4%",
      opcacheBar: "99.4%",
      memory: "48 MB / 512 MB",
      memBar: "9.3%",
      safeMode: "Sandbox Ready",
      lock: "Detected: cPanel MultiPHP (Routes to .user.ini)",
      issues: 0,
      badge: "Production Optimized",
    },
    staging: {
      php: "PHP 8.2.19",
      server: "Apache 2.4 / FPM-FCGI",
      score: "92/100",
      grade: "A",
      gradeColor: "text-indigo-400 border-indigo-500/30 bg-indigo-500/10",
      opcache: "94.8%",
      opcacheBar: "94.8%",
      memory: "94 MB / 256 MB",
      memBar: "36.7%",
      safeMode: "Active (Admin Isolated)",
      lock: "Direct php.ini Write Access",
      issues: 1,
      badge: "Staging Isolated",
    },
    legacy: {
      php: "PHP 7.4.33",
      server: "Apache Prefork (EOL Runtime)",
      score: "64/100",
      grade: "D",
      gradeColor: "text-rose-400 border-rose-500/30 bg-rose-500/10",
      opcache: "Disabled",
      opcacheBar: "0%",
      memory: "210 MB / 256 MB",
      memBar: "82%",
      safeMode: "Zero-Downtime Available",
      lock: "Host Hard Lock (Contact Provider)",
      issues: 4,
      badge: "Security EOL Alert",
    },
  };

  const current = envData[selectedEnv];

  const triggerScan = () => {
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 600);
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-mesh-radial bg-grid-pattern">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Eyebrow Pill */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-violet-500/30 text-xs font-medium text-violet-300 shadow-xl shadow-violet-500/10 hover:border-violet-500/50 transition-colors">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-white font-semibold">phpinfo() WP Pro 8.0:</span>
            <span className="text-slate-300">28 Diagnostic Modules & 1-Click Permissions Auto-Fix</span>
            <ArrowRight className="h-3 w-3 text-violet-400" />
          </div>
        </div>

        {/* Headline */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
            The Diagnostic Suite Your <br className="hidden sm:block" />
            <span className="text-gradient-accent">PHP Stack Deserves.</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto font-normal">
            Ditch unreadable, static <code className="text-violet-300 bg-violet-950/60 border border-violet-800/40 px-1.5 py-0.5 rounded text-sm font-mono">phpinfo()</code> tables. 
            Surface security risks, test PHP 8.x compatibility with Update Guard, isolate crashes with zero-downtime Safe Mode, and generate executive client audits in seconds.
          </p>
        </div>

        {/* CTA Button Row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="#pricing"
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-emerald-500 text-white font-semibold text-sm shadow-xl shadow-violet-600/30 hover:shadow-violet-600/50 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
          >
            <Zap className="h-4 w-4 fill-white" />
            <span>Unlock Pro Lifetime ($149)</span>
          </a>
          <a
            href="https://wordpress.org/plugins/phpinfo-wp/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl glass-panel border border-white/10 hover:border-white/25 text-slate-200 hover:text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 hover:bg-white/5"
          >
            <Download className="h-4 w-4 text-emerald-400" />
            <span>Download Free on WP.org</span>
          </a>
          <a
            href="/docs"
            className="w-full sm:w-auto px-5 py-3.5 rounded-xl text-slate-400 hover:text-slate-200 text-sm font-medium transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Explore 28 Modules</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Interactive Live Telemetry Console (Stripe Style) */}
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl glass-panel border border-white/15 shadow-2xl overflow-hidden backdrop-blur-2xl bg-slate-950/85">
            
            {/* Top Toolbar */}
            <div className="px-4 sm:px-6 py-3.5 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 bg-slate-900/60">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-rose-500/80" />
                  <span className="h-3 w-3 rounded-full bg-amber-500/80" />
                  <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="h-4 w-[1px] bg-white/10 mx-1 hidden sm:block" />
                <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-xl border border-white/10 text-xs font-mono">
                  <button
                    onClick={() => setSelectedEnv("prod")}
                    className={`px-3 py-1 rounded-lg transition-all ${
                      selectedEnv === "prod"
                        ? "bg-violet-600 text-white font-semibold shadow-sm"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    prod-v8.3
                  </button>
                  <button
                    onClick={() => setSelectedEnv("staging")}
                    className={`px-3 py-1 rounded-lg transition-all ${
                      selectedEnv === "staging"
                        ? "bg-violet-600 text-white font-semibold shadow-sm"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    staging-fpm
                  </button>
                  <button
                    onClick={() => setSelectedEnv("legacy")}
                    className={`px-3 py-1 rounded-lg transition-all ${
                      selectedEnv === "legacy"
                        ? "bg-rose-600 text-white font-semibold shadow-sm"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    legacy-7.4
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-400 font-mono hidden md:inline">
                  Runtime: <strong className="text-white">{current.server}</strong>
                </span>
                <button
                  onClick={triggerScan}
                  disabled={isScanning}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-slate-300 hover:text-white flex items-center gap-1.5 transition-all"
                >
                  <RefreshCw className={`h-3 w-3 text-emerald-400 ${isScanning ? "animate-spin" : ""}`} />
                  <span>{isScanning ? "Probing Stack..." : "Re-run Probe"}</span>
                </button>
              </div>
            </div>

            {/* Dashboard Telemetry Body */}
            <div className="p-5 sm:p-7 grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6">
              
              {/* Telemetry Card 1 */}
              <div className="rounded-xl p-4 bg-slate-900/50 border border-white/5 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Server Health</span>
                  <span className={`px-2 py-0.5 rounded-md text-xs font-bold border ${current.gradeColor}`}>
                    Grade {current.grade}
                  </span>
                </div>
                <div className="mb-2">
                  <div className="text-3xl sm:text-4xl font-extrabold tracking-tight font-mono text-white">
                    {current.score}
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {current.issues === 0 ? "Zero security alerts" : `${current.issues} security alert flagged`}
                  </span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-violet-500 to-emerald-400 transition-all duration-500"
                    style={{ width: current.score.split("/")[0] + "%" }}
                  />
                </div>
              </div>

              {/* Telemetry Card 2 */}
              <div className="rounded-xl p-4 bg-slate-900/50 border border-white/5 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">OPcache Engine</span>
                  <Cpu className="h-4 w-4 text-violet-400" />
                </div>
                <div className="mb-2">
                  <div className="text-3xl sm:text-4xl font-extrabold tracking-tight font-mono text-white">
                    {current.opcache}
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {current.opcache === "Disabled" ? "Performance penalty!" : "128 MB cache buffer"}
                  </span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="h-full bg-emerald-400 transition-all duration-500"
                    style={{ width: current.opcacheBar }}
                  />
                </div>
              </div>

              {/* Telemetry Card 3 */}
              <div className="rounded-xl p-4 bg-slate-900/50 border border-white/5 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">PHP Memory Pool</span>
                  <Activity className="h-4 w-4 text-indigo-400" />
                </div>
                <div className="mb-2">
                  <div className="text-2xl sm:text-3xl font-extrabold tracking-tight font-mono text-white">
                    {current.memory.split("/")[0]}
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium">
                    Limit: {current.memory.split("/")[1]}
                  </span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="h-full bg-indigo-400 transition-all duration-500"
                    style={{ width: current.memBar }}
                  />
                </div>
              </div>

              {/* Telemetry Card 4 */}
              <div className="rounded-xl p-4 bg-slate-900/50 border border-white/5 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Safe Mode Sandbox</span>
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                </div>
                <div className="mb-2">
                  <div className="text-xl font-bold tracking-tight text-white">
                    {current.safeMode}
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium">
                    Zero downtime for visitors
                  </span>
                </div>
                <div className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  <span>Verified Safe</span>
                </div>
              </div>

            </div>

            {/* Bottom Insight */}
            <div className="px-5 sm:px-7 py-3 border-t border-white/5 bg-slate-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <Lock className="h-3.5 w-3.5 text-amber-400" />
                <span>Host Config Strategy:</span>
                <span className="text-slate-200 font-medium">{current.lock}</span>
              </div>
              <div className="text-violet-400 font-sans text-xs font-medium flex items-center gap-1">
                <span>Automated 1-Click Permissions Hardener Active</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
