import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WordPress Server Diagnostics Live Demo - phpinfo() WP Pro 8.0",
  description:
    "Test drive phpinfo() WP Pro in your browser. Interactive WordPress simulation for Update Guard pre-flight scans, live RAM/OPcache telemetry, and white-label client PDF audit reports.",
  keywords: [
    "wordpress phpinfo demo",
    "test wordpress server info plugin",
    "wordpress update guard interactive demo",
    "wordpress live telemetry simulator",
  ],
  alternates: {
    canonical: "/demo",
  },
  openGraph: {
    title: "WordPress Server Diagnostics Live Demo - phpinfo() WP Pro 8.0",
    description:
      "Experience our real-time WordPress server operations suite before installing.",
    url: "https://phpinfowp.com/demo",
    siteName: "phpinfo() WP",
  },
};

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
