"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Percent, CalendarClock, Banknote } from "lucide-react";
import { containerVariants, itemVariants } from "@/lib/animation-variants";
import TextBlur from "@/components/ui/text-blur";
import { cn } from "@/lib/utils";

const paths = [
  {
    id: "deposit",
    icon: Percent,
    label: "Deposit",
    tagline: "50% now, balance later",
    total: "$2,140.00 due today",
    breakdown: [
      { label: "Deposit (50%)", value: "$2,140.00" },
      { label: "Balance due on shipment", value: "$2,140.00" },
      { label: "Balance invoice", value: "Emailed when you're ready" },
    ],
    outcome: "Collect a deposit at accept. Send the balance invoice from admin when you're ready - or automate it on Pro / on shipment.",
    badge: "Plus-only natively - included here",
  },
  {
    id: "pay_now",
    icon: Zap,
    label: "Pay now",
    tagline: "Checkout today",
    total: "$4,280.00",
    breakdown: [
      { label: "Subtotal (250 units × tier price)", value: "$4,000.00" },
      { label: "Shipping", value: "$180.00" },
      { label: "Tax", value: "$100.00" },
    ],
    outcome: "Buyer pays in full at Shopify checkout. Order created immediately - same as a normal sale, but priced from the quote.",
    badge: "Fastest close",
  },
  {
    id: "net",
    icon: CalendarClock,
    label: "Net terms",
    tagline: "Net 30 · company credit",
    total: "$4,280.00",
    breakdown: [
      { label: "Payment terms", value: "Net 30" },
      { label: "Company credit limit", value: "$25,000" },
      { label: "Due date", value: "Aug 8, 2026" },
    ],
    outcome: "Trusted B2B buyers check out on terms. Credit limits and company profiles keep repeat wholesale accounts in control.",
    badge: "Repeat buyers",
  },
  {
    id: "cod",
    icon: Banknote,
    label: "COD",
    tagline: "Pay on delivery",
    total: "$4,280.00",
    breakdown: [
      { label: "Order confirmed", value: "At accept" },
      { label: "Payment collected", value: "On delivery" },
      { label: "Mark paid in admin", value: "One click" },
    ],
    outcome: "Confirm the order without upfront payment - ideal for COD-heavy regions and freight-on-delivery workflows.",
    badge: "LATAM · MENA · APAC",
  },
];

export default function InkbindPaymentPaths() {
  const [active, setActive] = useState(paths[0].id);
  const selected = paths.find((p) => p.id === active) ?? paths[0];
  const Icon = selected.icon;

  return (
    <motion.div
      id="payment"
      className="flex w-full max-w-5xl scroll-mt-28 flex-col pt-20 md:pt-28"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}>
      <motion.p
        variants={itemVariants}
        className="text-center text-xs font-bold uppercase tracking-[0.2em] text-[#0123D2]">
        Payment engine
      </motion.p>
      <motion.div variants={itemVariants}>
        <TextBlur
          className="text-center text-2xl font-medium tracking-tight text-zinc-900 md:text-3xl"
          text="Close the deal your way"
        />
      </motion.div>
      <motion.p
        variants={itemVariants}
        className="mx-auto mt-3 max-w-xl text-center text-sm leading-relaxed text-zinc-600">
        Most quote apps stop at a draft order. Inkbind closes the payment too - per quote,
        not per store. Even split payments, which Shopify only offers natively on Plus.
      </motion.p>

      <motion.div
        variants={itemVariants}
        className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
        {paths.map((path) => {
          const PathIcon = path.icon;
          const isActive = path.id === active;
          return (
            <button
              key={path.id}
              type="button"
              onClick={() => setActive(path.id)}
              className={cn(
                "flex flex-col items-start rounded-xl border p-4 text-left transition-all duration-200",
                isActive
                  ? "border-[#0123D2]/40 bg-[#0123D2]/5 shadow-[0_0_40px_-12px_rgba(1,35,210,0.3)]"
                  : "border-zinc-200 bg-white hover:border-zinc-300"
              )}>
              <PathIcon
                className={cn("h-5 w-5", isActive ? "text-[#0123D2]" : "text-zinc-400")}
                strokeWidth={1.75}
              />
              <span className="mt-3 text-sm font-semibold text-zinc-900">{path.label}</span>
              <span className="mt-0.5 text-xs text-zinc-500">{path.tagline}</span>
            </button>
          );
        })}
      </motion.div>

      <motion.div variants={itemVariants} className="mt-5 overflow-hidden rounded-2xl border border-zinc-200 bg-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2">
            <div className="border-b border-zinc-100 p-6 md:border-b-0 md:border-r md:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0123D2]/10">
                  <Icon className="h-5 w-5 text-[#0123D2]" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-zinc-900">{selected.label}</div>
                  <div className="text-xs text-zinc-500">{selected.tagline}</div>
                </div>
                <span className="ml-auto hidden rounded-full border border-[#0123D2]/20 bg-[#0123D2]/5 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#0123D2] sm:inline">
                  {selected.badge}
                </span>
              </div>

              <div className="mt-6 rounded-xl bg-zinc-50 p-4">
                <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                  Quote Q-1042
                </div>
                <div className="mt-1 text-2xl font-bold tracking-tight text-zinc-900">
                  {selected.total}
                </div>
                <dl className="mt-4 space-y-2 border-t border-zinc-200/80 pt-4">
                  {selected.breakdown.map((row) => (
                    <div key={row.label} className="flex justify-between gap-4 text-sm">
                      <dt className="text-zinc-500">{row.label}</dt>
                      <dd className="font-medium text-zinc-800">{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            <div className="flex flex-col justify-center bg-gradient-to-br from-[#0123D2]/[0.03] to-white p-6 md:p-8">
              <p className="text-sm leading-relaxed text-zinc-700">{selected.outcome}</p>
              <div className="mt-6 inline-flex w-fit items-center gap-2 rounded-lg bg-[#0123D2] px-4 py-2.5 text-sm font-semibold text-white">
                {selected.id === "pay_now" && "Proceed to checkout"}
                {selected.id === "deposit" && "Pay deposit - $2,140.00"}
                {selected.id === "net" && "Confirm on Net 30"}
                {selected.id === "cod" && "Confirm COD order"}
              </div>
              <p className="mt-3 text-xs text-zinc-400">
                Buyer sees this on the quote page after signing.
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
