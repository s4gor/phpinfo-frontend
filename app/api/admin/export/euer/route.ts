import { NextResponse } from "next/server";
import { getAdminFromCookies } from "@/lib/admin-auth";
import { computeEuerReport } from "@/lib/bookkeeping";

export const dynamic = "force-dynamic";

function escapeCsv(val: unknown): string {
  if (val === null || val === undefined) return "";
  const str = String(val);
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return '"' + str.replace(/"/g, '""') + '"';
  }
  return str;
}

export async function GET(req: Request) {
  const admin = await getAdminFromCookies();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const year = parseInt(searchParams.get("year") || "", 10) || new Date().getFullYear();

  const report = await computeEuerReport(year);
  const tax = report.germanTax;
  const forex = report.forex;

  const lines: string[] = [
    `# Income Statement (EÜR - Section 4 (3) German Income Tax Act EStG) - Tax Year ${year}`,
    `# Business: Exeebit - Software Engineering & Digital Products (Germany)`,
    `# Owner: Emran Hossain Sagor (Solo Software Developer / Student)`,
    "",
    "Category,Description,Amount (EUR),Legal Basis / Reference",
    `Gross Sales Inflow,Gross Stripe Customer Charges,${(report.grossChargesEurCents / 100).toFixed(2)},Gross inflows before returns (Bruttoprinzip)`,
    `Revenue Deductions,Customer Refunds (2 transactions),-${(report.refundsEurCents / 100).toFixed(2)},Erlösschmälerungen (§ 4 (3) EStG)`,
    `Revenue Deductions,Dispute Chargeback Withdrawals (1 dispute),-${(report.disputeWithdrawalsEurCents / 100).toFixed(2)},Lastschriftrückgaben / Ausfälle`,
    `RECONCILED NET REVENUE,Net Taxable Turnover (Umsatzerlöse),${(report.revenueGrossEurCents / 100).toFixed(2)},Line 11 / 14 Form EÜR`,
    `Operating Expenses,Recurring & One-off Software/Tools,${(report.operatingExpensesEurCents / 100).toFixed(2)},Section 4 (4) EStG`,
    `Operating Expenses,Stripe Card Processing Fees,${(report.stripeCardFeesEurCents / 100).toFixed(2)},Geldverkehrskosten`,
    `Operating Expenses,Stripe Dispute Handling Fees,${(report.disputeFeesEurCents / 100).toFixed(2)},Geldverkehrskosten (Dispute fee)`,
    `Operating Expenses,Stripe Fee Credits (Reimbursements),-${(report.feeCreditsEurCents / 100).toFixed(2)},Credit adjustments`,
    `Operating Expenses,Stripe Multicurrency Settlement Fees,${(report.multicurrencySettlementFeesEurCents / 100).toFixed(2)},Banking & payment fees`,
    `Operating Expenses,Stripe Billing & Usage Fees,${(report.billingUsageFeesEurCents / 100).toFixed(2)},Banking & payment fees`,
    `Operating Expenses,Stripe Currency Conversion (Forex) Fees,${(report.stripeForexFeesEurCents / 100).toFixed(2)},Banking & payment fees`,
    `Operating Expenses,Home Office Deduction (${report.homeofficeDaysCount} workdays),${(report.homeofficeDeductionEurCents / 100).toFixed(2)},Section 4 (5) No. 6c EStG (max 1260 EUR)`,
    `TOTAL EXPENSES,Total Deductible Operating Costs,${(report.totalExpensesEurCents / 100).toFixed(2)},`,
    `NET PROFIT,Net Taxable Profit (Tax Return Form EÜR Line 25),${(report.netProfitEurCents / 100).toFixed(2)},`,
    "",
    "--- GERMAN TAX EXEMPTIONS (SOLO DEVELOPER / STUDENT) ---",
    `Personal Tax-Free Allowance (Grundfreibetrag § 32a EStG),Statutory Basic Allowance,${(tax.grundfreibetragEurCents / 100).toFixed(2)},${tax.isBelowGrundfreibetrag ? "PROFIT IS 100% TAX-FREE (0.00 EUR Income Tax Due)" : "Taxable profit above allowance"}`,
    `Trade Tax Allowance (Gewerbesteuer-Freibetrag § 11 GewStG),Statutory Solo Entrepreneur Allowance,${(tax.gewerbesteuerFreibetragEurCents / 100).toFixed(2)},PROFIT IS 100% TAX-FREE (0.00 EUR Trade Tax Due)`,
    `Small Business VAT Status (§ 19 UStG),Turnover under 25000 EUR threshold,${(report.revenueGrossEurCents / 100).toFixed(2)},Exempt from charging or remitting German VAT`,
    `Actual Bank Payouts,Total Transferred to German Bank Account,${(forex.totalActualPayoutsEurCents / 100).toFixed(2)},Stripe Payouts`,
    "",
    "--- ITEMIZATION OF OPERATING EXPENSES ---",
    "Date,Category,Vendor,Description,Deductible %,Amount (EUR)",
  ];

  for (const exp of report.expenses) {
    const amt = (exp.amountCents / 100).toFixed(2);
    lines.push([
      escapeCsv(exp.date),
      escapeCsv(exp.category),
      escapeCsv(exp.vendor),
      escapeCsv(exp.description),
      escapeCsv(exp.taxDeductiblePct ?? 100),
      escapeCsv(amt),
    ].join(","));
  }

  return new NextResponse(lines.join("\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="EUER-Exeebit-${year}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
