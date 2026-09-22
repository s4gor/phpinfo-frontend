"use client";

import { useState } from "react";
import { formatMoney } from "./format";

interface BarChartProps {
  data: Array<Record<string, unknown>>;
  color?: string;
  valueKey?: string;
}

export function BarChart({ data, color = "#7c3aed", valueKey = "sales" }: BarChartProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const values = data.map((d) => (d[valueKey] as number) ?? 0);
  const max = Math.max(...values, 1);

  return (
    <div className="relative flex h-28 items-end gap-px pt-6">
      {values.map((v, i) => {
        const item = data[i];
        
        // Extract label (e.g. "2026-05" -> "May 2026" or similar)
        let label = String(item.date ?? item.month ?? `Item ${i + 1}`);
        if (item.month) {
          const [yr, mo] = String(item.month).split("-");
          const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
          const moIdx = parseInt(mo, 10) - 1;
          if (moIdx >= 0 && moIdx < 12) {
            label = `${months[moIdx]} 20${yr.slice(2)}`;
          }
        } else if (item.date) {
          const [, mo, dy] = String(item.date).split("-");
          const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
          const moIdx = parseInt(mo, 10) - 1;
          if (moIdx >= 0 && moIdx < 12) {
            label = `${months[moIdx]} ${dy}`;
          }
        }

        // Format tooltip value
        let displayValue = String(v);
        if (valueKey.toLowerCase().includes("cents")) {
          displayValue = formatMoney(v);
        } else {
          const suffix = valueKey === "sales" ? (v === 1 ? " sale" : " sales") : (v === 1 ? " activation" : " activations");
          displayValue = `${v}${suffix}`;
        }

        const isHovered = hoveredIdx === i;

        return (
          <div
            key={i}
            className="group relative h-full flex-1 flex items-end cursor-pointer"
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
          >
            {/* The bar itself */}
            <div
              className="w-full rounded-t transition-all duration-200"
              style={{
                height: `${Math.max(v > 0 ? 5 : 0, (v / max) * 100)}%`,
                backgroundColor: isHovered ? `${color}e6` : color,
                boxShadow: isHovered ? `0 0 10px ${color}80` : "none",
              }}
            />

            {/* Interactive tooltip */}
            {isHovered && (
              <div 
                className="absolute bottom-full mb-1.5 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex flex-col items-center animate-in fade-in slide-in-from-bottom-1 duration-150"
              >
                <div className="rounded-lg bg-zinc-900 px-2.5 py-1.5 text-[10px] font-semibold text-white shadow-lg border border-zinc-800 whitespace-nowrap">
                  <div className="text-zinc-400 font-normal text-center">{label}</div>
                  <div className="text-violet-300 font-mono mt-0.5 text-center">{displayValue}</div>
                </div>
                {/* Arrow */}
                <div className="w-1.5 h-1.5 bg-zinc-900 rotate-45 -mt-1 border-r border-b border-zinc-800" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
