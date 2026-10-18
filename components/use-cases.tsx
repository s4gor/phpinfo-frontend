"use client";

import TextBlur from "./ui/text-blur";
import { Users, User, Globe } from "lucide-react";

const cases = [
  {
    icon: Globe,
    name: "For Site Owners",
    tier: "$39 / year",
    pain: "Is my site healthy? You shouldn't need to hire someone to find out.",
    win: "Identify exactly what's wrong in 30 seconds & fix without hiring a $150/hr sysadmin.",
    bullets: [
      "A-to-F Config Grader translates cryptic limits into plain English",
      "Find why checkout or admin is sluggish - without hiring a sysadmin",
      "PHP EOL Timeline - know before an upgrade breaks your site",
    ],
  },
  {
    icon: Users,
    name: "For Agencies",
    tier: "$79/yr · $249 Lifetime",
    pain: "Auditing 30 client sites eats unbillable hours, and clients ask why they pay monthly retainers.",
    win: "One click turns server telemetry into a branded, white-label executive PDF report that proves your retainer value.",
    bullets: [
      "White-label PDF reports branded with your agency logo",
      "Safe per-user Troubleshooting Mode (zero visitor disruption)",
      "Multi-site (Network) centralized support & webhook alerts",
    ],
  },
  {
    icon: User,
    name: "For Freelancers",
    tier: "$79 / year",
    pain: "Clients ask 'is my site OK?' and upgrading PHP feels like Russian roulette.",
    win: "Pre-flight compatibility scanner and letter grade you can show in 30 seconds.",
    bullets: [
      "Pre-flight PHP 7.4-8.4 compatibility checks",
      "Instant memory and timeout bottleneck discovery",
      "1-click safe server directive fixes",
    ],
  },
];

export default function UseCases() {
  return (
    <div
      id="use-cases"
      className="flex w-full max-w-6xl flex-col gap-2 pt-16 md:pt-24">
      <div>
        <TextBlur
          className="text-center text-2xl font-medium tracking-tight text-zinc-800 md:text-3xl"
          text="Built for the way you actually work."
        />
      </div>
      <div>
        <TextBlur
          className="mx-auto max-w-[34rem] text-center text-base text-zinc-700 sm:text-lg"
          text="Whether you run a single WooCommerce store or manage dozens of client retainers."
          duration={0.8}
        />
      </div>

      <div
        className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
        {cases.map((c) => {
          const Icon = c.icon;
          return (
            <div
              key={c.name}
              className="flex flex-col rounded-xl border border-zinc-200 bg-white p-6 shadow-xs transition-all hover:border-violet-400/40 dark:border-zinc-800 dark:bg-zinc-900">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800">
                  <Icon className="h-5 w-5 text-violet-700 dark:text-violet-400" strokeWidth={1.75} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-violet-700 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/50 border border-violet-200/80 dark:border-violet-800/60 rounded-full px-2 py-0.5">
                  {c.tier}
                </span>
              </div>
              <h3 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                {c.name}
              </h3>
              <p className="mt-1 text-sm italic text-zinc-600 dark:text-zinc-400">&ldquo;{c.pain}&rdquo;</p>
              <p className="mt-3 text-sm font-semibold text-zinc-800 dark:text-zinc-200">&ldquo;{c.win}&rdquo;</p>
              <ul className="mt-4 flex flex-col gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                {c.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-violet-300/70" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
