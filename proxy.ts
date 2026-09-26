import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isMaintenanceMode } from "@/lib/maintenance";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Pass through Next.js internal files, API endpoints, and static assets
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico" ||
    pathname === "/icon.svg" ||
    pathname === "/icon.ico" ||
    pathname === "/logo.svg" ||
    pathname.match(/\.(svg|png|jpg|jpeg|gif|webp|ico|css|js|txt|xml|woff|woff2|ttf)$/i)
  ) {
    return NextResponse.next();
  }

  // 2. If maintenance mode is active (production), lock down all main site pages
  if (isMaintenanceMode()) {
    if (pathname === "/maintenance") {
      return NextResponse.next();
    }

    // Rewrite every main site page to the maintenance page
    const maintenanceUrl = new URL("/maintenance", request.url);
    const response = NextResponse.rewrite(maintenanceUrl);
    response.headers.set("x-maintenance-mode", "active");
    response.headers.set("Retry-After", "86400");
    return response;
  }

  // 3. In local dev (or once maintenance is turned off): allow all pages normally
  return NextResponse.next();
}

export default proxy;

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
