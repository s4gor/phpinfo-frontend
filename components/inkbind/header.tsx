"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { containerVariants, itemVariants } from "@/lib/animation-variants";
import { INKBIND_APP_STORE_URL } from "@/lib/inkbind";

export default function InkbindHeader() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="border-b border-zinc-200/60 bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/70">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-3 py-2.5 sm:px-4 sm:py-3">
        <motion.div variants={itemVariants} className="flex items-center gap-2 sm:gap-3">
          <Link href="/inkbind" className="flex items-center gap-2">
            <img
              src="/inkbind-icon.svg"
              alt="Inkbind"
              className="h-7 w-7 rounded-md sm:h-8 sm:w-8"
            />
            <span className="hidden text-sm font-semibold text-zinc-900 sm:inline">
              Inkbind
            </span>
          </Link>
          <span className="hidden rounded-full border border-[#0123D2]/20 bg-[#0123D2]/5 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#0123D2] md:inline">
            Shopify quotes & deposits
          </span>
        </motion.div>

        <motion.div variants={itemVariants} className="flex items-center gap-2">
          <Link
            href="#payment"
            className="hidden text-sm text-zinc-600 hover:text-[#0123D2] sm:inline">
            Payments
          </Link>
          <Link
            href="#pricing"
            className="hidden text-sm text-zinc-600 hover:text-[#0123D2] md:inline">
            Pricing
          </Link>
          <Link href={INKBIND_APP_STORE_URL} target="_blank" rel="noopener noreferrer">
            <Button
              size="sm"
              className="bg-[#0123D2] text-white shadow-[0_0_20px_-6px_rgba(1,35,210,0.5)] transition-all duration-150 ease-linear hover:bg-[#0119a8]">
              <span className="hidden sm:inline">Install on Shopify</span>
              <span className="sm:hidden">Install</span>
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
