"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ExeebitBar from "@/components/exeebit-bar";
import AnimatedArrow from "@/components/ui/animated-arrow";
import {
  Mail,
  Bug,
  Lightbulb,
  CreditCard,
  MessageSquare,
  Clock,
  CheckCircle2,
  ExternalLink,
  Shield,
  HelpCircle,
  Send,
} from "lucide-react";
import { toast } from "sonner";

const SUPPORT_EMAIL = "support@exeebit.com";

function mailto(subject: string, body?: string) {
  const params = new URLSearchParams({ subject });
  if (body) params.set("body", body);
  return `mailto:${SUPPORT_EMAIL}?${params.toString()}`;
}

const quickActions = [
  {
    icon: Bug,
    title: "Report a Bug",
    description: "Encountered an unexpected error or edge case? Let us know your WP/PHP version.",
    href: mailto(
      "Bug Report - phpinfo() WP",
      "WordPress Version:\nPHP Version:\nActive Plugins/Theme:\nIssue Description:\nSteps to Reproduce:\n"
    ),
    badge: "Technical",
    accent: "text-rose-600 dark:text-rose-400",
    bg: "bg-rose-50 dark:bg-rose-950/40",
  },
  {
    icon: Lightbulb,
    title: "Feature Request",
    description: "Ideas for v8.1+? We read every suggestion and prioritize real agency workflows.",
    href: mailto(
      "Feature Request - phpinfo() WP",
      "I would love to see:\nHow it helps my workflow:\n"
    ),
    badge: "Roadmap",
    accent: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-950/40",
  },
  {
    icon: CreditCard,
    title: "Billing & Refunds",
    description: "License key lookup, invoice queries, or 14-day 100% money-back guarantee requests.",
    href: mailto(
      "Billing & Refund Request",
      "Order Email:\nLicense Key (if known):\nRequest Details:\n"
    ),
    badge: "14-Day Guarantee",
    accent: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-950/40",
  },
  {
    icon: MessageSquare,
    title: "Community Forum",
    description: "Ask questions on the official WordPress.org support forum for the free edition.",
    href: "https://wordpress.org/support/plugin/phpinfo-wp/",
    external: true,
    badge: "Free Support",
    accent: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-950/40",
  },
];

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("Technical Support");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !message) {
      toast.error("Please fill in your email and message.");
      return;
    }

    // Open mailto fallback client-side for seamless delivery
    const subject = `[${category}] Inquiry from ${name || email}`;
    const body = `Name: ${name}\nEmail: ${email}\nCategory: ${category}\n\nMessage:\n${message}`;
    window.location.href = mailto(subject, body);

    setSubmitted(true);
    toast.success("Opening your email client to send your inquiry!");
  };

  return (
    <main className="flex min-h-screen flex-col items-center overflow-x-clip bg-zinc-50/50 dark:bg-zinc-950 pt-24 sm:pt-28 lg:pt-36">
      <div className="fixed left-0 right-0 top-0 z-[60]">
        <ExeebitBar />
        <Header />
      </div>

      {/* Hero Section */}
      <section className="w-full max-w-5xl px-4 sm:px-6 lg:px-8 pt-4 pb-10 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3.5 py-1 text-xs font-semibold text-violet-700 dark:border-violet-900/60 dark:bg-violet-950/40 dark:text-violet-300 mb-3">
          <Mail className="h-3.5 w-3.5" />
          <span>Direct Studio Support</span>
        </div>

        <h1 className="max-w-3xl text-balance text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl md:text-6xl leading-[1.12] mx-auto">
          How can we help?
        </h1>

        <p className="mt-4 text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          One direct inbox for all phpinfo() WP questions, technical assistance, and billing. We typically reply within 24–48 hours on business days.
        </p>
      </section>

      {/* Main Content Grid: Direct Email Card + Contact Form */}
      <section className="w-full max-w-5xl px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct email + Quick Actions */}
          <div className="lg:col-span-5 space-y-6">
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="group block rounded-2xl border border-violet-200 bg-white p-6 sm:p-8 shadow-xs transition-all hover:border-violet-400 hover:shadow-md dark:border-violet-900/50 dark:bg-zinc-900">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300 mb-4 group-hover:scale-105 transition-transform">
                <Mail className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                Email us directly
              </h2>
              <p className="mt-1.5 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Direct inbox managed by founder Emran Hossain Sagor. No automated support bots.
              </p>
              <div className="mt-4 font-mono text-sm font-semibold text-violet-600 dark:text-violet-400 group-hover:underline">
                {SUPPORT_EMAIL}
              </div>
            </a>

            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  Response Hours
                </h3>
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Monday to Friday: 09:00 – 18:00 CET (Central European Time). Urgent licensing or update crash inquiries receive priority triage.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  Privacy Guarantee
                </h3>
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                We never ask for your WordPress admin password or hosting root credentials over unencrypted channels. Diagnostics and logs are kept strictly confidential.
              </p>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-1">
                Send a Message
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mb-6">
                Fill in the details below to reach our team immediately.
              </p>

              {submitted ? (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-6 text-center dark:border-emerald-900/60 dark:bg-emerald-950/40">
                  <CheckCircle2 className="h-10 w-10 text-emerald-600 dark:text-emerald-400 mx-auto mb-3" />
                  <h3 className="text-base font-bold text-emerald-950 dark:text-emerald-100">
                    Thank you!
                  </h3>
                  <p className="mt-1 text-xs text-emerald-800 dark:text-emerald-300">
                    Your inquiry email draft has been prepared. We look forward to reviewing your message.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 text-xs font-semibold text-emerald-700 dark:text-emerald-400 underline">
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">
                        Your Name
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Alex Morgan"
                        className="w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-violet-500 focus:outline-hidden dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="alex@agency.com"
                        className="w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-violet-500 focus:outline-hidden dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">
                      Inquiry Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-sm text-zinc-900 focus:border-violet-500 focus:outline-hidden dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100">
                      <option value="Technical Support">Technical Support / Diagnostics</option>
                      <option value="Bug Report">Bug Report</option>
                      <option value="Feature Request">Feature Request</option>
                      <option value="Billing & Refunds">Billing &amp; 14-Day Refund</option>
                      <option value="Agency & Bulk Licensing">Agency &amp; Bulk Licensing</option>
                      <option value="Other">Other / General</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">
                      Message <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Please include relevant details such as your WordPress version, PHP version, or license key if applicable..."
                      className="w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-violet-500 focus:outline-hidden dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
                    />
                  </div>

                  <button
                    type="submit"
                    className="group inline-flex items-center justify-center gap-2 w-full rounded-xl bg-violet-500 hover:bg-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_20px_-6px_rgba(167,139,250,0.6)] transition-all">
                    <span>Send Inquiry</span>
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions Grid */}
      <section className="w-full max-w-5xl px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-4">
          Quick Help &amp; Topic Templates
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            const content = (
              <div className="flex flex-col h-full rounded-xl border border-zinc-200 bg-white p-5 shadow-xs transition-all hover:border-violet-300 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700">
                <div className="flex items-center justify-between mb-3">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${action.bg}`}>
                    <Icon className={`h-4.5 w-4.5 ${action.accent}`} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    {action.badge}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-1">
                  {action.title}
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed flex-1">
                  {action.description}
                </p>
                <div className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-violet-600 dark:text-violet-400">
                  <span>Open topic</span>
                  {action.external ? (
                    <ExternalLink className="h-3 w-3" />
                  ) : (
                    <AnimatedArrow className="ml-1" />
                  )}
                </div>
              </div>
            );

            return action.external ? (
              <a
                key={action.title}
                href={action.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full">
                {content}
              </a>
            ) : (
              <a key={action.title} href={action.href} className="block h-full">
                {content}
              </a>
            );
          })}
        </div>
      </section>

      <Footer />
    </main>
  );
}
