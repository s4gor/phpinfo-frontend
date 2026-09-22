export function formatEur(cents: number | undefined | null): string {
  const amount = (cents ?? 0) / 100;
  try {
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    return "€" + amount.toFixed(2);
  }
}

export function formatMoney(cents: number, currency = "eur"): string {
  const amount = (cents ?? 0) / 100;
  const curr = (currency || "eur").toLowerCase();
  try {
    const locale = curr === "eur" ? "de-DE" : "en-US";
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: curr.toUpperCase(),
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    return curr === "eur" ? "€" + amount.toFixed(2) : "$" + amount.toFixed(2);
  }
}

export function formatDualMoney(
  eurCents: number,
  originalCents?: number,
  originalCurrency = "usd"
): { eurFormatted: string; originalFormatted?: string } {
  const eurFormatted = formatEur(eurCents);
  const curr = (originalCurrency || "eur").toLowerCase();

  if (curr === "eur" || !originalCents || originalCents === eurCents) {
    return { eurFormatted };
  }

  const originalFormatted = formatMoney(originalCents, curr);
  return { eurFormatted, originalFormatted };
}

export function formatDate(unixSeconds: number | undefined): string {
  if (!unixSeconds) return "-";
  const d = new Date(unixSeconds * 1000);
  return d.toISOString().slice(0, 10);
}

export function formatDateTime(unixSeconds: number | undefined): string {
  if (!unixSeconds) return "-";
  const d = new Date(unixSeconds * 1000);
  return d.toISOString().replace("T", " ").slice(0, 16) + " UTC";
}

export function tierLabel(tier: string): string {
  return tier === "single" ? "Single Site" : tier === "unlimited" ? "Unlimited" : tier === "lifetime" ? "Lifetime" : tier;
}
