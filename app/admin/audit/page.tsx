import { redirect } from "next/navigation";
import { getAdminFromCookies } from "@/lib/admin-auth";
import { getAuditLog, getAllLicenses } from "@/lib/db";
import { AdminShell } from "../_components/admin-shell";
import { AuditClient } from "./audit-client";

export const dynamic = "force-dynamic";

export default async function AuditPage() {
  const admin = await getAdminFromCookies();
  if (!admin) redirect("/admin/login");

  const [logs, allLicenses] = await Promise.all([
    getAuditLog(200),
    getAllLicenses(),
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
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900">Security Audit Trail</h1>
        <p className="mt-1 text-xs text-zinc-500">
          Cryptographic and operational activity log tracking administrative decisions, extensions, and revocations.
        </p>
      </div>

      <AuditClient initialLogs={logs} />
    </AdminShell>
  );
}
