import { 
  ShieldAlert, 
  Cpu, 
  Flame, 
  Wrench, 
  FileText, 
  Clock, 
  Database, 
  CheckCircle2, 
  Lock, 
  ExternalLink 
} from "lucide-react";

export default function FourPillars() {
  const pillars = [
    {
      title: "Security & System Hardening",
      desc: "Audit security headers, enforce HTTPS HSTS compliance, and fix dangerous file permissions in 1 click.",
      icon: ShieldAlert,
      tag: "Core Shield",
      badgeColor: "bg-rose-500/10 text-rose-400 border-rose-500/20",
      features: [
        "1-Click Permissions Auto-Fix (0600 wp-config.php & 0755 dirs)",
        "Security Headers Evaluator (CSP, HSTS, X-Frame-Options)",
        "Safe Mode Sandbox: Troubleshoot without taking site down",
        "Host Lock Detector: Pinpoints host-locked directives",
      ],
    },
    {
      title: "Performance & OPcache Engine",
      desc: "Uncover hidden server bottlenecks, memory saturation, and MySQL slow queries with zero page overhead.",
      icon: Cpu,
      tag: "High Velocity",
      badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      features: [
        "OPcache visualizer with hit rates, wasted memory & restart alerts",
        "Real-time memory limit vs peak consumption tracking",
        "Database health & table overhead analyzer",
        "Outbound HTTP API latency & timeout profiler",
      ],
    },
    {
      title: "Safety & Update Guard",
      desc: "Prevent white-screen crashes before they happen with automated pre-update PHP 8.x compatibility checks.",
      icon: Flame,
      tag: "Crash Prevention",
      badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      features: [
        "Update Guard: Scans plugins before you click Update in WP",
        "PHP 8.2 / 8.3 / 8.4 compatibility regression checker",
        "Real-time PHP Error Log telemetry with severity grouping",
        "Background non-blocking scan queues with pause/resume",
      ],
    },
    {
      title: "Developer Tooling & Automation",
      desc: "Built for WordPress engineers, agencies, and sysadmins managing mission-critical client infrastructure.",
      icon: Wrench,
      tag: "Pro Workflow",
      badgeColor: "bg-violet-500/10 text-violet-400 border-violet-500/20",
      features: [
        "Visual .htaccess & .user.ini IDE with auto-rollback protection",
        "WP-Cron visual inspector with overdue task detection",
        "One-click Executive PDF Audit report for client sign-offs",
        "Native WP-CLI commands: wp phpinfo check & wp phpinfo report",
      ],
    },
  ];

  return (
    <section id="features" className="py-24 relative bg-mesh-radial">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-300 mb-3">
            <span>Architected For Modern WordPress</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Four Powerful Pillars. One Unified Diagnostic Hub.
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Everything you need to audit, tune, and safeguard your PHP runtime without leaving the WordPress admin.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div
                key={i}
                className="glass-panel glass-panel-hover rounded-2xl p-7 sm:p-8 flex flex-col justify-between border border-white/10 bg-slate-900/60"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="h-12 w-12 rounded-xl bg-slate-950 border border-white/10 flex items-center justify-center shadow-lg">
                      <Icon className="h-6 w-6 text-violet-400" />
                    </div>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${pillar.badgeColor}`}>
                      {pillar.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
                    {pillar.title}
                  </h3>
                  <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <ul className="space-y-2.5 pt-6 border-t border-white/5">
                  {pillar.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
