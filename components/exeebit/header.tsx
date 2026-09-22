"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/lib/animation-variants";

export default function ExeebitHeader() {
  return (
    <motion.header
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="fixed left-0 right-0 top-0 z-[50] border-b border-zinc-200 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
      <motion.div variants={itemVariants}>
        <Link href="/" className="flex items-center gap-2 text-foreground">
          <Image 
            src="/logo-main.webp" 
            alt="Exeebit Logo" 
            width={24} 
            height={24} 
            className="h-10 w-10 object-contain" 
          />
          <span className="text-sm text-zinc-600">Exeebit</span>
        </Link>
      </motion.div>

      <motion.nav
        variants={itemVariants}
        className="flex items-center gap-6 text-sm text-zinc-600">
        <Link
          href="/#products"
          className="transition-colors hover:text-[#0216D1]">
          Products
        </Link>
        <Link
          href="/#about"
          className="transition-colors hover:text-[#0216D1]">
          About
        </Link>
        <Link
          href="mailto:emran@exeebit.com"
          className="transition-colors hover:text-[#0216D1]">
          Contact
        </Link>
      </motion.nav>
      </div>
    </motion.header>
  );
}
