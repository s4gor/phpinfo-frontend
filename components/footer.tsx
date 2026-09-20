import Link from "next/link";
import { Terminal, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[#e6e8eb] bg-[#f8faff] py-14 px-4 sm:px-6 lg:px-8 text-xs text-[#425466]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="flex items-center gap-3">
          <div className="h-7 w-7 rounded-lg bg-white border border-[#e6e8eb] flex items-center justify-center shadow-xs">
            <Terminal className="h-3.5 w-3.5 text-[#635bff]" />
          </div>
          <span className="text-[#0a2540] font-mono font-bold text-sm">
            phpinfo() WP - a product by{" "}
            <a href="https://exeebit.com" target="_blank" rel="noopener noreferrer" className="text-[#635bff] underline hover:text-[#4f45e5]">
              Exeebit
            </a>
          </span>
          <span className="text-[#697386]">· &copy; {new Date().getFullYear()}</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-[#425466] font-semibold text-xs">
          <Link href="/docs" className="hover:text-[#0a2540] transition-colors">
            28 Modules Docs
          </Link>
          <Link href="/changelog" className="hover:text-[#0a2540] transition-colors">
            Changelog
          </Link>
          <a href="https://wordpress.org/plugins/phpinfo-wp/" target="_blank" rel="noopener noreferrer" className="hover:text-[#0a2540] transition-colors flex items-center gap-1">
            <span>WP.org</span>
            <ArrowUpRight className="h-3 w-3 text-[#697386]" />
          </a>
          <a href="https://exeebit.com/terms" target="_blank" rel="noopener noreferrer" className="hover:text-[#0a2540] transition-colors">
            Terms
          </a>
          <a href="https://exeebit.com/refund" target="_blank" rel="noopener noreferrer" className="hover:text-[#0a2540] transition-colors">
            Refund Policy
          </a>
          <a href="https://exeebit.com/support" target="_blank" rel="noopener noreferrer" className="hover:text-[#0a2540] transition-colors">
            Support
          </a>
        </div>

      </div>
    </footer>
  );
}
