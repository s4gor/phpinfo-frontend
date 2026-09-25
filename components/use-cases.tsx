"use client";

import TextBlur from "./ui/text-blur";
import { Users, User, Globe } from "lucide-react";

const cases = [
  {
    icon: Users,
    name: "For Agencies",
    pain: "Quarterly audits across 40 client sites - and a PDF for each.",
    win: "One plugin per site. Hit Export. Hand the branded PDF to the client. Done in a morning.",
    bullets: [
      "Multi-site (Network) support",
      "White-label PDF with your logo",
      "Slack/Discord alerts so you hear about issues before clients do",
    ],
  },
  {
    icon: User,
    name: "For Freelancers",
    pain: "Clients ask 'is my site OK?' and you wing it from memory.",
    win: "Run an audit in 30 seconds. Reply with a PDF that looks like you charge $5K.",
    bullets: [
      "Config Grader with letter grade",
      "PHP EOL Timeline + Compatibility Scanner",
      "Email alerts when something on a site degrades",
    ],
  },
  {
    icon: Globe,
    name: "For Site Owners",
    pain: "You have no idea if your site is actually healthy - and you don't want to hire someone to find out.",
    win: "Install the plugin. Open the dashboard. In 30 seconds you'll know exactly what's wrong, what's fine, and what to fix first.",
    bullets: [
      "A-F Config Grader with plain-English explanations",
      "PHP EOL Timeline - know if your version is at risk",
      "One-click fixes - no dev needed",
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
          text="Three audiences, same plugin - pick the row that sounds like your week."
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
              className="flex flex-col rounded-xl border border-zinc-200 bg-white p-6 shadow-xs transition-all hover:border-violet-400/40">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100">
                <Icon className="h-5 w-5 text-violet-700" strokeWidth={1.75} />
              </div>
              <h3 className="text-lg font-semibold tracking-tight text-zinc-900">
                {c.name}
              </h3>
              <p className="mt-1 text-sm italic text-zinc-600">{c.pain}</p>
              <p className="mt-3 text-sm text-zinc-800">{c.win}</p>
              <ul className="mt-4 flex flex-col gap-2 text-sm text-zinc-700">
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
