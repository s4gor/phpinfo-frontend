import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compare WordPress Diagnostic Plugins | phpinfo() WP vs Alternatives",
  description:
    "Architectural comparisons between phpinfo() WP and alternative plugins including Query Monitor, Health Check & Troubleshooting, WP Server Stats, and remote SaaS monitors.",
  keywords: [
    "wordpress diagnostic plugins comparison",
    "wordpress server troubleshooting alternatives",
    "query monitor vs phpinfo",
    "health check vs phpinfo",
  ],
  alternates: {
    canonical: "/vs",
  },
  openGraph: {
    title: "Compare WordPress Diagnostic Plugins | phpinfo() WP vs Alternatives",
    description:
      "Detailed side-by-side feature comparisons for WordPress server diagnostic tools.",
    url: "https://phpinfowp.com/vs",
    siteName: "phpinfo() WP",
  },
};

export default function VsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
