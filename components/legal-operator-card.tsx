import React from "react";
import { MapPin, Mail, Phone, Globe, ShieldCheck } from "lucide-react";

interface LegalOperatorCardProps {
  title?: string;
  roleLabel?: string;
  badgeLabel?: string;
  showWebsite?: boolean;
  compact?: boolean;
  className?: string;
}

export default function LegalOperatorCard({
  title = "Emran Hossain Sagor",
  roleLabel,
  badgeLabel = "Registered Software Studio (Germany)",
  showWebsite = true,
  compact = false,
  className = "",
}: LegalOperatorCardProps) {
  if (compact) {
    return (
      <div
        className={`not-prose my-3 rounded-xl border border-zinc-200/80 bg-zinc-50/70 p-4 shadow-2xs dark:border-zinc-800/80 dark:bg-zinc-900/60 ${className}`}>
        <div className="flex items-center justify-between gap-2 pb-3 border-b border-zinc-200/60 dark:border-zinc-800/60">
          <div className="flex items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/founder.jpg"
              alt="Emran Hossain Sagor"
              className="h-8 w-8 rounded-full object-cover border border-zinc-200 dark:border-zinc-700"
              onError={(e) => {
                const img = e.currentTarget as HTMLImageElement;
                img.style.display = "none";
              }}
            />
            <div>
              <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                <span>{title}</span>
              </div>
              <div className="text-[11px] text-zinc-500 dark:text-zinc-400">
                Founder &amp; Lead Developer · phpinfo() WP
              </div>
            </div>
          </div>
          {badgeLabel && (
            <span className="text-[10px] font-medium text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full border border-zinc-200/60 dark:border-zinc-700/60 hidden sm:inline-block">
              {badgeLabel}
            </span>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 text-xs">
          <div className="pl-3 border-l-2 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 space-y-0.5 leading-snug">
            <div className="font-semibold text-zinc-900 dark:text-zinc-100">Peter-Hille-Weg 13</div>
            <div>33098 Paderborn</div>
            <div className="text-zinc-500">Germany</div>
          </div>
          <div className="pl-3 border-l-2 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-zinc-400 text-[10px] w-10">Email:</span>
              <a
                href="mailto:support@phpinfowp.com"
                className="font-mono text-[11px] text-violet-600 dark:text-violet-400 underline hover:text-violet-700">
                support@phpinfowp.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-zinc-400 text-[10px] w-10">Phone:</span>
              <a
                href="tel:+491755075508"
                className="font-mono text-[11px] text-zinc-700 dark:text-zinc-300 hover:text-violet-600">
                +49 175 5075508
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`not-prose my-4 rounded-2xl border border-zinc-200/90 bg-gradient-to-b from-white to-zinc-50/70 p-5 sm:p-6 shadow-xs dark:border-zinc-800/90 dark:from-zinc-900 dark:to-zinc-900/60 ${className}`}>
      {/* Top Header: Founder Identity & Status Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-200/80 dark:border-zinc-800/80">
        <div className="flex items-center gap-3.5">
          <div className="relative shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/founder.jpg"
              alt="Emran Hossain Sagor - Founder & Lead Developer"
              className="h-11 w-11 rounded-full object-cover border border-zinc-200/90 dark:border-zinc-700 shadow-2xs"
              onError={(e) => {
                const img = e.currentTarget as HTMLImageElement;
                img.style.display = "none";
              }}
            />
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[15px] font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                {title}
              </span>
            </div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 flex items-center gap-1.5 flex-wrap">
              <span>Founder &amp; Lead Developer</span>
              <span>&bull;</span>
              <span className="font-semibold text-zinc-800 dark:text-zinc-200">phpinfo() WP</span>
            </div>
          </div>
        </div>

        {/* Legal Form Pill */}
        {badgeLabel && (
          <div className="inline-flex items-center gap-1.5 self-start sm:self-center rounded-full bg-zinc-100/90 dark:bg-zinc-800/90 px-3 py-1 text-[11px] font-medium text-zinc-700 dark:text-zinc-300 border border-zinc-200/80 dark:border-zinc-700/80 shrink-0 shadow-2xs">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>{badgeLabel}</span>
          </div>
        )}
      </div>

      {/* Two-Column Grid: Address & Direct Contact */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4 text-xs sm:text-[13px]">
        {/* Column 1: Postal Address */}
        <div className="space-y-2">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-zinc-400" />
            <span>Registered Business Address</span>
          </div>
          <div className="pl-3.5 border-l-2 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
            <div className="font-semibold text-zinc-900 dark:text-zinc-100">Peter-Hille-Weg 13</div>
            <div>33098 Paderborn</div>
            <div className="text-zinc-500 dark:text-zinc-400">Germany</div>
          </div>
        </div>

        {/* Column 2: Direct Contact Channels */}
        <div className="space-y-2">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 flex items-center gap-1.5">
            <Mail className="h-3.5 w-3.5 text-zinc-400" />
            <span>Official Direct Contact</span>
          </div>
          <div className="pl-3.5 border-l-2 border-zinc-200 dark:border-zinc-800 space-y-1.5 text-zinc-700 dark:text-zinc-300">
            <div className="flex items-center gap-2">
              <span className="text-zinc-400 text-[11px] w-12 shrink-0">Email:</span>
              <a
                href="mailto:support@phpinfowp.com"
                className="font-mono text-xs text-zinc-800 dark:text-zinc-200 hover:text-violet-600 dark:hover:text-violet-400 underline underline-offset-2 transition-colors">
                support@phpinfowp.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-zinc-400 text-[11px] w-12 shrink-0">Phone:</span>
              <a
                href="tel:+491755075508"
                className="font-mono text-xs text-zinc-800 dark:text-zinc-200 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                +49 175 5075508
              </a>
            </div>
            {showWebsite && (
              <div className="flex items-center gap-2">
                <span className="text-zinc-400 text-[11px] w-12 shrink-0">Web:</span>
                <a
                  href="https://phpinfowp.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                  <Globe className="h-3 w-3 text-zinc-400" />
                  <span>phpinfowp.com</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
