"use client";

import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ExeebitBar from "@/components/exeebit-bar";
import { FileText, ShieldCheck, Scale, Check } from "lucide-react";
import LegalOperatorCard from "@/components/legal-operator-card";

const LAST_UPDATED = "14 September 2026";

export default function TermsPage() {
  return (
    <main className="flex min-h-screen flex-col items-center overflow-x-clip bg-zinc-50/50 dark:bg-zinc-950 pt-24 sm:pt-28 lg:pt-36">
      <div className="fixed left-0 right-0 top-0 z-[60]">
        <ExeebitBar />
        <Header />
      </div>

      <div className="flex w-full max-w-4xl flex-col px-4 sm:px-6 lg:px-8 pb-20 pt-4">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3.5 py-1 text-xs font-semibold text-violet-700 dark:border-violet-900/60 dark:bg-violet-950/40 dark:text-violet-300 mb-3">
            <Scale className="h-3.5 w-3.5" />
            <span>Commercial Agreement</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Terms of Service
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            General terms and conditions for software licenses, digital downloads, and subscriptions offered by phpinfo() WP.
          </p>
        </div>

        <div className="space-y-6">
          {/* 1. Scope & Contracting Parties */}
          <section className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              1. Scope &amp; Contracting Parties
            </h2>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
              <p>
                These Terms of Service (&quot;Terms&quot;) govern the purchase and licensing of software products, subscriptions, and digital downloads between:
              </p>
              <LegalOperatorCard roleLabel="Licensor & Contracting Party" />
              <p className="text-xs text-zinc-500 italic">
                (&quot;phpinfo() WP&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;)
              </p>
              <p>
                and the customer (&quot;Customer&quot;, &quot;you&quot;, or &quot;your&quot;) through <code>phpinfowp.com</code> and related services. These terms apply to commercial agencies, independent developers, and individual site owners.
              </p>
            </div>
          </section>

          {/* 2. Contract Formation & Digital Delivery */}
          <section className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              2. Contract Formation &amp; Digital Delivery
            </h2>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
              <p>
                Pricing tiers and product descriptions presented on this website constitute an invitation to treat. By submitting checkout details through Stripe, you issue a binding offer to acquire the selected software license.
              </p>
              <p>
                The purchase contract is concluded upon successful payment confirmation by Stripe and the automated delivery of your digital license key and download link via electronic mail. All software packages and updates are delivered exclusively via digital download.
              </p>
            </div>
          </section>

          {/* 3. License Grant & Permitted Use */}
          <section className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              3. License Grant &amp; Permitted Use
            </h2>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
              <p>
                Upon payment confirmation, phpinfo() WP grants you a non-exclusive, worldwide license to install, activate, and operate phpinfo() WP Pro in accordance with your chosen plan:
              </p>
              <ul className="list-disc space-y-2 pl-5 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                <li>
                  <strong className="text-zinc-900 dark:text-zinc-100">Single Site License ($39/year):</strong> Authorizes activation on 1 production WordPress website. Includes 1 year of continuous automated plugin updates and email support.
                </li>
                <li>
                  <strong className="text-zinc-900 dark:text-zinc-100">Unlimited Sites License ($79/year):</strong> Authorizes activation on unlimited personal and client websites, white-labeled client PDF reporting, weekly digest alerts, and 1 year of continuous updates and priority support.
                </li>
                <li>
                  <strong className="text-zinc-900 dark:text-zinc-100">Lifetime License ($249 one-time):</strong> Authorizes activation on unlimited websites with continuous access to all future major version updates, exclusive early access to pre-release beta builds, and priority support without recurring renewal fees. &quot;Lifetime&quot; is legally defined as the active commercial product lifecycle of phpinfo() WP for as long as the software is maintained and supported by the provider, not the natural lifespan of the licensee.
                </li>
              </ul>
              <p>
                You may not resell, redistribute, sub-license, or publicly host your license key or software binaries.
              </p>
            </div>
          </section>

          {/* 4. Pricing & Renewals */}
          <section className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              4. Pricing, Subscriptions &amp; Renewals
            </h2>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
              <p>
                All prices are stated in USD. Pursuant to § 19 UStG (German Small Business Regulation / <em>Kleinunternehmerregelung</em>), VAT is not charged or displayed on invoices.
              </p>
              <p>
                Annual subscriptions (Single Site and Unlimited) renew automatically every 12 months unless cancelled prior to the renewal date. You may cancel renewal at any time directly through the Stripe Customer Portal or by emailing <a href="mailto:support@phpinfowp.com" className="text-violet-600 dark:text-violet-400 underline">support@phpinfowp.com</a>.
              </p>
              <p>
                If an annual license is cancelled or expires, your installed software remains functional; however, access to automated security updates, bug fixes, and support ceases at the end of the paid billing cycle.
              </p>
              <p>
                The Lifetime License is a single, non-recurring charge. For Lifetime licenses, updates and technical support remain active for the operational lifetime of the phpinfo() WP software product. In the unlikely event that the product is ever permanently retired or sunset, active installations will continue to function on customer servers without restriction, and notice will be provided at least 90 days in advance.
              </p>
            </div>
          </section>

          {/* 5. Refunds & 14-Day Guarantee */}
          <section className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              5. Refunds &amp; 14-Day Money-Back Guarantee
            </h2>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
              <p>
                We stand behind our tools. We offer a voluntary <strong>100% 14-Day Money-Back Guarantee</strong> on all first-time purchases.
              </p>
              <p>
                If the plugin does not meet your technical expectations or workflow needs, email us at <a href="mailto:support@phpinfowp.com" className="text-violet-600 dark:text-violet-400 underline">support@phpinfowp.com</a> within 14 days of purchase with your order email or license key, and we will issue a full refund promptly.
              </p>
              <p>
                For statutory EU consumer cancellation provisions, please review our{" "}
                <Link href="/refund" className="text-violet-600 dark:text-violet-400 underline underline-offset-2">
                  Cancellation &amp; Refund Policy
                </Link>.
              </p>
            </div>
          </section>

          {/* 6. Warranty & Liability */}
          <section className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              6. Warranty &amp; Limitation of Liability
            </h2>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
              <p>
                Our software is engineered in accordance with rigorous WordPress and PHP quality standards. However, given the vast variety of third-party plugins, server environments, and database engines, uninterrupted operation in every custom hosting configuration cannot be guaranteed.
              </p>
              <p>
                phpinfo() WP is liable without limitation for intent and gross negligence. In cases of slight negligence, liability is limited to foreseeable, contract-typical damages. Customers remain responsible for keeping current backups of their WordPress databases and file trees.
              </p>
            </div>
          </section>

          {/* 7. Governing Law */}
          <section className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              7. Governing Law &amp; Jurisdiction
            </h2>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
              <p>
                These Terms and all legal relationships arising from them are governed by the laws of the Federal Republic of Germany, excluding the UN Convention on Contracts for the International Sale of Goods (CISG).
              </p>
              <p>
                For commercial merchants, the exclusive place of jurisdiction is the registered seat of the provider (Paderborn, Germany).
              </p>
              <p className="text-xs text-zinc-400 pt-2">
                Last updated: {LAST_UPDATED}
              </p>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
