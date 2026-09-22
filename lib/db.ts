import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || "https://dummy.upstash.io",
  token: process.env.UPSTASH_REDIS_REST_TOKEN || "dummy",
});

export type LicenseTier = "single" | "unlimited" | "lifetime";

export type EmailStatus =
  | "pending"
  | "sent"
  | "delivered"
  | "bounced"
  | "complained"
  | "failed";

export interface ActivationRecord {
  site_url: string;
  domain: string;
  at: number;
  active: boolean;
  deactivated_at?: number;
  first_activated_at?: number;
}

export interface LicenseRecord {
  key: string;
  email: string;
  tier: LicenseTier;
  site_url: string;
  exp: number;
  iat: number;
  stripe_customer_id?: string;
  stripe_session_id?: string;
  stripe_subscription_id?: string;
  subscription_status?: string;
  customer_name?: string;
  amount_total?: number;
  currency?: string;
  resend_message_id?: string;
  email_status?: EmailStatus;
  email_status_at?: number;
  email_last_error?: string;
  revoked?: boolean;
  revoked_at?: number;
  revoke_reason?: string;
  activations?: Array<ActivationRecord>;
  upgraded_key?: string;
  upgraded_from?: string;
}

export interface AuditEntry {
  ts: number;
  actor: string;
  action: string;
  target: string;
  details?: Record<string, unknown>;
}

const KEY_LICENSE     = (k: string) => `license:${k}`;
const KEY_BY_EMAIL    = (email: string) => `email:${email.toLowerCase()}`;
const KEY_BY_SESSION  = (sessionId: string) => `session:${sessionId}`;
const KEY_BY_CUSTOMER = (customerId: string) => `customer:${customerId}`;
const KEY_BY_SUBSCRIPTION = (subId: string) => `subscription:${subId}`;
const KEY_BY_MSG      = (msgId: string) => `msg:${msgId}`;
const KEY_INDEX_ALL   = "licenses:all";
const KEY_AUDIT       = "audit:log";

export async function saveLicense(record: LicenseRecord): Promise<void> {
  const pipe = redis.pipeline();
  pipe.set(KEY_LICENSE(record.key), record);
  pipe.sadd(KEY_BY_EMAIL(record.email), record.key);
  pipe.zadd(KEY_INDEX_ALL, { score: record.iat, member: record.key });
  if (record.stripe_session_id) {
    pipe.set(KEY_BY_SESSION(record.stripe_session_id), record.key);
  }
  if (record.stripe_customer_id) {
    pipe.set(KEY_BY_CUSTOMER(record.stripe_customer_id), record.key);
  }
  if (record.stripe_subscription_id) {
    pipe.set(KEY_BY_SUBSCRIPTION(record.stripe_subscription_id), record.key);
  }
  if (record.resend_message_id) {
    pipe.set(KEY_BY_MSG(record.resend_message_id), record.key);
  }
  await pipe.exec();
}

export async function updateLicense(
  key: string,
  patch: Partial<LicenseRecord>,
): Promise<LicenseRecord | null> {
  const rec = await getLicense(key);
  if (!rec) return null;
  const next = { ...rec, ...patch };
  await redis.set(KEY_LICENSE(key), next);
  if (patch.resend_message_id && patch.resend_message_id !== rec.resend_message_id) {
    await redis.set(KEY_BY_MSG(patch.resend_message_id), key);
  }
  if (patch.stripe_subscription_id && patch.stripe_subscription_id !== rec.stripe_subscription_id) {
    await redis.set(KEY_BY_SUBSCRIPTION(patch.stripe_subscription_id), key);
  }
  return next;
}

export async function getLicenseByCustomerId(customerId: string): Promise<LicenseRecord | null> {
  const key = await redis.get<string>(KEY_BY_CUSTOMER(customerId));
  if (!key) return null;
  return getLicense(key);
}

export async function getLicenseBySubscriptionId(subId: string): Promise<LicenseRecord | null> {
  const key = await redis.get<string>(KEY_BY_SUBSCRIPTION(subId));
  if (!key) return null;
  return getLicense(key);
}

export async function getLicenseByMessageId(msgId: string): Promise<LicenseRecord | null> {
  const key = await redis.get<string>(KEY_BY_MSG(msgId));
  if (!key) return null;
  return getLicense(key);
}

export async function updateLicenseExp(key: string, newExp: number): Promise<void> {
  const rec = await getLicense(key);
  if (!rec) return;
  rec.exp = newExp;
  await redis.set(KEY_LICENSE(key), rec);
}

export async function getLicense(key: string): Promise<LicenseRecord | null> {
  const rec = await redis.get<LicenseRecord>(KEY_LICENSE(key));
  return rec ?? null;
}

export async function getLicenseBySessionId(sessionId: string): Promise<LicenseRecord | null> {
  const key = await redis.get<string>(KEY_BY_SESSION(sessionId));
  if (!key) return null;
  return getLicense(key);
}

export function extractDomain(url: string): string {
  try {
    const raw = url.startsWith("http://") || url.startsWith("https://") ? url : `https://${url}`;
    const parsed = new URL(raw);
    return parsed.hostname.toLowerCase().replace(/^www\./, "");
  } catch {
    return url.toLowerCase().replace(/^https?:\/\//, "").replace(/^www\./, "").split(/[\/?#:]/)[0];
  }
}

export function isLocalDevDomain(domain: string): boolean {
  const d = domain.toLowerCase().replace(/^www\./, "");

  // 1. Loopback & Local TLDs (LocalWP, Valet, Laragon, etc.)
  if (
    d === "localhost" ||
    d === "127.0.0.1" ||
    d === "::1" ||
    d.endsWith(".localhost") ||
    d.endsWith(".local") ||
    d.endsWith(".test") ||
    d.endsWith(".example") ||
    d.endsWith(".invalid")
  ) {
    return true;
  }

  // 2. Private LAN IP ranges (office VMs, Docker, Vagrant, home labs)
  if (
    /^192\.168\.\d{1,3}\.\d{1,3}$/.test(d) ||
    /^10\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(d) ||
    /^172\.(1[6-9]|2\d|3[01])\.\d{1,3}\.\d{1,3}$/.test(d)
  ) {
    return true;
  }

  // 3. Dev tunneling & common staging hosting platforms
  if (
    d.endsWith(".ddev.site") ||
    d.endsWith(".lndo.site") ||
    d.endsWith(".loca.lt") ||
    d.endsWith(".nip.io") ||
    d.endsWith(".sslip.io") ||
    d.includes("ngrok") ||
    d.endsWith(".updraftclone.com") ||
    d.endsWith(".pantheonsite.io") ||
    d.endsWith(".kinsta.cloud") ||
    d.endsWith(".cloudwaysapps.com") ||
    d.endsWith(".flywheelsites.com") ||
    d.endsWith(".sg-host.com") ||
    d.endsWith(".wpengine.com")
  ) {
    return true;
  }

  // 4. Staging & dev subdomains (e.g. dev.domain.com, staging.domain.com, test.domain.com)
  const parts = d.split(".");
  if (parts.length >= 3) {
    const sub = parts[0];
    if (
      sub === "dev" ||
      sub === "staging" ||
      sub === "stage" ||
      sub === "test" ||
      sub === "sandbox" ||
      sub === "local" ||
      sub === "preview" ||
      sub.startsWith("dev-") ||
      sub.startsWith("staging-")
    ) {
      return true;
    }
  }

  return false;
}

export async function trackActivation(key: string, siteUrl: string): Promise<void> {
  const rec = await getLicense(key);
  if (!rec) return;
  const clean = siteUrl.toLowerCase().replace(/\/+$/, "");
  const domain = extractDomain(siteUrl);
  const activations = (rec.activations ?? []) as ActivationRecord[];
  const existingIdx = activations.findIndex(
    (a) => (a.domain && a.domain.toLowerCase() === domain) || a.site_url.toLowerCase().replace(/\/+$/, "") === clean
  );
  const now = Math.floor(Date.now() / 1000);
  if (existingIdx !== -1) {
    activations[existingIdx].at = now;
    activations[existingIdx].active = true;
    activations[existingIdx].domain = domain;
    activations[existingIdx].site_url = siteUrl.replace(/\/+$/, "");
    activations[existingIdx].deactivated_at = undefined;
    if (!activations[existingIdx].first_activated_at) {
      activations[existingIdx].first_activated_at = activations[existingIdx].at;
    }
  } else {
    activations.push({
      site_url: siteUrl.replace(/\/+$/, ""),
      domain,
      at: now,
      active: true,
      first_activated_at: now,
    });
  }
  activations.sort((a, b) => b.at - a.at);
  // Cap history at last 100 unique activations
  rec.activations = activations.slice(0, 100);
  await redis.set(KEY_LICENSE(key), rec);

  // Transfer domain ownership: deactivate this domain on any previous license
  try {
    const allLics = await getAllLicenses();
    for (const other of allLics) {
      if (other.key === key || !other.activations) continue;
      let changed = false;
      for (const a of other.activations) {
        const otherDom = (a.domain || extractDomain(a.site_url)).toLowerCase();
        if (otherDom === domain && a.active !== false) {
          a.active = false;
          a.deactivated_at = now;
          changed = true;
        }
      }
      if (changed) {
        await redis.set(KEY_LICENSE(other.key), other);
      }
    }
  } catch (err) {
    console.error("[trackActivation] domain ownership transfer error:", err);
  }
}

export async function trackDeactivation(key: string, siteUrl: string): Promise<void> {
  const rec = await getLicense(key);
  if (!rec) return;
  const clean = siteUrl.toLowerCase().replace(/\/+$/, "");
  const domain = extractDomain(siteUrl);
  const activations = (rec.activations ?? []) as ActivationRecord[];
  const existingIdx = activations.findIndex(
    (a) => (a.domain && a.domain.toLowerCase() === domain) || a.site_url.toLowerCase().replace(/\/+$/, "") === clean
  );
  const now = Math.floor(Date.now() / 1000);
  if (existingIdx !== -1) {
    activations[existingIdx].active = false;
    activations[existingIdx].deactivated_at = now;
    activations[existingIdx].at = now;
  } else {
    activations.push({
      site_url: siteUrl.replace(/\/+$/, ""),
      domain,
      at: now,
      active: false,
      deactivated_at: now,
      first_activated_at: now,
    });
  }
  activations.sort((a, b) => b.at - a.at);
  rec.activations = activations.slice(0, 100);
  await redis.set(KEY_LICENSE(key), rec);
}

export async function revokeLicense(key: string, reason: string): Promise<void> {
  const rec = await getLicense(key);
  if (!rec) return;
  rec.revoked = true;
  rec.revoked_at = Math.floor(Date.now() / 1000);
  rec.revoke_reason = reason;
  await redis.set(KEY_LICENSE(key), rec);
}

export async function unrevokeLicense(key: string): Promise<void> {
  const rec = await getLicense(key);
  if (!rec) return;
  rec.revoked = false;
  rec.revoked_at = undefined;
  rec.revoke_reason = undefined;
  await redis.set(KEY_LICENSE(key), rec);
}

export async function resetDomainAllowance(key: string): Promise<void> {
  const rec = await getLicense(key);
  if (!rec) return;
  const activations = (rec.activations ?? []) as ActivationRecord[];
  // Keep only active activations; clears historical/deactivated domain slots
  rec.activations = activations.filter((a) => a.active !== false);
  await redis.set(KEY_LICENSE(key), rec);
}

export async function changeLicenseTier(key: string, tier: LicenseTier): Promise<void> {
  const rec = await getLicense(key);
  if (!rec) return;
  rec.tier = tier;
  await redis.set(KEY_LICENSE(key), rec);
}

export async function alreadyProcessed(sessionId: string): Promise<boolean> {
  return (await redis.exists(KEY_BY_SESSION(sessionId))) === 1;
}

// ----- Admin queries -----

export async function countLicenses(): Promise<number> {
  return (await redis.zcard(KEY_INDEX_ALL)) ?? 0;
}

export async function listLicenseKeys(
  offset: number,
  limit: number,
): Promise<string[]> {
  // Newest first
  const raw = (await redis.zrange(KEY_INDEX_ALL, offset, offset + limit - 1, {
    rev: true,
  })) as string[] | null;
  return raw ?? [];
}

export async function getLicensesBatch(keys: string[]): Promise<LicenseRecord[]> {
  if (keys.length === 0) return [];
  const pipe = redis.pipeline();
  for (const k of keys) pipe.get(KEY_LICENSE(k));
  const res = (await pipe.exec()) as (LicenseRecord | null)[];
  return res.filter((r): r is LicenseRecord => !!r);
}

export async function getAllLicenses(): Promise<LicenseRecord[]> {
  const total = await countLicenses();
  if (total === 0) return [];
  const keys = await listLicenseKeys(0, total);
  return getLicensesBatch(keys);
}

export async function indexLicense(key: string, iat: number): Promise<void> {
  await redis.zadd(KEY_INDEX_ALL, { score: iat, member: key });
}

export async function appendAudit(entry: AuditEntry): Promise<void> {
  await redis.lpush(KEY_AUDIT, JSON.stringify(entry));
  await redis.ltrim(KEY_AUDIT, 0, 499);
}

export async function getAuditLog(limit = 50): Promise<AuditEntry[]> {
  const raw = (await redis.lrange(KEY_AUDIT, 0, limit - 1)) as (string | AuditEntry)[];
  return raw
    .map((r) => {
      if (typeof r === "string") {
        try { return JSON.parse(r) as AuditEntry; } catch { return null; }
      }
      return r;
    })
    .filter((e): e is AuditEntry => !!e);
}


export type ExpenseCategory =
  | "software_cloud"
  | "hardware_equipment"
  | "homeoffice"
  | "telecom_internet"
  | "travel_transit"
  | "payment_fees"
  | "marketing_domains"
  | "legal_consulting"
  | "other";

export interface ExpenseRecord {
  id: string;
  date: string; // YYYY-MM-DD
  amountCents: number;
  currency: string; // "eur" or "usd"
  vendor: string;
  description: string;
  category: ExpenseCategory;
  isRecurring?: boolean;
  recurringInterval?: "daily" | "monthly" | "yearly";
  taxDeductiblePct?: number; // default 100
  createdAt: number;
}


const KEY_EXPENSE     = (id: string) => `expense:${id}`;
const KEY_EXPENSES_ALL = "expenses:all";
const KEY_HOMEOFFICE   = (year: number) => `homeoffice:${year}`;

export async function saveExpense(record: ExpenseRecord): Promise<void> {
  const ts = Math.floor(new Date(record.date).getTime() / 1000) || record.createdAt;
  const pipe = redis.pipeline();
  pipe.set(KEY_EXPENSE(record.id), record);
  pipe.zadd(KEY_EXPENSES_ALL, { score: ts, member: record.id });
  await pipe.exec();
}

export async function getExpense(id: string): Promise<ExpenseRecord | null> {
  const rec = await redis.get<ExpenseRecord>(KEY_EXPENSE(id));
  return rec ?? null;
}

export async function deleteExpense(id: string): Promise<void> {
  const pipe = redis.pipeline();
  pipe.del(KEY_EXPENSE(id));
  pipe.zrem(KEY_EXPENSES_ALL, id);
  await pipe.exec();
}

export async function getAllExpenses(): Promise<ExpenseRecord[]> {
  const ids = (await redis.zrange(KEY_EXPENSES_ALL, 0, -1, { rev: true })) as string[];
  if (!ids || ids.length === 0) return [];
  const pipe = redis.pipeline();
  for (const id of ids) pipe.get(KEY_EXPENSE(id));
  const res = (await pipe.exec()) as (ExpenseRecord | null)[];
  return res.filter((r): r is ExpenseRecord => !!r);
}

// ── German Homeoffice-Pauschale (§ 4 Abs. 5 Satz 1 Nr. 6c EStG) ─────────────
// €6 per working day, max 210 days / €1,260 per calendar year
export async function logHomeofficeDay(dateStr: string): Promise<{ success: boolean; totalDays: number; message: string }> {
  const year = parseInt(dateStr.slice(0, 4), 10) || new Date().getFullYear();
  const existing = (await redis.smembers(KEY_HOMEOFFICE(year))) as string[];
  const currentCount = existing ? existing.length : 0;

  if (existing && existing.includes(dateStr)) {
    return { success: false, totalDays: currentCount, message: `Homeoffice day ${dateStr} is already logged.` };
  }

  if (currentCount >= 210) {
    return { success: false, totalDays: currentCount, message: "Annual statutory maximum of 210 days (€1,260) reached for this year." };
  }

  await redis.sadd(KEY_HOMEOFFICE(year), dateStr);
  const newCount = currentCount + 1;
  return { success: true, totalDays: newCount, message: `Logged homeoffice day ${dateStr} (€6.00 claimed, total ${newCount}/210 days).` };
}

export async function removeHomeofficeDay(dateStr: string): Promise<{ success: boolean; totalDays: number }> {
  const year = parseInt(dateStr.slice(0, 4), 10) || new Date().getFullYear();
  await redis.srem(KEY_HOMEOFFICE(year), dateStr);
  const days = (await redis.smembers(KEY_HOMEOFFICE(year))) as string[];
  return { success: true, totalDays: days ? days.length : 0 };
}

export async function getHomeofficeDays(year: number): Promise<string[]> {
  const days = (await redis.smembers(KEY_HOMEOFFICE(year))) as string[];
  return (days || []).sort().reverse();
}
