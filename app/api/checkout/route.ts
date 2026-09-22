import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { stripe, TIER_PRICES, TIER_MODE, isValidTier, INVOICE_RENDERING_TEMPLATE } from "@/lib/stripe";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || "https://dummy.upstash.io",
  token: process.env.UPSTASH_REDIS_REST_TOKEN || "dummy",
});

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "1 m"),
});

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "127.0.0.1";
  const rl = await ratelimit.limit(ip);
  if (!rl.success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const tier = (body as { tier?: string })?.tier;
  if (!isValidTier(tier)) {
    return NextResponse.json({ error: "Invalid tier" }, { status: 400 });
  }

  const priceId = TIER_PRICES[tier];
  if (!priceId) {
    return NextResponse.json({ error: "Tier not configured" }, { status: 500 });
  }

  const origin =
    process.env.NEXT_PUBLIC_SITE_URL ||
    req.headers.get("origin") ||
    "https://exeebit.com";

  try {
    const session = await stripe.checkout.sessions.create({
      mode: TIER_MODE[tier],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/buy/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/buy/cancel`,
      allow_promotion_codes: true,
      automatic_tax: { enabled: true },
      customer_creation: TIER_MODE[tier] === "payment" ? "always" : undefined,
      invoice_creation:
        TIER_MODE[tier] === "payment"
          ? {
              enabled: true,
              invoice_data: {
                rendering_options: {
                  template: INVOICE_RENDERING_TEMPLATE,
                } as any,
              },
            }
          : undefined,
      billing_address_collection: "required",
      metadata: { tier },
      // For subscription mode, push tier into subscription metadata so the
      // webhook can recover it from invoice events too.
      subscription_data:
        TIER_MODE[tier] === "subscription"
          ? { metadata: { tier } }
          : undefined,
    });

    return NextResponse.json({ url: session.url, id: session.id });
  } catch (err) {
    console.error("[checkout] stripe error", err);
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}
