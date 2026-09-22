import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/lib/animation-variants";
import TextBlur from "./ui/text-blur";
import { Shield, Zap, Activity, FileText } from "lucide-react";

const pillars = [
  {
    icon: Shield,
    name: "Safeguard",
    tag: "Prevent fatal crashes and downtime.",
    items: [
      "Update Guard (Pre & post update loopback)",
      "PHP Compatibility Engine (PHP 7.4–8.4)",
      "Zero-Downtime Troubleshooting Mode",
      "File Permissions & 777 Risk Scanner",
    ],
  },
  {
    icon: Zap,
    name: "Optimize",
    tag: "Crush TTFB & uncap server throughput.",
    items: [
      "Live OPcache & Object Cache Telemetry",
      "Autoload Bloat Visualizer (TTFB fix)",
      "Missing MySQL Index Scanner",
      "1-Click Server Snippets with instant rollback",
    ],
  },
  {
    icon: Activity,
    name: "Monitor",
    tag: "Detect bottlenecks before clients notice.",
    items: [
      "Admin Security Activity Log (Real IP & logins)",
      "SSL Certificate & Expiry Monitor",
      "External API & Webhook Latency Tracker",
      "WP-Cron Integrity & Stuck Queue Tracker",
    ],
  },
  {
    icon: FileText,
    name: "Deliver",
    tag: "Turn server audits into client retainers.",
    items: [
      "White-label PDF Audit Reports (Branded)",
      "Native AI Plain-English Fix Explanations",
      "Weekly Health Digest & Instant Alerts",
      "Slack / Discord Webhook Notifications",
      "Multi-site (Network) Centralized Dashboard",
    ],
  },
];

export default function Logos() {
  return (
    <motion.div
      className="flex w-full flex-col gap-2 pt-16 md:pt-24"
      variants={containerVariants}
      initial="hidden"
      animate="visible">
      <motion.div variants={itemVariants}>
        <TextBlur
          className="text-center text-2xl font-medium tracking-tight text-zinc-800 md:text-3xl"
          text="One plugin. Four missions handled."
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <TextBlur
          className="mx-auto max-w-[34rem] text-center text-base text-zinc-700 sm:text-lg"
          text="No external SaaS. No per-site monthly subscriptions. 100% in-admin server operations and security."
          duration={0.8}
        />
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="mt-6 grid w-full grid-cols-1 items-stretch justify-center gap-4 md:mt-10 md:grid-cols-2 lg:grid-cols-4 md:gap-6">
        {pillars.map((pillar, index) => {
          const Icon = pillar.icon;
          return (
            <div
              key={index}
              className="flex flex-col rounded-xl border bg-white p-6 shadow-xs transition-all duration-150 ease-in-out md:hover:border-zinc-300 md:hover:bg-accent">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100">
                <Icon className="h-5 w-5 text-violet-700" strokeWidth={1.75} />
              </div>
              <h3 className="text-lg font-semibold tracking-tight text-zinc-900">
                {pillar.name}
              </h3>
              <p className="mb-4 text-sm italic text-zinc-600">{pillar.tag}</p>
              <ul className="flex flex-col gap-2 text-sm text-zinc-700">
                {pillar.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-violet-300/70" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="mt-8 text-center text-sm text-zinc-500">
        <p>
          Free tier on WordPress.org includes phpinfo viewer, .htaccess editor,
          PHP EOL Timeline, Troubleshooting Mode, and Config Grader summary.
        </p>
      </motion.div>
    </motion.div>
  );
}
