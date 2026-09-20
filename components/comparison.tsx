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
    <section className="py-24 relative bg-[#f8faff] border-t border-[#e6e8eb]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0a2540] tracking-tight mb-4">
            Why Developers & Agencies Choose phpinfo() WP
          </h2>
          <p className="text-[#425466] text-base sm:text-lg">
            See how phpinfo() WP compares against default PHP outputs and external monitoring agents.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-[#e6e8eb] bg-white shadow-sm">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-[#e6e8eb] bg-[#f8faff]">
                <th className="py-4 px-5 font-bold text-[#0a2540]">Feature / Capability</th>
                <th className="py-4 px-4 font-semibold text-[#697386] text-center">Native phpinfo()</th>
                <th className="py-4 px-4 font-semibold text-[#697386] text-center">Generic SaaS Monitors</th>
                <th className="py-4 px-4 font-bold text-[#635bff] text-center bg-[#f0f3ff]">phpinfo() WP Pro</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e6e8eb] text-[#425466]">
              {rows.map((r, i) => (
                <tr key={i} className="hover:bg-[#f8faff] transition-colors">
                  <td className="py-4 px-5 font-semibold text-[#0a2540]">{r.feature}</td>
                  <td className="py-4 px-4 text-center">
                    {r.rawPhp ? <Check className="h-4 w-4 text-[#00a389] mx-auto" /> : <X className="h-4 w-4 text-[#cbd5e1] mx-auto" />}
                  </td>
                  <td className="py-4 px-4 text-center">
                    {r.genericMon ? <Check className="h-4 w-4 text-[#00a389] mx-auto" /> : <X className="h-4 w-4 text-[#cbd5e1] mx-auto" />}
                  </td>
                  <td className="py-4 px-4 text-center bg-[#f0f3ff]/40 font-bold text-[#00a389]">
                    <Check className="h-4 w-4 text-[#00a389] mx-auto" />
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
