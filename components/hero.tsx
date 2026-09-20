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
      gradeColor: "text-emerald-700 border-emerald-300 bg-emerald-50",
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
      gradeColor: "text-indigo-700 border-indigo-300 bg-indigo-50",
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
      gradeColor: "text-rose-700 border-rose-300 bg-rose-50",
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/90 text-xs font-medium text-slate-700 shadow-sm hover:border-violet-300 transition-colors">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-slate-900 font-semibold">phpinfo() WP Pro 8.0:</span>
            <span className="text-slate-600">28 Diagnostic Modules & 1-Click Permissions Auto-Fix</span>
            <ArrowRight className="h-3 w-3 text-violet-600" />
          </div>
        </div>

        {/* Headline */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.1]">
            The Diagnostic Suite Your <br className="hidden sm:block" />
            <span className="text-gradient-accent">PHP Stack Deserves.</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal">
            Ditch unreadable, static <code className="text-violet-700 bg-violet-50 border border-violet-200 px-1.5 py-0.5 rounded text-sm font-mono font-semibold">phpinfo()</code> tables. 
            Surface security risks, test PHP 8.x compatibility with Update Guard, isolate crashes with zero-downtime Safe Mode, and generate executive client audits in seconds.
          </p>
        </div>

        {/* CTA Button Row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="#pricing"
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-emerald-600 text-white font-semibold text-sm shadow-xl shadow-violet-600/25 hover:shadow-violet-600/40 hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
          >
            <Zap className="h-4 w-4 fill-white" />
            <span>Unlock Pro Lifetime ($149)</span>
          </a>
          <a
            href="https://wordpress.org/plugins/phpinfo-wp/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white border border-slate-300 hover:border-slate-400 text-slate-700 hover:text-slate-900 font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-xs hover:bg-slate-50"
          >
            <Download className="h-4 w-4 text-emerald-600" />
            <span>Download Free on WP.org</span>
          </a>
          <a
            href="/docs"
            className="w-full sm:w-auto px-5 py-3.5 rounded-xl text-slate-600 hover:text-slate-900 text-sm font-medium transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Explore 28 Modules</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Interactive Live Telemetry Console (Clean Stripe-White Card) */}
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl bg-white border border-slate-200 shadow-2xl overflow-hidden">
            
            {/* Top Toolbar */}
            <div className="px-4 sm:px-6 py-3.5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 bg-slate-50/90">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-rose-400" />
                  <span className="h-3 w-3 rounded-full bg-amber-400" />
                  <span className="h-3 w-3 rounded-full bg-emerald-400" />
                </div>
                <div className="h-4 w-[1px] bg-slate-200 mx-1 hidden sm:block" />
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-mono">
                  <button
                    onClick={() => setSelectedEnv("prod")}
                    className={`px-3 py-1 rounded-lg transition-all ${
                      selectedEnv === "prod"
                        ? "bg-white text-violet-700 font-bold shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    prod-v8.3
                  </button>
                  <button
                    onClick={() => setSelectedEnv("staging")}
                    className={`px-3 py-1 rounded-lg transition-all ${
                      selectedEnv === "staging"
                        ? "bg-white text-violet-700 font-bold shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    staging-fpm
                  </button>
                  <button
                    onClick={() => setSelectedEnv("legacy")}
                    className={`px-3 py-1 rounded-lg transition-all ${
                      selectedEnv === "legacy"
                        ? "bg-rose-600 text-white font-bold shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    legacy-7.4
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-500 font-mono hidden md:inline">
                  Runtime: <strong className="text-slate-800">{current.server}</strong>
                </span>
                <button
                  onClick={triggerScan}
                  disabled={isScanning}
                  className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 hover:text-slate-900 flex items-center gap-1.5 transition-all shadow-xs"
                >
                  <RefreshCw className={`h-3 w-3 text-emerald-600 ${isScanning ? "animate-spin" : ""}`} />
                  <span>{isScanning ? "Probing Stack..." : "Re-run Probe"}</span>
                </button>
              </div>
            </div>

            {/* Dashboard Telemetry Body */}
            <div className="p-5 sm:p-7 grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6 bg-white">
              
              {/* Telemetry Card 1 */}
              <div className="rounded-xl p-4 bg-slate-50/80 border border-slate-200/80 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Server Health</span>
                  <span className={`px-2 py-0.5 rounded-md text-xs font-bold border ${current.gradeColor}`}>
                    Grade {current.grade}
                  </span>
                </div>
                <div className="mb-2">
                  <div className="text-3xl sm:text-4xl font-extrabold tracking-tight font-mono text-slate-900">
                    {current.score}
                  </div>
                  <span className="text-[11px] text-slate-500 font-medium">
                    {current.issues === 0 ? "Zero security alerts" : `${current.issues} security alert flagged`}
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-violet-600 to-emerald-500 transition-all duration-500"
                    style={{ width: current.score.split("/")[0] + "%" }}
                  />
                </div>
              </div>

              {/* Telemetry Card 2 */}
              <div className="rounded-xl p-4 bg-slate-50/80 border border-slate-200/80 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">OPcache Engine</span>
                  <Cpu className="h-4 w-4 text-violet-600" />
                </div>
                <div className="mb-2">
                  <div className="text-3xl sm:text-4xl font-extrabold tracking-tight font-mono text-slate-900">
                    {current.opcache}
                  </div>
                  <span className="text-[11px] text-slate-500 font-medium">
                    {current.opcache === "Disabled" ? "Performance penalty!" : "128 MB cache buffer"}
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="h-full bg-emerald-500 transition-all duration-500"
                    style={{ width: current.opcacheBar }}
                  />
                </div>
              </div>

              {/* Telemetry Card 3 */}
              <div className="rounded-xl p-4 bg-slate-50/80 border border-slate-200/80 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">PHP Memory Pool</span>
                  <Activity className="h-4 w-4 text-indigo-600" />
                </div>
                <div className="mb-2">
                  <div className="text-2xl sm:text-3xl font-extrabold tracking-tight font-mono text-slate-900">
                    {current.memory.split("/")[0]}
                  </div>
                  <span className="text-[11px] text-slate-500 font-medium">
                    Limit: {current.memory.split("/")[1]}
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="h-full bg-indigo-600 transition-all duration-500"
                    style={{ width: current.memBar }}
                  />
                </div>
              </div>

              {/* Telemetry Card 4 */}
              <div className="rounded-xl p-4 bg-slate-50/80 border border-slate-200/80 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Safe Mode Sandbox</span>
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                </div>
                <div className="mb-2">
                  <div className="text-xl font-bold tracking-tight text-slate-900">
                    {current.safeMode}
                  </div>
                  <span className="text-[11px] text-slate-500 font-medium">
                    Zero downtime for visitors
                  </span>
                </div>
                <div className="text-[10px] text-emerald-700 font-mono flex items-center gap-1 font-semibold">
                  <CheckCircle2 className="h-3 w-3" />
                  <span>Verified Safe</span>
                </div>
              </div>

            </div>

            {/* Bottom Insight */}
            <div className="px-5 sm:px-7 py-3 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-mono text-slate-600">
              <div className="flex items-center gap-2">
                <Lock className="h-3.5 w-3.5 text-amber-600" />
                <span>Host Config Strategy:</span>
                <span className="text-slate-900 font-medium">{current.lock}</span>
              </div>
              <div className="text-violet-700 font-sans text-xs font-semibold flex items-center gap-1">
                <span>Automated 1-Click Permissions Hardener Active</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
