"use client";

import { motion } from "framer-motion";
import {
  MessageSquareQuote,
  FileEdit,
  Send,
  PenLine,
  CreditCard,
  PackageCheck,
} from "lucide-react";
import { containerVariants, itemVariants } from "@/lib/animation-variants";
import TextBlur from "@/components/ui/text-blur";

const steps = [
  {
    icon: MessageSquareQuote,
    title: "Request",
    desc: "Buyer submits RFQ from your storefront - custom fields, quantities, specs.",
  },
  {
    icon: FileEdit,
    title: "Quote",
    desc: "You build the deal: line items, volume tiers, discounts, payment terms.",
  },
  {
    icon: Send,
    title: "Send",
    desc: "Branded PDF and shareable link. Buyer gets email with portal access.",
  },
  {
    icon: PenLine,
    title: "Sign",
    desc: "Customer accepts with e-signature on the quote page - audit trail included.",
  },
  {
    icon: CreditCard,
    title: "Pay",
    desc: "Deposit now + balance later, pay now, net terms, or COD - per deal.",
  },
  {
    icon: PackageCheck,
    title: "Order",
    desc: "Real Shopify draft order and checkout. Fulfill like any other sale.",
  },
];

export default function InkbindQuoteFlow() {
  return (
    <motion.div
      id="how-it-works"
      className="flex w-full max-w-5xl scroll-mt-28 flex-col pt-20 md:pt-28"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}>
      <motion.p
        variants={itemVariants}
        className="text-center text-xs font-bold uppercase tracking-[0.2em] text-[#0123D2]">
        How it works
      </motion.p>
      <motion.div variants={itemVariants}>
        <TextBlur
          className="text-center text-2xl font-medium tracking-tight text-zinc-900 md:text-3xl"
          text="RFQ to paid order - one thread"
        />
      </motion.div>
      <motion.p
        variants={itemVariants}
        className="mx-auto mt-3 max-w-lg text-center text-sm leading-relaxed text-zinc-600">
        No spreadsheet handoffs. No &ldquo;accepted&rdquo; quotes that never become orders.
        Every step lives in Shopify.
      </motion.p>

      <motion.div
        variants={itemVariants}
        className="relative mt-12 hidden md:block">
        <div
          className="absolute left-[8%] right-[8%] top-7 h-px bg-gradient-to-r from-transparent via-[#0123D2]/25 to-transparent"
          aria-hidden="true"
        />
        <ol className="grid grid-cols-6 gap-3">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <li key={step.title} className="relative flex flex-col items-center text-center">
                <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#0123D2]/15 bg-white shadow-[0_0_30px_-10px_rgba(1,35,210,0.35)]">
                  <Icon className="h-6 w-6 text-[#0123D2]" strokeWidth={1.75} />
                </div>
                <span className="mt-3 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-1 text-sm font-semibold text-zinc-900">{step.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-zinc-500">{step.desc}</p>
              </li>
            );
          })}
        </ol>
      </motion.div>

      <motion.ol
        variants={itemVariants}
        className="relative mt-10 flex flex-col gap-0 md:hidden">
        <div
          className="absolute bottom-4 left-[27px] top-4 w-px bg-[#0123D2]/15"
          aria-hidden="true"
        />
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <li key={step.title} className="relative flex gap-4 pb-8 last:pb-0">
              <div className="relative z-10 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl border border-[#0123D2]/15 bg-white">
                <Icon className="h-5 w-5 text-[#0123D2]" strokeWidth={1.75} />
              </div>
              <div className="pt-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                  Step {i + 1} · {step.title}
                </span>
                <p className="mt-1 text-sm leading-relaxed text-zinc-600">{step.desc}</p>
              </div>
            </li>
          );
        })}
      </motion.ol>
    </motion.div>
  );
}
