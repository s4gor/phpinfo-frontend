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
  AlertCircle,
  FileSpreadsheet,
  Network,
  Calendar,
  BookOpen,
  ArrowRight,
  Flame,
  CheckSquare,
  Bookmark,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ExeebitBar from "@/components/exeebit-bar";
import AnimatedArrow from "@/components/ui/animated-arrow";

// ─── Data Types ─────────────────────────────────────────────────────────────

interface TableRow {
  col1: string;
  col2: string;
  col3?: string;
}

interface TableData {
  headers: string[];
  rows: TableRow[];
}

interface DocItem {
  id: string;
  number?: string;
  title: string;
  category: "Start Here" | "Performance" | "Security & Core" | "Page Audit Tools" | "Reports & Logs" | "Routines & Recipes";
  badge?: "Free" | "Pro" | "Free + Pro data";
  where?: string;
  whatFor: string;
  overview?: string[];
  tables?: { title?: string; data: TableData }[];
  callouts?: { type: "info" | "warning" | "tip" | "danger"; title: string; text: string }[];
  steps?: { title?: string; items: string[] };
  notes?: string[];
}

// ─── Complete Documentation Dataset ──────────────────────────────────────────

const docsData: DocItem[] = [
  // ── START HERE ────────────────────────────────────────────────────────────
  {
    id: "start-what-it-does",
    title: "What the Plugin Does",
    category: "Start Here",
    whatFor: "Your WordPress site runs on top of a server. The server has settings that decide how much memory your site gets, how long a task may run, how fast pages are built, and how safe the site is. Most people never see these settings until something breaks.",
    overview: [
      "phpinfo() WP shows you those settings, grades them, tells you what is wrong in normal words, and for many problems gives you a button that fixes it directly from wp-admin.",
      "Each screen is marked Free or Pro. Each section tells you what the screen is for, where to find it, how to read it, and what to do when something looks wrong.",
    ],
    callouts: [
      {
        type: "tip",
        title: "How to Read This Guide",
        text: "You do not need to read it top to bottom. Open your dashboard, see what is flagged, and jump straight to that section. If you are new, review 'Words You Will See' and 'What This Plugin Changes' first - they take 5 minutes and save you from surprises.",
      },
    ],
  },
  {
    id: "start-words-you-will-see",
    title: "Words You Will See (Glossary)",
    category: "Start Here",
    whatFor: "Plain-language definitions of technical terms used throughout WordPress server administration and phpinfo() WP.",
    tables: [
      {
        data: {
          headers: ["Word", "Plain Meaning"],
          rows: [
            { col1: "PHP", col2: "The programming language WordPress is written in. Your server runs PHP every time someone opens a page." },
            { col1: "PHP version", col2: "Which release of PHP your server runs. Old versions stop receiving security fixes." },
            { col1: "memory_limit", col2: "The maximum amount of memory one request may use. If a task needs more, it stops with an error." },
            { col1: "Host", col2: "The company that runs your server (for example your hosting provider)." },
            { col1: "Host-locked", col2: "A setting your host has fixed. You cannot change it from WordPress." },
            { col1: "OPcache", col2: "A PHP feature that keeps compiled code in memory so it does not need to be rebuilt on every visit." },
            { col1: "Object cache", col2: "A store (Redis or Memcached) that remembers database answers so the database is asked less often." },
            { col1: "Autoload", col2: "Settings that WordPress loads from the database on every single page view." },
            { col1: "Transient", col2: "A temporary piece of saved data. Expired ones are leftovers that can be safely deleted." },
            { col1: "TTFB", col2: "Time to First Byte. How long the visitor waits before the server starts answering." },
            { col1: "WP-Cron", col2: "WordPress's built-in task scheduler. It publishes scheduled posts, sends emails, and runs background jobs." },
            { col1: ".htaccess", col2: "A settings file used by Apache web servers." },
            { col1: ".user.ini", col2: "A settings file used by PHP on Nginx, LiteSpeed, and PHP-FPM setups." },
            { col1: "EOL", col2: "End of life. The date after which a software version gets no more fixes." },
          ],
        },
      },
    ],
  },
  {
    id: "start-what-plugin-changes",
    title: "What This Plugin Changes on Your Server",
    category: "Start Here",
    whatFor: "Most screens only read information. Some screens can change things. Here is exactly what the plugin touches, so nothing surprises you.",
    tables: [
      {
        data: {
          headers: ["Action", "What It Touches"],
          rows: [
            { col1: "Auto-Fix on the Config Grader", col2: "Writes PHP settings to .htaccess (Apache) or .user.ini (Nginx, LiteSpeed, PHP-FPM)" },
            { col1: "PHP Config Editor and snippets", col2: "Edits the same two files. Saves a backup first (htaccess-phpinfo.txt or userini-phpinfo.txt)" },
            { col1: "Security Headers Auto-Fix", col2: "Adds rules to .htaccess on Apache and LiteSpeed. On Nginx it only shows you text to copy" },
            { col1: "Permissions Auto-Fix", col2: "Changes file and folder permissions on disk, including wp-config.php" },
            { col1: "Troubleshooting Mode", col2: "Adds a temporary file to wp-content/mu-plugins" },
            { col1: "Purge Expired Transients", col2: "Deletes rows in the database" },
            { col1: "Flush Object Cache, Reset OPcache", col2: "Clears cached data. Your site may be slightly slower for a moment while cache refills" },
            { col1: "Clear Log", col2: "Empties the error log file" },
            { col1: "Enable Logging", col2: "Turns on debug logging in WordPress" },
            { col1: "Run Now, Delete Event, Purge Hook", col2: "Runs or removes scheduled WP-Cron tasks" },
          ],
        },
      },
    ],
    callouts: [
      {
        type: "warning",
        title: "Before You Press Any Auto-Fix Button",
        text: "1. Make a backup of your site and database.\n2. Make a Config Snapshot (Pro) if available.\n3. Change one thing at a time, then open your site in an incognito tab to verify it loads.",
      },
    ],
  },

  // ── PART 1: PERFORMANCE ───────────────────────────────────────────────────
  {
    id: "server-overview-dashboard",
    number: "1",
    title: "Server Overview Dashboard",
    category: "Performance",
    badge: "Free + Pro data",
    where: "phpinfo() WP > Dashboard",
    whatFor: "This is the first screen you see. It answers one question: is my server in good shape right now?",
    overview: [
      "Health grade, A+ to F: One clear letter grade for the entire server.",
      "Two separate scores: One for things you can fix inside WordPress, one for limits your host controls. A low grade caused only by host limits is not your fault.",
      "Peak RAM meter: How much memory your heaviest recent request used compared to your memory_limit.",
      "Database autoload gauge: How large the data is that WordPress loads on every visit.",
      "Server software and database version: LiteSpeed, Nginx, Apache, MySQL, or MariaDB with EOL support status.",
      "Outbound API summary: External services your site talks to (Stripe, PayPal, WP.org).",
      "Triage cards: The most urgent problems with 1-click Auto-Fix or Review buttons.",
    ],
    tables: [
      {
        title: "How to Read the Health Grade",
        data: {
          headers: ["Grade", "Meaning", "What to Do"],
          rows: [
            { col1: "A+ / A", col2: "Settings well tuned, memory safe, autoload under 400 KB", col3: "Nothing. Check again once a week." },
            { col1: "B / C", col2: "Tight memory, autoload 400-800 KB, or minor setting warning", col3: "Open top triage card and follow advice." },
            { col1: "D / F", col2: "PHP past EOL, memory exhausted, or display_errors exposes server paths", col3: "Fix the top card first today." },
          ],
        },
      },
    ],
    steps: {
      title: "Do this in one minute",
      items: [
        "Open phpinfo() WP > Dashboard.",
        "Check the grade and ensure Peak RAM is under 75%.",
        "Click Auto-Fix or Review on any flagged card.",
      ],
    },
  },
  {
    id: "config-grader",
    number: "2",
    title: "Config Grader and 1-Click Auto-Fix",
    category: "Performance",
    badge: "Pro",
    where: "phpinfo() WP > Performance > Config Grader",
    whatFor: "PHP settings decide how much your site may do at once. If they are too low, imports fail, uploads stall, and large menus lose items. The Config Grader checks 30+ settings including memory_limit, max_execution_time, upload_max_filesize, post_max_size, max_input_vars, and display_errors.",
    overview: [
      "Judges your site contextually: WooCommerce stores with Elementor or WP All Import need around 512M memory. A blog with 15 plugins runs fine on 128M or 256M. The grader inspects active plugins and tailors benchmarks.",
      "Apache writes to .htaccess; Nginx/LiteSpeed/PHP-FPM write to .user.ini.",
      "Automated rollback: Tests your site after each edit. If a 500 server error is triggered, it restores the previous file immediately.",
      "Revert button available on any setting at any time.",
    ],
    tables: [
      {
        title: "Config Statuses Explained",
        data: {
          headers: ["Status", "Meaning", "What to Do"],
          rows: [
            { col1: "Pass", col2: "Setting is fine for your site", col3: "Leave it alone." },
            { col1: "Warn / Fixable", col2: "Lower than recommended (e.g. max_input_vars=1000 loses menu items)", col3: "Click Auto-Fix." },
            { col1: "Fail", col2: "Active risk (e.g. display_errors exposes filesystem paths to visitors)", col3: "Click Auto-Fix now." },
            { col1: "Host-Locked", col2: "Host fixed this value at server level", col3: "See Host-Locked details below." },
          ],
        },
      },
    ],
    callouts: [
      {
        type: "info",
        title: "Understanding Host-Locked",
        text: "Host-Locked does NOT mean bad. It means you cannot change it from WordPress. If your site has no memory exhaustion errors, a locked 128M/256M limit is fine. If imports fail, click 'Copy Diagnostic Report for Your Host' and send it to your host's support team.",
      },
      {
        type: "warning",
        title: "PHP-FPM .user.ini Cache Notice",
        text: "PHP-FPM caches .user.ini for about 5 minutes. After Auto-Fix, wait 5 minutes before checking whether the new value is active.",
      },
    ],
  },
  {
    id: "opcache",
    number: "3",
    title: "OPcache Performance & Script Browser",
    category: "Performance",
    badge: "Pro",
    where: "phpinfo() WP > Performance > OPcache",
    whatFor: "Without OPcache, PHP reads and compiles dozens of WordPress files on every page view. With OPcache, compiled code stays in RAM and is reused, delivering a huge server speedup.",
    overview: [
      "Hit rate: How often PHP found code already in memory. Higher is better.",
      "Memory cards: Total memory given to OPcache, used, free, and wasted memory.",
      "Cached scripts vs. max keys: Example: 4,200 files cached out of 10,000 maximum.",
      "Reset OPcache button: Empties and rebuilds compiled opcode cache.",
      "Cached scripts browser: Searchable list of all cached files with memory footprint and hit count.",
    ],
    tables: [
      {
        title: "OPcache Benchmarks",
        data: {
          headers: ["Result", "Meaning", "What to Do"],
          rows: [
            { col1: "Hit rate > 95%", col2: "Healthy compiled execution", col3: "Nothing needed." },
            { col1: "Hit rate 80%-94%", col2: "Cache filling up or excessive wasted memory", col3: "Click Reset OPcache. If it stays low, ask host to raise opcache.memory_consumption to 256M." },
            { col1: "Disabled / Not Installed", col2: "PHP recompiles files on every request", col3: "Set opcache.enable=1 in php.ini or contact host." },
          ],
        },
      },
    ],
    callouts: [
      {
        type: "tip",
        title: "When to Reset OPcache",
        text: "Reset when you updated code or a plugin and the old behavior still appears. Note that page loads will be slightly slower for a moment while the cache repopulates.",
      },
    ],
  },
  {
    id: "object-cache",
    number: "4",
    title: "Persistent Object Cache (Redis & Memcached)",
    category: "Performance",
    badge: "Pro",
    where: "phpinfo() WP > Performance > Object Cache",
    whatFor: "By default WordPress asks the database the same queries on every page. An object cache keeps answers in fast memory across visits. Essential for WooCommerce, membership portals, and high-traffic sites.",
    overview: [
      "Checks two essentials: 1) PHP Redis/Memcached extension installed on server, and 2) wp-content/object-cache.php drop-in present.",
      "Hit and miss percentages tracked in real time.",
      "Flush Object Cache button to wipe stale database keys.",
      "1-click link to install companion Redis plugin if extension exists but drop-in is missing.",
    ],
    tables: [
      {
        title: "Object Cache Statuses",
        data: {
          headers: ["Status", "Meaning", "What to Do"],
          rows: [
            { col1: "Connected & Active", col2: "Queries successfully cached in memory", col3: "Nothing needed." },
            { col1: "Extension Available, Drop-in Missing", col2: "Server has Redis, but WP is not connected", col3: "Click 'Install Redis Plugin' in the banner." },
            { col1: "Not Active", col2: "Every query hits disk database", col3: "Fine for small blogs; enable Redis with host for stores." },
          ],
        },
      },
    ],
    callouts: [
      {
        type: "warning",
        title: "When to Flush",
        text: "Flush only if settings or products look out of date after editing. Do NOT flush on an automated schedule, as it forces the database to rebuild cache on visitor requests.",
      },
    ],
  },
  {
    id: "database-autoload",
    number: "5",
    title: "Database Health & Autoload Cleaner",
    category: "Performance",
    badge: "Pro",
    where: "phpinfo() WP > Performance > Database",
    whatFor: "On every page view WordPress loads all rows from the wp_options table where autoload = 'yes'. Bloated or leftover transient data in autoload slows down every single visitor.",
    overview: [
      "Total autoload gauge: Green under 400 KB, yellow from 400 to 800 KB, red above 800 KB.",
      "Top autoloaded options: Identifies the biggest database rows and the plugin that created them.",
      "Expired transients counter with 1-click safe purge button.",
      "Missing indexes scanner: Detects database tables lacking foreign/primary indexes that cause table scans.",
      "Database engine (InnoDB/MyISAM) and storage footprint breakdown.",
    ],
    tables: [
      {
        title: "Autoload Size Benchmarks",
        data: {
          headers: ["Autoload Size", "Meaning", "What to Do"],
          rows: [
            { col1: "Under 400 KB", col2: "Optimal performance", col3: "No action required." },
            { col1: "400 to 800 KB", col2: "Starting to slow TTFB", col3: "Purge expired transients, inspect top options." },
            { col1: "Over 800 KB", col2: "Severe delay on every page request", col3: "Purge transients now and clean orphan plugin options." },
          ],
        },
      },
    ],
    callouts: [
      {
        type: "danger",
        title: "Safety Rule for Database Cleaning",
        text: "Purging EXPIRED transients is 100% safe (they are useless leftovers). Do NOT delete option rows by hand unless you are certain they belong to an uninstalled plugin. Always back up your database first.",
      },
    ],
  },
  {
    id: "api-monitor",
    number: "6",
    title: "External API Health Monitor",
    category: "Performance",
    badge: "Pro",
    where: "phpinfo() WP > Performance > API Monitor",
    whatFor: "Plugins frequently call external APIs: payment gateways (Stripe/PayPal), shipping calculators, email marketing, and license servers. If an outside service lags, your checkout or admin freezes.",
    overview: [
      "Full log of every outbound external domain called by WordPress.",
      "Total request count, average latency, and slowest peak response time.",
      "Identifies HTTP timeouts and 5xx API failures.",
      "Sortable table: Sort by slowest response to catch sporadic freezes.",
    ],
    tables: [
      {
        title: "API Latency Benchmarks",
        data: {
          headers: ["Average Time", "Meaning", "What to Do"],
          rows: [
            { col1: "Under 0.5 s", col2: "Fast & responsive", col3: "No action needed." },
            { col1: "0.5 to 2.0 s", col2: "Noticeable delay", col3: "Check if the calling plugin has async/cron settings." },
            { col1: "Over 2.0 s or Timeouts", col2: "API call blocks customer checkout/page load", col3: "Identify plugin, review settings, or switch integrations." },
          ],
        },
      },
    ],
  },

  // ── PART 2: SECURITY & CORE ───────────────────────────────────────────────
  {
    id: "php-eol-timeline",
    number: "7",
    title: "PHP EOL Timeline & Support Tracker",
    category: "Security & Core",
    badge: "Free",
    where: "phpinfo() WP > Security & Core > PHP EOL",
    whatFor: "PHP versions receive 2 years of active development followed by 2 years of security fixes. Once End of Life (EOL) is reached, zero security patches are issued. Running an EOL version leaves your server vulnerable to known exploits.",
    overview: [
      "Interactive timeline of PHP versions with official release and EOL dates.",
      "Prominent 'YOU' badge highlighting the version active on your server right now.",
      "Status indicators: Supported, EOL in < 90 Days, or End of Life.",
      "Days remaining in support window or days since official abandonment.",
      "1-click launch to the PHP Compatibility Scanner.",
    ],
    tables: [
      {
        title: "Action by Support Status",
        data: {
          headers: ["Status", "Meaning & What to Do"],
          rows: [
            { col1: "Supported", col2: "PHP version actively receives security updates. No action required." },
            { col1: "EOL in < 90 Days", col2: "Support ending soon. Run the Compatibility Scanner now so you are prepared." },
            { col1: "End of Life", col2: "No security patches. Run scanner, replace obsolete plugins, and upgrade PHP in hosting panel." },
          ],
        },
      },
    ],
  },
  {
    id: "php-compatibility-scanner",
    number: "8",
    title: "PHP Compatibility Scanner (Zero False Alarms)",
    category: "Security & Core",
    badge: "Free",
    where: "phpinfo() WP > Security & Core > PHP Compatibility",
    whatFor: "Upgrading PHP is critical, but old plugins can crash your site on a modern runtime. The scanner checks all installed plugins and themes before you flip the switch at your host.",
    overview: [
      "Pure in-WordPress static scanner: Does not require exec(), shell access, or external command-line tools.",
      "Smart guard & polyfill detection: Eliminates false alarms from dormant shims and version switches.",
      "Background scanner with real-time progress bar for large sites.",
      "Detailed report: Exact file path, line number, issue severity, and code snippet.",
    ],
    steps: {
      title: "How to use it",
      items: [
        "Select your target PHP version (e.g. PHP 8.3 or 8.4).",
        "Click 'Run Scan' and let the progress bar complete.",
        "Inspect flagged items: Deprecation notices vs breaking fatal errors.",
        "Update or replace breaking plugins before changing PHP in hosting panel.",
      ],
    },
    tables: [
      {
        title: "Scan Results Interpreted",
        data: {
          headers: ["Result", "Meaning", "What to Do"],
          rows: [
            { col1: "Fully Compatible", col2: "No breaking syntax or removed functions", col3: "Safe to change PHP version at host." },
            { col1: "Deprecation Notices", col2: "Works today, but syntax will be removed in future", col3: "Check for plugin updates; ensure display_errors is off." },
            { col1: "Breaking Change / Fatal", col2: "Removed function called. Site will crash on that PHP", col3: "Update or replace that plugin before switching PHP." },
          ],
        },
      },
    ],
  },
  {
    id: "update-guard",
    number: "9",
    title: "Update Guard: Plugin & Theme Pre-Update Scanner",
    category: "Security & Core",
    badge: "Free",
    where: "phpinfo() WP > Security & Core > Update Guard (Plugins tab)",
    whatFor: "Pressing 'Update Now' in WordPress is always a risk. Update Guard evaluates pending plugin and theme updates before installation to prevent breaking changes.",
    overview: [
      "Verifies minimum PHP and WordPress requirements against your live server.",
      "Parses changelogs for risk indicators: database migrations, major rewrites, and breaking API changes.",
      "Flags abandoned plugins with no updates in over 2 years.",
      "Provides a plain-language risk verdict for every pending update.",
    ],
    tables: [
      {
        title: "Update Guard Verdicts",
        data: {
          headers: ["Verdict", "Meaning", "What to Do"],
          rows: [
            { col1: "Safe to update", col2: "Matches server specs, routine patch", col3: "Update normally." },
            { col1: "Update with caution", col2: "Major version jump or database changes", col3: "Back up first, update during off-peak hours." },
            { col1: "Risky, review first", col2: "Requires higher PHP/WP or plugin is abandoned", col3: "Do not update yet. Upgrade server or find replacement." },
          ],
        },
      },
    ],
  },
  {
    id: "core-readiness-audit",
    number: "10",
    title: "Core Readiness Audit",
    category: "Security & Core",
    badge: "Pro",
    where: "phpinfo() WP > Security & Core > Update Guard > Core Audit tab",
    whatFor: "Major WordPress releases deprecate or remove old core functions. If an installed plugin still relies on a deleted core function, upgrading WordPress causes fatal crashes.",
    overview: [
      "Select your upcoming WordPress target version (e.g. WP 6.7 or 6.8).",
      "Scans all plugins for removed core WordPress APIs and hook changes.",
      "Returns exact plugin name, file path, line number, and modern API replacement.",
    ],
    tables: [
      {
        title: "Core Scan Verdicts",
        data: {
          headers: ["Result", "What to Do"],
          rows: [
            { col1: "Core Ready", col2: "All plugins compatible with target WordPress release. Safe to update." },
            { col1: "Deprecated Function Noted", col2: "Safe to update now. Keep plugin updated before next major cycle." },
            { col1: "Removed Core API Call", col2: "Do NOT update WordPress yet. Update the affected plugin first." },
          ],
        },
      },
    ],
  },
  {
    id: "update-history-health-check",
    number: "11",
    title: "Update History & 60-Second Post-Update Health Check",
    category: "Security & Core",
    badge: "Pro",
    where: "phpinfo() WP > Security & Core > Update Guard > History tab",
    whatFor: "Some updates install successfully but quietly break loopback requests or background cron. This screen records every update and runs an automated 60-second health check after each installation.",
    overview: [
      "Complete historical audit log: Core, plugin, and theme updates with old/new versions, timestamp, and user.",
      "Automated post-update tests: 1) Loopback request integrity, 2) Error log delta (new fatal errors), and 3) WP-Cron execution.",
      "Manual 'Run Health Check Now' button for on-demand diagnostics anytime.",
    ],
    tables: [
      {
        title: "Post-Update Health Check Results",
        data: {
          headers: ["Result", "Meaning", "What to Do"],
          rows: [
            { col1: "Healthy (3 of 3)", col2: "Update settled cleanly with zero issues", col3: "No action required." },
            { col1: "Warning", col2: "Site is up, but new notices or warnings logged", col3: "Review error log delta to verify severity." },
            { col1: "Failed", col2: "Fatal errors or broken loopback detected", col3: "Use Troubleshooting Mode or roll back plugin version." },
          ],
        },
      },
    ],
  },
  {
    id: "permissions-audit",
    number: "12",
    title: "Permissions Audit and 1-Click Repair",
    category: "Security & Core",
    badge: "Pro",
    where: "phpinfo() WP > Security & Core > Permissions Audit",
    whatFor: "File permissions decide who can read, write, or execute files on your host. Open permissions (777) allow malicious scripts to overwrite files; overly strict permissions break updates and uploads.",
    overview: [
      "Inspects wp-config.php (should be 0600, 0640, or 0644).",
      "Audits /wp-admin, /wp-includes, /wp-content, /uploads, /plugins, and /themes.",
      "Flags any world-writable 777 folders or files in high-contrast red.",
      "Verifies file owner matches the user PHP runs under (prevents FTP prompt errors).",
      "1-Click Auto-Fix sets folders to 0755, files to 0644, and wp-config.php to 0600.",
    ],
    callouts: [
      {
        type: "danger",
        title: "Important Host Check After Auto-Fix",
        text: "After running Permissions Auto-Fix, test your site immediately in a private window. On rare shared hosts where PHP runs as a different user than the file owner, a strict 0600 wp-config.php can become unreadable. If that happens, contact your host.",
      },
    ],
  },
  {
    id: "security-headers",
    number: "13",
    title: "Security Headers Auditor & 1-Click Fix",
    category: "Security & Core",
    badge: "Pro",
    where: "phpinfo() WP > Security & Core > Security Headers",
    whatFor: "HTTP security headers instruct visitor browsers how to handle scripts, frames, and certificates safely, defending against clickjacking, cross-site scripting (XSS), and content-type sniffing.",
    overview: [
      "Audits 6 core headers: HSTS (Strict-Transport-Security), X-Content-Type-Options, X-Frame-Options, CSP (Content-Security-Policy), Referrer-Policy, and Permissions-Policy.",
      "Performs real live HTTP request to your homepage to evaluate active headers.",
      "Auto-Fix writes safe rules to .htaccess on Apache/LiteSpeed, or provides copy-ready nginx.conf snippets.",
      "Built-in 1-Click Revert restores original configuration instantly.",
    ],
    tables: [
      {
        title: "Header Audit Grades",
        data: {
          headers: ["Grade", "Meaning", "What to Do"],
          rows: [
            { col1: "A+ / A", col2: "All core security headers active and verified", col3: "No action required." },
            { col1: "B / C", col2: "HTTPS active, but protective headers missing", col3: "Click Auto-Fix Missing Headers." },
            { col1: "F", col2: "Zero security headers deployed", col3: "Click Auto-Fix Missing Headers." },
          ],
        },
      },
    ],
    callouts: [
      {
        type: "warning",
        title: "Caution with HSTS and CSP",
        text: "HSTS: Only enable when HTTPS is completely working across your entire domain, as browsers will refuse plain HTTP.\nCSP: A very strict policy can block external scripts (chat widgets, Stripe checkout). Test your checkout after enabling.",
      },
    ],
  },
  {
    id: "ssl-monitor",
    number: "14",
    title: "SSL Certificate Monitor & Expiry Alert",
    category: "Security & Core",
    badge: "Pro",
    where: "phpinfo() WP > Security & Core > SSL Monitor",
    whatFor: "When your SSL certificate expires, browsers show an alarming full-screen security warning, causing immediate traffic and revenue drop. This screen monitors certificate validity and renewal status.",
    overview: [
      "Real-time countdown of days until certificate expiration.",
      "Certificate issuer (Let's Encrypt, Cloudflare, DigiCert, Sectigo) and validity window.",
      "Domain SAN match verification (ensures certificate covers both www and non-www).",
      "HTTPS 301 permanent redirect validation.",
      "Mixed content scanner (flags http:// images or scripts breaking the green padlock).",
      "Multi-domain monitoring (Pro): Add staging, checkout, or client subdomains.",
    ],
    tables: [
      {
        title: "SSL Status Breakdown",
        data: {
          headers: ["Status", "Meaning", "What to Do"],
          rows: [
            { col1: "> 30 Days Remaining", col2: "Certificate healthy & valid", col3: "No action required." },
            { col1: "< 14 Days Remaining", col2: "Automated renewal has not triggered", col3: "Trigger manual renewal in hosting panel or Cloudflare." },
            { col1: "Expired or Mismatch", col2: "Visitors blocked by browser warning", col3: "Renew or reinstall certificate immediately." },
          ],
        },
      },
    ],
  },

  // ── PART 3: PAGE AUDIT TOOLS ──────────────────────────────────────────────
  {
    id: "phpinfo-viewer",
    number: "15",
    title: "In-Admin phpinfo() Viewer",
    category: "Page Audit Tools",
    badge: "Free",
    where: "phpinfo() WP > Page Audit Tools > phpinfo() Viewer",
    whatFor: "The native PHP phpinfo() function dumps every raw server setting into an unstyled text page. This viewer renders the same authoritative telemetry inside wp-admin with live search and category jump navigation.",
    overview: [
      "Real-time search: Type 'curl', 'imagick', or 'memory_limit' to filter instantly.",
      "Quick jump menu: Jump straight to Core, OPcache, Session, PDO, or cURL.",
      "Replaces dangerous standalone info.php or phpinfo.php files on your host.",
    ],
    callouts: [
      {
        type: "danger",
        title: "Security Reminder",
        text: "If you ever uploaded an info.php or test.php file to your web root, DELETE IT immediately. Public phpinfo files leak server secrets to attackers. This viewer provides the same data securely restricted to site administrators.",
      },
    ],
  },
  {
    id: "php-config-editor",
    number: "16",
    title: "PHP Config Editor & Snippet Library",
    category: "Page Audit Tools",
    badge: "Free",
    where: "phpinfo() WP > Page Audit Tools > PHP Config Editor",
    whatFor: "Editing .htaccess or .user.ini manually over FTP carries high risk: a single syntax typo can trigger a white screen or 500 Internal Server Error. The editor adds safety guardrails and automated backups.",
    overview: [
      "Automated backup created before every write (htaccess-phpinfo.txt or userini-phpinfo.txt).",
      "Automatic rollback: Restores previous working file if syntax error causes a server fault.",
      "1-Click Restore button allows immediate rollback anytime.",
      "Snippet library: 1-click GZIP/Brotli compression, browser caching expires headers, security headers, and aggressive crawler bot blockers.",
    ],
    callouts: [
      {
        type: "tip",
        title: "After Adding Snippets",
        text: "After adding caching or compression snippets, purge your caching plugin and CDN cache, then verify page loading in an incognito window.",
      },
    ],
  },
  {
    id: "troubleshooting-mode",
    number: "17",
    title: "Safe Troubleshooting Mode",
    category: "Page Audit Tools",
    badge: "Free",
    where: "phpinfo() WP > Page Audit Tools > Troubleshooting",
    whatFor: "Standard debugging advice asks you to disable all plugins and switch to a default theme, which breaks live sites for customers. Troubleshooting Mode isolates plugin debugging exclusively to your logged-in administrator session.",
    overview: [
      "Uses a temporary must-use plugin (wp-content/mu-plugins) that applies strictly to your session.",
      "Visitors, customers, and other administrators see the normal, functioning website without interruption.",
      "Step-by-step conflict isolation: Plugins are turned off in your session; turn them back on one by one to pinpoint the culprit.",
      "1-Click 'Stop Troubleshooting Mode' removes the mu-plugin cleanly.",
    ],
    steps: {
      title: "How to isolate a conflicting plugin",
      items: [
        "Click 'Start Troubleshooting Mode' (a notification confirms only your session is isolated).",
        "Verify if the issue persists with all plugins disabled.",
        "Enable plugins one by one from the admin bar control panel.",
        "The moment the bug reappears, the last activated plugin is the cause.",
        "Click 'Stop Troubleshooting Mode' to restore your normal session.",
      ],
    },
  },
  {
    id: "basic-info-environment",
    number: "18",
    title: "Basic Info & Server Environment",
    category: "Page Audit Tools",
    badge: "Free",
    where: "phpinfo() WP > Page Audit Tools > Basic Info",
    whatFor: "When opening a support ticket with a plugin author or hosting provider, they always request your environment details. This screen aggregates every relevant spec into a single structured summary.",
    overview: [
      "WordPress core specs: Site URL, home URL, active theme, child theme status.",
      "Active vs installed plugins ratio (e.g. 18 of 24 active).",
      "Live debug mode status (WP_DEBUG, WP_DEBUG_LOG).",
      "Disk storage utilization for /uploads, /themes, and /plugins folders.",
      "PHP runtime, memory usage, cURL version, and web server software.",
    ],
  },
  {
    id: "php-extensions-catalog",
    number: "19",
    title: "PHP Extensions Catalog & Audit",
    category: "Page Audit Tools",
    badge: "Free",
    where: "phpinfo() WP > Page Audit Tools > Extensions",
    whatFor: "WordPress and WooCommerce require specific compiled PHP extensions. Missing extensions cause silent failures, broken image generation, or failed payment webhooks.",
    overview: [
      "Audits 21 essential extensions: curl, dom, exif, fileinfo, gd, hash, iconv, imagick, intl, json, mbstring, mysqli, openssl, pcre, pdo_mysql, SimpleXML, sodium, xml, xmlreader, zip, and zlib.",
      "Missing extensions flagged in high-contrast red cards with an explanation of what breaks.",
      "Live search box to query optional extensions like redis, bcmath, or soap.",
    ],
    tables: [
      {
        title: "Extension Impact",
        data: {
          headers: ["Extension", "Impact If Missing", "Action"],
          rows: [
            { col1: "imagick / intl", col2: "WP falls back to slower GD; localized currency formatting limited", col3: "Ask host to install php-imagick and php-intl." },
            { col1: "curl / openssl / zip", col2: "Updates, plugin installs, and Stripe/PayPal webhooks fail", col3: "Contact host immediately to compile extensions." },
          ],
        },
      },
    ],
  },
  {
    id: "config-snapshots",
    number: "20",
    title: "Config Snapshots & Host Drift Tracker",
    category: "Page Audit Tools",
    badge: "Pro",
    where: "phpinfo() WP > Page Audit Tools > Config Snapshots",
    whatFor: "Hosting providers often update server software, migrate containers, or lower resource limits without notifying customers. Snapshots allow you to capture baseline configurations and detect host drift.",
    overview: [
      "Take manual snapshots before migrations or major updates, plus weekly automated baseline capture.",
      "Visual Diff Comparator: Compare any two snapshots or your baseline against live server settings.",
      "Color-coded drift analysis: Green for improved settings, red for regressive limits.",
    ],
    tables: [
      {
        title: "Drift Statuses",
        data: {
          headers: ["Status", "Meaning", "What to Do"],
          rows: [
            { col1: "Zero Drift", col2: "Live server matches baseline snapshot", col3: "No action required." },
            { col1: "Minor Drift", col2: "Non-critical change (e.g. max_input_time 60 -> 30)", col3: "Review whether site is affected." },
            { col1: "Regressive Drift", col2: "Key limit lowered (e.g. memory dropped 512M -> 128M)", col3: "Copy diff report and escalate to host support." },
          ],
        },
      },
    ],
  },

  // ── PART 4: REPORTS & LOGS ────────────────────────────────────────────────
  {
    id: "operations-log",
    number: "21",
    title: "Operations Log & Audit Trail",
    category: "Reports & Logs",
    badge: "Free",
    where: "phpinfo() WP > Reports & Logs > Operations Log",
    whatFor: "A complete operational log recording every action executed through phpinfo() WP: Auto-Fixes, configuration edits, snapshot captures, and troubleshooting sessions.",
    overview: [
      "Tracks timestamp, executed action, user administrator, and event severity.",
      "Severity tags: INFO (routine), WARNING (minor issue), and CRITICAL (safety rollback triggered).",
      "Filter by Server & Config or Settings Changes.",
    ],
  },
  {
    id: "admin-security-activity-log",
    number: "22",
    title: "Admin Security Activity Log & Login Tracker",
    category: "Reports & Logs",
    badge: "Pro",
    where: "phpinfo() WP > Reports & Logs > Admin Log",
    whatFor: "Tracks who logged in, what was modified, and alerts to brute-force intrusion attempts.",
    overview: [
      "Authentication sentinel: Successful logins, failed attempts, logouts, password resets with real client IP resolution (even behind Cloudflare).",
      "Plugin & theme lifecycle: Activations, deactivations, installations, updates, and deletions.",
      "Core settings & users: Role elevations, URL changes, user registrations.",
      "Multi-filter controls and 1-click CSV export for compliance and client billing.",
    ],
    tables: [
      {
        title: "Security Patterns",
        data: {
          headers: ["Pattern", "Meaning", "What to Do"],
          rows: [
            { col1: "Normal Logins", col2: "Authorized administrator activity", col3: "No action needed." },
            { col1: "Burst of Failed Logins", col2: "Automated brute-force password guessing", col3: "Enforce strong passwords, add 2FA, block IP." },
            { col1: "Unexpected Admin Role Elevation", col2: "Potential site compromise", col3: "Inspect user account immediately, reset passwords, check plugins." },
          ],
        },
      },
    ],
  },
  {
    id: "live-php-error-log",
    number: "23",
    title: "Live PHP Error Log Viewer & Diagnostics",
    category: "Reports & Logs",
    badge: "Pro",
    where: "phpinfo() WP > Reports & Logs > Error Log",
    whatFor: "When a page shows a critical error or white screen, the exact cause is written to the PHP error log. Traditional debugging requires FTP/SSH access; this tool reads and filters logs directly in wp-admin.",
    overview: [
      "Autodetects debug.log, server error logs, and PHP-FPM log files.",
      "1-Click 'Enable Logging' toggles WP_DEBUG_LOG without manually editing wp-config.php.",
      "Instant live search by plugin name, file path, date, or fatal keyword.",
      "Severity highlighting: Red for fatal crashes, yellow for warnings, gray for notices.",
      "Clear Log button to empty oversized files instantly.",
      "Plain-language stack trace explanations.",
    ],
  },
  {
    id: "wp-cron-monitor",
    number: "24",
    title: "WP-Cron Monitor & Scheduled Task Manager",
    category: "Reports & Logs",
    badge: "Pro",
    where: "phpinfo() WP > Reports & Logs > WP-Cron Monitor",
    whatFor: "WordPress uses WP-Cron to publish scheduled posts, process WooCommerce subscription renewals, send emails, and generate backups. If cron fails, background tasks stall without visible errors.",
    overview: [
      "Highlights overdue tasks in high-visibility yellow or red.",
      "Detects whether DISABLE_WP_CRON is enabled and whether a server-level system cron is active.",
      "Orphan hooks detector: Identifies scheduled tasks left behind by deleted plugins.",
      "Task controls: 'Run Now' to execute stuck tasks, 'Delete Event', and 'Purge Hook'.",
    ],
  },
  {
    id: "email-deliverability-suite",
    number: "25",
    title: "Email Deliverability Suite (SPF, DKIM, DMARC)",
    category: "Reports & Logs",
    badge: "Pro",
    where: "phpinfo() WP > Reports & Logs > Mail",
    whatFor: "If password reset emails or customer receipts land in spam, missing domain DNS records are usually responsible. Modern providers (Google/Yahoo) reject unauthenticated emails.",
    overview: [
      "Audits 4 essential DNS authentication records: SPF, DKIM, DMARC, and MX.",
      "Detects whether WordPress uses plain PHP mail() (high spam score) or an authenticated SMTP/API gateway.",
      "Form audit: Verifies contact forms (WPForms, Gravity Forms, CF7, Formidable) use From addresses matching your domain.",
      "Test Email tool: Sends real test emails from wp-admin to verify deliverability.",
    ],
  },
  {
    id: "real-time-alerts-digest",
    number: "26",
    title: "Real-Time Alerts & Weekly Health Digest",
    category: "Reports & Logs",
    badge: "Pro",
    where: "phpinfo() WP > Reports & Logs > Alerts",
    whatFor: "You should not need to log into wp-admin every single day to know if server limits drifted or an SSL certificate is expiring.",
    overview: [
      "Multi-channel notifications: Email, Slack incoming webhooks, Discord webhooks, and custom JSON endpoints.",
      "Configurable alert triggers: PHP EOL, server config drift, OPcache saturation, and SSL expiry (30, 14, 7-day warnings).",
      "Weekly executive health digest delivered every Monday morning.",
      "1-Click 'Test Webhook' and 'Test Email' to verify delivery instantly.",
    ],
  },
  {
    id: "client-audit-reports",
    number: "27",
    title: "Client Audit Reports & White-Labeling",
    category: "Reports & Logs",
    badge: "Pro",
    where: "phpinfo() WP > Reports & Logs > Audit Report",
    whatFor: "For agencies and freelancers maintaining client websites, this generates a polished executive health audit report proving maintenance value.",
    overview: [
      "Consolidates Config Grader score, PHP EOL status, security headers, database autoload health, OPcache, and SSL into one page.",
      "Print / Save as PDF with dedicated print-optimized stylesheet.",
      "Full white-labeling (Unlimited & Lifetime plans): Custom agency name, logo from Media Library, custom brand accent color, and custom footer copyright.",
    ],
  },
  {
    id: "admin-bar-scoreboard",
    number: "28",
    title: "Admin Bar Health Scoreboard",
    category: "Reports & Logs",
    badge: "Free",
    where: "Top WordPress admin toolbar across every wp-admin screen",
    whatFor: "Monitor server health and memory headroom without having to navigate to the plugin dashboard.",
    overview: [
      "Color-coded pill in admin toolbar showing server health grade and current peak RAM usage.",
      "Hover dropdown panel: Health grade, uptime streak, peak memory vs limit, OPcache hit rate with 1-click 'Flush OPcache' button, and top urgent triage issue.",
      "'Copy Markdown System Spec' copies full server telemetry ready for support tickets.",
      "Dashboard widget on the main WordPress admin dashboard.",
    ],
  },

  // ── ROUTINES & RECIPES ────────────────────────────────────────────────────
  {
    id: "recipe-weekly-check",
    title: "Your 5-Minute Weekly Check",
    category: "Routines & Recipes",
    whatFor: "A quick routine to ensure your WordPress host and server operations stay in peak condition.",
    steps: {
      items: [
        "Open phpinfo() WP > Dashboard. Note the overall health grade.",
        "Open the top triage card. Fix it with 1-click Auto-Fix or note why you are leaving it.",
        "Review Update Guard before pressing any plugin or theme update button.",
        "Skim the Admin Security Log for unrecognized logins or failed authentication bursts.",
        "Verify SSL countdown has > 30 days and WP-Cron has 0 overdue tasks.",
      ],
    },
  },
  {
    id: "recipe-php-migration",
    title: "Before You Change Your PHP Version",
    category: "Routines & Recipes",
    whatFor: "Safe step-by-step checklist to upgrade PHP runtimes without white screens or downtime.",
    steps: {
      items: [
        "Check the PHP EOL screen to confirm your current version is approaching or past EOL.",
        "Run the PHP Compatibility Scanner targeting the new PHP version (e.g. 8.3 or 8.4).",
        "Update or replace every plugin flagged in red for breaking syntax.",
        "Take a Config Snapshot and create a full database/site backup.",
        "Switch the PHP version in your hosting control panel.",
        "Open homepage, wp-admin login, and main forms in an incognito window. Check Live Error Log.",
      ],
    },
  },
  {
    id: "recipe-site-broke",
    title: "My Site Just Broke After an Update",
    category: "Routines & Recipes",
    whatFor: "Emergency troubleshooting procedure when an update triggers fatal errors or crashes.",
    steps: {
      items: [
        "Open Update History and review the automated 60-second post-update health check.",
        "Open Live PHP Error Log and search for the updated plugin's name to see the fatal trace.",
        "Start Troubleshooting Mode to isolate the issue to your admin session without affecting visitors.",
        "Roll back the plugin to the previous working version or contact the author with the exact error line.",
      ],
    },
  },
  {
    id: "recipe-site-slow",
    title: "My Site Is Running Slow",
    category: "Routines & Recipes",
    whatFor: "Step-by-step performance triage to identify server bottlenecks and database drag.",
    steps: {
      items: [
        "Check Dashboard for Peak RAM meter and database Autoload gauge.",
        "Open OPcache. Verify the hit rate is above 95%.",
        "Open Database screen. Purge expired transients and check largest autoload rows.",
        "Open External API Monitor. Check if a third-party gateway or license server is timing out.",
        "Open Object Cache. If running WooCommerce, verify Redis persistent caching is active.",
      ],
    },
  },
  {
    id: "recipe-emails-failing",
    title: "Emails Are Not Arriving",
    category: "Routines & Recipes",
    whatFor: "Diagnose password reset, order notification, and form email delivery issues.",
    steps: {
      items: [
        "Open Mail screen and audit SPF, DKIM, DMARC, and MX records.",
        "Send a test email directly from wp-admin to test SMTP transport.",
        "If using plain PHP mail(), install an SMTP plugin connected to a dedicated sending provider.",
        "Ensure all contact forms use a 'From' address belonging to your verified domain (no @gmail.com addresses).",
      ],
    },
  },
  {
    id: "recipe-contact-host",
    title: "When to Contact Your Host",
    category: "Routines & Recipes",
    whatFor: "Clear guidelines on when an issue requires hosting provider intervention vs what you control.",
    overview: [
      "Contact your host when a setting is Host-Locked and your site actually runs out of memory or execution time.",
      "Contact your host when OPcache or Redis extensions are missing from the server runtime.",
      "Contact your host when Config Snapshots reveal a regressive drift (e.g. host lowered your limits without notice).",
      "On the Config Grader, click 'Copy Diagnostic Report for Your Host' and paste the formatted markdown directly into your support ticket.",
    ],
  },
];

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "Start Here": Flame,
  "Performance": Zap,
  "Security & Core": ShieldCheck,
  "Page Audit Tools": Wrench,
  "Reports & Logs": Activity,
  "Routines & Recipes": CheckSquare,
};

const categoryBadges: Record<string, string> = {
  "Start Here": "Getting Started",
  "Performance": "Part 1 · Speed & Dials",
  "Security & Core": "Part 2 · Hardening & Core",
  "Page Audit Tools": "Part 3 · Diagnostics",
  "Reports & Logs": "Part 4 · Logs & Intelligence",
  "Routines & Recipes": "Playbooks & Checklists",
};

// ─── Component ──────────────────────────────────────────────────────────────

export default function DocsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeSectionId, setActiveSectionId] = useState<string>("start-what-it-does");

  const sidebarNavRef = useRef<HTMLDivElement>(null);
  const isClickingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const categories = useMemo(
    () => ["All", "Start Here", "Performance", "Security & Core", "Page Audit Tools", "Reports & Logs", "Routines & Recipes"],
    []
  );

  const filteredDocs = useMemo(() => {
    return docsData.filter((doc) => {
      const matchCat = selectedCategory === "All" || doc.category === selectedCategory;
      if (!matchCat) return false;
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const matchTitle = doc.title.toLowerCase().includes(q);
      const matchWhat = doc.whatFor.toLowerCase().includes(q);
      const matchWhere = doc.where?.toLowerCase().includes(q) ?? false;
      const matchOverview = doc.overview?.some((o) => o.toLowerCase().includes(q)) ?? false;
      const matchTables = doc.tables?.some((t) =>
        t.data.rows.some((r) => r.col1.toLowerCase().includes(q) || r.col2.toLowerCase().includes(q) || (r.col3 && r.col3.toLowerCase().includes(q)))
      ) ?? false;

      return matchTitle || matchWhat || matchWhere || matchOverview || matchTables;
    });
  }, [searchQuery, selectedCategory]);

  // Scroll spy to update active item during manual scrolling
  useEffect(() => {
    const handleScroll = () => {
      // If user clicked a topic, do not let scroll spy override activeSectionId while smooth scrolling
      if (isClickingRef.current) {
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
        scrollTimeoutRef.current = setTimeout(() => {
          isClickingRef.current = false;
        }, 200);
        return;
      }

      // Check if user reached the very bottom of the page
      const isBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 60;
      if (isBottom && filteredDocs.length > 0) {
        setActiveSectionId(filteredDocs[filteredDocs.length - 1].id);
        return;
      }

      // Viewport-relative measurement:
      // Since articles have scroll-mt-28 (112px), 140px gives a stable threshold below the header.
      const offsetThreshold = 140;
      let currentActiveId = filteredDocs[0]?.id;

      for (const item of filteredDocs) {
        const el = document.getElementById(item.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= offsetThreshold) {
          currentActiveId = item.id;
        } else {
          break;
        }
      }

      if (currentActiveId) {
        setActiveSectionId((prev) => (prev === currentActiveId ? prev : currentActiveId));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [filteredDocs]);

  // Auto-scroll the sidebar container so the active topic is always visible
  useEffect(() => {
    if (!activeSectionId || !sidebarNavRef.current) return;
    const container = sidebarNavRef.current;
    if (container.clientHeight === 0) return;

    const activeEl = container.querySelector(
      `[data-nav-id="${activeSectionId}"]`
    ) as HTMLElement | null;
    if (!activeEl) return;

    const containerRect = container.getBoundingClientRect();
    const elRect = activeEl.getBoundingClientRect();

    // If active item is near or above the top boundary of the sidebar
    if (elRect.top < containerRect.top + 70) {
      container.scrollTo({
        top: Math.max(0, container.scrollTop + (elRect.top - containerRect.top) - 90),
        behavior: "smooth",
      });
    }
    // If active item is near or below the bottom boundary of the sidebar
    else if (elRect.bottom > containerRect.bottom - 70) {
      container.scrollTo({
        top: container.scrollTop + (elRect.bottom - containerRect.bottom) + 90,
        behavior: "smooth",
      });
    }
  }, [activeSectionId]);

  const handleNavClick = (id: string) => {
    // Clear any previous debounce timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // Immediately lock active section to the clicked ID
    isClickingRef.current = true;
    setActiveSectionId(id);

    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }

    // Release lock once browser finishes smooth scrolling
    const handleScrollEnd = () => {
      isClickingRef.current = false;
      window.removeEventListener("scrollend", handleScrollEnd);
    };

    window.addEventListener("scrollend", handleScrollEnd, { once: true });

    // Fallback safety timeout (clears when scrolling settles or after 1800ms max)
    scrollTimeoutRef.current = setTimeout(() => {
      isClickingRef.current = false;
      window.removeEventListener("scrollend", handleScrollEnd);
    }, 1800);
  };

  return (
    <main className="flex min-h-screen flex-col items-center overflow-x-clip bg-zinc-50/50 dark:bg-zinc-950 pt-24 sm:pt-28 lg:pt-36">
      {/* Top Navbar */}
      <div className="fixed left-0 right-0 top-0 z-[60]">
        <ExeebitBar />
        <Header />
      </div>

      {/* Hero Header - Identical size and typographic rhythm as home page */}
      <section className="flex w-full flex-col items-center px-4 sm:px-6 lg:px-8 pt-4 pb-8 text-center">
        <div className="flex w-full max-w-4xl flex-col items-center gap-5 text-center">
          {/* Release Announcement Pill */}
          <div>
            <div className="group inline-flex items-center gap-2 rounded-full border border-violet-200/90 bg-violet-50/90 px-3.5 py-1.5 text-center transition-all duration-150 shadow-xs dark:border-violet-900/60 dark:bg-violet-950/40">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold text-violet-800 dark:text-violet-300">
                phpinfo() WP: The Complete Guide
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-violet-200/80 text-violet-900 dark:bg-violet-900/60 dark:text-violet-200">
                v8.0
              </span>
            </div>
          </div>

          {/* Punchy Hero Headline - Exactly same size as home */}
          <h1 className="max-w-4xl text-balance text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl md:text-6xl leading-[1.12]">
            Every screen and setting,{" "}
            <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              explained in plain language.
            </span>
          </h1>

          {/* Subheading - Exactly same size as home */}
          <p className="mx-auto max-w-2xl text-balance text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            You do not need to be a developer. If you can log in to wp-admin, you can use this plugin to inspect, grade, and optimize your server.
          </p>

          {/* Search Bar & Quick Categories */}
          <div className="w-full max-w-2xl mt-3 flex flex-col gap-3">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search guide (e.g., host-locked, memory, OPcache, Redis, update guard)..."
                className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 pl-10 pr-4 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-violet-500 focus:outline-hidden dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 shadow-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200">
                  Clear
                </button>
              )}
            </div>

            {/* Category pills */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                    selectedCategory === cat
                      ? "bg-violet-600 text-white shadow-xs"
                      : "bg-white text-zinc-600 hover:bg-zinc-100 border border-zinc-200 dark:bg-zinc-900 dark:text-zinc-400 dark:border-zinc-800 dark:hover:bg-zinc-800"
                  }`}>
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Documentation Interactive Layout */}
      <section className="w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sticky Interactive Sidebar */}
          <aside
            ref={sidebarNavRef}
            className="lg:col-span-4 docs-sidebar-sticky overflow-y-auto rounded-2xl border border-zinc-200 bg-white p-3 shadow-xs dark:border-zinc-800 dark:bg-zinc-900 hidden lg:block scrollbar-none no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <div className="px-2 py-1.5 mb-2 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                Guide Navigation ({filteredDocs.length})
              </span>
              <span className="text-[10px] text-zinc-400 font-mono">v8.0</span>
            </div>

            <nav className="space-y-1">
              {filteredDocs.map((doc) => {
                const Icon = categoryIcons[doc.category] || FileText;
                const isActive = activeSectionId === doc.id;
                return (
                  <button
                    key={doc.id}
                    data-nav-id={doc.id}
                    onClick={() => handleNavClick(doc.id)}
                    className={`group flex items-center justify-between w-full text-left gap-2 rounded-xl px-2.5 py-1.5 text-xs font-medium transition-all ${
                      isActive
                        ? "bg-violet-600 text-white shadow-xs"
                        : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
                    }`}>
                    <div className="flex items-center gap-2 truncate">
                      <Icon className={`h-3.5 w-3.5 shrink-0 ${isActive ? "text-white" : "text-violet-500"}`} />
                      <span className="truncate">
                        {doc.number ? `${doc.number}. ` : ""}
                        {doc.title}
                      </span>
                    </div>
                    {doc.badge && (
                      <span
                        className={`text-[9px] px-1.5 py-0.2 rounded font-semibold shrink-0 uppercase tracking-wider ${
                          isActive
                            ? "bg-white/20 text-white"
                            : doc.badge === "Pro"
                            ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                            : "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                        }`}>
                        {doc.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Main Article Content Feed */}
          <div className="lg:col-span-8 space-y-10">
            {filteredDocs.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-zinc-300 p-12 text-center dark:border-zinc-700 bg-white dark:bg-zinc-900">
                <Search className="mx-auto h-8 w-8 text-zinc-400 mb-2" />
                <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                  No matching guide sections found
                </h3>
                <p className="mt-1 text-sm text-zinc-500">
                  Try searching for a different term like &ldquo;memory&rdquo;, &ldquo;OPcache&rdquo;, or &ldquo;autoload&rdquo;.
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                  }}
                  className="mt-4 rounded-xl text-xs">
                  Reset Search
                </Button>
              </div>
            ) : (
              filteredDocs.map((doc) => {
                const Icon = categoryIcons[doc.category] || FileText;
                return (
                  <article
                    key={doc.id}
                    id={doc.id}
                    className="scroll-mt-28 rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
                    {/* Header */}
                    <div className="pb-5 border-b border-zinc-100 dark:border-zinc-800">
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400">
                            {categoryBadges[doc.category] || doc.category}
                          </span>
                          {doc.number && (
                            <span className="text-[11px] font-mono text-zinc-400">
                              &bull; Section {doc.number}
                            </span>
                          )}
                        </div>

                        {doc.badge && (
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border ${
                              doc.badge === "Pro"
                                ? "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800"
                                : "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800"
                            }`}>
                            {doc.badge}
                          </span>
                        )}
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300 mt-0.5">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                            {doc.number ? `${doc.number}. ` : ""}
                            {doc.title}
                          </h2>
                          {doc.where && (
                            <div className="mt-1 flex items-center gap-1.5 text-xs text-zinc-500 font-mono">
                              <span className="font-semibold text-zinc-700 dark:text-zinc-300">Where:</span>
                              <span>{doc.where}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* What it is for */}
                    <div className="mt-5 space-y-4 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                      <p className="font-medium text-zinc-900 dark:text-zinc-100">
                        {doc.whatFor}
                      </p>

                      {/* Overview Bullets */}
                      {doc.overview && (
                        <div className="space-y-2 pt-1">
                          <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                            Key Details &amp; Telemetry
                          </span>
                          <ul className="space-y-2">
                            {doc.overview.map((bullet, idx) => (
                              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                                <span className="h-1.5 w-1.5 rounded-full bg-violet-500 shrink-0 mt-2"></span>
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Step-by-Step Instructions */}
                      {doc.steps && (
                        <div className="rounded-xl border border-zinc-200/80 bg-zinc-50/70 p-4 sm:p-5 dark:border-zinc-800 dark:bg-zinc-950/40 mt-4">
                          {doc.steps.title && (
                            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 mb-3 flex items-center gap-1.5">
                              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                              {doc.steps.title}
                            </h3>
                          )}
                          <ol className="space-y-2 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 list-decimal pl-4">
                            {doc.steps.items.map((step, sIdx) => (
                              <li key={sIdx} className="leading-relaxed">
                                {step}
                              </li>
                            ))}
                          </ol>
                        </div>
                      )}

                      {/* Tables */}
                      {doc.tables &&
                        doc.tables.map((t, tIdx) => (
                          <div key={tIdx} className="mt-5 rounded-xl border border-zinc-200 dark:border-zinc-800">
                            {t.title && (
                              <div className="bg-zinc-100/80 px-4 py-2 text-xs font-bold uppercase tracking-wider text-zinc-800 dark:bg-zinc-800/60 dark:text-zinc-200 border-b border-zinc-200 dark:border-zinc-800">
                                {t.title}
                              </div>
                            )}
                            <div className="overflow-x-auto sm:overflow-x-visible">
                              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                                <thead>
                                  <tr className="bg-zinc-100/90 dark:bg-zinc-850/90 border-b border-zinc-200 dark:border-zinc-800 text-[11px] uppercase tracking-wider text-zinc-600 dark:text-zinc-300">
                                    {t.data.headers.map((h, hIdx) => (
                                      <th key={hIdx} className="px-4 py-2.5 font-semibold">
                                        {h}
                                      </th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                                  {t.data.rows.map((row, rIdx) => (
                                    <tr key={rIdx} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30">
                                      <td className="px-4 py-2.5 font-semibold text-zinc-900 dark:text-zinc-100 whitespace-nowrap">
                                        {row.col1}
                                      </td>
                                      <td className="px-4 py-2.5 text-zinc-600 dark:text-zinc-300">
                                        {row.col2}
                                      </td>
                                      {row.col3 && (
                                        <td className="px-4 py-2.5 text-zinc-600 dark:text-zinc-400">
                                          {row.col3}
                                        </td>
                                      )}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        ))}

                      {/* Callout Boxes */}
                      {doc.callouts &&
                        doc.callouts.map((call, cIdx) => (
                          <div
                            key={cIdx}
                            className={`rounded-xl border p-4 text-xs sm:text-sm leading-relaxed mt-4 ${
                              call.type === "danger"
                                ? "border-rose-200 bg-rose-50/80 text-rose-900 dark:border-rose-900/60 dark:bg-rose-950/30 dark:text-rose-200"
                                : call.type === "warning"
                                ? "border-amber-200 bg-amber-50/80 text-amber-900 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-200"
                                : call.type === "tip"
                                ? "border-emerald-200 bg-emerald-50/80 text-emerald-900 dark:border-emerald-900/60 dark:bg-emerald-950/30 dark:text-emerald-200"
                                : "border-violet-200 bg-violet-50/80 text-violet-900 dark:border-violet-900/60 dark:bg-violet-950/30 dark:text-violet-200"
                            }`}>
                            <div className="font-bold mb-1 flex items-center gap-1.5">
                              {call.type === "danger" && <AlertCircle className="h-4 w-4" />}
                              {call.type === "warning" && <AlertTriangle className="h-4 w-4" />}
                              {call.type === "tip" && <Check className="h-4 w-4" />}
                              {call.type === "info" && <Info className="h-4 w-4" />}
                              <span>{call.title}</span>
                            </div>
                            <div className="whitespace-pre-line">{call.text}</div>
                          </div>
                        ))}
                    </div>
                  </article>
                );
              })
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
