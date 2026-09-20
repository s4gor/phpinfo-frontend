"use client";

import { useState } from "react";
import { Search, Command, ArrowRight, ShieldCheck, Cpu, Flame, Wrench } from "lucide-react";
import Link from "next/link";

export default function CommandPalette() {
  const [query, setQuery] = useState("");

  const items = [
    { name: "memory_limit", cat: "Directive", mod: "Module 1", desc: "Detects host locks and avoids Out of Memory crashes during WooCommerce syncs.", icon: Cpu },
    { name: "chmod 0600 wp-config.php", cat: "Security", mod: "Module 4", desc: "1-Click Permissions Auto-Fix executes secure chmod directly via PHP.", icon: ShieldCheck },
    { name: "opcache.memory_consumption", cat: "Performance", mod: "Module 6", desc: "Real-time bytecode buffer hit rate and restart ratio telemetry.", icon: Cpu },
    { name: "Update Guard Scanner", cat: "Safety", mod: "Module 9", desc: "Flags deprecated PHP 8.3 syntax before updating plugins in WordPress.", icon: Flame },
    { name: "Safe Mode Sandbox", cat: "Troubleshooting", mod: "Module 7", desc: "Isolate faulty plugins strictly for admin without taking down live visitors.", icon: Wrench },
    { name: "Host Lock Detection", cat: "Architecture", mod: "Module 19", desc: "Identifies whether changes require .user.ini, php.ini, or host dashboard.", icon: Wrench },
  ];

  const filtered = query.trim() === "" 
    ? items 
    : items.filter(i => 
        i.name.toLowerCase().includes(query.toLowerCase()) || 
        i.desc.toLowerCase().includes(query.toLowerCase()) ||
        i.cat.toLowerCase().includes(query.toLowerCase())
      );

  return (
    <section className="py-20 relative bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-[#635bff] font-mono block mb-2">
            Spotlight Command Palette
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0a2540] tracking-tight">
            Instant Diagnostic Intelligence
          </h2>
        </div>

        {/* Command Box */}
        <div className="precision-card p-3 sm:p-4 bg-white border border-[#e6e8eb]">
          <div className="relative flex items-center mb-4">
            <Search className="absolute left-4 h-4 w-4 text-[#697386]" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search directive, module or fix (e.g. 0600, memory_limit, opcache)..."
              className="w-full pl-11 pr-24 py-3 rounded-xl bg-[#f8faff] border border-[#e6e8eb] text-sm text-[#0a2540] placeholder-[#697386] focus:outline-none focus:border-[#635bff] transition-colors"
            />
            <div className="absolute right-3 hidden sm:flex items-center gap-1 text-[11px] font-mono text-[#697386] bg-white border border-[#e6e8eb] px-2 py-1 rounded-lg">
              <Command className="h-3 w-3" />
              <span>K</span>
            </div>
          </div>

          {/* Results List */}
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {filtered.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Link
                  key={idx}
                  href="/docs"
                  className="p-3 rounded-xl hover:bg-[#f8faff] border border-transparent hover:border-[#e6e8eb] flex items-start sm:items-center justify-between gap-3 transition-all group"
                >
                  <div className="flex items-start sm:items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-[#f0f3ff] border border-[#d6dcff] flex items-center justify-center shrink-0">
                      <Icon className="h-4 w-4 text-[#635bff]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#0a2540] group-hover:text-[#635bff] transition-colors">
                          {item.name}
                        </span>
                        <span className="text-[10px] font-bold text-[#697386] bg-white border border-[#e6e8eb] px-1.5 py-0.5 rounded-full">
                          {item.mod}
                        </span>
                      </div>
                      <p className="text-xs text-[#425466] line-clamp-1 mt-0.5 font-normal">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-[#697386] group-hover:text-[#635bff] group-hover:translate-x-0.5 transition-all shrink-0 hidden sm:block" />
                </Link>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
