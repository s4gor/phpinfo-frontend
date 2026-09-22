import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { getLicense, trackActivation, extractDomain, isLocalDevDomain, type LicenseTier, type ActivationRecord } from "@/lib/db";
import { normalizeSiteUrl, parseLicenseKey, upgradeToV2Key } from "@/lib/license";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || "https://dummy.upstash.io",
  token: process.env.UPSTASH_REDIS_REST_TOKEN || "dummy",
});

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(30, "1 m"),
});

const TIER_LIMITS: Record<LicenseTier, number> = {
  single: 1,
  unlimited: Infinity,
  lifetime: Infinity,
};

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "127.0.0.1";
  const rl = await ratelimit.limit(ip);
  if (!rl.success) {
    return NextResponse.json({ valid: false, reason: "rate_limited" }, { status: 429 });
  }

  let licenseKey = "";
  let siteUrl = "";
  let pluginVersion = "";

  const ct = req.headers.get("content-type") || "";
  if (ct.includes("application/json")) {
    const body = await req.json().catch(() => ({}));
    licenseKey    = String(body.license_key || "");
    siteUrl       = String(body.site_url    || "");
    pluginVersion = String(body.plugin_v    || "");
  } else {
    const form = await req.formData().catch(() => null);
    if (form) {
      licenseKey    = String(form.get("license_key") || "");
      siteUrl       = String(form.get("site_url")    || "");
      pluginVersion = String(form.get("plugin_v")    || "");
    }
  }

  if (!licenseKey) {
    return NextResponse.json({ valid: false, reason: "missing_key" });
  }

  const payload = parseLicenseKey(licenseKey);
  if (!payload) {
    return NextResponse.json({ valid: false, reason: "bad_signature" });
  }

  if (payload.exp < Math.floor(Date.now() / 1000)) {
    return NextResponse.json({ valid: false, reason: "expired" });
  }

  let record = await getLicense(licenseKey);
  if (!record && licenseKey.startsWith("PIWP2-")) {
    const emailKeys = (await redis.smembers("email:" + payload.email.toLowerCase())) as string[];
    if (Array.isArray(emailKeys)) {
      for (const k of emailKeys) {
        const r = await getLicense(k);
        if (r) {
          record = r;
          break;
        }
      }
    }
  }

  if (!record) {
    return NextResponse.json({ valid: false, reason: "unknown_key" });
  }
  if (record.revoked) {
    return NextResponse.json({ valid: false, reason: record.revoke_reason || "revoked" });
  }

  const tier = record.tier;
  const limit = TIER_LIMITS[tier];
  const cleanSite = normalizeSiteUrl(siteUrl);
  const incomingDomain = cleanSite ? extractDomain(cleanSite) : "";
  const isLocal = isLocalDevDomain(incomingDomain);

  if (tier === "single" && cleanSite) {
    const activations = (record.activations ?? []) as ActivationRecord[];

    const registeredDomains = new Set<string>();
    for (const a of activations) {
      const dom = (a.domain || extractDomain(a.site_url)).toLowerCase();
      if (!isLocalDevDomain(dom)) {
        registeredDomains.add(dom);
      }
    }

    if (!isLocal) {
      if (!registeredDomains.has(incomingDomain)) {
        if (registeredDomains.size >= 2) {
          return NextResponse.json({
            valid: false,
            reason: "domain_migration_limit_reached",
            max_domains: 2,
            registered_domains: Array.from(registeredDomains),
          });
        }
      }

      const activeOther = activations.find((a) => {
        const dom = (a.domain || extractDomain(a.site_url)).toLowerCase();
        return a.active !== false && dom !== incomingDomain && !isLocalDevDomain(dom);
      });

      if (activeOther) {
        return NextResponse.json({
          valid: false,
          reason: "active_site_conflict",
          active_domain: activeOther.domain || extractDomain(activeOther.site_url),
        });
      }
    }
  } else if (limit !== Infinity && cleanSite) {
    const sites = new Set(
      (record.activations ?? []).map((a) => normalizeSiteUrl(a.site_url)),
    );
    sites.add(cleanSite);
    if (sites.size > limit) {
      return NextResponse.json({
        valid: false,
        reason: "site_limit_exceeded",
        limit,
      });
    }
  }

  if (cleanSite) {
    try {
      await trackActivation(record.key, cleanSite);
    } catch (err) {
      console.error("[validate] trackActivation failed", err);
    }
  }

  let upgradeKey: string | undefined;
  if (licenseKey.startsWith("PIWP-")) {
    try {
      const upgraded = upgradeToV2Key(licenseKey);
      if (upgraded) {
        upgradeKey = upgraded;
      }
    } catch (err) {
      console.warn("[validate] auto-upgrade to V2 key skipped:", err);
    }
  }

  return NextResponse.json({
    valid: true,
    tier,
    exp: payload.exp,
    email: payload.email,
    ...(upgradeKey ? { upgrade_key: upgradeKey } : {}),
  });
}

export async function GET() {
  return NextResponse.json({ ok: true, hint: "POST with license_key + site_url" });
}
