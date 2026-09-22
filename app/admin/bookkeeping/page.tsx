import { redirect } from "next/navigation";
import { getAdminFromCookies } from "@/lib/admin-auth";
import { getAllLicenses } from "@/lib/db";
import { computeEuerReport } from "@/lib/bookkeeping";
import { AdminShell } from "../_components/admin-shell";
import { BookkeepingClient } from "./bookkeeping-client";

export const dynamic = "force-dynamic";

export default async function BookkeepingPage() {
  const admin = await getAdminFromCookies();
  if (!admin) redirect("/admin/login");

  const [allLicenses, report] = await Promise.all([
    getAllLicenses(),
    computeEuerReport(new Date().getFullYear()),
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
      <BookkeepingClient report={report} />
    </AdminShell>
  );
}
