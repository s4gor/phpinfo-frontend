import crypto from "crypto";

export const ED25519_PUB = "IQLJxAElu4pgVtSoh1KB7aZ4GIUrmJpxaQOu0/gL7Sc=";

function getHmacSecret(): string {
  const secret = process.env.LICENSE_HMAC_SECRET || "";
  if (!secret && process.env.NODE_ENV === "production") {
    throw new Error("LICENSE_HMAC_SECRET is required");
  }
  return secret || "dummy";
}

function hmacKey(): Buffer {
  return crypto.createHash("sha256").update(getHmacSecret()).digest();
}

function base64Url(input: string | Buffer): string {
  const buf = typeof input === "string" ? Buffer.from(input, "utf8") : input;
  return buf
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function base64UrlDecode(input: string): Buffer {
  const pad = input.length % 4 === 0 ? "" : "=".repeat(4 - (input.length % 4));
  return Buffer.from(input.replace(/-/g, "+").replace(/_/g, "/") + pad, "base64");
}

export interface LicensePayload {
  email: string;
  url: string;
  exp: number;
  iat: number;
}

export function normalizeSiteUrl(siteUrl: string): string {
  return siteUrl.toLowerCase().replace(/\/+$/, "");
}

function getEd25519PrivateKey(): crypto.KeyObject {
  const privB64 = process.env.ED25519_PRIVATE_KEY || "";
  if (!privB64) {
    throw new Error("ED25519_PRIVATE_KEY is missing from environment");
  }
  const privRaw = Buffer.from(privB64, "base64");
  const seed = privRaw.subarray(0, 32);
  const pkcs8Prefix = Buffer.from("302e020100300506032b657004220420", "hex");
  const pkcs8Key = Buffer.concat([pkcs8Prefix, seed]);
  return crypto.createPrivateKey({ key: pkcs8Key, format: "der", type: "pkcs8" });
}

function getEd25519PublicKey(): crypto.KeyObject {
  const spkiPrefix = Buffer.from("302a300506032b6570032100", "hex");
  const spkiKey = Buffer.concat([spkiPrefix, Buffer.from(ED25519_PUB, "base64")]);
  return crypto.createPublicKey({ key: spkiKey, format: "der", type: "spki" });
}

/**
 * Generates a modern PIWP2- Ed25519 license key.
 */
export function generateLicenseKey(
  email: string,
  siteUrl: string,
  expiryTs: number,
  iat?: number,
): string {
  const payload: LicensePayload = {
    email,
    url: normalizeSiteUrl(siteUrl),
    exp: expiryTs,
    iat: iat || Math.floor(Date.now() / 1000),
  };

  const payloadJson = JSON.stringify(payload).replace(/\//g, "\\/");
  const b64Payload = base64Url(payloadJson);

  const privateKey = getEd25519PrivateKey();
  const sigRaw = crypto.sign(null, Buffer.from(payloadJson, "utf8"), privateKey);
  const b64Sig = base64Url(sigRaw);

  return `PIWP2-${b64Payload}-${b64Sig}`;
}

/**
 * Converts a legacy PIWP- key into a modern PIWP2- key with matching claims.
 */
export function upgradeToV2Key(legacyKey: string): string | null {
  const payload = parseLicenseKey(legacyKey);
  if (!payload) return null;
  return generateLicenseKey(payload.email, payload.url, payload.exp, payload.iat);
}

/**
 * Parses and verifies either a PIWP2- (Ed25519) or legacy PIWP- (HMAC) license key.
 */
export function parseLicenseKey(key: string): LicensePayload | null {
  const firstDash = key.indexOf("-");
  const secondDash = key.indexOf("-", firstDash + 1);
  if (firstDash === -1 || secondDash === -1) return null;

  const prefix = key.slice(0, firstDash);
  const b64Payload = key.slice(firstDash + 1, secondDash);
  const b64Sig = key.slice(secondDash + 1);

  // Modern Ed25519 verification
  if (prefix === "PIWP2") {
    const payloadRaw = base64UrlDecode(b64Payload);
    const sigRaw = base64UrlDecode(b64Sig);

    if (sigRaw.length !== 64) return null;

    try {
      const publicKey = getEd25519PublicKey();
      const verified = crypto.verify(null, payloadRaw, publicKey, sigRaw);
      if (!verified) return null;

      const payload = JSON.parse(payloadRaw.toString("utf8")) as LicensePayload;
      if (!payload?.email || !payload?.url || !payload?.exp) return null;
      return payload;
    } catch {
      return null;
    }
  }

  // Legacy HMAC verification
  if (prefix === "PIWP") {
    const expected = crypto
      .createHmac("sha256", hmacKey())
      .update(b64Payload)
      .digest("hex")
      .slice(0, 32);

    if (b64Sig.length !== expected.length) return null;
    if (!crypto.timingSafeEqual(Buffer.from(b64Sig), Buffer.from(expected))) return null;

    try {
      const payload = JSON.parse(base64UrlDecode(b64Payload).toString("utf8")) as LicensePayload;
      if (!payload?.email || !payload?.url || !payload?.exp) return null;
      return payload;
    } catch {
      return null;
    }
  }

  return null;
}

export function expiryForTier(tier: "single" | "unlimited" | "lifetime"): number {
  const now = Math.floor(Date.now() / 1000);
  if (tier === "lifetime") return 4070908800; // 2099-01-01
  return now + 365 * 24 * 60 * 60;
}
