"use client";

import { Sliders } from "lucide-react";

export default function CookieSettingsButton({
  className = "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors text-left inline-flex items-center gap-1.5",
}: {
  className?: string;
}) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("open-cookie-settings"));
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={className}>
      <Sliders className="h-3 w-3" />
      <span>Cookie Preferences</span>
    </button>
  );
}
