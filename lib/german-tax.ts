/**
 * German Tax Engine for Solo Software Developer & Student
 * Covers:
 * - Einkommensteuergesetz (EStG § 32a Grundfreibetrag)
 * - Gewerbesteuergesetz (GewStG § 11 Abs. 1 Nr. 1 Freibetrag €24,500)
 * - Homeoffice-Pauschale (§ 4 Abs. 5 Satz 1 Nr. 6c EStG €6/Tag max €1,260)
 * - Kleinunternehmerregelung (§ 19 UStG €25,000)
 * - Studentische Krankenversicherung (KVdS / Familienversicherung § 10 SGB V)
 */

export interface GermanTaxSettings {
  year: number;
  grundfreibetragEur: number; // e.g. 12084 or 12336
  gewerbesteuerFreibetragEur: number; // 24500
  isStudent: boolean;
  vatMode: "kleinunternehmer" | "standard_vat";
}

export interface GermanTaxReport {
  year: number;
  isStudent: boolean;
  vatMode: "kleinunternehmer" | "standard_vat";

  // EÜR Core Figures (all in EUR Cents)
  revenueGrossEurCents: number;
  stripeCardFeesEurCents: number;
  stripeForexFeesEurCents: number;
  totalPaymentFeesEurCents: number;
  operatingExpensesEurCents: number;
  homeofficeDaysCount: number;
  homeofficeDeductionEurCents: number;
  totalDeductibleExpensesEurCents: number;

  // Net Taxable Profit (zu versteuerndes Einkommen / Gewinn vor Steuern)
  netTaxableProfitEurCents: number;
  profitMarginPct: number;

  // Einkommensteuer (§ 32a EStG)
  grundfreibetragEurCents: number;
  isBelowGrundfreibetrag: boolean;
  incomeTaxCushionRemainingEurCents: number; // How much profit left before paying 1 cent of tax
  incomeTaxCushionUsedPct: number;
  estimatedIncomeTaxEurCents: number;
  effectiveIncomeTaxRatePct: number;

  // Gewerbesteuer (GewStG § 11)
  gewerbesteuerFreibetragEurCents: number; // 24,500 €
  isBelowGewerbesteuerFreibetrag: boolean;
  gewerbesteuerCushionRemainingEurCents: number;
  gewerbesteuerCushionUsedPct: number;
  estimatedGewerbesteuerEurCents: number; // 0 if under 24,500

  // VAT / Umsatzsteuer (§ 19 UStG)
  vatThresholdEurCents: number; // 25,000 €
  isBelowVatThreshold: boolean;
  vatCushionRemainingEurCents: number;
  vatExemptionNote: string;

  // Student Health Insurance Status (§ 10 SGB V)
  studentFamilyInsuranceThresholdYearlyEurCents: number; // 505 €/mo * 12 = 6,060 €
  isWithinFamilyInsuranceLimit: boolean;
  studentStatusNote: string;
}

// Statutory German tax allowances by tax year
export const STATUTORY_GRUNDFREIBETRAG: Record<number, number> = {
  2024: 11784,
  2025: 12084,
  2026: 12336,
};

export const GEWERBESTEUER_FREIBETRAG = 24500;
export const HOMEOFFICE_DAILY_EUR = 6.0;
export const HOMEOFFICE_MAX_DAYS = 210;
export const HOMEOFFICE_MAX_EUR = 1260.0;
export const KLEINUNTERNEHMER_THRESHOLD_EUR = 25000;
export const STUDENT_FAMILY_INSURANCE_MONTHLY_EUR = 505;

/**
 * Calculate German Progressive Income Tax (§ 32a EStG).
 * Returns tax in EUR cents for a given taxable profit in EUR cents.
 */
export function calculateGermanIncomeTax(taxableProfitCents: number, year = 2026): number {
  if (taxableProfitCents <= 0) return 0;
  const taxableProfitEur = taxableProfitCents / 100;
  const gfb = STATUTORY_GRUNDFREIBETRAG[year] || STATUTORY_GRUNDFREIBETRAG[2026];

  // Under Grundfreibetrag: 100% Tax Free!
  if (taxableProfitEur <= gfb) {
    return 0;
  }

  // Progressive tariff calculation above Grundfreibetrag (§ 32a EStG)
  const diff = taxableProfitEur - gfb;
  const y = diff / 10000;

  let taxEur = 0;
  if (taxableProfitEur <= 17005) {
    // Zone 2 (Entry progression 14% -> ~24%)
    taxEur = (995.21 * y + 1400) * y;
  } else if (taxableProfitEur <= 66760) {
    // Zone 3
    const z = (taxableProfitEur - 17005) / 10000;
    taxEur = (208.85 * z + 2397) * z + 1015.51;
  } else {
    // Zone 4 (Proportional 42%)
    taxEur = 0.42 * taxableProfitEur - 10636.31;
  }

  return Math.max(0, Math.round(taxEur * 100));
}

/**
 * Compute full German Tax Report for a solo developer/student.
 */
export function computeGermanTaxReport(params: {
  year?: number;
  revenueGrossEurCents: number;
  stripeCardFeesEurCents: number;
  stripeForexFeesEurCents: number;
  operatingExpensesEurCents: number;
  homeofficeDaysCount: number;
  vatMode?: "kleinunternehmer" | "standard_vat";
}): GermanTaxReport {
  const year = params.year || new Date().getFullYear();
  const gfbEur = STATUTORY_GRUNDFREIBETRAG[year] || STATUTORY_GRUNDFREIBETRAG[2026];
  const gfbCents = gfbEur * 100;
  const gewStFreibetragCents = GEWERBESTEUER_FREIBETRAG * 100;
  const vatThresholdCents = KLEINUNTERNEHMER_THRESHOLD_EUR * 100;
  const vatMode = params.vatMode || "kleinunternehmer";

  // Homeoffice: capped at 210 days * 6 EUR = 1,260 EUR (126,000 cents)
  const cappedHomeofficeDays = Math.min(HOMEOFFICE_MAX_DAYS, Math.max(0, params.homeofficeDaysCount));
  const homeofficeDeductionEurCents = cappedHomeofficeDays * 600;

  const totalPaymentFeesEurCents = params.stripeCardFeesEurCents + params.stripeForexFeesEurCents;
  const totalDeductibleExpensesEurCents =
    params.operatingExpensesEurCents + totalPaymentFeesEurCents + homeofficeDeductionEurCents;

  const netTaxableProfitEurCents = Math.max(
    0,
    params.revenueGrossEurCents - totalDeductibleExpensesEurCents
  );

  const profitMarginPct =
    params.revenueGrossEurCents > 0
      ? Math.round((netTaxableProfitEurCents / params.revenueGrossEurCents) * 100)
      : 0;

  // Grundfreibetrag (Income Tax-Free Allowance)
  const isBelowGrundfreibetrag = netTaxableProfitEurCents <= gfbCents;
  const incomeTaxCushionRemainingEurCents = Math.max(0, gfbCents - netTaxableProfitEurCents);
  const incomeTaxCushionUsedPct = Math.min(100, Math.round((netTaxableProfitEurCents / gfbCents) * 100));

  const estimatedIncomeTaxEurCents = isBelowGrundfreibetrag
    ? 0
    : calculateGermanIncomeTax(netTaxableProfitEurCents, year);

  const effectiveIncomeTaxRatePct =
    netTaxableProfitEurCents > 0
      ? Math.round((estimatedIncomeTaxEurCents / netTaxableProfitEurCents) * 1000) / 10
      : 0;

  // Gewerbesteuer (§ 11 GewStG)
  const isBelowGewerbesteuerFreibetrag = netTaxableProfitEurCents <= gewStFreibetragCents;
  const gewerbesteuerCushionRemainingEurCents = Math.max(0, gewStFreibetragCents - netTaxableProfitEurCents);
  const gewerbesteuerCushionUsedPct = Math.min(
    100,
    Math.round((netTaxableProfitEurCents / gewStFreibetragCents) * 100)
  );
  // Solo developer profit under 24,500 pays ZERO trade tax
  const estimatedGewerbesteuerEurCents = 0;

  // VAT (§ 19 UStG)
  const isBelowVatThreshold = params.revenueGrossEurCents <= vatThresholdCents;
  const vatCushionRemainingEurCents = Math.max(0, vatThresholdCents - params.revenueGrossEurCents);
  const vatExemptionNote =
    vatMode === "kleinunternehmer"
      ? "Gemäß § 19 UStG wird keine Umsatzsteuer berechnet (Kleinunternehmerregelung)."
      : "Regelbesteuerung (19% MwSt DE / EU Reverse-Charge § 13b / Export 0%).";

  // Student Health Insurance
  const studentFamilyInsuranceThresholdYearlyEurCents = STUDENT_FAMILY_INSURANCE_MONTHLY_EUR * 12 * 100;
  const isWithinFamilyInsuranceLimit = netTaxableProfitEurCents <= studentFamilyInsuranceThresholdYearlyEurCents;
  const studentStatusNote = isWithinFamilyInsuranceLimit
    ? "Eligible for free statutory Family Health Insurance (§ 10 SGB V, profit ≤ €505/mo)."
    : "Standard student health insurance (KVdS) applies; ensure working hours stay ≤ 20 hrs/week during lecture periods.";

  return {
    year,
    isStudent: true,
    vatMode,
    revenueGrossEurCents: params.revenueGrossEurCents,
    stripeCardFeesEurCents: params.stripeCardFeesEurCents,
    stripeForexFeesEurCents: params.stripeForexFeesEurCents,
    totalPaymentFeesEurCents,
    operatingExpensesEurCents: params.operatingExpensesEurCents,
    homeofficeDaysCount: cappedHomeofficeDays,
    homeofficeDeductionEurCents,
    totalDeductibleExpensesEurCents,
    netTaxableProfitEurCents,
    profitMarginPct,
    grundfreibetragEurCents: gfbCents,
    isBelowGrundfreibetrag,
    incomeTaxCushionRemainingEurCents,
    incomeTaxCushionUsedPct,
    estimatedIncomeTaxEurCents,
    effectiveIncomeTaxRatePct,
    gewerbesteuerFreibetragEurCents: gewStFreibetragCents,
    isBelowGewerbesteuerFreibetrag,
    gewerbesteuerCushionRemainingEurCents,
    gewerbesteuerCushionUsedPct,
    estimatedGewerbesteuerEurCents,
    vatThresholdEurCents: vatThresholdCents,
    isBelowVatThreshold,
    vatCushionRemainingEurCents,
    vatExemptionNote,
    studentFamilyInsuranceThresholdYearlyEurCents,
    isWithinFamilyInsuranceLimit,
    studentStatusNote,
  };
}
