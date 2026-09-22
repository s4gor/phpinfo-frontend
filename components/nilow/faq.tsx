"use client";

import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/lib/animation-variants";
import TextBlur from "@/components/ui/text-blur";

const faqs = [
  {
    q: "Is Nilow really free?",
    a: "Yes. Unlimited groups, members, and expenses are free forever - no daily caps, no ads, and no bank linking. Nilow Pro is optional and adds power features like unlimited receipt scans, recurring expenses, and exports.",
  },
  {
    q: "Do I need an account to use Nilow?",
    a: "No. Pick a display name and start splitting. An account is only needed if you turn on sync or invite others to a shared group so everyone's devices stay in step.",
  },
  {
    q: "Does Nilow upload my receipts or spending data?",
    a: "Receipt scanning runs on your device with Google ML Kit - images aren't sent to us for OCR. Your expenses live on your phone first. If you invite people to a group, only the data needed to sync that group is sent to our backend. We don't sell your data or show ads.",
  },
  {
    q: "What's free vs Nilow Pro?",
    a: "Free includes unlimited splitting, every split type, multi-currency balances, offline use, and basic receipt scanning. Pro adds unlimited receipt scans, auto-posted recurring expenses, spending insights, PDF exports, and priority support.",
  },
  {
    q: "Can I use Nilow offline?",
    a: "Yes. Add expenses on a flight or a trek - everything is stored on your device and syncs when you're back online. Balances and debt simplification work offline too.",
  },
  {
    q: "Can I switch from Splitwise?",
    a: "Yes. Export your Splitwise history as CSV and import it in Nilow in one step. Your groups, members, and past expenses come with you.",
  },
  {
    q: "How do group invite links work?",
    a: "Share a link or QR code from the app. On Android, tapping the link opens Nilow directly when it's installed. Anyone without the app can still be added as a 'ghost' member so they're included in the split.",
  },
  {
    q: "Does Nilow connect to my bank?",
    a: "No. Nilow never links to your bank account. When it's time to settle up, Nilow shows the fewest payments needed and hands off to UPI, PayPal, Venmo, or IBAN with the amount prefilled - you pay through the app you already use.",
  },
  {
    q: "Is Nilow on iPhone?",
    a: "Nilow is on Google Play today. An iOS version is planned - join a group from any platform via invite link in the meantime, or add members who don't have the app yet.",
  },
  {
    q: "Refund policy for Nilow Pro?",
    a: "14 days, no questions asked. Email support@exeebit.com with your Google Play order number and we'll refund within 1–2 business days.",
  },
];

export default function NilowFAQ() {
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
            className="group rounded-lg border border-border bg-white transition-colors open:border-emerald-500 md:hover:border-zinc-300">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-2 p-4 text-sm font-medium text-zinc-900">
              <span>{faq.q}</span>
              <span className="text-emerald-600 transition-transform duration-200 group-open:rotate-45">
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
          className="text-emerald-600 underline underline-offset-2 hover:text-emerald-700">
          support@exeebit.com
        </a>
      </motion.p>
    </motion.div>
  );
}
