"use client";

import { useState } from "react";
import { X, MessageCircle, Send, Sparkles } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

interface WhatsAppWidgetProps {
  phoneNumber?: string; // Optional WhatsApp phone number e.g. "1234567890"
  defaultMessage?: string;
}

export default function WhatsAppWidget({
  phoneNumber = "491755075508",
  defaultMessage = "Hi Exeebit team, I have a question about phpinfo() WP licenses...",
}: WhatsAppWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-3 pointer-events-auto">
      {/* Popup Message Box */}
      {isOpen && (
        <div
          className="relative w-80 rounded-xl border border-zinc-200/90 bg-white/95 p-4 shadow-2xl backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/95">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close message"
              className="absolute right-3 top-3 rounded-full p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 transition-colors">
              <X className="h-4 w-4" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <div className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white shadow-md">
                <FaWhatsapp className="h-6 w-6" />
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-white" />
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="truncate text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    Exeebit Team
                  </span>
                  <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[9px] font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    Online
                  </span>
                </div>
                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                  Typically replies in a few minutes
                </span>
              </div>
            </div>

            {/* Content Body */}
            <div className="my-3 rounded-xl bg-emerald-50/70 p-3 text-xs leading-relaxed text-zinc-800 dark:bg-emerald-950/40 dark:text-zinc-200">
              <p className="font-semibold text-emerald-950 dark:text-emerald-200 mb-1 flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
                Confused about which plan to pick?
              </p>
              Have a pre-purchase question or need custom advice for your site setup? Chat directly with our team!
            </div>

            {/* Action CTA */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-md transition-all hover:bg-emerald-700 hover:shadow-lg active:scale-[0.98]">
              <FaWhatsapp className="h-4 w-4" />
              <span>Talk to the Team on WhatsApp</span>
              <Send className="h-3.5 w-3.5 opacity-80" />
            </a>
          </div>
        )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open WhatsApp Chat"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-xl transition-all duration-300 hover:scale-110 hover:bg-emerald-600 active:scale-95">
        {/* Pulsing ring indicator */}
        {!isOpen && (
          <span className="absolute -inset-1 animate-ping rounded-full bg-emerald-400/50 opacity-75 duration-1000" />
        )}

        {isOpen ? (
          <X className="h-6 w-6 transition-transform duration-200" />
        ) : (
          <FaWhatsapp className="h-7 w-7 transition-transform duration-200 group-hover:rotate-12" />
        )}

        {/* Unread dot badge when closed */}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-400 text-[10px] font-extrabold text-zinc-950 ring-2 ring-white shadow-sm">
            1
          </span>
        )}
      </button>
    </div>
  );
}
