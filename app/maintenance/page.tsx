import type { Metadata } from "next";
import MaintenanceContent from "@/components/maintenance-content";

export const metadata: Metadata = {
  title: "New Website Under Construction | phpinfo() WP",
  description:
    "We are currently developing our new website and customer portal. phpinfo() WP Version 8.0 is already live on WordPress.org with Update Guard, live telemetry, and server diagnostics.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function MaintenancePage() {
  return <MaintenanceContent />;
}
