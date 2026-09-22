"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function LogoutButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  return (
    <button
      onClick={async () => {
        setBusy(true);
        await fetch("/api/admin/auth/logout", { method: "POST" });
        router.push("/admin/login");
        router.refresh();
      }}
      disabled={busy}
      className="rounded border border-zinc-300 px-2 py-1 text-xs text-zinc-700 hover:bg-zinc-100 disabled:opacity-50"
    >
      {busy ? "…" : "Sign out"}
    </button>
  );
}
