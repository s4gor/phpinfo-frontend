import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WordPress Agency Maintenance & Server Operations Plugin - phpinfo() WP | Unlimited Sites",
  description:
    "Protect client WordPress & WooCommerce websites from breaking updates, eliminate monthly per-site SaaS fees, and export white-label executive audit PDFs for WordPress maintenance retainers.",
  keywords: [
    "wordpress agency maintenance plugin",
    "wordpress agency tools",
    "white label wordpress client audit report pdf",
    "wordpress maintenance retainers",
    "manage client wordpress sites without per site fees",
    "wordpress update guard for agencies",
  ],
  alternates: {
    canonical: "/agencies",
  },
  openGraph: {
    title: "WordPress Agency Maintenance & Server Operations Plugin - phpinfo() WP",
    description:
      "Save thousands annually on client WordPress maintenance retainers. Zero per-site SaaS fees, automated update crash guards, and custom-branded PDF reports.",
    url: "https://phpinfowp.com/agencies",
    siteName: "phpinfo() WP",
  },
};

export default function AgenciesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
