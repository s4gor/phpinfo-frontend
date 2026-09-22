"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { X, Key, Mail, Check, Copy, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface IssueLicenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function IssueLicenseModal({ isOpen, onClose, onSuccess }: IssueLicenseModalProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [email, setEmail] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [tier, setTier] = useState<"single" | "unlimited" | "lifetime">("single");
  const [expiryPreset, setExpiryPreset] = useState<"1y" | "2y" | "lifetime">("1y");
  const [sendEmail, setSendEmail] = useState(true);
  const [note, setNote] = useState("");

  const [issuedKey, setIssuedKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);
    setError(null);

    const now = Math.floor(Date.now() / 1000);
    let exp = now + 365 * 86400;
    if (expiryPreset === "2y") exp = now + 2 * 365 * 86400;
    if (expiryPreset === "lifetime" || tier === "lifetime") exp = 4070908800; // 2099-01-01

    try {
      const res = await fetch("/api/admin/licenses/issue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          customer_name: customerName,
          tier,
          exp,
          send_email: sendEmail,
          note,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to generate license.");
      }

      setIssuedKey(data.license.key);
      toast.success("License generated successfully!");
      startTransition(() => {
        router.refresh();
        if (onSuccess) onSuccess();
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      toast.error(err instanceof Error ? err.message : "Failed to issue license.");
    } finally {
      setSubmitting(false);
    }
  }

  function handleCopy() {
    if (!issuedKey) return;
    navigator.clipboard.writeText(issuedKey);
    setCopied(true);
    toast.success("License key copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  }

  function handleReset() {
    setEmail("");
    setCustomerName("");
    setTier("single");
    setExpiryPreset("1y");
    setSendEmail(true);
    setNote("");
    setIssuedKey(null);
    setError(null);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-zinc-950/60 backdrop-blur-sm transition-opacity"
        onClick={handleReset}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-2xl ring-1 ring-black/5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-violet-200 bg-violet-50 text-violet-600">
              <Key className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-zinc-900">Issue License Key</h2>
              <p className="text-xs text-zinc-400">Generate a complimentary, VIP, or manual license</p>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="rounded-lg p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Issued Key Success State */}
        {issuedKey ? (
          <div className="mt-5 space-y-4">
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-4 text-center">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-2">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-semibold text-emerald-900">License Issued Successfully</h3>
              <p className="text-xs text-emerald-700 mt-0.5">
                Registered for {email} ({tier.toUpperCase()})
                {sendEmail && " · Welcome email dispatched via Resend"}
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                License Key (Modern V2)
              </label>
              <div className="relative">
                <pre className="overflow-x-auto rounded-lg border border-violet-100 bg-violet-50/70 p-3 pr-20 text-xs font-mono text-violet-700 break-all select-all">
                  {issuedKey}
                </pre>
                <button
                  onClick={handleCopy}
                  className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-md bg-white border border-violet-200 px-2.5 py-1 text-xs font-medium text-violet-700 shadow-sm hover:bg-violet-50 transition-colors"
                >
                  {copied ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={handleReset}
                className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-zinc-800 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* Form State */
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-700">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-zinc-700 mb-1">
                Customer Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="customer@domain.com"
                className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 shadow-sm focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-700 mb-1">
                Customer Name (optional)
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Full name or company"
                className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 shadow-sm focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-zinc-700 mb-1">Plan Tier</label>
                <select
                  value={tier}
                  onChange={(e) => {
                    const t = e.target.value as "single" | "unlimited" | "lifetime";
                    setTier(t);
                    if (t === "lifetime") setExpiryPreset("lifetime");
                  }}
                  className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-700 shadow-sm focus:border-violet-500 focus:outline-none"
                >
                  <option value="single">Single Site</option>
                  <option value="unlimited">Unlimited</option>
                  <option value="lifetime">Lifetime</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-700 mb-1">Duration / Expiry</label>
                <select
                  value={expiryPreset}
                  disabled={tier === "lifetime"}
                  onChange={(e) => setExpiryPreset(e.target.value as "1y" | "2y" | "lifetime")}
                  className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-700 shadow-sm focus:border-violet-500 focus:outline-none disabled:bg-zinc-100 disabled:text-zinc-400"
                >
                  <option value="1y">1 Year (Standard)</option>
                  <option value="2y">2 Years</option>
                  <option value="lifetime">Never (Lifetime)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-700 mb-1">Internal Note (optional)</label>
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="e.g. VIP partner, beta tester, bank transfer"
                className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 shadow-sm focus:border-violet-500 focus:outline-none"
              />
            </div>

            {/* Email dispatch toggle */}
            <div className="flex items-center justify-between rounded-xl border border-zinc-200/80 bg-zinc-50/50 p-3">
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-zinc-400" />
                <div>
                  <div className="text-xs font-medium text-zinc-800">Email License to Customer</div>
                  <div className="text-[11px] text-zinc-400">Dispatches official welcome email with key</div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={sendEmail}
                onChange={(e) => setSendEmail(e.target.checked)}
                className="h-4 w-4 rounded border-zinc-300 text-violet-600 focus:ring-violet-500"
              />
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center justify-end gap-2 pt-3 border-t border-zinc-100">
              <button
                type="button"
                onClick={handleReset}
                className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm hover:bg-zinc-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting || isPending}
                className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 transition-colors disabled:opacity-50"
              >
                {submitting ? "Generating…" : "Generate License"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
