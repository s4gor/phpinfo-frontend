import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WordPress Health Check & Troubleshooting Plugin Alternative | phpinfo() WP",
  description:
    "Upgrade from the abandoned Health Check & Troubleshooting WordPress plugin. Get safe session-isolated troubleshooting mode, pre-update crash prevention, PHP 8.4 upgrade scanner, and white-label client PDF audits.",
  keywords: [
    "health check troubleshooting alternative",
    "wordpress health check plugin replacement",
    "wordpress troubleshooting mode plugin",
    "health check lockout bug fix",
    "wordpress server diagnostics plugin",
  ],
  alternates: {
    canonical: "/vs/health-check-troubleshooting",
  },
  openGraph: {
    title: "WordPress Health Check & Troubleshooting Plugin Alternative | phpinfo() WP",
    description:
      "Modern, actively maintained replacement for the official WordPress Health Check plugin with zero lockout risk.",
    url: "https://phpinfowp.com/vs/health-check-troubleshooting",
    siteName: "phpinfo() WP",
  },
};

export default function VsHealthCheckLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
