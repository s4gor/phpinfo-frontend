"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  pageSize?: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalItems,
  pageSize = 15,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  const start = totalItems === 0 ? 0 : Math.min((currentPage - 1) * pageSize + 1, totalItems);
  const end = Math.min(currentPage * pageSize, totalItems);

  function getPageNumbers(): (number | string)[] {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, "…", totalPages];
    }
    if (currentPage >= totalPages - 3) {
      return [1, "…", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }
    return [1, "…", currentPage - 1, currentPage, currentPage + 1, "…", totalPages];
  }

  const pages = getPageNumbers();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-zinc-200/80 bg-zinc-50/70 px-5 py-3.5 text-xs text-zinc-600">
      <div className="flex items-center gap-1.5 text-zinc-500">
        <span>Showing</span>
        <strong className="font-semibold text-zinc-900 font-mono">{start}</strong>
        <span>to</span>
        <strong className="font-semibold text-zinc-900 font-mono">{end}</strong>
        <span>of</span>
        <strong className="font-semibold text-zinc-900 font-mono">{totalItems}</strong>
        <span>entries</span>
        <span className="ml-2 px-2 py-0.5 rounded-md bg-zinc-200/70 text-[10px] font-mono text-zinc-700 font-medium">
          Page {currentPage} of {totalPages}
        </span>
      </div>

      <div className="flex items-center gap-1.5 self-center sm:self-auto">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          aria-label="Previous Page"
          className="inline-flex items-center gap-1 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700 shadow-2xs hover:bg-zinc-100 hover:text-zinc-900 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Previous</span>
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1 px-1">
          {pages.map((p, i) => {
            if (typeof p === "string") {
              return (
                <span key={i} className="px-1.5 py-1 text-zinc-400 select-none font-mono">
                  {p}
                </span>
              );
            }
            const isCurrent = p === currentPage;
            return (
              <button
                key={i}
                onClick={() => onPageChange(p)}
                aria-current={isCurrent ? "page" : undefined}
                className={`min-w-[32px] h-8 rounded-lg px-2 text-xs font-mono font-bold transition-all ${
                  isCurrent
                    ? "bg-violet-600 text-white shadow-xs scale-105"
                    : "text-zinc-700 hover:bg-zinc-200/70 bg-white border border-zinc-200"
                }`}
              >
                {p}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          aria-label="Next Page"
          className="inline-flex items-center gap-1 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700 shadow-2xs hover:bg-zinc-100 hover:text-zinc-900 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <span>Next</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
