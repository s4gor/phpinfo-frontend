"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  LayoutDashboard,
  Users,
  Globe,
  CreditCard,
  History,
  PlusCircle,
  Download,
  ExternalLink,
  X,
  Command,
} from "lucide-react";

export interface SearchCustomerItem {
  email: string;
  name?: string;
  tier: string;
  key: string;
  sessionId?: string;
}

interface CommandPaletteProps {
  customers?: SearchCustomerItem[];
  isOpen?: boolean;
  onClose?: () => void;
  onOpenIssueModal?: () => void;
}

export function CommandPalette({
  customers = [],
  isOpen: controlledIsOpen,
  onClose: controlledOnClose,
  onOpenIssueModal,
}: CommandPaletteProps) {
  const router = useRouter();
  const [internalOpen, setInternalOpen] = useState(false);
  const [query, setQuery] = useState("");

  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalOpen;
  const onClose = controlledOnClose || (() => setInternalOpen(false));

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (controlledIsOpen !== undefined && controlledOnClose) {
          if (isOpen) controlledOnClose();
        } else {
          setInternalOpen((prev) => !prev);
        }
      } else if (e.key === "Escape" && isOpen) {
        onClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, controlledIsOpen, controlledOnClose, onClose]);

  const filteredNav = useMemo(() => {
    const q = query.toLowerCase().trim();
    const navItems = [
      { title: "Overview", href: "/admin", icon: LayoutDashboard, category: "Navigation" },
      { title: "Customers & Licenses", href: "/admin/customers", icon: Users, category: "Navigation" },
      { title: "Live Activations & Domains", href: "/admin/activations", icon: Globe, category: "Navigation" },
      { title: "Subscriptions & Billing", href: "/admin/subscriptions", icon: CreditCard, category: "Navigation" },
      { title: "Audit Log & Security", href: "/admin/audit", icon: History, category: "Navigation" },
    ];
    if (!q) return navItems;
    return navItems.filter((i) => i.title.toLowerCase().includes(q));
  }, [query]);

  const filteredActions = useMemo(() => {
    const q = query.toLowerCase().trim();
    const actions = [
      {
        title: "Issue New License",
        desc: "Generate manual or complimentary license key",
        icon: PlusCircle,
        run: () => {
          onClose();
          if (onOpenIssueModal) onOpenIssueModal();
          else router.push("/admin/customers?action=issue");
        },
      },
      {
        title: "Export Customers to CSV",
        desc: "Download complete license dataset",
        icon: Download,
        run: () => {
          onClose();
          window.location.href = "/api/admin/export/customers";
        },
      },
      {
        title: "Stripe Dashboard",
        desc: "Open live Stripe portal in new tab",
        icon: ExternalLink,
        run: () => {
          window.open("https://dashboard.stripe.com", "_blank");
          onClose();
        },
      },
    ];
    if (!q) return actions;
    return actions.filter((a) => a.title.toLowerCase().includes(q) || a.desc.toLowerCase().includes(q));
  }, [query, onClose, onOpenIssueModal, router]);

  const filteredCustomers = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q || q.length < 2) return [];
    return customers
      .filter((c) => {
        const text = `${c.email} ${c.name ?? ""} ${c.key} ${c.tier}`.toLowerCase();
        return text.includes(q);
      })
      .slice(0, 6);
  }, [query, customers]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-zinc-950/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-2xl ring-1 ring-black/5">
        {/* Search Input */}
        <div className="flex items-center border-b border-zinc-100 px-4 py-3.5">
          <Search className="h-4 w-4 text-zinc-400 shrink-0 mr-3" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search customers, keys, domains, or commands…"
            className="w-full bg-transparent text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none"
          />
          <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded border border-zinc-200 bg-zinc-50 px-1.5 py-0.5 text-[10px] font-mono text-zinc-400">
            ESC
          </kbd>
          <button
            onClick={onClose}
            className="sm:hidden text-zinc-400 hover:text-zinc-600 p-1"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-2 divide-y divide-zinc-50">
          {/* Customers section if query matching */}
          {filteredCustomers.length > 0 && (
            <div className="py-2">
              <div className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                Matching Customers
              </div>
              {filteredCustomers.map((c) => (
                <button
                  key={c.key}
                  onClick={() => {
                    onClose();
                    if (c.sessionId) {
                      router.push(`/admin/customers/${encodeURIComponent(c.sessionId)}`);
                    } else {
                      router.push(`/admin/customers?q=${encodeURIComponent(c.email)}`);
                    }
                  }}
                  className="w-full flex items-center justify-between rounded-lg px-3 py-2 text-left hover:bg-violet-50/80 transition-colors group"
                >
                  <div className="min-w-0 pr-2">
                    <div className="text-xs font-medium text-zinc-900 group-hover:text-violet-700 truncate">
                      {c.email}
                    </div>
                    {c.name && <div className="text-[11px] text-zinc-400 truncate">{c.name}</div>}
                  </div>
                  <span className="shrink-0 rounded-full border border-violet-200 bg-violet-50 px-2 py-0.5 text-[10px] font-medium text-violet-700 uppercase">
                    {c.tier}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Quick Actions */}
          {filteredActions.length > 0 && (
            <div className="py-2">
              <div className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                Actions
              </div>
              {filteredActions.map((a, i) => {
                const Icon = a.icon;
                return (
                  <button
                    key={i}
                    onClick={a.run}
                    className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-left hover:bg-zinc-100/80 transition-colors group"
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-zinc-200 bg-zinc-50 group-hover:border-violet-300 group-hover:bg-violet-50 group-hover:text-violet-600 transition-colors">
                      <Icon className="h-3.5 w-3.5 text-zinc-500 group-hover:text-violet-600" />
                    </div>
                    <div>
                      <div className="text-xs font-medium text-zinc-800">{a.title}</div>
                      <div className="text-[11px] text-zinc-400">{a.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* Navigation */}
          {filteredNav.length > 0 && (
            <div className="py-2">
              <div className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                Pages
              </div>
              {filteredNav.map((n, i) => {
                const Icon = n.icon;
                return (
                  <button
                    key={i}
                    onClick={() => {
                      onClose();
                      router.push(n.href);
                    }}
                    className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-left hover:bg-zinc-100/80 transition-colors group"
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-zinc-200 bg-zinc-50 group-hover:border-violet-300 group-hover:bg-violet-50 group-hover:text-violet-600 transition-colors">
                      <Icon className="h-3.5 w-3.5 text-zinc-500 group-hover:text-violet-600" />
                    </div>
                    <span className="text-xs font-medium text-zinc-800">{n.title}</span>
                  </button>
                );
              })}
            </div>
          )}

          {filteredNav.length === 0 && filteredActions.length === 0 && filteredCustomers.length === 0 && (
            <div className="py-8 text-center text-xs text-zinc-400">
              No matching commands, pages, or customers found.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-zinc-100 bg-zinc-50/70 px-4 py-2 text-[11px] text-zinc-400">
          <div className="flex items-center gap-2">
            <span>Navigation:</span>
            <kbd className="rounded border border-zinc-200 bg-white px-1.5 py-0.5 font-mono">↑↓</kbd>
            <span>Select:</span>
            <kbd className="rounded border border-zinc-200 bg-white px-1.5 py-0.5 font-mono">↵</kbd>
          </div>
          <div className="flex items-center gap-1">
            <Command className="h-3 w-3" />
            <span>K anytime</span>
          </div>
        </div>
      </div>
    </div>
  );
}
