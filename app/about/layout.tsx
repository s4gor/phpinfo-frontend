import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About phpinfo() WP - WordPress Server Operations & Diagnostic Studio",
  description:
    "Learn about the engineering mission behind phpinfo() WP, founded by Emran Hossain Sagor. Precision-crafted WordPress server operations software engineered with strict German compliance (§ 5 DDG & EU GDPR).",
  keywords: [
    "about phpinfo wp",
    "wordpress server diagnostics creator",
    "emran hossain sagor wordpress",
    "exeebit wordpress tools",
  ],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About phpinfo() WP - WordPress Server Operations & Diagnostic Studio",
    description:
      "Independent software studio building precision WordPress operations tools with strict German compliance (§ 5 DDG & EU GDPR).",
    url: "https://phpinfowp.com/about",
    siteName: "phpinfo() WP",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
