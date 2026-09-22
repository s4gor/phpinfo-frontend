import { NextResponse } from "next/server";
import { getAllLicenses } from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 60;

// Public, unauthenticated. Only exposes aggregate counts - no PII.
export async function GET() {
  try {
    const all = await getAllLicenses();
    const lifetimeSold  = all.filter((l) => l.tier === "lifetime"  && !l.revoked).length;
    const unlimitedSold = all.filter((l) => l.tier === "unlimited" && !l.revoked).length;
    return NextResponse.json(
      { lifetimeSold, unlimitedSold },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
      },
    );
  } catch (err) {
    return NextResponse.json({ lifetimeSold: null }, { status: 200 });
  }
}
