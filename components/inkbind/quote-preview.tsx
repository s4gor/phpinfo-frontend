"use client";

import { motion } from "framer-motion";
import { PenLine, Check } from "lucide-react";
import { containerVariants, itemVariants } from "@/lib/animation-variants";

const lineItems = [
  { sku: "TEE-BLK-L", name: "Heavyweight Tee - Black / L", qty: 100, unit: "$8.40", total: "$840.00" },
  { sku: "TEE-BLK-XL", name: "Heavyweight Tee - Black / XL", qty: 150, unit: "$8.20", total: "$1,230.00" },
  { sku: "SETUP", name: "Screen setup (one-time)", qty: 1, unit: "$450.00", total: "$450.00" },
];

export default function InkbindQuotePreview() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="mt-20 w-full max-w-5xl md:mt-28">
      <motion.div
        variants={itemVariants}
        className="overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 shadow-[0_40px_80px_-30px_rgba(1,35,210,0.25)]">
        <div className="flex items-center gap-2 border-b border-zinc-200 bg-white px-4 py-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-zinc-200" />
            <span className="h-2.5 w-2.5 rounded-full bg-zinc-200" />
            <span className="h-2.5 w-2.5 rounded-full bg-zinc-200" />
          </div>
          <div className="mx-auto flex max-w-sm flex-1 items-center justify-center rounded-md bg-zinc-100 px-3 py-1 text-[11px] text-zinc-500">
            yourstore.com/apps/inkbind/quote/a8f3…
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5">
          <div className="lg:col-span-3 bg-white p-6 sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#0123D2]/20 bg-[#0123D2]/5 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-[#0123D2]">
                  Quote · Pending signature
                </div>
                <h3 className="mt-3 text-xl font-semibold tracking-tight text-zinc-900">
                  Q-1042
                </h3>
                <p className="mt-1 text-sm text-zinc-500">
                  Prepared for <span className="font-medium text-zinc-700">Northline Apparel Co.</span>
                </p>
              </div>
              <div className="text-right text-sm">
                <div className="text-zinc-500">Valid until</div>
                <div className="font-medium text-zinc-800">Jul 23, 2026</div>
              </div>
            </div>

            <div className="mt-6 overflow-hidden rounded-lg border border-zinc-100">
              <table className="w-full text-sm">
                <thead className="bg-zinc-50 text-left text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                  <tr>
                    <th className="px-4 py-2.5">Item</th>
                    <th className="hidden px-4 py-2.5 sm:table-cell">Qty</th>
                    <th className="hidden px-4 py-2.5 sm:table-cell">Unit</th>
                    <th className="px-4 py-2.5 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {lineItems.map((item) => (
                    <tr key={item.sku}>
                      <td className="px-4 py-3">
                        <div className="font-medium text-zinc-800">{item.name}</div>
                        <div className="text-xs text-zinc-400">{item.sku}</div>
                      </td>
                      <td className="hidden px-4 py-3 text-zinc-600 sm:table-cell">{item.qty}</td>
                      <td className="hidden px-4 py-3 text-zinc-600 sm:table-cell">{item.unit}</td>
                      <td className="px-4 py-3 text-right font-medium text-zinc-800">{item.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex justify-end">
              <dl className="w-full max-w-xs space-y-1.5 text-sm">
                <div className="flex justify-between text-zinc-500">
                  <dt>Subtotal</dt>
                  <dd>$2,520.00</dd>
                </div>
                <div className="flex justify-between text-zinc-500">
                  <dt>Volume discount (250+ units)</dt>
                  <dd className="text-emerald-600">−$120.00</dd>
                </div>
                <div className="flex justify-between border-t border-zinc-100 pt-2 text-base font-semibold text-zinc-900">
                  <dt>Total</dt>
                  <dd>$2,400.00</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="flex flex-col border-t border-zinc-200 bg-gradient-to-br from-[#0123D2]/[0.04] to-white p-6 lg:col-span-2 lg:border-l lg:border-t-0 sm:p-8">
            <h4 className="text-sm font-semibold text-zinc-900">Accept &amp; sign</h4>
            <p className="mt-1 text-xs leading-relaxed text-zinc-500">
              By signing, you agree to the quoted terms and authorize payment per the selected method.
            </p>

            <div className="mt-5 rounded-xl border border-dashed border-zinc-300 bg-white p-4">
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <span>Signature</span>
                <PenLine className="h-3.5 w-3.5" />
              </div>
              <svg viewBox="0 0 200 48" className="mt-2 h-12 w-full text-[#0123D2]" aria-hidden="true">
                <path
                  d="M8 38 C 28 8, 52 42, 72 22 S 108 8, 128 28 S 168 42, 192 18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <div className="mt-2 text-xs text-zinc-500">Jordan Lee · Jul 9, 2026</div>
            </div>

            <div className="mt-5 rounded-lg border border-[#0123D2]/15 bg-[#0123D2]/5 p-3">
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#0123D2]">
                Payment · Deposit 50%
              </div>
              <div className="mt-1 text-lg font-bold text-zinc-900">$1,200.00 due today</div>
              <div className="mt-0.5 text-xs text-zinc-500">Balance $1,200.00 on shipment</div>
            </div>

            <button
              type="button"
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-[#0123D2] py-3 text-sm font-semibold text-white">
              <Check className="h-4 w-4" />
              Accept quote &amp; pay deposit
            </button>

            <p className="mt-3 text-center text-[10px] text-zinc-400">
              Mock buyer view · not a live quote
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
