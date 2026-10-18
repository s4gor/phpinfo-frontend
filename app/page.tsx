"use client";

import { useState } from "react";
import { toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, Lock } from "lucide-react";
import CTA from "@/components/cta";
import Features from "@/components/logos";
import UseCases from "@/components/use-cases";
import Testimonials from "@/components/testimonials";
import Pricing from "@/components/pricing";
import FAQ from "@/components/faq";
import Founder from "@/components/founder";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ExeebitBar from "@/components/exeebit-bar";
import WhatsAppWidget from "@/components/whatsapp-widget";

const TIER_LABELS: Record<string, string> = {
  single: "Single Site Pro",
  unlimited: "Unlimited License",
  lifetime: "Lifetime License",
};

export default function Home() {
  const [loadingTier, setLoadingTier] = useState<string | null>(null);
  const [redirecting, setRedirecting] = useState(false);

  const handleBuy = async (tier: "single" | "unlimited" | "lifetime") => {
    setLoadingTier(tier);
    setRedirecting(false);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        cache: "no-store",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier }),
      });

      if (!res.ok) {
        setLoadingTier(null);
        if (res.status === 429) {
          toast.error("Too many attempts. Please try again in a minute.");
          return;
        }
        toast.error("Couldn't start checkout. Please try again.");
        return;
      }

      const data = await res.json();
      if (!data?.url) {
        setLoadingTier(null);
        toast.error("Couldn't start checkout. Please try again.");
        return;
      }

      setRedirecting(true);
      setTimeout(() => {
        window.location.href = data.url;
      }, 700);
    } catch {
      setLoadingTier(null);
      setRedirecting(false);
      toast.error("Network error. Please check your connection and try again.");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center overflow-x-clip pt-24 sm:pt-28 lg:pt-36">
      {/* Top Floating Secure Checkout Redirect Notification */}
      <AnimatePresence>
        {loadingTier && (
          <>
            <div className="fixed top-5 inset-x-0 z-[100] flex justify-center pointer-events-none px-4">
              <motion.div
                initial={{ opacity: 0, y: -24, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -24, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 450, damping: 30 }}
                className="pointer-events-auto flex items-center gap-3.5 rounded-2xl border border-violet-200/90 bg-white/95 px-5 py-3 shadow-[0_12px_45px_-10px_rgba(124,58,237,0.25)] backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/95">
                <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-100/90 text-violet-700 dark:bg-violet-950/50 dark:text-violet-300">
                  <Loader2 className="h-4 w-4 animate-spin text-violet-600 dark:text-violet-400" />
                </div>
                <div className="flex flex-col text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                      {redirecting ? "Redirecting to Stripe…" : "Connecting to Secure Checkout…"}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950/40 dark:border-emerald-800/60 dark:text-emerald-300">
                      <Lock className="h-2.5 w-2.5" />
                      256-bit SSL
                    </span>
                  </div>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">
                    Securing your {TIER_LABELS[loadingTier] || "Pro"} license…
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Smooth overlay to prevent dark screen flashes during browser handoff */}
            {redirecting && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[95] bg-white/75 dark:bg-zinc-950/75 backdrop-blur-xs pointer-events-none"
              />
            )}
          </>
        )}
      </AnimatePresence>

      <div className="fixed left-0 right-0 top-0 z-[60]">
        <ExeebitBar />
        <Header />
      </div>

      <section className="flex w-full flex-col items-center px-4 sm:px-6 lg:px-8 pt-4">
        <CTA />

        <Features />

        <UseCases />

        <Testimonials />

        <Pricing onBuy={handleBuy} loadingTier={loadingTier} />

        <FAQ />

        <Founder />
      </section>

      <Footer />

      <WhatsAppWidget />
    </main>
  );
}
