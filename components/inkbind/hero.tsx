"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Circle, CreditCard, PenLine, ShieldCheck } from "lucide-react";
import { containerVariants, itemVariants } from "@/lib/animation-variants";
import { INKBIND_APP_STORE_URL } from "@/lib/inkbind";

const pipeline = [
  { status: "RFQ received", detail: "Northline Apparel · 250 units", done: true },
  { status: "Quote sent", detail: "Q-1042 · $2,400.00", done: true },
  { status: "Viewed", detail: "Buyer opened 2h ago", active: true },
  { status: "Awaiting signature", detail: "Deposit 50%", done: false },
];

export default function InkbindHero() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex w-full max-w-6xl flex-col gap-12 pt-8 md:gap-16 md:pt-12 lg:flex-row lg:items-center lg:gap-10">
      <div className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left">
        <motion.div
          variants={itemVariants}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#0123D2]/20 bg-[#0123D2]/5 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#0123D2]">
          Shopify B2B quotes & deposits
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
          Turn quote requests
          <br />
          <span className="text-[#0123D2]">into paid orders.</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mt-5 max-w-lg text-base leading-relaxed text-zinc-600 sm:text-lg">
          Inkbind runs the negotiated deal - RFQ, counter-offer, e-sign, then payment the way
          B2B actually works: deposit now, balance later, net terms, or COD. Catalog buyers
          stay on native B2B. Custom deals close here.
        </motion.p>

        <motion.div variants={itemVariants} className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href={INKBIND_APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0123D2] px-6 py-3 text-sm font-semibold text-white shadow-[0_0_30px_-8px_rgba(1,35,210,0.55)] transition-all hover:bg-[#0119a8]">
            Install on Shopify
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="#how-it-works"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-200 bg-white px-6 py-3 text-sm font-semibold text-zinc-700 transition-all hover:border-[#0123D2]/30 hover:text-[#0123D2]">
            See how it works
          </Link>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-zinc-500 lg:justify-start">
          <span className="flex items-center gap-1.5">
            <CreditCard className="h-3.5 w-3.5" /> Deposit now, balance later
          </span>
          <span className="flex items-center gap-1.5">
            <PenLine className="h-3.5 w-3.5" /> E-sign included
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5" /> Works on any Shopify plan
          </span>
        </motion.div>
      </div>

      <motion.div variants={itemVariants} className="w-full flex-1 lg:max-w-md">
        <div className="relative">
          <div
            className="absolute -inset-4 rounded-3xl bg-[#0123D2]/[0.07] blur-2xl"
            aria-hidden="true"
          />
          <div className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-[0_24px_60px_-20px_rgba(1,35,210,0.35)]">
            <div className="flex items-center justify-between border-b border-zinc-100 bg-zinc-50/80 px-4 py-3">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                  Inkbind · Admin
                </div>
                <div className="text-sm font-semibold text-zinc-900">Quote Q-1042</div>
              </div>
              <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-800">
                Viewed
              </span>
            </div>

            <div className="space-y-0 p-4">
              {pipeline.map((step, i) => (
                <div key={step.status} className="relative flex gap-3 pb-5 last:pb-0">
                  {i < pipeline.length - 1 && (
                    <div
                      className="absolute left-[9px] top-5 h-[calc(100%-4px)] w-px bg-zinc-200"
                      aria-hidden="true"
                    />
                  )}
                  <Circle
                    className={`relative z-10 mt-0.5 h-[18px] w-[18px] flex-shrink-0 ${
                      step.active
                        ? "fill-[#0123D2] text-[#0123D2]"
                        : step.done
                          ? "fill-[#0123D2]/30 text-[#0123D2]/30"
                          : "fill-zinc-100 text-zinc-300"
                    }`}
                    strokeWidth={2}
                  />
                  <div className={step.active ? "" : step.done ? "opacity-80" : "opacity-50"}>
                    <div
                      className={`text-sm font-medium ${step.active ? "text-[#0123D2]" : "text-zinc-800"}`}>
                      {step.status}
                    </div>
                    <div className="text-xs text-zinc-500">{step.detail}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-zinc-100 bg-[#0123D2]/[0.03] px-4 py-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-500">Total · 250 units</span>
                <span className="font-bold text-zinc-900">$2,400.00</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-zinc-200">
                <div className="h-full w-[62%] rounded-full bg-[#0123D2]" />
              </div>
              <div className="mt-1.5 text-[10px] text-zinc-400">
                62% to signed · deposit path selected
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
