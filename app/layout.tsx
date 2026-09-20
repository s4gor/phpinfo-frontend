import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "phpinfo() WP - Precision Server Telemetry & Diagnostics for WordPress",
  description: "Ditch 1995 static tables. The precision server diagnostic instrument for WordPress: OPcache telemetry, automated permissions hardening, Update Guard safety checks, and zero-downtime Safe Mode.",
  keywords: [
    "phpinfo",
    "WordPress PHP diagnostics",
    "OPcache visualizer",
    "Update Guard",
    "safe mode sandbox",
    "WordPress permissions auto-fix",
    "PHP 8.3 compatibility"
  ],
  authors: [{ name: "Exeebit", url: "https://exeebit.com" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${jetbrainsMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col font-sans bg-white text-[#0a2540] selection:bg-[#635bff] selection:text-white">
        {children}
      </body>
    </html>
  );
}
