"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { LogoutButton } from "./logout-button";
import { CommandPalette, type SearchCustomerItem } from "./command-palette";
import {
  LayoutDashboard,
  Users,
  Globe,
  CreditCard,
  Receipt,
  FileSpreadsheet,
  CalendarDays,
  History,
  Search,
  Command,
  PanelLeftClose,
  PanelLeftOpen,
  DollarSign,
  TrendingUp,
} from "lucide-react";

interface AdminShellProps {
  email: string;
  customers?: SearchCustomerItem[];
  children: React.ReactNode;
}

export function AdminShell({ email, customers = [], children }: AdminShellProps) {
  const pathname = usePathname();
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Load and persist sidebar collapsed state
  useEffect(() => {
    try {
      const saved = localStorage.getItem("piwp_sidebar_collapsed");
      if (saved !== null) setIsCollapsed(saved === "true");
    } catch {}
  }, []);

  function toggleSidebar() {
    setIsCollapsed((prev) => {
      const next = !prev;
      try { localStorage.setItem("piwp_sidebar_collapsed", String(next)); } catch {}
      return next;
    });
  }

  // Keyboard shortcut: Cmd+B toggles sidebar
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "b") {
        e.preventDefault();
        toggleSidebar();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const navSections = [
    {
      title: "Telemetry & Product",
      items: [
        { label: "Mission Control", href: "/admin", icon: LayoutDashboard, exact: true },
        { label: "Customers & Keys", href: "/admin/customers", icon: Users, exact: false },
        { label: "Live Activations", href: "/admin/activations", icon: Globe, exact: false },
        { label: "Subscriptions", href: "/admin/subscriptions", icon: CreditCard, exact: false },
      ],
    },
    {
      title: "Tax & Bookkeeping",
      items: [
        { label: "Profit & Tax (EÜR)", href: "/admin/bookkeeping", icon: TrendingUp, exact: true },
        { label: "Invoices & Receipts", href: "/admin/bookkeeping/invoices", icon: Receipt, exact: false },
        { label: "Expenses Ledger", href: "/admin/bookkeeping/expenses", icon: FileSpreadsheet, exact: false },
        { label: "Home Office (€6/day)", href: "/admin/bookkeeping/homeoffice", icon: CalendarDays, exact: false },
      ],
    },
    {
      title: "Security & Audit",
      items: [
        { label: "Security Audit", href: "/admin/audit", icon: History, exact: false },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-50/70 text-zinc-900 flex flex-col md:flex-row selection:bg-violet-500/20 selection:text-violet-900">
      <CommandPalette
        customers={customers}
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
      />

      {/* ── Collapsible Left Sidebar ── */}
      <aside
        className={`hidden md:flex flex-col border-r border-zinc-200/80 bg-white shadow-xs transition-all duration-200 ease-in-out shrink-0 sticky top-0 h-screen z-30 ${
          isCollapsed ? "w-16" : "w-60"
        }`}
      >
        {/* Sidebar Header Brand */}
        <div className="flex h-14 items-center justify-between border-b border-zinc-100 px-3.5">
          {!isCollapsed && (
            <Link href="/admin" className="flex items-center gap-2 overflow-hidden">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-700 text-white font-bold text-xs shadow-xs">
                π
              </span>
              <div className="min-w-0">
                <div className="text-xs font-bold tracking-tight text-zinc-900 truncate">
                  phpinfo() WP
                </div>
                <div className="text-[10px] text-zinc-400 font-medium truncate">
                  Exeebit · Admin
                </div>
              </div>
            </Link>
          )}

          {isCollapsed && (
            <div className="mx-auto flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-700 text-white font-bold text-xs">
              π
            </div>
          )}

          <button
            onClick={toggleSidebar}
            title={isCollapsed ? "Expand sidebar (Cmd+B)" : "Collapse sidebar (Cmd+B)"}
            className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 transition-colors"
          >
            {isCollapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
          </button>
        </div>

        {/* Sidebar Navigation Items */}
        <div className="flex-1 overflow-y-auto px-2.5 py-4 space-y-5">
          {navSections.map((section, sIdx) => (
            <div key={sIdx}>
              {!isCollapsed && (
                <div className="px-2.5 mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-400 select-none">
                  {section.title}
                </div>
              )}
              <nav className="space-y-0.5">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = item.exact
                    ? pathname === item.href
                    : pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/admin");

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      title={isCollapsed ? item.label : undefined}
                      className={`flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-xs font-medium transition-all group ${
                        isActive
                          ? "bg-violet-50 text-violet-700 font-semibold shadow-2xs"
                          : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
                      } ${isCollapsed ? "justify-center px-2" : ""}`}
                    >
                      <Icon
                        className={`h-4 w-4 shrink-0 transition-colors ${
                          isActive ? "text-violet-600" : "text-zinc-400 group-hover:text-zinc-600"
                        }`}
                      />
                      {!isCollapsed && <span className="truncate">{item.label}</span>}
                    </Link>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>

        {/* Sidebar Footer */}
        <div className="border-t border-zinc-100 p-2.5">
          {!isCollapsed ? (
            <div className="flex items-center justify-between rounded-xl bg-zinc-50/70 p-2 text-xs">
              <div className="min-w-0 pr-2">
                <div className="truncate font-medium text-zinc-800 text-[11px]">{email}</div>
                <div className="text-[10px] text-zinc-400">Germany / Admin</div>
              </div>
              <LogoutButton />
            </div>
          ) : (
            <div className="flex justify-center">
              <LogoutButton />
            </div>
          )}
        </div>
      </aside>

      {/* ── Main Viewport Area ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Sticky Header */}
        <header className="sticky top-0 z-20 border-b border-zinc-200/80 bg-white/90 backdrop-blur-md shadow-xs">
          <div className="flex h-14 items-center justify-between px-4 sm:px-6">
            {/* Left: Mobile Title or Search Trigger */}
            <div className="flex items-center gap-3">
              <div className="md:hidden flex items-center gap-2 font-bold text-xs text-zinc-900">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-violet-600 text-white text-[11px]">π</span>
                phpinfo() WP
              </div>

              {/* Global Search Button */}
              <button
                onClick={() => setIsCommandOpen(true)}
                className="flex items-center gap-2 rounded-xl border border-zinc-200/80 bg-zinc-50/70 px-3 py-1.5 text-xs text-zinc-500 hover:border-zinc-300 hover:bg-zinc-100 transition-all shadow-2xs"
              >
                <Search className="h-3.5 w-3.5 text-zinc-400" />
                <span className="hidden sm:inline">Search customers, keys, or command…</span>
                <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded border border-zinc-200 bg-white px-1.5 py-0.5 text-[10px] font-mono text-zinc-400">
                  <Command className="h-2.5 w-2.5" />K
                </kbd>
              </button>
            </div>

            {/* Right: Telemetry Status */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 rounded-full border border-emerald-200/80 bg-emerald-50/60 px-2.5 py-1 text-[11px] font-medium text-emerald-700">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </span>
                Online
              </div>
            </div>
          </div>

          {/* Mobile Bottom Navigation Scrollbar */}
          <div className="md:hidden flex items-center gap-1 px-3 py-2 border-t border-zinc-100 overflow-x-auto text-xs">
            {navSections.flatMap((s) => s.items).map((item) => {
              const Icon = item.icon;
              const isActive = item.exact
                ? pathname === item.href
                : pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/admin");

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 font-medium whitespace-nowrap ${
                    isActive ? "bg-violet-50 text-violet-700 font-semibold" : "text-zinc-600"
                  }`}
                >
                  <Icon className="h-3 w-3" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </header>

        {/* Content Container */}
        <main className="flex-1 px-4 sm:px-8 py-6 sm:py-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
