"use client";

import TextBlur from "./ui/text-blur";

const faqs = [
  {
    q: "What if it doesn't work with my host or setup?",
    a: "14 days, 100% money-back guarantee, no questions asked. Email support@phpinfowp.com with your purchase email or license key, and we will issue a full refund via Stripe within 1-2 business days. phpinfo() WP runs smoothly across all major managed WordPress hosts (WP Engine, Kinsta, SiteGround, Cloudways, Hostinger) with zero shell access required.",
  },
  {
    q: "Will this slow down my live WooCommerce store?",
    a: "No. All scans execute exclusively on-demand inside your WordPress admin via async AJAX with intelligent transient caching. Front-end page loads have 0.00ms overhead - your visitors and checkout flows are completely unaffected.",
  },
  {
    q: "Why should I buy Pro if there is a free version on WP.org?",
    a: "The free version diagnoses problems; Pro fixes them. Pro unlocks 1-click directive fixes, the proactive PHP 8.4 pre-flight sniffer, live OPcache hit telemetry, database autoload and missing index scanning, and white-label client PDF audit reports.",
  },
  {
    q: "I only manage one site. Is $39 worth it for me?",
    a: "A single 504 gateway timeout or fatal PHP crash costs far more in lost sales and stress than $39. If phpinfo() WP saves you one emergency support ticket or 30 minutes with a $150/hr sysadmin, it has already paid for itself 3x over.",
  },
];

export default function FAQ() {
  return (
    <div
      id="faq"
      className="flex w-full max-w-3xl mx-auto flex-col gap-3 pt-16 md:pt-24">

      <div>
        <TextBlur
          className="text-center text-2xl font-medium tracking-tight text-zinc-800 md:text-3xl dark:text-zinc-100"
          text="Common questions"
        />
      </div>

      <div className="mt-6 flex flex-col gap-3">
        {faqs.map((faq, i) => (
          <details
            key={i}
            className="group rounded-xl border border-zinc-200 bg-white shadow-xs transition-colors md:hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-2 p-4 text-sm font-medium text-zinc-900 dark:text-zinc-100">
              <span>{faq.q}</span>
              <span className="text-violet-700 dark:text-violet-400 transition-transform duration-200 group-open:rotate-45">
                +
              </span>
            </summary>
            <div className="px-4 pb-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {faq.a}
            </div>
          </details>
        ))}
      </div>

      <p
        className="mt-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
        Still have questions? Email{" "}
        <a
          href="mailto:support@phpinfowp.com"
          className="text-violet-700 dark:text-violet-400 underline underline-offset-2 hover:text-violet-800 dark:hover:text-violet-300">
          support@phpinfowp.com
        </a>
      </p>
    </div>
  );
}
