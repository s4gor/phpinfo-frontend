import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WordPress Plugin Technical Documentation - phpinfo() WP Pro 8.0",
  description:
    "Complete WordPress administrator & developer guide for phpinfo() WP Pro. Installation, Update Guard AST rules, PHP EOL compatibility scanner, database index optimization, and white-label PDF audit reports.",
  keywords: [
    "wordpress phpinfo documentation",
    "wordpress update guard guide",
    "wordpress server diagnostics docs",
    "wordpress troubleshooting mode guide",
    "wordpress php compatibility scanner",
  ],
  alternates: {
    canonical: "/docs",
  },
  openGraph: {
    title: "WordPress Plugin Technical Documentation - phpinfo() WP Pro 8.0",
    description:
      "Technical guides, configuration parameters, and best practices for WordPress server diagnostics and operations.",
    url: "https://phpinfowp.com/docs",
    siteName: "phpinfo() WP",
  },
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
