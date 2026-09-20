"use client";

import { useState } from "react";
import { 
  ShieldCheck, 
  Wrench, 
  Flame, 
  CheckCircle2, 
  AlertOctagon, 
  Code2, 
  FileCode, 
  Lock, 
  Eye, 
  Sparkles 
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
    <section id="demo" className="py-24 relative bg-[#f8faff] border-y border-[#e6e8eb]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f0f3ff] border border-[#d6dcff] text-xs font-bold text-[#635bff] mb-3">
            <Sparkles className="h-3.5 w-3.5 text-[#ff8a00]" />
            <span>Interactive Simulator</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0a2540] tracking-tight mb-4">
            Test Real Diagnostic Workflows In Your Browser
          </h2>
          <p className="text-[#425466] text-base sm:text-lg">
            Experience how phpinfo() WP turns complex server commands into one-click safe actions.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 rounded-full bg-white border border-[#e6e8eb] shadow-sm overflow-x-auto max-w-full">
            <button
              onClick={() => setActiveTab("perms")}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === "perms"
                  ? "bg-[#635bff] text-white shadow-md shadow-[#635bff]/25"
                  : "text-[#425466] hover:text-[#0a2540]"
              }`}
            >
              <ShieldCheck className="h-4 w-4" />
              <span>1-Click Permissions Hardener</span>
            </button>
            <button
              onClick={() => setActiveTab("update_guard")}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === "update_guard"
                  ? "bg-[#635bff] text-white shadow-md shadow-[#635bff]/25"
                  : "text-[#425466] hover:text-[#0a2540]"
              }`}
            >
              <Flame className="h-4 w-4 text-[#ff8a00]" />
              <span>Update Guard Scanner</span>
            </button>
            <button
              onClick={() => setActiveTab("safemode")}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === "safemode"
                  ? "bg-[#635bff] text-white shadow-md shadow-[#635bff]/25"
                  : "text-[#425466] hover:text-[#0a2540]"
              }`}
            >
              <Lock className="h-4 w-4 text-[#00a389]" />
              <span>Safe Mode Sandbox</span>
            </button>
            <button
              onClick={() => setActiveTab("ide")}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === "ide"
                  ? "bg-[#635bff] text-white shadow-md shadow-[#635bff]/25"
                  : "text-[#425466] hover:text-[#0a2540]"
              }`}
            >
              <Code2 className="h-4 w-4" />
              <span>Config IDE & Rollback</span>
            </button>
          </div>
        </div>

        {/* Tab Showcase Card */}
        <div className="max-w-4xl mx-auto stripe-card p-6 sm:p-10 bg-white">
          
          {/* TAB 1: 1-Click Permissions Auto-Fix */}
          {activeTab === "perms" && (
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#e6e8eb] mb-6">
                <div>
                  <h3 className="text-xl font-extrabold text-[#0a2540] flex items-center gap-2">
                    <span>File & Directory Permissions Audit</span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#f0f3ff] text-[#635bff] border border-[#d6dcff] font-bold">
                      Pro Feature
                    </span>
                  </h3>
                  <p className="text-sm text-[#425466] mt-1">
                    Detects dangerously loose permissions (0777, 0666) and hardens files directly via PHP.
                  </p>
                </div>
                <button
                  onClick={handleAutoFix}
                  disabled={fixing || permsFixed}
                  className={`px-5 py-3 rounded-full font-bold text-xs flex items-center gap-2 transition-all ${
                    permsFixed
                      ? "bg-[#e6fbf7] text-[#00a389] border border-[#a3f3e5] cursor-default"
                      : "stripe-button-primary"
                  }`}
                >
                  <Wrench className={`h-4 w-4 ${fixing ? "animate-spin" : ""}`} />
                  <span>{fixing ? "Hardening Permissions..." : permsFixed ? "✓ All Hardened (Protected)" : "Run 1-Click Auto-Fix"}</span>
                </button>
              </div>

              {/* Items List */}
              <div className="space-y-3 font-mono text-xs">
                <div className="p-4 rounded-2xl bg-[#f8faff] border border-[#e6e8eb] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileCode className="h-5 w-5 text-[#635bff]" />
                    <div>
                      <span className="text-[#0a2540] font-bold text-sm">wp-config.php</span>
                      <span className="block text-xs text-[#697386] font-sans">Database credentials, salts & security keys</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full font-bold ${
                      permsFixed ? "bg-[#e6fbf7] text-[#00a389] border border-[#a3f3e5]" : "bg-[#fef0f2] text-[#df1b41] border border-[#fbc5cd]"
                    }`}>
                      {permsFixed ? "0600 (Secure)" : "0666 (Insecure)"}
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#f8faff] border border-[#e6e8eb] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileCode className="h-5 w-5 text-[#635bff]" />
                    <div>
                      <span className="text-[#0a2540] font-bold text-sm">wp-content/uploads</span>
                      <span className="block text-xs text-[#697386] font-sans">User uploaded media & attachment directory</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full font-bold ${
                      permsFixed ? "bg-[#e6fbf7] text-[#00a389] border border-[#a3f3e5]" : "bg-[#fef0f2] text-[#df1b41] border border-[#fbc5cd]"
                    }`}>
                      {permsFixed ? "0755 (Optimal)" : "0777 (World Writable)"}
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#f8faff] border border-[#e6e8eb] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileCode className="h-5 w-5 text-[#635bff]" />
                    <div>
                      <span className="text-[#0a2540] font-bold text-sm">.htaccess / .user.ini</span>
                      <span className="block text-xs text-[#697386] font-sans">Server routing and PHP runtime overrides</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full font-bold bg-[#e6fbf7] text-[#00a389] border border-[#a3f3e5]">
                      0644 (Standard)
                    </span>
                  </div>
                </div>
              </div>

              {permsFixed && (
                <div className="mt-4 p-4 rounded-2xl bg-[#e6fbf7] border border-[#a3f3e5] flex items-center gap-2.5 text-xs text-[#00a389] font-bold">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#00a389]" />
                  <span>Permissions successfully tightened without needing SSH or root access!</span>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Update Guard Pre-Update Checker */}
          {activeTab === "update_guard" && (
            <div>
              <div className="pb-6 border-b border-[#e6e8eb] mb-6">
                <h3 className="text-xl font-extrabold text-[#0a2540] flex items-center gap-2">
                  <span>Update Guard: Pre-Update Compatibility Probe</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#fff4e5] text-[#b25e00] border border-[#ffd8a8] font-bold">
                    Pro Active
                  </span>
                </h3>
                <p className="text-sm text-[#425466] mt-1">
                  Scans target plugin code for deprecated PHP 8.3/8.4 syntax before you click Update in WordPress.
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-4 rounded-2xl bg-[#f8faff] border border-[#e6e8eb] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 font-bold text-[#0a2540] text-sm">
                      <span>WooCommerce Stripe Gateway</span>
                      <span className="text-xs text-[#697386] font-normal">v7.8 &rarr; v8.1</span>
                    </div>
                    <span className="text-[#425466] text-xs mt-0.5 block">
                      Scanned 42 classes against PHP 8.3 ruleset.
                    </span>
                  </div>
                  <span className="self-start sm:self-auto px-3 py-1 rounded-full text-xs font-bold bg-[#e6fbf7] text-[#00a389] border border-[#a3f3e5] flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Safe to Update
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-[#fff4e5]/40 border border-[#ffd8a8] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 font-bold text-[#0a2540] text-sm">
                      <span>Custom Legacy PDF Invoicer</span>
                      <span className="text-xs text-[#697386] font-normal">v2.1 &rarr; v2.2</span>
                    </div>
                    <span className="text-[#b25e00] text-xs mt-0.5 block font-mono font-bold">
                      Deprecated call: utf8_encode() at class-pdf.php:124
                    </span>
                  </div>
                  <span className="self-start sm:self-auto px-3 py-1 rounded-full text-xs font-bold bg-[#fff4e5] text-[#b25e00] border border-[#ffd8a8] flex items-center gap-1">
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
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#e6e8eb] mb-6">
                <div>
                  <h3 className="text-xl font-extrabold text-[#0a2540] flex items-center gap-2">
                    <span>Safe Mode: Zero-Downtime Troubleshooting</span>
                  </h3>
                  <p className="text-sm text-[#425466] mt-1">
                    Isolate faulty plugins strictly for your admin session without disabling them for public visitors.
                  </p>
                </div>
                <button
                  onClick={() => setSafeModeActive(!safeModeActive)}
                  className={`px-5 py-3 rounded-full text-xs font-bold flex items-center gap-2 transition-all ${
                    safeModeActive
                      ? "bg-[#df1b41] text-white shadow-md shadow-[#df1b41]/25"
                      : "bg-[#00a389] hover:bg-[#008f77] text-white shadow-md shadow-[#00a389]/25"
                  }`}
                >
                  <Eye className="h-4 w-4" />
                  <span>{safeModeActive ? "Exit Sandbox" : "Engage Sandbox"}</span>
                </button>
              </div>

              <div className="p-5 rounded-2xl bg-[#f8faff] border border-[#e6e8eb] space-y-3">
                <div className="flex items-center justify-between text-xs pb-3 border-b border-[#e6e8eb]">
                  <span className="text-[#697386] font-mono">Your Admin View:</span>
                  <span className={`font-bold ${safeModeActive ? "text-[#ff8a00]" : "text-[#0a2540]"}`}>
                    {safeModeActive ? "Plugins Isolated (Clean Sandbox)" : "Normal Admin View"}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs pb-3 border-b border-[#e6e8eb]">
                  <span className="text-[#697386] font-mono">Live Visitors (Checkout/Traffic):</span>
                  <span className="font-bold text-[#00a389]">100% Unaffected (Normal Traffic)</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#697386] font-mono">Database active_plugins table:</span>
                  <span className="font-bold text-[#635bff]">Never Modified (Zero Risk of Lockout)</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Config IDE & Rollback */}
          {activeTab === "ide" && (
            <div>
              <div className="pb-6 border-b border-[#e6e8eb] mb-6">
                <h3 className="text-xl font-extrabold text-[#0a2540] flex items-center gap-2">
                  <span>Visual .htaccess & .user.ini Editor</span>
                </h3>
                <p className="text-sm text-[#425466] mt-1">
                  Edit rewrite rules and PHP values with automatic syntax safety probe and self-healing rollback.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#f8faff] font-mono text-xs text-[#0a2540] border border-[#e6e8eb] space-y-1.5 shadow-inner">
                <div className="text-[#697386]"># phpinfo() WP Automated Health Check Guard</div>
                <div className="text-[#00a389] font-bold">upload_max_filesize = 64M</div>
                <div className="text-[#00a389] font-bold">post_max_size = 64M</div>
                <div className="text-[#00a389] font-bold">memory_limit = 512M</div>
                <div className="text-[#697386] pt-2"># If an invalid directive triggers HTTP 500:</div>
                <div className="text-[#635bff] font-bold">✓ Auto-Rollback kicks in instantly (Restores last known safe config)</div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
