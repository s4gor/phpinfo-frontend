"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ExeebitBar from "@/components/exeebit-bar";
import AnimatedArrow from "@/components/ui/animated-arrow";
import AnimatedShinyText from "@/components/ui/shimmer-text";
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
  ChevronDown,
  Copy,
  Check,
} from "lucide-react";
import { toast } from "sonner";

const SUPPORT_EMAIL = "support@phpinfowp.com";

function mailto(subject: string, body?: string) {
  const params = new URLSearchParams({ subject });
  if (body) params.set("body", body);
  return `mailto:${SUPPORT_EMAIL}?${params.toString()}`;
}

const topicPills = [
  {
    label: "🐛 Bug / Conflict",
    category: "Bug Report",
    scaffold: "• WordPress Version:\n• PHP Version:\n• Active Plugins/Theme:\n• What happened:\n• Error message or steps to reproduce:\n",
  },
  {
    label: "🏢 Agency / White-Label",
    category: "Agency & Bulk Licensing",
    scaffold: "• Agency / Company Name:\n• Number of Client Sites Managed:\n• Questions about White-Label / Multi-site:\n",
  },
  {
    label: "🔑 License & Billing",
    category: "Billing & Refunds",
    scaffold: "• Order Email:\n• License Key (if known):\n• Inquiry / 14-Day Refund Request Details:\n",
  },
  {
    label: "⚡ Performance / OPcache",
    category: "Technical Support",
    scaffold: "• Host / Server OS:\n• PHP Version:\n• Symptoms (slow TTFB, memory limit, OPcache buffer):\n",
  },
];

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
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(SUPPORT_EMAIL);
    setCopied(true);
    toast.success("Email address copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePillClick = (pill: typeof topicPills[0]) => {
    setCategory(pill.category);
    if (!message || topicPills.some((p) => p.scaffold === message)) {
      setMessage(pill.scaffold);
    }
  };

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
      <section className="w-full max-w-5xl px-4 sm:px-6 lg:px-8 pt-4 text-center">
        <div className="flex w-full max-w-4xl mx-auto flex-col items-center text-center">
          <div className="mb-3.5">
            <div className="group inline-flex items-center gap-2 rounded-full border border-violet-200/90 bg-violet-50/90 hover:bg-violet-100/90 px-3.5 py-1.5 text-center transition-all duration-150 shadow-xs dark:border-violet-900/60 dark:bg-violet-950/40">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <AnimatedShinyText className="text-xs font-semibold text-violet-800 dark:text-violet-300">
                <span>Direct Studio Support</span>
              </AnimatedShinyText>
            </div>
          </div>

          <h1 className="max-w-4xl text-balance text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl md:text-6xl leading-[1.12] mx-auto">
            Direct developer support.{" "}
            <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              How can we help?
            </span>
          </h1>

          <p className="md:mt-5 mt-3.5 text-base text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            One direct inbox for all phpinfo() WP questions, technical assistance, and billing. We typically reply within 24-48 hours on business days.
          </p>
        </div>
      </section>

      {/* Main Content Grid: Unified Studio Desk Card + Contact Form */}
      <section className="w-full max-w-5xl px-4 sm:px-6 lg:px-8 pt-16 md:pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Unified Studio Desk Card */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="flex-1 flex flex-col justify-between rounded-2xl border border-zinc-200/90 bg-white p-6 sm:p-7 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
              {/* Header: Live Status + Studio Location */}
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/60 rounded-full px-2.5 py-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Desk Active</span>
                  </span>
                  <span className="text-[11px] text-zinc-400 font-mono">
                    Paderborn, DE · CET
                  </span>
                </div>

                {/* Direct Email with 1-Click Copy */}
                <div className="pt-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300 mb-3.5">
                    <Mail className="h-5 w-5" />
                  </div>
                  <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                    Direct Engineering Inbox
                  </h2>
                  <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Direct founder-level technical oversight. No tier-1 offshore support runarounds, real answers from core engineers.
                  </p>

                  <div className="mt-3.5 flex items-center justify-between gap-2 p-2.5 rounded-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
                    <span className="font-mono text-xs sm:text-[13px] font-semibold text-violet-700 dark:text-violet-300 select-all">
                      {SUPPORT_EMAIL}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="inline-flex items-center gap-1 rounded-lg bg-white px-2.5 py-1 text-xs font-semibold text-zinc-700 shadow-2xs hover:bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700 transition-colors shrink-0">
                      {copied ? (
                        <>
                          <Check className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                          <span className="text-emerald-700 dark:text-emerald-400 font-bold">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3 text-zinc-500" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Key Commitments Strip */}
                <div className="pt-6 space-y-3">
                  <div className="flex items-start gap-2.5 text-xs text-zinc-600 dark:text-zinc-400">
                    <Clock className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-zinc-900 dark:text-zinc-200 block text-xs">~24h Response Window</strong>
                      <span>Monday to Friday (09:00 - 18:00 CET). Production crash inquiries receive immediate priority triage.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 text-xs text-zinc-600 dark:text-zinc-400">
                    <Shield className="h-4 w-4 text-violet-600 dark:text-violet-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-zinc-900 dark:text-zinc-200 block text-xs">Zero Credential Sharing</strong>
                      <span>We never ask for your WordPress admin password or SSH keys. All diagnostics are handled safely.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Founder Assurance Footer Note */}
              <div className="pt-6 mt-6 border-t border-zinc-100 dark:border-zinc-800 flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-violet-600 to-indigo-600 text-white font-bold flex items-center justify-center text-xs shadow-xs shrink-0">
                  ES
                </div>
                <div className="text-xs leading-tight">
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100 block">
                    Emran Hossain Sagor
                  </span>
                  <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
                    Founder &amp; Systems Engineer
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="flex-1 flex flex-col justify-between rounded-2xl border border-zinc-200/90 bg-white p-6 sm:p-8 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
              <div>
                <div className="flex items-center justify-between flex-wrap gap-2 mb-1">
                  <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                    Send a Message
                  </h2>
                  <span className="text-[11px] text-zinc-400">
                    Direct technical triage
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mb-5">
                  Pick a topic below to auto-scaffold details, or write freely.
                </p>

                {/* Quick Topic Chips (Interactive Scaffolding) */}
                <div className="mb-5 flex flex-wrap gap-2">
                  {topicPills.map((pill) => (
                    <button
                      key={pill.label}
                      type="button"
                      onClick={() => handlePillClick(pill)}
                      className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all ${
                        category === pill.category
                          ? "border-violet-400/80 bg-violet-50 text-violet-800 dark:border-violet-700 dark:bg-violet-950/60 dark:text-violet-200 shadow-2xs"
                          : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-800"
                      }`}>
                      <span>{pill.label}</span>
                    </button>
                  ))}
                </div>

                {submitted ? (
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-6 text-center dark:border-emerald-900/60 dark:bg-emerald-950/40">
                    <CheckCircle2 className="h-10 w-10 text-emerald-600 dark:text-emerald-400 mx-auto mb-3" />
                    <h3 className="text-base font-bold text-emerald-950 dark:text-emerald-100">
                      Inquiry Prepared!
                    </h3>
                    <p className="mt-1 text-xs text-emerald-800 dark:text-emerald-300">
                      Your email client has been opened with your inquiry. We look forward to reviewing your message.
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
                          className="w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 focus:outline-hidden dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 transition-all shadow-2xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">
                          Work Email <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="alex@agency.com"
                          className="w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 focus:outline-hidden dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 transition-all shadow-2xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">
                        Inquiry Category
                      </label>
                      <div className="relative">
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className="w-full appearance-none rounded-xl border border-zinc-200 bg-white pl-3.5 pr-10 py-2.5 text-sm text-zinc-900 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 focus:outline-hidden dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 cursor-pointer transition-all shadow-2xs">
                          <option value="Technical Support">Technical Support / Diagnostics</option>
                          <option value="Bug Report">Bug Report &amp; Conflict</option>
                          <option value="Agency & Bulk Licensing">Agency Fleet &amp; White-Label</option>
                          <option value="Billing & Refunds">Billing &amp; 14-Day Refund</option>
                          <option value="Feature Request">Feature Request</option>
                          <option value="Other">Other / General</option>
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 dark:text-zinc-500" />
                      </div>
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
                        className="w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 focus:outline-hidden dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 transition-all shadow-2xs font-sans"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                        🔒 Confidential &bull; 100% In-Admin &bull; No Spam
                      </p>
                      <button
                        type="submit"
                        className="group inline-flex items-center justify-center gap-2 h-11 rounded-xl bg-violet-600 hover:bg-violet-700 px-6 text-sm font-semibold text-white shadow-[0_0_20px_-6px_rgba(124,58,237,0.5)] hover:-translate-y-0.5 active:translate-y-0 transition-all w-full sm:w-auto">
                        <span>Send to Engineering Desk</span>
                        <Send className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions Grid */}
      <section className="w-full max-w-5xl px-4 sm:px-6 lg:px-8 pt-16 md:pt-24">
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
