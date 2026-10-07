import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WordPress Server Features & Architecture - phpinfo() WP Pro 8.0 Plugin",
  description:
    "Explore the 6 core pillars built for WordPress: Update Guard pre-flight plugin crash prevention, live WordPress OPcache/RAM telemetry, WooCommerce database index scanner, admin security audit log, and white-label client PDF reports.",
  keywords: [
    "wordpress server info features",
    "wordpress update guard suite",
    "wordpress database index scanner",
    "wordpress autoload bloat analyzer",
    "wordpress security headers monitor",
    "wordpress client health report pdf",
  ],
  alternates: {
    canonical: "/features",
  },
  openGraph: {
    title: "WordPress Server Features & Architecture - phpinfo() WP Pro 8.0",
    description:
      "Automated WordPress update crash prevention, live memory & OPcache telemetry, database performance scanner, and white-label executive audit PDFs.",
    url: "https://phpinfowp.com/features",
    siteName: "phpinfo() WP",
  },
};

export default function FeaturesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
