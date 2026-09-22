import "./globals.css";
import "./deepnote-hero.css";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import ConsentBanner from "@/components/consent-banner";

const FigtreeFont = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "phpinfo() WP Pro 8.0 - WordPress Server Operations, Update Guard & Security Suite",
  description:
    "Stop WordPress update crashes and silent server bottlenecks. Automated Update Guard, live OPcache/RAM telemetry, admin security activity log, MySQL index scanner, and white-label client PDF audits.",
  keywords: [
    "phpinfo wordpress",
    "phpinfo wp",
    "phpinfo WP",
    "phpinfo() WP",
    "phpinfo plugin wordpress",
    "show phpinfo wordpress",
    "wordpress phpinfo page",
    "wordpress phpinfo viewer",
    "wordpress server info plugin",
    "phpinfo WP Pro",
    "wordpress update guard",
    "wordpress pre update scanner",
    "wordpress admin activity log",
    "wordpress database index scanner",
    "wordpress autoload bloat",
    "wordpress live telemetry",
    "exeebit",
    "Exeebit",
    "s4gor",
    "Emran Hossain Sagor",
    "WordPress server audit",
    "WordPress server health",
    "WordPress health check plugin",
    "PHP EOL WordPress",
    "WordPress PHP version check",
    "WordPress compatibility scanner",
    "WordPress security headers",
    "WordPress SSL monitor",
    "WordPress OPcache",
    "WordPress config grader",
    "WordPress PDF audit report",
    "white label wordpress report",
    ".htaccess editor WordPress",
    "WordPress troubleshooting mode",
    "WordPress admin plugin",
    "health check troubleshooting alternative",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "phpinfo() WP Pro 8.0 - WordPress Server Operations & Security Suite",
    description:
      "Stop WordPress update crashes. Pre-update compatibility checks, live memory & OPcache telemetry, admin security activity log, database index scanner, and white-label PDF reports.",
    url: "https://phpinfowp.com/",
    siteName: "phpinfo() WP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "phpinfo() WP Pro 8.0 - WordPress Server Operations & Security Suite",
    description:
      "Stop WordPress update crashes. Pre-update compatibility checks, live memory & OPcache telemetry, admin security activity log, database index scanner, and white-label PDF reports.",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How does Version 8.0 prevent update crashes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Before updating any plugin, theme, or WordPress core, Update Guard scans for PHP/WP floor mismatches, changelog breaking change keywords, and developer abandonment. After you update, it automatically verifies loopback response, error logs, and cron integrity.",
      },
    },
    {
      "@type": "Question",
      name: "How does Troubleshooting Mode work without taking my live site down?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Unlike standard troubleshooting plugins that put the entire site into maintenance or switch the live theme for everyone, phpinfo() WP isolates the debug session to your specific admin login. Visitors and customers continue browsing your live store uninterrupted.",
      },
    },
    {
      "@type": "Question",
      name: "Will the deep scanning slow down my server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. All scans run exclusively on-demand inside the admin dashboard with intelligent caching (transients + in-memory memoization) and async AJAX execution. Front-end page loads have 0.00ms overhead.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a free version?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The free version on WordPress.org includes the phpinfo viewer, .htaccess editor, extension list, activity log, PHP EOL Timeline, Troubleshooting Mode, PHP Compatibility Scanner, and a Config Grader summary. Pro adds the depth, one-click auto-fixes, SSL/headers monitors, and the white-label PDF audit reports.",
      },
    },
    {
      "@type": "Question",
      name: "How is this different from WP Umbrella or ManageWP?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Those are external SaaS dashboards for monitoring many sites at once. phpinfo() WP Pro is an in-admin plugin that lives on the site itself - no external account, no per-site monthly fee, no remote agent. Pick this if you want depth on each individual site and a portable PDF report.",
      },
    },
    {
      "@type": "Question",
      name: "Does the Pro license phone home?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Once per week, the plugin pings our server with your license key and site URL to confirm the key is still valid. Nothing else is sent. No analytics, no site contents. If our server is unreachable, the plugin keeps working for 14 days, then asks you to re-activate.",
      },
    },
    {
      "@type": "Question",
      name: "What happens after my year is up?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You keep the version you have, with all features unlocked. You stop getting updates and support unless you renew. We email a renewal reminder 14 days before expiry. Lifetime owners never expire.",
      },
    },
    {
      "@type": "Question",
      name: "Can I move my license between sites?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Deactivate on the old site (one click) and activate on the new one. The Single Site license can be re-assigned freely. Unlimited and Lifetime work on as many sites as you want, simultaneously.",
      },
    },
    {
      "@type": "Question",
      name: "Refund policy?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "14 days, no questions asked. Email support@exeebit.com with your order number and we will refund within 1–2 business days.",
      },
    },
    {
      "@type": "Question",
      name: "Server requirements?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "WordPress 5.9+ and PHP 8.0+ (PHP 8.2 or newer recommended). PHP 7.4 reached end-of-life in November 2022 and is no longer supported. Some hosts disable certain PHP functions used by the plugin - if a feature shows as unavailable, contact your host.",
      },
    },
  ],
};

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "phpinfo() WP Pro",
  applicationCategory: "DeveloperApplication",
  applicationSubCategory: "WordPress Plugin",
  operatingSystem: "WordPress 5.9+, PHP 8.0+",
  description:
    "WordPress server operations, Update Guard, live telemetry, security audit, and database performance suite - in one in-admin plugin.",
  url: "https://phpinfowp.com",
  image: "https://phpinfowp.com/opengraph-image.png",
  softwareVersion: "8.0.0",
  offers: [
    {
      "@type": "Offer",
      name: "Single Site",
      price: "39",
      priceCurrency: "USD",
      url: "https://phpinfowp.com/#pricing",
      availability: "https://schema.org/InStock",
      eligibleDuration: { "@type": "QuantitativeValue", value: "1", unitCode: "ANN" },
    },
    {
      "@type": "Offer",
      name: "Unlimited",
      price: "69",
      priceCurrency: "USD",
      url: "https://phpinfowp.com/#pricing",
      availability: "https://schema.org/InStock",
      eligibleDuration: { "@type": "QuantitativeValue", value: "1", unitCode: "ANN" },
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "30",
    bestRating: "5",
    worstRating: "1",
  },
  publisher: { "@id": "https://exeebit.com/#organization" },
  brand: { "@id": "https://exeebit.com/#organization" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag("consent", "default", {
              analytics_storage: "denied",
              ad_storage: "denied",
              wait_for_update: 500
            });
          `,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playpen+Sans:wght@500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className={FigtreeFont.className}>
        {children}
        <ConsentBanner />
        <Toaster richColors position="top-center" />
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-RX498MM1KC"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">{`
          gtag("js", new Date());
          gtag("config", "G-RX498MM1KC");
        `}</Script>
      </body>
    </html>
  );
}
