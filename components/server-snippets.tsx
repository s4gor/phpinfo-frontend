"use client";

import { useState } from "react";
import { Server, Zap, Shield, AlertOctagon, Lock } from "lucide-react";
import TextBlur from "./ui/text-blur";
import { cn } from "@/lib/utils";

interface Snippet {
  id: string;
  title: string;
  desc: string;
  icon: any;
  apache: string;
  nginx: string;
}

const snippets: Snippet[] = [
  {
    id: "gzip",
    title: "Aggressive GZIP / Brotli Compression",
    desc: "Compresses HTML, CSS, JS, and JSON before sending it to the browser. Massively reduces page size and improves Time to First Byte (TTFB).",
    icon: Zap,
    apache: `<IfModule mod_deflate.c>
    # Aggressive GZIP / Brotli Compression Rules
    # [LOCKED] Get phpinfo() WP Pro to access this optimization rule.
</IfModule>`,
    nginx: `gzip on;
# Aggressive GZIP / Brotli Compression Rules
# [LOCKED] Get phpinfo() WP Pro to access this optimization rule.`
  },
  {
    id: "browser_cache",
    title: "Browser Caching (Expires Headers)",
    desc: "Instructs browsers to save static assets (images, fonts, css) locally for 1 year, drastically speeding up repeat visits.",
    icon: Server,
    apache: `<IfModule mod_expires.c>
    ExpiresActive On
    # Browser Caching & Expires Headers Configuration
    # [LOCKED] Get phpinfo() WP Pro to access this optimization rule.
</IfModule>`,
    nginx: `location ~* \\.(jpg|jpeg|gif|png|webp|ico|css|js|woff2|woff|ttf)$ {
    # Browser Caching & Expires Headers Configuration
    # [LOCKED] Get phpinfo() WP Pro to access this optimization rule.
}`
  },
  {
    id: "security",
    title: "Security Headers (Basic)",
    desc: "Prevents clickjacking (X-Frame-Options) and MIME-type sniffing (X-Content-Type-Options) to protect your site and users.",
    icon: Shield,
    apache: `<IfModule mod_headers.c>
    # Security Headers (Basic) Configuration
    # [LOCKED] Get phpinfo() WP Pro to access this optimization rule.
</IfModule>`,
    nginx: `# Security Headers (Basic) Configuration
# [LOCKED] Get phpinfo() WP Pro to access this optimization rule.`
  },
  {
    id: "bots",
    title: "Block Bad Bots (Basic)",
    desc: "Blocks common aggressive scrapers and vulnerability scanners to save server CPU and bandwidth.",
    icon: AlertOctagon,
    apache: `<IfModule mod_rewrite.c>
    RewriteEngine On
    # Block Bad Bots (Basic) Rewrite Rules
    # [LOCKED] Get phpinfo() WP Pro to access this optimization rule.
</IfModule>`,
    nginx: `# Block Bad Bots (Basic) Rules
# [LOCKED] Get phpinfo() WP Pro to access this optimization rule.`
  }
];

export default function ServerSnippets() {
  const [serverType, setServerType] = useState<"apache" | "nginx">("apache");
  const [activeTab, setActiveTab] = useState<string>("gzip");

  const activeSnippet = snippets.find((s) => s.id === activeTab) || snippets[0];
  const codeToCopy = serverType === "apache" ? activeSnippet.apache : activeSnippet.nginx;

  return (
    <div
      id="snippets"
      className="flex w-full max-w-5xl flex-col gap-2 pt-16 md:pt-24"
    >
      <div>
        <TextBlur
          className="text-center text-2xl font-medium tracking-tight text-zinc-800 md:text-3xl"
          text="Web Server Snippet Library"
        />
      </div>
      <div>
        <TextBlur
          className="mx-auto max-w-[34rem] text-center text-base text-zinc-700 sm:text-lg"
          text="Copy production-ready optimization and security rules, or let the Pro plugin inject them with one click."
          duration={0.8}
        />
      </div>

      {/* Server Type Toggle */}
      <div className="mt-8 flex justify-center">
        <div className="flex rounded-lg border border-zinc-200 bg-zinc-100/80 p-1">
          <button
            onClick={() => setServerType("apache")}
            className={cn(
              "rounded-md px-4 py-1.5 text-xs font-semibold transition-all duration-150",
              serverType === "apache"
                ? "bg-white text-zinc-950 shadow-sm"
                : "text-zinc-600 hover:text-zinc-900"
            )}
          >
            Apache / LiteSpeed (.htaccess)
          </button>
          <button
            onClick={() => setServerType("nginx")}
            className={cn(
              "rounded-md px-4 py-1.5 text-xs font-semibold transition-all duration-150",
              serverType === "nginx"
                ? "bg-white text-zinc-950 shadow-sm"
                : "text-zinc-600 hover:text-zinc-900"
            )}
          >
            Nginx (nginx.conf)
          </button>
        </div>
      </div>

      {/* Snippets Interface Grid */}
      <div
        className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8"
      >
        {/* Left Column: Snippet Selector Tabs */}
        <div className="flex flex-col gap-2 md:col-span-5">
          {snippets.map((s) => {
            const Icon = s.icon;
            const isActive = s.id === activeTab;
            return (
              <button
                key={s.id}
                onClick={() => {
                  setActiveTab(s.id);
                }}
                className={cn(
                  "flex flex-col items-start rounded-xl border p-4 text-left transition-all duration-150",
                  isActive
                    ? "border-violet-400 bg-violet-50/50 shadow-sm"
                    : "border-zinc-200 bg-white/40 hover:border-zinc-300 hover:bg-white/80"
                )}
              >
                <div className="flex items-center gap-2.5">
                  <span className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-md",
                    isActive ? "bg-violet-100 text-violet-700" : "bg-zinc-100 text-zinc-600"
                  )}>
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="font-semibold text-zinc-900 text-sm">
                    {s.title}
                  </span>
                </div>
                <p className="mt-2 text-xs text-zinc-600 leading-relaxed">
                  {s.desc}
                </p>
              </button>
            );
          })}
        </div>

        {/* Right Column: Code Editor View */}
        <div className="flex flex-col md:col-span-7">
          <div className="flex h-full flex-col overflow-hidden rounded-xl border border-zinc-700 bg-zinc-950 shadow-lg">
            {/* Terminal Header */}
            <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900 px-4 py-3">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
                <span className="ml-2.5 font-mono text-[10px] text-zinc-500">
                  {serverType === "apache" ? ".htaccess" : "nginx.conf"}
                </span>
              </div>
              <a
                href="#pricing"
                className="flex items-center gap-1.5 rounded-md border border-violet-800/40 bg-violet-950/20 px-2.5 py-1 text-xs font-semibold text-violet-400 transition hover:bg-violet-900/40 hover:text-violet-200"
              >
                <Lock className="h-3 w-3" />
                <span>Pro Feature</span>
              </a>
            </div>

            {/* Terminal Code Body with Lock Overlay */}
            <div className="relative flex-1 min-h-[180px] overflow-hidden p-4 font-mono text-[11.5px] leading-relaxed text-zinc-300">
              <pre className="whitespace-pre overflow-x-auto selection:bg-violet-500/30 selection:text-white blur-[4px] opacity-25 pointer-events-none select-none">
                {codeToCopy}
              </pre>
              
              {/* Lock Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950/30 p-4 text-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-500/10 text-violet-400 mb-3 shadow-[0_0_20px_rgba(167,139,250,0.15)]">
                  <Lock className="h-5 w-5" />
                </div>
                <h4 className="font-semibold text-zinc-200 text-xs tracking-wide uppercase">
                  Locked in Free Version
                </h4>
                <p className="mt-1.5 max-w-[220px] text-[10px] text-zinc-400 leading-normal">
                  Unlock this snippet and make your site up to 2x faster.
                </p>
                <a
                  href="#pricing"
                  className="mt-4 rounded-md bg-violet-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-violet-500"
                >
                  Unlock with Pro
                </a>
              </div>
            </div>

            {/* Terminal Info Footer */}
            <div className="border-t border-zinc-800/60 bg-zinc-900/50 px-4 py-2.5 text-center text-[10.5px] text-zinc-500">
              💡 Pro tip: phpinfo() WP Pro includes a 1-click installer with safety backups and automated rollbacks.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
