"use client";

import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/lib/animation-variants";
import TextBlur from "./ui/text-blur";

const faqs = [
  {
    q: "How does Version 8.0 prevent update crashes?",
    a: "Before updating any plugin, theme, or WordPress core, Update Guard scans for PHP/WP floor mismatches, changelog breaking change keywords, and developer abandonment. After you update, it automatically verifies loopback response, error logs, and cron integrity to ensure your site stays healthy.",
  },
  {
    q: "How does Troubleshooting Mode work without taking my live site down?",
    a: "Unlike standard troubleshooting plugins that put the entire site into maintenance or switch the live theme for everyone, phpinfo() WP isolates the debug session to your specific admin login. Visitors and customers continue browsing your live store uninterrupted.",
  },
  {
    q: "Will the deep scanning slow down my server?",
    a: "No. All scans run exclusively on-demand inside the WordPress admin with intelligent caching (transients and in-memory memoization) and async AJAX execution. Front-end page loads have 0.00ms overhead.",
  },
  {
    q: "Is there a free version?",
    a: "Yes. The free version on WordPress.org includes the phpinfo viewer, .htaccess editor, extension list, activity log, PHP EOL Timeline, Troubleshooting Mode, PHP Compatibility Scanner, and a Config Grader summary. Pro adds the depth, one-click auto-fixes, SSL/headers monitors, and the white-label PDF audit reports.",
  },
  {
    q: "How is this different from Health Check & Troubleshooting?",
    a: "Health Check is the official WP.org plugin we're replacing - but it's been unmaintained for two years, and its Troubleshooting Mode has a long-standing bug that can leave you locked out with all plugins disabled. phpinfo() WP rebuilds the same ideas (phpinfo viewer, debug info, plugin troubleshooting) in a maintained, modern plugin. Our Troubleshooting Mode is per-user, time-limited, fully reversible, with an explicit 'End and restore' button - you cannot lock yourself out. Plus everything Health Check never had: PHP EOL tracking, A-F config grading, SSL/headers monitors, and a client-ready PDF audit report.",
  },
  {
    q: "How is this different from WP Umbrella or ManageWP?",
    a: "Those are external SaaS dashboards for monitoring many sites at once, billed per site per month. phpinfo() WP Pro is an in-admin plugin that lives on the site itself - no external account, no per-site monthly fee, no remote agent. Pick this if you want depth on each individual site and a portable PDF report.",
  },
  {
    q: "Does the PHP Compatibility Scanner actually work on my managed host?",
    a: "Yes. Unlike scanners that rely on PHP_CodeSniffer or exec(), ours uses static analysis that runs inside WordPress itself. Tested on Kinsta, WP Engine, SiteGround, Cloudways, Pantheon, and other managed hosts that restrict shell access.",
  },
  {
    q: "Does the Pro license phone home?",
    a: "Once per week, the plugin pings our server with your license key and site URL to confirm the key is still valid. Nothing else is sent - no analytics, no site contents, no data from the External API Monitor or any other feature. If our server is unreachable, the plugin keeps working for 14 days, then asks you to re-activate.",
  },
  {
    q: "What happens to my data if I cancel or deactivate?",
    a: "Everything stays on your server - we never store your site data externally. Deactivating the plugin leaves your WordPress install exactly as it was. Your .htaccess and .user.ini changes persist (they're your files). Config Snapshots are stored in your own database and are deleted cleanly when you uninstall. Nothing is sent to us on deactivation.",
  },
  {
    q: "What happens after my year is up?",
    a: "You keep the version you have, with all features unlocked. You stop getting updates and support unless you renew. We email a renewal reminder 14 days before expiry. Lifetime owners never expire.",
  },
  {
    q: "Can I move my license between sites?",
    a: "Yes. Deactivate on the old site (one click) and activate on the new one. The Single Site license can be re-assigned freely. Unlimited and Lifetime work on as many sites as you want, simultaneously.",
  },
  {
    q: "Refund policy?",
    a: "14 days, no questions asked. Email support@exeebit.com with your order number and we'll refund within 1-2 business days.",
  },
  {
    q: "Server requirements?",
    a: "WordPress 5.9+ and PHP 8.0+ (PHP 8.2 or newer recommended). PHP 7.4 reached end-of-life in November 2022 and is no longer supported - running it means missed security patches. If your host still runs 7.4, the plugin will tell you so on activation. For .htaccess editing, your site root must be writable. Some hosts disable certain PHP functions - if a feature shows unavailable, contact your host.",
  },
];

export default function FAQ() {
  return (
    <motion.div
      id="faq"
      className="flex w-full max-w-3xl flex-col gap-3 pb-16 pt-16 md:pb-24 md:pt-24"
      variants={containerVariants}
      initial="hidden"
      animate="visible">

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
            className="group rounded-xl border border-border bg-white shadow-xs transition-colors md:hover:border-zinc-300">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-2 p-4 text-sm font-medium text-zinc-900">
              <span>{faq.q}</span>
              <span className="text-violet-700 transition-transform duration-200 group-open:rotate-45">
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
          className="text-violet-700 underline underline-offset-2 hover:text-violet-700">
          support@exeebit.com
        </a>
      </motion.p>
    </motion.div>
  );
}
