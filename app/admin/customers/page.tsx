import { redirect } from "next/navigation";
import { getAdminFromCookies } from "@/lib/admin-auth";
import { getAllLicenses } from "@/lib/db";
import { AdminShell } from "../_components/admin-shell";
import { CustomerTable } from "./customer-table";

export const dynamic = "force-dynamic";

export default async function CustomersPage() {
  const admin = await getAdminFromCookies();
  if (!admin) redirect("/admin/login");

  const all = await getAllLicenses();
  const sorted = [...all].sort((a, b) => b.iat - a.iat);

  const searchCustomers = sorted.map((r) => ({
    email: r.email,
    name: r.customer_name,
    tier: r.tier,
    key: r.key,
    sessionId: r.stripe_session_id,
  }));

  return (
    <AdminShell email={admin.sub} customers={searchCustomers}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900">Customers & Licenses</h1>
        <p className="mt-1 text-xs text-zinc-500">
          Manage subscriptions, manual keys, client site activations, and customer records.
        </p>
      </div>

      <CustomerTable initialLicenses={sorted} />
    </AdminShell>
  );
}
