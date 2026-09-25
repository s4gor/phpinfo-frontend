"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Server,
  Shield,
  ShieldCheck,
  Zap,
  Terminal,
  Database,
  Lock,
  Cpu,
  RefreshCw,
  Bell,
  Search,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Clock,
  Sparkles,
  Layers,
  FileCode,
  Gauge,
  Key,
  ExternalLink,
  ChevronRight,
  Code2,
  Mail,
  Sliders,
  Bug,
  Globe,
  LifeBuoy,
  HelpCircle,
  Wrench,
  Check,
  TrendingUp,
  TableProperties,
  HardDrive,
  Info,
  History,
  Activity,
  Camera,
  Share2,
  FileSpreadsheet,
  Network,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ExeebitBar from "@/components/exeebit-bar";
import AnimatedArrow from "@/components/ui/animated-arrow";

interface BulletItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  desc: string;
}

interface OverviewTopic {
  badge?: string;
  title: string;
  lead?: string;
  items?: BulletItem[];
  callout?: {
    title: string;
    text: string;
  };
}

interface BenchmarkRow {
  level: "Optimal" | "Warning" | "Host-Locked" | "Critical";
  levelBadge: string;
  badgeBg: string;
  meaning: string;
  recommendedAction: string;
}

interface DocSection {
  id: string;
  title: string;
  badge?: "Free" | "Pro" | "New v8.0";
  badgeColor?: string;
  icon: React.ComponentType<{ className?: string }>;
  summary: string;
  category: "Performance & Dials" | "Security & Core" | "Page Audit Tools" | "Reports & Logs";
  leadText: string;
  topics: OverviewTopic[];
  benchmarks: BenchmarkRow[];
  howToUse: string[];
}

function renderFormattedText(text: string) {
  if (!text) return null;
  const parts = text.split(/(`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      const codeContent = part.slice(1, -1);
      return (
        <code
          key={i}
          className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[11px] font-semibold text-violet-700 dark:bg-zinc-800 dark:text-violet-300 border border-zinc-200/70 dark:border-zinc-700/70 inline-block my-0.5"
        >
          {codeContent}
        </code>
      );
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}

export default function DocumentationPage() {
  const sections: DocSection[] = [
    {
      id: "server-dashboard",
      title: "1. Server Overview Dashboard & Telemetry",
      category: "Performance & Dials",
      icon: Server,
      badge: "New v8.0",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300",
      summary: "The main landing cockpit showing overall health score, live peak RAM gauge, TTFB database size, server engine, and urgent triage items.",
      leadText: "When you click phpinfo() WP in your WordPress sidebar, you land on the Server Overview Dashboard. This screen provides an instant, birds-eye view of your entire server runtime without needing to dig into technical logs.",
      topics: [
        {
          badge: "Screen Telemetry",
          title: "What You See On This Screen & What It Tracks",
          lead: "",
          items: [
            {
              icon: CheckCircle2,
              label: "Health Score & Letter Grade (A+ to F)",
              desc: "Shows your site's health at a glance, updated live.",
            },
            {
              icon: CheckCircle2,
              label: "Dual Score Card (Site Controllable vs. Server Reality)",
              desc: "Clearly separates what you can fix inside WordPress from your host's immovable server ceilings.",
            },
            {
              icon: Zap,
              label: "Peak RAM Consumption Meter",
              desc: "Displays how much memory WordPress actually consumed during the heaviest page request compared to your `memory_limit`.",
            },
            {
              icon: Zap,
              label: "Database Autoload TTFB Gauge",
              desc: "Measures the exact kilobyte size of options loaded on every visit, showing whether database bloat is slowing down Time to First Byte.",
            },
            {
              icon: Database,
              label: "Server Software & Database Engine",
              desc: "Identifies your web server (LiteSpeed, Nginx, Apache, Caddy) and MySQL/MariaDB version with its official support status.",
            },
            {
              icon: Network,
              label: "Outbound API Summary",
              desc: "Tracks external HTTP requests made to services like Stripe, PayPal, or WordPress.org.",
            },
            {
              icon: CheckCircle2,
              label: "Triage & Priority Recommendations",
              desc: "Displays smart action cards for urgent issues (such as impending PHP EOL or overdue scheduled tasks) with direct 1-click links to resolve them.",
            },
          ],
          callout: undefined,
        },
      ],
      benchmarks: [
        {
          level: "Optimal",
          levelBadge: "Grade A+ / A (Optimal)",
          badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300",
          meaning: "Your server dials are well-tuned, OPcache is accelerating requests, peak memory usage is safely below limits, and database autoload size is under 400 KB. Your site runs fast and stable.",
          recommendedAction: "No action needed. Review the dashboard weekly to verify continued stability.",
        },
        {
          level: "Warning",
          levelBadge: "Grade B / C (Warning)",
          badgeBg: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300",
          meaning: "Moderate bottlenecks detected: memory limit is approaching peak usage, database autoload is between 400 KB and 800 KB, or non-critical PHP directives could be improved.",
          recommendedAction: "Check the Triage card below the score and click the recommended action to optimize directives or clean database bloat.",
        },
        {
          level: "Critical",
          levelBadge: "Grade D / F (Critical)",
          badgeBg: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300",
          meaning: "Urgent issues present: your active PHP version is past End-of-Life, memory is running out, or display_errors is publicly leaking file paths to visitors.",
          recommendedAction: "Resolve the top-priority card immediately or use 1-Click Auto-Fix to apply safe directives.",
        },
      ],
      howToUse: [
        "Open wp-admin and navigate to phpinfo() WP > Dashboard.",
        "Check your Health Grade and the Peak RAM meter to ensure memory usage is under 75%.",
        "Review the Triage & Recommendations box and click 'Auto-Fix' or 'Review' on any flagged items.",
      ],
    },
    {
      id: "config-grader",
      title: "2. Config Grader & 1-Click Auto-Fix (With Host Locks Explained)",
      category: "Performance & Dials",
      icon: Sliders,
      badge: "Pro",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300",
      summary: "Evaluates 30+ PHP settings adapted to your active plugins, explains host locks, and safely optimizes server directives with 1-click rollback.",
      leadText: "Config Grader audits over 30 key server directives (including memory_limit, max_execution_time, upload_max_filesize, post_max_size, max_input_vars, and display_errors).",
      topics: [
        {
          badge: "Adaptive Tuning",
          title: "Context-Aware Benchmarking For Your Plugins",
          lead: "",
          items: [
          ],
          callout: undefined,
        },
        {
          badge: "Overview",
          title: "Instead Of Rigid Generic Rules, The Grader Detects Your Active Workload",
          lead: "",
          items: [
            {
              icon: AlertTriangle,
              label: "Details",
              desc: "An eCommerce site running WooCommerce, Elementor, or WP All Import needs higher memory (typically `512M`) and longer execution time.",
            },
            {
              icon: AlertTriangle,
              label: "Details",
              desc: "A standard blog or brochure site running 10-15 plugins runs perfectly on `128M` or `256M`. The grader adapts its recommendations to match your site's actual needs.",
            },
          ],
          callout: undefined,
        },
        {
          badge: "Host Locks Explained",
          title: "Why Host Locks Are Safe Boundaries (Not Errors)",
          lead: "A directive marked 'Host-Locked' simply means your hosting provider set an immovable ceiling at the server level (via PHP-FPM pool configs or `php_admin_value`).",
          items: [
            {
              icon: AlertTriangle,
              label: "Details",
              desc: "Locked does NOT mean bad! If your site runs smoothly with 0 fatal crashes in the error log, a host-locked `128M` or `256M` memory limit is 100% healthy, optimal, and secure. You do not need to change it.",
            },
            {
              icon: AlertTriangle,
              label: "Details",
              desc: "A host lock only becomes an issue if your site workload outgrows it (for example, if bulk product imports fail with '`Allowed memory size exhausted`'). In that situation, you can click 'Copy Diagnostic Report for Your Host' and send it to support.",
            },
          ],
          callout: {
            title: "The Bottom Line on Host Locks",
            text: "Locked does not mean bad! If your site runs cleanly with 0 fatal crashes in your error log, a host limit of `128M` or `256M` is 100% healthy, optimal, and secure. You only need to request an increase from your host if bulk tasks or page builders actively throw `Allowed memory size exhausted` errors.",
          },
        },
        {
          badge: "1-Click Safety",
          title: "How 1-Click Auto-Fix & Safety Rollback Work",
          lead: "When you click 'Auto-Fix', the plugin detects your web server. On Apache, it updates `.htaccess`. On Nginx and PHP-FPM, it writes to `.user.ini`.",
          items: [
            {
              icon: FileCode,
              label: "Note on `.user.ini`",
              desc: "PHP-FPM caches `.user.ini` directives (typically for 5 minutes / 300s). The plugin alerts you to wait for this cache to refresh.",
            },
            {
              icon: AlertTriangle,
              label: "Details",
              desc: "If any change causes an issue or 500 error, the plugin automatically rolls back, and you can also click 'Revert' on any individual directive at any time.",
            },
          ],
          callout: {
            title: "Automatic 500 Rollback Protection",
            text: "Every directive modification is tested immediately. If a syntax error or server conflict is detected, the plugin reverts your `.htaccess` or `.user.ini` file in milliseconds. You can also click `Revert` on any individual directive at any time.",
          },
        },
      ],
      benchmarks: [
        {
          level: "Optimal",
          levelBadge: "Pass (Green Check)",
          badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300",
          meaning: "The directive meets or exceeds best-practice recommendations for your active plugins and server environment.",
          recommendedAction: "Leave as is. The setting is optimal.",
        },
        {
          level: "Host-Locked",
          levelBadge: "Host-Locked (Gray/Purple Badge)",
          badgeBg: "bg-zinc-100 text-zinc-700 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300",
          meaning: "The host has locked this directive at the server level. If your error log shows zero crashes, this setting is completely safe and adequate.",
          recommendedAction: "Leave alone if your site works normally. If experiencing crashes, click 'Copy Diagnostic Report' for host support.",
        },
        {
          level: "Warning",
          levelBadge: "Warn / Fixable (Yellow Badge)",
          badgeBg: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300",
          meaning: "Suboptimal setting detected (e.g. max_input_vars is 1000 instead of 3000+, risking lost menu items or builder settings).",
          recommendedAction: "Click 'Auto-Fix' to have the plugin safely update the setting in .htaccess or .user.ini.",
        },
        {
          level: "Critical",
          levelBadge: "Fail (Red Badge)",
          badgeBg: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300",
          meaning: "Security or stability risk (e.g. display_errors is ON in production, revealing database credentials or paths during errors).",
          recommendedAction: "Click 'Auto-Fix' immediately to disable public error display and secure the site.",
        },
      ],
      howToUse: [
        "Navigate to phpinfo() WP > Performance > Config Grader.",
        "Review your Site Controllable Score and inspect failing or warning directives.",
        "Click 'Auto-Fix' on actionable items to optimize settings, or click 'Revert' if you wish to restore previous values.",
      ],
    },
    {
      id: "opcache-monitor",
      title: "3. OPcache Memory & Bytecode Accelerator",
      category: "Performance & Dials",
      icon: Cpu,
      badge: "Pro",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300",
      summary: "Inspects PHP bytecode cache memory, hit rates, cached script limits, and provides a 1-click OPcache reset button.",
      leadText: "OPcache speeds up WordPress by compiling PHP scripts into bytecode once and storing them directly in RAM. On subsequent page visits, PHP executes the cached code directly, reducing CPU overhead by 50% to 80%.",
      topics: [
        {
          badge: "Screen Telemetry",
          title: "What You See On This Screen & What It Tracks",
          lead: "",
          items: [
            {
              icon: CheckCircle2,
              label: "Hit Rate & Efficiency Percentage",
              desc: "Shows how often requests are served directly from cache memory (ideal is above 95%).",
            },
            {
              icon: Zap,
              label: "Memory Allocation Cards",
              desc: "Breaks down total memory buffer (e.g. `128M`B or `256M`B), showing Used Memory, Free Memory, and Wasted Memory.",
            },
            {
              icon: Zap,
              label: "Cached Scripts vs. Max Accelerated Keys",
              desc: "Shows how many PHP files are currently cached versus your server's key ceiling (e.g. 4,200 files out of 10,000 keys).",
            },
            {
              icon: Zap,
              label: "One-Click Reset OPcache Button",
              desc: "Purges stale bytecode from server memory when code updates or plugin changes fail to reflect immediately.",
            },
            {
              icon: Zap,
              label: "Cached Scripts Browser",
              desc: "A searchable table listing every cached PHP file, its memory footprint, and hit count.",
            },
          ],
          callout: undefined,
        },
      ],
      benchmarks: [
        {
          level: "Optimal",
          levelBadge: "Hit Rate > 95% (Healthy)",
          badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300",
          meaning: "Nearly all PHP code executes directly from RAM without recompilation. Server CPU load is minimal and page generation is fast.",
          recommendedAction: "No action needed. OPcache is operating at peak efficiency.",
        },
        {
          level: "Warning",
          levelBadge: "Hit Rate 80%–94% (Cache Pressure)",
          badgeBg: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300",
          meaning: "OPcache memory buffer is filling up or wasted memory is high, causing older scripts to be evicted prematurely.",
          recommendedAction: "Click 'Reset OPcache'. If the hit rate remains low, consider asking your host to increase opcache.memory_consumption to 256M.",
        },
        {
          level: "Critical",
          levelBadge: "Disabled / Not Installed",
          badgeBg: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300",
          meaning: "OPcache is turned off. PHP must re-read and compile dozens of WordPress files on every single page view, tripling server CPU usage.",
          recommendedAction: "Enable opcache in php.ini (opcache.enable=1) or request your hosting support to turn on the PHP OPcache extension.",
        },
      ],
      howToUse: [
        "Go to phpinfo() WP > Performance > OPcache.",
        "Verify your Hit Rate is above 95% and cached files have not reached the max keys limit.",
        "Click 'Reset OPcache' if you just pushed code changes or plugin updates that aren't showing up.",
      ],
    },
    {
      id: "object-cache",
      title: "4. Persistent Object Cache (Redis / Memcached)",
      category: "Performance & Dials",
      icon: Database,
      badge: "Pro",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300",
      summary: "Monitors Redis and Memcached persistent query caches, drop-in health, memory hit/miss ratios, and 1-click flush.",
      leadText: "By default, WordPress queries the database repeatedly on every page load. A persistent object cache (using Redis or Memcached) stores these database query results in fast server RAM across requests, drastically reducing database load and speeding up dynamic pages.",
      topics: [
        {
          badge: "Screen Telemetry",
          title: "What You See On This Screen & What It Tracks",
          lead: "",
          items: [
            {
              icon: CheckCircle2,
              label: "Drop-In Detection",
              desc: "Checks whether the required wp-content/object-cache.php drop-in file is installed and active.",
            },
            {
              icon: CheckCircle2,
              label: "PHP Extension Check",
              desc: "Verifies whether the Redis or Memcached PHP extensions are compiled and active on your server runtime.",
            },
            {
              icon: CheckCircle2,
              label: "Hit / Miss Telemetry",
              desc: "Displays what percentage of database queries were intercepted and served instantly from RAM versus querying MySQL.",
            },
            {
              icon: Zap,
              label: "Flush Object Cache Button",
              desc: "Clears stale memory keys with one click if dynamic data or settings appear out of sync.",
            },
            {
              icon: CheckCircle2,
              label: "Setup Guidance",
              desc: "If persistent caching is missing but Redis is available on the server, the screen provides a 1-click link to install the recommended companion plugin.",
            },
          ],
          callout: undefined,
        },
      ],
      benchmarks: [
        {
          level: "Optimal",
          levelBadge: "Connected & Active (Optimal)",
          badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300",
          meaning: "Persistent object caching is active via Redis or Memcached. Database query load is dramatically reduced and TTFB is optimized.",
          recommendedAction: "No action needed. System is running at high efficiency.",
        },
        {
          level: "Warning",
          levelBadge: "Extension Available, Drop-in Missing",
          badgeBg: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300",
          meaning: "Your hosting server has Redis installed, but WordPress is not taking advantage of it because the object-cache.php drop-in is not installed.",
          recommendedAction: "Click 'Install Redis Plugin' directly from the banner to activate persistent query caching.",
        },
        {
          level: "Critical",
          levelBadge: "Not Active (Standard WP)",
          badgeBg: "bg-zinc-100 text-zinc-700 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300",
          meaning: "All database queries hit MySQL on every page request. While standard for small blogs, this limits performance on stores and membership sites.",
          recommendedAction: "If running WooCommerce or a high-traffic site, consider enabling Redis on your hosting account.",
        },
      ],
      howToUse: [
        "Navigate to phpinfo() WP > Performance > Object Cache.",
        "Check the status banner to see if Redis or Memcached is active.",
        "If caching is active and you need to clear stale data, click 'Flush Object Cache'.",
      ],
    },
    {
      id: "database-health",
      title: "5. Database Health & Autoload Bloat Cleaner",
      category: "Performance & Dials",
      icon: Database,
      badge: "Pro",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300",
      summary: "Measures TTFB-killing autoload data in wp_options, lists bloated keys, finds missing schema indexes, and purges expired transients.",
      leadText: "Every single time WordPress loads a page, it automatically loads all rows in wp_options where autoload = 'yes' into memory in one big database query. If plugins leave behind massive cached data or expired transients in this table, your Time to First Byte (TTFB) slows down on every single visitor request.",
      topics: [
        {
          badge: "Screen Telemetry",
          title: "What You See On This Screen & What It Tracks",
          lead: "",
          items: [
            {
              icon: Database,
              label: "Total Autoload Data Size",
              desc: "Measures the exact size of autoloaded options in kilobytes. Green (<400 KB) is optimal, Yellow (400-800 KB) is moderate, and Red (>800 KB) significantly hurts TTFB.",
            },
            {
              icon: Database,
              label: "Top Autoloaded Options Table",
              desc: "Shows the largest individual keys in `wp_options`, pinpointing the exact plugin responsible for bloated data.",
            },
            {
              icon: Database,
              label: "Expired Transients Counter & 1-Click Purge",
              desc: "Counts stale temporary data records left behind by old plugins and lets you delete them with one click.",
            },
            {
              icon: Database,
              label: "Missing Indexes Scanner",
              desc: "Inspects your database tables to identify missing MySQL indexes that cause slow full-table scans.",
            },
            {
              icon: Database,
              label: "Database Engine & Size Overview",
              desc: "Details table count, overall disk storage, and MySQL/MariaDB version support status.",
            },
          ],
          callout: undefined,
        },
      ],
      benchmarks: [
        {
          level: "Optimal",
          levelBadge: "Autoload < 400 KB (Optimal)",
          badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300",
          meaning: "Autoloaded options load almost instantly into RAM. Database overhead is minimal and does not impact page load speeds.",
          recommendedAction: "No action needed. Your database options are clean and lean.",
        },
        {
          level: "Warning",
          levelBadge: "Autoload 400–800 KB (Moderate)",
          badgeBg: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300",
          meaning: "Autoload size is starting to slow down TTFB. Plugins may be saving transient data or large settings blobs with autoload enabled.",
          recommendedAction: "Click 'Purge Expired Transients' and review the top options list to identify heavy plugins.",
        },
        {
          level: "Critical",
          levelBadge: "Autoload > 800 KB (High TTFB Lag)",
          badgeBg: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300",
          meaning: "Severe database bottleneck: several megabytes of data are being transferred from MySQL into PHP on every single request, delaying server response times.",
          recommendedAction: "Purge expired transients immediately and inspect the largest autoload keys shown on the table to clean out orphaned plugin data.",
        },
      ],
      howToUse: [
        "Navigate to phpinfo() WP > Performance > Database.",
        "Check your Total Autoload Size indicator to see if it is in the green zone (<400 KB).",
        "If expired transients are detected, click 'Purge Expired Transients' to clean them up instantly.",
      ],
    },
    {
      id: "api-monitor",
      title: "6. External API Health Monitor (Stripe, PayPal, Google)",
      category: "Performance & Dials",
      icon: Network,
      badge: "Pro",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300",
      summary: "Tracks outbound HTTP requests made by WordPress to third-party endpoints, pinpointing slow APIs that freeze checkout and admin saves.",
      leadText: "WordPress plugins frequently make outbound HTTP requests (wp_remote_get and wp_remote_post) to external web services, such as payment gateways (Stripe, PayPal), marketing tools (Mailchimp), shipping calculators, or plugin license checkers. If any third-party server responds slowly or times out, your visitors and checkout screens freeze waiting for a response.",
      topics: [
        {
          badge: "Screen Telemetry",
          title: "What You See On This Screen & What It Tracks",
          lead: "",
          items: [
            {
              icon: Network,
              label: "Outbound Endpoint Breakdown",
              desc: "A table listing every external domain your site contacts (e.g., api.stripe.com, api.wordpress.org).",
            },
            {
              icon: CheckCircle2,
              label: "Request Frequency & Volume",
              desc: "How many external requests were made to each endpoint.",
            },
            {
              icon: Clock,
              label: "Average Response Time",
              desc: "How long each service takes to reply on average.",
            },
            {
              icon: Clock,
              label: "Maximum Response Time",
              desc: "The slowest recorded request to each endpoint, revealing intermittent connection freezes.",
            },
            {
              icon: Clock,
              label: "Error & Timeout Counters",
              desc: "Flags failed requests that may be breaking site integrations or ecommerce checkouts.",
            },
          ],
          callout: undefined,
        },
      ],
      benchmarks: [
        {
          level: "Optimal",
          levelBadge: "Avg Time < 0.5s (Fast)",
          badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300",
          meaning: "External third-party APIs respond rapidly with no noticeable delay to checkout or admin saving operations.",
          recommendedAction: "No action needed. Integrations are healthy.",
        },
        {
          level: "Warning",
          levelBadge: "Avg Time 0.5s–2.0s (Noticeable Lag)",
          badgeBg: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300",
          meaning: "External service is experiencing latency, causing minor delays during checkout or content publishing.",
          recommendedAction: "Monitor the endpoint. Check if the plugin contacting it has asynchronous background options.",
        },
        {
          level: "Critical",
          levelBadge: "Timeouts / Time > 2.0s (Blocking)",
          badgeBg: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300",
          meaning: "Third-party endpoint is hanging or timing out, blocking page execution and causing checkout errors.",
          recommendedAction: "Identify which plugin communicates with the failing domain and temporarily disable or update its integration settings.",
        },
      ],
      howToUse: [
        "Go to phpinfo() WP > Performance > API Monitor.",
        "Review the list of external endpoints sorted by slowest response time.",
        "Examine any domain taking over 2 seconds or showing timeout errors to isolate the culprit plugin.",
      ],
    },
    {
      id: "php-eol",
      title: "7. PHP EOL Timeline & Security Roadmap",
      category: "Security & Core",
      icon: Calendar,
      badge: "Free",
      badgeColor: "bg-zinc-100 text-zinc-700 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300",
      summary: "Tracks official end-of-life dates for every PHP version, highlights your active version, and counts down days until support expires.",
      leadText: "Every PHP version follows an official 3-year lifecycle: 2 years of active development followed by 1 year of critical security fixes. Once a version reaches End-of-Life (EOL), the PHP foundation ceases releasing security patches, leaving sites on that version exposed to unpatched vulnerabilities.",
      topics: [
        {
          badge: "Screen Telemetry",
          title: "What You See On This Screen & What It Tracks",
          lead: "",
          items: [
            {
              icon: CheckCircle2,
              label: "Version Support Roadmap",
              desc: "Chronological table covering PHP 7.4 up to PHP 8.4+.",
            },
            {
              icon: CheckCircle2,
              label: "'YOU' Badge Indicator",
              desc: "Clearly marks the exact PHP version your server is currently executing.",
            },
            {
              icon: CheckCircle2,
              label: "Official EOL Dates",
              desc: "Lists the exact calendar date when each release reached or will reach end-of-life.",
            },
            {
              icon: CheckCircle2,
              label: "Status Badges",
              desc: "Color-coded tags showing 'Supported ✓', 'EOL < 90 days', or 'End of Life'.",
            },
            {
              icon: AlertTriangle,
              label: "Days Remaining / Elapsed",
              desc: "Real-time countdown of days remaining until support concludes (or how many days have passed since support ended).",
            },
            {
              icon: CheckCircle2,
              label: "One-Click Compatibility Link",
              desc: "Jump directly to the PHP Compatibility Scanner to test your plugins before upgrading your server PHP version.",
            },
          ],
          callout: undefined,
        },
      ],
      benchmarks: [
        {
          level: "Optimal",
          levelBadge: "Supported ✓ (Active Security)",
          badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300",
          meaning: "Your active PHP version receives official security updates and patches from the PHP core development team.",
          recommendedAction: "No action needed. Enjoy modern performance and full security.",
        },
        {
          level: "Warning",
          levelBadge: "EOL in < 90 Days (Upcoming)",
          badgeBg: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300",
          meaning: "Your PHP version will stop receiving security updates within three months.",
          recommendedAction: "Run the PHP Compatibility Scanner now to prepare your plugins for the next PHP upgrade.",
        },
        {
          level: "Critical",
          levelBadge: "End of Life (Unsupported)",
          badgeBg: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300",
          meaning: "Your PHP version is officially abandoned and receives zero security patches. It is vulnerable to known exploits and runs significantly slower than modern PHP.",
          recommendedAction: "Run the PHP Compatibility Scanner, resolve any errors, and upgrade your server PHP version in your hosting control panel.",
        },
      ],
      howToUse: [
        "Navigate to phpinfo() WP > Security & Core > PHP EOL.",
        "Locate the highlighted row marked with the 'YOU' badge.",
        "If your version is in warning or EOL status, click 'Scan Compatibility' to check your plugins before upgrading.",
      ],
    },
    {
      id: "compat-scanner",
      title: "8. PHP Compatibility Scanner (PHP 7.4–8.4 Zero False Alarms)",
      category: "Security & Core",
      icon: CheckCircle2,
      badge: "Free",
      badgeColor: "bg-zinc-100 text-zinc-700 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300",
      summary: "Host-friendly static scanner checking plugins and themes for compatibility up to PHP 8.4, filtering out false-positive polyfills.",
      leadText: "Upgrading server PHP versions often causes anxiety because an incompatible plugin might trigger fatal errors and crash your site. The PHP Compatibility Scanner analyzes all your installed plugins and themes before you switch versions on your host.",
      topics: [
        {
          badge: "Architecture",
          title: "Host-Friendly Static Architecture",
          lead: "Unlike other scanners that require shell access or disabled PHP functions like exec(), this scanner runs natively inside WordPress using fast static token analysis. It operates smoothly on strict managed hosts like Kinsta, WP Engine, SiteGround, Cloudways, and Pantheon.",
          items: [
          ],
          callout: undefined,
        },
        {
          badge: "Accuracy",
          title: "Zero False Alarms (Polyfills & Shims Ignored)",
          lead: "Standard scanners frequently trigger hundreds of confusing warnings on harmless backward-compatibility code (polyfills like symfony/polyfill or conditional checks like if (version_compare(...))). Our scanner intelligently ignores these safe wrappers and only flags real breaking changes, removed functions, and deprecated syntax.",
          items: [
          ],
          callout: undefined,
        },
        {
          badge: "Screen Telemetry",
          title: "What You See On This Screen & What It Tracks",
          lead: "",
          items: [
            {
              icon: CheckCircle2,
              label: "Target Version Dropdown",
              desc: "Select your target upgrade version (e.g. PHP 8.1, 8.2, 8.3, or 8.4).",
            },
            {
              icon: CheckCircle2,
              label: "Background Scan Support",
              desc: "Large sites can run scans in the background with a live progress indicator.",
            },
            {
              icon: CheckCircle2,
              label: "Clear Results Table",
              desc: "Displays file path, line number, issue type (Fatal Error vs Deprecation), and the exact code snippet responsible.",
            },
          ],
          callout: undefined,
        },
      ],
      benchmarks: [
        {
          level: "Optimal",
          levelBadge: "100% Compatible (Green)",
          badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300",
          meaning: "No breaking syntax or removed functions detected across all active plugins and themes for the target PHP version.",
          recommendedAction: "You can safely upgrade your server PHP version in your hosting control panel.",
        },
        {
          level: "Warning",
          levelBadge: "Deprecation Notices (Yellow)",
          badgeBg: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300",
          meaning: "Code uses syntax deprecated in the target version. It will still execute without crashing, but should be updated by the plugin author in future updates.",
          recommendedAction: "Check if plugin updates are available. Ensure display_errors is turned off so warnings don't show on the frontend.",
        },
        {
          level: "Critical",
          levelBadge: "Breaking Change / Fatal (Red)",
          badgeBg: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300",
          meaning: "A plugin calls a function completely removed in the target PHP version. Upgrading server PHP without updating this plugin will cause a fatal 500 crash.",
          recommendedAction: "Update or replace the flagged plugin before upgrading server PHP.",
        },
      ],
      howToUse: [
        "Go to phpinfo() WP > Security & Core > PHP Compatibility.",
        "Select your desired upgrade version (e.g., PHP 8.3 or 8.4) and click 'Run Scan'.",
        "Review the report: if clean, proceed with upgrading your PHP version in your hosting control panel.",
      ],
    },
    {
      id: "update-guard",
      title: "9. Update Guard - Pre-Update Safety Scanner",
      category: "Security & Core",
      icon: Shield,
      badge: "Free",
      badgeColor: "bg-zinc-100 text-zinc-700 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300",
      summary: "Scans pending plugin and theme updates before you apply them, checking PHP/WP version floors, changelog risks, and abandonment.",
      leadText: "Clicking 'Update Now' in WordPress can be risky. Update Guard acts as an automated pre-flight safety check for pending plugin and theme updates to ensure they won't break your site.",
      topics: [
        {
          badge: "Screen Telemetry",
          title: "What You See On This Screen & What It Tracks",
          lead: "",
          items: [
            {
              icon: CheckCircle2,
              label: "Pending Updates Safety Roster",
              desc: "Lists every plugin and theme waiting for an update with a clear verdict: 'Safe to update', 'Update with caution', or 'Risky - review first'.",
            },
            {
              icon: CheckCircle2,
              label: "Minimum PHP & WordPress Version Verification",
              desc: "Verifies whether the incoming update requires a newer PHP or WordPress version than your server currently provides.",
            },
            {
              icon: AlertTriangle,
              label: "Changelog Breaking-Change Analyzer",
              desc: "Scans the developer's changelog text for keywords indicating database migrations, major architectural refactors, or breaking API changes.",
            },
            {
              icon: AlertTriangle,
              label: "WordPress.org Abandonment Alerts",
              desc: "Flags plugins that have not received an update in over 2 years, warning you of unmaintained extensions.",
            },
            {
              icon: AlertTriangle,
              label: "AI Plain-English Remediation",
              desc: "Explains what risks were detected in plain language so you can make informed update decisions.",
            },
          ],
          callout: undefined,
        },
      ],
      benchmarks: [
        {
          level: "Optimal",
          levelBadge: "Safe to Update (Green Check)",
          badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300",
          meaning: "The update matches your server environment, introduces minor bug fixes or enhancements, and has no breaking changes noted.",
          recommendedAction: "Proceed with updating the plugin normally.",
        },
        {
          level: "Warning",
          levelBadge: "Update with Caution (Yellow Alert)",
          badgeBg: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300",
          meaning: "Major version jump detected (e.g. v2.x to v3.0) or changelog mentions database migrations.",
          recommendedAction: "Take a quick backup or verify the update during off-peak hours.",
        },
        {
          level: "Critical",
          levelBadge: "Risky - Review First (Red Alert)",
          badgeBg: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300",
          meaning: "Incompatible version floor: the update requires a higher PHP or WordPress version than your server currently runs, or the plugin has been abandoned.",
          recommendedAction: "Do not update until you upgrade your server PHP version or find a modern replacement plugin.",
        },
      ],
      howToUse: [
        "Navigate to phpinfo() WP > Security & Core > Update Guard (Plugins tab).",
        "Review the list of pending updates and their safety verdicts.",
        "If an update is marked 'Risky', review the required PHP version before updating.",
      ],
    },
    {
      id: "core-readiness",
      title: "10. Core Readiness Audit (Target WordPress Scanner)",
      category: "Security & Core",
      icon: Code2,
      badge: "Pro",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300",
      summary: "Scans all installed plugins and themes against target WordPress core releases to find deprecated or removed core functions before upgrading.",
      leadText: "Major WordPress core updates (like WP 6.6, 6.7, or 7.0) regularly deprecate or remove old core functions and modernize internal APIs. If an installed plugin relies on a removed core function, upgrading WordPress can trigger fatal errors.",
      topics: [
        {
          badge: "Screen Telemetry",
          title: "What You See On This Screen & What It Tracks",
          lead: "",
          items: [
            {
              icon: CheckCircle2,
              label: "Target Core Version Selector",
              desc: "Choose the WordPress release you are preparing to update to (e.g., target WP 6.7 or WP 7.0).",
            },
            {
              icon: CheckCircle2,
              label: "Deep Code Scan",
              desc: "Analyzes your active and installed themes and plugins against WordPress core deprecation indexes.",
            },
            {
              icon: CheckCircle2,
              label: "Readiness Verdict",
              desc: "Delivers a clean assessment indicating whether your plugin ecosystem is fully ready for the core upgrade.",
            },
            {
              icon: CheckCircle2,
              label: "Line-by-Line Code Findings",
              desc: "Lists the exact plugin name, file path, line number, and deprecated core function being called, along with its modern replacement.",
            },
          ],
          callout: undefined,
        },
      ],
      benchmarks: [
        {
          level: "Optimal",
          levelBadge: "Core Ready ✓ (Clean)",
          badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300",
          meaning: "Zero calls to deprecated or removed WordPress core APIs detected across all installed code.",
          recommendedAction: "You can upgrade to the target WordPress core release with complete confidence.",
        },
        {
          level: "Warning",
          levelBadge: "Deprecated Function Noted",
          badgeBg: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300",
          meaning: "A plugin calls a function deprecated in the target core release. WordPress maintains backward compatibility for now, but the function will be removed in future versions.",
          recommendedAction: "Safe to update WordPress, but verify plugin updates are kept up to date.",
        },
        {
          level: "Critical",
          levelBadge: "Removed Core API Call",
          badgeBg: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300",
          meaning: "A plugin uses a legacy core function that is completely removed in the target WordPress version. Upgrading core will cause a fatal error.",
          recommendedAction: "Update the affected plugin to its latest release before upgrading WordPress core.",
        },
      ],
      howToUse: [
        "Go to phpinfo() WP > Security & Core > Update Guard > Core Audit tab.",
        "Select your target WordPress version from the dropdown.",
        "Click 'Run Core Scan' and verify your plugins do not call removed core functions.",
      ],
    },
    {
      id: "update-history",
      title: "11. Update History & 60-Second Post-Update Health Diagnostics",
      category: "Security & Core",
      icon: History,
      badge: "Pro",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300",
      summary: "Logs every update and automatically runs 60-second post-update health diagnostics (loopback, error delta, cron) to catch silent breakages.",
      leadText: "Many site crashes happen silently after an update: a plugin update succeeds, but 5 minutes later visitors experience 500 errors, checkout buttons stop working, or scheduled tasks fail to run.",
      topics: [
        {
          badge: "Screen Telemetry",
          title: "What You See On This Screen & What It Tracks",
          lead: "1. Loopback Request Test: Verifies your web server can process internal HTTP requests without hanging or failing. 2. Error Log Delta: Compares your error log before and after the update to detect any newly triggered fatal errors or crashes. 3. WP-Cron Health Check: Verifies that scheduled background jobs are still executing normally.",
          items: [
            {
              icon: AlertTriangle,
              label: "Complete Update Audit Trail",
              desc: "Chronological history of every core, plugin, and theme update applied on your site, noting previous version, new version, user, and timestamp.",
            },
            {
              icon: CheckCircle2,
              label: "Automated 60-Second Post-Update Health Check",
              desc: "After any update, the plugin automatically runs a battery of three automated health diagnostics:",
            },
            {
              icon: CheckCircle2,
              label: "Stability Scoring",
              desc: "Highlights whether each update settled cleanly or triggered background warnings.",
            },
          ],
          callout: undefined,
        },
      ],
      benchmarks: [
        {
          level: "Optimal",
          levelBadge: "Healthy (3/3 Checks Passed)",
          badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300",
          meaning: "Loopback requests succeed, zero new fatal errors were logged, and cron schedules remain active after the update.",
          recommendedAction: "No action needed. The update settled cleanly.",
        },
        {
          level: "Warning",
          levelBadge: "Warning (Minor Error Log Delta)",
          badgeBg: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300",
          meaning: "The site is online, but the updated plugin generated new PHP deprecation or warning notices in debug.log.",
          recommendedAction: "Inspect the error log to see if the notices are harmless or require attention.",
        },
        {
          level: "Critical",
          levelBadge: "Failed (Loopback / Fatal Crash)",
          badgeBg: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300",
          meaning: "Post-update check detected newly logged fatal errors or broken loopback processing, indicating the update compromised site functionality.",
          recommendedAction: "Use Troubleshooting Mode to isolate the issue, or revert the plugin to its previous version.",
        },
      ],
      howToUse: [
        "Go to phpinfo() WP > Security & Core > Update Guard > History tab.",
        "Review your recent update events and inspect the 60-second post-update health status.",
        "Click 'Run Health Check Now' at any time to run on-demand loopback and error diagnostics.",
      ],
    },
    {
      id: "permissions",
      title: "12. Permissions Audit & 1-Click Chmod Repair",
      category: "Security & Core",
      icon: Lock,
      badge: "Pro",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300",
      summary: "Audits core files, uploads, and wp-config.php for dangerous 777 permissions or update-blocking restrictions, with 1-click chmod repair.",
      leadText: "Incorrect file and folder permissions are a leading cause of security breaches and broken WordPress updates. World-writable permissions (chmod 777) allow attackers to overwrite PHP files, while overly strict permissions cause WordPress automatic updates and image uploads to fail.",
      topics: [
        {
          badge: "Screen Telemetry",
          title: "What You See On This Screen & What It Tracks",
          lead: "",
          items: [
            {
              icon: ShieldCheck,
              label: "`wp-config.php` Security Check",
              desc: "Inspects your most critical file to ensure it is locked down to `0600`, `0640`, or `0644`, preventing unauthorized reading of database credentials.",
            },
            {
              icon: FileCode,
              label: "Directory & File Permissions Breakdown",
              desc: "Recursively audits core folders (/wp-admin, /wp-includes, /wp-content, /uploads, /plugins, and /themes).",
            },
            {
              icon: ShieldCheck,
              label: "Dangerous Permissions Alerts",
              desc: "Highlights any file or folder set to 777 or world-writable modes in bright red.",
            },
            {
              icon: CheckCircle2,
              label: "Ownership & UID Verification",
              desc: "Checks whether the web server process user (e.g. www-data, nginx) matches file ownership.",
            },
            {
              icon: CheckCircle2,
              label: "-Click Auto-Fix Permissions Button",
              desc: "Instantly resets directories to safe `0755`, files to `0644`, and locks `wp-config.php` to `0600` without needing SSH terminal access.",
            },
          ],
          callout: undefined,
        },
      ],
      benchmarks: [
        {
          level: "Optimal",
          levelBadge: "Hardened (0755 / 0644)",
          badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300",
          meaning: "All directories are set to 755 and files are set to 644. wp-config.php is secured. WordPress can update plugins safely without security exposure.",
          recommendedAction: "No action needed. Filesystem permissions are properly hardened.",
        },
        {
          level: "Warning",
          levelBadge: "Ownership Mismatch",
          badgeBg: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300",
          meaning: "Files are owned by a different user than the PHP process, which may prompt for FTP credentials during plugin installations.",
          recommendedAction: "Click 'Auto-Fix Permissions' or contact your host to chown files to the web server user.",
        },
        {
          level: "Critical",
          levelBadge: "Dangerous 0777 Permissions",
          badgeBg: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300",
          meaning: "Files or directories are world-writable (777). Any user on the server or web exploit can overwrite files with malicious scripts.",
          recommendedAction: "Click 'Auto-Fix Permissions' immediately to restore safe 755/644 permissions.",
        },
      ],
      howToUse: [
        "Navigate to phpinfo() WP > Security & Core > Permissions Audit.",
        "Review the scan results for any red flagged world-writable files.",
        "Click 'Auto-Fix Permissions' to safely chmod all directories and secure wp-config.php.",
      ],
    },
    {
      id: "security-headers",
      title: "13. Security Headers Auditor & Fixer",
      category: "Security & Core",
      icon: ShieldCheck,
      badge: "Pro",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300",
      summary: "Audits live HTTP response headers against OWASP standards (HSTS, CSP, X-Frame-Options) with 1-click auto-fix injection.",
      leadText: "HTTP security response headers instruct visitors' browsers how to handle your site's content safely. Missing security headers leave your site susceptible to clickjacking (embedding your site in malicious iframes), MIME-type confusion attacks, and packet sniffing.",
      topics: [
        {
          badge: "Screen Telemetry",
          title: "What You See On This Screen & What It Tracks",
          lead: "1. Strict-Transport-Security (HSTS): Enforces HTTPS connections and prevents SSL downgrade attacks. 2. X-Content-Type-Options: Prevents browsers from MIME-sniffing file uploads into executable scripts. 3. X-Frame-Options: Protects your site against clickjacking attacks. 4. Content-Security-Policy (CSP): Restricts unauthorized script injection and Cross-Site Scripting (XSS). 5. Referrer-Policy: Protects user privacy when navigating to external links. 6. Permissions-Policy: Disables unneeded browser APIs like microphone or geolocation.",
          items: [
            {
              icon: FileSpreadsheet,
              label: "Live Loopback Header Audit",
              desc: "Sends an internal request to your homepage and analyzes your live HTTP response headers.",
            },
            {
              icon: CheckCircle2,
              label: "OWASP Evaluation Matrix",
              desc: "Inspects six essential protections:",
            },
            {
              icon: CheckCircle2,
              label: "-Click Auto-Fix Missing Headers Button",
              desc: "Injects tested, safe security header rules directly into `.htaccess` on Apache/LiteSpeed, or provides ready-to-paste Nginx configurations.",
            },
            {
              icon: History,
              label: "-Click Revert Button",
              desc: "Easily restore previous settings if needed.",
            },
          ],
          callout: undefined,
        },
      ],
      benchmarks: [
        {
          level: "Optimal",
          levelBadge: "Grade A+ / A (Fully Hardened)",
          badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300",
          meaning: "HSTS, X-Content-Type-Options, X-Frame-Options, and CSP are active. Browsers strictly enforce security rules for all visitors.",
          recommendedAction: "No action needed. Site passes OWASP header guidelines.",
        },
        {
          level: "Warning",
          levelBadge: "Grade B / C (Partially Protected)",
          badgeBg: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300",
          meaning: "Basic HTTPS is present, but modern protection headers like HSTS or X-Frame-Options are missing.",
          recommendedAction: "Click 'Auto-Fix Missing Headers' to add the missing security directives.",
        },
        {
          level: "Critical",
          levelBadge: "Grade F (Zero Protection Headers)",
          badgeBg: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300",
          meaning: "No security headers are being sent by the web server. Your site can be framed in phishing attacks and is vulnerable to MIME sniffing.",
          recommendedAction: "Click 'Auto-Fix Missing Headers' immediately to inject safe headers.",
        },
      ],
      howToUse: [
        "Go to phpinfo() WP > Security & Core > Security Headers.",
        "Inspect your grade and view which specific headers are missing.",
        "Click 'Auto-Fix Missing Headers' to write the optimized rules directly to your web server config.",
      ],
    },
    {
      id: "ssl-monitor",
      title: "14. SSL Certificate & Expiration Countdown",
      category: "Security & Core",
      icon: Lock,
      badge: "Pro",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300",
      summary: "Tracks SSL certificate expiration dates, verifies domain SAN matching, tests 301 HTTPS redirection, and scans for mixed content.",
      leadText: "An expired SSL certificate immediately triggers frightening 'Your connection is not private' security warnings in visitors' browsers, destroying trust and sales. The SSL Monitor tracks your certificate health and alerts you well before expiration.",
      topics: [
        {
          badge: "Screen Telemetry",
          title: "What You See On This Screen & What It Tracks",
          lead: "",
          items: [
            {
              icon: CheckCircle2,
              label: "Expiration Days Countdown",
              desc: "Large visual counter showing exact days remaining until your certificate expires.",
            },
            {
              icon: ShieldCheck,
              label: "Certificate Authority Details",
              desc: "Displays certificate issuer (Let's Encrypt, Cloudflare, DigiCert, Sectigo) and exact validity dates.",
            },
            {
              icon: Network,
              label: "Domain Mismatch Verification",
              desc: "Checks your site's domain name against the Subject Alternative Names (SAN) in the certificate.",
            },
            {
              icon: CheckCircle2,
              label: "HTTPS Redirection Check",
              desc: "Verifies whether unencrypted HTTP requests properly redirect to HTTPS with a permanent 301 redirect.",
            },
            {
              icon: CheckCircle2,
              label: "Mixed Content Scanner",
              desc: "Inspects your homepage for insecure http:// assets (images, stylesheets, fonts) that break the browser security padlock.",
            },
            {
              icon: Network,
              label: "Extra Monitored Domains",
              desc: "Pro allows adding other external domains or subdomains (such as checkout, CDN, or client subdomains) to monitor their SSL health in one place.",
            },
          ],
          callout: undefined,
        },
      ],
      benchmarks: [
        {
          level: "Optimal",
          levelBadge: "Valid (> 30 Days Remaining)",
          badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300",
          meaning: "Certificate is valid, domain matches, and auto-renewal is on schedule. Secure padlock displays for all visitors.",
          recommendedAction: "No action needed. Renewal is tracked automatically.",
        },
        {
          level: "Warning",
          levelBadge: "Expires in < 14 Days",
          badgeBg: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300",
          meaning: "Certificate expiration is approaching and auto-renewal has not completed.",
          recommendedAction: "Log in to your hosting panel or Cloudflare account and trigger a manual SSL certificate renewal.",
        },
        {
          level: "Critical",
          levelBadge: "Expired or Domain Mismatch",
          badgeBg: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300",
          meaning: "Certificate is expired or does not cover your domain name. Visitors are blocked by browser security warning screens.",
          recommendedAction: "Renew or reinstall your SSL certificate immediately in your host control panel.",
        },
      ],
      howToUse: [
        "Navigate to phpinfo() WP > Security & Core > SSL Monitor.",
        "Check the Expiration Countdown card to verify your certificate has ample days remaining.",
        "Verify that HTTPS Redirection and Mixed Content checks are marked green.",
      ],
    },
    {
      id: "phpinfo-viewer",
      title: "15. phpinfo() Modern Viewer & Section Navigation",
      category: "Page Audit Tools",
      icon: Terminal,
      badge: "Free",
      badgeColor: "bg-zinc-100 text-zinc-700 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300",
      summary: "Searchable, modern, and secure phpinfo() output with instant directive filter, dynamic section jumps, and responsive styling.",
      leadText: "The classic phpinfo() function is essential for viewing server parameters, but raw browser output is unstyled, hard to search, and unwieldy. This viewer restyles phpinfo into a modern, searchable in-admin interface.",
      topics: [
        {
          badge: "Screen Telemetry",
          title: "What You See On This Screen & What It Tracks",
          lead: "",
          items: [
            {
              icon: Clock,
              label: "Instant Real-Time Search Filter",
              desc: "Type any directive name (e.g. `memory_limit`, `max_execution_time`, imagick, curl, openssl) to instantly filter the entire output.",
            },
            {
              icon: CheckCircle2,
              label: "'Jump to Section' Dynamic Dropdown",
              desc: "Automatically indexes all PHP module headers (Core, Environment, Configuration, Extensions) so you can jump directly to any section.",
            },
            {
              icon: CheckCircle2,
              label: "Clean Responsive Styling",
              desc: "Modern tables with alternating rows and clear formatting replace raw browser defaults.",
            },
            {
              icon: CheckCircle2,
              label: "Floating Scroll-to-Top Button",
              desc: "Easily navigate back to the search bar on long technical pages.",
            },
          ],
          callout: undefined,
        },
      ],
      benchmarks: [
        {
          level: "Optimal",
          levelBadge: "Viewer Active (Healthy)",
          badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300",
          meaning: "Complete server runtime directives are accessible directly inside wp-admin without creating insecure standalone php files.",
          recommendedAction: "Use the search bar whenever you need to check an exact directive value or module version.",
        },
        {
          level: "Warning",
          levelBadge: "Function Restricted",
          badgeBg: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300",
          meaning: "Some hosting environments disable raw phpinfo() in disable_functions for security.",
          recommendedAction: "Our plugin gracefully falls back to displaying individual ini_get values across the other audit screens.",
        },
        {
          level: "Critical",
          levelBadge: "External PHP Files Found",
          badgeBg: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300",
          meaning: "Having standalone info.php or phpinfo.php files left in your web root exposes sensitive server details to public scrapers.",
          recommendedAction: "Delete any standalone phpinfo files from your web root and use this secure in-admin viewer instead.",
        },
      ],
      howToUse: [
        "Navigate to phpinfo() WP > Page Audit Tools > phpinfo() Viewer.",
        "Type a directive name (such as 'memory_limit' or 'curl') into the search box to filter instantly.",
        "Use the 'Jump to section' dropdown to navigate directly to modules like OPcache or PDO.",
      ],
    },
    {
      id: "htaccess-editor",
      title: "16. PHP Config Editor (.htaccess / .user.ini) & Web Server Snippets",
      category: "Page Audit Tools",
      icon: FileCode,
      badge: "Free",
      badgeColor: "bg-zinc-100 text-zinc-700 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300",
      summary: "Safely edit server configuration files with automatic backups, syntax rollback, and a 1-click Web Server Snippet Library.",
      leadText: "Editing .htaccess or .user.ini manually via FTP or file managers carries the risk of a single typo causing a 500 Internal Server Error. The PHP Config Editor provides a safe, in-admin editing environment with automatic safeguards.",
      topics: [
        {
          badge: "Server Targeting",
          title: "Apache (`.htaccess`) vs Nginx / LiteSpeed (`.user.ini`)",
          lead: "",
          items: [
            {
              icon: AlertTriangle,
              label: "Details",
              desc: "On Apache servers running mod_php, the editor manages `.htaccess`.",
            },
            {
              icon: AlertTriangle,
              label: "Details",
              desc: "On Nginx, LiteSpeed, and PHP-FPM servers, the editor automatically targets `.user.ini`.",
            },
          ],
          callout: undefined,
        },
        {
          badge: "1-Click Safety",
          title: "How 1-Click Auto-Fix & Safety Rollback Work",
          lead: "",
          items: [
            {
              icon: AlertTriangle,
              label: "Details",
              desc: "Before saving any modification, the editor automatically saves a backup copy (htaccess-phpinfo.txt or userini-phpinfo.txt).",
            },
            {
              icon: AlertTriangle,
              label: "Details",
              desc: "If a syntax error is introduced, you can restore your working configuration with one click.",
            },
          ],
          callout: {
            title: "Automatic 500 Rollback Protection",
            text: "Every directive modification is tested immediately. If a syntax error or server conflict is detected, the plugin reverts your `.htaccess` or `.user.ini` file in milliseconds. You can also click `Revert` on any individual directive at any time.",
          },
        },
        {
          badge: "Snippet Library",
          title: "Pre-Tested Production Web Server Snippets",
          lead: "",
          items: [
          ],
          callout: undefined,
        },
        {
          badge: "Overview",
          title: "Includes Pre-Tested, Production-Grade Optimization Blocks You Can Inject With 1-Click On Apache/Litespeed (Or Copy For Nginx)",
          lead: "1. Aggressive GZIP / Brotli Compression: Compresses HTML, CSS, JS, and JSON before delivery to improve TTFB. 2. Browser Caching (Expires Headers): Caches static assets (images, fonts, stylesheets) in visitors' browsers for 1 year. 3. Security Headers: Hardens against clickjacking and MIME-type sniffing. 4. Bad Bots Blocker: Blocks aggressive crawlers (SemrushBot, AhrefsBot, MJ12bot) from draining server CPU.",
          items: [
          ],
          callout: undefined,
        },
      ],
      benchmarks: [
        {
          level: "Optimal",
          levelBadge: "Writable & Backed Up (Optimal)",
          badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300",
          meaning: "Configuration file is writable by WordPress and automatic backup snapshots are active.",
          recommendedAction: "Use snippets or manual adjustments to tune server parameters safely.",
        },
        {
          level: "Warning",
          levelBadge: ".user.ini Cache Active",
          badgeBg: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300",
          meaning: "Changes saved to .user.ini take up to 5 minutes (user_ini.cache_ttl) to be re-read by PHP-FPM.",
          recommendedAction: "Wait 5 minutes after saving directives in .user.ini before verifying values.",
        },
        {
          level: "Critical",
          levelBadge: "File Not Writable (Permissions)",
          badgeBg: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300",
          meaning: "The root directory or configuration file cannot be written by the web server.",
          recommendedAction: "Run the Permissions Audit to chmod the file or edit via your hosting panel.",
        },
      ],
      howToUse: [
        "Go to phpinfo() WP > Page Audit Tools > PHP Config Editor.",
        "To add speed rules, click 'Add to .htaccess' on any Web Server Snippet (e.g. GZIP or Browser Caching).",
        "Clear your cache (plugin, CDN, browser) to verify the new rules take effect.",
      ],
    },
    {
      id: "safemode",
      title: "17. Troubleshooting Mode (Zero Downtime for Visitors)",
      category: "Page Audit Tools",
      icon: LifeBuoy,
      badge: "Free",
      badgeColor: "bg-zinc-100 text-zinc-700 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300",
      summary: "Private per-user debugging session: deactivates plugins only for your admin browser while live visitors browse normally.",
      leadText: "When a site breaks or has plugin conflicts, traditional debugging advice is to deactivate all plugins and switch to a default theme. On a live production site or busy WooCommerce store, this is unacceptable because it disrupts real customers and halts sales.",
      topics: [
        {
          badge: "Zero Downtime",
          title: "How Private Per-User Troubleshooting Works",
          lead: "",
          items: [
          ],
          callout: {
            title: "Zero Visitor Interruption Guarantee",
            text: "Troubleshooting Mode is strictly isolated to your administrator session via an `mu-plugin`. Real customers, checkout carts, and search engine crawlers continue loading the full live site normally without experiencing a single second of downtime.",
          },
        },
        {
          badge: "Overview",
          title: "Unlike Other Tools That Disable Plugins Site-Wide For Everyone, Phpinfo() Wp Operates In A Private, Per-User Session Using A Lightweight Mu-Plugin (Must-Use Plugin)",
          lead: "",
          items: [
            {
              icon: AlertTriangle,
              label: "Details",
              desc: "Only YOUR browser session sees plugins disabled and a clean default theme.",
            },
            {
              icon: AlertTriangle,
              label: "Details",
              desc: "Live visitors, customers, and other administrators continue browsing the normal live site with 100% uptime and zero disruption!",
            },
          ],
          callout: undefined,
        },
        {
          badge: "Conflict Isolation",
          title: "Isolating Problematic Plugins Step-by-Step",
          lead: "",
          items: [
            {
              icon: AlertTriangle,
              label: "Details",
              desc: "Inside your private session, a control panel lets you toggle plugins back on one by one.",
            },
            {
              icon: AlertTriangle,
              label: "Details",
              desc: "Test your issue after enabling each plugin. The moment the bug reappears, you have identified the exact conflicting plugin!",
            },
            {
              icon: AlertTriangle,
              label: "Details",
              desc: "Click 'Stop Troubleshooting Mode' at any time to remove the mu-plugin and restore your admin view instantly.",
            },
          ],
          callout: undefined,
        },
      ],
      benchmarks: [
        {
          level: "Optimal",
          levelBadge: "Session Inactive (Live Site Normal)",
          badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300",
          meaning: "All plugins and themes are running normally across all user sessions.",
          recommendedAction: "Engage Troubleshooting Mode whenever you need to debug a layout or plugin conflict safely.",
        },
        {
          level: "Warning",
          levelBadge: "Troubleshooting Active (Per-User)",
          badgeBg: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300",
          meaning: "Troubleshooting mode is active for your browser session only. Public visitors continue browsing normally.",
          recommendedAction: "Toggle plugins on one by one to find the conflict, then click 'Stop Troubleshooting Mode'.",
        },
        {
          level: "Critical",
          levelBadge: "Stuck mu-plugin Detected",
          badgeBg: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300",
          meaning: "An mu-plugin file remains in wp-content/mu-plugins due to restrictive file permissions.",
          recommendedAction: "Click 'Remove mu-plugin' on the Troubleshooting screen to delete the file cleanly.",
        },
      ],
      howToUse: [
        "Navigate to phpinfo() WP > Page Audit Tools > Troubleshooting.",
        "Click 'Start Troubleshooting Mode' (a notification confirms only your session is affected).",
        "Enable suspect plugins one by one until the issue reappears, note the culprit, and click 'Stop Troubleshooting Mode'.",
      ],
    },
    {
      id: "basic-info",
      title: "18. Basic Info & Server Environment",
      category: "Page Audit Tools",
      icon: Info,
      badge: "Free",
      badgeColor: "bg-zinc-100 text-zinc-700 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300",
      summary: "Clean environmental summary of WordPress core, active/installed plugin ratios, debug mode, and cached directory sizes.",
      leadText: "When submitting support requests to plugin developers or server administrators, you need a concise, accurate breakdown of your WordPress environment without clutter. Basic Info compiles these essential metrics into a clean table.",
      topics: [
        {
          badge: "Screen Telemetry",
          title: "What You See On This Screen & What It Tracks",
          lead: "",
          items: [
            {
              icon: AlertTriangle,
              label: "WordPress Core Details",
              desc: "Site URL, Home URL, WordPress version, active theme and version.",
            },
            {
              icon: CheckCircle2,
              label: "Plugin & Theme Counts",
              desc: "Shows active vs installed plugin ratio (e.g. '18 of 24 installed'), helping spot deactivated plugins cluttering disk space.",
            },
            {
              icon: AlertTriangle,
              label: "Debug Mode Indicator",
              desc: "Highlights `WP_DEBUG` status in green (Off) or red (ON - disable in production) to ensure debug output isn't slowing production.",
            },
            {
              icon: CheckCircle2,
              label: "Disk Storage & Directory Sizes",
              desc: "Safely calculates and caches the exact disk usage of /wp-content/uploads, /wp-content/themes, and /wp-content/plugins.",
            },
            {
              icon: Clock,
              label: "Runtime Specs",
              desc: "Details PHP version with EOL status, memory usage percentage, cURL version, and server software.",
            },
          ],
          callout: undefined,
        },
      ],
      benchmarks: [
        {
          level: "Optimal",
          levelBadge: "Clean Environment (Optimal)",
          badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300",
          meaning: "WP_DEBUG is Off, unneeded plugins are pruned, and directory sizes are within normal hosting storage quotas.",
          recommendedAction: "No action needed. Site configuration is clean.",
        },
        {
          level: "Warning",
          levelBadge: "Unused Plugins / Large Uploads",
          badgeBg: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300",
          meaning: "Many inactive plugins are installed, or uploads folder size exceeds several gigabytes.",
          recommendedAction: "Delete unneeded deactivated plugins and optimize image uploads.",
        },
        {
          level: "Critical",
          levelBadge: "WP_DEBUG Enabled in Production",
          badgeBg: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300",
          meaning: "Debug mode is ON on a live site, risking visible PHP errors to visitors and filling error logs.",
          recommendedAction: "Set define('WP_DEBUG', false); in wp-config.php.",
        },
      ],
      howToUse: [
        "Navigate to phpinfo() WP > Page Audit Tools > Basic Info.",
        "Verify WP_DEBUG is Off and review the directory storage numbers.",
        "Use this summary whenever a plugin support representative requests your site specs.",
      ],
    },
    {
      id: "extensions",
      title: "19. PHP Extensions Catalog & Recommendations",
      category: "Page Audit Tools",
      icon: Layers,
      badge: "Free",
      badgeColor: "bg-zinc-100 text-zinc-700 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300",
      summary: "Catalogs all loaded PHP extensions, checks against 21 WordPress/WooCommerce requirements, and flags missing modules.",
      leadText: "WordPress core, WooCommerce, and modern block builders rely on specific compiled PHP extensions to perform essential functions (such as imagick/gd for responsive image resizing, curl for API calls, mbstring for multilingual text, and zip for automated plugin updates).",
      topics: [
        {
          badge: "Screen Telemetry",
          title: "What You See On This Screen & What It Tracks",
          lead: "",
          items: [
            {
              icon: CheckCircle2,
              label: "Loaded vs. Missing Counter",
              desc: "Displays total loaded extensions and flags missing recommended modules in bright red.",
            },
            {
              icon: CheckCircle2,
              label: "WordPress & WooCommerce Official Requirements Check",
              desc: "Evaluates your server against 21 standard extensions: curl, dom, exif, fileinfo, gd, hash, iconv, imagick, intl, json, mbstring, mysqli, openssl, pcre, pdo_mysql, SimpleXML, sodium, xml, xmlreader, zip, and zlib.",
            },
            {
              icon: AlertTriangle,
              label: "Red Alert Box for Missing Modules",
              desc: "Clearly lists missing recommended extensions and explains what functionality may be impaired (e.g. missing imagick impairs WebP image generation).",
            },
            {
              icon: CheckCircle2,
              label: "Live Search Filter",
              desc: "Quickly search through all installed extensions to confirm whether specific libraries (like redis, bcmath, or soap) are active.",
            },
          ],
          callout: undefined,
        },
      ],
      benchmarks: [
        {
          level: "Optimal",
          levelBadge: "All Recommended Loaded (Optimal)",
          badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300",
          meaning: "All 21 recommended extensions for WordPress and WooCommerce are loaded. Images resize cleanly and APIs function without issue.",
          recommendedAction: "No action needed. PHP runtime has complete module coverage.",
        },
        {
          level: "Warning",
          levelBadge: "Imagick or Intl Missing",
          badgeBg: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300",
          meaning: "WordPress falls back to the slower GD library for image processing, and multilingual formatting may be limited.",
          recommendedAction: "Ask your hosting provider to enable the php-imagick and php-intl extensions.",
        },
        {
          level: "Critical",
          levelBadge: "Core Extension Missing (cURL/Zip)",
          badgeBg: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300",
          meaning: "Essential modules like cURL, openssl, or zip are missing. Automated updates, plugin installations, and payment gateways will fail.",
          recommendedAction: "Contact your host immediately to install the missing core PHP extensions.",
        },
      ],
      howToUse: [
        "Go to phpinfo() WP > Page Audit Tools > Extensions.",
        "Check if any modules appear in the red 'Recommended - Not Loaded' section at the top.",
        "Use the search box to check whether any specific third-party module (e.g. redis or soap) is loaded.",
      ],
    },
    {
      id: "config-snapshots",
      title: "20. Config Snapshots & Host Drift Tracker",
      category: "Page Audit Tools",
      icon: Camera,
      badge: "Pro",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300",
      summary: "Captures snapshots of your server configuration with visual side-by-side diffing to catch silent host drift.",
      leadText: "Hosting providers regularly update server packages, reconfigure PHP-FPM pools, or migrate containers without informing you. A site that ran smoothly on Friday can suddenly fail on Monday because the host lowered memory limits or disabled an extension over the weekend.",
      topics: [
        {
          badge: "Screen Telemetry",
          title: "What You See On This Screen & What It Tracks",
          lead: "",
          items: [
            {
              icon: History,
              label: "Snapshot Roster",
              desc: "A historical log of saved configuration captures, noting timestamp, trigger (automated weekly or manual), and directive count.",
            },
            {
              icon: History,
              label: "-Click 'Take Snapshot' Button",
              desc: "Capture a full snapshot of your server environment before migrations, major core updates, or host changes.",
            },
            {
              icon: CheckCircle2,
              label: "Visual Side-by-Side Diff Engine",
              desc: "Select any two snapshots, or compare your live server settings against a past snapshot, to see changes highlighted in green (added/improved) or red (regressed).",
            },
            {
              icon: AlertTriangle,
              label: "Host Drift Alerts",
              desc: "Instantly highlights if your hosting provider silently reduced `memory_limit`, lowered execution time, or modified php.ini directives behind the scenes.",
            },
          ],
          callout: undefined,
        },
      ],
      benchmarks: [
        {
          level: "Optimal",
          levelBadge: "Zero Drift (Stable)",
          badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300",
          meaning: "Your live server directives match your saved baseline snapshot exactly. No host changes have occurred.",
          recommendedAction: "No action needed. Server configuration is consistent.",
        },
        {
          level: "Warning",
          levelBadge: "Minor Drift Noted",
          badgeBg: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300",
          meaning: "Minor directive changed (e.g. max_input_time adjusted from 60 to 30).",
          recommendedAction: "Review the visual diff to confirm whether the change impacts your site workload.",
        },
        {
          level: "Critical",
          levelBadge: "Regressive Drift Detected",
          badgeBg: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300",
          meaning: "A critical server parameter was reduced by the host (e.g., memory_limit dropped from 512M to 128M, or OPcache was disabled).",
          recommendedAction: "Use the visual diff to show host support the exact change that caused your site issues.",
        },
      ],
      howToUse: [
        "Go to phpinfo() WP > Page Audit Tools > Config Snapshots.",
        "Click 'Take Snapshot' before making major server or plugin changes.",
        "If your site acts strangely after a host maintenance event, select two snapshots and click 'Compare Diff'.",
      ],
    },
    {
      id: "operations-log",
      title: "21. Plugin Operations Audit Log",
      category: "Reports & Logs",
      icon: FileText,
      badge: "Free",
      badgeColor: "bg-zinc-100 text-zinc-700 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300",
      summary: "Complete audit trail tracking all 1-click auto-fixes, config modifications, snapshots, and troubleshooting sessions.",
      leadText: "Whenever server directives are modified, auto-fixes applied, or troubleshooting sessions engaged, having a transparent audit trail gives you complete confidence in what changes were made, who initiated them, and when.",
      topics: [
        {
          badge: "Screen Telemetry",
          title: "What You See On This Screen & What It Tracks",
          lead: "",
          items: [
            {
              icon: AlertTriangle,
              label: "Chronological Event Feed",
              desc: "Detailed record of all phpinfo() WP operations, including directive optimizations, `.htaccess` additions, snapshot captures, and troubleshooting mode events.",
            },
            {
              icon: CheckCircle2,
              label: "Category Filtering",
              desc: "Filter events by Server & Config or Settings Changes.",
            },
            {
              icon: CheckCircle2,
              label: "Severity Tags",
              desc: "Color-coded badges for INFO (routine actions), WARNING (minor anomalies), and CRITICAL (rollbacks or syntax alerts).",
            },
            {
              icon: CheckCircle2,
              label: "User Attribution",
              desc: "Clearly identifies which administrator account triggered each action, essential for multi-admin teams and agencies.",
            },
          ],
          callout: undefined,
        },
      ],
      benchmarks: [
        {
          level: "Optimal",
          levelBadge: "Clean Audit Trail (Optimal)",
          badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300",
          meaning: "All operations and auto-fixes executed successfully with verified timestamps and user attribution.",
          recommendedAction: "Review periodically to audit admin actions.",
        },
        {
          level: "Warning",
          levelBadge: "Rollback Event Recorded",
          badgeBg: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300",
          meaning: "A directive auto-fix encountered an error and was automatically reverted by the plugin's safety rollback.",
          recommendedAction: "Check the entry details to see which directive could not be set on your server.",
        },
        {
          level: "Critical",
          levelBadge: "Permission Error Logged",
          badgeBg: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300",
          meaning: "The plugin attempted to write a safe configuration change but was blocked by server filesystem permissions.",
          recommendedAction: "Run Permissions Audit to ensure WordPress has proper write access.",
        },
      ],
      howToUse: [
        "Navigate to phpinfo() WP > Reports & Logs > Operations Log.",
        "Filter by category or date range to inspect recent actions.",
        "Verify that any applied auto-fixes or config changes are logged with green INFO badges.",
      ],
    },
    {
      id: "admin-activity-log",
      title: "22. Admin Security Activity Log & Login Tracker",
      category: "Reports & Logs",
      icon: Activity,
      badge: "Pro",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300",
      summary: "Real-time security audit trail tracking user logins, brute-force attempts with real IP detection, plugin changes, and CSV export.",
      leadText: "Knowing who accessed your WordPress dashboard, what changes were made, and detecting brute-force login attempts is vital for site security and client accountability.",
      topics: [
        {
          badge: "Screen Telemetry",
          title: "What You See On This Screen & What It Tracks",
          lead: "",
          items: [
            {
              icon: ShieldCheck,
              label: "Authentication Sentinel with Real IP Detection",
              desc: "Tracks successful logins, failed authentication attempts, logouts, and password resets. Real IP detection resolves actual client IPs even behind Cloudflare (CF-Connecting-IP), reverse proxies, and load balancers.",
            },
            {
              icon: CheckCircle2,
              label: "Plugin & Theme Activity",
              desc: "Logs plugin activations, deactivations, updates, installations, and deletions.",
            },
            {
              icon: FileSpreadsheet,
              label: "Core Settings & User Auditing",
              desc: "Tracks changes to site URLs, permalinks, user role elevations, new registrations, and profile updates.",
            },
            {
              icon: CheckCircle2,
              label: "Multi-Filter Control",
              desc: "Filter records by Category (Authentication, Plugins, Themes, Users, Settings), Severity, User, Date Range, or search text.",
            },
            {
              icon: CheckCircle2,
              label: "-Click CSV Export",
              desc: "Export your security audit log to a spreadsheet for client reporting or compliance records.",
            },
          ],
          callout: undefined,
        },
      ],
      benchmarks: [
        {
          level: "Optimal",
          levelBadge: "Routine Activity (Normal)",
          badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300",
          meaning: "Standard authorized administrative activity. Logins correspond to known team members.",
          recommendedAction: "No action needed. Security audit trail is actively recording.",
        },
        {
          level: "Warning",
          levelBadge: "Failed Login Burst (Warning)",
          badgeBg: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300",
          meaning: "Multiple failed login attempts recorded from an unrecognized IP address, indicating an automated brute-force attempt.",
          recommendedAction: "Verify administrator accounts use strong passwords and consider 2FA or IP blocking.",
        },
        {
          level: "Critical",
          levelBadge: "Unauthorized Role Elevation (Critical)",
          badgeBg: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300",
          meaning: "A user account was unexpectedly elevated to Administrator or a rogue admin was created.",
          recommendedAction: "Inspect the user immediately, reset credentials, and audit recent plugin changes.",
        },
      ],
      howToUse: [
        "Go to phpinfo() WP > Reports & Logs > Admin Log.",
        "Filter by 'Authentication' to review recent logins and verify all access is legitimate.",
        "Click 'Export CSV' to download the security log for compliance archives.",
      ],
    },
    {
      id: "error-log",
      title: "23. Live PHP Error Log Viewer & AI Assistant",
      category: "Reports & Logs",
      icon: Bug,
      badge: "Pro",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300",
      summary: "Inspects multi-file error logs inside wp-admin, toggles debug logging with 1 click, filters stack traces, and explains errors with AI.",
      leadText: "When WordPress triggers a white screen or a plugin misbehaves, the answer is recorded in the PHP error log. Traditional debugging requires connecting via FTP or SSH, navigating nested server directories, and reading cryptic technical stack traces.",
      topics: [
        {
          badge: "Screen Telemetry",
          title: "What You See On This Screen & What It Tracks",
          lead: "",
          items: [
            {
              icon: AlertTriangle,
              label: "Multi-File Log Detection",
              desc: "Automatically finds and reads WordPress debug.log, server error logs, Nginx/Apache logs, and PHP-FPM error streams.",
            },
            {
              icon: AlertTriangle,
              label: "-Click 'Enable Logging' Button",
              desc: "Safely turns on `WP_DEBUG_LOG` without manually editing `wp-config.php` over FTP.",
            },
            {
              icon: AlertTriangle,
              label: "Live Filterable Error Stream",
              desc: "Tail the log in real time with an instant keyword search box to filter errors by plugin name or date.",
            },
            {
              icon: CheckCircle2,
              label: "Severity Color-Coding",
              desc: "Distinguishes between fatal errors (red), warnings (yellow), and notices (gray).",
            },
            {
              icon: AlertTriangle,
              label: "-Click 'Clear Log' Button",
              desc: "Safely empties giant, runaway log files that eat up hosting disk space.",
            },
            {
              icon: AlertTriangle,
              label: "AI Plain-English Error Explanations",
              desc: "Click 'Explain with AI' on any confusing stack trace to get an immediate, plain-English breakdown of what failed and how to fix it.",
            },
          ],
          callout: undefined,
        },
      ],
      benchmarks: [
        {
          level: "Optimal",
          levelBadge: "Log Clean / 0 Fatal Errors",
          badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300",
          meaning: "No fatal PHP crashes or unhandled exceptions recorded. Site code executes cleanly.",
          recommendedAction: "Keep logging active so you catch new errors as soon as they happen.",
        },
        {
          level: "Warning",
          levelBadge: "PHP Deprecations / Warnings",
          badgeBg: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300",
          meaning: "Plugins are generating non-fatal warnings or notices. While not breaking pages, large volumes can bloat log file sizes.",
          recommendedAction: "Identify the plugin creating the notices and check if an update is available.",
        },
        {
          level: "Critical",
          levelBadge: "Fatal Error / Out of Memory",
          badgeBg: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300",
          meaning: "Fatal errors (e.g. 'Allowed memory size exhausted' or unhandled exceptions) are causing white-screen crashes for visitors.",
          recommendedAction: "Click 'Explain with AI' on the error line to see the exact fix and offending plugin.",
        },
      ],
      howToUse: [
        "Navigate to phpinfo() WP > Reports & Logs > Error Log.",
        "If logging is disabled, click 'Enable Logging' to start capturing events.",
        "Use the search box to find specific errors, and click 'Explain with AI' to understand stack traces.",
      ],
    },
    {
      id: "cron-monitor",
      title: "24. WP-Cron Scheduled Task Monitor & Unblocker",
      category: "Reports & Logs",
      icon: Clock,
      badge: "Pro",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300",
      summary: "Inspects scheduled tasks, alerts on overdue jobs blocking publishing or order processing, cleans orphan hooks, and runs tasks on demand.",
      leadText: "WordPress relies on WP-Cron to handle automated background operations: publishing scheduled posts, processing WooCommerce subscription renewals, sending email notifications, and running automated backups. If cron jobs become overdue, publishing stalls and background processing grinds to a halt.",
      topics: [
        {
          badge: "Screen Telemetry",
          title: "What You See On This Screen & What It Tracks",
          lead: "",
          items: [
            {
              icon: Clock,
              label: "Overdue Tasks Counter",
              desc: "Immediately highlights tasks that missed their scheduled execution window in yellow or red.",
            },
            {
              icon: Clock,
              label: "`DISABLE_WP_CRON` Constant Status",
              desc: "Detects if virtual cron is turned off and confirms whether a real server system cron is configured properly.",
            },
            {
              icon: CheckCircle2,
              label: "Orphan Hooks Identification",
              desc: "Flags scheduled events left behind by uninstalled plugins that clutter your database options.",
            },
            {
              icon: CheckCircle2,
              label: "Action Controls for Every Event",
              desc: "",
            },
            {
              icon: CheckCircle2,
              label: "'Run Now'",
              desc: "Manually trigger any background task immediately on demand (great for testing email or backup schedules).",
            },
            {
              icon: CheckCircle2,
              label: "'Delete Event'",
              desc: "Remove a single stuck scheduled occurrence.",
            },
            {
              icon: CheckCircle2,
              label: "'Purge Hook'",
              desc: "Completely remove all scheduled instances of a rogue hook left behind by an old plugin.",
            },
          ],
          callout: undefined,
        },
      ],
      benchmarks: [
        {
          level: "Optimal",
          levelBadge: "0 Overdue Tasks (Healthy)",
          badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300",
          meaning: "All background tasks execute on time. Scheduled posts, WooCommerce emails, and backups run promptly.",
          recommendedAction: "No action needed. The background task scheduler is healthy.",
        },
        {
          level: "Warning",
          levelBadge: "Overdue Tasks Detected",
          badgeBg: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300",
          meaning: "Scheduled tasks are delayed because the site has low traffic or a background process timed out.",
          recommendedAction: "Click 'Run Now' on overdue tasks, or set up a real server cron calling wp-cron.php.",
        },
        {
          level: "Critical",
          levelBadge: "WP_CRON Disabled Without System Cron",
          badgeBg: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300",
          meaning: "DISABLE_WP_CRON is active in wp-config.php, but no system cron is calling the file. All automated publishing and emails are completely frozen.",
          recommendedAction: "Configure a real server cron job in your hosting control panel or remove the DISABLE_WP_CRON constant.",
        },
      ],
      howToUse: [
        "Go to phpinfo() WP > Reports & Logs > WP-Cron Monitor.",
        "Check if any tasks are marked overdue in the schedule table.",
        "Click 'Run Now' on any overdue event to force immediate execution, or click 'Purge Hook' on orphan events.",
      ],
    },
    {
      id: "mail-deliverability",
      title: "25. Email Deliverability Suite & DNS Diagnostics",
      category: "Reports & Logs",
      icon: Mail,
      badge: "Pro",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300",
      summary: "Audits SPF, DKIM, DMARC, and MX records, inspects contact form mail routing, and tests wp_mail() delivery inside wp-admin.",
      leadText: "When WordPress emails (such as customer password resets, WooCommerce order receipts, or contact form inquiries) land in spam folders or disappear entirely, DNS authentication is almost always the cause. Major email providers like Gmail and Yahoo now reject emails that lack proper SPF, DKIM, and DMARC authentication.",
      topics: [
        {
          badge: "Screen Telemetry",
          title: "What You See On This Screen & What It Tracks",
          lead: "",
          items: [
            {
              icon: ShieldCheck,
              label: "DNS Authentication Audit",
              desc: "Verifies whether SPF, DKIM, DMARC, and MX records exist and are configured correctly for your domain.",
            },
            {
              icon: AlertTriangle,
              label: "Mail Transport Engine Inspection",
              desc: "Detects whether your site uses PHP mail() (which frequently lands in spam) or a dedicated SMTP/API service.",
            },
            {
              icon: CheckCircle2,
              label: "Contact Form Routing Verification",
              desc: "Audits active contact forms (WPForms, Gravity Forms, Contact Form 7, Formidable) to ensure their 'From' address matches your authenticated domain, preventing spoofing flags.",
            },
            {
              icon: AlertTriangle,
              label: "Built-In Email Delivery Tester",
              desc: "Send a real test email directly from wp-admin to your own inbox to verify deliverability and view error diagnostics if wp_mail() fails.",
            },
          ],
          callout: undefined,
        },
      ],
      benchmarks: [
        {
          level: "Optimal",
          levelBadge: "SPF, DKIM, DMARC Active (Optimal)",
          badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300",
          meaning: "All DNS authentication records are active and validated. Emails reliably land in customer inboxes.",
          recommendedAction: "No action needed. Mail deliverability is properly configured.",
        },
        {
          level: "Warning",
          levelBadge: "DMARC Missing or 'From' Mismatch",
          badgeBg: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300",
          meaning: "SPF is present, but DMARC is missing, or a contact form uses an @gmail.com 'From' address, causing rejection by Yahoo/Gmail.",
          recommendedAction: "Add a basic DMARC record to your DNS and ensure contact forms send from your verified domain.",
        },
        {
          level: "Critical",
          levelBadge: "Unauthenticated PHP mail()",
          badgeBg: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300",
          meaning: "Emails are sent via the unauthenticated web server PHP mail() function without SPF or DKIM, resulting in emails being discarded by major inbox providers.",
          recommendedAction: "Configure an SMTP plugin (e.g. Post SMTP or WP Mail SMTP) using a reputable email sending service.",
        },
      ],
      howToUse: [
        "Navigate to phpinfo() WP > Reports & Logs > Mail.",
        "Verify all four DNS records (SPF, DKIM, DMARC, MX) show green 'Active' badges.",
        "Use the Test Email form at the bottom to send a live test message and verify inbox delivery.",
      ],
    },
    {
      id: "health-alerts",
      title: "26. Real-Time Health Alerts (Email, Slack, Discord) & Weekly Digest",
      category: "Reports & Logs",
      icon: Bell,
      badge: "Pro",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300",
      summary: "Instant notifications via Email, Slack, Discord, and Webhooks on EOL, config drift, OPcache saturation, and SSL expiry, plus Monday digests.",
      leadText: "You shouldn't have to log into your WordPress dashboard every single day just to check if something broke. Real-Time Alerts monitors your server continuously and dispatches immediate notifications when critical events occur.",
      topics: [
        {
          badge: "Screen Telemetry",
          title: "What You See On This Screen & What It Tracks",
          lead: "",
          items: [
            {
              icon: CheckCircle2,
              label: "Notification Channels",
              desc: "Easily configure notification destinations:",
            },
            {
              icon: AlertTriangle,
              label: "Email",
              desc: "Send alerts to multiple admin or agency team email addresses.",
            },
            {
              icon: CheckCircle2,
              label: "Slack",
              desc: "Post rich alerts to your team's Slack channel via incoming webhooks.",
            },
            {
              icon: CheckCircle2,
              label: "Discord",
              desc: "Send clean alert embeds to a dedicated Discord operations channel.",
            },
            {
              icon: CheckCircle2,
              label: "Custom Webhooks",
              desc: "Dispatch JSON payloads to external management platforms or Zapier.",
            },
            {
              icon: AlertTriangle,
              label: "Automated Alert Triggers",
              desc: "Set alerts for:",
            },
            {
              icon: CheckCircle2,
              label: "PHP EOL",
              desc: "When active PHP version support expires.",
            },
            {
              icon: CheckCircle2,
              label: "Config Drift",
              desc: "When your host secretly alters PHP directives or limits.",
            },
            {
              icon: Zap,
              label: "OPcache Saturation",
              desc: "When cache memory fills up and begins thrashing.",
            },
            {
              icon: CheckCircle2,
              label: "SSL Expiry",
              desc: "Countdown reminders at 30 days, 14 days, and 7 days before certificate expiration.",
            },
            {
              icon: CheckCircle2,
              label: "Automated Weekly Health Digest",
              desc: "Delivers a clean executive summary of site health directly to your inbox every Monday morning.",
            },
          ],
          callout: undefined,
        },
      ],
      benchmarks: [
        {
          level: "Optimal",
          levelBadge: "Channels Verified (Active)",
          badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300",
          meaning: "Automated background monitoring is active. Alerts dispatch instantly on critical server events.",
          recommendedAction: "Click 'Test Alert' to confirm delivery to your inbox or Slack channel.",
        },
        {
          level: "Warning",
          levelBadge: "Weekly Digest Scheduled",
          badgeBg: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300",
          meaning: "Weekly Monday morning server health digest is active and will deliver summary metrics to your email.",
          recommendedAction: "Verify that your recipient email address is up to date.",
        },
        {
          level: "Critical",
          levelBadge: "Delivery Failure",
          badgeBg: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300",
          meaning: "Test alert email failed to send, indicating wp_mail() is broken or the webhook URL is invalid.",
          recommendedAction: "Check your Mail Deliverability settings or verify your Slack/Discord webhook URL.",
        },
      ],
      howToUse: [
        "Navigate to phpinfo() WP > Reports & Logs > Alerts.",
        "Enter your email address or paste a Slack/Discord incoming webhook URL.",
        "Click 'Test Email' or 'Test Webhook' to confirm notifications arrive immediately.",
      ],
    },
    {
      id: "client-audit-report",
      title: "27. Client Audit Reports & Agency White-Labeling",
      category: "Reports & Logs",
      icon: FileSpreadsheet,
      badge: "Pro",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300",
      summary: "One-page executive server health audit report, print-to-PDF ready, with complete agency white-label branding for client retainers.",
      leadText: "For freelancers and agencies managing client websites, proving value and demonstrating ongoing server health is critical. The Audit Report compiles your site's technical metrics into a clean, professional single-page report formatted for PDF export and client presentation.",
      topics: [
        {
          badge: "Screen Telemetry",
          title: "What You See On This Screen & What It Tracks",
          lead: "",
          items: [
            {
              icon: CheckCircle2,
              label: "Executive Health Summary",
              desc: "Aggregates Config Grader score, PHP version EOL status, Security Headers grade, Database Autoload health, OPcache performance, SSL status, and WP-Cron health.",
            },
            {
              icon: FileSpreadsheet,
              label: "Print / Save as PDF Ready",
              desc: "Cleanly styled layout with specialized print stylesheets that format perfectly when saving to PDF.",
            },
            {
              icon: Clock,
              label: "Complete White-Label Customization Suite (Unlimited & Lifetime plans)",
              desc: "",
            },
            {
              icon: CheckCircle2,
              label: "Custom Agency / Company Name",
              desc: "Replace all plugin branding with your agency name.",
            },
            {
              icon: FileSpreadsheet,
              label: "Custom Tagline & Report Title",
              desc: "Set custom headers (e.g. 'Monthly Infrastructure Maintenance Report').",
            },
            {
              icon: AlertTriangle,
              label: "Agency Logo Upload",
              desc: "Select your agency logo directly from the WordPress Media Library.",
            },
            {
              icon: CheckCircle2,
              label: "Custom Accent Brand Color",
              desc: "Choose your agency's exact brand color using the color picker.",
            },
            {
              icon: AlertTriangle,
              label: "Custom Footer Notes & Disclaimers",
              desc: "Add client-specific sign-off text or contact details.",
            },
          ],
          callout: undefined,
        },
      ],
      benchmarks: [
        {
          level: "Optimal",
          levelBadge: "White-Labeled (Branded)",
          badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300",
          meaning: "Report displays your agency logo, brand colors, and company name with zero mentions of phpinfo() WP.",
          recommendedAction: "Click 'Print / Save as PDF' to generate client-ready monthly deliverables.",
        },
        {
          level: "Warning",
          levelBadge: "Default Branding",
          badgeBg: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300",
          meaning: "Report is active but uses standard phpinfo() WP branding.",
          recommendedAction: "Click 'White-label' to customize your company name, accent color, and logo.",
        },
        {
          level: "Critical",
          levelBadge: "Report Cache Stale",
          badgeBg: "bg-zinc-100 text-zinc-700 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300",
          meaning: "Recent server optimizations haven't populated into the report view yet.",
          recommendedAction: "Click 'Re-generate Report' to pull fresh telemetry from all checks.",
        },
      ],
      howToUse: [
        "Go to phpinfo() WP > Reports & Logs > Audit Report.",
        "Click 'White-label' to upload your agency logo and set your custom accent color.",
        "Click 'Print / Save as PDF' to export a professional deliverable for your client.",
      ],
    },
    {
      id: "admin-bar-telemetry",
      title: "28. Live Admin Bar Health Scoreboard & HUD Cockpit",
      category: "Reports & Logs",
      icon: Gauge,
      badge: "Free",
      badgeColor: "bg-zinc-100 text-zinc-700 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300",
      summary: "Real-time telemetry sentinel in the top WordPress admin bar: grade pill, peak memory, hover micro-cockpit, and 1-click OPcache flush.",
      leadText: "Rather than having to open plugin menus to check server state, the Admin Bar Health Scoreboard provides a continuous, real-time sentinel directly in the top WordPress admin bar on every page (both backend and frontend while logged in as admin).",
      topics: [
        {
          badge: "Screen Telemetry",
          title: "What You See On This Screen & What It Tracks",
          lead: "",
          items: [
            {
              icon: CheckCircle2,
              label: "Top Admin Bar Pill",
              desc: "Displays your current Health Grade (A+, A, B, C, F), health status dot, and current Peak RAM consumption.",
            },
            {
              icon: CheckCircle2,
              label: "Hover Micro-Cockpit HUD",
              desc: "Hovering over the indicator opens a high-density telemetry cockpit showing:",
            },
            {
              icon: AlertTriangle,
              label: "Details",
              desc: "Health Grade & Uptime Streak",
            },
            {
              icon: AlertTriangle,
              label: "Details",
              desc: "Peak Memory vs. `memory_limit` gauge",
            },
            {
              icon: AlertTriangle,
              label: "Details",
              desc: "OPcache Hit Rate with a 1-Click 'Flush OPcache' button",
            },
            {
              icon: AlertTriangle,
              label: "Details",
              desc: "Database Autoload Size (<400 KB status)",
            },
            {
              icon: AlertTriangle,
              label: "Details",
              desc: "Most urgent triage item",
            },
            {
              icon: CheckCircle2,
              label: "-Click 'Copy Markdown System Spec'",
              desc: "Copies a clean, markdown-formatted technical spec of your server environment to your clipboard, ready to paste into developer tickets or hosting support chats.",
            },
            {
              icon: AlertTriangle,
              label: "Main WordPress Dashboard Widget",
              desc: "Site health summary widget right on your main wp-admin Dashboard upon login.",
            },
          ],
          callout: undefined,
        },
      ],
      benchmarks: [
        {
          level: "Optimal",
          levelBadge: "Grade A+ / A (Green Pill)",
          badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300",
          meaning: "Server runs at peak efficiency, memory usage is low, and OPcache hit rate is high across all page loads.",
          recommendedAction: "No action needed. Hover occasionally to review live stats.",
        },
        {
          level: "Warning",
          levelBadge: "Grade B / C (Yellow Pill)",
          badgeBg: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300",
          meaning: "Memory usage is above 75% or non-critical server directives need attention.",
          recommendedAction: "Hover to view the most urgent issue and click through to resolve it.",
        },
        {
          level: "Critical",
          levelBadge: "Grade D / F (Red Pill)",
          badgeBg: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300",
          meaning: "Urgent server issue: memory limit is exhausted or critical PHP directives failed.",
          recommendedAction: "Click the indicator pill immediately to jump directly to the failing directive.",
        },
      ],
      howToUse: [
        "Look at the top WordPress admin bar on any page for the phpinfo() WP grade pill.",
        "Hover over the pill to view the real-time HUD cockpit and check OPcache efficiency.",
        "Click 'Copy Markdown System Spec' to copy full server specs for developer or host support.",
      ],
    },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeSectionId, setActiveSectionId] = useState<string>("server-dashboard");

  const sidebarNavRef = useRef<HTMLElement>(null);
  const isClickingRef = useRef(false);

  const categories = [
    "All",
    "Performance & Dials",
    "Security & Core",
    "Page Audit Tools",
    "Reports & Logs",
  ];

  const filteredSections = useMemo(() => {
    return sections.filter((sec) => {
      const matchesCat =
        selectedCategory === "All" || sec.category === selectedCategory;
      if (!searchQuery.trim()) return matchesCat;

      const q = searchQuery.toLowerCase();
      const matchesSearch =
        sec.title.toLowerCase().includes(q) ||
        sec.summary.toLowerCase().includes(q) ||
        sec.leadText.toLowerCase().includes(q) ||
        sec.topics.some(
          (t) =>
            t.title.toLowerCase().includes(q) ||
            t.lead?.toLowerCase().includes(q) ||
            t.items?.some(
              (it) =>
                it.label.toLowerCase().includes(q) ||
                it.desc.toLowerCase().includes(q)
            )
        ) ||
        sec.benchmarks.some(
          (b) =>
            b.meaning.toLowerCase().includes(q) ||
            b.recommendedAction.toLowerCase().includes(q)
        );
      return matchesCat && matchesSearch;
    });
  }, [sections, selectedCategory, searchQuery]);

  useEffect(() => {
    const handleScroll = () => {
      if (isClickingRef.current) return;

      const scrollPosition = window.scrollY + 180;
      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        const el = document.getElementById(sec.id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSectionId(sec.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  useEffect(() => {
    if (!sidebarNavRef.current) return;
    const activeElement = sidebarNavRef.current.querySelector<HTMLElement>(
      `[data-section-id="${activeSectionId}"]`
    );
    if (activeElement) {
      activeElement.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [activeSectionId]);

  const handleNavClick = (secId: string) => {
    isClickingRef.current = true;
    setActiveSectionId(secId);
    setTimeout(() => {
      isClickingRef.current = false;
    }, 800);
  };

  return (
    <main className="flex min-h-screen flex-col items-center overflow-x-clip pt-24 sm:pt-28 lg:pt-36 bg-zinc-50/50 dark:bg-zinc-950">
      <div className="fixed left-0 right-0 top-0 z-[60]">
        <ExeebitBar />
        <Header />
      </div>

      {/* Hero Header */}
      <section className="w-full max-w-6xl px-4 sm:px-6 lg:px-8 pt-8 pb-10 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700 dark:border-violet-900/60 dark:bg-violet-950/40 dark:text-violet-300 mb-3">
              <Sparkles className="h-3.5 w-3.5" /> Complete Documentation & Reference Guide (v8.0)
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
              phpinfo() WP Documentation
            </h1>
            <p className="mt-2 text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl">
              Written from a real site owner&apos;s perspective: what you see on each screen, what the numbers mean, why host locks are often completely fine, and how to keep your site fast and stable.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="https://wordpress.org/plugins//" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="rounded-xl gap-1.5 text-xs">
                WordPress.org <ExternalLink className="h-3.5 w-3.5" />
              </Button>
            </Link>
            <Link href="/#pricing">
              <Button size="sm" className="rounded-xl bg-violet-600 hover:bg-violet-700 text-white shadow-sm text-xs">
                Get Pro Lifetime
              </Button>
            </Link>
          </div>
        </div>

        {/* Search & Category Filter */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search features (host lock, memory, rollback, api, ssl)..."
              className="w-full rounded-xl border border-zinc-200 bg-white py-2 pl-9 pr-4 text-sm text-zinc-900 placeholder-zinc-400 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-lg px-3 py-1 text-xs font-medium transition-colors ${selectedCategory === cat
                    ? "bg-violet-600 text-white shadow-sm"
                    : "bg-white text-zinc-600 hover:bg-zinc-100 border border-zinc-200 dark:bg-zinc-900 dark:text-zinc-400 dark:border-zinc-800 dark:hover:bg-zinc-800"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sticky Sidebar Navigation */}
          <aside
            ref={sidebarNavRef}
            className="lg:col-span-4 sticky top-40 max-h-[calc(100vh-11rem)] overflow-y-auto rounded-2xl border border-zinc-200 bg-white p-3 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-700"
          >
            <div className="px-2 py-1.5 mb-2 border-b border-zinc-100 dark:border-zinc-800">
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                All Features ({filteredSections.length})
              </span>
            </div>

            <nav className="space-y-1">
              {filteredSections.map((sec) => {
                const IconComponent = sec.icon;
                const isActive = activeSectionId === sec.id;
                return (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    data-section-id={sec.id}
                    onClick={() => handleNavClick(sec.id)}
                    className={`group flex items-center justify-between gap-2 rounded-xl px-2.5 py-2 text-xs font-medium transition-all ${isActive
                        ? "bg-violet-600 text-white shadow-sm"
                        : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
                      }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <IconComponent className={`h-4 w-4 shrink-0 ${isActive ? "text-white" : "text-violet-500"}`} />
                      <span className="truncate">{sec.title}</span>
                    </div>
                    {sec.badge && (
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded border font-semibold shrink-0 ${isActive
                            ? "bg-white/20 text-white border-white/30"
                            : sec.badgeColor || "bg-zinc-100 text-zinc-600"
                          }`}
                      >
                        {sec.badge}
                      </span>
                    )}
                  </a>
                );
              })}
            </nav>
          </aside>

          {/* Documentation Content Area */}
          <div className="lg:col-span-8 space-y-10">
            {filteredSections.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-zinc-300 p-12 text-center dark:border-zinc-700 bg-white dark:bg-zinc-900">
                <Search className="mx-auto h-8 w-8 text-zinc-400 mb-2" />
                <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">No matching features found</h3>
                <p className="mt-1 text-sm text-zinc-500">
                  Try adjusting your search terms or selecting &ldquo;All&rdquo; categories.
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                  }}
                  className="mt-4 rounded-xl text-xs"
                >
                  Reset Filter
                </Button>
              </div>
            ) : (
              filteredSections.map((sec) => {
                const IconComponent = sec.icon;
                return (
                  <article
                    key={sec.id}
                    id={sec.id}
                    className="scroll-mt-32 rounded-2xl border border-zinc-200 bg-white p-6 sm:p-7 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4 pb-5 border-b border-zinc-100 dark:border-zinc-800">
                      <div className="flex items-start gap-3.5 min-w-0">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600 dark:bg-violet-950/50 dark:text-violet-400 mt-0.5">
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2.5">
                            <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                              {sec.title}
                            </h2>
                            {sec.badge && (
                              <span
                                className={`text-[11px] px-2.5 py-0.5 rounded-full border font-semibold shrink-0 ${sec.badgeColor || "bg-zinc-100 text-zinc-800 border-zinc-200"
                                  }`}
                              >
                                {sec.badge}
                              </span>
                            )}
                          </div>
                          <span className="font-semibold uppercase tracking-wider text-[11px] text-zinc-400 mt-1 block">
                            {sec.category}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Summary */}
                    <p className="mt-4 text-sm font-medium text-zinc-600 dark:text-zinc-400 italic">
                      {sec.summary}
                    </p>

                    {/* Card 1: What You See & How It Works (Structured with Beautiful Bullets) */}
                    <div className="mt-6 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                      <div className="bg-zinc-100/80 dark:bg-zinc-800/60 px-4 py-2.5 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                          <Info className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                          What You See On This Screen & How It Works
                        </span>
                      </div>
                      <div className="p-4 sm:p-5 bg-white dark:bg-zinc-900 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 space-y-6">
                        {sec.leadText && (
                          <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                            {renderFormattedText(sec.leadText)}
                          </p>
                        )}

                        {sec.topics.map((topic, tIdx) => (
                          <div key={tIdx} className="space-y-3">
                            <div className="flex flex-wrap items-center gap-2">
                              {topic.badge && (
                                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-violet-100 text-violet-700 dark:bg-violet-950/80 dark:text-violet-300 border border-violet-200/60 dark:border-violet-800/60">
                                  {topic.badge}
                                </span>
                              )}
                              <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100">
                                {renderFormattedText(topic.title)}
                              </h3>
                            </div>

                            {topic.lead && (
                              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                {renderFormattedText(topic.lead)}
                              </p>
                            )}

                            {/* Beautiful Bullet Points */}
                            {topic.items && topic.items.length > 0 && (
                              <div className="space-y-2 mt-2">
                                {topic.items.map((item, itIdx) => {
                                  const ItemIcon = item.icon || CheckCircle2;
                                  return (
                                    <div
                                      key={itIdx}
                                      className="flex items-start gap-3 p-3 rounded-xl bg-zinc-50/70 hover:bg-zinc-100/70 dark:bg-zinc-800/40 dark:hover:bg-zinc-800/70 border border-zinc-200/60 dark:border-zinc-800 transition-colors"
                                    >
                                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-lg bg-violet-100/80 text-violet-600 dark:bg-violet-950/70 dark:text-violet-400 mt-0.5">
                                        <ItemIcon className="h-3.5 w-3.5" />
                                      </div>
                                      <div className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed min-w-0">
                                        <strong className="font-semibold text-zinc-900 dark:text-zinc-100 mr-1.5 block sm:inline">
                                          {renderFormattedText(item.label)}:
                                        </strong>
                                        <span>{renderFormattedText(item.desc)}</span>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            )}

                            {/* Beautiful Callout Box */}
                            {topic.callout && (
                              <div className="mt-3 rounded-xl border border-violet-200/80 bg-gradient-to-r from-violet-50/80 via-white to-violet-50/40 dark:border-violet-900/50 dark:from-violet-950/30 dark:via-zinc-900 dark:to-violet-950/20 p-4 shadow-sm">
                                <div className="flex items-start gap-3">
                                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-violet-600 text-white shadow-sm mt-0.5">
                                    <Sparkles className="h-3.5 w-3.5" />
                                  </div>
                                  <div className="min-w-0">
                                    <span className="text-xs font-bold uppercase tracking-wider text-violet-900 dark:text-violet-200 block mb-1">
                                      {topic.callout.title}
                                    </span>
                                    <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                                      {renderFormattedText(topic.callout.text)}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Card 2: Benchmark Scorecard Table */}
                    <div className="mt-5 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                      <div className="bg-zinc-100/80 dark:bg-zinc-800/60 px-4 py-2.5 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                          <TableProperties className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                          Health Scorecard (What Scores Mean for Your Site)
                        </span>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                          <thead className="bg-zinc-50 dark:bg-zinc-900/50 text-zinc-500 uppercase tracking-wider text-[10px] border-b border-zinc-200 dark:border-zinc-800">
                            <tr>
                              <th className="py-2.5 px-3.5 font-semibold w-28 sm:w-32 shrink-0">Status</th>
                              <th className="py-2.5 px-3.5 font-semibold min-w-[280px]">What It Means & What&apos;s Happening</th>
                              <th className="py-2.5 px-3.5 font-semibold w-36 sm:w-44 shrink-0">What You Should Do</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 bg-white dark:bg-zinc-900">
                            {sec.benchmarks.map((b, i) => (
                              <tr key={i} className="hover:bg-zinc-50/60 dark:hover:bg-zinc-800/40 transition-colors">
                                <td className="py-3 px-3.5 align-top whitespace-nowrap font-medium w-28 sm:w-32 shrink-0">
                                  <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold ${b.badgeBg}`}>
                                    {b.levelBadge}
                                  </span>
                                </td>
                                <td className="py-3 px-3.5 align-top text-zinc-800 dark:text-zinc-200 leading-relaxed font-normal min-w-[280px]">
                                  {renderFormattedText(b.meaning)}
                                </td>
                                <td className="py-3 px-3.5 align-top text-zinc-600 dark:text-zinc-400 leading-relaxed text-[11.5px] w-36 sm:w-44 shrink-0">
                                  {renderFormattedText(b.recommendedAction)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Card 3: 1-Minute Action Plan */}
                    <div className="mt-5 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                      <div className="bg-zinc-100/80 dark:bg-zinc-800/60 px-4 py-2.5 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                          <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                          How to Check or Fix in 1 Minute
                        </span>
                      </div>
                      <div className="p-4 sm:p-5 bg-white dark:bg-zinc-900 space-y-2.5">
                        {sec.howToUse.map((step, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-100 text-[11px] font-bold text-violet-700 dark:bg-violet-950 dark:text-violet-300 mt-0.5">
                              {idx + 1}
                            </span>
                            <span className="leading-relaxed">{renderFormattedText(step)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </article>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-12 border-t border-zinc-200 dark:border-zinc-800 text-center">
        <div className="rounded-3xl border border-violet-200 bg-gradient-to-b from-violet-50/50 to-white p-8 sm:p-10 shadow-sm dark:border-violet-900/50 dark:from-violet-950/20 dark:to-zinc-900">
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            Keep Your WordPress Site Fast, Safe, and Running Smoothly
          </h2>
          <p className="mt-2 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto">
            Get the full Pro suite with 1-Click Auto-Fix, Safety Rollbacks, Update Guard pre-flight scoring, and Zero-Downtime Safe Mode.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Link href="/#pricing">
              <Button size="lg" className="group rounded-xl bg-violet-600 hover:bg-violet-700 text-white shadow-sm">
                <span>Get Lifetime License</span>
                <AnimatedArrow className="ml-1.5" />
              </Button>
            </Link>
            <Link href="https://wordpress.org/plugins//" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="group rounded-xl">
                <span>Download Free Version on WordPress.org</span>
                <AnimatedArrow className="ml-1.5 text-zinc-400 group-hover:text-zinc-800" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
