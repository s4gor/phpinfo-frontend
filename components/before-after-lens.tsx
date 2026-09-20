"use client";

import { useState } from "react";
import { Sliders, CheckCircle2, XCircle, ArrowRight, Sparkles } from "lucide-react";

export default function BeforeAfterLens() {
  const [view, setView] = useState<"after" | "before">("after");

  return (
    <section className="py-24 relative bg-white border-y border-[#e6e8eb]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f0f3ff] border border-[#d6dcff] text-xs font-bold text-[#635bff] mb-3">
            <Sparkles className="h-3.5 w-3.5 text-[#ff8a00]" />
            <span>The Generational Leap</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0a2540] tracking-tight mb-4">
            1995 Raw PHP vs 2026 Telemetry Workstation
          </h2>
          <p className="text-[#425466] text-base sm:text-lg">
            Toggle below to see why developers never go back to default server dumps.
          </p>

          {/* Switcher Toggle */}
          <div className="flex justify-center mt-6">
            <div className="inline-flex p-1 rounded-full bg-[#f8faff] border border-[#e6e8eb] shadow-xs">
              <button
                onClick={() => setView("after")}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                  view === "after"
                    ? "bg-[#635bff] text-white shadow-sm"
                    : "text-[#425466] hover:text-[#0a2540]"
                }`}
              >
                2026: phpinfo() WP Pro (Workstation)
              </button>
              <button
                onClick={() => setView("before")}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                  view === "before"
                    ? "bg-[#0a2540] text-white shadow-sm"
                    : "text-[#425466] hover:text-[#0a2540]"
                }`}
              >
                1995: Default phpinfo() (Raw Dump)
              </button>
            </div>
          </div>
        </div>

        {/* Display Container */}
        <div className="max-w-4xl mx-auto precision-card p-6 sm:p-8 bg-white">
          
          {view === "after" ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-[#e6e8eb]">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#00d4b2]" />
                  <h3 className="font-extrabold text-[#0a2540] text-base">Executive Telemetry Hub</h3>
                </div>
                <span className="text-xs font-mono font-bold text-[#00a389] bg-[#e6fbf7] px-2.5 py-0.5 rounded-full border border-[#a3f3e5]">
                  Status: All 28 Subsystems Evaluated
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                <div className="p-3.5 rounded-xl bg-[#f8faff] border border-[#e6e8eb]">
                  <span className="text-[#697386] block text-[10px] uppercase font-bold">memory_limit</span>
                  <span className="text-[#0a2540] font-bold text-sm">512 MB</span>
                  <span className="text-[#00a389] text-[10px] block mt-1 font-sans">✓ Optimal for WooCommerce</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#f8faff] border border-[#e6e8eb]">
                  <span className="text-[#697386] block text-[10px] uppercase font-bold">wp-config.php</span>
                  <span className="text-[#0a2540] font-bold text-sm">0600 (Secure)</span>
                  <span className="text-[#00a389] text-[10px] block mt-1 font-sans">✓ 1-Click Auto-Fix Hardened</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#f8faff] border border-[#e6e8eb]">
                  <span className="text-[#697386] block text-[10px] uppercase font-bold">OPcache Buffer</span>
                  <span className="text-[#0a2540] font-bold text-sm">99.4% Hit Rate</span>
                  <span className="text-[#00a389] text-[10px] block mt-1 font-sans">✓ Zero wasted recompilation</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#f0f3ff] border border-[#d6dcff] flex items-center justify-between text-xs font-sans">
                <div className="text-[#4f45e5] font-semibold">
                  Update Guard detected 0 deprecation risks in pending plugin updates.
                </div>
                <span className="font-bold text-[#635bff] bg-white px-3 py-1 rounded-full border border-[#d6dcff] shadow-xs">
                  Safe to Upgrade
                </span>
              </div>
            </div>
          ) : (
            <div className="space-y-2 font-mono text-[11px] text-slate-800 bg-[#f4f4f4] p-5 rounded-xl border border-slate-300 overflow-x-auto">
              <div className="font-bold text-center border-b border-slate-300 pb-2 mb-2 text-slate-900 text-xs">
                PHP Version 8.3.8 - phpinfo() Standard Output
              </div>
              <table className="w-full text-left border-collapse border border-slate-300 bg-white">
                <tbody>
                  <tr className="border-b border-slate-200">
                    <td className="p-2 font-bold bg-[#e6e6e6] w-1/3">System</td>
                    <td className="p-2 text-slate-600">Linux web01.hosting.internal 5.15.0-89-generic #99-Ubuntu SMP</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="p-2 font-bold bg-[#e6e6e6]">Configuration File (php.ini) Path</td>
                    <td className="p-2 text-slate-600">/etc/php/8.3/fpm</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="p-2 font-bold bg-[#e6e6e6]">Loaded Configuration File</td>
                    <td className="p-2 text-slate-600">/etc/php/8.3/fpm/php.ini (Host locked: ignoring local changes)</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="p-2 font-bold bg-[#e6e6e6]">memory_limit</td>
                    <td className="p-2 text-slate-600">128M (Local Value: 128M / Master Value: 128M)</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold bg-[#e6e6e6]">display_errors</td>
                    <td className="p-2 text-rose-600 font-bold">On (Security risk: unhandled exceptions print to visitors)</td>
                  </tr>
                </tbody>
              </table>
              <div className="text-center text-slate-500 pt-2 text-[10px]">
                No recommendations · No 1-click fixes · No OPcache hit stats · No crash protection
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
