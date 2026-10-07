import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WP Server Stats Alternative for Deep WordPress Diagnostics | phpinfo() WP",
  description:
    "Move beyond simple speedometer gauges. phpinfo() WP provides actionable WordPress server operations, automated Update Guard safeguards, database index tuning, and executive client PDF audits.",
  keywords: [
    "wp server stats alternative",
    "wordpress server stats plugin",
    "wordpress server load monitor plugin",
    "wordpress server info and diagnostics",
  ],
  alternates: {
    canonical: "/vs/wp-server-stats",
  },
  openGraph: {
    title: "WP Server Stats Alternative | phpinfo() WP Pro",
    description:
      "Comprehensive server operations, PHP configuration, and crash safeguards compared to WP Server Stats.",
    url: "https://phpinfowp.com/vs/wp-server-stats",
    siteName: "phpinfo() WP",
  },
};

export default function VsWpServerStatsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
