import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import { getAdminFromCookies } from "@/lib/admin-auth";
import { getLicenseBySessionId, getAllLicenses, extractDomain, isLocalDevDomain, type ActivationRecord } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { AdminShell } from "../../_components/admin-shell";
import { EmailPill, LicenseStatusPill, TierBadge, DomainHeartbeatPill } from "../../_components/pills";
import { formatDate, formatDateTime, formatMoney, formatEur, tierLabel } from "../../_components/format";
import { convertSaleToEur } from "@/lib/currency";
import { CustomerActions, DomainManagement } from "./actions";
import {
  Key,
  Globe,
  CreditCard,
  Mail,
  Shield,
  ExternalLink,
  ChevronRight,
  Sparkles,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function CustomerDetailPage({
  params,
}: {
  params: { sid: string };
}) {
  const admin = await getAdminFromCookies();
  if (!admin) redirect("/admin/login");

  const { sid: rawSid } = await params;
  const sessionId = decodeURIComponent(rawSid);
  const [lic, allLicenses] = await Promise.all([
    getLicenseBySessionId(sessionId),
    getAllLicenses(),
  ]);

  if (!lic) notFound();

  const searchCustomers = allLicenses.map((r) => ({
    email: r.email,
    name: r.customer_name,
    tier: r.tier,
    key: r.key,
    sessionId: r.stripe_session_id,
  }));

  let stripeSub: { status: string; currentPeriodEnd?: number; cancelAt?: number | null; cancelAtPeriodEnd?: boolean } | null = null;
  if (lic.stripe_subscription_id) {
    try {
      const sub: any = await stripe.subscriptions.retrieve(lic.stripe_subscription_id);
      stripeSub = {
        status: sub.status,
        currentPeriodEnd: sub.current_period_end,
        cancelAt: sub.cancel_at,
        cancelAtPeriodEnd: sub.cancel_at_period_end,
      };
    } catch (err) {
      console.warn("[admin] failed to fetch stripe subscription", err);
    }
  }

  const stripeDashboard = process.env.STRIPE_DASHBOARD_BASE || "https://dashboard.stripe.com";
  const now = Math.floor(Date.now() / 1000);

  // Deduplicate activations by normalized site URL (keeping the latest ping timestamp)
  const rawActivations = (lic.activations ?? []) as ActivationRecord[];
  const uniqueMap = new Map<string, ActivationRecord>();
  for (const a of rawActivations) {
    const clean = a.site_url.toLowerCase().replace(/\/+$/, "");
    if (!uniqueMap.has(clean) || a.at > (uniqueMap.get(clean)?.at ?? 0)) {
      uniqueMap.set(clean, a);
    }
  }
  const uniqueActivations = Array.from(uniqueMap.values()).sort((a, b) => b.at - a.at);
  const activeCount = uniqueActivations.filter((a) => a.active !== false).length;

  const distinctProdDomains = Array.from(
    new Set(
      uniqueActivations
        .filter((a) => !isLocalDevDomain(a.domain || extractDomain(a.site_url)))
        .map((a) => (a.domain || extractDomain(a.site_url)).toLowerCase())
    )
  );
  const migrationRemaining = Math.max(0, 2 - distinctProdDomains.length);

  let displaySiteUrl = lic.site_url || "-";
  if (lic.tier === "single") {
    displaySiteUrl = activeCount > 0 
      ? uniqueActivations[0].site_url 
      : (lic.site_url && lic.site_url !== "*" ? lic.site_url : "Not activated yet");
  } else if (lic.site_url === "*" || lic.tier === "unlimited" || lic.tier === "lifetime") {
    displaySiteUrl = activeCount > 0
      ? `Unlimited (${activeCount} active)`
      : "Unlimited (no activations)";
  }

  return (
    <AdminShell email={admin.sub} customers={searchCustomers}>
      {/* Breadcrumb Navigation */}
      <div className="mb-4 flex items-center gap-1.5 text-xs text-zinc-400">
        <Link href="/admin/customers" className="hover:text-violet-600 hover:underline">
          Customers
        </Link>
        <ChevronRight className="h-3.5 w-3.5 text-zinc-300" />
        <span className="text-zinc-700 font-mono">{lic.email}</span>
      </div>

      {/* Customer Page Header */}
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4 border-b border-zinc-100 pb-5">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900">{lic.email}</h1>
            <TierBadge tier={lic.tier} />
          </div>
          {lic.customer_name && (
            <p className="mt-1 text-sm font-medium text-zinc-500">{lic.customer_name}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <LicenseStatusPill revoked={lic.revoked} exp={lic.exp} />
          <EmailPill status={lic.email_status} />
        </div>
      </div>

      {/* Info Cards 3-Column Grid */}
      <div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-3">
        <InfoCard title="License Specification">
          <Row label="Tier" value={tierLabel(lic.tier)} />
          <Row label="Issued (UTC)" value={formatDateTime(lic.iat)} />
          <Row label="Expires (UTC)" value={lic.tier === "lifetime" ? "Never" : formatDateTime(lic.exp)} />
          <Row label="Authorized Site" value={displaySiteUrl} mono={displaySiteUrl.startsWith("http")} />
        </InfoCard>

        <InfoCard title="Payment & Billing">
          {(() => {
            const conv = convertSaleToEur(lic.amount_total ?? 0, lic.currency || "usd", lic.iat);
            const isForeign = lic.currency && lic.currency.toLowerCase() !== "eur";
            return (
              <>
                <Row label="Amount (EUR)" value={<span className="font-bold text-zinc-950 font-mono">{formatEur(conv.grossEurCents)}</span>} />
                {isForeign && (
                  <>
                    <Row label="Original Paid" value={`${formatMoney(lic.amount_total ?? 0, lic.currency)} (${(lic.currency ?? "-").toUpperCase()})`} />
                    <Row label="ECB Reference Rate" value={`1 EUR = ${conv.ecbUsdPerEurRate.toFixed(4)} ${(lic.currency || "USD").toUpperCase()} on ${conv.dateStr}`} />
                    <Row label="Estimated Net Payout" value={`${formatEur(conv.netPayoutEurCents)} (after ${formatEur(conv.totalFeesEurCents)} Stripe card & forex fees)`} />
                  </>
                )}
                <Row label="Base Currency" value={(lic.currency ?? "EUR").toUpperCase()} />
              </>
            );
          })()}
          <Row label="Stripe Customer" value={lic.stripe_customer_id ?? "-"} mono />
          <Row label="Stripe Session" value={lic.stripe_session_id ?? "-"} mono />
          {lic.stripe_subscription_id && (
            <Row label="Subscription" value={lic.stripe_subscription_id} mono />
          )}
        </InfoCard>

        <InfoCard title="Stripe Subscription (Live)">
          {stripeSub ? (
            <>
              <Row label="Status" value={stripeSub.status.toUpperCase()} />
              <Row label="Current Period Ends" value={formatDateTime(stripeSub.currentPeriodEnd)} />
              <Row label="Cancel At" value={stripeSub.cancelAt ? formatDateTime(stripeSub.cancelAt) : "-"} />
              <Row label="Cancel at Period End" value={stripeSub.cancelAtPeriodEnd ? "Yes (Pending Cancel)" : "No (Auto-renews)"} />
            </>
          ) : lic.stripe_subscription_id ? (
            <p className="text-xs text-zinc-400">Could not sync live subscription from Stripe.</p>
          ) : (
            <p className="text-xs text-zinc-400">One-time purchase / Lifetime license - no recurring subscription.</p>
          )}
        </InfoCard>
      </div>

      {/* Email & Revocation Cards */}
      <div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-2">
        <InfoCard title="Email Deliverability">
          <Row label="Status" value={lic.email_status ?? "-"} />
          <Row label="Updated At" value={formatDateTime(lic.email_status_at)} />
          <Row label="Resend Message ID" value={lic.resend_message_id ?? "-"} mono />
          {lic.email_last_error && <Row label="Last Error" value={lic.email_last_error} />}
        </InfoCard>

        <InfoCard title="Revocation & Compliance">
          {lic.revoked ? (
            <>
              <Row label="Revoked At" value={formatDateTime(lic.revoked_at)} />
              <Row label="Reason" value={lic.revoke_reason ?? "Manual Revocation"} />
            </>
          ) : (
            <div className="flex items-center gap-2 text-xs text-emerald-700 py-1">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              License is in good standing - active and verified.
            </div>
          )}
        </InfoCard>
      </div>

      {/* License Key Box */}
      <div className="mb-5 rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            License Key ({lic.key.startsWith("PIWP2-") ? "Modern V2" : "Legacy V1"})
          </h3>
          {lic.upgraded_key && (
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 border border-emerald-200">
              V2 Upgraded Key Linked
            </span>
          )}
        </div>
        <pre className="overflow-x-auto rounded-xl border border-violet-100 bg-violet-50/60 p-3 text-xs text-violet-800 font-mono break-all select-all">
          {lic.key}
        </pre>
        {lic.upgraded_key && (
          <div className="mt-3 pt-3 border-t border-zinc-100">
            <span className="text-[11px] font-semibold text-zinc-600 block mb-1">Upgraded V2 Key:</span>
            <pre className="overflow-x-auto rounded-xl border border-emerald-100 bg-emerald-50/60 p-3 text-xs text-emerald-800 font-mono break-all select-all">
              {lic.upgraded_key}
            </pre>
          </div>
        )}
      </div>

      {/* Interactive Domain Management */}
      <DomainManagement
        licenseKey={lic.key}
        tier={lic.tier}
        activations={uniqueActivations}
        distinctProdDomains={distinctProdDomains}
      />

      {/* Interactive Actions */}
      <CustomerActions
        licenseKey={lic.key}
        revoked={!!lic.revoked}
        currentExp={lic.exp}
        currentTier={lic.tier}
        isLegacy={lic.key.startsWith("PIWP-") || lic.key.startsWith("PIWP1-")}
        upgradedKey={lic.upgraded_key}
        stripeCustomerLink={lic.stripe_customer_id ? `${stripeDashboard}/customers/${lic.stripe_customer_id}` : null}
        stripeSessionLink={lic.stripe_session_id ? `${stripeDashboard}/payments?query=${encodeURIComponent(lic.stripe_session_id)}` : null}
      />
    </AdminShell>
  );
}

function InfoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-xs">
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">{title}</h3>
      <dl className="space-y-2">{children}</dl>
    </div>
  );
}

function Row({ label, value, mono }: { label: string; value: React.ReactNode; mono?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <dt className="text-xs text-zinc-400 shrink-0">{label}</dt>
      <dd className={`text-right text-xs text-zinc-800 ${mono ? "break-all font-mono" : "font-medium"}`}>{value}</dd>
    </div>
  );
}
