import { redirect } from "next/navigation";
import { getAdminFromCookies } from "@/lib/admin-auth";
import { getAllLicenses, getHomeofficeDays } from "@/lib/db";
import { AdminShell } from "../../_components/admin-shell";
import { HomeofficeClient } from "./homeoffice-client";

export const dynamic = "force-dynamic";

export default async function HomeofficePage({
  searchParams,
}: {
  searchParams?: { year?: string };
}) {
  const admin = await getAdminFromCookies();
  if (!admin) redirect("/admin/login");

  const currentYear = searchParams?.year
    ? parseInt(searchParams.year, 10)
    : new Date().getFullYear();

  const [allLicenses, homeofficeDays] = await Promise.all([
    getAllLicenses(),
    getHomeofficeDays(currentYear),
  ]);

  const searchCustomers = allLicenses.map((r) => ({
    email: r.email,
    name: r.customer_name,
    tier: r.tier,
    key: r.key,
    sessionId: r.stripe_session_id,
  }));

  return (
    <AdminShell email={admin.sub} customers={searchCustomers}>
      <HomeofficeClient initialDays={homeofficeDays} initialYear={currentYear} />
    </AdminShell>
  );
}
