"use client";

import { motion } from "framer-motion";
import { Puzzle, Workflow, Webhook, MessageSquare } from "lucide-react";
import { containerVariants, itemVariants } from "@/lib/animation-variants";

const integrations = [
  {
    icon: Puzzle,
    title: "Theme extension",
    desc: "Request Quote button, hide prices, custom RFQ fields - native to Online Store 2.0.",
  },
  {
    icon: Workflow,
    title: "Shopify Flow",
    desc: "Triggers on submit, send, accept, pay, expire. Automate tags, emails, and internal tasks.",
  },
  {
    icon: Webhook,
    title: "Outbound webhooks",
    desc: "Push quote events to your ERP, CRM, or warehouse system in real time.",
  },
  {
    icon: MessageSquare,
    title: "Slack alerts",
    desc: "Your team hears about new RFQs and counter-offers where they already work.",
  },
];

export default function InkbindIntegrations() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="mt-20 w-full max-w-5xl md:mt-28">
      <motion.div
        variants={itemVariants}
        className="rounded-2xl border border-zinc-200 bg-gradient-to-br from-zinc-50 to-white p-6 sm:p-8">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0123D2]">
            Fits your stack
          </p>
          <h2 className="mt-2 text-xl font-semibold tracking-tight text-zinc-900 sm:text-2xl">
            Plugs into Shopify - not around it
          </h2>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {integrations.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-xl border border-zinc-100 bg-white p-4">
              <Icon className="h-5 w-5 text-[#0123D2]" strokeWidth={1.75} />
              <h3 className="mt-3 text-sm font-semibold text-zinc-900">{title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-zinc-500">{desc}</p>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-zinc-400">
          Theme extension on all plans · Flow, Slack &amp; full webhooks on Pro
        </p>
      </motion.div>
    </motion.div>
  );
}
