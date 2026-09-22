import {
  getAllLicenses,
  getAllExpenses,
  getHomeofficeDays,
  type ExpenseRecord,
  type ExpenseCategory,
  type LicenseRecord,
} from "./db";
import { convertSaleToEur, convertExpenseToEur, formatEur } from "./currency";
import { computeGermanTaxReport, type GermanTaxReport } from "./german-tax";
import { getStripeFeeSummary, type StripeBalanceSummary } from "./stripe-fees";

export interface QuarterSummary {
  quarter: string; // "Q1", "Q2", "Q3", "Q4"
  label: string; // "Jan – Mar"
  revenueGrossEurCents: number;
  paymentFeesEurCents: number;
  operatingExpensesEurCents: number;
  homeofficeEurCents: number;
  totalExpensesEurCents: number;
  netProfitEurCents: number;
  marginPct: number;
}

export interface CategorySummary {
  category: ExpenseCategory;
  label: string;
  amountCents: number;
  pct: number;
}

export interface ForexSummary {
  originalCurrency: string;
  originalGrossCents: number;
  convertedGrossEurCents: number;
  stripeCardFeesEurCents: number;
  disputeFeesEurCents: number;
  feeCreditsEurCents: number;
  multicurrencySettlementFeesEurCents: number;
  billingUsageFeesEurCents: number;
  forexFeesEurCents: number;
  totalPaymentFeesEurCents: number;
  netBankPayoutEurCents: number;
  totalActualPayoutsEurCents: number;
}

export interface EuerReport {
  year: number;
  // Reconciled Revenue Inflow
  grossChargesEurCents: number;
  refundsEurCents: number;
  disputeWithdrawalsEurCents: number;
  revenueGrossEurCents: number; // Net Turnover for tax purposes
  operatingExpensesEurCents: number;
  homeofficeDaysCount: number;
  homeofficeDeductionEurCents: number;
  stripeCardFeesEurCents: number;
  disputeFeesEurCents: number;
  feeCreditsEurCents: number;
  multicurrencySettlementFeesEurCents: number;
  billingUsageFeesEurCents: number;
  stripeForexFeesEurCents: number;
  totalPaymentFeesEurCents: number;
  totalExpensesEurCents: number;
  netProfitEurCents: number;
  profitMarginPct: number;

  // Tax & Student Report
  germanTax: GermanTaxReport;
  forex: ForexSummary;

  quarters: QuarterSummary[];
  categoryBreakdown: CategorySummary[];
  expenses: ExpenseRecord[];
  yearLicenses: LicenseRecord[];
  stripeBalance: StripeBalanceSummary;
}

export const CATEGORY_LABELS: Record<ExpenseCategory, string> = {
  software_cloud: "Software & Cloud Services",
  hardware_equipment: "Hardware & Equipment",
  homeoffice: "Home Office Deduction (€6/day)",
  telecom_internet: "Telecommunications & Internet (50% Business)",
  travel_transit: "Travel & Transit (Deutschlandticket)",
  payment_fees: "Stripe Card, Settlement & Billing Fees",
  marketing_domains: "Domains & Marketing",
  legal_consulting: "Legal, Tax & Consulting",
  other: "Miscellaneous Operating Costs",
};

export async function computeEuerReport(
  targetYear?: number,
  vatMode: "kleinunternehmer" | "standard_vat" = "kleinunternehmer"
): Promise<EuerReport> {
  const currentYear = targetYear || new Date().getFullYear();
  const [allLicenses, allExpenses, homeofficeDays, stripeBalance] = await Promise.all([
    getAllLicenses(),
    getAllExpenses(),
    getHomeofficeDays(currentYear),
    getStripeFeeSummary(currentYear),
  ]);

  const yearStart = Math.floor(new Date(`${currentYear}-01-01T00:00:00Z`).getTime() / 1000);
  const yearEnd = Math.floor(new Date(`${currentYear}-12-31T23:59:59Z`).getTime() / 1000);

  // Filter licenses for current tax year
  const yearLicenses = allLicenses.filter(
    (lic) => lic.iat >= yearStart && lic.iat <= yearEnd && !lic.revoked
  );

  let revenueGrossEurCents = 0;
  let calculatedCardFeesEurCents = 0;
  let calculatedForexFeesEurCents = 0;
  let originalUsdGrossCents = 0;

  // Initialize quarters (all in EUR)
  const quartersMap: Record<
    number,
    { revenueEur: number; cardFeesEur: number; forexFeesEur: number; expensesEur: number; homeofficeEur: number }
  > = {
    1: { revenueEur: 0, cardFeesEur: 0, forexFeesEur: 0, expensesEur: 0, homeofficeEur: 0 },
    2: { revenueEur: 0, cardFeesEur: 0, forexFeesEur: 0, expensesEur: 0, homeofficeEur: 0 },
    3: { revenueEur: 0, cardFeesEur: 0, forexFeesEur: 0, expensesEur: 0, homeofficeEur: 0 },
    4: { revenueEur: 0, cardFeesEur: 0, forexFeesEur: 0, expensesEur: 0, homeofficeEur: 0 },
  };

  for (const lic of yearLicenses) {
    const rawAmt = lic.amount_total ?? 0;
    const curr = lic.currency || "usd";

    // Convert to EUR at exact date-of-sale ECB rate
    const conv = convertSaleToEur(rawAmt, curr, lic.iat);

    revenueGrossEurCents += conv.grossEurCents;
    calculatedCardFeesEurCents += conv.stripeFeeEurCents;
    calculatedForexFeesEurCents += conv.forexFeeEurCents;
    originalUsdGrossCents += conv.originalAmountCents;

    const month = new Date(lic.iat * 1000).getUTCMonth(); // 0 to 11
    const qNum = Math.floor(month / 3) + 1;
    quartersMap[qNum].revenueEur += conv.grossEurCents;
    quartersMap[qNum].cardFeesEur += conv.stripeFeeEurCents;
    quartersMap[qNum].forexFeesEur += conv.forexFeeEurCents;
  }

  // Ground-Truth Financial Reconciliation from Stripe Balance Transactions
  const grossChargesEurCents =
    stripeBalance.grossChargesEurCents > 0
      ? stripeBalance.grossChargesEurCents
      : revenueGrossEurCents;

  const refundsEurCents = stripeBalance.refundsEurCents;
  const disputeWithdrawalsEurCents = stripeBalance.disputeWithdrawalsEurCents;

  // Under German EÜR (§ 4 Abs. 3 EStG), Net Operating Revenue is Gross Inflow minus Customer Refunds and Disputed Chargebacks
  const reconciledRevenueEurCents = Math.max(
    0,
    grossChargesEurCents - refundsEurCents - disputeWithdrawalsEurCents
  );

  const stripeCardFeesEurCents =
    stripeBalance.chargeFeesEurCents > 0
      ? stripeBalance.chargeFeesEurCents
      : calculatedCardFeesEurCents;

  const disputeFeesEurCents = stripeBalance.disputeFeesEurCents;
  const feeCreditsEurCents = stripeBalance.feeCreditsEurCents;
  const multicurrencySettlementFeesEurCents = stripeBalance.multicurrencySettlementFeesEurCents;
  const billingUsageFeesEurCents = stripeBalance.billingUsageFeesEurCents;
  const stripeForexFeesEurCents = Math.max(
    calculatedForexFeesEurCents,
    stripeBalance.forexConversionFeesEurCents
  );

  const totalPaymentFeesEurCents =
    stripeBalance.totalStripeFeesEurCents > 0
      ? stripeBalance.totalStripeFeesEurCents
      : stripeCardFeesEurCents +
        disputeFeesEurCents -
        feeCreditsEurCents +
        multicurrencySettlementFeesEurCents +
        billingUsageFeesEurCents +
        stripeForexFeesEurCents;

  // Use reconciled net turnover for taxable revenue
  revenueGrossEurCents = reconciledRevenueEurCents;

  // Filter and process operating expenses for current year
  const yearExpenses = allExpenses.filter((exp) => {
    const d = new Date(exp.date);
    return d.getFullYear() === currentYear;
  });

  let operatingExpensesEurCents = 0;
  const catMap: Partial<Record<ExpenseCategory, number>> = {};

  for (const exp of yearExpenses) {
    const conv = convertExpenseToEur(exp.amountCents, exp.currency, exp.date);
    const deductPct = (exp.taxDeductiblePct ?? 100) / 100;
    const effectiveAmt = Math.round(conv.amountEurCents * deductPct);
    operatingExpensesEurCents += effectiveAmt;

    catMap[exp.category] = (catMap[exp.category] ?? 0) + effectiveAmt;

    const d = new Date(exp.date);
    const qNum = Math.floor(d.getMonth() / 3) + 1;
    quartersMap[qNum].expensesEur += effectiveAmt;
  }

  // Home office deduction: max 210 days * €6.00 = €1,260.00
  const homeofficeDaysCount = Math.min(210, homeofficeDays.length);
  const homeofficeDeductionEurCents = homeofficeDaysCount * 600;

  for (const dayStr of homeofficeDays.slice(0, 210)) {
    const month = parseInt(dayStr.slice(5, 7), 10) - 1;
    const qNum = Math.floor(month / 3) + 1;
    quartersMap[qNum].homeofficeEur += 600;
  }

  const totalExpensesEurCents =
    operatingExpensesEurCents + homeofficeDeductionEurCents + totalPaymentFeesEurCents;
  const netProfitEurCents = Math.max(0, revenueGrossEurCents - totalExpensesEurCents);
  const profitMarginPct =
    revenueGrossEurCents > 0
      ? Math.round((netProfitEurCents / revenueGrossEurCents) * 100)
      : 0;

  // Compute full German Tax & Student Report
  const germanTax = computeGermanTaxReport({
    year: currentYear,
    revenueGrossEurCents,
    stripeCardFeesEurCents: stripeCardFeesEurCents + multicurrencySettlementFeesEurCents + billingUsageFeesEurCents,
    stripeForexFeesEurCents: stripeForexFeesEurCents + disputeFeesEurCents - feeCreditsEurCents,
    operatingExpensesEurCents,
    homeofficeDaysCount,
    vatMode,
  });

  const forex: ForexSummary = {
    originalCurrency: "USD",
    originalGrossCents: originalUsdGrossCents,
    convertedGrossEurCents: revenueGrossEurCents,
    stripeCardFeesEurCents,
    disputeFeesEurCents,
    feeCreditsEurCents,
    multicurrencySettlementFeesEurCents,
    billingUsageFeesEurCents,
    forexFeesEurCents: stripeForexFeesEurCents,
    totalPaymentFeesEurCents,
    netBankPayoutEurCents: Math.max(0, revenueGrossEurCents - totalPaymentFeesEurCents),
    totalActualPayoutsEurCents: stripeBalance.totalPayoutsEurCents,
  };

  // Build quarters array
  const qLabels = [
    { quarter: "Q1", label: "Jan – Mar" },
    { quarter: "Q2", label: "Apr – Jun" },
    { quarter: "Q3", label: "Jul – Sep" },
    { quarter: "Q4", label: "Oct – Dec" },
  ];

  const quarters: QuarterSummary[] = qLabels.map((ql, idx) => {
    const qData = quartersMap[idx + 1];
    const qPaymentFees = qData.cardFeesEur + qData.forexFeesEur;
    const qExpensesTotal = qData.expensesEur + qData.homeofficeEur + qPaymentFees;
    const qProfit = Math.max(0, qData.revenueEur - qExpensesTotal);
    const qMargin =
      qData.revenueEur > 0 ? Math.round((qProfit / qData.revenueEur) * 100) : 0;

    return {
      quarter: ql.quarter,
      label: ql.label,
      revenueGrossEurCents: qData.revenueEur,
      paymentFeesEurCents: qPaymentFees,
      operatingExpensesEurCents: qData.expensesEur,
      homeofficeEurCents: qData.homeofficeEur,
      totalExpensesEurCents: qExpensesTotal,
      netProfitEurCents: qProfit,
      marginPct: qMargin,
    };
  });

  // Build category breakdown
  const categoryBreakdown: CategorySummary[] = Object.entries(catMap).map(
    ([cat, amt]) => {
      const category = cat as ExpenseCategory;
      return {
        category,
        label: CATEGORY_LABELS[category] || category,
        amountCents: amt,
        pct: operatingExpensesEurCents > 0 ? Math.round((amt / operatingExpensesEurCents) * 100) : 0,
      };
    }
  );

  categoryBreakdown.sort((a, b) => b.amountCents - a.amountCents);

  return {
    year: currentYear,
    grossChargesEurCents,
    refundsEurCents,
    disputeWithdrawalsEurCents,
    revenueGrossEurCents,
    disputeFeesEurCents,
    feeCreditsEurCents,
    operatingExpensesEurCents,
    homeofficeDaysCount,
    homeofficeDeductionEurCents,
    stripeCardFeesEurCents,
    multicurrencySettlementFeesEurCents,
    billingUsageFeesEurCents,
    stripeForexFeesEurCents,
    totalPaymentFeesEurCents,
    totalExpensesEurCents,
    netProfitEurCents,
    profitMarginPct,
    germanTax,
    forex,
    quarters,
    categoryBreakdown,
    expenses: yearExpenses,
    yearLicenses,
    stripeBalance,
  };
}
