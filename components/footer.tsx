import Link from "next/link";
import { Terminal, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-12 px-4 sm:px-6 lg:px-8 text-xs text-slate-600">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="flex items-center gap-3">
          <div className="h-7 w-7 rounded-lg bg-violet-50 border border-violet-200 flex items-center justify-center">
            <Terminal className="h-3.5 w-3.5 text-violet-600" />
          </div>
          <span className="text-slate-800 font-mono font-bold">
            phpinfo() WP - a product by{" "}
            <a href="https://exeebit.com" target="_blank" rel="noopener noreferrer" className="text-slate-900 underline hover:text-violet-700">
              Exeebit
            </a>
          </span>
          <span className="text-slate-400">· &copy; {new Date().getFullYear()}</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-slate-600">
          <Link href="/docs" className="hover:text-slate-900 transition-colors">
            28 Modules Docs
          </Link>
          <Link href="/changelog" className="hover:text-slate-900 transition-colors">
            Changelog
          </Link>
          <a href="https://wordpress.org/plugins/phpinfo-wp/" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition-colors flex items-center gap-1">
            <span>WP.org</span>
            <ArrowUpRight className="h-3 w-3 text-slate-400" />
          </a>
          <a href="https://exeebit.com/terms" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition-colors">
            Terms
          </a>
          <a href="https://exeebit.com/refund" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition-colors">
            Refund Policy
          </a>
          <a href="https://exeebit.com/support" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition-colors">
            Support
          </a>
        </div>

      </div>
    </footer>
  );
}
