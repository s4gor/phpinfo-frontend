"use client";

import { motion } from "framer-motion";
import { ShoppingBag, Handshake, ArrowRight, Check, X } from "lucide-react";
import { containerVariants, itemVariants } from "@/lib/animation-variants";
import TextBlur from "@/components/ui/text-blur";

const nativeItems = [
  "Company accounts & catalogs",
  "Volume pricing at checkout",
  "Net terms via payment gateway",
  "Repeat wholesale reordering",
];

const inkbindItems = [
  "Storefront RFQ & hide prices",
  "Merchant-built quotes & PDFs",
  "E-signatures & counter-offers",
  "Deposit + balance, net, COD per deal",
];

const gaps = [
  { label: "Custom negotiated pricing", native: false },
  { label: "Quote PDF with your branding", native: false },
  { label: "Buyer e-signature on accept", native: false },
  { label: "Deposit + balance workflow", native: false },
  { label: "Sales approval before send", native: false },
];

export default function InkbindDualTrack() {
  return (
    <motion.div
      className="flex w-full max-w-5xl flex-col pt-20 md:pt-28"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}>
      <motion.div variants={itemVariants}>
        <TextBlur
          className="text-center text-2xl font-medium tracking-tight text-zinc-900 md:text-3xl"
          text="Catalogs and deals - both."
        />
      </motion.div>
      <motion.p
        variants={itemVariants}
        className="mx-auto mt-3 max-w-xl text-center text-sm leading-relaxed text-zinc-600">
        Shopify B2B handles repeat catalog buyers on every paid plan. Inkbind handles the
        negotiated sale - RFQ, back-and-forth, signature, and deposit / net / COD payment.
      </motion.p>

      <motion.div
        variants={itemVariants}
        className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
        <div className="rounded-2xl border border-zinc-200 bg-zinc-50/80 p-6 sm:p-7">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white">
              <ShoppingBag className="h-5 w-5 text-zinc-500" strokeWidth={1.75} />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                Shopify native
              </div>
              <h3 className="text-lg font-semibold text-zinc-800">B2B catalogs</h3>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-zinc-600">
            Buyers log in, browse your catalog, and check out at list or tier price. Great for
            replenishment and standing orders.
          </p>
          <ul className="mt-5 space-y-2">
            {nativeItems.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-zinc-700">
                <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-[#0123D2]/25 bg-gradient-to-br from-[#0123D2]/5 to-white p-6 shadow-[0_0_50px_-15px_rgba(1,35,210,0.2)] sm:p-7">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0123D2]/10">
              <Handshake className="h-5 w-5 text-[#0123D2]" strokeWidth={1.75} />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-[#0123D2]">
                Inkbind
              </div>
              <h3 className="text-lg font-semibold text-zinc-900">Negotiated deals</h3>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-zinc-600">
            Every custom job, bulk order, and &ldquo;can you do $X if we buy 500?&rdquo; conversation
            - quoted, signed, and closed in Shopify.
          </p>
          <ul className="mt-5 space-y-2">
            {inkbindItems.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-zinc-700">
                <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#0123D2]" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="mt-8 flex flex-col items-center gap-3 rounded-xl border border-dashed border-zinc-200 bg-white px-6 py-5 sm:flex-row sm:justify-center">
        <span className="text-sm font-medium text-zinc-700">Merchants run both</span>
        <ArrowRight className="hidden h-4 w-4 text-zinc-300 sm:block" />
        <span className="text-center text-sm text-zinc-500">
          Native B2B for the catalog. Inkbind for the deal.
        </span>
      </motion.div>

      <motion.div variants={itemVariants} className="mt-8 overflow-hidden rounded-xl border border-zinc-200 bg-white">
        <div className="border-b border-zinc-100 bg-zinc-50 px-5 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500">
          What native B2B still doesn&apos;t ship
        </div>
        <ul className="divide-y divide-zinc-100">
          {gaps.map(({ label, native }) => (
            <li key={label} className="flex items-center justify-between gap-4 px-5 py-3.5 text-sm">
              <span className="text-zinc-700">{label}</span>
              <div className="flex items-center gap-6">
                <span className="flex w-16 flex-col items-center gap-0.5 text-[10px] uppercase tracking-wider text-zinc-400">
                  Native
                  {native ? (
                    <Check className="h-4 w-4 text-emerald-600" />
                  ) : (
                    <X className="h-4 w-4 text-zinc-300" />
                  )}
                </span>
                <span className="flex w-16 flex-col items-center gap-0.5 text-[10px] uppercase tracking-wider text-[#0123D2]">
                  Inkbind
                  <Check className="h-4 w-4 text-[#0123D2]" />
                </span>
              </div>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}
