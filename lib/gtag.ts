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

export interface CookiePreferences {
  necessary: boolean; // always true
  analytics: boolean;
  marketing: boolean;
  timestamp?: number;
}

export function saveConsentPreferences(prefs: { analytics: boolean; marketing: boolean }) {
  const analyticsGranted = prefs.analytics ? "granted" : "denied";
  const marketingGranted = prefs.marketing ? "granted" : "denied";

  gtag("consent", "update", {
    analytics_storage: analyticsGranted,
    ad_storage: marketingGranted,
    ad_user_data: marketingGranted,
    ad_personalization: marketingGranted,
  });

  try {
    localStorage.setItem("cookie_consent", prefs.analytics ? "granted" : "denied");
    localStorage.setItem(
      "cookie_consent_preferences",
      JSON.stringify({
        necessary: true,
        analytics: prefs.analytics,
        marketing: prefs.marketing,
        timestamp: Date.now(),
      })
    );
  } catch { /* noop */ }
}

export function getStoredPreferences(): CookiePreferences | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("cookie_consent_preferences");
    if (raw) {
      return JSON.parse(raw);
    }
    const legacy = localStorage.getItem("cookie_consent");
    if (legacy === "granted") {
      return { necessary: true, analytics: true, marketing: true };
    }
    if (legacy === "denied") {
      return { necessary: true, analytics: false, marketing: false };
    }
  } catch { /* noop */ }
  return null;
}

export function grantConsent() {
  saveConsentPreferences({ analytics: true, marketing: true });
}

export function denyConsent() {
  saveConsentPreferences({ analytics: false, marketing: false });
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
  unlimited: { name: "Unlimited",   price: 79  },
  lifetime:  { name: "Lifetime",    price: 249 },
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
