"use client";

import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ExeebitBar from "@/components/exeebit-bar";
import { ShieldCheck, Lock, Shield, Server, FileText } from "lucide-react";
import CookieSettingsButton from "@/components/cookie-trigger";
import LegalOperatorCard from "@/components/legal-operator-card";

const LAST_UPDATED = "14 September 2026";

export default function PrivacyPage() {
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
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>EU GDPR Compliance</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Privacy Policy
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Information pursuant to Articles 12, 13, and 14 of the EU General Data Protection Regulation (GDPR).
          </p>
        </div>

        {/* Core Architecture Privacy Badge */}
        <div className="mb-8 rounded-2xl border border-violet-200 bg-violet-50/60 p-6 sm:p-8 dark:border-violet-900/50 dark:bg-violet-950/20">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-700 dark:bg-violet-900/60 dark:text-violet-300">
              <Server className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                Crucial Privacy Architecture: 100% In-Admin Diagnostics
              </h2>
              <p className="mt-1.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                Unlike external SaaS monitoring services, <strong className="text-zinc-900 dark:text-zinc-100">phpinfo() WP is 100% self-hosted on your WordPress server</strong>. Your server configuration, PHP diagnostics, database schema indexes, user activity logs, and error logs are processed and rendered entirely within your local WordPress database and admin dashboard. <em>They never leave your host and are never transmitted to phpinfo() WP or third-party servers.</em>
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* 1. Data Controller */}
          <section className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              1. Data Controller
            </h2>
            <div className="mt-3 space-y-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
              <p>
                The data controller responsible for the processing of personal data on this website under Article 4(7) GDPR is:
              </p>
              <LegalOperatorCard />
            </div>
          </section>

          {/* 2. Web Hosting & Server Logs */}
          <section className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              2. Web Hosting &amp; Server Logs
            </h2>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
              <p>
                Our website is hosted by <strong className="text-zinc-900 dark:text-zinc-100">Vercel Inc.</strong> (440 N Barranca Ave #4133, Covina, CA 91723, USA).
              </p>
              <p>
                When you access our marketing website, servers automatically log connection data transmitted by your browser:
              </p>
              <ul className="list-disc space-y-1 pl-5 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                <li>IP address of the requesting device</li>
                <li>Date, timestamp, and HTTP method of access</li>
                <li>Requested URL path and resource</li>
                <li>HTTP status code and payload size</li>
                <li>User agent header (browser type, OS, and version)</li>
              </ul>
              <p>
                <strong>Legal Basis:</strong> Art. 6(1)(f) GDPR (our legitimate interest in ensuring system security, prevention of DDoS attacks, and stable content delivery). Vercel is certified under the EU-US Data Privacy Framework (DPF) and complies with EU Standard Contractual Clauses (SCCs).
              </p>
            </div>
          </section>

          {/* 3. Payment Processing with Stripe */}
          <section className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              3. Payment Processing via Stripe
            </h2>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
              <p>
                We process commercial software licenses and subscription checkouts through <strong className="text-zinc-900 dark:text-zinc-100">Stripe Payments Europe, Ltd.</strong> (1 Grand Canal Street Lower, Grand Canal Dock, Dublin, D02 H210, Ireland).
              </p>
              <p>
                When purchasing a license, transaction details (name, billing email, billing address, country, card details) are submitted directly to Stripe over TLS 1.3 encryption. We never see or store full credit card numbers or security CVV codes on our servers.
              </p>
              <p>
                <strong>Legal Basis:</strong> Performance of a contract under Art. 6(1)(b) GDPR, and compliance with German tax and accounting retention requirements under Art. 6(1)(c) GDPR (§ 147 German Fiscal Code / AO).
              </p>
            </div>
          </section>

          {/* 4. License Issuance & Support */}
          <section className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              4. License Key Issuance &amp; Support Correspondence
            </h2>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
              <p>
                Upon order completion, we record your purchase email address, issued license key, and plan tier (Single Site, Unlimited, Lifetime) in our secure license verification system to validate automated plugin updates and support eligibility (Art. 6(1)(b) GDPR).
              </p>
              <p>
                When you contact support, your email and conversation context are retained solely to resolve technical queries and maintain warranty records (Art. 6(1)(f) and Art. 6(1)(b) GDPR).
              </p>
            </div>
          </section>

          {/* 5. Analytics & Cookie Preferences */}
          <section className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              5. Analytics &amp; Cookies (Google Analytics 4 / Consent Mode v2)
            </h2>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
              <p>
                We use <strong className="text-zinc-900 dark:text-zinc-100">Google Analytics 4</strong> (Google Ireland Limited) to evaluate anonymous, aggregated visitor traffic to improve our software documentation and UX.
              </p>
              <p>
                We implement <strong className="text-zinc-900 dark:text-zinc-100">Google Consent Mode v2</strong>. Analytics cookies remain strictly disabled until you explicitly provide opt-in consent via our consent banner.
              </p>
              <div className="rounded-xl border border-zinc-200 dark:border-zinc-800">
                <div className="overflow-x-auto sm:overflow-x-visible">
                  <table className="w-full text-xs sm:text-sm border-collapse">
                    <thead>
                      <tr className="bg-zinc-100/90 dark:bg-zinc-850/90 border-b border-zinc-200 dark:border-zinc-800 text-[11px] uppercase tracking-wider text-zinc-600 dark:text-zinc-300">
                        <th className="px-4 py-2.5 text-left font-semibold first:rounded-tl-xl">Cookie</th>
                        <th className="px-4 py-2.5 text-left font-semibold">Purpose</th>
                        <th className="px-4 py-2.5 text-left font-semibold last:rounded-tr-xl">Lifespan</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                      <tr>
                        <td className="px-4 py-2.5 font-mono text-xs text-violet-600 dark:text-violet-400">_ga</td>
                        <td className="px-4 py-2.5 text-zinc-700 dark:text-zinc-300">Distinguishes unique website visitors anonymously</td>
                        <td className="px-4 py-2.5 text-zinc-500">2 years</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2.5 font-mono text-xs text-violet-600 dark:text-violet-400">_ga_*</td>
                        <td className="px-4 py-2.5 text-zinc-700 dark:text-zinc-300">Maintains session state and page view counters</td>
                        <td className="px-4 py-2.5 text-zinc-500">2 years</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <p>
                <strong>Legal Basis:</strong> Art. 6(1)(a) GDPR (Consent). You can modify or revoke consent at any time:{" "}
                <CookieSettingsButton className="inline-flex items-center gap-1 text-violet-600 dark:text-violet-400 underline font-medium hover:text-violet-800 dark:hover:text-violet-300 cursor-pointer" />
              </p>
            </div>
          </section>

          {/* 6. Your Rights */}
          <section className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              6. Your GDPR Rights (Articles 15-21)
            </h2>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
              <p>Under the GDPR, you have the right to:</p>
              <ul className="list-disc space-y-1.5 pl-5 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                <li><strong className="text-zinc-800 dark:text-zinc-200">Access (Art. 15):</strong> Request confirmation and copies of personal data held about you.</li>
                <li><strong className="text-zinc-800 dark:text-zinc-200">Rectification (Art. 16):</strong> Correct inaccurate or incomplete records.</li>
                <li><strong className="text-zinc-800 dark:text-zinc-200">Erasure (Art. 17):</strong> Request deletion of your personal data where legal retention permits.</li>
                <li><strong className="text-zinc-800 dark:text-zinc-200">Restriction (Art. 18):</strong> Restrict the processing of your data under statutory criteria.</li>
                <li><strong className="text-zinc-800 dark:text-zinc-200">Data Portability (Art. 20):</strong> Receive your personal data in structured machine-readable format.</li>
                <li><strong className="text-zinc-800 dark:text-zinc-200">Objection (Art. 21):</strong> Object to processing based on legitimate interests.</li>
              </ul>
              <p className="pt-2">
                To exercise any right, contact:{" "}
                <a href="mailto:support@phpinfowp.com" className="text-violet-600 dark:text-violet-400 underline underline-offset-2">
                  support@phpinfowp.com
                </a>.
              </p>
            </div>
          </section>

          {/* 7. Supervisory Authority */}
          <section className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              7. Competent Supervisory Authority
            </h2>
            <div className="mt-3 space-y-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
              <p>
                You have the statutory right under Article 77 GDPR to file a complaint with a data protection supervisory authority. Our competent regional authority is:
              </p>
              <div className="rounded-xl bg-zinc-50 border border-zinc-200 p-4 text-xs sm:text-sm text-zinc-800 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200">
                <strong>Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen (LDI NRW)</strong><br />
                Kavalleriestraße 2-4, 40213 Düsseldorf, Germany<br />
                Website:{" "}
                <a href="https://www.ldi.nrw.de" target="_blank" rel="noopener noreferrer" className="text-violet-600 dark:text-violet-400 underline">
                  https://www.ldi.nrw.de
                </a>
              </div>
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
