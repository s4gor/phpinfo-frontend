"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { SiWordpress } from "react-icons/si";
import { BookOpen } from "lucide-react";
import AnimatedArrow from "@/components/ui/animated-arrow";

import { containerVariants, itemVariants } from "@/lib/animation-variants";

export default function Header() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="border-b border-zinc-200/60 bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/70">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-3 py-2.5 sm:px-4 sm:py-3">
        <motion.div variants={itemVariants} className="flex items-center gap-1.5 sm:gap-2.5">
          <Link href="/" className="flex items-center gap-2 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.svg"
              alt="phpinfo() WP logo"
              style={{ height: "30px", width: "auto" }}
              className="h-[34px] w-auto shrink-0 object-contain transition-transform duration-200 group-hover:scale-105"
            />
            <div className="flex flex-col justify-center">
              <span className="text-base font-bold tracking-tight text-zinc-900 sm:text-[17px] leading-tight">
                phpinfo<span className="text-zinc-900">()</span>{" "}
                <span className="text-violet-600 font-extrabold">WP</span>
              </span>
              <span className="hidden sm:inline-block text-[11px] font-medium tracking-wide text-zinc-500 leading-none mt-0.5">
                Server Intelligence. Zero Crashes.
              </span>
            </div>
          </Link>
          <Link
            href="https://wordpress.org/plugins//"
            rel="noopener noreferrer"
            target="_blank"
            className="hidden lg:inline-flex">
            <Button
              size="sm"
              variant="ghost"
              className="rounded-xl text-zinc-700 transition-colors hover:bg-zinc-100/70 hover:text-violet-700">
              <SiWordpress className="mr-1.5" />
              <span>Free plugin</span>
            </Button>
          </Link>
          <Link href="/docs">
            <Button
              size="sm"
              variant="ghost"
              className="rounded-xl text-zinc-700 transition-colors hover:bg-zinc-100/70 hover:text-violet-700">
              <BookOpen className="mr-1.5 h-3.5 w-3.5 text-violet-500" />
              <span>Docs</span>
            </Button>
          </Link>
          <Link href="/changelog" className="hidden sm:inline-flex">
            <Button
              size="sm"
              variant="ghost"
              className="rounded-xl text-zinc-700 transition-colors hover:bg-zinc-100/70 hover:text-violet-700">
              <span>Changelog</span>
            </Button>
          </Link>
        </motion.div>

        <motion.div variants={itemVariants} className="flex items-center gap-2">
          <Link
            href="https://wordpress.org/plugins//"
            rel="noopener noreferrer"
            target="_blank"
            className="lg:hidden">
            <Button
              size="sm"
              variant="ghost"
              className="rounded-xl px-2 text-zinc-700 hover:text-violet-700"
              aria-label="Free WordPress plugin">
              <SiWordpress className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/#pricing">
            <Button
              size="sm"
              className="group rounded-xl bg-violet-500 px-4 sm:px-5 text-white shadow-[0_0_20px_-6px_rgba(167,139,250,0.6)] transition-all duration-150 ease-linear hover:bg-violet-600">
              <span className="hidden sm:inline">Get Pro</span>
              <span className="sm:hidden">From $39/yr</span>
              <AnimatedArrow className="ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
