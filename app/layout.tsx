import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "phpinfo() WP - Modern PHP Telemetry & Server Diagnostics for WordPress",
  description: "Ditch unreadable static tables. Surface security vulnerabilities, inspect OPcache hit rates, test PHP 8.x compatibility, and auto-fix dangerous permissions with zero downtime.",
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
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#0a0b10] text-slate-100">
        {children}
      </body>
    </html>
  );
}
