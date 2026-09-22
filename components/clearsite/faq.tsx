"use client";

import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/lib/animation-variants";
import TextBlur from "@/components/ui/text-blur";

const faqs = [
  {
    q: "Does ClearSite upload my browsing data?",
    a: "No. Everything runs on your device. We don't operate servers for your history, don't track you, and don't require an account.",
  },
  {
    q: "What's free vs Pro?",
    a: "Free includes full per-site erasure, Quick Clean, whitelist, auto-rules, block list, and one free footprint breakdown peek per week. Pro adds unlimited breakdown, Smart Categories, Panic Clean, and Handoff Mode.",
  },
  {
    q: "Will this log me out of other sites?",
    a: "No. ClearSite only erases data for the domain(s) you select. Your Gmail, GitHub, and banking sessions stay intact.",
  },
  {
    q: "Can I undo an erasure?",
    a: "Yes. Every erasure saves a local backup. You can restore deleted URLs within 30 seconds, or download a JSON backup from the undo toast.",
  },
  {
    q: "What permissions does ClearSite need?",
    a: "history, browsingData, cookies, storage, contextMenus, alarms, tabs, and notifications - each used only to read or delete data you explicitly choose to erase, or to schedule auto-cleanup rules you configure.",
  },
  {
    q: "Refund policy?",
    a: "14 days, no questions asked. Email support@exeebit.com with your order number and we'll refund within 1–2 business days.",
  },
];

export default function ClearSiteFAQ() {
  return (
    <motion.div
      id="faq"
      className="flex w-full max-w-3xl flex-col gap-3 pb-16 pt-16 md:pb-24 md:pt-24"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}>
      <motion.div variants={itemVariants}>
        <TextBlur
          className="text-center text-2xl font-medium tracking-tight text-zinc-800 md:text-3xl"
          text="Common questions"
        />
      </motion.div>

      <motion.div variants={itemVariants} className="mt-6 flex flex-col gap-3">
        {faqs.map((faq, i) => (
          <details
            key={i}
            className="group rounded-lg border border-border bg-white transition-colors open:border-blue-500 md:hover:border-zinc-300">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-2 p-4 text-sm font-medium text-zinc-900">
              <span>{faq.q}</span>
              <span className="text-blue-600 transition-transform duration-200 group-open:rotate-45">
                +
              </span>
            </summary>
            <div className="px-4 pb-4 text-sm leading-relaxed text-zinc-600">
              {faq.a}
            </div>
          </details>
        ))}
      </motion.div>

      <motion.p
        variants={itemVariants}
        className="mt-6 text-center text-sm text-zinc-500">
        Still have questions? Email{" "}
        <a
          href="mailto:support@exeebit.com"
          className="text-blue-600 underline underline-offset-2 hover:text-blue-700">
          support@exeebit.com
        </a>
      </motion.p>
    </motion.div>
  );
}
