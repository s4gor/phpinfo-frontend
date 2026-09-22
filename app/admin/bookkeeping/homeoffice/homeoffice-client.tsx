"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatEur } from "@/lib/currency";
import { Pagination } from "../../_components/pagination";
import { toast } from "sonner";
import {
  CalendarDays,
  PlusCircle,
  Trash2,
  CheckCircle2,
  TrendingUp,
  AlertCircle,
  Sparkles,
  Info,
  Calendar,
  Layers,
  ArrowRight,
} from "lucide-react";

interface Props {
  initialDays: string[];
  initialYear: number;
}

export function HomeofficeClient({ initialDays, initialYear }: Props) {
  const router = useRouter();
  const [days, setDays] = useState<string[]>(initialDays);
  const [year, setYear] = useState<number>(initialYear);
  const [loading, setLoading] = useState<boolean>(false);
  const [customDate, setCustomDate] = useState<string>("");
  const [bulkMonth, setBulkMonth] = useState<number>(new Date().getMonth() + 1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filterMonth, setFilterMonth] = useState<string>("all");

  const todayStr = new Date().toISOString().slice(0, 10);
  const yesterdayObj = new Date();
  yesterdayObj.setDate(yesterdayObj.getDate() - 1);
  const yesterdayStr = yesterdayObj.toISOString().slice(0, 10);

  // Homeoffice statutory caps (§ 4 Abs. 5 Satz 1 Nr. 6c EStG)
  const MAX_DAYS = 210;
  const RATE_PER_DAY_CENTS = 600; // €6.00
  const MAX_DEDUCTION_CENTS = MAX_DAYS * RATE_PER_DAY_CENTS; // €1,260.00

  const sortedDays = useMemo(() => {
    return [...days].sort((a, b) => b.localeCompare(a));
  }, [days]);

  const daysCount = Math.min(MAX_DAYS, sortedDays.length);
  const deductionCents = daysCount * RATE_PER_DAY_CENTS;
  const remainingDays = Math.max(0, MAX_DAYS - daysCount);
  const remainingDeductionCents = remainingDays * RATE_PER_DAY_CENTS;
  const progressPct = Math.min(100, Math.round((daysCount / MAX_DAYS) * 100));

  const isTodayLogged = days.includes(todayStr);
  const isYesterdayLogged = days.includes(yesterdayStr);

  // Filtered by month
  const filteredDays = useMemo(() => {
    if (filterMonth === "all") return sortedDays;
    return sortedDays.filter((d) => d.startsWith(`${year}-${filterMonth.padStart(2, "0")}`));
  }, [sortedDays, year, filterMonth]);

  // Paginate 15 items per page
  const PAGE_SIZE = 15;
  const paginatedDays = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredDays.slice(start, start + PAGE_SIZE);
  }, [filteredDays, currentPage]);

  const handleLogDay = async (dateToLog: string) => {
    if (!dateToLog) return;
    if (days.includes(dateToLog)) {
      toast.info(`Date ${dateToLog} is already logged`);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/admin/bookkeeping/homeoffice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: dateToLog, year }),
      });

      if (!res.ok) throw new Error("Failed to log home office day");

      setDays((prev) => Array.from(new Set([...prev, dateToLog])));
      toast.success(`Logged ${dateToLog} (+€6.00 tax deduction)`);
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || "Failed to log day");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDay = async (dateToDelete: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/bookkeeping/homeoffice?date=${dateToDelete}&year=${year}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to remove home office day");

      setDays((prev) => prev.filter((d) => d !== dateToDelete));
      toast.success(`Removed ${dateToDelete}`);
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || "Failed to delete day");
    } finally {
      setLoading(false);
    }
  };

  const handleBulkLogMonth = async () => {
    // Generate all Mon-Fri workdays in bulkMonth of current year
    const daysInMonth = new Date(year, bulkMonth, 0).getDate();
    const workdays: string[] = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const d = new Date(year, bulkMonth - 1, day);
      const dayOfWeek = d.getDay();
      // 1 to 5 = Mon to Fri
      if (dayOfWeek >= 1 && dayOfWeek <= 5) {
        const dStr = `${year}-${String(bulkMonth).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
        if (!days.includes(dStr)) {
          workdays.push(dStr);
        }
      }
    }

    if (workdays.length === 0) {
      toast.info("All workdays for this month are already logged.");
      return;
    }

    setLoading(true);
    try {
      for (const dStr of workdays) {
        await fetch("/api/admin/bookkeeping/homeoffice", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ date: dStr, year }),
        });
      }

      setDays((prev) => Array.from(new Set([...prev, ...workdays])));
      toast.success(`Logged ${workdays.length} workdays for month ${bulkMonth} (+${formatEur(workdays.length * 600)})`);
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || "Bulk logging failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
              <CalendarDays className="w-3.5 h-3.5" />
              § 4 Abs. 5 Satz 1 Nr. 6c EStG
            </span>
            <span className="text-xs text-zinc-400">•</span>
            <span className="text-xs font-mono text-zinc-500">€6.00 / Working Day (Max €1,260)</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 mt-1">
            Home Office Deduction Tracker
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Log workdays in your home office / room for solo developer tax deduction. Directly lowers your taxable income.
          </p>
        </div>

        {/* Year Toggle */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {[2026, 2025, 2024].map((y) => (
            <Link
              key={y}
              href={`/admin/bookkeeping/homeoffice?year=${y}`}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                year === y
                  ? "bg-zinc-900 text-white border-zinc-900 shadow-sm"
                  : "bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-50"
              }`}
            >
              {y}
            </Link>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Days Logged */}
        <div className="p-4 rounded-xl border border-zinc-200/80 bg-white shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-500">Days Logged</span>
            <Calendar className="w-4 h-4 text-zinc-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-zinc-900">{daysCount}</span>
            <span className="text-xs text-zinc-400">/ {MAX_DAYS} days max</span>
          </div>
          <div className="mt-3 w-full bg-zinc-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* Current Tax Deduction */}
        <div className="p-4 rounded-xl border border-emerald-200/70 bg-gradient-to-br from-emerald-50/50 to-white shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-emerald-800">Tax Write-Off Secured</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-emerald-700">
              {formatEur(deductionCents)}
            </span>
            <span className="text-xs text-emerald-600/80">deducted from profit</span>
          </div>
          <p className="mt-2 text-[11px] text-zinc-500">
            {progressPct}% of annual statutory ceiling (€1,260.00)
          </p>
        </div>

        {/* Remaining Allowance */}
        <div className="p-4 rounded-xl border border-zinc-200/80 bg-white shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-500">Remaining Potential</span>
            <CheckCircle2 className="w-4 h-4 text-zinc-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-zinc-900">
              {formatEur(remainingDeductionCents)}
            </span>
            <span className="text-xs text-zinc-400 font-mono">({remainingDays} days)</span>
          </div>
          <p className="mt-2 text-[11px] text-zinc-500">
            Still available to log in {year}
          </p>
        </div>

        {/* Daily Rate Info */}
        <div className="p-4 rounded-xl border border-zinc-200/80 bg-white shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-500">Statutory Rate</span>
            <Sparkles className="w-4 h-4 text-amber-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-zinc-900">€6.00</span>
            <span className="text-xs text-zinc-400">per workday</span>
          </div>
          <p className="mt-2 text-[11px] text-zinc-500">
            No dedicated office room required under current law
          </p>
        </div>
      </div>

      {/* Quick Action Control Bar */}
      <div className="p-5 rounded-xl border border-zinc-200/80 bg-zinc-50/70">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Quick Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleLogDay(todayStr)}
              disabled={loading || isTodayLogged}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg shadow-xs transition-all ${
                isTodayLogged
                  ? "bg-emerald-100 text-emerald-800 border border-emerald-300 cursor-default"
                  : "bg-emerald-600 hover:bg-emerald-700 text-white"
              }`}
            >
              {isTodayLogged ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" /> Today Logged (€6.00)
                </>
              ) : (
                <>
                  <PlusCircle className="w-3.5 h-3.5" /> + Log Today ({todayStr})
                </>
              )}
            </button>

            <button
              onClick={() => handleLogDay(yesterdayStr)}
              disabled={loading || isYesterdayLogged}
              className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border transition-all ${
                isYesterdayLogged
                  ? "bg-zinc-100 text-zinc-400 border-zinc-200 cursor-default"
                  : "bg-white hover:bg-zinc-50 text-zinc-700 border-zinc-200"
              }`}
            >
              {isYesterdayLogged ? "Yesterday Logged" : "+ Log Yesterday"}
            </button>

            {/* Custom Date Input */}
            <div className="flex items-center gap-1.5">
              <input
                type="date"
                value={customDate}
                onChange={(e) => setCustomDate(e.target.value)}
                className="px-2.5 py-1.5 text-xs bg-white border border-zinc-200 rounded-lg text-zinc-800 focus:outline-hidden focus:ring-2 focus:ring-zinc-900/10"
              />
              <button
                onClick={() => {
                  if (customDate) {
                    handleLogDay(customDate);
                    setCustomDate("");
                  }
                }}
                disabled={loading || !customDate}
                className="px-3 py-2 text-xs font-medium bg-white hover:bg-zinc-100 text-zinc-700 border border-zinc-200 rounded-lg transition-colors disabled:opacity-50"
              >
                Log Date
              </button>
            </div>
          </div>

          {/* Bulk Month Logging */}
          <div className="flex items-center gap-2 self-start lg:self-auto border-t lg:border-t-0 pt-3 lg:pt-0 border-zinc-200">
            <span className="text-xs text-zinc-500">Bulk workdays:</span>
            <select
              value={bulkMonth}
              onChange={(e) => setBulkMonth(parseInt(e.target.value, 10))}
              className="px-2.5 py-1.5 text-xs bg-white border border-zinc-200 rounded-lg text-zinc-800 focus:outline-hidden"
            >
              {[
                { m: 1, name: "January" },
                { m: 2, name: "February" },
                { m: 3, name: "March" },
                { m: 4, name: "April" },
                { m: 5, name: "May" },
                { m: 6, name: "June" },
                { m: 7, name: "July" },
                { m: 8, name: "August" },
                { m: 9, name: "September" },
                { m: 10, name: "October" },
                { m: 11, name: "November" },
                { m: 12, name: "December" },
              ].map((mo) => (
                <option key={mo.m} value={mo.m}>
                  {mo.name} {year}
                </option>
              ))}
            </select>
            <button
              onClick={handleBulkLogMonth}
              disabled={loading}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg transition-colors shadow-xs"
            >
              <Layers className="w-3.5 h-3.5" /> Auto-Log Mon–Fri
            </button>
          </div>
        </div>
      </div>

      {/* Logged Workdays Ledger */}
      <div className="rounded-xl border border-zinc-200/80 bg-white overflow-hidden shadow-xs">
        {/* Table Header / Filters */}
        <div className="p-4 border-b border-zinc-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-zinc-50/50">
          <div>
            <h3 className="text-sm font-semibold text-zinc-900">
              Home Office Calendar Log ({filteredDays.length} records)
            </h3>
            <p className="text-xs text-zinc-500">
              Retain this list for German tax audit verification (Audit record for the tax office).
            </p>
          </div>

          {/* Month Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-500">Filter Month:</span>
            <select
              value={filterMonth}
              onChange={(e) => {
                setFilterMonth(e.target.value);
                setCurrentPage(1);
              }}
              className="px-2.5 py-1 text-xs bg-white border border-zinc-200 rounded-lg text-zinc-700 focus:outline-hidden"
            >
              <option value="all">All Year {year}</option>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                <option key={m} value={String(m)}>
                  {new Date(2026, m - 1).toLocaleString("en-US", { month: "long" })}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-zinc-600">
            <thead className="bg-zinc-50/80 text-[11px] font-semibold text-zinc-400 uppercase tracking-wider border-b border-zinc-100">
              <tr>
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3">Day of Week</th>
                <th className="px-5 py-3">Category</th>
                <th className="px-5 py-3">Daily Deduction</th>
                <th className="px-5 py-3">Legal Basis</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {paginatedDays.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-8 text-center text-zinc-400 text-xs">
                    No home office days logged for this period. Click "+ Log Today" above to begin.
                  </td>
                </tr>
              ) : (
                paginatedDays.map((dStr, idx) => {
                  const dateObj = new Date(dStr + "T12:00:00Z");
                  const weekday = dateObj.toLocaleDateString("en-US", { weekday: "long" });
                  const formatted = dateObj.toLocaleDateString("de-DE", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  });

                  return (
                    <tr key={dStr} className="hover:bg-zinc-50/60 transition-colors">
                      <td className="px-5 py-3 font-mono font-medium text-zinc-900">
                        {dStr} <span className="text-[10px] text-zinc-400">({formatted})</span>
                      </td>
                      <td className="px-5 py-3 text-zinc-600 font-medium">{weekday}</td>
                      <td className="px-5 py-3">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/50">
                          Solo Dev / Workday
                        </span>
                      </td>
                      <td className="px-5 py-3 font-mono font-semibold text-emerald-700">
                        €6.00
                      </td>
                      <td className="px-5 py-3 font-mono text-[11px] text-zinc-400">
                        § 4 Abs. 5 EStG
                      </td>
                      <td className="px-5 py-3 text-right">
                        <button
                          onClick={() => handleDeleteDay(dStr)}
                          disabled={loading}
                          className="inline-flex items-center gap-1 p-1 text-zinc-400 hover:text-rose-600 transition-colors"
                          title="Remove logged day"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* 15-item Pagination */}
        <Pagination
          totalItems={filteredDays.length}
          pageSize={PAGE_SIZE}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* German Tax Authority Compliance Explainer */}
      <div className="p-4 rounded-xl border border-blue-200/70 bg-blue-50/40 text-xs text-blue-900 flex items-start gap-3">
        <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <h4 className="font-semibold text-blue-950">
            German Tax Law Compliance Note (§ 4 Abs. 5 Satz 1 Nr. 6c EStG)
          </h4>
          <p className="mt-1 text-blue-800 leading-relaxed text-[11px]">
            As a solo software developer in Germany, you are legally entitled to deduct <strong>€6.00 per calendar day</strong> on which you work from your home room or apartment, up to a maximum of <strong>210 days / €1,260.00 per tax year</strong>. A separate, dedicated work study room is <strong>not required</strong> under current law. This full amount is entered directly into your annual income tax return (Form EÜR, Line 70), directly reducing your taxable income.
          </p>
        </div>
      </div>
    </div>
  );
}
