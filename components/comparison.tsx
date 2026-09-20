import { Check, X } from "lucide-react";

export default function Comparison() {
  const rows = [
    { feature: "Human-readable telemetry dashboard", rawPhp: false, genericMon: true, phpinfoWp: true },
    { feature: "1-Click Permissions Hardener (0600 wp-config)", rawPhp: false, genericMon: false, phpinfoWp: true },
    { feature: "Zero-downtime Safe Mode troubleshooting", rawPhp: false, genericMon: false, phpinfoWp: true },
    { feature: "Update Guard: Pre-update compatibility check", rawPhp: false, genericMon: false, phpinfoWp: true },
    { feature: "Host Lock Detection (.user.ini vs cPanel)", rawPhp: false, genericMon: false, phpinfoWp: true },
    { feature: "Visual .htaccess editor with safe auto-rollback", rawPhp: false, genericMon: false, phpinfoWp: true },
    { feature: "White-labeled client PDF audit reports", rawPhp: false, genericMon: false, phpinfoWp: true },
    { feature: "Zero external tracking or SaaS dependency", rawPhp: true, genericMon: false, phpinfoWp: true },
    { feature: "Runs native inside WordPress admin & WP-CLI", rawPhp: true, genericMon: false, phpinfoWp: true },
  ];

  return (
    <section className="py-24 relative bg-slate-50/50 border-t border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Why Developers & Agencies Choose phpinfo() WP
          </h2>
          <p className="text-slate-600 text-base">
            See how phpinfo() WP compares against default PHP outputs and external monitoring agents.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80">
                <th className="py-4 px-5 font-semibold text-slate-700">Feature / Capability</th>
                <th className="py-4 px-4 font-semibold text-slate-500 text-center">Native phpinfo()</th>
                <th className="py-4 px-4 font-semibold text-slate-500 text-center">Generic SaaS Monitors</th>
                <th className="py-4 px-4 font-bold text-violet-700 text-center bg-violet-50/70">phpinfo() WP Pro</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {rows.map((r, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3.5 px-5 font-medium">{r.feature}</td>
                  <td className="py-3.5 px-4 text-center">
                    {r.rawPhp ? <Check className="h-4 w-4 text-emerald-600 mx-auto" /> : <X className="h-4 w-4 text-slate-300 mx-auto" />}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    {r.genericMon ? <Check className="h-4 w-4 text-emerald-600 mx-auto" /> : <X className="h-4 w-4 text-slate-300 mx-auto" />}
                  </td>
                  <td className="py-3.5 px-4 text-center bg-violet-50/30 font-semibold text-emerald-600">
                    <Check className="h-4 w-4 text-emerald-600 mx-auto" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
}
