import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WordPress Plugin Pricing & Plans - phpinfo() WP Pro | Flat $39-$79/yr & Lifetime",
  description:
    "Predictable flat pricing for WordPress server diagnostics, WordPress update crash prevention, and white-label client PDF audit reports. Single WordPress Site $39, Agency Unlimited $79, Lifetime $249.",
  keywords: [
    "wordpress server info plugin pricing",
    "phpinfo wordpress pro price",
    "wordpress update guard pricing",
    "wordpress agency maintenance license",
    "wordpress troubleshooting plugin cost",
  ],
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    title: "WordPress Plugin Pricing & Plans - phpinfo() WP Pro",
    description:
      "Predictable flat pricing for WordPress developers and agencies. Protect unlimited client WordPress sites without monthly per-site SaaS fees.",
    url: "https://phpinfowp.com/pricing",
    siteName: "phpinfo() WP",
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
