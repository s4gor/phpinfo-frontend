import Link from "next/link";

export default function ExeebitFooter() {
  return (
    <footer className="mt-auto w-full border-t border-zinc-200 bg-background">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-zinc-500 md:flex-row">
        <div className="flex items-center gap-2">
          <span>© {new Date().getFullYear()} Exeebit</span>
          <span className="text-zinc-300">·</span>
          <span>Made by <Link href="https://s4gor.exeebit.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#0216D1] transition-colors">@s4gor</Link></span>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          <Link
            href="/impressum"
            className="transition-colors hover:text-[#0216D1]">
            Impressum
          </Link>
          <Link
            href="/privacy"
            className="transition-colors hover:text-[#0216D1]">
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="transition-colors hover:text-[#0216D1]">
            Terms of Service
          </Link>
          <Link
            href="/refund"
            className="transition-colors hover:text-[#0216D1]">
            Refund Policy
          </Link>
          <Link
            href="/support"
            className="transition-colors hover:text-[#0216D1]">
            Support
          </Link>
          <Link
            href="mailto:support@exeebit.com"
            className="transition-colors hover:text-[#0216D1]">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
}
