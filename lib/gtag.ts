export const GA_ID = "G-RX498MM1KC";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  interface Window { gtag: (...args: any[]) => void; }
}

function gtag(...args: unknown[]) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag(...args);
  }
}

// ─── Consent Mode v2 ─────────────────────────────────────────────────────────

export function grantConsent() {
  gtag("consent", "update", { analytics_storage: "granted", ad_storage: "granted" });
  try { localStorage.setItem("cookie_consent", "granted"); } catch { /* noop */ }
}

export function denyConsent() {
  gtag("consent", "update", { analytics_storage: "denied", ad_storage: "denied" });
  try { localStorage.setItem("cookie_consent", "denied"); } catch { /* noop */ }
}

export function getStoredConsent(): "granted" | "denied" | null {
  if (typeof window === "undefined") return null;
  try {
    const v = localStorage.getItem("cookie_consent");
    if (v === "granted" || v === "denied") return v;
  } catch { /* noop */ }
  return null;
}

// ─── Tier metadata ────────────────────────────────────────────────────────────

const TIER_META: Record<string, { name: string; price: number }> = {
  single:    { name: "Single Site", price: 39  },
  unlimited: { name: "Unlimited",   price: 69  },
  lifetime:  { name: "Lifetime",    price: 149 },
};

function itemPayload(tier: string) {
  const meta = TIER_META[tier] ?? { name: tier, price: 0 };
  return {
    item_id:   `phpinfo_wp_${tier}`,
    item_name: `phpinfo() WP Pro - ${meta.name}`,
    price:     meta.price,
    currency:  "USD",
    quantity:  1,
  };
}

function tierValue(tier: string) {
  return TIER_META[tier]?.price ?? 0;
}

// ─── Funnel events ────────────────────────────────────────────────────────────

/** Pricing section enters viewport. */
export function trackViewItemList() {
  gtag("event", "view_item_list", {
    item_list_id:   "phpinfo_wp_pricing",
    item_list_name: "phpinfo() WP Pro Pricing",
    items: Object.keys(TIER_META).map(itemPayload),
  });
}

/** User hovers a specific pricing card. */
export function trackViewItem(tier: string) {
  gtag("event", "view_item", {
    currency: "USD",
    value:    tierValue(tier),
    items:    [itemPayload(tier)],
  });
}

/** User clicks "Buy <tier>". */
export function trackBeginCheckout(tier: string) {
  gtag("event", "begin_checkout", {
    currency: "USD",
    value:    tierValue(tier),
    items:    [itemPayload(tier)],
  });
}

/** Fired once on the /buy/success page - the real conversion. */
export function trackPurchase({
  transactionId,
  tier,
}: {
  transactionId: string;
  tier: string;
}) {
  gtag("event", "purchase", {
    transaction_id: transactionId,
    currency:       "USD",
    value:          tierValue(tier),
    items:          [itemPayload(tier)],
  });
}
