"use client";

import { useState } from "react";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  if (state === "sent") {
    return (
      <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm text-emerald-700">
        ✓ If that email matches the admin account, a sign-in link is on its way. Check your inbox.
      </div>
    );
  }

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setState("sending");
        setError(null);
        try {
          const res = await fetch("/api/admin/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
          });
          if (!res.ok) {
            const data = await res.json().catch(() => ({}));
            setError(data.error || "Something went wrong");
            setState("error");
            return;
          }
          setState("sent");
        } catch (err) {
          setError(err instanceof Error ? err.message : "Network error");
          setState("error");
        }
      }}
      className="space-y-4"
    >
      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">
          Email address
        </label>
        <input
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full rounded-lg border border-zinc-300 bg-white px-3.5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
        />
      </div>
      <button
        type="submit"
        disabled={state === "sending"}
        className="w-full rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 disabled:opacity-50 transition-colors"
      >
        {state === "sending" ? "Sending…" : "Send sign-in link"}
      </button>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </form>
  );
}
