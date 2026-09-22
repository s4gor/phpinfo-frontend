import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Checkout Cancelled - phpinfo() WP Pro",
  description:
    "Checkout cancelled. No charge was made. Come back when you're ready to pick a phpinfo() WP Pro tier.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/" },
};

export default function CancelPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-20">
      <div className="w-full max-w-md rounded-xl border border-zinc-200 bg-white p-8 text-center">
        <div className="mb-2 text-xs font-bold uppercase tracking-widest text-zinc-600">
          Checkout cancelled
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
          No charge was made.
        </h1>
        <p className="mt-3 text-sm text-zinc-600">
          You closed the checkout before completing payment. Whenever you&apos;re
          ready, come back and pick a tier.
        </p>
        <div className="mt-6 flex flex-col gap-2">
          <Link
            href="/#pricing"
            className="w-full rounded-md bg-violet-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-violet-600">
            See pricing again
          </Link>
          <Link
            href="/"
            className="w-full rounded-md border border-border bg-zinc-100 px-4 py-2.5 text-sm font-semibold text-zinc-900 hover:bg-zinc-200">
            Back to phpinfo() WP
          </Link>
        </div>
        <p className="mt-6 text-xs text-zinc-500">
          Questions?{" "}
          <a
            href="mailto:support@exeebit.com"
            className="text-violet-700 underline underline-offset-2">
            support@exeebit.com
          </a>
        </p>
      </div>
    </main>
  );
}
