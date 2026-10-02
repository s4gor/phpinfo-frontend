"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { grantConsent } from "@/lib/gtag";

function getOrSetVisitorId(): string {
  if (typeof window === "undefined") return "anon";
  try {
    let vid = localStorage.getItem("_piwp_vid");
    if (!vid) {
      vid = "v_" + Math.random().toString(36).substring(2, 12) + Date.now().toString(36);
      localStorage.setItem("_piwp_vid", vid);
      document.cookie = `_piwp_vid=${vid}; path=/; max-age=31536000; SameSite=Lax`;
    }
    return vid;
  } catch {
    return "anon_" + Math.random().toString(36).substring(2, 8);
  }
}

function getOrSetSessionId(): string {
  if (typeof window === "undefined") return "sess_anon";
  try {
    let sid = sessionStorage.getItem("_piwp_sid");
    if (!sid) {
      sid = "s_" + Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
      sessionStorage.setItem("_piwp_sid", sid);
    }
    return sid;
  } catch {
    return "sess_fallback";
  }
}

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const startTimeRef = useRef<number>(Date.now());
  const activeSecondsRef = useRef<number>(0);
  const lastActiveRef = useRef<number>(Date.now());
  const maxScrollRef = useRef<number>(0);
  const scrollSentRef = useRef<Set<number>>(new Set());

  // Function to send event to analytics endpoint
  const sendEvent = (eventType: string, data: Record<string, unknown> = {}) => {
    try {
      const visitorId = getOrSetVisitorId();
      const sessionId = getOrSetSessionId();
      const payload = {
        type: eventType,
        visitorId,
        sessionId,
        path: window.location.pathname,
        url: window.location.href,
        referrer: document.referrer || "direct",
        title: document.title,
        screen: `${window.screen.width}x${window.screen.height}`,
        viewport: `${window.innerWidth}x${window.innerHeight}`,
        language: navigator.language || "en",
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC",
        platform: navigator.platform || "unknown",
        activeDuration: activeSecondsRef.current,
        totalDuration: Math.round((Date.now() - startTimeRef.current) / 1000),
        timestamp: Date.now(),
        ...data,
      };

      const body = JSON.stringify(payload);
      if (typeof navigator.sendBeacon === "function") {
        const blob = new Blob([body], { type: "application/json" });
        navigator.sendBeacon("/api/analytics", blob);
      } else {
        fetch("/api/analytics", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body,
          keepalive: true,
        }).catch(() => {});
      }
    } catch {
      // Quiet fallback
    }
  };

  useEffect(() => {
    // Ensure gtag tracking runs unrestricted
    grantConsent();

    startTimeRef.current = Date.now();
    activeSecondsRef.current = 0;
    maxScrollRef.current = 0;
    scrollSentRef.current = new Set();

    // 1. Send Pageview Event
    const utmParams: Record<string, string> = {};
    if (searchParams) {
      searchParams.forEach((value, key) => {
        if (key.startsWith("utm_") || key === "ref" || key === "source") {
          utmParams[key] = value;
        }
      });
    }

    sendEvent("pageview", { utm: utmParams });

    // 2. Active Engagement Timer (stops ticking if idle > 30s)
    const onUserActivity = () => {
      lastActiveRef.current = Date.now();
    };

    window.addEventListener("mousemove", onUserActivity, { passive: true });
    window.addEventListener("keydown", onUserActivity, { passive: true });
    window.addEventListener("scroll", onUserActivity, { passive: true });
    window.addEventListener("touchstart", onUserActivity, { passive: true });

    const engagementInterval = setInterval(() => {
      const now = Date.now();
      if (now - lastActiveRef.current < 30000 && !document.hidden) {
        activeSecondsRef.current += 1;
      }
    }, 1000);

    // 3. Heartbeat Every 15 seconds
    const heartbeatInterval = setInterval(() => {
      if (!document.hidden) {
        sendEvent("heartbeat", {
          activeSeconds: activeSecondsRef.current,
          maxScroll: maxScrollRef.current,
        });
      }
    }, 15000);

    // 4. Click Listener (Tracks ALL clicks, element tags, text, coordinates)
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const clickable = target.closest("a, button, [role='button'], input, th, tr, summary");
      const el = (clickable || target) as HTMLElement;

      const text = (el.innerText || el.getAttribute("aria-label") || el.getAttribute("title") || "").slice(0, 100).trim();
      const href = el.getAttribute("href") || (el as HTMLAnchorElement).href || "";
      const id = el.id || "";
      const role = el.getAttribute("role") || "";
      const className = el.className && typeof el.className === "string" ? el.className.slice(0, 100) : "";

      sendEvent("click", {
        tag: el.tagName.toLowerCase(),
        targetText: text,
        href: href || undefined,
        elementId: id || undefined,
        elementClass: className || undefined,
        role: role || undefined,
        x: Math.round(e.clientX),
        y: Math.round(e.clientY),
      });
    };

    document.addEventListener("click", handleClick, { capture: true, passive: true });

    // 5. Scroll Depth Tracking
    const handleScroll = () => {
      const h = document.documentElement;
      const b = document.body;
      const st = "scrollTop";
      const sh = "scrollHeight";
      const percent = Math.min(100, Math.round(((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100));

      if (percent > maxScrollRef.current) {
        maxScrollRef.current = percent;
      }

      const milestones = [25, 50, 75, 90, 100];
      for (const m of milestones) {
        if (percent >= m && !scrollSentRef.current.has(m)) {
          scrollSentRef.current.add(m);
          sendEvent("scroll_depth", { scrollDepth: m });
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // 6. Page Exit / Unload
    const handleUnload = () => {
      sendEvent("pageleave", {
        finalActiveDuration: activeSecondsRef.current,
        finalTotalDuration: Math.round((Date.now() - startTimeRef.current) / 1000),
        finalMaxScroll: maxScrollRef.current,
      });
    };

    const handleVisibility = () => {
      if (document.hidden) {
        sendEvent("tab_hidden", {
          activeSeconds: activeSecondsRef.current,
        });
      }
    };

    window.addEventListener("beforeunload", handleUnload);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      handleUnload();
      clearInterval(engagementInterval);
      clearInterval(heartbeatInterval);
      window.removeEventListener("mousemove", onUserActivity);
      window.removeEventListener("keydown", onUserActivity);
      window.removeEventListener("scroll", onUserActivity);
      window.removeEventListener("touchstart", onUserActivity);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClick, { capture: true });
      window.removeEventListener("beforeunload", handleUnload);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [pathname, searchParams]);

  return null;
}
