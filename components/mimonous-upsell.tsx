import { Check } from "lucide-react";

const MIMONOUS_URL =
  "https://mimonous.com/?utm_source=exeebit&utm_medium=success&utm_campaign=phpinfo-wp";

const POINTS = [
  "Send quotes clients approve in one click",
  "Convert approved quotes to invoices instantly",
  "See when it's viewed, approved & paid",
];

const EXTRAS = [
  "Multi-currency with real-time forex",
  "Recurring invoices & retainers",
  "Real-time comments & presence",
  "Stripe & PayPal collection",
];

export default function MimonousUpsell() {
  return (
    <aside className="flex w-full flex-col rounded-xl border border-violet-200 bg-white p-7 shadow-[0_0_60px_-15px_rgba(124,58,237,0.3)] lg:flex-1">
      <div className="mb-5 flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-violet-100 bg-violet-50 shadow-sm">
          <svg className="h-6 w-6" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect x="4" y="4" width="8" height="32" rx="2" fill="#7C3AED" />
            <rect x="28" y="4" width="8" height="32" rx="2" fill="#7C3AED" />
            <path d="M4 4L20 20L36 4H28L20 12L12 4H4Z" fill="#A78BFA" />
          </svg>
        </span>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-violet-500">
            Also from the makers
          </p>
          <p className="text-base font-semibold leading-tight text-zinc-900">
            Mimonous
          </p>
        </div>
      </div>

      {/* The offer - the eye-catcher */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#5B21B6] p-4 text-white">
        <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10 blur-xl" />
        <div className="relative">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/70">
            Early-adopter beta offer
          </p>
          <p className="mt-1 text-2xl font-extrabold leading-none tracking-tight">
            6 months free
          </p>
          <p className="mt-1.5 text-xs text-white/75">
            Join the public beta today - no credit card.
          </p>
        </div>
      </div>

      <h2 className="mt-5 text-xl font-semibold leading-snug tracking-tight text-zinc-900">
        From quote to paid - no email mess
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-zinc-500">
        You audit the client&apos;s site - now win the job and bill for it, all
        in one place.
      </p>

      <ul className="mt-4 space-y-2.5">
        {POINTS.map((p) => (
          <li key={p} className="flex items-start gap-2.5 text-sm text-zinc-600">
            <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-700">
              <Check className="h-3 w-3" />
            </span>
            {p}
          </li>
        ))}
      </ul>

      <div className="mt-5 border-t border-zinc-100 pt-4">
        <p className="mb-2.5 text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-400">
          Plus everything you need
        </p>
        <div className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
          {EXTRAS.map((e) => (
            <div key={e} className="flex items-start gap-2 text-xs text-zinc-500">
              <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-violet-400" />
              {e}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <a
          href={MIMONOUS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#7C3AED] py-2.5 text-sm font-semibold text-white shadow-[0_6px_20px_-6px_rgba(124,58,237,0.6)] transition-all hover:bg-[#6d28d9] active:scale-[0.98]"
        >
          Claim your 6 months free
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </aside>
  );
}
