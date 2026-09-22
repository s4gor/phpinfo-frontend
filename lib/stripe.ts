import Stripe from "stripe";
import type { LicenseTier } from "./db";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_dummy", {
  apiVersion: "2025-02-24.acacia" as any,
  typescript: true,
});

/**
 * Maps a tier key to its Stripe Price ID. Set these in your .env.local after
 * creating Products + Prices in the Stripe Dashboard.
 *
 *  - Single & Unlimited use `mode: 'subscription'` (annual recurring).
 *  - Lifetime uses `mode: 'payment'` (one-time).
 */
export const TIER_PRICES: Record<LicenseTier, string> = {
  single:    process.env.STRIPE_PRICE_SINGLE    || "",
  unlimited: process.env.STRIPE_PRICE_UNLIMITED || "",
  lifetime:  process.env.STRIPE_PRICE_LIFETIME  || "",
};

export const TIER_MODE: Record<LicenseTier, "subscription" | "payment"> = {
  single:    "subscription",
  unlimited: "subscription",
  lifetime:  "payment",
};

export function isValidTier(t: unknown): t is LicenseTier {
  return t === "single" || t === "unlimited" || t === "lifetime";
}

export const INVOICE_RENDERING_TEMPLATE = "inrtem_1UFXDUA5ZOqwpennASgPSfzv";
