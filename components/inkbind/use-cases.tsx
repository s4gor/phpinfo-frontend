"use client";

import { motion } from "framer-motion";
import { Factory, Shirt, Printer } from "lucide-react";
import { containerVariants, itemVariants } from "@/lib/animation-variants";
import TextBlur from "@/components/ui/text-blur";

const cases = [
  {
    icon: Shirt,
    name: "Apparel wholesale",
    scenario: "Buyer wants 500 tees across sizes with a setup fee and tier pricing.",
    flow: "RFQ from product page → you adjust tiers → send PDF → 50% deposit → balance on ship.",
  },
  {
    icon: Factory,
    name: "Industrial & manufacturing",
    scenario: "Custom spec, lead time, and Net 30 for a repeat plant buyer.",
    flow: "Company profile with credit limit → quote with long validity → e-sign → invoice on terms.",
  },
  {
    icon: Printer,
    name: "Print & promo shops",
    scenario: "Every job is different - artwork, rush fee, variable quantities.",
    flow: "Hide catalog prices → quote each job → counter-offer in portal → pay now or COD.",
  },
];

export default function InkbindUseCases() {
  return (
    <motion.div
      id="use-cases"
      className="flex w-full max-w-5xl scroll-mt-28 flex-col pt-20 md:pt-28"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}>
      <motion.p
        variants={itemVariants}
        className="text-center text-xs font-bold uppercase tracking-[0.2em] text-[#0123D2]">
        Built for
      </motion.p>
      <motion.div variants={itemVariants}>
        <TextBlur
          className="text-center text-2xl font-medium tracking-tight text-zinc-900 md:text-3xl"
          text="Deals that don't fit a buy button"
        />
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
        {cases.map((c) => {
          const Icon = c.icon;
          return (
            <div
              key={c.name}
              className="group flex flex-col rounded-2xl border border-zinc-200 bg-white p-6 transition-all hover:border-[#0123D2]/25 hover:shadow-[0_0_40px_-12px_rgba(1,35,210,0.15)]">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#0123D2]/5 transition-colors group-hover:bg-[#0123D2]/10">
                <Icon className="h-5 w-5 text-[#0123D2]" strokeWidth={1.75} />
              </div>
              <h3 className="text-base font-semibold text-zinc-900">{c.name}</h3>
              <p className="mt-2 text-sm italic leading-relaxed text-zinc-500">{c.scenario}</p>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-zinc-700">{c.flow}</p>
            </div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
