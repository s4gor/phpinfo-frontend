"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  saveConsentPreferences,
  getStoredPreferences,
  type CookiePreferences,
} from "@/lib/gtag";
import {
  ShieldCheck,
  Lock,
  Activity,
  Sliders,
  Check,
  X,
  Cookie,
  ExternalLink,
} from "lucide-react";

export default function ConsentBanner() {
  const [mounted, setMounted] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // Granular settings state
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const ack = localStorage.getItem("phpinfo_consent_ack_v3");
      const prefs = getStoredPreferences();
      if (prefs) {
        setAnalytics(prefs.analytics);
        setMarketing(prefs.marketing);
      }
      if (!ack) {
        setBannerVisible(true);
      }
    } catch {
      setBannerVisible(true);
    }

    // Listen for custom trigger to reopen settings from anywhere (e.g. footer)
    const handleOpenSettings = () => {
      const current = getStoredPreferences();
      if (current) {
        setAnalytics(current.analytics);
        setMarketing(current.marketing);
      }
      setModalOpen(true);
    };

    window.addEventListener("open-cookie-settings", handleOpenSettings);
    return () => {
      window.removeEventListener("open-cookie-settings", handleOpenSettings);
    };
  }, []);

  if (!mounted) return null;

  const handleAcceptAll = () => {
    try { localStorage.setItem("phpinfo_consent_ack_v3", "true"); } catch {}
    saveConsentPreferences({ analytics: true, marketing: true });
    setAnalytics(true);
    setMarketing(true);
    setBannerVisible(false);
    setModalOpen(false);
  };

  const handleRejectNonEssential = () => {
    try { localStorage.setItem("phpinfo_consent_ack_v3", "true"); } catch {}
    saveConsentPreferences({ analytics: true, marketing: false });
    setAnalytics(false);
    setMarketing(false);
    setBannerVisible(false);
    setModalOpen(false);
  };

  const handleSaveCustom = () => {
    try { localStorage.setItem("phpinfo_consent_ack_v3", "true"); } catch {}
    saveConsentPreferences({ analytics: true, marketing });
    setBannerVisible(false);
    setModalOpen(false);
  };

  return (
    <>
      {/* Floating Compact Banner */}
      {bannerVisible && !modalOpen && (
        <aside
          role="dialog"
          aria-label="Cookie consent banner"
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 z-[9990] max-w-lg animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="relative overflow-hidden rounded-2xl border border-zinc-200/90 bg-white/95 p-5 sm:p-6 shadow-2xl backdrop-blur-md dark:border-zinc-800/90 dark:bg-zinc-900/95">
            {/* Top decorative gradient bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-600 via-purple-500 to-indigo-600" />

            <div className="flex items-start gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-950/60 dark:text-violet-400 shadow-2xs">
                <Cookie className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    Cookie &amp; Privacy Choices
                  </h3>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/50 px-2 py-0.5 rounded-full border border-violet-200/60 dark:border-violet-800/50">
                    GDPR
                  </span>
                </div>
                <p className="mt-1.5 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  We use essential cookies for secure sessions and license verification. With your permission, we also use anonymous analytics to optimize documentation and server health tools.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-4 flex flex-col sm:flex-row items-center gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
              <button
                onClick={() => setModalOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors">
                <Sliders className="h-3.5 w-3.5" />
                <span>Customize</span>
              </button>

              <div className="flex w-full sm:w-auto items-center gap-2 sm:ml-auto">
                <button
                  onClick={handleRejectNonEssential}
                  className="flex-1 sm:flex-none rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700/80 transition-all">
                  Essential Only
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="flex-1 sm:flex-none rounded-xl bg-violet-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-violet-700 active:scale-[0.98] transition-all">
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </aside>
      )}

      {/* Advanced Settings Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-modal-title"
            className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl border border-zinc-200 bg-white p-6 sm:p-7 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900 animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-100 text-violet-600 dark:bg-violet-950 dark:text-violet-400 shadow-2xs">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h2
                    id="cookie-modal-title"
                    className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100">
                    Cookie Preference Center
                  </h2>
                  <p className="text-xs text-zinc-500">
                    GDPR &bull; ePrivacy Directive &bull; Consent Mode v2
                  </p>
                </div>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="rounded-xl p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 transition-colors"
                aria-label="Close cookie preferences">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Description */}
            <p className="py-4 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              When you visit phpinfo.io, we store small files on your device to make the site work securely, remember your preferences, and anonymously analyze documentation reading behavior. Strictly necessary cookies cannot be disabled.
            </p>

            {/* Categories */}
            <div className="space-y-3.5">
              {/* Category 1: Strictly Necessary */}
              <div className="rounded-2xl border border-zinc-200/80 bg-zinc-50/70 p-4 dark:border-zinc-800 dark:bg-zinc-800/40">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <Lock className="h-4 w-4 text-emerald-600 shrink-0" />
                    <div>
                      <h4 className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                        Strictly Necessary Cookies
                      </h4>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    <Check className="h-3 w-3" />
                    Always Active
                  </span>
                </div>
                <p className="mt-2 text-xs text-zinc-500 leading-relaxed">
                  Required for site navigation, Stripe checkout security, CSRF protection, and license key activations. These cookies do not store personally identifiable advertising information.
                </p>
              </div>

              {/* Category 2: Performance & Analytics */}
              <div className="rounded-2xl border border-zinc-200/80 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900/50 shadow-2xs">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <Activity className="h-4 w-4 text-violet-600 shrink-0" />
                    <div>
                      <h4 className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                        Performance &amp; Analytics
                      </h4>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={analytics}
                      onChange={(e) => setAnalytics(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-10 h-6 bg-zinc-200 peer-focus:outline-hidden rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
                  </label>
                </div>
                <p className="mt-2 text-xs text-zinc-500 leading-relaxed">
                  Helps us measure anonymous page traffic, documentation search queries, and navigation paths via Google Analytics (Consent Mode v2 with IP anonymization) so we can improve content.
                </p>
              </div>

              {/* Category 3: Functional & Marketing */}
              <div className="rounded-2xl border border-zinc-200/80 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900/50 shadow-2xs">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <Sliders className="h-4 w-4 text-indigo-600 shrink-0" />
                    <div>
                      <h4 className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                        Marketing &amp; Attribution
                      </h4>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={marketing}
                      onChange={(e) => setMarketing(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-10 h-6 bg-zinc-200 peer-focus:outline-hidden rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
                  </label>
                </div>
                <p className="mt-2 text-xs text-zinc-500 leading-relaxed">
                  Used to evaluate campaign attribution from WordPress.org, GitHub, and community newsletters. Never sold or shared with third-party ad brokers.
                </p>
              </div>
            </div>

            {/* Privacy Links */}
            <div className="mt-4 pt-3 flex items-center justify-between text-xs text-zinc-500 border-t border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center gap-3">
                <Link
                  href="/privacy"
                  onClick={() => setModalOpen(false)}
                  className="hover:text-violet-600 underline underline-offset-2 flex items-center gap-1">
                  <span>Privacy Policy</span>
                  <ExternalLink className="h-3 w-3" />
                </Link>
                <span>&bull;</span>
                <Link
                  href="/impressum"
                  onClick={() => setModalOpen(false)}
                  className="hover:text-violet-600 underline underline-offset-2 flex items-center gap-1">
                  <span>Impressum</span>
                  <ExternalLink className="h-3 w-3" />
                </Link>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-end gap-2.5 pt-4 border-t border-zinc-100 dark:border-zinc-800">
              <button
                type="button"
                onClick={handleRejectNonEssential}
                className="w-full sm:w-auto rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-xs font-semibold text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700/80 transition-all">
                Reject Non-Essential
              </button>
              <button
                type="button"
                onClick={handleSaveCustom}
                className="w-full sm:w-auto rounded-xl border border-violet-200 bg-violet-50 px-4 py-2.5 text-xs font-semibold text-violet-700 hover:bg-violet-100 dark:border-violet-900/60 dark:bg-violet-950 dark:text-violet-300 dark:hover:bg-violet-900/60 transition-all">
                Save My Choices
              </button>
              <button
                type="button"
                onClick={handleAcceptAll}
                className="w-full sm:w-auto rounded-xl bg-violet-600 px-5 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-violet-700 active:scale-[0.98] transition-all">
                Accept All
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
