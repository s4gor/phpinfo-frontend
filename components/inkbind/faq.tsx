"use client";

import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/lib/animation-variants";
import TextBlur from "@/components/ui/text-blur";

const faqs = [
  {
    q: "Do I need Shopify Plus?",
    a: "No. Inkbind works on any paid Shopify plan. Native B2B catalogs and company accounts are available on all paid plans now - Inkbind adds the quoting, negotiation, and flexible payment closure that Shopify B2B doesn't include.",
  },
  {
    q: "How is Inkbind different from native Shopify B2B?",
    a: "Shopify B2B handles repeat catalog buyers - companies, price lists, and net terms at checkout. Inkbind handles negotiated deals: RFQ from your storefront, merchant-built quotes, counter-offers, e-signatures, and pay-now, deposit, net, or COD paths into a real Shopify order.",
  },
  {
    q: "What payment options can I offer buyers?",
    a: "Pay now at checkout, deposit plus balance, net terms, and cash on delivery - configurable per quote. Starter and Pro unlock deposit, net, and COD; the free tier supports pay-now checkout.",
  },
  {
    q: "Can customers request quotes from my storefront?",
    a: "Yes. Inkbind includes a theme extension - hide prices, show a Request Quote button, and capture custom fields without hacky scripts. Submitted RFQs land in your admin for quoting.",
  },
  {
    q: "Does Inkbind create real Shopify orders?",
    a: "Yes. Accepted quotes convert to draft orders and Shopify checkout or invoices - with the buyer's real shipping address and line items (collected at checkout for pay-now/deposit, or on accept for net/COD), not a synthetic placeholder cart.",
  },
  {
    q: "What's on the free plan vs paid?",
    a: "Free includes one active quote, pay-now checkout, branded PDF quotes, email notifications, and the customer portal. Starter adds unlimited quotes, deposit/net/COD, B2B companies, volume pricing, storefront RFQ, and payment-lifecycle webhooks. Pro adds e-signatures, counter-offers, approval workflows, Shopify Flow, Slack, and full lifecycle webhooks.",
  },
  {
    q: "Can buyers sign quotes electronically?",
    a: "Yes, on Pro. Buyers accept with a captured signature on the quote page - audit-grade acceptance without a separate e-sign tool.",
  },
  {
    q: "Does Inkbind work with Shopify Flow?",
    a: "Pro includes Shopify Flow triggers for the full quote lifecycle - submitted, sent, accepted, paid, expired, and more - plus Slack. Starter already includes outbound webhooks for payment events (checkout completed, deposit paid, balance due, paid); Pro unlocks the full event set.",
  },
  {
    q: "Is there a customer portal?",
    a: "Yes. Buyers get a portal to view quote status, message your team, accept or counter, and complete checkout - included on all plans.",
  },
  {
    q: "Refund policy?",
    a: "Shopify bills Inkbind through your Shopify admin. Contact support@exeebit.com within 14 days of your first charge if Inkbind isn't the right fit - we'll work with you on a fair resolution.",
  },
];

export default function InkbindFAQ() {
  return (
    <motion.div
      id="faq"
      className="flex w-full max-w-3xl flex-col gap-3 scroll-mt-28 pb-16 pt-16 md:pb-24 md:pt-24"
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
            className="group rounded-lg border border-border bg-white transition-colors open:border-[#0123D2] md:hover:border-zinc-300">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-2 p-4 text-sm font-medium text-zinc-900">
              <span>{faq.q}</span>
              <span className="text-[#0123D2] transition-transform duration-200 group-open:rotate-45">
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
          className="text-[#0123D2] underline underline-offset-2 hover:text-[#0119a8]">
          support@exeebit.com
        </a>
      </motion.p>
    </motion.div>
  );
}
