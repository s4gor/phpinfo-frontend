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
  Sparkles,
  Terminal,
  Sliders,
  ChevronRight,
  Server
} from "lucide-react";

export default function Hero() {
  const [selectedEnv, setSelectedEnv] = useState<"prod" | "staging" | "legacy">("prod");
  const [isScanning, setIsScanning] = useState(false);
  const [activeDirective, setActiveDirective] = useState<string>("memory");

  const envs = {
    prod: {
      version: "PHP 8.3.8",
      runtime: "LiteSpeed Enterprise / FPM",
      score: 99,
      grade: "A+",
      gradeBadge: "bg-[#e6fbf7] text-[#00a389] border-[#a3f3e5]",
      opcacheHit: "99.4%",
      memory: "48 MB / 512 MB",
      memoryPercent: 9.3,
      lockState: "cPanel MultiPHP (Directives route to .user.ini)",
      sandbox: "Zero-Downtime Ready",
      safe: true,
    },
    staging: {
      version: "PHP 8.2.19",
      runtime: "Nginx Reverse Proxy / PHP-FPM",
      score: 92,
      grade: "A",
      gradeBadge: "bg-[#f0f3ff] text-[#635bff] border-[#d6dcff]",
      opcacheHit: "94.8%",
      memory: "96 MB / 256 MB",
      memoryPercent: 37.5,
      lockState: "Direct php.ini Write Access",
      sandbox: "Active Sandbox (Admin Only)",
      safe: true,
    },
    legacy: {
      version: "PHP 7.4.33",
      runtime: "Apache 2.4 / Prefork (EOL)",
      score: 64,
      grade: "D",
      gradeBadge: "bg-[#fef0f2] text-[#df1b41] border-[#fbc5cd]",
      opcacheHit: "Disabled",
      memory: "210 MB / 256 MB",
      memoryPercent: 82.0,
      lockState: "Host Hard Lock (Contact Hosting Provider)",
      sandbox: "Isolation Recommended",
      safe: false,
    }
  };

  const current = envs[selectedEnv];

  const handleProbe = () => {
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 500);
  };

  return (
    <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden radiant-mesh subtle-grid">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Radar Eyebrow Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-[#e6e8eb] text-xs font-semibold text-[#425466] shadow-[0_2px_10px_rgba(10,37,64,0.04)] hover:border-[#635bff] transition-all">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00d4b2] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00a389]" />
            </span>
            <span className="text-[#0a2540] font-bold">phpinfo() WP v8.0 Released:</span>
            <span>Precision Server Telemetry & 1-Click Permissions Auto-Fix</span>
            <ArrowRight className="h-3.5 w-3.5 text-[#635bff]" />
          </div>
        </div>

        {/* Master Headline */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-[-0.035em] text-[#0a2540] mb-6 leading-[1.08]">
            The Server Telemetry <br className="hidden sm:block" />
            <span className="text-[#635bff]">Workstation</span> for WordPress.
          </h1>
          <p className="text-base sm:text-xl text-[#425466] leading-relaxed max-w-2xl mx-auto font-normal">
            Say goodbye to 1995 static tables. Inspect real-time OPcache hit rates, harden insecure permissions in 1 click, test PHP 8.x compatibility with Update Guard, and troubleshoot crashes with zero downtime.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="#pricing"
            className="btn-primary-workstation w-full sm:w-auto px-8 py-4 text-sm flex items-center justify-center gap-2 shadow-lg"
          >
            <Zap className="h-4 w-4 fill-white" />
            <span>Unlock Pro Lifetime ($149)</span>
          </a>
          <a
            href="https://wordpress.org/plugins/phpinfo-wp/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary-workstation w-full sm:w-auto px-7 py-4 text-sm flex items-center justify-center gap-2"
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

        {/* Precision Workstation Console (Milled Hardware Workstation Card) */}
        <div className="max-w-5xl mx-auto workstation-hud overflow-hidden bg-white">
          
          {/* Top Control Rail */}
          <div className="px-5 sm:px-8 py-4 border-b border-[#e6e8eb] flex flex-wrap items-center justify-between gap-4 bg-[#f8faff]">
            
            {/* Environment Selector */}
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
                  className={`px-3.5 py-1.5 rounded-full font-bold transition-all ${
                    selectedEnv === "prod"
                      ? "bg-[#635bff] text-white shadow-xs"
                      : "text-[#425466] hover:text-[#0a2540]"
                  }`}
                >
                  prod-v8.3
                </button>
                <button
                  onClick={() => setSelectedEnv("staging")}
                  className={`px-3.5 py-1.5 rounded-full font-bold transition-all ${
                    selectedEnv === "staging"
                      ? "bg-[#635bff] text-white shadow-xs"
                      : "text-[#425466] hover:text-[#0a2540]"
                  }`}
                >
                  staging-fpm
                </button>
                <button
                  onClick={() => setSelectedEnv("legacy")}
                  className={`px-3.5 py-1.5 rounded-full font-bold transition-all ${
                    selectedEnv === "legacy"
                      ? "bg-[#df1b41] text-white shadow-xs"
                      : "text-[#425466] hover:text-[#0a2540]"
                  }`}
                >
                  legacy-7.4
                </button>
              </div>
            </div>

            {/* Live Probe Trigger */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-[#697386] font-mono hidden md:inline">
                Stack: <strong className="text-[#0a2540]">{current.runtime}</strong>
              </span>
              <button
                onClick={handleProbe}
                disabled={isScanning}
                className="px-3.5 py-1.5 rounded-full bg-white hover:bg-[#f8faff] border border-[#e6e8eb] text-xs font-bold text-[#0a2540] flex items-center gap-1.5 transition-all shadow-xs"
              >
                <RefreshCw className={`h-3 w-3 text-[#00a389] ${isScanning ? "animate-spin" : ""}`} />
                <span>{isScanning ? "Probing Stack..." : "Re-run Probe"}</span>
              </button>
            </div>

          </div>

          {/* Primary Telemetry Grid */}
          <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-4 gap-5 bg-white">
            
            {/* Tile 1: Server Score */}
            <div className="precision-card p-5 bg-[#f8faff] border border-[#e6e8eb] flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#697386]">Health Score</span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${current.gradeBadge}`}>
                  Grade {current.grade}
                </span>
              </div>
              <div className="mb-2">
                <div className="text-3xl sm:text-4xl font-black font-mono text-[#0a2540]">
                  {current.score}<span className="text-lg text-[#697386] font-normal">/100</span>
                </div>
                <span className="text-xs text-[#697386] font-medium">
                  {current.score >= 90 ? "Zero critical vulnerabilities" : "Security attention required"}
                </span>
              </div>
              <div className="w-full bg-[#e6e8eb] rounded-full h-2 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#635bff] to-[#00d4b2] transition-all duration-500 rounded-full"
                  style={{ width: `${current.score}%` }}
                />
              </div>
            </div>

            {/* Tile 2: OPcache Hit Rate */}
            <div className="precision-card p-5 bg-[#f8faff] border border-[#e6e8eb] flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#697386]">OPcache Engine</span>
                <Cpu className="h-4 w-4 text-[#635bff]" />
              </div>
              <div className="mb-2">
                <div className="text-3xl sm:text-4xl font-black font-mono text-[#0a2540]">
                  {current.opcacheHit}
                </div>
                <span className="text-xs text-[#697386] font-medium">
                  {current.opcacheHit === "Disabled" ? "Bytecode recompiling every request" : "128 MB cache buffer active"}
                </span>
              </div>
              <div className="w-full bg-[#e6e8eb] rounded-full h-2 overflow-hidden">
                <div 
                  className="h-full bg-[#00d4b2] transition-all duration-500 rounded-full"
                  style={{ width: current.opcacheHit === "Disabled" ? "0%" : current.opcacheHit }}
                />
              </div>
            </div>

            {/* Tile 3: PHP Memory Allocation */}
            <div className="precision-card p-5 bg-[#f8faff] border border-[#e6e8eb] flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#697386]">Memory Pool</span>
                <Activity className="h-4 w-4 text-[#635bff]" />
              </div>
              <div className="mb-2">
                <div className="text-2xl sm:text-3xl font-black font-mono text-[#0a2540]">
                  {current.memory.split("/")[0]}
                </div>
                <span className="text-xs text-[#697386] font-medium">
                  Limit: {current.memory.split("/")[1]}
                </span>
              </div>
              <div className="w-full bg-[#e6e8eb] rounded-full h-2 overflow-hidden">
                <div 
                  className="h-full bg-[#635bff] transition-all duration-500 rounded-full"
                  style={{ width: `${current.memoryPercent}%` }}
                />
              </div>
            </div>

            {/* Tile 4: Zero-Downtime Safe Mode */}
            <div className="precision-card p-5 bg-[#f8faff] border border-[#e6e8eb] flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#697386]">Sandbox Status</span>
                <ShieldCheck className="h-4 w-4 text-[#00a389]" />
              </div>
              <div className="mb-2">
                <div className="text-lg font-bold text-[#0a2540]">
                  {current.sandbox}
                </div>
                <span className="text-xs text-[#697386] font-medium">
                  Public traffic 100% normal
                </span>
              </div>
              <div className="text-[11px] text-[#00a389] font-mono flex items-center gap-1 font-bold">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Verified Safe</span>
              </div>
            </div>

          </div>

          {/* Interactive Directive Microscope Strip */}
          <div className="px-6 sm:px-8 py-4 border-t border-[#e6e8eb] bg-[#f8faff] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-[#425466]">
              <Lock className="h-4 w-4 text-[#ff8a00]" />
              <span className="font-semibold text-[#0a2540]">Host Routing Strategy:</span>
              <span className="font-mono text-[#0a2540]">{current.lockState}</span>
            </div>
            <div className="text-[#635bff] font-bold text-xs flex items-center gap-1.5">
              <span>1-Click Permissions Auto-Fix Active (0600 / 0755)</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
