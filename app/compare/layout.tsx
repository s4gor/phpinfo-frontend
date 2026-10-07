import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compare WordPress Server & Maintenance Plugins | phpinfo() WP vs Alternatives",
  description:
    "See how phpinfo() WP compares against Health Check & Troubleshooting, Query Monitor, WP Server Stats, and remote SaaS monitors like ManageWP and WP Umbrella.",
  keywords: [
    "compare wordpress diagnostic plugins",
    "wordpress health check alternative",
    "query monitor alternative wordpress",
    "best wordpress server info plugin",
    "wordpress maintenance plugin comparison",
  ],
  alternates: {
    canonical: "/compare",
  },
  openGraph: {
    title: "Compare WordPress Server & Maintenance Plugins | phpinfo() WP",
    description:
      "Detailed side-by-side comparison of WordPress diagnostic, server operations, and troubleshooting tools.",
    url: "https://phpinfowp.com/compare",
    siteName: "phpinfo() WP",
  },
};

export default function CompareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
