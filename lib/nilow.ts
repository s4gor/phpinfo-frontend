export const NILOW_PACKAGE = "com.nilow.app";

export const NILOW_PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.nilow.app";

export const NILOW_VERSION = "1.0.0";

/** Deep-link scheme handled by the app in addition to https://exeebit.com/nilow/g/<code>. */
export const NILOW_SCHEME = "nilow";

export const NILOW_SUPPORT_EMAIL = "support@exeebit.com";

/** Builds the canonical web invite link for a group code. */
export function nilowInviteUrl(code: string): string {
  return `https://exeebit.com/nilow/g/${code}`;
}
