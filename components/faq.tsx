"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "Does phpinfo() WP add any overhead or slow down my live site?",
      a: "Zero overhead for live visitors. All telemetry probes, OPcache checks, and Update Guard scans run strictly on-demand inside the WordPress admin or via asynchronous non-blocking AJAX. No persistent front-end assets or background tracking scripts are ever loaded on your public pages."
    },
    {
      q: "How does Safe Mode work without breaking live visitors?",
      a: "Safe Mode hooks into early WordPress bootstrap via a dynamic must-use (mu-plugin) loader that validates your admin authentication cookie. Only your active browser session sees the clean isolated sandbox. Public visitors, Googlebot, and checkouts continue accessing your live website normally."
    },
    {
      q: "What is Host Lock Detection and why does it matter?",
      a: "Many shared and managed WordPress hosts (e.g. WP Engine, Kinsta, Cloudways, cPanel) hard-lock specific PHP directives in server templates. phpinfo() WP inspects your server runtime to detect whether changes need to go into .user.ini, php.ini, or wp-config.php so you never waste time editing ineffective files."
    },
    {
      q: "Can I generate white-labeled PDF reports for client audits?",
      a: "Yes. Unlimited and Lifetime licenses include complete white-label customization. You can upload your agency logo, customize company header details, and export clean executive PDFs to present during maintenance reviews."
    },
    {
      q: "What happens when my license expires after 1 year?",
      a: "Your installed Pro plugin continues working without interruption on all activated sites. You retain access to your current features. Renewals are only required for future major version updates and priority technical support."
    }
  ];

  return (
    <section className="py-24 relative bg-slate-50/50 border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Everything you need to know about the architecture, security, and licensing.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={i}
                className="rounded-xl bg-white border border-slate-200 overflow-hidden shadow-xs"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-slate-900 text-sm hover:text-violet-700 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`h-4 w-4 text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
