"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { formatEur } from "@/lib/currency";
import type { EuerReport } from "@/lib/bookkeeping";
import { toast } from "sonner";
import {
  AlertTriangle,
  RotateCcw,
  TrendingUp,
  DollarSign,
  FileSpreadsheet,
  Download,
  CalendarDays,
  PlusCircle,
  Receipt,
  PieChart,
  ShieldCheck,
  CheckCircle2,
  ArrowUpRight,
  Sparkles,
  Info,
  GraduationCap,
  Building,
  CreditCard,
  Scale,
  Landmark,
  ArrowDownLeft,
} from "lucide-react";

export function BookkeepingClient({ report }: { report: EuerReport }) {
  const router = useRouter();
  const [loggingHomeoffice, setLoggingHomeoffice] = useState(false);

  const homeofficeMaxDays = 210;
  const homeofficeMaxCents = 126000;
  const homeofficePct = Math.min(
    100,
    Math.round((report.homeofficeDaysCount / homeofficeMaxDays) * 100)
  );

  async function handleLogHomeofficeToday() {
    setLoggingHomeoffice(true);
    const today = new Date().toISOString().slice(0, 10);
    try {
      const res = await fetch("/api/admin/bookkeeping/homeoffice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: today }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        toast.info(data.message || "Home office day already logged or limit reached.");
      } else {
        toast.success(data.message || `Logged home office day for ${today} (+€6.00 deduction).`);
        router.refresh();
      }
    } catch {
      toast.error("Failed to log home office day.");
    } finally {
      setLoggingHomeoffice(false);
    }
  }

  const tax = report.germanTax;
  const forex = report.forex;

  return (
    <div className="space-y-6">
      {/* Top Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
              Tax & Bookkeeping (EÜR)
            </h1>
            <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 border border-emerald-200">
              Section 4 (3) EStG · Tax Year {report.year}
            </span>
          </div>
          <p className="mt-1 text-xs text-zinc-500">
            Cash-basis accounting, deductible expenses, home office allowance, and solo developer / student tax exemptions.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <a
            href={`/api/admin/export/euer?year=${report.year}`}
            className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200/90 bg-white px-3.5 py-2 text-xs font-semibold text-zinc-700 shadow-2xs hover:bg-zinc-50 transition-colors"
          >
            <Download className="h-3.5 w-3.5 text-zinc-400" />
            Export Tax CSV (DATEV)
          </a>
          <Link
            href="/admin/bookkeeping/invoices"
            className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200/90 bg-white px-3.5 py-2 text-xs font-semibold text-zinc-700 shadow-2xs hover:bg-zinc-50 transition-colors"
          >
            <Receipt className="h-3.5 w-3.5 text-zinc-400" />
            Invoices & Receipts
          </Link>
          <Link
            href="/admin/bookkeeping/expenses"
            className="inline-flex items-center gap-1.5 rounded-xl bg-zinc-900 px-3.5 py-2 text-xs font-semibold text-white shadow-2xs hover:bg-zinc-800 transition-colors"
          >
            <PlusCircle className="h-3.5 w-3.5" />
            Add Expense
          </Link>
        </div>
      </div>

      {/* Hero Financial KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Net Sales Volume */}
        <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Net Sales Volume</span>
            <DollarSign className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold tracking-tight text-zinc-900 font-mono">
            {formatEur(report.revenueGrossEurCents)}
          </div>
          <div className="mt-2 text-[11px] text-zinc-400">
            Matches Stripe settled net volume cent-for-cent
          </div>
        </div>

        {/* Operating Expenses & Fees */}
        <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Deductible Expenses</span>
            <FileSpreadsheet className="h-4 w-4 text-rose-500" />
          </div>
          <div className="text-2xl font-bold tracking-tight text-rose-700 font-mono">
            {formatEur(report.totalExpensesEurCents)}
          </div>
          <div className="mt-2 text-[11px] text-zinc-400 truncate" title={`Stripe fees (${formatEur(report.totalPaymentFeesEurCents)}) + Costs (${formatEur(report.operatingExpensesEurCents)}) + Home office (${formatEur(report.homeofficeDeductionEurCents)})`}>
            Fees {formatEur(report.totalPaymentFeesEurCents)} + Costs {formatEur(report.operatingExpensesEurCents)} + Home Office {formatEur(report.homeofficeDeductionEurCents)}
          </div>
        </div>

        {/* Net Taxable Profit */}
        <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Net Taxable Profit</span>
            <TrendingUp className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold tracking-tight font-mono text-emerald-700">
            {formatEur(report.netProfitEurCents)}
          </div>
          <div className="mt-2 text-[11px] text-zinc-400">
            Operating profit ({report.profitMarginPct}% margin)
          </div>
        </div>

        {/* Income Tax Due */}
        <div className="rounded-2xl border border-emerald-200/70 bg-gradient-to-br from-emerald-50/50 to-white p-5 shadow-xs">
          <div className="flex items-center justify-between text-emerald-800 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Estimated Income Tax</span>
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold tracking-tight text-emerald-700 font-mono">
            {tax.isBelowGrundfreibetrag ? "€0.00" : formatEur(tax.estimatedIncomeTaxEurCents)}
          </div>
          <div className="mt-2 text-[11px] text-emerald-700 font-medium flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            {tax.isBelowGrundfreibetrag
              ? "100% Tax-Free (Under Personal Allowance)"
              : `Effective rate: ${tax.effectiveIncomeTaxRatePct}%`}
          </div>
        </div>
      </div>

      {/* Stripe Gross Revenue & Settlement Reconciliation */}
      <div className="rounded-2xl border border-zinc-200/90 bg-white p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
          <div>
            <h2 className="text-base font-bold text-zinc-900 flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-indigo-600" />
              Stripe Gross Inflow & Revenue Reconciliation
            </h2>
            <p className="text-xs text-zinc-500">
              Audit-proof reconciliation between Stripe gross charge events, customer refunds, chargebacks, and taxable turnover (§ 4 Abs. 3 EStG).
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
            Cent-for-Cent Reconciled
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Gross Stripe Charges */}
          <div className="p-4 rounded-xl border border-zinc-200/70 bg-zinc-50/50">
            <span className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider">Gross Inflow (Charges)</span>
            <div className="text-xl font-bold font-mono text-zinc-900 mt-1.5">
              {formatEur(report.grossChargesEurCents)}
            </div>
            <span className="text-[11px] text-zinc-400 mt-1 block">
              Total Stripe card charge events
            </span>
          </div>

          {/* Customer Refunds */}
          <div className="p-4 rounded-xl border border-rose-100 bg-rose-50/30">
            <span className="text-[11px] font-medium text-rose-700 uppercase tracking-wider">Customer Refunds ({report.stripeBalance.refunds.length})</span>
            <div className="text-xl font-bold font-mono text-rose-700 mt-1.5">
              -{formatEur(report.refundsEurCents)}
            </div>
            <span className="text-[11px] text-rose-600/80 mt-1 block">
              14-day refund policy returned
            </span>
          </div>

          {/* Dispute Chargebacks */}
          <div className="p-4 rounded-xl border border-amber-100 bg-amber-50/30">
            <span className="text-[11px] font-medium text-amber-700 uppercase tracking-wider">Disputes / Chargebacks ({report.stripeBalance.disputes.length})</span>
            <div className="text-xl font-bold font-mono text-amber-800 mt-1.5">
              -{formatEur(report.disputeWithdrawalsEurCents)}
            </div>
            <span className="text-[11px] text-amber-600/80 mt-1 block">
              Withdrawn dispute amounts
            </span>
          </div>

          {/* Reconciled Taxable Turnover */}
          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40">
            <span className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider">Net Taxable Turnover</span>
            <div className="text-xl font-bold font-mono text-emerald-700 mt-1.5">
              {formatEur(report.revenueGrossEurCents)}
            </div>
            <span className="text-[11px] text-emerald-700/80 mt-1 block">
              EÜR Line 11 / § 19 UStG Basis
            </span>
          </div>
        </div>
      </div>

      {/* Solo Developer & Student Tax Allowance Cockpit */}
      <div className="rounded-2xl border border-zinc-200/90 bg-white p-6 shadow-xs">
        <div className="flex items-center gap-2 mb-4">
          <GraduationCap className="w-5 h-5 text-zinc-900" />
          <div>
            <h2 className="text-base font-bold text-zinc-900">
              Solo Developer & Student Tax Allowance Cockpit ({report.year})
            </h2>
            <p className="text-xs text-zinc-500">
              Live monitoring of German personal tax-free allowance, trade tax threshold, and social insurance limits.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Personal Tax-Free Allowance Tracker */}
          <div className="p-4 rounded-xl border border-zinc-200/80 bg-zinc-50/50">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-900 flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-blue-600" />
                Personal Tax-Free Allowance (§ 32a EStG)
              </span>
              <span className="text-xs font-mono font-bold text-zinc-700">
                {formatEur(tax.grundfreibetragEurCents)}
              </span>
            </div>

            <div className="mt-3">
              <div className="flex justify-between text-xs text-zinc-500 mb-1">
                <span>Profit: {formatEur(report.netProfitEurCents)}</span>
                <span className="font-mono">{tax.incomeTaxCushionUsedPct}% used</span>
              </div>
              <div className="w-full bg-zinc-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${tax.incomeTaxCushionUsedPct}%` }}
                />
              </div>
            </div>

            <div className="mt-3 text-[11px] text-zinc-600 flex items-center justify-between">
              <span>Tax-free cushion left:</span>
              <strong className="font-mono text-emerald-700">
                {formatEur(tax.incomeTaxCushionRemainingEurCents)}
              </strong>
            </div>
            <p className="mt-1 text-[10px] text-zinc-400">
              You owe €0.00 income tax as long as annual net profit stays below this limit.
            </p>
          </div>

          {/* Trade Tax Allowance Tracker */}
          <div className="p-4 rounded-xl border border-zinc-200/80 bg-zinc-50/50">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-900 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-purple-600" />
                Trade Tax Allowance (§ 11 GewStG)
              </span>
              <span className="text-xs font-mono font-bold text-zinc-700">
                {formatEur(tax.gewerbesteuerFreibetragEurCents)}
              </span>
            </div>

            <div className="mt-3">
              <div className="flex justify-between text-xs text-zinc-500 mb-1">
                <span>Profit: {formatEur(report.netProfitEurCents)}</span>
                <span className="font-mono">{tax.gewerbesteuerCushionUsedPct}% used</span>
              </div>
              <div className="w-full bg-zinc-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${tax.gewerbesteuerCushionUsedPct}%` }}
                />
              </div>
            </div>

            <div className="mt-3 text-[11px] text-zinc-600 flex items-center justify-between">
              <span>Cushion before Trade Tax:</span>
              <strong className="font-mono text-emerald-700">
                {formatEur(tax.gewerbesteuerCushionRemainingEurCents)}
              </strong>
            </div>
            <p className="mt-1 text-[10px] text-zinc-400">
              Statutory allowance for solo entrepreneurs (€0 trade tax up to €24,500 profit).
            </p>
          </div>

          {/* Small Business VAT Exemption */}
          <div className="p-4 rounded-xl border border-zinc-200/80 bg-zinc-50/50">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-900 flex items-center gap-1.5">
                <Receipt className="w-3.5 h-3.5 text-amber-600" />
                Small Business VAT (§ 19 UStG)
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                Exempt (0% VAT)
              </span>
            </div>

            <div className="mt-3">
              <div className="flex justify-between text-xs text-zinc-500 mb-1">
                <span>Turnover: {formatEur(report.revenueGrossEurCents)}</span>
                <span className="font-mono">Ceiling: {formatEur(tax.vatThresholdEurCents)}</span>
              </div>
              <div className="w-full bg-zinc-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-amber-500 h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(100, Math.round((report.revenueGrossEurCents / tax.vatThresholdEurCents) * 100))}%`,
                  }}
                />
              </div>
            </div>

            <div className="mt-3 text-[11px] text-zinc-600 flex items-center justify-between">
              <span>Turnover cushion left:</span>
              <strong className="font-mono text-zinc-900">
                {formatEur(tax.vatCushionRemainingEurCents)}
              </strong>
            </div>
            <p className="mt-1 text-[10px] text-zinc-400">
              Turnover under €25,000 is legally exempt from charging or remitting German VAT.
            </p>
          </div>
        </div>

        {/* Student Social Security Note */}
        <div className="mt-4 p-3 rounded-xl border border-blue-100 bg-blue-50/50 text-xs text-blue-900 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <strong>Student Social Security & Health Insurance:</strong> {tax.studentStatusNote}
          </div>
        </div>
      </div>

      {/* Stripe Multi-Currency, Settlement & Fee Breakdown */}
      <div className="rounded-2xl border border-zinc-200/90 bg-white p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-zinc-900" />
            <div>
              <h2 className="text-base font-bold text-zinc-900">
                Stripe Multi-Currency, Settlement & Fee Engine
              </h2>
              <p className="text-xs text-zinc-500">
                Full breakdown of card processing fees, multicurrency settlement, billing fees, and currency conversions.
              </p>
            </div>
          </div>
          <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-lg bg-zinc-100 text-zinc-700">
            Live Stripe Sync Active
          </span>
        </div>

        {/* Fee Itemization Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {/* Card Processing Fees */}
          <div className="p-3 rounded-xl border border-zinc-200/70 bg-zinc-50/50">
            <span className="text-[10px] text-zinc-500 font-medium uppercase">Card Fees</span>
            <div className="text-sm font-bold font-mono text-zinc-900 mt-1">
              -{formatEur(report.stripeCardFeesEurCents)}
            </div>
            <span className="text-[10px] text-zinc-400">Processing fees</span>
          </div>

          {/* Dispute Handling Fees */}
          <div className="p-3 rounded-xl border border-amber-100 bg-amber-50/30">
            <span className="text-[10px] text-amber-800 font-medium uppercase">Dispute Fee</span>
            <div className="text-sm font-bold font-mono text-amber-900 mt-1">
              -{formatEur(report.disputeFeesEurCents)}
            </div>
            <span className="text-[10px] text-amber-700/80">€20.00 chargeback fee</span>
          </div>

          {/* Stripe Fee Credits */}
          <div className="p-3 rounded-xl border border-emerald-100 bg-emerald-50/30">
            <span className="text-[10px] text-emerald-800 font-medium uppercase">Fee Credits</span>
            <div className="text-sm font-bold font-mono text-emerald-700 mt-1">
              +{formatEur(report.feeCreditsEurCents)}
            </div>
            <span className="text-[10px] text-emerald-600/80">Stripe reimbursements</span>
          </div>

          {/* Multicurrency Settlement */}
          <div className="p-3 rounded-xl border border-blue-100 bg-blue-50/30">
            <span className="text-[10px] text-blue-700 font-medium uppercase">Settlement</span>
            <div className="text-sm font-bold font-mono text-blue-800 mt-1">
              -{formatEur(forex.multicurrencySettlementFeesEurCents)}
            </div>
            <span className="text-[10px] text-blue-600/80">Multi-currency</span>
          </div>

          {/* Billing Usage Fees */}
          <div className="p-3 rounded-xl border border-purple-100 bg-purple-50/30">
            <span className="text-[10px] text-purple-700 font-medium uppercase">Billing Usage</span>
            <div className="text-sm font-bold font-mono text-purple-800 mt-1">
              -{formatEur(forex.billingUsageFeesEurCents)}
            </div>
            <span className="text-[10px] text-purple-600/80">Subscription fee</span>
          </div>

          {/* Currency Conversion (Forex) */}
          <div className="p-3 rounded-xl border border-zinc-200/70 bg-zinc-50/50">
            <span className="text-[10px] text-zinc-500 font-medium uppercase">Forex (USD/EUR)</span>
            <div className="text-sm font-bold font-mono text-zinc-800 mt-1">
              -{formatEur(forex.forexFeesEurCents)}
            </div>
            <span className="text-[10px] text-zinc-400">Conversion costs</span>
          </div>
        </div>

        {/* Refunds & Disputes Live Audit Log */}
        {(report.stripeBalance.refunds.length > 0 || report.stripeBalance.disputes.length > 0) && (
          <div className="mt-5 border-t border-zinc-100 pt-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-700 mb-3 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
              Live Refunds & Disputes Activity ({report.year})
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-zinc-600">
                <thead className="bg-zinc-50 text-[10px] font-semibold text-zinc-400 uppercase tracking-wider border-b border-zinc-100">
                  <tr>
                    <th className="px-3 py-2">Date</th>
                    <th className="px-3 py-2">Type</th>
                    <th className="px-3 py-2">Description</th>
                    <th className="px-3 py-2 font-mono">Amount Returned</th>
                    <th className="px-3 py-2 font-mono">Dispute Fee</th>
                    <th className="px-3 py-2">Tax Recognition</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {report.stripeBalance.refunds.map((ref) => (
                    <tr key={ref.id} className="hover:bg-zinc-50/60">
                      <td className="px-3 py-2 font-mono text-zinc-500">{ref.dateStr}</td>
                      <td className="px-3 py-2">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-50 text-rose-700 border border-rose-100">
                          Refund
                        </span>
                      </td>
                      <td className="px-3 py-2 text-zinc-700">{ref.description}</td>
                      <td className="px-3 py-2 font-mono font-semibold text-rose-600">-{formatEur(ref.amountEurCents)}</td>
                      <td className="px-3 py-2 font-mono text-zinc-400">€0.00</td>
                      <td className="px-3 py-2 text-[11px] text-zinc-500">Gross Sales Reduction (Revenue Deduction)</td>
                    </tr>
                  ))}
                  {report.stripeBalance.disputes.map((dsp) => (
                    <tr key={dsp.id} className="hover:bg-zinc-50/60">
                      <td className="px-3 py-2 font-mono text-zinc-500">{dsp.dateStr}</td>
                      <td className="px-3 py-2">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                          Chargeback Dispute
                        </span>
                      </td>
                      <td className="px-3 py-2 text-zinc-700">{dsp.description}</td>
                      <td className="px-3 py-2 font-mono font-semibold text-amber-800">-{formatEur(dsp.amountEurCents)}</td>
                      <td className="px-3 py-2 font-mono font-semibold text-rose-600">-{formatEur(dsp.feeEurCents)}</td>
                      <td className="px-3 py-2 text-[11px] text-zinc-500">Deductible Banking & Processing Fee</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Informative Note */}
        <div className="mt-4 text-[11px] text-zinc-500 bg-zinc-50 p-3 rounded-xl border border-zinc-200/60">
          All Stripe fees (<strong>{formatEur(forex.totalPaymentFeesEurCents)}</strong> in total) are booked as deductible operating expenses (banking & processing costs), legally lowering your taxable income before tax calculation.
        </div>
      </div>

      {/* Home Office Deduction Interactive Strip */}
      <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-emerald-600" />
              <h2 className="text-base font-bold text-zinc-900">
                Home Office Deduction (€6.00 / Day · § 4 Abs. 5 EStG)
              </h2>
            </div>
            <p className="mt-1 text-xs text-zinc-500">
              Statutory tax deduction: €6.00 per workday, up to 210 days (€1,260.00/year max). No dedicated study room required.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/bookkeeping/homeoffice"
              className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 transition-colors"
            >
              Open Calendar Tracker
              <ArrowUpRight className="h-3.5 w-3.5 text-zinc-400" />
            </Link>
            <button
              onClick={handleLogHomeofficeToday}
              disabled={loggingHomeoffice || report.homeofficeDaysCount >= homeofficeMaxDays}
              className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-2xs hover:bg-emerald-500 disabled:opacity-50 transition-colors"
            >
              <PlusCircle className="h-4 w-4" />
              {loggingHomeoffice ? "Logging..." : "+ Log Today (€6.00)"}
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-xl border border-zinc-100 bg-zinc-50/50 p-4">
            <div className="text-xs text-zinc-500">Logged Workdays</div>
            <div className="mt-1 text-2xl font-bold font-mono text-zinc-900">
              {report.homeofficeDaysCount} <span className="text-xs text-zinc-400 font-normal">/ {homeofficeMaxDays} Days</span>
            </div>
            <div className="mt-3 w-full bg-zinc-200 rounded-full h-1.5 overflow-hidden">
              <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${homeofficePct}%` }} />
            </div>
          </div>

          <div className="rounded-xl border border-zinc-100 bg-zinc-50/50 p-4">
            <div className="text-xs text-zinc-500">Current Tax Write-Off</div>
            <div className="mt-1 text-2xl font-bold font-mono text-emerald-700">
              {formatEur(report.homeofficeDeductionEurCents)}
            </div>
            <div className="mt-1 text-[11px] text-zinc-400">
              Directly deducted from taxable profit
            </div>
          </div>

          <div className="rounded-xl border border-zinc-100 bg-zinc-50/50 p-4">
            <div className="text-xs text-zinc-500">Remaining Potential</div>
            <div className="mt-1 text-2xl font-bold font-mono text-zinc-700">
              {formatEur(homeofficeMaxCents - report.homeofficeDeductionEurCents)}
            </div>
            <div className="mt-1 text-[11px] text-zinc-400">
              {homeofficeMaxDays - report.homeofficeDaysCount} days available in {report.year}
            </div>
          </div>
        </div>
      </div>

      {/* Quarterly Performance Table */}
      <div className="rounded-2xl border border-zinc-200/80 bg-white overflow-hidden shadow-xs">
        <div className="p-5 border-b border-zinc-100 bg-zinc-50/50 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-zinc-900">Quarterly Performance Breakdown</h3>
            <p className="text-xs text-zinc-500">Revenue, payment fees, operating costs, and net profit by quarter.</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-zinc-600">
            <thead className="bg-zinc-50 text-[11px] font-semibold text-zinc-400 uppercase tracking-wider border-b border-zinc-100">
              <tr>
                <th className="px-5 py-3">Quarter</th>
                <th className="px-5 py-3">Period</th>
                <th className="px-5 py-3 font-mono">Gross Revenue</th>
                <th className="px-5 py-3 font-mono">Payment Fees</th>
                <th className="px-5 py-3 font-mono">Operating Costs</th>
                <th className="px-5 py-3 font-mono">Home Office</th>
                <th className="px-5 py-3 font-mono">Net Profit</th>
                <th className="px-5 py-3">Margin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {report.quarters.map((q) => (
                <tr key={q.quarter} className="hover:bg-zinc-50/60 transition-colors">
                  <td className="px-5 py-3 font-bold text-zinc-900">{q.quarter}</td>
                  <td className="px-5 py-3 text-zinc-500">{q.label}</td>
                  <td className="px-5 py-3 font-mono text-zinc-900 font-semibold">{formatEur(q.revenueGrossEurCents)}</td>
                  <td className="px-5 py-3 font-mono text-rose-600">-{formatEur(q.paymentFeesEurCents)}</td>
                  <td className="px-5 py-3 font-mono text-zinc-700">-{formatEur(q.operatingExpensesEurCents)}</td>
                  <td className="px-5 py-3 font-mono text-emerald-600">-{formatEur(q.homeofficeEurCents)}</td>
                  <td className="px-5 py-3 font-mono font-bold text-emerald-700">{formatEur(q.netProfitEurCents)}</td>
                  <td className="px-5 py-3">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-zinc-100 text-zinc-700">
                      {q.marginPct}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
