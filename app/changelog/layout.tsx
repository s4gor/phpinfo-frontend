import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WordPress Plugin Changelog & Release Notes - phpinfo() WP Pro 8.0",
  description:
    "Official release notes and version history for the phpinfo() WP WordPress plugin. Track PHP 8.4 engine compatibility, WordPress 6.8 readiness, and Update Guard AST rule improvements.",
  keywords: [
    "phpinfo wp changelog",
    "wordpress phpinfo plugin updates",
    "wordpress 6.8 compatibility",
    "php 8.4 wordpress support",
  ],
  alternates: {
    canonical: "/changelog",
  },
  openGraph: {
    title: "WordPress Plugin Changelog & Release Notes - phpinfo() WP Pro 8.0",
    description:
      "Official release notes, security hardening updates, and features added across all versions.",
    url: "https://phpinfowp.com/changelog",
    siteName: "phpinfo() WP",
  },
};

export default function ChangelogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
