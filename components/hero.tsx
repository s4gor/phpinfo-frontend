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
  Lock,
  Layers
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
      gradeColor: "text-[#00a389] border-[#a3f3e5] bg-[#e6fbf7]",
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
      gradeColor: "text-[#635bff] border-[#d6dcff] bg-[#f0f3ff]",
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
      gradeColor: "text-[#df1b41] border-[#fbc5cd] bg-[#fef0f2]",
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
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden stripe-gradient-canvas">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Eyebrow Pill */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#e6e8eb] text-xs font-semibold text-[#425466] shadow-[0_2px_8px_rgba(50,50,93,0.05)] hover:border-[#635bff] transition-colors">
            <span className="flex h-2 w-2 rounded-full bg-[#00d4b2] animate-ping" />
            <span className="text-[#0a2540] font-bold">phpinfo() WP Pro 8.0:</span>
            <span>28 Diagnostic Modules & 1-Click Permissions Auto-Fix</span>
            <ArrowRight className="h-3 w-3 text-[#635bff]" />
          </div>
        </div>

        {/* Headline */}
        <div className="text-center max-w-4xl mx-auto mb-8">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#0a2540] mb-6 leading-[1.08]">
            The Diagnostic Suite Your <br className="hidden sm:block" />
            <span className="text-[#635bff]">PHP Stack Deserves.</span>
          </h1>
          <p className="text-base sm:text-xl text-[#425466] leading-relaxed max-w-2xl mx-auto font-normal">
            Ditch unreadable, static <code className="text-[#635bff] bg-[#f0f3ff] border border-[#d6dcff] px-2 py-0.5 rounded-md text-sm font-mono font-bold">phpinfo()</code> tables. 
            Surface security risks, test PHP 8.x compatibility with Update Guard, isolate crashes with zero-downtime Safe Mode, and generate executive client audits in seconds.
          </p>
        </div>

        {/* CTA Button Row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="#pricing"
            className="stripe-button-primary w-full sm:w-auto px-8 py-4 text-sm flex items-center justify-center gap-2"
          >
            <Zap className="h-4 w-4 fill-white" />
            <span>Unlock Pro Lifetime ($149)</span>
          </a>
          <a
            href="https://wordpress.org/plugins/phpinfo-wp/"
            target="_blank"
            rel="noopener noreferrer"
            className="stripe-button-secondary w-full sm:w-auto px-7 py-4 text-sm flex items-center justify-center gap-2"
          >
            <Download className="h-4 w-4 text-[#00a389]" />
            <span>Download Free on WP.org</span>
          </a>
          <a
            href="/docs"
            className="w-full sm:w-auto px-5 py-4 text-[#425466] hover:text-[#0a2540] text-sm font-semibold transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Explore 28 Modules</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Interactive Live Telemetry Console (Stripe Style White Card) */}
        <div className="max-w-5xl mx-auto">
          <div className="stripe-card p-2 sm:p-3 overflow-hidden bg-white">
            
            {/* Top Toolbar */}
            <div className="px-4 sm:px-6 py-3.5 border-b border-[#e6e8eb] flex flex-wrap items-center justify-between gap-3 bg-[#f8faff] rounded-t-xl">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-[#ff5b60]" />
                  <span className="h-3 w-3 rounded-full bg-[#ffb020]" />
                  <span className="h-3 w-3 rounded-full bg-[#00d4b2]" />
                </div>
                <div className="h-4 w-[1px] bg-[#e6e8eb] mx-1 hidden sm:block" />
                <div className="flex items-center gap-1 bg-white p-1 rounded-full border border-[#e6e8eb] text-xs font-mono shadow-xs">
                  <button
                    onClick={() => setSelectedEnv("prod")}
                    className={`px-3 py-1 rounded-full transition-all ${
                      selectedEnv === "prod"
                        ? "bg-[#635bff] text-white font-bold shadow-xs"
                        : "text-[#425466] hover:text-[#0a2540]"
                    }`}
                  >
                    prod-v8.3
                  </button>
                  <button
                    onClick={() => setSelectedEnv("staging")}
                    className={`px-3 py-1 rounded-full transition-all ${
                      selectedEnv === "staging"
                        ? "bg-[#635bff] text-white font-bold shadow-xs"
                        : "text-[#425466] hover:text-[#0a2540]"
                    }`}
                  >
                    staging-fpm
                  </button>
                  <button
                    onClick={() => setSelectedEnv("legacy")}
                    className={`px-3 py-1 rounded-full transition-all ${
                      selectedEnv === "legacy"
                        ? "bg-[#df1b41] text-white font-bold shadow-xs"
                        : "text-[#425466] hover:text-[#0a2540]"
                    }`}
                  >
                    legacy-7.4
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-[#697386] font-mono hidden md:inline">
                  Runtime: <strong className="text-[#0a2540]">{current.server}</strong>
                </span>
                <button
                  onClick={triggerScan}
                  disabled={isScanning}
                  className="px-3 py-1.5 rounded-full bg-white hover:bg-[#f8faff] border border-[#e6e8eb] text-xs font-semibold text-[#0a2540] flex items-center gap-1.5 transition-all shadow-xs"
                >
                  <RefreshCw className={`h-3 w-3 text-[#00a389] ${isScanning ? "animate-spin" : ""}`} />
                  <span>{isScanning ? "Probing Stack..." : "Re-run Probe"}</span>
                </button>
              </div>
            </div>

            {/* Dashboard Telemetry Body */}
            <div className="p-5 sm:p-7 grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6 bg-white">
              
              {/* Telemetry Card 1 */}
              <div className="rounded-2xl p-5 bg-[#f8faff] border border-[#e6e8eb] flex flex-col justify-between shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#697386]">Server Health</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${current.gradeColor}`}>
                    Grade {current.grade}
                  </span>
                </div>
                <div className="mb-2">
                  <div className="text-3xl sm:text-4xl font-black tracking-tight font-mono text-[#0a2540]">
                    {current.score}
                  </div>
                  <span className="text-[11px] text-[#697386] font-medium">
                    {current.issues === 0 ? "Zero security alerts" : `${current.issues} security alert flagged`}
                  </span>
                </div>
                <div className="w-full bg-[#e6e8eb] rounded-full h-2 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#635bff] to-[#00d4b2] transition-all duration-500 rounded-full"
                    style={{ width: current.score.split("/")[0] + "%" }}
                  />
                </div>
              </div>

              {/* Telemetry Card 2 */}
              <div className="rounded-2xl p-5 bg-[#f8faff] border border-[#e6e8eb] flex flex-col justify-between shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#697386]">OPcache Engine</span>
                  <Cpu className="h-4 w-4 text-[#635bff]" />
                </div>
                <div className="mb-2">
                  <div className="text-3xl sm:text-4xl font-black tracking-tight font-mono text-[#0a2540]">
                    {current.opcache}
                  </div>
                  <span className="text-[11px] text-[#697386] font-medium">
                    {current.opcache === "Disabled" ? "Performance penalty!" : "128 MB cache buffer"}
                  </span>
                </div>
                <div className="w-full bg-[#e6e8eb] rounded-full h-2 overflow-hidden">
                  <div 
                    className="h-full bg-[#00d4b2] transition-all duration-500 rounded-full"
                    style={{ width: current.opcacheBar }}
                  />
                </div>
              </div>

              {/* Telemetry Card 3 */}
              <div className="rounded-2xl p-5 bg-[#f8faff] border border-[#e6e8eb] flex flex-col justify-between shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#697386]">PHP Memory Pool</span>
                  <Activity className="h-4 w-4 text-[#635bff]" />
                </div>
                <div className="mb-2">
                  <div className="text-2xl sm:text-3xl font-black tracking-tight font-mono text-[#0a2540]">
                    {current.memory.split("/")[0]}
                  </div>
                  <span className="text-[11px] text-[#697386] font-medium">
                    Limit: {current.memory.split("/")[1]}
                  </span>
                </div>
                <div className="w-full bg-[#e6e8eb] rounded-full h-2 overflow-hidden">
                  <div 
                    className="h-full bg-[#635bff] transition-all duration-500 rounded-full"
                    style={{ width: current.memBar }}
                  />
                </div>
              </div>

              {/* Telemetry Card 4 */}
              <div className="rounded-2xl p-5 bg-[#f8faff] border border-[#e6e8eb] flex flex-col justify-between shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#697386]">Safe Mode Sandbox</span>
                  <ShieldCheck className="h-4 w-4 text-[#00a389]" />
                </div>
                <div className="mb-2">
                  <div className="text-xl font-bold tracking-tight text-[#0a2540]">
                    {current.safeMode}
                  </div>
                  <span className="text-[11px] text-[#697386] font-medium">
                    Zero downtime for visitors
                  </span>
                </div>
                <div className="text-[10px] text-[#00a389] font-mono flex items-center gap-1 font-bold">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Verified Safe</span>
                </div>
              </div>

            </div>

            {/* Bottom Insight */}
            <div className="px-5 sm:px-7 py-3.5 border-t border-[#e6e8eb] bg-[#f8faff] rounded-b-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-mono text-[#425466]">
              <div className="flex items-center gap-2">
                <Lock className="h-3.5 w-3.5 text-[#ff8a00]" />
                <span>Host Config Strategy:</span>
                <span className="text-[#0a2540] font-bold">{current.lock}</span>
              </div>
              <div className="text-[#635bff] font-sans text-xs font-bold flex items-center gap-1">
                <span>Automated 1-Click Permissions Hardener Active</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
