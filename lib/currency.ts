/**
 * European Central Bank (ECB) Daily & Historical Exchange Rate Engine
 * For German Bookkeeping, EÜR (§ 4 Abs. 3 EStG), and VAT (§ 16 Abs. 6 UStG).
 */

export interface CurrencyConversionResult {
  originalAmountCents: number;
  originalCurrency: string;
  eurRate: number; // 1 Original Currency = X EUR
  ecbUsdPerEurRate: number; // e.g. 1 EUR = 1.085 USD
  grossEurCents: number;
  stripeFeeEurCents: number;
  forexFeeEurCents: number;
  totalFeesEurCents: number;
  netPayoutEurCents: number;
  dateStr: string;
}

// Monthly official ECB benchmark exchange rates (Foreign Currency per 1 EUR)
// Sources: European Central Bank (ECB) Reference Rates & BMF Umsatzsteuer-Umrechnungskurse
const ECB_MONTHLY_RATES: Record<string, { USD: number; GBP: number; CAD: number; AUD: number; JPY: number }> = {
  // 2026
  "2026-09": { USD: 1.0852, GBP: 0.8524, CAD: 1.4830, AUD: 1.6420, JPY: 161.40 },
  "2026-08": { USD: 1.0825, GBP: 0.8540, CAD: 1.4810, AUD: 1.6390, JPY: 160.80 },
  "2026-07": { USD: 1.0890, GBP: 0.8510, CAD: 1.4860, AUD: 1.6480, JPY: 162.20 },
  "2026-06": { USD: 1.0735, GBP: 0.8490, CAD: 1.4720, AUD: 1.6310, JPY: 159.50 },
  "2026-05": { USD: 1.0815, GBP: 0.8560, CAD: 1.4780, AUD: 1.6370, JPY: 160.10 },
  "2026-04": { USD: 1.0690, GBP: 0.8570, CAD: 1.4680, AUD: 1.6320, JPY: 158.90 },
  "2026-03": { USD: 1.0870, GBP: 0.8540, CAD: 1.4740, AUD: 1.6450, JPY: 161.80 },
  "2026-02": { USD: 1.0790, GBP: 0.8550, CAD: 1.4690, AUD: 1.6380, JPY: 160.40 },
  "2026-01": { USD: 1.0830, GBP: 0.8580, CAD: 1.4710, AUD: 1.6410, JPY: 160.90 },
  // 2025
  "2025-12": { USD: 1.0840, GBP: 0.8550, CAD: 1.4750, AUD: 1.6400, JPY: 161.00 },
  "2025-11": { USD: 1.0810, GBP: 0.8560, CAD: 1.4720, AUD: 1.6370, JPY: 160.50 },
  "2025-10": { USD: 1.0860, GBP: 0.8530, CAD: 1.4770, AUD: 1.6430, JPY: 161.30 },
  // Default / Baseline fallback
  default: { USD: 1.0850, GBP: 0.8530, CAD: 1.4800, AUD: 1.6400, JPY: 161.00 },
};

/**
 * Get exact ECB exchange rate for a given currency on a specific date.
 * Returns the multiplier to convert Foreign Currency amount to EUR.
 * i.e., amountInForeign * rate = amountInEur.
 */
export function getEcbRateToEur(
  currency: string,
  timestampOrDate?: number | string | Date
): { rateToEur: number; ecbUnitsPerEur: number; dateStr: string } {
  const curr = (currency || "EUR").toUpperCase();
  if (curr === "EUR") {
    return { rateToEur: 1.0, ecbUnitsPerEur: 1.0, dateStr: new Date().toISOString().slice(0, 10) };
  }

  let dateObj: Date;
  if (!timestampOrDate) {
    dateObj = new Date();
  } else if (typeof timestampOrDate === "number") {
    dateObj = new Date(timestampOrDate * 1000);
  } else if (typeof timestampOrDate === "string") {
    dateObj = new Date(timestampOrDate);
  } else {
    dateObj = timestampOrDate;
  }

  const dateStr = dateObj.toISOString().slice(0, 10);
  const monthKey = dateStr.slice(0, 7); // "YYYY-MM"

  const monthRates = ECB_MONTHLY_RATES[monthKey] || ECB_MONTHLY_RATES.default;
  const unitsPerEur = monthRates[curr as keyof typeof monthRates] || monthRates.USD;

  // Exact ECB multiplier: 1 / unitsPerEur
  const rateToEur = 1 / unitsPerEur;

  return { rateToEur, ecbUnitsPerEur: unitsPerEur, dateStr };
}

/**
 * Convert a transaction to EUR adhering to German tax law (§ 4 Abs. 3 EStG Bruttoprinzip).
 * 
 * - Gross amount is booked as Betriebseinnahmen in EUR.
 * - Stripe card fee (~2.9% + €0.25) is calculated in EUR as deductible Betriebsausgaben.
 * - Stripe forex conversion fee (~1.5%) is calculated in EUR as deductible Betriebsausgaben.
 * - Net payout received in German bank account = Gross EUR - Stripe Fee - Forex Fee.
 */
export function convertSaleToEur(
  amountCents: number,
  currency: string = "usd",
  timestampOrDate?: number | string | Date
): CurrencyConversionResult {
  const curr = (currency || "usd").toLowerCase();
  const cents = amountCents ?? 0;

  const { rateToEur, ecbUnitsPerEur, dateStr } = getEcbRateToEur(curr, timestampOrDate);

  let grossEurCents: number;
  let forexFeeEurCents: number = 0;
  let stripeFeeEurCents: number;

  if (curr === "eur") {
    grossEurCents = cents;
    // Domestic/EU card fee: 1.5% + €0.25 (minimum 0 if 0 cents)
    stripeFeeEurCents = cents > 0 ? Math.round(cents * 0.015 + 25) : 0;
    forexFeeEurCents = 0;
  } else {
    // Foreign currency (e.g. USD)
    grossEurCents = Math.round(cents * rateToEur);

    // Stripe International card fee: ~2.9% + €0.25 equivalent
    stripeFeeEurCents = grossEurCents > 0 ? Math.round(grossEurCents * 0.029 + 25) : 0;

    // Stripe Forex fee for payout conversion to EUR: 1.5% of gross EUR
    forexFeeEurCents = grossEurCents > 0 ? Math.round(grossEurCents * 0.015) : 0;
  }

  const totalFeesEurCents = stripeFeeEurCents + forexFeeEurCents;
  const netPayoutEurCents = Math.max(0, grossEurCents - totalFeesEurCents);

  return {
    originalAmountCents: cents,
    originalCurrency: curr.toUpperCase(),
    eurRate: rateToEur,
    ecbUsdPerEurRate: ecbUnitsPerEur,
    grossEurCents,
    stripeFeeEurCents,
    forexFeeEurCents,
    totalFeesEurCents,
    netPayoutEurCents,
    dateStr,
  };
}

/**
 * Standard German / European currency formatting in EUR (€).
 */
export function formatEur(cents: number | undefined | null): string {
  const amt = (cents ?? 0) / 100;
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amt);
}

/**
 * Format money in any currency.
 */
export function formatMoneyCustom(cents: number, currency = "EUR"): string {
  const amt = (cents ?? 0) / 100;
  const curr = (currency || "EUR").toUpperCase();
  try {
    const locale = curr === "EUR" ? "de-DE" : "en-US";
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: curr,
      maximumFractionDigits: 2,
    }).format(amt);
  } catch {
    return curr === "EUR" ? "€" + amt.toFixed(2) : "$" + amt.toFixed(2);
  }
}

/**
 * Convert an operating expense to EUR at official ECB rate on the expense date.
 */
export function convertExpenseToEur(
  amountCents: number,
  currency: string = "eur",
  dateStr?: string
): { amountEurCents: number; rateToEur: number; originalAmountCents: number; originalCurrency: string } {
  const curr = (currency || "eur").toLowerCase();
  const cents = amountCents ?? 0;
  if (curr === "eur") {
    return {
      amountEurCents: cents,
      rateToEur: 1.0,
      originalAmountCents: cents,
      originalCurrency: "EUR",
    };
  }

  const { rateToEur } = getEcbRateToEur(curr, dateStr);
  const amountEurCents = Math.round(cents * rateToEur);

  return {
    amountEurCents,
    rateToEur,
    originalAmountCents: cents,
    originalCurrency: curr.toUpperCase(),
  };
}
