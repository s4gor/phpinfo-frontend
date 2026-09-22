import { NextResponse } from "next/server";

export const revalidate = 21600; // re-fetch from WP.org every 6 hours

export async function GET() {
  try {
    const res = await fetch(
      "https://api.wordpress.org/plugins/info/1.2/?action=plugin_information&request[slug]=phpinfo-wp",
      { next: { revalidate: 21600 } }
    );

    if (!res.ok) {
      return NextResponse.json({ error: "WP API error" }, { status: 502 });
    }

    const data = await res.json();

    return NextResponse.json({
      rating: data.rating ?? null,
      last_updated: data.last_updated ?? null,
      version: data.version ?? "7.2.3",
      active_installs: data.active_installs ?? 3000,
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
