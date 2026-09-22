import { getAllLicenses, type LicenseRecord } from "./db";
import { convertSaleToEur } from "./currency";

export interface TimeBucket {
  date: string; // YYYY-MM-DD
  sales: number;
  revenueCents: number;
}

export interface MonthBucket {
  month: string; // YYYY-MM
  sales: number;
  revenueCents: number;
}

export interface TierBreakdown {
  tier: "single" | "unlimited" | "lifetime";
  label: string;
  count: number;
  revenueCents: number;
  color: string;
}

export type HeartbeatStatus = "active" | "stale" | "dormant";

export interface DomainActivationItem {
  siteUrl: string;
  lastSeenAt: number;
  email: string;
  customerName?: string;
  tier: "single" | "unlimited" | "lifetime";
  licenseKey: string;
  stripeSessionId?: string;
  heartbeat: HeartbeatStatus;
  isOverLimit?: boolean;
}

export interface Stats {
  totalSales: number;
  revenueLifetimeCents: number;
  revenueThisMonthCents: number;
  revenueLastMonthCents: number;
  activeLicenses: number;
  expired: number;
  revoked: number;
  mrrCents: number;
  arrCents: number;
  arpuCents: number;
  avgDaysToExpiry: number;
  byTier: Record<string, number>;
  tierBreakdown: TierBreakdown[];

  // Email stats
  emailDelivered: number;
  emailBounced: number;
  emailPending: number;
  emailDeliveryRate: number;

  // Activation & Domain Intelligence
  totalActivations: number;
  licensesWithActivations: number;
  licensesNeverActivated: number;
  activationRate: number;
  domainsActiveCount: number;
  domainsStaleCount: number;
  domainsDormantCount: number;
  allDomains: DomainActivationItem[];
  abuseAlertsCount: number;

  // Subscriptions
  totalSubscriptions: number;
  activeSubscriptions: number;
  upcomingRenewals30d: number;

  // Month-over-month growth
  salesThisMonth: number;
  salesLastMonth: number;
  salesGrowthPct: number | null;
  revenueGrowthPct: number | null;

  // Time buckets
  last30: TimeBucket[];
  last90: TimeBucket[];
  last12Months: MonthBucket[];
  activationsLast30: TimeBucket[];

  // Leaderboards
  recent: LicenseRecord[];
  topByRevenue: LicenseRecord[];
}

export async function computeStats(): Promise<Stats> {
  const all = await getAllLicenses();
  const now = Math.floor(Date.now() / 1000);

  const startOfMonth = monthStart(new Date());
  const startOfLastMonth = monthStart(subMonths(new Date(), 1));
  const endOfLastMonth = startOfMonth - 1;

  // ── Base counters ────────────────────────────────────────────────────────
  let revenueLifetimeCents = 0;
  let revenueThisMonthCents = 0;
  let revenueLastMonthCents = 0;
  let activeLicenses = 0;
  let expired = 0;
  let revoked = 0;
  let emailDelivered = 0;
  let emailBounced = 0;
  let emailPending = 0;
  let mrrCents = 0;
  let totalActivations = 0;
  let licensesWithActivations = 0;
  let salesThisMonth = 0;
  let salesLastMonth = 0;
  let sumDaysToExpiry = 0;
  let activeLicensesForAvg = 0;

  let totalSubscriptions = 0;
  let activeSubscriptions = 0;
  let upcomingRenewals30d = 0;

  const byTier = { single: 0, unlimited: 0, lifetime: 0 };
  const tierRevenue: Record<string, number> = { single: 0, unlimited: 0, lifetime: 0 };

  // ── Last-30-days buckets ────────────────────────────────────────────────
  const last30Buckets = new Map<string, { sales: number; revenueCents: number }>();
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    last30Buckets.set(d.toISOString().slice(0, 10), { sales: 0, revenueCents: 0 });
  }

  // ── Last-90-days buckets ────────────────────────────────────────────────
  const last90Buckets = new Map<string, { sales: number; revenueCents: number }>();
  for (let i = 89; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    last90Buckets.set(d.toISOString().slice(0, 10), { sales: 0, revenueCents: 0 });
  }

  // ── Last-12-months buckets ──────────────────────────────────────────────
  const last12Buckets = new Map<string, { sales: number; revenueCents: number }>();
  for (let i = 11; i >= 0; i--) {
    const m = subMonths(new Date(), i);
    const key = `${m.getFullYear()}-${String(m.getMonth() + 1).padStart(2, "0")}`;
    last12Buckets.set(key, { sales: 0, revenueCents: 0 });
  }

  // ── Activations-last-30 buckets ─────────────────────────────────────────
  const actBuckets = new Map<string, { sales: number; revenueCents: number }>();
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    actBuckets.set(d.toISOString().slice(0, 10), { sales: 0, revenueCents: 0 });
  }

  // ── Domain Intelligence aggregation ─────────────────────────────────────
  const allDomains: DomainActivationItem[] = [];
  let domainsActiveCount = 0;
  let domainsStaleCount = 0;
  let domainsDormantCount = 0;
  let abuseAlertsCount = 0;

  // ── Main loop ────────────────────────────────────────────────────────────
  for (const lic of all) {
    const rawAmount = lic.amount_total ?? 0;
    const curr = lic.currency || "usd";
    const conv = convertSaleToEur(rawAmount, curr, lic.iat);
    const amount = lic.revoked ? 0 : conv.grossEurCents;
    byTier[lic.tier] = (byTier[lic.tier] ?? 0) + 1;
    if (!lic.revoked) {
      tierRevenue[lic.tier] = (tierRevenue[lic.tier] ?? 0) + amount;
      revenueLifetimeCents += amount;

      if (lic.iat >= startOfMonth) {
        revenueThisMonthCents += amount;
        salesThisMonth++;
      }
      if (lic.iat >= startOfLastMonth && lic.iat <= endOfLastMonth) {
        revenueLastMonthCents += amount;
        salesLastMonth++;
      }
    }

    // Subscriptions
    if (lic.stripe_subscription_id) {
      totalSubscriptions++;
      if (!lic.revoked && lic.exp >= now) {
        activeSubscriptions++;
        const daysToRenew = (lic.exp - now) / 86400;
        if (daysToRenew >= 0 && daysToRenew <= 30) {
          upcomingRenewals30d++;
        }
      }
    }

    if (lic.revoked) {
      revoked++;
    } else if (lic.exp < now) {
      expired++;
    } else {
      activeLicenses++;
      // MRR: only recurring tiers (single, unlimited) not lifetime
      if (lic.tier !== "lifetime") {
        mrrCents += Math.round(amount / 12);
      }
      if (lic.tier !== "lifetime") {
        const daysLeft = Math.max(0, (lic.exp - now) / 86400);
        sumDaysToExpiry += daysLeft;
        activeLicensesForAvg++;
      }
    }

    // Email status
    switch (lic.email_status) {
      case "delivered": emailDelivered++; break;
      case "bounced": case "complained": case "failed": emailBounced++; break;
      default: emailPending++; break;
    }

    // Activations & Domain Intelligence
    const acts = lic.activations ?? [];
    if (acts.length > 0) {
      licensesWithActivations++;
      const uniqueMap = new Map<string, { site_url: string; at: number }>();
      for (const a of acts) {
        const clean = a.site_url.toLowerCase().replace(/\/+$/, "");
        if (!uniqueMap.has(clean) || a.at > (uniqueMap.get(clean)?.at ?? 0)) {
          uniqueMap.set(clean, a);
        }
      }

      const uniqueSites = Array.from(uniqueMap.values());
      totalActivations += uniqueSites.length;

      const isSingleAbuse = lic.tier === "single" && uniqueSites.length > 1;
      if (isSingleAbuse) abuseAlertsCount++;

      for (const site of uniqueSites) {
        const diffDays = (now - site.at) / 86400;
        let heartbeat: HeartbeatStatus = "dormant";
        if (diffDays <= 7) {
          heartbeat = "active";
          domainsActiveCount++;
        } else if (diffDays <= 30) {
          heartbeat = "stale";
          domainsStaleCount++;
        } else {
          heartbeat = "dormant";
          domainsDormantCount++;
        }

        allDomains.push({
          siteUrl: site.site_url,
          lastSeenAt: site.at,
          email: lic.email,
          customerName: lic.customer_name,
          tier: lic.tier,
          licenseKey: lic.key,
          stripeSessionId: lic.stripe_session_id,
          heartbeat,
          isOverLimit: isSingleAbuse,
        });

        const dk = new Date(site.at * 1000).toISOString().slice(0, 10);
        const b = actBuckets.get(dk);
        if (b) b.sales++;
      }
    }

    // Day buckets (30d and 90d)
    const dayKey = new Date(lic.iat * 1000).toISOString().slice(0, 10);
    const db30 = last30Buckets.get(dayKey);
    if (db30) { db30.sales++; db30.revenueCents += amount; }
    const db90 = last90Buckets.get(dayKey);
    if (db90) { db90.sales++; db90.revenueCents += amount; }

    // Month bucket
    const monthKey = new Date(lic.iat * 1000).toISOString().slice(0, 7);
    const mb = last12Buckets.get(monthKey);
    if (mb) { mb.sales++; mb.revenueCents += amount; }
  }

  allDomains.sort((a, b) => b.lastSeenAt - a.lastSeenAt);

  // Deduplicate by normalized domain across all licenses (keeping the most recent active claim)
  const seenDomains = new Set<string>();
  const dedupedDomains: DomainActivationItem[] = [];
  for (const d of allDomains) {
    const norm = d.siteUrl.toLowerCase().replace(/\/+$/, "").replace(/^https?:\/\//, "");
    if (!seenDomains.has(norm)) {
      seenDomains.add(norm);
      dedupedDomains.push(d);
    }
  }
  allDomains.length = 0;
  allDomains.push(...dedupedDomains);

  // ── Derived ──────────────────────────────────────────────────────────────
  const totalForRate = emailDelivered + emailBounced + emailPending;
  const emailDeliveryRate = totalForRate > 0 ? Math.round((emailDelivered / totalForRate) * 100) : 0;
  const activationRate = all.length > 0 ? Math.round((licensesWithActivations / all.length) * 100) : 0;
  const arpuCents = all.length > 0 ? Math.round(revenueLifetimeCents / all.length) : 0;
  const arrCents = mrrCents * 12;
  const avgDaysToExpiry = activeLicensesForAvg > 0 ? Math.round(sumDaysToExpiry / activeLicensesForAvg) : 0;

  const salesGrowthPct = salesLastMonth > 0
    ? Math.round(((salesThisMonth - salesLastMonth) / salesLastMonth) * 100)
    : salesThisMonth > 0 ? 100 : null;

  const revenueGrowthPct = revenueLastMonthCents > 0
    ? Math.round(((revenueThisMonthCents - revenueLastMonthCents) / revenueLastMonthCents) * 100)
    : revenueThisMonthCents > 0 ? 100 : null;

  const tierBreakdown: TierBreakdown[] = [
    { tier: "single",    label: "Single Site", count: byTier.single,    revenueCents: tierRevenue.single,    color: "#8b5cf6" },
    { tier: "unlimited", label: "Unlimited",   count: byTier.unlimited, revenueCents: tierRevenue.unlimited, color: "#06b6d4" },
    { tier: "lifetime",  label: "Lifetime",    count: byTier.lifetime,  revenueCents: tierRevenue.lifetime,  color: "#10b981" },
  ];

  const recent = [...all].sort((a, b) => b.iat - a.iat).slice(0, 10);
  const topByRevenue = [...all].sort((a, b) => {
    const aEur = convertSaleToEur(a.amount_total ?? 0, a.currency || "usd", a.iat).grossEurCents;
    const bEur = convertSaleToEur(b.amount_total ?? 0, b.currency || "usd", b.iat).grossEurCents;
    return bEur - aEur;
  }).slice(0, 5);

  return {
    totalSales: all.length,
    revenueLifetimeCents,
    revenueThisMonthCents,
    revenueLastMonthCents,
    activeLicenses,
    expired,
    revoked,
    mrrCents,
    arrCents,
    arpuCents,
    avgDaysToExpiry,
    byTier,
    tierBreakdown,
    emailDelivered,
    emailBounced,
    emailPending,
    emailDeliveryRate,
    totalActivations,
    licensesWithActivations,
    licensesNeverActivated: all.length - licensesWithActivations,
    activationRate,
    domainsActiveCount,
    domainsStaleCount,
    domainsDormantCount,
    allDomains,
    abuseAlertsCount,
    totalSubscriptions,
    activeSubscriptions,
    upcomingRenewals30d,
    salesThisMonth,
    salesLastMonth,
    salesGrowthPct,
    revenueGrowthPct,
    last30: Array.from(last30Buckets.entries()).map(([date, v]) => ({ date, sales: v.sales, revenueCents: v.revenueCents })),
    last90: Array.from(last90Buckets.entries()).map(([date, v]) => ({ date, sales: v.sales, revenueCents: v.revenueCents })),
    last12Months: Array.from(last12Buckets.entries()).map(([month, v]) => ({ month, sales: v.sales, revenueCents: v.revenueCents })),
    recent,
    topByRevenue,
    activationsLast30: Array.from(actBuckets.entries()).map(([date, v]) => ({ date, sales: v.sales, revenueCents: 0 })),
  };
}

function monthStart(d: Date): number {
  return Math.floor(new Date(d.getFullYear(), d.getMonth(), 1).getTime() / 1000);
}

function subMonths(d: Date, n: number): Date {
  const r = new Date(d);
  r.setMonth(r.getMonth() - n);
  return r;
}
