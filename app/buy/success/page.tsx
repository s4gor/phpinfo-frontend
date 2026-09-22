import type { Metadata } from "next";
import Link from "next/link";
import { getLicenseBySessionId } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { issueLicenseForSession } from "@/lib/license-issue";
import PurchaseTracker from "@/components/purchase-tracker";
import CopyButton from "@/components/copy-button";
import MimonousUpsell from "@/components/mimonous-upsell";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Order Confirmed - phpinfo() WP Pro",
  description:
    "Your phpinfo() WP Pro license is ready. Paste it in your WordPress admin to unlock every Pro feature.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/" },
};

interface SuccessPageProps {
  searchParams: { session_id?: string };
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const sessionId = searchParams.session_id;
  let license = sessionId ? await getLicenseBySessionId(sessionId) : null;

  // Fallback: if the webhook hasn't fired (or failed), pull the session from
  // Stripe directly and issue the license inline. issueLicenseForSession is
  // idempotent, so this is safe to race against the webhook - whoever wins
  // writes; the loser reads the same record.
  if (!license && sessionId) {
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      license = await issueLicenseForSession(session);
    } catch (err) {
      console.error("[success-page] stripe fallback failed", err);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-20">
      <div className="w-full max-w-2xl">
      <div className="w-full rounded-xl border border-zinc-200 bg-white p-8 shadow-[0_0_60px_-15px_rgba(167,139,250,0.25)]">
        <div className="mb-5 flex items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-violet-200/80 bg-violet-50 shadow-xs">
            <img
              src="/logo.svg"
              alt="phpinfo() WP Pro"
              className="h-6 w-6"
            />
          </span>
          <div className="flex items-center gap-1.5 text-violet-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <path d="m9 11 3 3L22 4" />
            </svg>
            <span className="text-xs font-bold uppercase tracking-widest">
              Payment confirmed
            </span>
          </div>
        </div>

        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 md:text-3xl">
          Thanks for buying phpinfo() WP Pro
        </h1>

        <p className="mt-3 text-sm text-zinc-600">
          Your license is shown below and we've also emailed it to you. Paste it
          in <strong className="text-zinc-800">phpinfo() WP → License</strong>{" "}
          inside your WordPress admin to unlock every Pro feature.
        </p>

        {license ? (
          <>
            <div className="mt-6 rounded-xl border border-violet-200/90 bg-violet-50/70 p-4 sm:p-5 shadow-xs">
              <div className="mb-2 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-600">
                    Your license key
                  </span>
                  <span className="rounded-full bg-violet-200/80 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-violet-800">
                    {license.tier}
                  </span>
                </div>
                <CopyButton text={license.key} />
              </div>
              <code className="block break-all rounded-lg bg-white px-3.5 py-2.5 font-mono text-xs font-medium text-violet-900 border border-violet-200/70 shadow-xs select-all">
                {license.key}
              </code>
            </div>
            {sessionId && (
              <PurchaseTracker transactionId={sessionId} tier={license.tier} />
            )}
          </>
        ) : (
          <div className="mt-6 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-700">
            <strong>One moment.</strong> Your license is being generated. Check
            your inbox in the next minute, or refresh this page. If it doesn't
            arrive, email{" "}
            <a
              href="mailto:support@exeebit.com"
              className="underline underline-offset-2">
              support@exeebit.com
            </a>{" "}
            with your order number - we'll resend instantly.
          </div>
        )}

        <ol className="mt-6 space-y-3 text-sm text-zinc-700">
          <li>
            <strong className="text-zinc-900">1.</strong> Install (or update to v8+) the free plugin from{" "}
            <a
              href="https://wordpress.org/plugins/phpinfo-wp/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-violet-700 underline underline-offset-2 hover:text-violet-700">
              WordPress.org
            </a>
            .
          </li>
          <li>
            <strong className="text-zinc-900">2.</strong> In your WP admin, open{" "}
            <strong>phpinfo() WP → License</strong>.
          </li>
          <li>
            <strong className="text-zinc-900">3.</strong> Paste the key, click{" "}
            <strong>Activate</strong>. Done.
          </li>
        </ol>

        <div className="mt-8 flex flex-col gap-3 border-t border-zinc-200 pt-6 text-sm text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
          <span>
            Need help?{" "}
            <a
              href="mailto:support@exeebit.com"
              className="text-violet-700 underline underline-offset-2">
              support@exeebit.com
            </a>
          </span>
          <Link
            href="/"
            className="text-zinc-700 underline underline-offset-2 hover:text-violet-700">
            Back to phpinfo() WP
          </Link>
        </div>
      </div>

      {/* Mimonous upsell temporarily hidden - will re-enable later */}
      {/* <MimonousUpsell /> */}
      </div>
    </main>
  );
}
