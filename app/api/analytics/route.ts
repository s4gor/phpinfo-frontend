import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/db";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Extract real client IP
    const forwarded = req.headers.get("x-forwarded-for");
    const realIp = req.headers.get("x-real-ip");
    const cfConnectingIp = req.headers.get("cf-connecting-ip");
    const ip = (cfConnectingIp || (forwarded ? forwarded.split(",")[0].trim() : null) || realIp || "127.0.0.1").replace(/^::ffff:/, "");

    // Extract Country / Location headers (Cloudflare, Vercel, Proxies)
    const country =
      req.headers.get("cf-ipcountry") ||
      req.headers.get("x-vercel-ip-country") ||
      req.headers.get("x-country-code") ||
      "Unknown";
    const city =
      req.headers.get("x-vercel-ip-city") ||
      req.headers.get("cf-ipcity") ||
      "";
    const region =
      req.headers.get("x-vercel-ip-country-region") ||
      req.headers.get("cf-region") ||
      "";
    const userAgent = req.headers.get("user-agent") || "Unknown";

    const enrichedEvent = {
      ...body,
      ip,
      country,
      city,
      region,
      userAgent,
      serverTime: Date.now(),
      isoTime: new Date().toISOString(),
    };

    // Print live telemetry to server console for immediate visibility
    const type = body.type || "event";
    const path = body.path || "/";
    const extra = body.targetText ? `-> "${body.targetText}"` : body.scrollDepth ? `${body.scrollDepth}% scrolled` : body.duration ? `${body.duration}s active` : "";
    console.log(`[Telemetry] [${country}] IP:${ip} | ${type.toUpperCase()} ${path} ${extra} (Vid: ${body.visitorId?.slice(0, 8) || "anon"})`);

    // Store in Redis with error safety
    try {
      if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_URL !== "https://dummy.upstash.io") {
        const pipe = redis.pipeline();
        pipe.lpush("analytics:events:raw", JSON.stringify(enrichedEvent));
        pipe.ltrim("analytics:events:raw", 0, 9999); // keep last 10,000 events
        pipe.hincrby("analytics:stats", `type:${type}`, 1);
        if (country && country !== "Unknown") {
          pipe.hincrby("analytics:countries", country, 1);
        }
        if (body.visitorId) {
          pipe.sadd("analytics:visitors:unique", body.visitorId);
        }
        await pipe.exec();
      }
    } catch (err) {
      console.warn("[Analytics DB Warn]", (err as Error).message);
    }

    return NextResponse.json({ ok: true, ip, country });
  } catch (error) {
    console.error("[Analytics API Error]", error);
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
