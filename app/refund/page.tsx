"use client";

import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ExeebitBar from "@/components/exeebit-bar";
import { ShieldCheck, Check, Mail, AlertCircle, FileText } from "lucide-react";
import LegalOperatorCard from "@/components/legal-operator-card";

const LAST_UPDATED = "14 September 2026";

export default function RefundPage() {
  return (
    <main className="flex min-h-screen flex-col items-center overflow-x-clip bg-zinc-50/50 dark:bg-zinc-950 pt-24 sm:pt-28 lg:pt-36">
      <div className="fixed left-0 right-0 top-0 z-[60]">
        <ExeebitBar />
        <Header />
      </div>

      <div className="flex w-full max-w-4xl flex-col px-4 sm:px-6 lg:px-8 pb-20 pt-4">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1 text-xs font-semibold text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-300 mb-3">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Consumer Protection &amp; Guarantee</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Cancellation &amp; Refund Policy
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Statutory cancellation policy for digital goods and phpinfo() WP&apos;s voluntary 14-day 100% satisfaction guarantee.
          </p>
        </div>

        <div className="space-y-6">
          {/* Voluntary Guarantee Box */}
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/80 p-6 sm:p-8 dark:border-emerald-800 dark:bg-emerald-950/30">
            <div className="flex items-center gap-3 mb-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-200 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200 font-bold text-sm">
                ✓
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-emerald-950 dark:text-emerald-100">
                Our 14-Day 100% Money-Back Guarantee
              </h2>
            </div>
            <div className="mt-3 space-y-3 text-xs sm:text-sm text-emerald-900 dark:text-emerald-200 leading-relaxed">
              <p>
                We want you to be completely satisfied with your purchase. Even though statutory withdrawal rights on instant digital downloads can expire once delivery begins, <strong>phpinfo() WP voluntarily provides a 100% money-back guarantee within 14 days of purchase</strong>.
              </p>
              <p>
                If phpinfo() WP Pro does not fit your hosting setup, server requirements, or development workflow, simply email us at{" "}
                <a href="mailto:support@phpinfowp.com" className="font-bold underline underline-offset-2 hover:opacity-80">
                  support@phpinfowp.com
                </a>{" "}
                with your purchase email address or license key, and we will issue a full, prompt refund via Stripe. No questions asked.
              </p>
            </div>
          </div>

          {/* 1. Statutory Right of Withdrawal */}
          <section className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              1. Statutory Right of Withdrawal (EU Consumers)
            </h2>
            <div className="mt-3 space-y-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
              <div>
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Right of Withdrawal</h3>
                <p className="mt-1 text-xs sm:text-sm">
                  If you are a consumer residing in the European Union, you have the right to withdraw from this contract within 14 days without giving any reason. The withdrawal period is 14 days from the date the contract was concluded.
                </p>
                <p className="mt-2 text-xs sm:text-sm">
                  To exercise your statutory right of withdrawal, you must notify us:
                </p>
                <LegalOperatorCard roleLabel="Statutory Recipient" />
                <p className="mt-2 text-xs sm:text-sm">
                  by means of an unequivocal declaration (e.g. an email or letter). You may use the model withdrawal form below, but it is not mandatory.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Effects of Withdrawal</h3>
                <p className="mt-1 text-xs sm:text-sm">
                  If you withdraw from this contract under statutory provisions, we will reimburse all payments received from you without undue delay and at the latest within 14 days from the day on which we received your notification of withdrawal. We will process this reimbursement using the same payment method used in the original transaction.
                </p>
              </div>
            </div>
          </section>

          {/* 2. Digital Goods Waiver Exception */}
          <section className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              2. Premature Expiry of Withdrawal Rights for Digital Content (§ 356(5) BGB)
            </h2>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
              <p className="text-xs sm:text-sm">
                Under German Civil Code (§ 356(5) BGB) and EU Directive 2011/83/EU, the statutory right of withdrawal in contracts for the supply of digital content not provided on a tangible medium (such as downloadable software and license keys) expires if:
              </p>
              <ul className="list-disc space-y-1.5 pl-5 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                <li>the consumer has expressly consented to beginning execution of the contract before the expiration of the withdrawal period,</li>
                <li>the consumer has acknowledged that they lose their right of withdrawal upon commencement of the contract execution, and</li>
                <li>the merchant has provided confirmation on a durable medium.</li>
              </ul>
              <div className="rounded-xl bg-zinc-50 border border-zinc-200 p-4 text-xs text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
                <strong>Important Note:</strong> Regardless of statutory digital goods exceptions, <em>phpinfo() WP&apos;s voluntary 14-day 100% money-back guarantee applies unconditionally to all purchases</em>.
              </div>
            </div>
          </section>

          {/* 3. Model Withdrawal Form */}
          <section className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              3. Model Withdrawal Form
            </h2>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
              (Complete and return this form only if you wish to withdraw from the contract under statutory rules)
            </p>
            <div className="mt-4 rounded-xl bg-zinc-50 border border-zinc-200 p-5 font-mono text-xs text-zinc-800 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 space-y-2.5 leading-relaxed">
              <p>
                To:<br />
                Emran Hossain Sagor, phpinfo() WP<br />
                Peter-Hille-Weg 13<br />
                33098 Paderborn<br />
                Germany<br />
                Email: support@phpinfowp.com
              </p>
              <p>
                I/We (*) hereby give notice that I/We (*) withdraw from my/our (*) contract of sale of the following goods (*) / for the provision of the following service (*):
              </p>
              <p>
                Ordered on (*) / received on (*): __________________________<br />
                Name of consumer(s): __________________________<br />
                Address of consumer(s): __________________________<br />
                Email address used for purchase: __________________________<br />
                License key: __________________________
              </p>
              <p>
                Date: __________________________<br />
                Signature of consumer(s) (only if communicated on paper)
              </p>
              <p className="text-[11px] text-zinc-400">
                (*) Delete as appropriate.
              </p>
            </div>
          </section>

          {/* 4. Contact */}
          <section className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              4. Fast Refund Support
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
              For fastest processing under our 14-day satisfaction guarantee, simply email:
            </p>
            <div className="mt-3">
              <a
                href="mailto:support@phpinfowp.com?subject=Refund%20Request%20-%20phpinfo()%20WP"
                className="inline-flex items-center gap-2 rounded-xl bg-violet-50 px-4 py-2.5 text-xs sm:text-sm font-semibold text-violet-700 hover:bg-violet-100 dark:bg-violet-950/60 dark:text-violet-300 dark:hover:bg-violet-900/60">
                <Mail className="h-4 w-4" />
                <span>support@phpinfowp.com</span>
              </a>
            </div>
            <p className="text-xs text-zinc-400 pt-4">
              Last updated: {LAST_UPDATED}
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
