"use client";

import { useState, useMemo } from "react";
import { formatMoney } from "./format";

export interface DataPoint {
  label: string; // "2026-06-15" or "2026-06"
  sales: number;
  revenueCents: number;
}

interface TrendChartProps {
  data30: DataPoint[];
  data90: DataPoint[];
  data12m: DataPoint[];
}

export function TrendChart({ data30, data90, data12m }: TrendChartProps) {
  const [range, setRange] = useState<"30d" | "90d" | "12m">("30d");
  const [metric, setMetric] = useState<"revenue" | "sales">("revenue");
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const activeData = useMemo(() => {
    if (range === "90d") return data90;
    if (range === "12m") return data12m;
    return data30;
  }, [range, data30, data90, data12m]);

  const values = useMemo(() => {
    return activeData.map((d) => (metric === "revenue" ? d.revenueCents : d.sales));
  }, [activeData, metric]);

  const maxVal = Math.max(...values, metric === "revenue" ? 1000 : 1);
  const totalVal = values.reduce((s, v) => s + v, 0);
  const avgVal = Math.round(totalVal / (values.length || 1));
  const peakVal = Math.max(...values, 0);

  // SVG dimensions
  const width = 800;
  const height = 220;
  const padding = { top: 20, right: 15, bottom: 25, left: 15 };

  const usableW = width - padding.left - padding.right;
  const usableH = height - padding.top - padding.bottom;

  const points = useMemo(() => {
    if (values.length === 0) return [];
    const step = usableW / (values.length - 1 || 1);
    return values.map((val, i) => {
      const x = padding.left + i * step;
      const y = padding.top + usableH - (val / maxVal) * usableH;
      return { x, y, val, item: activeData[i] };
    });
  }, [values, maxVal, usableW, usableH, padding.left, padding.top, activeData]);

  // Smooth bezier path string
  const pathD = useMemo(() => {
    if (points.length < 2) return "";
    return points.reduce((acc, p, i, arr) => {
      if (i === 0) return `M ${p.x} ${p.y}`;
      const prev = arr[i - 1];
      const cx = (prev.x + p.x) / 2;
      return `${acc} C ${cx} ${prev.y}, ${cx} ${p.y}, ${p.x} ${p.y}`;
    }, "");
  }, [points]);

  const areaD = useMemo(() => {
    if (!pathD || points.length === 0) return "";
    const last = points[points.length - 1];
    const first = points[0];
    return `${pathD} L ${last.x} ${height - padding.bottom} L ${first.x} ${height - padding.bottom} Z`;
  }, [pathD, points, height, padding.bottom]);

  const activePoint = hoveredIdx !== null && points[hoveredIdx] ? points[hoveredIdx] : null;

  return (
    <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 sm:p-6 shadow-sm">
      {/* Header controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold text-zinc-900">Performance Velocity</h2>
            <span className="rounded-full bg-violet-50 px-2 py-0.5 text-[10px] font-semibold text-violet-700 border border-violet-100 uppercase tracking-wide">
              {metric === "revenue" ? "Gross Revenue" : "License Volume"}
            </span>
          </div>
          <div className="mt-1 flex items-baseline gap-3">
            <span className="text-2xl font-bold tracking-tight text-zinc-900 font-mono">
              {metric === "revenue" ? formatMoney(totalVal) : `${totalVal} licenses`}
            </span>
            <span className="text-xs text-zinc-400">
              Avg: {metric === "revenue" ? formatMoney(avgVal) : `${avgVal}/period`} · Peak:{" "}
              {metric === "revenue" ? formatMoney(peakVal) : peakVal}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Metric toggle */}
          <div className="flex rounded-lg border border-zinc-200 p-0.5 bg-zinc-50 text-xs">
            <button
              onClick={() => setMetric("revenue")}
              className={`rounded-md px-2.5 py-1 font-medium transition-colors ${
                metric === "revenue" ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-500 hover:text-zinc-800"
              }`}
            >
              Revenue
            </button>
            <button
              onClick={() => setMetric("sales")}
              className={`rounded-md px-2.5 py-1 font-medium transition-colors ${
                metric === "sales" ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-500 hover:text-zinc-800"
              }`}
            >
              Licenses
            </button>
          </div>

          {/* Range toggle */}
          <div className="flex rounded-lg border border-zinc-200 p-0.5 bg-zinc-50 text-xs">
            <button
              onClick={() => { setRange("30d"); setHoveredIdx(null); }}
              className={`rounded-md px-2.5 py-1 font-medium transition-colors ${
                range === "30d" ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-500 hover:text-zinc-800"
              }`}
            >
              30D
            </button>
            <button
              onClick={() => { setRange("90d"); setHoveredIdx(null); }}
              className={`rounded-md px-2.5 py-1 font-medium transition-colors ${
                range === "90d" ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-500 hover:text-zinc-800"
              }`}
            >
              90D
            </button>
            <button
              onClick={() => { setRange("12m"); setHoveredIdx(null); }}
              className={`rounded-md px-2.5 py-1 font-medium transition-colors ${
                range === "12m" ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-500 hover:text-zinc-800"
              }`}
            >
              12M
            </button>
          </div>
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="relative mt-4 w-full select-none">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-[180px] sm:h-[220px] overflow-visible"
        >
          <defs>
            <linearGradient id="gradientViolet" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="gradientCyan" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line
            x1={padding.left}
            y1={padding.top}
            x2={width - padding.right}
            y2={padding.top}
            stroke="#f4f4f5"
            strokeDasharray="4 4"
          />
          <line
            x1={padding.left}
            y1={padding.top + usableH / 2}
            x2={width - padding.right}
            y2={padding.top + usableH / 2}
            stroke="#f4f4f5"
            strokeDasharray="4 4"
          />
          <line
            x1={padding.left}
            y1={height - padding.bottom}
            x2={width - padding.right}
            y2={height - padding.bottom}
            stroke="#e4e4e7"
          />

          {/* Area fill */}
          {areaD && (
            <path
              d={areaD}
              fill={metric === "revenue" ? "url(#gradientViolet)" : "url(#gradientCyan)"}
            />
          )}

          {/* Stroke path */}
          {pathD && (
            <path
              d={pathD}
              fill="none"
              stroke={metric === "revenue" ? "#7c3aed" : "#0891b2"}
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          )}

          {/* Interactive hover points & trigger bars */}
          {points.map((p, i) => {
            const isHovered = hoveredIdx === i;
            const barW = usableW / points.length;
            return (
              <g key={i}>
                {/* Invisible hover trigger hit area */}
                <rect
                  x={p.x - barW / 2}
                  y={padding.top}
                  width={barW}
                  height={usableH}
                  fill="transparent"
                  onMouseEnter={() => setHoveredIdx(i)}
                />

                {/* Visible dot on hover */}
                {isHovered && (
                  <>
                    <line
                      x1={p.x}
                      y1={padding.top}
                      x2={p.x}
                      y2={height - padding.bottom}
                      stroke="#8b5cf6"
                      strokeDasharray="2 2"
                      strokeWidth="1.5"
                    />
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r="5"
                      fill="#7c3aed"
                      stroke="#ffffff"
                      strokeWidth="2.5"
                    />
                  </>
                )}
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip Overlay */}
        {activePoint && (
          <div
            className="pointer-events-none absolute -top-2 z-10 -translate-x-1/2 -translate-y-full transition-all duration-75"
            style={{
              left: `${((activePoint.x - padding.left) / usableW) * 100}%`,
            }}
          >
            <div className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-center text-xs text-white shadow-xl">
              <div className="text-[10px] text-zinc-400 font-medium">
                {activePoint.item.label}
              </div>
              <div className="font-mono font-bold text-violet-300">
                {formatMoney(activePoint.item.revenueCents)}
              </div>
              <div className="text-[10px] text-zinc-400">
                {activePoint.item.sales} {activePoint.item.sales === 1 ? "license" : "licenses"}
              </div>
            </div>
            <div className="mx-auto -mt-1 h-2 w-2 rotate-45 border-b border-r border-zinc-800 bg-zinc-900" />
          </div>
        )}
      </div>

      {/* Footer timeframe labels */}
      <div className="mt-2 flex justify-between px-2 text-[10px] font-mono text-zinc-400">
        <span>{activeData[0]?.label ?? "-"}</span>
        <span>{activeData[Math.floor(activeData.length / 2)]?.label ?? "-"}</span>
        <span>{activeData[activeData.length - 1]?.label ?? "-"}</span>
      </div>
    </div>
  );
}
