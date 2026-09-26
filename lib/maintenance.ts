/**
 * =====================================================================
 * MAINTENANCE MODE CONFIGURATION
 * =====================================================================
 *
 * To turn maintenance mode OFF and launch your main site in production:
 *   Change `MAINTENANCE_ACTIVE_IN_PROD = false` below, OR
 *   Set `MAINTENANCE_MODE=false` in Vercel Environment Variables.
 */

// 👉 Set to `false` when you are ready to open the main site in production!
export const MAINTENANCE_ACTIVE_IN_PROD = true;

export function isMaintenanceMode(): boolean {
  // 1. Environment variable override (if set in Vercel or .env.local)
  const envVal =
    process.env.MAINTENANCE_MODE ??
    process.env.NEXT_PUBLIC_MAINTENANCE_MODE;

  if (envVal === "true") return true;
  if (envVal === "false") return false;

  // 2. Check if we are running in production
  const isProd =
    process.env.NODE_ENV === "production" ||
    process.env.VERCEL_ENV === "production";

  // In production, follow the flag above (defaults to true).
  // In local development, always false so you can work freely.
  return isProd && MAINTENANCE_ACTIVE_IN_PROD;
}
