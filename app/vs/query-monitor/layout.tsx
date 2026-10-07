import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Query Monitor Alternative for WordPress Production Sites | phpinfo() WP vs Query Monitor",
  description:
    "Query Monitor is built for local WordPress SQL debugging. phpinfo() WP is engineered for production WordPress server operations with 0.00ms frontend overhead, update crash safeguards, and white-label client PDF audits.",
  keywords: [
    "query monitor alternative wordpress",
    "query monitor plugin wordpress",
    "wordpress query monitor overhead",
    "wordpress production debugging plugin",
    "wordpress server diagnostics plugin",
  ],
  alternates: {
    canonical: "/vs/query-monitor",
  },
  openGraph: {
    title: "Query Monitor Alternative for WordPress Production Sites | phpinfo() WP",
    description:
      "Detailed architectural comparison between Query Monitor and phpinfo() WP Pro for WordPress site administrators.",
    url: "https://phpinfowp.com/vs/query-monitor",
    siteName: "phpinfo() WP",
  },
};

export default function VsQueryMonitorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
