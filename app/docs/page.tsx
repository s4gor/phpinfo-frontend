"use client";

import { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { 
  BookOpen, 
  Search, 
  Copy, 
  Check, 
  ShieldCheck, 
  Cpu, 
  Flame, 
  Wrench, 
  Terminal, 
  Lock, 
  FileCode, 
  Database,
  ArrowRight,
  ExternalLink
} from "lucide-react";

interface DocModule {
  id: number;
  title: string;
  category: "core" | "pro" | "security" | "sysadmin";
  summary: string;
  codeSnippet?: string;
  points: string[];
}

const MODULES: DocModule[] = [
  {
    id: 1,
    title: "1. PHP Configuration & Runtime Directives",
    category: "core",
    summary: "Visual telemetry for memory_limit, max_execution_time, upload_max_filesize, post_max_size, and max_input_vars.",
    codeSnippet: "ini_set('memory_limit', '512M');",
    points: [
      "Highlights directive conflicts between master php.ini and local .user.ini overrides.",
      "Identifies memory bottlenecks before fatal Out of Memory crashes occur during backups or WooCommerce syncs.",
      "Detects host locks where your hosting provider ignores custom wp-config.php memory definitions."
    ]
  },
  {
    id: 2,
    title: "2. Loaded PHP Extensions Matrix",
    category: "core",
    summary: "Audits installed versus missing PHP extensions required by WordPress Core, WooCommerce, and imaging libraries.",
    codeSnippet: "extension_loaded('imagick'); // WebP and AVIF image optimization",
    points: [
      "Flags missing performance extensions like imagick, curl, mbstring, intl, and sodium.",
      "Provides direct package installation commands for Ubuntu/Debian, CentOS/RHEL, and cPanel.",
      "Detects disabled functions via disable_functions directive (such as exec, passthru, shell_exec)."
    ]
  },
  {
    id: 3,
    title: "3. Database & MySQL Engine Telemetry",
    category: "core",
    summary: "Inspects MySQL / MariaDB server versions, InnoDB buffer pool hit ratios, table fragmentation, and overhead.",
    codeSnippet: "SHOW TABLE STATUS WHERE Data_free > 0;",
    points: [
      "Surfaces unindexed postmeta queries and bloated autoloaded options (> 800 KB threshold).",
      "Calculates total database footprint and identifies fragmented tables ready for optimization.",
      "Verifies utf8mb4 collation compliance to avoid character corruption during emojis and foreign language syncs."
    ]
  },
  {
    id: 4,
    title: "4. Directory Permissions & 1-Click Auto-Fix",
    category: "security",
    summary: "Automated scanner that tightens insecure file permissions (0777, 0666) to hardened standards (0755, 0644, 0600).",
    codeSnippet: "chmod 0600 wp-config.php && find . -type d -exec chmod 0755 {} +",
    points: [
      "Native 1-Click Auto-Fix button: executes secure chmod directly via PHP without requiring SSH or root access.",
      "Hardens wp-config.php to 0600 (or 0640 fallback if required by hosting provider).",
      "Safeguards wp-content/uploads from arbitrary executable execution."
    ]
  },
  {
    id: 5,
    title: "5. Security Headers & HSTS Evaluator",
    category: "security",
    summary: "Evaluates active HTTP response headers and grades your domain against OWASP recommended security baselines.",
    codeSnippet: "Strict-Transport-Security: max-age=31536000; includeSubDomains; preload",
    points: [
      "Grades HSTS, Content-Security-Policy (CSP), X-Frame-Options, and X-Content-Type-Options.",
      "Prevents clickjacking and MIME-sniffing exploits automatically.",
      "Provides ready-to-paste snippets for .htaccess, Nginx server blocks, and Cloudflare Workers."
    ]
  },
  {
    id: 6,
    title: "6. OPcache Engine Visualizer",
    category: "pro",
    summary: "Deep telemetry into PHP bytecode caching, buffer allocation, hit rates, cached script counts, and restart ratios.",
    codeSnippet: "opcache.memory_consumption = 128\nopcache.max_accelerated_files = 10000",
    points: [
      "Visual memory gauge showing real-time used memory vs free buffer vs wasted string memory.",
      "Calculates hit rate percentage (optimal is > 98%).",
      "Detects buffer exhaustion where scripts are forced to recompile on every page load."
    ]
  },
  {
    id: 7,
    title: "7. Safe Mode: Zero-Downtime Sandbox",
    category: "security",
    summary: "Early bootstrap mu-plugin loader that isolates faulty plugins strictly for the admin without affecting live visitors.",
    codeSnippet: "define('PHPINFO_WP_SAFE_MODE', true);",
    points: [
      "Zero downtime for public traffic: customers can continue checkout and visitors browse normally.",
      "Never alters the active_plugins database option, preventing catastrophic lockout.",
      "One-click safe recovery if a plugin update or code modification crashes the admin panel."
    ]
  },
  {
    id: 8,
    title: "8. PHP 8.x Compatibility Matrix",
    category: "pro",
    summary: "Static analysis scanner that audits all active and inactive plugins against PHP 8.2, 8.3, and 8.4 syntax changes.",
    codeSnippet: "wp phpinfo compat --target=8.3",
    points: [
      "Finds deprecated functions like utf8_encode(), strftime(), and dynamic properties.",
      "Flags breaking changes and fatal error risks before you upgrade your server PHP version.",
      "Runs asynchronously via background queue so large codebases scan without browser timeouts."
    ]
  },
  {
    id: 9,
    title: "9. Update Guard: Pre-Update Safety Scanner",
    category: "pro",
    summary: "Intercepts the WordPress update flow and checks pending plugin updates for deprecated functions before installation.",
    codeSnippet: "Update Guard Rule: Check for deprecated screen_icon() and jQuery.sub()",
    points: [
      "Lists every plugin update with clear verdicts: Safe to Update, Update with Caution, or Risky: Review First.",
      "Prevents silent post-update 500 errors and white-screen crashes.",
      "Cloud-assisted rule feed kept up to date with new PHP and WordPress Core deprecations."
    ]
  },
  {
    id: 10,
    title: "10. Real-Time PHP Error Log Telemetry",
    category: "core",
    summary: "Direct tail and parser for error_log files with automatic severity categorization (Fatal, Warning, Notice, Deprecated).",
    codeSnippet: "tail -f /var/log/php-fpm/www-error.log",
    points: [
      "Groups repetitive errors into deduplicated summaries so you can spot spikes instantly.",
      "Locates real error log paths regardless of whether your host stores them in root, wp-content, or /var/log.",
      "Filter logs by severity, plugin name, or specific timestamps with 1-click log clear."
    ]
  },
  {
    id: 11,
    title: "11. Admin Audit Trail & Change Tracking",
    category: "security",
    summary: "Tracks configuration adjustments, .htaccess modifications, and permission fixes with user attribution.",
    codeSnippet: "audit_log('permissions_hardened', ['target' => 'wp-config.php', 'user' => 1]);",
    points: [
      "Records who modified directives, when, and what the previous value was.",
      "Essential for compliance and multi-admin agency environments.",
      "Exportable audit events for internal reporting."
    ]
  },
  {
    id: 12,
    title: "12. WP-Cron Scheduled Task Telemetry",
    category: "core",
    summary: "Audits all scheduled background jobs, detects missed or overdue events, and identifies orphaned hooks.",
    codeSnippet: "wp cron event list --fields=hook,next_run_gmt,recurrence",
    points: [
      "Detects missed cron events that cause scheduled posts and WooCommerce email delays.",
      "Identifies orphaned callbacks left behind by uninstalled plugins.",
      "Recommends transitioning to real system crontabs for high-traffic sites."
    ]
  },
  {
    id: 13,
    title: "13. Server Environment & Software Stack",
    category: "sysadmin",
    summary: "Detailed overview of web server software (Nginx, Apache, LiteSpeed, Caddy), OS kernel, OpenSSL, and cURL versions.",
    codeSnippet: "curl_version()['ssl_version']; // Verifies TLS 1.3 support",
    points: [
      "Verifies HTTP/2 and HTTP/3 QUIC protocol support.",
      "Checks OpenSSL cipher suite readiness for PCI-DSS compliance.",
      "Inspects FastCGI process manager settings."
    ]
  },
  {
    id: 14,
    title: "14. Visual .htaccess & .user.ini IDE",
    category: "sysadmin",
    summary: "In-admin configuration editor equipped with automatic syntax pre-flight testing and instant rollback on HTTP 500.",
    codeSnippet: "# Auto-Rollback Guard restores backup if HTTP 500 occurs",
    points: [
      "Pre-flight health check pings your site via loopback request immediately upon save.",
      "If a syntax typo triggers internal server error 500, previous safe configuration is restored automatically.",
      "Syntax highlighting for Apache directives and PHP INI keys."
    ]
  },
  {
    id: 15,
    title: "15. Outbound HTTP Latency & Timeout Probe",
    category: "pro",
    summary: "Measures DNS lookup times and response latencies to external APIs (Stripe, PayPal, Mailchimp, WordPress.org).",
    codeSnippet: "wp_remote_get('https://api.stripe.com/v1/health', ['timeout' => 5]);",
    points: [
      "Detects server-side egress firewall blocks or slow DNS resolvers that cause checkout stalls.",
      "Monitors response time trends to third-party endpoints.",
      "Ensures outbound cURL sockets do not time out during payment processing."
    ]
  },
  {
    id: 16,
    title: "16. White-Labeled Executive PDF Reports",
    category: "pro",
    summary: "One-click generation of professional server audit reports complete with your agency logo and custom branding.",
    codeSnippet: "wp phpinfo report --export=pdf --theme=agency-dark",
    points: [
      "Print to PDF or export for client monthly maintenance sign-offs.",
      "Customizable agency name, logo, footer text, and health verdict summary.",
      "Includes executive scorecards for security, OPcache efficiency, and PHP compatibility."
    ]
  },
  {
    id: 17,
    title: "17. Server Configuration Snapshots & Diff",
    category: "sysadmin",
    summary: "Save snapshots of your complete PHP and server state to compare configuration changes across time or staging.",
    codeSnippet: "Snapshot diff: memory_limit changed from 256M to 512M",
    points: [
      "Compare any two snapshots to see exactly what changed after a host migration or update.",
      "Visual side-by-side diff with added directives highlighted in green and regressions in red.",
      "Export snapshots as portable JSON files."
    ]
  },
  {
    id: 18,
    title: "18. Auto-Fix Safety Architecture",
    category: "security",
    summary: "Defensive programming design ensuring all automated adjustments execute safely without breaking filesystem ownership.",
    codeSnippet: "if (@chmod($file, 0600) === false) { /* Graceful SSH recommendation */ }",
    points: [
      "PHP chmod operations handle permissions within the web server process boundary.",
      "If files are owned by root or another OS user, graceful terminal commands are provided.",
      "No unsafe recursive chown or sudo escalations are ever attempted in PHP."
    ]
  },
  {
    id: 19,
    title: "19. Host Lock Detection Engine",
    category: "sysadmin",
    summary: "Heuristic analyzer that determines whether your host allows local INI overrides or requires provider dashboard changes.",
    codeSnippet: "cPanel MultiPHP: edits route to .user.ini\nKinsta/WPEngine: overrides via custom panel",
    points: [
      "Identifies whether your server is running PHP via CGI/FastCGI, FPM, or Apache module.",
      "Tells you exactly which file will take effect (.user.ini, php.ini, or wp-config.php).",
      "Stops you from wasting hours editing directives in files that your host silently ignores."
    ]
  },
  {
    id: 20,
    title: "20. Bedrock & Composer Modern Stack Integration",
    category: "sysadmin",
    summary: "Native support for Roots Bedrock, Composer directory structures, and environment-driven (.env) setups.",
    codeSnippet: "WP_ENV = 'production'\nWP_HOME = 'https://example.com'",
    points: [
      "Correctly detects web root in web/ and app/ directories.",
      "Inspects composer.json dependencies for PHP version constraints.",
      "Compatible with modern 12-factor WordPress architectures."
    ]
  },
  {
    id: 21,
    title: "21. Multi-Site Network Telemetry",
    category: "pro",
    summary: "Centralized server diagnostics across entire WordPress Multisite networks (sub-domains and sub-directories).",
    codeSnippet: "is_multisite() && current_user_can('manage_network')",
    points: [
      "Network Admin single-pane overview for 100+ sub-sites on a shared runtime.",
      "Restricts high-privilege operations (Auto-Fix, IDE) strictly to Super Admins.",
      "Monitors shared database tables and upload quota consumption."
    ]
  },
  {
    id: 22,
    title: "22. Zero-Downtime Safe Mode Isolation Deep-Dive",
    category: "security",
    summary: "Technical architectural breakdown of how cookie-based mu-plugin filtering guarantees 100% uptime for public visitors.",
    codeSnippet: "add_filter('option_active_plugins', 'phpinfowp_filter_plugins_for_admin');",
    points: [
      "Filters the in-memory active_plugins array exclusively for authenticated Super Admin sessions.",
      "Public HTTP requests and cron tasks execute full, unaltered plugin stacks.",
      "Allows debugging fatal errors and conflicting plugins in production without maintenance mode."
    ]
  },
  {
    id: 23,
    title: "23. PHP 8.x Migration Matrix",
    category: "pro",
    summary: "Step-by-step guidance on safely upgrading from PHP 7.4 through PHP 8.1, 8.2, 8.3, and upcoming 8.4.",
    codeSnippet: "PHP 8.3: json_validate() native support, typed class constants",
    points: [
      "Checklists of deprecated functions and alternative replacements.",
      "Explains JIT compilation settings (opcache.jit) and performance gains.",
      "Recommended memory and buffer sizes for each PHP generation."
    ]
  },
  {
    id: 24,
    title: "24. REST API & Webhooks Telemetry",
    category: "pro",
    summary: "Inspect WordPress REST API endpoint availability, authentication health, and outbound webhook delivery queues.",
    codeSnippet: "curl -I https://example.com/wp-json/wp/v2/posts",
    points: [
      "Detects aggressive security plugins or firewalls that break the Gutenberg block editor or mobile apps.",
      "Monitors webhook delivery status and retry backoffs.",
      "Verifies Application Passwords and OAuth token headers."
    ]
  },
  {
    id: 25,
    title: "25. License & Offline HMAC Validation",
    category: "core",
    summary: "Privacy-focused license architecture using local cryptographic HMAC verification so your server never phones home repeatedly.",
    codeSnippet: "PIWP-{payload}-{32 char HMAC signature}",
    points: [
      "Fast local HMAC validation: zero external network pings on admin page loads.",
      "Graceful offline tolerance: remains active even during temporary internet blips.",
      "Never transmits server passwords, user emails, or database content."
    ]
  },
  {
    id: 26,
    title: "26. WP-CLI Command Architecture",
    category: "sysadmin",
    summary: "Full command-line interface for sysadmins, DevOps pipelines, and automated server provisioning.",
    codeSnippet: "wp phpinfo status\nwp phpinfo fix-perms\nwp phpinfo report --format=json",
    points: [
      "Run complete audits via SSH or CI/CD deployment hooks.",
      "JSON output support for piping into Datadog, Prometheus, or Grafana.",
      "Trigger 1-Click Permissions Auto-Fix headlessly during Docker builds."
    ]
  },
  {
    id: 27,
    title: "27. Security Hardening Checklist",
    category: "security",
    summary: "Comprehensive 10-point server hardening checklist for production WordPress instances.",
    codeSnippet: "expose_php = Off\ndisplay_errors = Off\nallow_url_include = Off",
    points: [
      "Turn off expose_php so attackers cannot fingerprint your exact PHP patch version.",
      "Enforce display_errors = Off to prevent fatal error stack traces from leaking database passwords.",
      "Verify file execution restrictions inside wp-content/uploads."
    ]
  },
  {
    id: 28,
    title: "28. Troubleshooting & Safe Recovery",
    category: "sysadmin",
    summary: "Disaster recovery manual: how to restore access if hosting misconfigurations, permissions, or fatal errors occur.",
    codeSnippet: "touch wp-content/phpinfo-wp-recovery.flag",
    points: [
      "Emergency recovery flag file to bypass all active checks instantly.",
      "Manual rollback steps for .htaccess, .user.ini, and php.ini.",
      "Host-specific escalation templates for Kinsta, WP Engine, SiteGround, and Cloudways."
    ]
  }
];

export default function DocsPage() {
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState<string>("all");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const filtered = MODULES.filter((m) => {
    const matchesCat = selectedCat === "all" || m.category === selectedCat;
    const query = search.toLowerCase();
    const matchesSearch = 
      m.title.toLowerCase().includes(query) ||
      m.summary.toLowerCase().includes(query) ||
      m.points.some((p) => p.toLowerCase().includes(query)) ||
      (m.codeSnippet && m.codeSnippet.toLowerCase().includes(query));
    return matchesCat && matchesSearch;
  });

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#0a2540] selection:bg-violet-500 selection:text-white">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        
        {/* Header */}
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 border border-violet-200 text-xs font-semibold text-violet-700 mb-3">
            <BookOpen className="h-3.5 w-3.5" />
            <span>Complete Architecture Reference</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0a2540] tracking-tight mb-4">
            28 Diagnostic & Telemetry Modules
          </h1>
          <p className="text-[#425466] text-base sm:text-lg">
            Comprehensive documentation for all core diagnostics, Pro scanning engines, and system hardening tools.
          </p>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="rounded-2xl p-4 sm:p-5 border border-[#e6e8eb] mb-10 shadow-sm bg-white flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search directive, module or fix (e.g. 0755, opcache, wp-config)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-[#e6e8eb] text-xs sm:text-sm text-[#0a2540] placeholder-slate-400 focus:bg-white focus:outline-none focus:border-violet-500 transition-colors"
            />
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {[
              { id: "all", label: "All (28)" },
              { id: "core", label: "Core Telemetry" },
              { id: "pro", label: "Pro Engines" },
              { id: "security", label: "Security & Safe Mode" },
              { id: "sysadmin", label: "SysAdmin & IDE" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCat(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedCat === cat.id
                    ? "bg-[#635bff] text-white shadow-md shadow-violet-600/30"
                    : "text-[#425466] hover:text-[#0a2540] bg-slate-100 hover:bg-slate-200 border border-[#e6e8eb]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

        </div>

        {/* Results Counter */}
        <div className="mb-6 flex items-center justify-between text-xs text-slate-500 font-mono">
          <span>Showing {filtered.length} of {MODULES.length} modules</span>
          {search && (
            <button
              onClick={() => setSearch("")}
              className="text-[#635bff] hover:underline font-semibold"
            >
              Clear filter
            </button>
          )}
        </div>

        {/* Modules List */}
        <div className="space-y-6">
          {filtered.map((mod) => (
            <div
              key={mod.id}
              id={`mod-${mod.id}`}
              className="rounded-2xl p-6 sm:p-8 border border-[#e6e8eb]/90 bg-white shadow-sm hover:shadow-md hover:border-violet-300 transition-all duration-200"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <h2 className="text-xl font-bold text-[#0a2540] tracking-tight">
                  {mod.title}
                </h2>
                <span className="self-start sm:self-auto text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-violet-50 text-violet-700 border border-violet-200 font-mono">
                  Module #{mod.id}
                </span>
              </div>

              <p className="text-[#425466] text-sm mb-4 leading-relaxed font-normal">
                {mod.summary}
              </p>

              {/* Code Snippet Chip */}
              {mod.codeSnippet && (
                <div className="mb-5 rounded-xl bg-[#f8faff] p-3.5 border border-white/10 font-mono text-xs text-[#00a389] flex items-center justify-between gap-3 overflow-x-auto">
                  <code>{mod.codeSnippet}</code>
                  <button
                    onClick={() => handleCopy(mod.codeSnippet!)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors shrink-0"
                    title="Copy snippet"
                  >
                    {copiedCode === mod.codeSnippet ? (
                      <Check className="h-3.5 w-3.5 text-[#00a389]" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>
              )}

              {/* Key Capabilities */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2 font-mono">
                  Engine Capabilities & Rules:
                </span>
                <ul className="space-y-2">
                  {mod.points.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#425466]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#635bff] mt-2 shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-16 rounded-2xl p-8 border border-violet-200 bg-gradient-to-r from-violet-50 via-indigo-50 to-emerald-50 text-center shadow-sm">
          <h3 className="text-2xl font-bold text-[#0a2540] mb-2 tracking-tight">
            Ready to Run All 28 Diagnostic Modules on Your Stack?
          </h3>
          <p className="text-[#425466] text-sm max-w-xl mx-auto mb-6">
            Get instant access to automated permissions hardening, Update Guard, and white-label executive reporting today.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="/#pricing"
              className="px-6 py-3 rounded-xl bg-[#635bff] hover:bg-violet-500 text-white font-semibold text-xs shadow-lg shadow-violet-600/30 transition-all flex items-center gap-2"
            >
              <span>Unlock Pro Access ($149)</span>
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="https://wordpress.org/plugins/phpinfo-wp/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-white border border-slate-300 hover:border-slate-400 text-[#425466] hover:text-[#0a2540] shadow-xs text-xs font-semibold transition-all"
            >
              Download Free Version
            </a>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
