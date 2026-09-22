"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import {
  Mail,
  Copy,
  Check,
  Calendar,
  Ban,
  RotateCcw,
  ExternalLink,
  X,
  AlertTriangle,
  Clock,
  Sparkles,
  Unlink,
  RefreshCw,
  Sliders,
  Shield,
} from "lucide-react";
import type { ActivationRecord } from "@/lib/db";
import { DomainHeartbeatPill } from "../../_components/pills";
import { formatDateTime } from "../../_components/format";

export function CustomerActions({
  licenseKey,
  revoked,
  currentExp,
  currentTier,
  isLegacy,
  upgradedKey,
  stripeCustomerLink,
  stripeSessionLink,
}: {
  licenseKey: string;
  revoked: boolean;
  currentExp: number;
  currentTier: string;
  isLegacy: boolean;
  upgradedKey?: string;
  stripeCustomerLink: string | null;
  stripeSessionLink: string | null;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [busy, setBusy] = useState<string | null>(null);

  // Modals state
  const [extendModalOpen, setExtendModalOpen] = useState(false);
  const [revokeModalOpen, setRevokeModalOpen] = useState(false);
  const [unrevokeModalOpen, setUnrevokeModalOpen] = useState(false);
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);
  const [tierModalOpen, setTierModalOpen] = useState(false);

  // Extend form state
  const now = Math.floor(Date.now() / 1000);
  const [extendDays, setExtendDays] = useState<number>(365);
  const [isLifetime, setIsLifetime] = useState(false);
  const [customDate, setCustomDate] = useState("");

  // Revoke form state
  const [revokeReason, setRevokeReason] = useState("refund");
  const [customReason, setCustomReason] = useState("");

  // Tier form state
  const [selectedTier, setSelectedTier] = useState(currentTier);

  const [copied, setCopied] = useState(false);

  async function callApi(action: string, body?: Record<string, unknown>) {
    setBusy(action);
    try {
      const res = await fetch(`/api/admin/customers/${encodeURIComponent(licenseKey)}/${action}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: body ? JSON.stringify(body) : undefined,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast.error(data.error || `Action failed: ${res.status}`);
      } else {
        toast.success(data.message || "Action completed successfully");
        startTransition(() => router.refresh());
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Network request failed");
    } finally {
      setBusy(null);
    }
  }

  function handleCopyKey() {
    const keyToCopy = upgradedKey || licenseKey;
    navigator.clipboard.writeText(keyToCopy);
    setCopied(true);
    toast.success("License key copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleExtendSubmit() {
    let newExp: number;
    if (isLifetime) {
      newExp = 4070908800; // Year 2099
    } else if (customDate) {
      newExp = Math.floor(new Date(`${customDate}T23:59:59Z`).getTime() / 1000);
    } else {
      newExp = now + extendDays * 86400;
    }
    await callApi("extend", { exp: newExp });
    setExtendModalOpen(false);
  }

  async function handleRevokeSubmit() {
    const reason = revokeReason === "other" ? customReason.trim() || "manual revoke" : revokeReason;
    await callApi("revoke", { reason });
    setRevokeModalOpen(false);
  }

  async function handleUnrevokeSubmit() {
    await callApi("unrevoke");
    setUnrevokeModalOpen(false);
  }

  async function handleSendUpgradedSubmit() {
    await callApi("send-upgraded-key");
    setUpgradeModalOpen(false);
  }

  async function handleTierSubmit() {
    await callApi("change-tier", { tier: selectedTier });
    setTierModalOpen(false);
  }

  const calculatedNewExp = isLifetime
    ? "Lifetime (Never)"
    : customDate
    ? customDate
    : new Date((now + extendDays * 86400) * 1000).toISOString().slice(0, 10);

  return (
    <>
      <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Management & Operations
          </h3>
          {isLegacy && (
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-800 border border-amber-200">
              Legacy V1 License Key
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Copy Key */}
          <button
            onClick={handleCopyKey}
            className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200/90 bg-white px-3.5 py-2 text-xs font-medium text-zinc-700 shadow-2xs hover:bg-zinc-50 transition-colors"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5 text-zinc-400" />}
            {copied ? "Copied" : "Copy License Key"}
          </button>

          {/* Send Upgraded V2 Key (LEGACY CUSTOMERS ONLY) */}
          {isLegacy && (
            <button
              disabled={busy !== null || pending}
              onClick={() => setUpgradeModalOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-violet-200 bg-violet-50/80 px-3.5 py-2 text-xs font-semibold text-violet-700 shadow-2xs hover:bg-violet-100 transition-colors disabled:opacity-50"
            >
              <Sparkles className="h-3.5 w-3.5 text-violet-600" />
              {busy === "send-upgraded-key" ? "Issuing V2…" : "Send Upgraded V2 License…"}
            </button>
          )}

          {/* Resend Email */}
          <button
            disabled={busy !== null || pending}
            onClick={() => callApi("resend-email")}
            className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200/90 bg-white px-3.5 py-2 text-xs font-medium text-zinc-700 shadow-2xs hover:bg-zinc-50 transition-colors disabled:opacity-50"
          >
            <Mail className="h-3.5 w-3.5 text-zinc-400" />
            {busy === "resend-email" ? "Sending…" : "Resend Email"}
          </button>

          {/* Extend Expiry */}
          <button
            disabled={busy !== null || pending}
            onClick={() => setExtendModalOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-amber-200/90 bg-amber-50/70 px-3.5 py-2 text-xs font-medium text-amber-800 shadow-2xs hover:bg-amber-100 transition-colors disabled:opacity-50"
          >
            <Calendar className="h-3.5 w-3.5 text-amber-600" />
            Extend Expiry…
          </button>

          {/* Change Tier */}
          <button
            disabled={busy !== null || pending}
            onClick={() => setTierModalOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200/90 bg-white px-3.5 py-2 text-xs font-medium text-zinc-700 shadow-2xs hover:bg-zinc-50 transition-colors disabled:opacity-50"
          >
            <Sliders className="h-3.5 w-3.5 text-zinc-400" />
            Change Tier…
          </button>

          {/* Revoke or Restore */}
          {!revoked ? (
            <button
              disabled={busy !== null || pending}
              onClick={() => setRevokeModalOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-rose-200/90 bg-rose-50/70 px-3.5 py-2 text-xs font-medium text-rose-700 shadow-2xs hover:bg-rose-100 transition-colors disabled:opacity-50"
            >
              <Ban className="h-3.5 w-3.5 text-rose-600" />
              Revoke License…
            </button>
          ) : (
            <button
              disabled={busy !== null || pending}
              onClick={() => setUnrevokeModalOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200/90 bg-emerald-50/70 px-3.5 py-2 text-xs font-medium text-emerald-700 shadow-2xs hover:bg-emerald-100 transition-colors disabled:opacity-50"
            >
              <RotateCcw className="h-3.5 w-3.5 text-emerald-600" />
              Restore License…
            </button>
          )}

          {/* Stripe Deep Links */}
          {stripeCustomerLink && (
            <a
              href={stripeCustomerLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-lg border border-zinc-200/90 bg-white px-3.5 py-2 text-xs font-medium text-zinc-700 shadow-2xs hover:border-violet-300 hover:text-violet-700 transition-colors"
            >
              Stripe Customer <ExternalLink className="h-3 w-3 opacity-60" />
            </a>
          )}
          {stripeSessionLink && (
            <a
              href={stripeSessionLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-lg border border-zinc-200/90 bg-white px-3.5 py-2 text-xs font-medium text-zinc-700 shadow-2xs hover:border-violet-300 hover:text-violet-700 transition-colors"
            >
              Stripe Payment <ExternalLink className="h-3 w-3 opacity-60" />
            </a>
          )}
        </div>
      </div>

      {/* ── Extend Expiry Modal with Custom Date & Courtesy Presets ── */}
      {extendModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-zinc-950/60 backdrop-blur-sm" onClick={() => setExtendModalOpen(false)} />
          <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-amber-600" />
                <h3 className="text-sm font-semibold text-zinc-900">Extend License Expiry</h3>
              </div>
              <button onClick={() => setExtendModalOpen(false)} className="text-zinc-400 hover:text-zinc-600">
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="text-xs text-zinc-500 mb-4">
              Select a quick extension period or set a custom expiry date. The new timestamp is updated in Redis.
            </p>

            {/* Presets */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              {[
                { label: "+14d Courtesy", days: 14, lifetime: false },
                { label: "+30 Days", days: 30, lifetime: false },
                { label: "+90 Days", days: 90, lifetime: false },
                { label: "+1 Year", days: 365, lifetime: false },
                { label: "+2 Years", days: 730, lifetime: false },
                { label: "Lifetime", days: 0, lifetime: true },
              ].map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setIsLifetime(p.lifetime);
                    setCustomDate("");
                    if (!p.lifetime) setExtendDays(p.days);
                  }}
                  className={`rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${
                    (p.lifetime && isLifetime) || (!isLifetime && !customDate && extendDays === p.days)
                      ? "border-amber-400 bg-amber-50 text-amber-900 font-semibold"
                      : "border-zinc-200 bg-zinc-50 text-zinc-700 hover:bg-zinc-100"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Custom Date Picker */}
            <div className="mb-4">
              <label className="block text-xs font-medium text-zinc-700 mb-1">
                Or Choose Custom Expiration Date:
              </label>
              <input
                type="date"
                value={customDate}
                onChange={(e) => {
                  setCustomDate(e.target.value);
                  setIsLifetime(false);
                }}
                className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-xs text-zinc-800 font-mono focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-3 mb-5 text-xs text-zinc-700">
              New Expiration Date: <strong className="text-zinc-900 font-mono">{calculatedNewExp}</strong>
            </div>

            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setExtendModalOpen(false)}
                className="rounded-lg border border-zinc-200 px-3.5 py-1.5 text-xs font-medium text-zinc-600 hover:bg-zinc-50"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={busy !== null}
                onClick={handleExtendSubmit}
                className="rounded-lg bg-amber-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-amber-500 transition-colors disabled:opacity-50"
              >
                {busy === "extend" ? "Extending…" : "Confirm Extension"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Change Tier Modal ── */}
      {tierModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-zinc-950/60 backdrop-blur-sm" onClick={() => setTierModalOpen(false)} />
          <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Sliders className="h-4 w-4 text-violet-600" />
                <h3 className="text-sm font-semibold text-zinc-900">Change License Tier</h3>
              </div>
              <button onClick={() => setTierModalOpen(false)} className="text-zinc-400 hover:text-zinc-600">
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="text-xs text-zinc-500 mb-4">
              Update the customer tier. This changes their domain allowance and client entitlement immediately.
            </p>

            <div className="space-y-2.5 mb-5">
              {[
                { id: "single", label: "Single Site (1 Production + 1 Migration)", desc: "Allows 1 active site, up to 2 lifetime migrations" },
                { id: "unlimited", label: "Unlimited Sites (Annual Subscription)", desc: "Unlimited active sites with recurring billing" },
                { id: "lifetime", label: "Lifetime Unlimited (No Expiry)", desc: "Unlimited sites with permanent lifetime validity" },
              ].map((t) => (
                <label
                  key={t.id}
                  className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                    selectedTier === t.id
                      ? "border-violet-400 bg-violet-50/60 text-zinc-900"
                      : "border-zinc-200 bg-zinc-50/50 text-zinc-700 hover:bg-zinc-50"
                  }`}
                >
                  <input
                    type="radio"
                    name="tier"
                    value={t.id}
                    checked={selectedTier === t.id}
                    onChange={(e) => setSelectedTier(e.target.value)}
                    className="mt-0.5 text-violet-600 focus:ring-violet-500"
                  />
                  <div>
                    <div className="text-xs font-semibold">{t.label}</div>
                    <div className="text-[11px] text-zinc-500 mt-0.5">{t.desc}</div>
                  </div>
                </label>
              ))}
            </div>

            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setTierModalOpen(false)}
                className="rounded-lg border border-zinc-200 px-3.5 py-1.5 text-xs font-medium text-zinc-600 hover:bg-zinc-50"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={busy !== null}
                onClick={handleTierSubmit}
                className="rounded-lg bg-violet-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-violet-500 transition-colors disabled:opacity-50"
              >
                {busy === "change-tier" ? "Saving…" : "Save Tier Change"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Send Upgraded V2 Key Confirmation Modal ── */}
      {upgradeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-zinc-950/60 backdrop-blur-sm" onClick={() => setUpgradeModalOpen(false)} />
          <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3 mb-4">
              <div className="flex items-center gap-2 text-violet-700">
                <Sparkles className="h-4 w-4" />
                <h3 className="text-sm font-semibold text-zinc-900">Send Upgraded V2 License</h3>
              </div>
              <button onClick={() => setUpgradeModalOpen(false)} className="text-zinc-400 hover:text-zinc-600">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-zinc-600 mb-5">
              <p>
                This customer holds a <strong>legacy V1 license key</strong>.
              </p>
              <div className="rounded-xl border border-violet-100 bg-violet-50/60 p-3">
                <p className="text-violet-900 font-medium mb-1">What will happen:</p>
                <ul className="list-disc list-inside space-y-1 text-violet-800 text-[11px]">
                  <li>Derives a modern <strong>V2 Pro license key</strong> (<code>PIWP2-...</code>).</li>
                  <li>Saves and indexes the new key in Redis, linked to this customer.</li>
                  <li>Sends the customer the newly redesigned, professional V2 upgrade email.</li>
                  <li>Old and new keys will both validate seamlessly until they update their site.</li>
                </ul>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setUpgradeModalOpen(false)}
                className="rounded-lg border border-zinc-200 px-3.5 py-1.5 text-xs font-medium text-zinc-600 hover:bg-zinc-50"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={busy !== null}
                onClick={handleSendUpgradedSubmit}
                className="rounded-lg bg-violet-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-violet-500 transition-colors disabled:opacity-50"
              >
                {busy === "send-upgraded-key" ? "Issuing & Sending…" : "Generate & Send V2 Key"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Revoke License Modal ── */}
      {revokeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-zinc-950/60 backdrop-blur-sm" onClick={() => setRevokeModalOpen(false)} />
          <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3 mb-4">
              <div className="flex items-center gap-2 text-rose-600">
                <AlertTriangle className="h-4 w-4" />
                <h3 className="text-sm font-semibold text-zinc-900">Revoke License</h3>
              </div>
              <button onClick={() => setRevokeModalOpen(false)} className="text-zinc-400 hover:text-zinc-600">
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="text-xs text-zinc-500 mb-3">
              Revoking marks this key as disabled. The WordPress plugin will immediately lock Pro features on client sites upon their next validation check.
            </p>

            <div className="space-y-3 mb-4">
              <label className="block text-xs font-medium text-zinc-700">Reason for Revocation</label>
              <select
                value={revokeReason}
                onChange={(e) => setRevokeReason(e.target.value)}
                className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-xs text-zinc-700 focus:border-rose-500 focus:outline-none"
              >
                <option value="refund">Payment Refunded</option>
                <option value="subscription_cancelled">Subscription Canceled</option>
                <option value="chargeback_fraud">Chargeback / Fraudulent Transaction</option>
                <option value="site_limit_abuse">Site-Count Abuse / Reselling</option>
                <option value="other">Other / Custom Reason</option>
              </select>

              {revokeReason === "other" && (
                <input
                  type="text"
                  placeholder="Specify reason…"
                  value={customReason}
                  onChange={(e) => setCustomReason(e.target.value)}
                  className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-xs text-zinc-900 focus:border-rose-500 focus:outline-none"
                />
              )}
            </div>

            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setRevokeModalOpen(false)}
                className="rounded-lg border border-zinc-200 px-3.5 py-1.5 text-xs font-medium text-zinc-600 hover:bg-zinc-50"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={busy !== null}
                onClick={handleRevokeSubmit}
                className="rounded-lg bg-rose-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-rose-500 transition-colors disabled:opacity-50"
              >
                {busy === "revoke" ? "Revoking…" : "Revoke License"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Unrevoke Confirmation Modal ── */}
      {unrevokeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-zinc-950/60 backdrop-blur-sm" onClick={() => setUnrevokeModalOpen(false)} />
          <div className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl">
            <div className="flex items-center gap-2.5 mb-3 text-emerald-600">
              <RotateCcw className="h-5 w-5" />
              <h3 className="text-sm font-semibold text-zinc-900">Restore License</h3>
            </div>
            <p className="text-xs text-zinc-500 mb-5">
              Are you sure you want to unrevoke this license? It will become active again and WordPress client validation checks will succeed.
            </p>
            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setUnrevokeModalOpen(false)}
                className="rounded-lg border border-zinc-200 px-3.5 py-1.5 text-xs font-medium text-zinc-600 hover:bg-zinc-50"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={busy !== null}
                onClick={handleUnrevokeSubmit}
                className="rounded-lg bg-emerald-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-emerald-500 transition-colors disabled:opacity-50"
              >
                {busy === "unrevoke" ? "Restoring…" : "Restore"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function DomainManagement({
  licenseKey,
  tier,
  activations,
  distinctProdDomains,
}: {
  licenseKey: string;
  tier: string;
  activations: ActivationRecord[];
  distinctProdDomains: string[];
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [busySite, setBusySite] = useState<string | null>(null);
  const [resetting, setResetting] = useState(false);

  const now = Math.floor(Date.now() / 1000);
  const activeCount = activations.filter((a) => a.active !== false).length;
  const migrationRemaining = Math.max(0, 2 - distinctProdDomains.length);

  async function handleDeactivateSite(siteUrl: string) {
    if (!window.confirm(`Are you sure you want to disconnect and deactivate ${siteUrl}?`)) return;
    setBusySite(siteUrl);
    try {
      const res = await fetch(`/api/admin/customers/${encodeURIComponent(licenseKey)}/deactivate-domain`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ siteUrl }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast.error(data.error || "Failed to disconnect site");
      } else {
        toast.success(data.message || "Site disconnected successfully");
        startTransition(() => router.refresh());
      }
    } catch {
      toast.error("Network error while disconnecting site");
    } finally {
      setBusySite(null);
    }
  }

  async function handleResetAllowance() {
    if (!window.confirm("Reset lifetime migration count? This clears previous registered domain slots so the customer can activate a new domain.")) return;
    setResetting(true);
    try {
      const res = await fetch(`/api/admin/customers/${encodeURIComponent(licenseKey)}/reset-domains`, {
        method: "POST",
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast.error(data.error || "Failed to reset allowance");
      } else {
        toast.success(data.message || "Migration allowance reset");
        startTransition(() => router.refresh());
      }
    } catch {
      toast.error("Network error while resetting allowance");
    } finally {
      setResetting(false);
    }
  }

  return (
    <div className="mb-5 overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-zinc-100 px-5 py-3.5 gap-2">
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Active WordPress Websites ({activeCount})
          </h3>
          {tier === "single" && (
            <p className="text-[11px] font-medium text-zinc-500 mt-0.5">
              Domain Allowance: {distinctProdDomains.length}/2 lifetime domains registered ({migrationRemaining} transfer remaining)
            </p>
          )}
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {tier === "single" && (
            <button
              onClick={handleResetAllowance}
              disabled={resetting || pending}
              className="inline-flex items-center gap-1 rounded-lg border border-zinc-200 bg-zinc-50/80 px-2.5 py-1 text-[11px] font-semibold text-zinc-700 hover:bg-zinc-100 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`h-3 w-3 ${resetting ? "animate-spin" : ""}`} />
              {resetting ? "Resetting…" : "Reset Transfer Allowance"}
            </button>
          )}
          <span className="text-[11px] text-zinc-400">
            {tier === "single" && activeCount > 1 ? "⚠️ Exceeds 1-site concurrency allowance" : "Client validation telemetry"}
          </span>
        </div>
      </div>

      {activeCount > 0 ? (
        <ul className="divide-y divide-zinc-50">
          {activations.map((a, i) => {
            const diffDays = (now - a.at) / 86400;
            const heartbeat = diffDays <= 7 ? "active" : diffDays <= 30 ? "stale" : "dormant";
            const isSiteBusy = busySite === a.site_url;

            return (
              <li key={i} className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-5 py-3.5 text-sm hover:bg-zinc-50/50 transition-colors gap-2">
                <div className="flex items-center gap-3">
                  <a
                    href={a.site_url.startsWith("http") ? a.site_url : `https://${a.site_url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs font-semibold text-zinc-800 hover:text-violet-600 hover:underline flex items-center gap-1.5"
                  >
                    {a.site_url}
                    <ExternalLink className="h-3 w-3 opacity-40 hover:opacity-100" />
                  </a>
                  {a.active === false ? (
                    <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-semibold text-zinc-500 border border-zinc-200">
                      Disconnected
                    </span>
                  ) : (
                    <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 border border-emerald-200/60">
                      Active
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3">
                  <DomainHeartbeatPill status={heartbeat} />
                  <span className="text-xs font-mono text-zinc-400">{formatDateTime(a.at)}</span>

                  {a.active !== false && (
                    <button
                      onClick={() => handleDeactivateSite(a.site_url)}
                      disabled={isSiteBusy || pending}
                      className="inline-flex items-center gap-1 rounded-md border border-rose-200 bg-rose-50/60 px-2 py-1 text-[11px] font-medium text-rose-700 hover:bg-rose-100 transition-colors disabled:opacity-50"
                      title="Disconnect and release this domain"
                    >
                      <Unlink className="h-3 w-3 text-rose-500" />
                      {isSiteBusy ? "Disconnecting…" : "Disconnect"}
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="px-5 py-6 text-sm text-zinc-400 text-center">
          No WordPress site has pinged validation for this license yet.
        </p>
      )}
    </div>
  );
}
