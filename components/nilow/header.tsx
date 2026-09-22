"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { containerVariants, itemVariants } from "@/lib/animation-variants";
import { NILOW_PLAY_STORE_URL } from "@/lib/nilow";

export default function NilowHeader() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="border-b border-zinc-200/60 bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/70">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-3 py-2.5 sm:px-4 sm:py-3">
        <motion.div variants={itemVariants} className="flex items-center gap-2 sm:gap-3">
          <Link href="/nilow" className="flex items-center gap-2">
            <img
              src="/nilow-icon.svg"
              alt="Nilow"
              className="h-7 w-7 rounded-md sm:h-8 sm:w-8"
            />
            <span className="hidden text-sm font-semibold text-zinc-900 sm:inline">
              Nilow
            </span>
          </Link>
          <span className="hidden rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-700 md:inline">
            Split expenses
          </span>
        </motion.div>

        <motion.div variants={itemVariants} className="flex items-center gap-2">
          <Link href="/nilow/privacy" className="hidden text-sm text-zinc-600 hover:text-emerald-700 sm:inline">
            Privacy
          </Link>
          <Link href={NILOW_PLAY_STORE_URL} target="_blank" rel="noopener noreferrer">
            <Button
              size="sm"
              className="bg-emerald-600 text-white shadow-[0_0_20px_-6px_rgba(5,150,105,0.5)] transition-all duration-150 ease-linear hover:bg-emerald-700">
              <span className="hidden sm:inline">Get the app</span>
              <span className="sm:hidden">Install</span>
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
