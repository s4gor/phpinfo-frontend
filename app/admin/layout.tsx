import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin - phpinfo() WP",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-white text-zinc-800">{children}</div>;
}
