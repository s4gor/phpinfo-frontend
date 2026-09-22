"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { containerVariants, itemVariants } from "@/lib/animation-variants";
import TextBlur from "@/components/ui/text-blur";

export default function ExeebitAbout() {
  return (
    <motion.section
      id="about"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="flex w-full max-w-3xl flex-col items-center gap-4 pt-24 pb-16 text-center md:pt-32">

      <motion.div variants={itemVariants}>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0216D1]">
          About
        </p>
      </motion.div>

      <motion.div variants={itemVariants}>
        <TextBlur
          className="text-3xl font-medium tracking-tight text-zinc-900 sm:text-4xl"
          text="Made with care by one person."
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <TextBlur
          className="max-w-2xl pt-2 text-base leading-relaxed text-zinc-600"
          text="Exeebit is the studio I (Emran Hossain Sagor, @s4gor) use to ship developer tools and B2B software. Based in Germany. Seven years of building things; some that worked, plenty that didn't. The lesson keeps being the same: stay small, ship slowly, listen well."
          duration={0.8}
        />
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-zinc-500">
        <Link
          href="mailto:emran@exeebit.com"
          className="transition-colors hover:text-[#0216D1]">
          emran@exeebit.com
        </Link>
        <span className="text-zinc-300">·</span>
        <Link
          href="https://s4gor.exeebit.com"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-[#0216D1]">
          Portfolio
        </Link>
        <span className="text-zinc-300">·</span>
        <Link
          href="https://x.com/exeebit"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-[#0216D1]">
          @exeebit
        </Link>
        <span className="text-zinc-300">·</span>
        <Link
          href="https://github.com/exeebit"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-[#0216D1]">
          GitHub
        </Link>
      </motion.div>
    </motion.section>
  );
}
