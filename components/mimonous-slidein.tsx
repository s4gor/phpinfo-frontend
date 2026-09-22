"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import MimonousIcon from "@/components/mimonous-icon";

const DISMISS_KEY = "mimonous_slidein_dismissed";
const MIMONOUS_URL =
  "https://mimonous.com/?utm_source=exeebit&utm_medium=slidein&utm_campaign=phpinfo-wp";

export default function MimonousSlideIn() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setMounted(true);

    let dismissed = false;
    try {
      dismissed = localStorage.getItem(DISMISS_KEY) === "1";
    } catch {
      // localStorage unavailable (private mode) - treat as not dismissed
    }
    if (dismissed) return;

    // Fire on whichever comes first: a dwell timer or a scroll threshold.
    // The timer guarantees non-scrollers (e.g. visitors who land straight on
    // pricing) still see it, without an abrupt on-load pop.
    let done = false;
    const reveal = () => {
      if (done) return;
      done = true;
      setVisible(true);
      window.removeEventListener("scroll", onScroll);
      clearTimeout(timer);
    };

    const onScroll = () => {
      const scrolled = window.scrollY + window.innerHeight;
      if (scrolled >= document.documentElement.scrollHeight * 0.4) reveal();
    };

    const timer = setTimeout(reveal, 12000); // ~12s dwell fallback
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(timer);
    };
  }, []);

  const dismiss = () => {
    setVisible(false);
    try {
      localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // ignore write failures
    }
  };

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="mimonous-slidein"
          initial={{ x: -40, y: 20, opacity: 0, scale: 0.97 }}
          animate={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          exit={{ x: -40, opacity: 0, scale: 0.97 }}
          transition={{ type: "spring", stiffness: 260, damping: 26 }}
          className="fixed inset-x-4 bottom-24 z-[9998] sm:inset-x-auto sm:bottom-6 sm:left-6 sm:w-[22rem]"
        >
          <div className="relative overflow-hidden rounded-2xl bg-white shadow-[0_20px_60px_-10px_rgba(0,0,0,0.18),0_0_0_1px_rgba(0,0,0,0.06),0_0_40px_-8px_rgba(124,58,237,0.14)]">
            <div className="h-[3px] w-full bg-gradient-to-r from-[#7C3AED] via-[#A78BFA] to-[#7C3AED]" />

            <button
              onClick={dismiss}
              aria-label="Dismiss"
              className="absolute right-3 top-4 z-10 flex h-7 w-7 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="p-5">
              <div className="mb-3 flex items-center gap-2.5">
                <MimonousIcon size="sm" />
                <div className="pr-6">
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#7C3AED]">
                    From the team behind phpinfo() WP
                  </p>
                  <h3 className="text-sm font-semibold leading-tight text-zinc-900">
                    From quote to paid, minus the email mess
                  </h3>
                </div>
              </div>

              <p className="mb-3 text-xs leading-relaxed text-zinc-500">
                Send quotes, turn them into invoices, get paid - all in your
                client&apos;s dashboard. Trackable end to end.
              </p>

              <div className="mb-4 flex items-center gap-2 rounded-lg border border-[#7C3AED]/15 bg-[#7C3AED]/5 px-3 py-2">
                <span className="rounded-full bg-[#7C3AED] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white">
                  Beta
                </span>
                <span className="text-[11px] font-medium leading-tight text-zinc-600">
                  Early adopters get{" "}
                  <strong className="text-zinc-900">6 months free</strong>.
                </span>
              </div>

              <a
                href={MIMONOUS_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={dismiss}
                className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#7C3AED] py-2 text-xs font-semibold text-white shadow-[0_4px_14px_-4px_rgba(124,58,237,0.55)] transition-all hover:bg-[#6d28d9] hover:shadow-[0_4px_18px_-4px_rgba(124,58,237,0.65)] active:scale-[0.98]"
              >
                Claim your 6 months free
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
