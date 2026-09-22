import { redirect } from "next/navigation";
import { getAdminFromCookies } from "@/lib/admin-auth";
import { getAllLicenses, getAllExpenses } from "@/lib/db";
import { AdminShell } from "../../_components/admin-shell";
import { ExpensesClient } from "./expenses-client";

export const dynamic = "force-dynamic";

export default async function ExpensesPage() {
  const admin = await getAdminFromCookies();
  if (!admin) redirect("/admin/login");

  const [allLicenses, allExpenses] = await Promise.all([
    getAllLicenses(),
    getAllExpenses(),
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
      <ExpensesClient initialExpenses={allExpenses} />
    </AdminShell>
  );
}
