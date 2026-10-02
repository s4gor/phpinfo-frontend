"use client";

import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ExeebitBar from "@/components/exeebit-bar";
import { Shield, FileText, Globe, Mail, Phone } from "lucide-react";

const LAST_UPDATED = "14 September 2026";

export default function ImpressumPage() {
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
            <Shield className="h-3.5 w-3.5" />
            <span>Legal Notice / Impressum</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Impressum
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Information pursuant to Section 5 of the German Digital Services Act (§ 5 DDG, formerly TMG).
          </p>
        </div>

        <div className="space-y-6">
          {/* 1. Service Provider Details */}
          <section className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              1. Service Provider (Diensteanbieter)
            </h2>
            <div className="mt-3 space-y-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
              <p>
                <strong className="text-zinc-900 dark:text-zinc-100">Full Legal Name:</strong> Emran Hossain Sagor
              </p>
              <p>
                <strong className="text-zinc-900 dark:text-zinc-100">Legal Form:</strong> Sole Proprietorship (Einzelunternehmer) · Software Development &amp; Digital Products
              </p>
              <p>
                <strong className="text-zinc-900 dark:text-zinc-100">Registered Business Address:</strong><br />
                Emran Hossain Sagor<br />
                Brüderstraße<br />
                59494 Soest<br />
                Germany<br />
                <span className="text-xs text-zinc-500 italic">
                  (Note: Business location relocating to Paderborn, Germany in October 2026)
                </span>
              </p>
            </div>
          </section>

          {/* 2. Contact Information */}
          <section className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              2. Contact Information (Kontaktaufnahme)
            </h2>
            <div className="mt-3 space-y-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
              <p>
                <strong className="text-zinc-900 dark:text-zinc-100">Email:</strong>{" "}
                <a href="mailto:support@exeebit.com" className="text-violet-600 dark:text-violet-400 underline underline-offset-2">
                  support@exeebit.com
                </a>{" "}
                /{" "}
                <a href="mailto:emran@exeebit.com" className="text-violet-600 dark:text-violet-400 underline underline-offset-2">
                  emran@exeebit.com
                </a>
              </p>
              <p>
                <strong className="text-zinc-900 dark:text-zinc-100">Phone:</strong>{" "}
                <a href="tel:+491755075508" className="text-violet-600 dark:text-violet-400 underline underline-offset-2">
                  +49 175 5075508
                </a>
              </p>
              <p>
                <strong className="text-zinc-900 dark:text-zinc-100">Website:</strong>{" "}
                <a href="https://exeebit.com" target="_blank" rel="noopener noreferrer" className="text-violet-600 dark:text-violet-400 underline underline-offset-2">
                  https://exeebit.com
                </a>
              </p>
            </div>
          </section>

          {/* 3. Tax Identifiers & Small Business Status */}
          <section className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              3. Tax Identifiers &amp; Small Business Status
            </h2>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
              <div className="rounded-xl bg-zinc-50 border border-zinc-200 p-4 text-xs sm:text-sm text-zinc-800 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200">
                Pursuant to § 19 UStG (German Value Added Tax Act - Small Business Regulation / <em>Kleinunternehmerregelung</em>), value added tax (VAT / Umsatzsteuer) is not charged or displayed on invoices.
              </div>
              <p className="text-xs text-zinc-500">
                Tax ID / Steuernummer: In regular tax registration processing (Finanzamt Soest / Paderborn, Germany).
              </p>
            </div>
          </section>

          {/* 4. Responsible for Editorial Content */}
          <section className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              4. Responsible for Content (§ 18 Para. 2 MStV)
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
              Emran Hossain Sagor<br />
              Brüderstraße, 59494 Soest, Germany
            </p>
          </section>

          {/* 5. Online Dispute Resolution */}
          <section className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              5. EU Online Dispute Resolution &amp; Consumer Arbitration
            </h2>
            <div className="mt-3 space-y-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
              <p>
                The European Commission provides a platform for online dispute resolution (ODR), accessible at:
              </p>
              <p>
                <a
                  href="https://ec.europa.eu/consumers/odr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-violet-600 dark:text-violet-400 underline underline-offset-2">
                  https://ec.europa.eu/consumers/odr
                </a>
              </p>
              <p className="text-xs text-zinc-500 pt-1">
                We are neither obligated nor willing to participate in dispute settlement proceedings before a consumer arbitration board (§ 36 VSBG).
              </p>
            </div>
          </section>

          {/* 6. Liability & Copyright */}
          <section className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              6. Liability for Content, Links &amp; Copyright
            </h2>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
              <p className="text-xs sm:text-sm">
                As a service provider, we are responsible for our own content on these pages under general laws pursuant to § 7 Para. 1 DDG. According to §§ 8 to 10 DDG, we are not obligated to monitor transmitted or stored third-party information or investigate circumstances that indicate illegal activity.
              </p>
              <p className="text-xs sm:text-sm">
                Our pages contain links to external third-party websites. We have no influence over the contents of those sites; therefore, we cannot assume liability for third-party content. The respective provider or operator is always responsible.
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
