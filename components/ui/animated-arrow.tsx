"use client";

import React, { useId } from "react";
import { cn } from "@/lib/utils";

interface AnimatedArrowProps {
  className?: string;
}

/**
 * 1:1 Authentic Stripe Button Arrow (as seen on stripe.com "Contact sales"):
 * - Rest state: renders Stripe's exact chevron (width: 5, height: 8)
 * - Hover state (.group:hover): the arrow-group slides 6px right with cubic-bezier(0.25, 1, 0.5, 1)
 *   while the shaft emerges from the clip-path and fades in, seamlessly slotting into the chevron
 *   to form Stripe's iconic single arrow.
 */
export function AnimatedArrow({ className }: AnimatedArrowProps) {
  const clipId = useId();

  return (
    <span
      className={cn(
        "stripe-arrow-container inline-flex items-center shrink-0 align-middle select-none",
        className
      )}
      aria-hidden="true"
    >
      <svg
        className="stripe-hover-arrow"
        width="5"
        height="8"
        viewBox="0 0.5 5 8"
        fill="none"
      >
        <defs>
          <clipPath id={clipId}>
            <rect x="0" y="0" width="12" height="9" />
          </clipPath>
        </defs>
        <g clipPath={`url(#${clipId})`}>
          <g className="stripe-arrow-group">
            {/* Stripe shaft: emerges from x=0 as the group slides forward, growing into the arrow */}
            <rect
              className="stripe-arrow-shaft"
              x="-10"
              y="3.375"
              width="13"
              height="1.75"
              fill="currentColor"
            />
            {/* Stripe chevron: exactly 5x8 */}
            <path
              d="M4.84766 3.63379L5.45898 4.25L4.84766 4.86621L1.24219 8.49902L0 7.2666L2.99316 4.24902L0 1.23242L1.24219 0L4.84766 3.63379Z"
              fill="currentColor"
            />
          </g>
        </g>
      </svg>
    </span>
  );
}

export default AnimatedArrow;
