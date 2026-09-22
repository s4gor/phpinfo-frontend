"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { grantConsent, denyConsent, getStoredConsent } from "@/lib/gtag";

export default function ConsentBanner() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = getStoredConsent();
    if (stored === "granted") {
      grantConsent();
    } else if (!stored) {
      // Slight delay so the page renders first
      const t = setTimeout(() => setVisible(true), 600);
      return () => clearTimeout(t);
    }
  }, []);

  if (!mounted) return null;

  const handleAccept = () => {
    grantConsent();
    setVisible(false);
  };

  const handleDecline = () => {
    denyConsent();
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="consent"
          initial={{ y: 100, opacity: 0, scale: 0.97 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 100, opacity: 0, scale: 0.97 }}
          transition={{ type: "spring", stiffness: 260, damping: 26, delay: 0 }}
          className="fixed inset-x-4 bottom-5 z-[9999] sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-80"
        >
          <div className="relative overflow-hidden rounded-xl bg-white shadow-[0_20px_60px_-10px_rgba(0,0,0,0.18),0_0_0_1px_rgba(0,0,0,0.06),0_0_40px_-8px_rgba(2,22,209,0.12)]">
            {/* Top accent bar */}
            <div className="h-[3px] w-full bg-gradient-to-r from-[#0216D1] via-[#1a3ae8] to-[#0216D1]" />

            <div className="p-5">
              {/* Header */}
              <div className="mb-3 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0216D1]/10 text-base">
                  🍪
                </div>
                <span className="text-sm font-semibold text-zinc-900">
                  We baked some cookies!
                </span>
              </div>

              {/* Body */}
              <p className="mb-4 text-xs leading-relaxed text-zinc-500">
                Help us understand what's working. We use analytics to improve your experience.{" "}
                <Link
                  href="/privacy"
                  className="font-medium text-[#0216D1] underline underline-offset-2 hover:text-[#0114b8]"
                >
                  Privacy policy
                </Link>
              </p>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  id="consent-accept"
                  onClick={handleAccept}
                  className="flex-1 rounded-xl bg-[#0216D1] py-2 text-xs font-semibold text-white shadow-[0_4px_14px_-4px_rgba(2,22,209,0.55)] transition-all hover:bg-[#0114b8] hover:shadow-[0_4px_18px_-4px_rgba(2,22,209,0.65)] active:scale-[0.98]"
                >
                  Accept all
                </button>
                <button
                  id="consent-decline"
                  onClick={handleDecline}
                  className="flex-1 rounded-xl border border-zinc-200 bg-zinc-50 py-2 text-xs font-semibold text-zinc-500 transition-all hover:border-zinc-300 hover:bg-zinc-100 hover:text-zinc-700 active:scale-[0.98]"
                >
                  Decline
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
