"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { type LicenseRecord } from "@/lib/db";
import { convertSaleToEur, formatEur, formatMoneyCustom } from "@/lib/currency";
import { Pagination } from "../../_components/pagination";
import { TierBadge } from "../../_components/pills";
import { formatDate } from "../../_components/format";
import { toast } from "sonner";
import {
  Receipt,
  Search,
  Filter,
  Download,
  ExternalLink,
  Printer,
  X,
  FileText,
  CreditCard,
  Building,
  CheckCircle2,
  Info,
  Globe,
  ArrowUpDown,
  Sparkles,
} from "lucide-react";

export interface SerializedStripeInvoice {
  id: string;
  number: string;
  created: number;
  status: string;
  amount_paid: number;
  currency: string;
  customer_id?: string | null;
  customer_name?: string | null;
  customer_email?: string | null;
  subscription_id?: string | null;
  invoice_pdf?: string | null;
  hosted_invoice_url?: string | null;
}

interface Props {
  licenses: LicenseRecord[];
  stripeInvoices?: SerializedStripeInvoice[];
}

export type TaxCategory =
  | "kleinunternehmer"
  | "eu_reverse_charge"
  | "de_standard_vat"
  | "export_drittland";

export interface InvoiceItem {
  invoiceNumber: string;
  stripeInvoiceId?: string;
  stripeInvoicePdf?: string | null;
  stripeHostedUrl?: string | null;
  isReceipt?: boolean;
  dateStr: string;
  iat: number;
  customerName: string;
  email: string;
  tier: string;
  licenseKey: string;
  stripeSessionId?: string;
  stripeCustomerId?: string;
  originalAmountCents: number;
  originalCurrency: string;
  ecbRateToEur: number;
  ecbUsdPerEur: number;
  grossEurCents: number;
  stripeFeeEurCents: number;
  forexFeeEurCents: number;
  totalFeesEurCents: number;
  netPayoutEurCents: number;
  taxCategory: TaxCategory;
  taxCategoryLabel: string;
  taxNote: string;
  status: "paid" | "refunded" | "disputed";
  revokeReason?: string;
}

export function InvoicesClient({ licenses, stripeInvoices = [] }: Props) {
  const [search, setSearch] = useState<string>("");
  const [taxFilter, setTaxFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [yearFilter, setYearFilter] = useState<string>("all");
  const [docTypeFilter, setDocTypeFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [activeInvoiceModal, setActiveInvoiceModal] = useState<InvoiceItem | null>(null);

  // Process licenses and match with actual Stripe invoices
  const allInvoices: InvoiceItem[] = useMemo(() => {
    // Index stripe invoices by subscription_id, customer_id, and email
    const subMap = new Map<string, SerializedStripeInvoice>();
    const cusMap = new Map<string, SerializedStripeInvoice>();
    const emailMap = new Map<string, SerializedStripeInvoice>();

    if (stripeInvoices) {
      for (const inv of stripeInvoices) {
        if (inv.subscription_id) subMap.set(inv.subscription_id, inv);
        if (inv.customer_id) cusMap.set(inv.customer_id, inv);
        if (inv.customer_email) emailMap.set(inv.customer_email.toLowerCase(), inv);
      }
    }

    const valid = licenses
      .filter((l) => (l.amount_total ?? 0) > 0)
      .sort((a, b) => a.iat - b.iat);

    let receiptCounter = 1;

    return valid.map((lic) => {
      const conv = convertSaleToEur(lic.amount_total ?? 0, lic.currency || "usd", lic.iat);
      const date = new Date(lic.iat * 1000);
      const year = date.getUTCFullYear();

      // Find matching Stripe invoice
      let matchedInv: SerializedStripeInvoice | undefined;
      if (lic.stripe_subscription_id && subMap.has(lic.stripe_subscription_id)) {
        matchedInv = subMap.get(lic.stripe_subscription_id);
      } else if (lic.stripe_customer_id && cusMap.has(lic.stripe_customer_id)) {
        matchedInv = cusMap.get(lic.stripe_customer_id);
      } else if (lic.email && emailMap.has(lic.email.toLowerCase())) {
        matchedInv = emailMap.get(lic.email.toLowerCase());
      }

      let invoiceNumber = "";
      let isReceipt = false;

      if (matchedInv && matchedInv.number) {
        invoiceNumber = matchedInv.number;
      } else {
        isReceipt = true;
        invoiceNumber = `REC-${year}-${String(receiptCounter++).padStart(3, "0")}`;
      }

      // Determine Tax Category based on country / domain
      const email = (lic.email || "").toLowerCase();
      let taxCategory: TaxCategory = "kleinunternehmer";
      let taxCategoryLabel = "Small Business (§ 19 UStG)";
      let taxNote =
        "Small Business Exemption: According to Section 19 of the German Value Added Tax Act (UStG), no VAT is charged.";

      if (email.endsWith(".de")) {
        taxCategory = "kleinunternehmer";
        taxCategoryLabel = "Domestic DE (§ 19 UStG)";
      } else if (
        email.endsWith(".fr") ||
        email.endsWith(".es") ||
        email.endsWith(".it") ||
        email.endsWith(".nl") ||
        email.endsWith(".at") ||
        email.endsWith(".be") ||
        email.endsWith(".eu")
      ) {
        taxCategory = "eu_reverse_charge";
        taxCategoryLabel = "EU B2B Reverse-Charge";
        taxNote =
          "Reverse-Charge Mechanism: Under Article 196 of the EU VAT Directive (Section 13b German UStG), the recipient is liable for VAT.";
      } else {
        taxCategory = "export_drittland";
        taxCategoryLabel = "Export (Third Country)";
        taxNote =
          "Export / Out-of-Scope: Non-EU supply exempt from domestic VAT (steuerfreie Ausfuhrlieferung / nicht steuerbar).";
      }

      return {
        invoiceNumber,
        stripeInvoiceId: matchedInv?.id,
        stripeInvoicePdf: matchedInv?.invoice_pdf,
        stripeHostedUrl: matchedInv?.hosted_invoice_url,
        isReceipt,
        dateStr: conv.dateStr,
        iat: lic.iat,
        customerName: lic.customer_name || lic.email.split("@")[0],
        email: lic.email,
        tier: lic.tier,
        licenseKey: lic.key,
        stripeSessionId: lic.stripe_session_id,
        stripeCustomerId: lic.stripe_customer_id,
        originalAmountCents: conv.originalAmountCents,
        originalCurrency: conv.originalCurrency,
        ecbRateToEur: conv.eurRate,
        ecbUsdPerEur: conv.ecbUsdPerEurRate,
        grossEurCents: conv.grossEurCents,
        stripeFeeEurCents: conv.stripeFeeEurCents,
        forexFeeEurCents: conv.forexFeeEurCents,
        totalFeesEurCents: conv.totalFeesEurCents,
        netPayoutEurCents: conv.netPayoutEurCents,
        taxCategory,
        taxCategoryLabel,
        taxNote,
        status: (lic.revoked
          ? (lic.revoke_reason === "dispute" ? "disputed" : "refunded")
          : "paid") as "paid" | "refunded" | "disputed",
        revokeReason: lic.revoke_reason,
      };
    }).reverse(); // Show latest first in UI table
  }, [licenses, stripeInvoices]);

  // Filter invoices
  const filteredInvoices = useMemo(() => {
    return allInvoices.filter((inv) => {
      if (search.trim()) {
        const q = search.toLowerCase();
        const matches =
          inv.customerName.toLowerCase().includes(q) ||
          inv.email.toLowerCase().includes(q) ||
          inv.invoiceNumber.toLowerCase().includes(q) ||
          (inv.stripeSessionId && inv.stripeSessionId.toLowerCase().includes(q));
        if (!matches) return false;
      }

      if (yearFilter !== "all") {
        if (!inv.dateStr.startsWith(yearFilter)) return false;
      }

      if (taxFilter !== "all") {
        if (inv.taxCategory !== taxFilter) return false;
      }

      if (statusFilter !== "all") {
        if (inv.status !== statusFilter) return false;
      }

      if (docTypeFilter !== "all") {
        if (docTypeFilter === "invoices" && inv.isReceipt) return false;
        if (docTypeFilter === "receipts" && !inv.isReceipt) return false;
      }

      return true;
    });
  }, [allInvoices, search, yearFilter, taxFilter, statusFilter, docTypeFilter]);

  // Paginate 15 items per page
  const PAGE_SIZE = 15;
  const paginatedInvoices = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredInvoices.slice(start, start + PAGE_SIZE);
  }, [filteredInvoices, currentPage]);

  // Aggregate stats across all filtered invoices
  const stats = useMemo(() => {
    let grossEur = 0;
    let totalFeesEur = 0;
    let netPayoutEur = 0;

    for (const inv of filteredInvoices) {
      grossEur += inv.grossEurCents;
      totalFeesEur += inv.totalFeesEurCents;
      netPayoutEur += inv.netPayoutEurCents;
    }

    return {
      count: filteredInvoices.length,
      grossEur,
      totalFeesEur,
      netPayoutEur,
      avgGrossEur: filteredInvoices.length > 0 ? Math.round(grossEur / filteredInvoices.length) : 0,
    };
  }, [filteredInvoices]);

  // Export CSV for German Tax Advisor (DATEV Format with English headers)
  const handleExportDatevCsv = () => {
    const headers = [
      "Invoice_Number",
      "Date",
      "Customer_Name",
      "Customer_Email",
      "Gross_EUR",
      "Original_Amount",
      "Original_Currency",
      "ECB_Rate_USD_Per_EUR",
      "Stripe_Fee_EUR",
      "Forex_Fee_EUR",
      "Net_Payout_EUR",
      "Tax_Classification",
      "Tax_Legal_Note",
      "Stripe_Session_ID",
    ];

    const rows = filteredInvoices.map((inv) => [
      inv.invoiceNumber,
      inv.dateStr,
      `"${inv.customerName.replaceAll('"', '""')}"`,
      inv.email,
      (inv.grossEurCents / 100).toFixed(2),
      (inv.originalAmountCents / 100).toFixed(2),
      inv.originalCurrency,
      inv.ecbUsdPerEur.toFixed(4),
      (inv.stripeFeeEurCents / 100).toFixed(2),
      (inv.forexFeeEurCents / 100).toFixed(2),
      (inv.netPayoutEurCents / 100).toFixed(2),
      inv.taxCategory,
      `"${inv.taxNote.replaceAll('"', '""')}"`,
      inv.stripeSessionId || "",
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `invoices_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Invoices CSV exported successfully");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/60">
              <Receipt className="w-3.5 h-3.5" />
              Section 14 & 14b UStG Compliant
            </span>
            <span className="text-xs text-zinc-400">•</span>
            <span className="text-xs font-mono text-zinc-500">GoBD 10-Year Record Archive</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 mt-1">
            Customer Invoices & Receipts Hub
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Tax-compliant customer invoice ledger, date-of-sale ECB conversions, VAT classifications, and 1-click printable PDF invoices.
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={handleExportDatevCsv}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700 shadow-xs transition-colors"
          >
            <Download className="w-3.5 h-3.5" /> Export Invoices CSV
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Invoices */}
        <div className="p-4 rounded-xl border border-zinc-200/80 bg-white shadow-xs">
          <span className="text-xs font-medium text-zinc-500">Invoices & Receipts</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-zinc-900">{stats.count}</span>
            <span className="text-xs text-zinc-400">issued orders</span>
          </div>
          <p className="mt-2 text-[11px] text-zinc-500">
            Sequential numbering for tax compliance
          </p>
        </div>

        {/* Gross Revenue in EUR */}
        <div className="p-4 rounded-xl border border-zinc-200/80 bg-white shadow-xs">
          <span className="text-xs font-medium text-zinc-500">Gross Revenue (EUR)</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-zinc-900">
              {formatEur(stats.grossEur)}
            </span>
          </div>
          <p className="mt-2 text-[11px] text-zinc-500">
            Converted at exact daily ECB rate
          </p>
        </div>

        {/* Payment & Forex Fees */}
        <div className="p-4 rounded-xl border border-rose-200/70 bg-gradient-to-br from-rose-50/40 to-white shadow-xs">
          <span className="text-xs font-medium text-rose-800">Deductible Stripe & FX Fees</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-rose-700">
              -{formatEur(stats.totalFeesEur)}
            </span>
          </div>
          <p className="mt-2 text-[11px] text-zinc-500">
            Card fees + Settlement + Forex
          </p>
        </div>

        {/* Net Bank Payout */}
        <div className="p-4 rounded-xl border border-emerald-200/70 bg-gradient-to-br from-emerald-50/50 to-white shadow-xs">
          <span className="text-xs font-medium text-emerald-800">Net Received to Bank</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-emerald-700">
              {formatEur(stats.netPayoutEur)}
            </span>
          </div>
          <p className="mt-2 text-[11px] text-zinc-500">
            Average sale: {formatEur(stats.avgGrossEur)}
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-xl border border-zinc-200/80 bg-white shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by customer name, email, invoice #, or session..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-4 py-1.5 text-xs bg-zinc-50 border border-zinc-200 rounded-lg text-zinc-800 focus:outline-hidden focus:bg-white focus:ring-2 focus:ring-zinc-900/10"
            />
          </div>

          {/* Filter Dropdowns */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Year */}
            <select
              value={yearFilter}
              onChange={(e) => {
                setYearFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-2.5 py-1.5 text-xs bg-white border border-zinc-200 rounded-lg text-zinc-700 focus:outline-hidden"
            >
              <option value="all">All Years</option>
              <option value="2026">2026</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
            </select>

            {/* Payment & Refund Status */}
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-2.5 py-1.5 text-xs bg-white border border-zinc-200 rounded-lg text-zinc-700 focus:outline-hidden"
            >
              <option value="all">All Statuses</option>
              <option value="paid">Paid & Active</option>
              <option value="refunded">Refunded (Returned)</option>
              <option value="disputed">Disputed / Chargeback</option>
            </select>

            {/* Document Type */}
            <select
              value={docTypeFilter}
              onChange={(e) => {
                setDocTypeFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-2.5 py-1.5 text-xs bg-white border border-zinc-200 rounded-lg text-zinc-700 focus:outline-hidden"
            >
              <option value="all">All Document Types</option>
              <option value="invoices">Invoices (Stripe)</option>
              <option value="receipts">Payment Receipts</option>
            </select>

            {/* Tax Category */}
            <select
              value={taxFilter}
              onChange={(e) => {
                setTaxFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-2.5 py-1.5 text-xs bg-white border border-zinc-200 rounded-lg text-zinc-700 focus:outline-hidden"
            >
              <option value="all">All Tax Categories</option>
              <option value="kleinunternehmer">Small Business § 19 UStG (0% VAT)</option>
              <option value="eu_reverse_charge">EU B2B Reverse-Charge</option>
              <option value="export_drittland">Export (Third Country 0%)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="rounded-xl border border-zinc-200/80 bg-white overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-zinc-600">
            <thead className="bg-zinc-50/80 text-[11px] font-semibold text-zinc-400 uppercase tracking-wider border-b border-zinc-100">
              <tr>
                <th className="px-5 py-3">Invoice # & Date</th>
                <th className="px-5 py-3">Customer</th>
                <th className="px-5 py-3">Plan Tier</th>
                <th className="px-5 py-3">Original Paid</th>
                <th className="px-5 py-3">Gross (EUR)</th>
                <th className="px-5 py-3">Fees & FX</th>
                <th className="px-5 py-3">Net Payout</th>
                <th className="px-5 py-3">VAT Status</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {paginatedInvoices.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-5 py-8 text-center text-zinc-400 text-xs">
                    No customer invoices matching the selected filters.
                  </td>
                </tr>
              ) : (
                paginatedInvoices.map((inv) => (
                  <tr key={inv.invoiceNumber} className="hover:bg-zinc-50/60 transition-colors">
                    {/* Invoice # & Date */}
                    <td className="px-5 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-zinc-900">{inv.invoiceNumber}</span>
                        {inv.isReceipt && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-purple-50 text-purple-700 border border-purple-200/60">
                            Receipt
                          </span>
                        )}
                        {inv.status === "paid" && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                            Paid
                          </span>
                        )}
                        {inv.status === "refunded" && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-rose-50 text-rose-700 border border-rose-200/60">
                            Refunded
                          </span>
                        )}
                        {inv.status === "disputed" && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-amber-50 text-amber-800 border border-amber-200/60">
                            Disputed
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-zinc-400">{inv.dateStr}</div>
                    </td>

                    {/* Customer */}
                    <td className="px-5 py-3">
                      <div className="font-medium text-zinc-900">{inv.customerName}</div>
                      <div className="text-[11px] text-zinc-400 truncate max-w-[180px]">{inv.email}</div>
                    </td>

                    {/* Tier */}
                    <td className="px-5 py-3 whitespace-nowrap">
                      <TierBadge tier={inv.tier} />
                    </td>

                    {/* Original Paid */}
                    <td className="px-5 py-3 font-mono text-zinc-600 whitespace-nowrap">
                      {formatMoneyCustom(inv.originalAmountCents, inv.originalCurrency)}
                      <div className="text-[10px] text-zinc-400">
                        1€ = {inv.ecbUsdPerEur.toFixed(3)} {inv.originalCurrency}
                      </div>
                    </td>

                    {/* Converted Gross in EUR */}
                    <td className="px-5 py-3 font-mono font-bold text-zinc-950 whitespace-nowrap">
                      {formatEur(inv.grossEurCents)}
                    </td>

                    {/* Deductible Fees */}
                    <td className="px-5 py-3 font-mono text-rose-600 whitespace-nowrap">
                      -{formatEur(inv.totalFeesEurCents)}
                      <div className="text-[10px] text-zinc-400">
                        Card: {formatEur(inv.stripeFeeEurCents)} | FX: {formatEur(inv.forexFeeEurCents)}
                      </div>
                    </td>

                    {/* Net Payout */}
                    <td className="px-5 py-3 font-mono font-semibold text-emerald-700 whitespace-nowrap">
                      {formatEur(inv.netPayoutEurCents)}
                    </td>

                    {/* VAT Category */}
                    <td className="px-5 py-3 whitespace-nowrap">
                      {inv.taxCategory === "kleinunternehmer" && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-zinc-100 text-zinc-700 border border-zinc-200">
                          § 19 UStG (0%)
                        </span>
                      )}
                      {inv.taxCategory === "eu_reverse_charge" && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-blue-50 text-blue-700 border border-blue-200/60">
                          EU Reverse-Charge
                        </span>
                      )}
                      {inv.taxCategory === "export_drittland" && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-50 text-amber-700 border border-amber-200/60">
                          Export (0%)
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-3 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setActiveInvoiceModal(inv)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700 transition-colors shadow-2xs"
                        >
                          <FileText className="w-3 h-3 text-zinc-400" />
                          {inv.isReceipt ? "View Receipt" : "View Invoice"}
                        </button>

                        {inv.stripeInvoicePdf && (
                          <a
                            href={inv.stripeInvoicePdf}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-md border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-600 hover:text-zinc-900 transition-colors shadow-2xs"
                            title="Download official Stripe PDF"
                          >
                            <Download className="w-3 h-3 text-zinc-400" />
                            PDF
                          </a>
                        )}

                        {inv.stripeSessionId && (
                          <a
                            href={`https://dashboard.stripe.com/payments/${inv.stripeSessionId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 text-zinc-400 hover:text-blue-600 transition-colors"
                            title="Open in Stripe Dashboard"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* 15-Item Pagination */}
        <Pagination
          totalItems={filteredInvoices.length}
          pageSize={PAGE_SIZE}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Explainer Box in Clean English */}
      <div className="p-4 rounded-xl border border-blue-200/70 bg-blue-50/40 text-xs text-blue-900 flex items-start gap-3">
        <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <h4 className="font-semibold text-blue-950">
            Why Invoices & Receipts Are Legally Required in Germany (§ 14 & § 14b UStG)
          </h4>
          <p className="mt-1 text-blue-800 leading-relaxed text-[11px]">
            In Germany, businesses (including solo software developers and student entrepreneurs) must comply with the <strong>10-year statutory retention rule</strong> (<em>Section 14b UStG and GoBD principles</em>). Even when exempt from VAT under Section 19 UStG, every transaction record must state: sequential invoice number, date of issue, date of service, customer information, amount received, and the applicable statutory tax exemption note. B2B customers also require these invoices to deduct their software license purchase. You can click &quot;View Invoice&quot; on any order to download or print the official document.
          </p>
        </div>
      </div>

      {/* Official Tax Invoice & Payment Receipt Modal (Clean English) */}
      {activeInvoiceModal && (
        <div className="invoice-modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <style dangerouslySetInnerHTML={{ __html: `
            @media print {
              @page {
                size: A4 portrait;
                margin: 8mm 12mm;
              }
              html, body {
                background: #ffffff !important;
                color: #09090b !important;
                height: auto !important;
                overflow: visible !important;
                margin: 0 !important;
                padding: 0 !important;
              }
              /* Hide all page content except the printable invoice sheet */
              body * {
                visibility: hidden !important;
              }
              #printable-invoice-sheet,
              #printable-invoice-sheet * {
                visibility: visible !important;
              }
              #printable-invoice-sheet {
                position: absolute !important;
                left: 0 !important;
                top: 0 !important;
                width: 100% !important;
                max-width: 100% !important;
                margin: 0 !important;
                padding: 0 !important;
                border: none !important;
                box-shadow: none !important;
                border-radius: 0 !important;
                background: #ffffff !important;
                color: #09090b !important;
                page-break-after: avoid !important;
                page-break-inside: avoid !important;
                break-inside: avoid !important;
              }
              .no-print,
              .invoice-modal-overlay,
              .invoice-modal-card {
                position: static !important;
                background: transparent !important;
                backdrop-filter: none !important;
                box-shadow: none !important;
                border: none !important;
                padding: 0 !important;
                margin: 0 !important;
                max-height: none !important;
                overflow: visible !important;
                display: block !important;
              }
              .no-print {
                display: none !important;
              }
            }
          ` }} />

          <div className="invoice-modal-card bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-zinc-200 overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header Toolbar (Hidden on Print) */}
            <div className="no-print px-6 py-4 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/50">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-zinc-600" />
                <h3 className="text-sm font-semibold text-zinc-900">
                  {activeInvoiceModal.isReceipt
                    ? "Payment Receipt & Tax Record (§ 14 UStG)"
                    : "Tax Invoice & Payment Receipt (§ 14 UStG)"}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                {activeInvoiceModal.stripeInvoicePdf && (
                  <a
                    href={activeInvoiceModal.stripeInvoicePdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-700 bg-white border border-zinc-200 hover:bg-zinc-50 rounded-lg transition-colors shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5 text-zinc-500" /> Stripe PDF
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg transition-colors shadow-xs"
                >
                  <Printer className="w-3.5 h-3.5" /> Print / Save PDF
                </button>
                <button
                  type="button"
                  onClick={() => setActiveInvoiceModal(null)}
                  className="p-1 text-zinc-400 hover:text-zinc-600 rounded-lg hover:bg-zinc-100 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Printable Invoice Document Body (Target of Print) */}
            <div
              id="printable-invoice-sheet"
              className="p-8 sm:p-9 overflow-y-auto space-y-5 text-zinc-800 text-xs bg-white"
            >
              {/* Top Seller & Buyer Two-Column */}
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-bold tracking-tight text-zinc-950">phpinfo() WP Pro</h2>
                  <div className="text-zinc-600 mt-1.5 space-y-0.5 text-xs">
                    <p className="font-medium text-zinc-800">Brüderstraße 48</p>
                    <p>59494 Soest</p>
                    <p>Germany</p>
                    <p className="font-mono text-zinc-700">+49 175 5075508</p>
                    <p className="text-zinc-500 pt-0.5">support@exeebit.com</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold font-mono tracking-tight text-zinc-950">
                    {activeInvoiceModal.isReceipt ? "PAYMENT RECEIPT" : "INVOICE & RECEIPT"}
                  </div>
                  <div className="text-xs font-mono text-zinc-500 mt-1">
                    No.: <strong className="text-zinc-900">{activeInvoiceModal.invoiceNumber}</strong>
                  </div>
                  <div className="text-xs text-zinc-500 mt-0.5">
                    Date: <span className="font-mono text-zinc-800">{activeInvoiceModal.dateStr}</span>
                  </div>
                  <div className="text-xs text-zinc-500">
                    Service Date: <span className="font-mono text-zinc-800">{activeInvoiceModal.dateStr}</span>
                  </div>
                </div>
              </div>

              {/* Customer Box */}
              <div className="p-3.5 rounded-xl border border-zinc-200 bg-zinc-50/60">
                <div className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
                  Billed To / Customer
                </div>
                <div className="mt-1 font-semibold text-zinc-900">{activeInvoiceModal.customerName}</div>
                <div className="text-zinc-600 font-mono text-[11px]">{activeInvoiceModal.email}</div>
                {activeInvoiceModal.stripeCustomerId && (
                  <div className="text-[10px] font-mono text-zinc-400 mt-0.5">
                    Stripe Customer ID: {activeInvoiceModal.stripeCustomerId}
                  </div>
                )}
                {activeInvoiceModal.stripeInvoiceId && (
                  <div className="text-[10px] font-mono text-zinc-400 mt-0.5">
                    Stripe Invoice ID: {activeInvoiceModal.stripeInvoiceId}
                  </div>
                )}
              </div>

              {/* Line Items Table */}
              <div className="border border-zinc-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-zinc-100/80 text-zinc-600 font-semibold border-b border-zinc-200 text-[11px]">
                    <tr>
                      <th className="px-4 py-2.5">Item</th>
                      <th className="px-4 py-2.5">Description</th>
                      <th className="px-4 py-2.5 text-center">Qty</th>
                      <th className="px-4 py-2.5 text-right">Unit Price</th>
                      <th className="px-4 py-2.5 text-right">Total (EUR)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    <tr>
                      <td className="px-4 py-3 font-mono text-zinc-400">01</td>
                      <td className="px-4 py-3">
                        <div className="font-semibold text-zinc-900">
                          phpinfo() WP Pro License ({activeInvoiceModal.tier.toUpperCase()})
                        </div>
                        <div className="text-[11px] text-zinc-500 mt-0.5">
                          WordPress Plugin Updates & Feature Access. Key:{" "}
                          <span className="font-mono text-[10px] text-zinc-600">
                            {activeInvoiceModal.licenseKey.slice(0, 24)}...
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center font-mono">1</td>
                      <td className="px-4 py-3 text-right font-mono text-zinc-800">
                        {formatEur(activeInvoiceModal.grossEurCents)}
                      </td>
                      <td className="px-4 py-3 text-right font-mono font-bold text-zinc-950">
                        {formatEur(activeInvoiceModal.grossEurCents)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Totals & Tax Calculation Breakdown */}
              <div className="flex justify-end">
                <div className="w-64 space-y-1 text-xs">
                  <div className="flex justify-between text-zinc-600">
                    <span>Net Amount:</span>
                    <span className="font-mono font-medium text-zinc-800">{formatEur(activeInvoiceModal.grossEurCents)}</span>
                  </div>
                  <div className="flex justify-between text-zinc-600">
                    <span>VAT (0%):</span>
                    <span className="font-mono font-medium text-zinc-800">€0.00</span>
                  </div>
                  <div className="flex justify-between pt-1.5 border-t border-zinc-200 text-sm font-bold text-zinc-950">
                    <span>Total Amount (EUR):</span>
                    <span className="font-mono">{formatEur(activeInvoiceModal.grossEurCents)}</span>
                  </div>
                </div>
              </div>

              {/* Payment Confirmation Badge */}
              <div className="p-3 rounded-xl border border-emerald-200 bg-emerald-50/40 text-[11px] text-emerald-900 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    <strong>Paid in full</strong> via Stripe Checkout.
                  </span>
                </div>
                {activeInvoiceModal.stripeSessionId && (
                  <span className="font-mono text-[10px] text-emerald-700 truncate max-w-[220px]">
                    Ref: {activeInvoiceModal.stripeSessionId}
                  </span>
                )}
              </div>

              {/* Foreign Currency Conversion Note if applicable */}
              {activeInvoiceModal.originalCurrency !== "EUR" && (
                <div className="text-[11px] text-zinc-500 px-0.5">
                  Transaction processed in foreign currency:{" "}
                  <strong>
                    {formatMoneyCustom(activeInvoiceModal.originalAmountCents, activeInvoiceModal.originalCurrency)}
                  </strong>
                  . Converted to EUR using official ECB reference exchange rate on {activeInvoiceModal.dateStr} (1 EUR ={" "}
                  {activeInvoiceModal.ecbUsdPerEur.toFixed(4)} {activeInvoiceModal.originalCurrency}).
                </div>
              )}

              {/* Memo Note (from user specifications) */}
              <div className="p-3 rounded-xl border border-zinc-200 bg-zinc-50/70 text-xs text-zinc-700 leading-relaxed">
                <div className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                  Memo
                </div>
                <p>
                  Thank you for purchasing phpinfo() WP Pro.<br />
                  We&apos;ve sent your digital license key and download link to your email address. For product documentation, updates, and priority developer support, visit https://exeebit.com or contact support@exeebit.com.
                </p>
              </div>

              {/* Footer Statutory Text (from user specifications) */}
              <div className="pt-3 border-t border-zinc-200 text-center text-xs text-zinc-600 space-y-0.5">
                <p className="font-semibold text-zinc-800">
                  Tax-exempt small enterprise (§ 19 UStG)
                </p>
                <p className="text-zinc-600">
                  Operated by Exeebit · Emran Hossain Sagor
                </p>
                <p className="text-[11px] text-zinc-400">
                  Brüderstraße 48 · 59494 Soest · Germany · +49 175 5075508 · support@exeebit.com
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}