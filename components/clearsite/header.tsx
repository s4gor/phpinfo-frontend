"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { containerVariants, itemVariants } from "@/lib/animation-variants";

export default function ClearSiteHeader() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="border-b border-zinc-200/60 bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/70">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-3 py-2.5 sm:px-4 sm:py-3">
        <motion.div variants={itemVariants} className="flex items-center gap-2 sm:gap-3">
          <Link href="/clearsite" className="flex items-center gap-2">
            <img
              src="/clearsite-icon.png"
              alt="ClearSite"
              className="h-7 w-7 rounded-md sm:h-8 sm:w-8"
            />
            <span className="hidden text-sm font-semibold text-zinc-900 sm:inline">
              ClearSite
            </span>
          </Link>
          <span className="hidden rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-blue-700 md:inline">
            100% local
          </span>
        </motion.div>

        <motion.div variants={itemVariants} className="flex items-center gap-2">
          <Link href="/clearsite/privacy" className="hidden text-sm text-zinc-600 hover:text-blue-700 sm:inline">
            Privacy
          </Link>
          <Link href="#pricing">
            <Button
              size="sm"
              className="bg-blue-600 text-white shadow-[0_0_20px_-6px_rgba(37,99,235,0.5)] transition-all duration-150 ease-linear hover:bg-blue-700">
              <span className="hidden sm:inline">Get Pro</span>
              <span className="sm:hidden">Pro</span>
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
