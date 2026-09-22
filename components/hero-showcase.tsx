"use client";

import React from "react";
import DeepnoteProofExact from "./deepnote-proof-exact";

export default function HeroShowcase() {
  return (
    <div className="dn-agentic-hero">
      <div className="hero-cards">
        <div className="hc-row humans">
          {/* ──────────────────────────────────────────────────────────
              CARD 1: LEFT STACK (card-dashboard)
              Faithful 1:1 replica of dashboard.v8.png
             ────────────────────────────────────────────────────────── */}
          <article
            className="hc stack-left"
            tabIndex={0}
            aria-label="Server Intelligence & Health Command"
          >
            <div className="hc-art card-dashboard">
              {/* Handwritten Note with Arrow */}
              <div className="card-note" aria-hidden="true">
                <span>Real-time server diagnostics</span>
                <svg className="note-arrow" viewBox="0 0 40 36" aria-hidden="true">
                  <path d="M 14 4 C 16 14 22 22 20 30" />
                  <path d="M 14 24 L 20 32 L 26 24" />
                </svg>
              </div>

              {/* Header Bar */}
              <div className="art-bar dash-v8-bar">
                <div className="dash-v8-badges">
                  <span className="dash-v8-badge-telemetry">
                    <span className="telemetry-pulse-dot" /> LIVE SERVER TELEMETRY
                  </span>
                  <span className="dash-v8-badge-pro">PRO ACTIVE</span>
                </div>
                <h3 className="dash-v8-title">Server Intelligence &amp; Health Command</h3>
              </div>

              {/* Spec Strip: PHP, DB, Memory */}
              <div className="dash-v8-specs">
                <div className="dash-v8-spec">
                  <span className="spec-lbl">PHP VERSION</span>
                  <div className="spec-val-wrap">
                    <b>8.3.33</b>
                    <span className="spec-tag-supported">Supported ✓</span>
                  </div>
                </div>
                <div className="dash-v8-spec">
                  <span className="spec-lbl">DATABASE</span>
                  <div className="spec-val-wrap">
                    <b>MariaDB 10.11</b>
                  </div>
                </div>
                <div className="dash-v8-spec">
                  <span className="spec-lbl">MEMORY</span>
                  <div className="spec-val-wrap">
                    <b>512M</b>
                  </div>
                </div>
              </div>

              {/* Main Score Box: PHP Server Health & Configuration */}
              <div className="dash-v8-health-box">
                <div className="dash-v8-health-head">
                  <div className="health-title-wrap">
                    <span className="health-title">PHP Server Health &amp; Configuration</span>
                    <span className="health-sub">Automated audit against standards</span>
                  </div>
                  <span className="dash-v8-grade-badge">A+</span>
                </div>

                <div className="dash-v8-score-row">
                  <div className="score-num-wrap">
                    <span className="score-val">100</span>
                    <span className="score-max">/100</span>
                  </div>
                  <span className="score-status">Optimal Configuration ✓</span>
                </div>

                {/* Progress Bar */}
                <div className="dash-v8-progress">
                  <div className="dash-v8-progress-bar" style={{ width: "100%" }} />
                </div>

                {/* Directives Badges */}
                <div className="dash-v8-pills">
                  <span className="dash-v8-pill passed">19 Passed</span>
                  <span className="dash-v8-pill neutral">0 Warnings</span>
                  <span className="dash-v8-pill neutral">0 Failing</span>
                  <span className="dash-v8-pill total">25 Total</span>
                </div>

                {/* Review Directives Button */}
                <button type="button" className="dash-v8-btn" tabIndex={-1}>
                  <span>Review &amp; Auto-Fix Directives</span>
                  <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3" stroke="currentColor">
                    <path d="M 3 8 H 13 M 9 4 L 13 8 L 9 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>

              {/* Memory Engine Mini Card */}
              <div className="dash-v8-mem-card">
                <div className="dash-v8-mem-head">
                  <div className="mem-icon-wrap">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                    </svg>
                  </div>
                  <span className="mem-title">PHP Memory Engine</span>
                </div>

                <div className="dash-v8-mem-body">
                  <div className="mem-gauge-wrap">
                    <svg viewBox="0 0 36 36" className="mem-gauge">
                      <path
                        className="gauge-bg"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="gauge-val"
                        strokeDasharray="13, 100"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <span className="gauge-text">13%</span>
                  </div>
                  <div className="mem-stats">
                    <div className="mem-stat-top">
                      <b>64 MB</b>
                      <span>Limit: 512M</span>
                    </div>
                    <div className="mem-stat-row">
                      <span>Upload Max:</span>
                      <b>128M</b>
                    </div>
                    <div className="mem-stat-row">
                      <span>Post Max:</span>
                      <b>256M</b>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* ──────────────────────────────────────────────────────────
              CARD 2: CENTER STACK (card-churn)
             ────────────────────────────────────────────────────────── */}
          <article
            className="hc stack-center"
            tabIndex={0}
            aria-label="Answer questions with AI"
          >
            <div className="hc-art card-churn">
              {/* Handwritten Note with Arrow */}
              <div className="card-note" aria-hidden="true">
                <span>Answer questions with AI</span>
                <svg className="note-arrow" viewBox="0 0 40 36" aria-hidden="true">
                  <path d="M 14 4 C 16 14 22 22 20 30" />
                  <path d="M 14 24 L 20 32 L 26 24" />
                </svg>
              </div>

              {/* Header Bar */}
              <div className="art-bar">
                <span className="filename">Update Guard analysis</span>
              </div>

              {/* SQL Code Block */}
              <div className="code-block">
                <div className="lab">PRE-FLIGHT SCAN</div>
                <span className="k">SELECT</span> plugin, breaking_risk
                <br />
                <span className="k">FROM</span> pending_updates
                <br />
                <span className="k">JOIN</span> php83_rules <span className="k">USING</span> (plugin_id)
              </div>

              {/* Comparison Bars */}
              <div className="art-cap">compatibility rate · 11 plugins</div>
              <div className="hbars">
                <div className="hbar">
                  <label>safe</label>
                  <div className="track">
                    <i style={{ width: "91%" }} />
                  </div>
                  <b>91%</b>
                </div>
                <div className="hbar tr">
                  <label>caution</label>
                  <div className="track">
                    <i style={{ width: "9%" }} />
                  </div>
                  <b>9%</b>
                </div>
              </div>

              {/* AI Insight Box */}
              <div className="ai-block">
                <div className="ai-head">
                  <span className="spark">✦</span>
                  <span>Update Guard AI</span>
                  <b>insight</b>
                </div>
                <div className="ai-copy">
                  WooCommerce 9.4 tested 100% safe. Complianz 1.4 has 1 deprecated call removed in PHP 8.3. Safety snapshot created.
                </div>
                <div className="ai-actions">
                  <span>inspect breaking lines</span>
                  <span>auto-rollback ready</span>
                </div>
              </div>

              {/* Top Drivers */}
              <div className="art-cap">top risk factors</div>
              <div className="feat">
                <div className="f-row">
                  <span className="nm">mysql_escape_deprecated</span>
                  <div className="bar">
                    <i style={{ width: "85%" }} />
                  </div>
                  <span className="v">+0.34</span>
                </div>
                <div className="f-row">
                  <span className="nm">create_function_removed</span>
                  <div className="bar">
                    <i style={{ width: "55%" }} />
                  </div>
                  <span className="v">+0.21</span>
                </div>
                <div className="f-row">
                  <span className="nm">max_memory_exceeded</span>
                  <div className="bar">
                    <i style={{ width: "25%" }} />
                  </div>
                  <span className="v">+0.08</span>
                </div>
              </div>

              {/* Bottom Warning Pill */}
              <div className="art-pill warn">
                <span className="dot" />
                pre-flight score: 96/100 · zero downtime
              </div>
            </div>
          </article>

          {/* ──────────────────────────────────────────────────────────
              CARD 3: RIGHT STACK (card-dash)
             ────────────────────────────────────────────────────────── */}
          <article
            className="hc stack-right"
            tabIndex={0}
            aria-label="Build autonomous data agents"
          >
            <div className="hc-art card-dash">
              {/* Handwritten Note with Arrow */}
              <div className="card-note" aria-hidden="true">
                <span>Build autonomous data agents</span>
                <svg className="note-arrow" viewBox="0 0 40 36" aria-hidden="true">
                  <path d="M 14 4 C 16 14 22 22 20 30" />
                  <path d="M 14 24 L 20 32 L 26 24" />
                </svg>
              </div>

              {/* Header Bar */}
              <div className="art-bar">
                <span className="filename">Database diagnostic agent</span>
              </div>

              {/* AI Prompt Input */}
              <div className="ai-input">
                <span className="sp">✦</span>
                <span>
                  scan and optimize bloated autoload queries by table
                  <span className="ai-cur" />
                </span>
              </div>

              {/* Status Indicator */}
              <div className="ai-status">
                planning next steps{" "}
                <span className="dots">
                  <i />
                  <i />
                  <i />
                </span>
              </div>

              <div className="ai-gen">↓ generated 3 optimizations</div>

              {/* Mini Cell 1: SQL */}
              <div className="mini-cell">
                <div className="row1">
                  <span className="lab sql">SQL</span>
                  <span className="nm">flag_autoload_bloat</span>
                </div>
                <div className="body">
                  <span className="k">SELECT</span> option_name, length{" "}
                  <span className="k">FROM</span> wp_options{" "}
                  <span className="k">WHERE</span> autoload = &apos;yes&apos;
                </div>
              </div>

              {/* Mini Cell 2: Training / Telemetry Progress Bars */}
              <div className="mini-cell">
                <div className="row1">
                  <span className="lab py">METRIC</span>
                  <span className="nm">wp_database_health.log</span>
                </div>
                <div className="body loss-mini">
                  <div className="loss-row">
                    <span className="ep">autoload</span>
                    <span className="bar" style={{ width: "88%" }} />
                    <span className="lv">1.84 MB</span>
                  </div>
                  <div className="loss-row">
                    <span className="ep">wc_keys</span>
                    <span className="bar" style={{ width: "58%" }} />
                    <span className="lv">3 missing</span>
                  </div>
                  <div className="loss-row">
                    <span className="ep">innodb</span>
                    <span className="bar" style={{ width: "24%" }} />
                    <span className="lv">99.2%</span>
                  </div>
                </div>
              </div>

              {/* Mini Cell 3: Deploy Endpoint */}
              <div className="mini-cell">
                <div className="row1">
                  <span className="lab deploy">AUTO-FIX</span>
                  <span className="nm">apply_optimizations → live</span>
                </div>
                <div className="deploy-mini">
                  <div className="dep-row">
                    <span className="dep-ok">▲</span>
                    <span className="dep-url">phpinfo.local/wp-admin/db-health</span>
                    <span className="dep-tag">ready</span>
                  </div>
                </div>
              </div>

              {/* Bottom Pill */}
              <div className="art-pill purp">
                <span className="dot" />
                database health · saves ~340ms TTFB
              </div>
            </div>
          </article>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────
          BOTTOM SECTION: Exact Deepnote Proof Strip Component
          With exact classes, layout, SVGs, and radial fading lines
         ────────────────────────────────────────────────────────── */}
      <DeepnoteProofExact />
    </div>
  );
}
