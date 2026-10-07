import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Engineering & Support Desk - phpinfo() WP",
  description:
    "Get in touch with the phpinfo() WP engineering desk. Priority technical assistance, agency licensing inquiries, and bug reports. No automated bots, real answers from engineers.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Engineering & Support Desk - phpinfo() WP",
    description:
      "Direct technical and licensing support for phpinfo() WP Pro users and agency fleet managers.",
    url: "https://phpinfowp.com/contact",
    siteName: "phpinfo() WP",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
