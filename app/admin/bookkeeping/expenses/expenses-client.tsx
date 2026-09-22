"use client";

import { useState, useMemo, useTransition } from "react";
import { useRouter } from "next/navigation";
import { formatMoney } from "../../_components/format";
import { Pagination } from "../../_components/pagination";
import { CATEGORY_LABELS } from "@/lib/bookkeeping";
import { convertExpenseToEur, formatEur } from "@/lib/currency";
import type { ExpenseRecord, ExpenseCategory } from "@/lib/db";
import { toast } from "sonner";
import {
  FileSpreadsheet,
  PlusCircle,
  Search,
  Trash2,
  Calendar,
  Sparkles,
  Repeat,
  DollarSign,
  X,
  Building2,
  Check,
} from "lucide-react";

export function ExpensesClient({ initialExpenses }: { initialExpenses: ExpenseRecord[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [q, setQ] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Add modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [vendor, setVendor] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("eur");
  const [category, setCategory] = useState<ExpenseCategory>("software_cloud");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurringInterval, setRecurringInterval] = useState<"daily" | "monthly" | "yearly">("monthly");
  const [taxDeductiblePct, setTaxDeductiblePct] = useState("100");
  const [submitting, setSubmitting] = useState(false);

  // Solo Dev Quick Presets
  const presets = [
    {
      label: "Home Office Allowance (§ 4 Abs. 5)",
      vendor: "Home Office Allowance",
      amount: "6.00",
      currency: "eur",
      category: "homeoffice" as ExpenseCategory,
      desc: "Daily statutory home office deduction",
      deduct: "100",
      recurring: false,
    },
    {
      label: "Transit Pass (Deutschlandticket)",
      vendor: "Deutsche Bahn",
      amount: "49.00",
      currency: "eur",
      category: "travel_transit" as ExpenseCategory,
      desc: "Public transit monthly pass for business travel",
      deduct: "100",
      recurring: true,
      interval: "monthly" as const,
    },
    {
      label: "Internet 50% Business Share",
      vendor: "Telekom / Vodafone",
      amount: "25.00",
      currency: "eur",
      category: "telecom_internet" as ExpenseCategory,
      desc: "50% business portion of internet/phone",
      deduct: "50",
      recurring: true,
      interval: "monthly" as const,
    },
    {
      label: "Vercel Pro Hosting",
      vendor: "Vercel Inc.",
      amount: "20.00",
      currency: "usd",
      category: "software_cloud" as ExpenseCategory,
      desc: "Cloud Hosting & Deployment Infrastructure",
      deduct: "100",
      recurring: true,
      interval: "monthly" as const,
    },
    {
      label: "Cursor / AI Tools",
      vendor: "Cursor / Anysphere",
      amount: "20.00",
      currency: "usd",
      category: "software_cloud" as ExpenseCategory,
      desc: "AI Pair Programming & Code Assistance",
      deduct: "100",
      recurring: true,
      interval: "monthly" as const,
    },
    {
      label: "GitHub Copilot",
      vendor: "GitHub / Microsoft",
      amount: "10.00",
      currency: "usd",
      category: "software_cloud" as ExpenseCategory,
      desc: "Developer Tooling & Code Repository",
      deduct: "100",
      recurring: true,
      interval: "monthly" as const,
    },
  ];

  function applyPreset(p: typeof presets[0]) {
    setVendor(p.vendor);
    setAmount(p.amount);
    setCurrency(p.currency);
    setCategory(p.category);
    setDescription(p.desc);
    setTaxDeductiblePct(p.deduct);
    setIsRecurring(p.recurring);
    if (p.interval) setRecurringInterval(p.interval);
  }

  async function handleAddExpense(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/bookkeeping/expenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vendor,
          description: description || vendor,
          amount: parseFloat(amount),
          currency,
          category,
          date,
          is_recurring: isRecurring,
          recurring_interval: isRecurring ? recurringInterval : undefined,
          tax_deductible_pct: parseInt(taxDeductiblePct, 10) || 100,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add expense");
      toast.success("Expense registered successfully!");
      setIsModalOpen(false);
      // Reset form
      setVendor("");
      setAmount("");
      setDescription("");
      startTransition(() => router.refresh());
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to record expense");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDeleteExpense(id: string) {
    if (!window.confirm("Are you sure you want to delete this expense?")) return;
    try {
      const res = await fetch(`/api/admin/bookkeeping/expenses?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      toast.success("Expense deleted.");
      startTransition(() => router.refresh());
    } catch {
      toast.error("Failed to delete expense.");
    }
  }

  const filtered = useMemo(() => {
    return initialExpenses.filter((exp) => {
      if (q.trim()) {
        const query = q.trim().toLowerCase();
        const hay = `${exp.vendor} ${exp.description} ${exp.category} ${exp.date}`.toLowerCase();
        if (!hay.includes(query)) return false;
      }
      if (categoryFilter !== "all" && exp.category !== categoryFilter) return false;
      return true;
    });
  }, [initialExpenses, q, categoryFilter]);

  // Paginate 15 items per page
  const pageSize = 15;
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, currentPage]);

  const totalSumCents = filtered.reduce((s, e) => {
    const conv = convertExpenseToEur(e.amountCents, e.currency, e.date);
    return s + Math.round(conv.amountEurCents * ((e.taxDeductiblePct ?? 100) / 100));
  }, 0);

  return (
    <div>
      {/* Header Toolbar */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900">Expenses & Costs Ledger</h1>
          <p className="mt-1 text-xs text-zinc-500">
            Track business operating costs, recurring software subscriptions, and tax-deductible expenses.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-1.5 rounded-xl bg-violet-600 px-4 py-2 text-xs font-semibold text-white shadow-2xs hover:bg-violet-500 transition-colors self-start sm:self-auto"
        >
          <PlusCircle className="h-4 w-4" />
          + Add Business Expense
        </button>
      </div>

      {/* Filter bar */}
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            value={q}
            onChange={(e) => { setQ(e.target.value); setCurrentPage(1); }}
            placeholder="Search vendor, description, category, date…"
            className="w-full rounded-xl border border-zinc-200/80 bg-white pl-9 pr-3 py-2 text-xs text-zinc-900 placeholder:text-zinc-400 shadow-2xs focus:border-violet-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <select
            value={categoryFilter}
            onChange={(e) => { setCategoryFilter(e.target.value); setCurrentPage(1); }}
            className="rounded-xl border border-zinc-200/80 bg-white px-3 py-2 text-zinc-700 shadow-2xs focus:border-violet-500 focus:outline-none"
          >
            <option value="all">All Categories</option>
            {Object.entries(CATEGORY_LABELS).map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Summary line */}
      <div className="mb-3 flex items-center justify-between text-xs text-zinc-500 px-1">
        <span>
          Total deductible expenses: <strong className="text-zinc-900 font-mono font-semibold">{formatEur(totalSumCents)}</strong> ({filtered.length} entries)
        </span>
      </div>

      {/* Expenses Table (15 per page) */}
      <div className="overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-100 text-[10px] font-medium uppercase tracking-wider text-zinc-400 bg-zinc-50/50">
                <th className="px-5 py-3.5">Date</th>
                <th className="px-5 py-3.5">Vendor / Payee</th>
                <th className="px-5 py-3.5">Category</th>
                <th className="px-5 py-3.5">Description</th>
                <th className="px-5 py-3.5">Deductible %</th>
                <th className="px-5 py-3.5">Gross Amount</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {paginated.map((exp) => {
                const isPartiallyDeductible = (exp.taxDeductiblePct ?? 100) < 100;
                return (
                  <tr key={exp.id} className="hover:bg-zinc-50/80 transition-colors">
                    <td className="px-5 py-3.5 font-mono text-xs text-zinc-500 whitespace-nowrap">
                      {exp.date}
                    </td>

                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs text-zinc-900">{exp.vendor}</span>
                        {exp.isRecurring && (
                          <span className="inline-flex items-center gap-1 rounded-full border border-violet-200 bg-violet-50 px-2 py-0.5 text-[9px] font-semibold text-violet-700 uppercase">
                            <Repeat className="h-2.5 w-2.5" /> {exp.recurringInterval || "monthly"}
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <span className="inline-flex items-center rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-0.5 text-[10px] font-medium text-zinc-700">
                        {CATEGORY_LABELS[exp.category] || exp.category}
                      </span>
                    </td>

                    <td className="px-5 py-3.5 text-xs text-zinc-600 max-w-xs truncate">
                      {exp.description}
                    </td>

                    <td className="px-5 py-3.5 text-xs font-mono text-zinc-500">
                      {exp.taxDeductiblePct ?? 100}%
                      {isPartiallyDeductible && (
                        <span className="text-[10px] text-amber-600 block">Mixed private/business</span>
                      )}
                    </td>

                    <td className="px-5 py-3.5 text-xs font-mono font-semibold text-rose-700 whitespace-nowrap">
                      {formatMoney(exp.amountCents, exp.currency)}
                      {exp.currency && exp.currency.toLowerCase() !== "eur" && (
                        <span className="block text-[10px] font-normal text-zinc-500">
                          (~{formatEur(convertExpenseToEur(exp.amountCents, exp.currency, exp.date).amountEurCents)})
                        </span>
                      )}
                    </td>

                    <td className="px-5 py-3.5 text-right whitespace-nowrap">
                      <button
                        onClick={() => handleDeleteExpense(exp.id)}
                        className="rounded-lg p-1 text-zinc-400 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                        title="Delete expense"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-sm text-zinc-400">
                    No expenses found. Click "+ Add Business Expense" to record your costs.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* 15-item Pagination */}
        <Pagination
          currentPage={currentPage}
          totalItems={filtered.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* ── Add Expense Modal with Presets ── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-zinc-950/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="h-4 w-4 text-violet-600" />
                <h3 className="text-sm font-semibold text-zinc-900">Record Business Expense</h3>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-400 hover:text-zinc-600">
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Solo Dev Quick Presets */}
            <div className="mb-4">
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                Solo Developer Quick Presets (Click to fill)
              </label>
              <div className="flex flex-wrap gap-1.5">
                {presets.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => applyPreset(p)}
                    className="rounded-lg border border-zinc-200 bg-zinc-50/70 px-2.5 py-1 text-[11px] font-medium text-zinc-700 hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700 transition-colors"
                  >
                    + {p.label}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleAddExpense} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-zinc-700 mb-1">
                    Vendor / Payee <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={vendor}
                    onChange={(e) => setVendor(e.target.value)}
                    placeholder="e.g. Vercel, Deutsche Bahn"
                    className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-xs focus:border-violet-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-700 mb-1">
                    Amount & Currency <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-xs font-mono focus:border-violet-500 focus:outline-none"
                    />
                    <select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className="rounded-lg border border-zinc-300 px-2.5 py-2 text-xs font-medium focus:border-violet-500 focus:outline-none"
                    >
                      <option value="eur">EUR (€)</option>
                      <option value="usd">USD ($)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-zinc-700 mb-1">Tax Category (EÜR)</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ExpenseCategory)}
                    className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-xs focus:border-violet-500 focus:outline-none"
                  >
                    {Object.entries(CATEGORY_LABELS).map(([k, v]) => (
                      <option key={k} value={k}>{v}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-700 mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-xs focus:border-violet-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-700 mb-1">Description / Purpose</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Business purpose, invoice or receipt note"
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-xs focus:border-violet-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-xs font-medium text-zinc-700 mb-1">Deductible Share (%)</label>
                  <select
                    value={taxDeductiblePct}
                    onChange={(e) => setTaxDeductiblePct(e.target.value)}
                    className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-xs focus:border-violet-500 focus:outline-none"
                  >
                    <option value="100">100% (Full business write-off)</option>
                    <option value="50">50% (Mixed e.g. private/work phone)</option>
                    <option value="20">20% (Partial share)</option>
                  </select>
                </div>

                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-zinc-700">
                    <input
                      type="checkbox"
                      checked={isRecurring}
                      onChange={(e) => setIsRecurring(e.target.checked)}
                      className="h-4 w-4 rounded border-zinc-300 text-violet-600 focus:ring-violet-500"
                    />
                    <span>Recurring expense</span>
                  </label>
                </div>
              </div>

              {isRecurring && (
                <div>
                  <label className="block text-xs font-medium text-zinc-700 mb-1">Recurring Cycle</label>
                  <select
                    value={recurringInterval}
                    onChange={(e) => setRecurringInterval(e.target.value as "daily" | "monthly" | "yearly")}
                    className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-xs focus:border-violet-500 focus:outline-none"
                  >
                    <option value="monthly">Monthly</option>
                    <option value="daily">Daily (e.g. Home Office Allowance)</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-zinc-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-lg border border-zinc-200 px-3.5 py-1.5 text-xs font-medium text-zinc-600 hover:bg-zinc-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-lg bg-violet-600 px-4 py-1.5 text-xs font-semibold text-white shadow-2xs hover:bg-violet-500 transition-colors disabled:opacity-50"
                >
                  {submitting ? "Saving…" : "Save Expense"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
