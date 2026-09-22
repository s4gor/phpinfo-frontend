"use client";

import { useEffect, useRef } from "react";
import { trackPurchase } from "@/lib/gtag";

interface PurchaseTrackerProps {
  transactionId: string;
  tier: string;
}

/**
 * Client component that fires the GA4 `purchase` event exactly once on mount.
 * Uses sessionStorage to guard against double-firing on refresh.
 */
export default function PurchaseTracker({ transactionId, tier }: PurchaseTrackerProps) {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    const key = `purchase_tracked_${transactionId}`;
    if (sessionStorage.getItem(key)) return;

    fired.current = true;
    sessionStorage.setItem(key, "1");
    trackPurchase({ transactionId, tier });
  }, [transactionId, tier]);

  return null;
}
