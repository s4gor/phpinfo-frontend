"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { containerVariants, itemVariants } from "@/lib/animation-variants";
import {
  INKBIND_APP_STORE_URL,
  INKBIND_HELP_URL,
  INKBIND_PRO_PRICE,
  INKBIND_STARTER_PRICE,
} from "@/lib/inkbind";

export default function InkbindPricing() {
  return (
    <motion.div
      id="pricing"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="flex w-full max-w-4xl scroll-mt-28 flex-col pt-20 md:pt-28">
      <motion.p
        variants={itemVariants}
        className="text-center text-xs font-bold uppercase tracking-[0.2em] text-[#0123D2]">
        Pricing
      </motion.p>
      <motion.h2
        variants={itemVariants}
        className="text-center text-2xl font-semibold tracking-tight text-zinc-900 md:text-3xl">
        Start free. Scale when deals pick up.
      </motion.h2>
      <motion.p
        variants={itemVariants}
        className="mx-auto mt-2 max-w-md text-center text-sm text-zinc-600">
        Billed through Shopify. 14-day trial on paid plans.
      </motion.p>

      <motion.div
        variants={itemVariants}
        className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <PlanCard
          name="Free"
          price="$0"
          cadence=""
          blurb="Try quote-to-checkout on your store."
          features={[
            "1 active quote",
            "Pay now at checkout",
            "Branded PDF quotes",
            "Customer portal",
          ]}
          ctaLabel="Install free"
          ctaSecondary
        />
        <PlanCard
          name="Starter"
          price={`$${INKBIND_STARTER_PRICE}`}
          cadence="/mo"
          blurb="Unlimited quotes & B2B depth."
          features={[
            "Unlimited active quotes",
            "Deposit + balance, net & COD",
            "B2B companies & volume pricing",
            "Storefront RFQ extension",
          ]}
          ctaLabel="Start free trial"
          ctaSecondary
        />
        <PlanCard
          name="Pro"
          price={`$${INKBIND_PRO_PRICE}`}
          cadence="/mo"
          blurb="Negotiation, e-sign & integrations."
          featured
          features={[
            "Everything in Starter",
            "E-signatures on accept",
            "Counter-offers & approvals",
            "Shopify Flow, Slack & full lifecycle webhooks",
          ]}
          ctaLabel="Start free trial"
        />
      </motion.div>

      <motion.p variants={itemVariants} className="mt-4 text-center text-xs text-zinc-500">
        <Link href={INKBIND_HELP_URL} target="_blank" rel="noopener noreferrer" className="text-[#0123D2] hover:underline">
          View full plan comparison
        </Link>
      </motion.p>
    </motion.div>
  );
}

function PlanCard({
  name,
  price,
  cadence,
  blurb,
  features,
  featured,
  ctaLabel,
  ctaSecondary,
}: {
  name: string;
  price: string;
  cadence: string;
  blurb: string;
  features: string[];
  featured?: boolean;
  ctaLabel?: string;
  ctaSecondary?: boolean;
}) {
  return (
    <div
      className={
        featured
          ? "relative flex flex-col rounded-xl border border-[#0123D2]/35 bg-white p-7 shadow-[0_0_50px_-15px_rgba(1,35,210,0.35)]"
          : "flex flex-col rounded-xl border border-zinc-200 bg-white p-7"
      }>
      {featured && (
        <div className="absolute right-6 top-6 rounded-full border border-[#0123D2]/25 bg-[#0123D2]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#0123D2]">
          Pro
        </div>
      )}
      <h3 className="text-lg font-semibold text-zinc-900">{name}</h3>
      <p className="mt-1 text-sm text-zinc-500">{blurb}</p>
      <p className="mt-4 flex items-baseline gap-1">
        <span className="text-3xl font-bold tracking-tight text-zinc-900">{price}</span>
        {cadence && <span className="text-sm text-zinc-500">{cadence}</span>}
      </p>
      <ul className="mt-5 flex-1 space-y-2 text-sm text-zinc-700">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#0123D2]" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
      {ctaLabel && (
        <Link
          href={INKBIND_APP_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={
            ctaSecondary
              ? "mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-zinc-200 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-900 transition-all hover:border-[#0123D2]/30 hover:text-[#0123D2]"
              : "mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#0123D2] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#0119a8]"
          }>
          {ctaLabel}
          <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}
