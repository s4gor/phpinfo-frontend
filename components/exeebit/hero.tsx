"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import TextBlur from "@/components/ui/text-blur";
import AnimatedShinyText from "@/components/ui/shimmer-text";
import { containerVariants, itemVariants } from "@/lib/animation-variants";
import { ArrowRight } from "lucide-react";

export default function ExeebitHero() {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex w-full max-w-3xl flex-col items-center gap-3 pt-24 md:pt-28">

      <motion.div variants={itemVariants}>
        <div className="flex items-center justify-center">
          <div className="flex w-fit items-center justify-center rounded-full bg-muted/80 text-center">
            <AnimatedShinyText className="px-4 py-1 text-sm text-[#0216D1]/70">
              <span>Empowering Innovation, Enabling Tomorrow</span>
            </AnimatedShinyText>
          </div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <TextBlur
          className="text-center text-5xl font-medium tracking-tighter text-zinc-900 sm:text-6xl md:text-7xl"
          text="empowering innovation"
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <TextBlur
          className="mx-auto max-w-2xl pt-3 text-center text-base leading-relaxed text-zinc-600 sm:text-lg"
          text="At Exeebit, we believe in building things that seem small at first but have the potential to create real impact. From the very beginning, we've worked on projects that might have looked like experiments, but each one has taught us something valuable and brought us closer to our vision."
          duration={0.8}
        />
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="mt-6 flex items-center gap-3">
        <Link
          href="#products"
          className="inline-flex items-center gap-2 rounded-md bg-[#0216D1] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-150 hover:bg-[#0114B0]">
          See our products
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="mailto:emran@exeebit.com"
          className="inline-flex items-center rounded-md border border-border bg-white px-5 py-2.5 text-sm font-semibold text-zinc-900 transition-all duration-150 hover:bg-zinc-100">
          Get in touch
        </Link>
      </motion.div>
    </motion.section>
  );
}
