"use client";

import React from "react";

/** Individual logo items — defined once, rendered twice for seamless loop */
function LogoItems() {
  return (
    <>
      {/* 1. K5 Learning */}
      <li className="logo-marquee-item" title="K5 Learning (k5learning.com)">
        <svg viewBox="0 0 130 26" fill="currentColor" className="h-[30px] w-auto" role="img" aria-label="K5 Learning logo">
          <path d="M4 3h4.5v8.5L14 3h5.5l-6.8 9.2L19.5 23H14l-5.5-8.8V23H4V3z"/>
          <path d="M23 3h10v4.2h-5.8v3.6h5.2c3.5 0 5.8 2 5.8 6.1s-2.3 6.1-5.8 6.1H23v-4.2h9.4c1.2 0 1.8-.7 1.8-1.9s-.6-1.9-1.8-1.9H23V3z"/>
          <text x="43" y="18" fontFamily="system-ui, -apple-system, sans-serif" fontSize="13" fontWeight="800" letterSpacing="0.08em">LEARNING</text>
        </svg>
      </li>

      {/* 2. CtrlAlt Networks */}
      <li className="logo-marquee-item" title="CtrlAlt Networks (ctrlaltnetworks.com)">
        <svg viewBox="0 0 165 26" fill="currentColor" className="h-[30px] w-auto" role="img" aria-label="CtrlAlt Networks logo">
          <rect x="2" y="4" width="22" height="18" rx="4" stroke="currentColor" strokeWidth="2.2" fill="none"/>
          <path d="M8 13h4m4-4l-3 4 3 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <text x="31" y="18" fontFamily="system-ui, -apple-system, sans-serif">
            <tspan fontSize="14" fontWeight="800" letterSpacing="-0.02em">CtrlAlt</tspan>
            <tspan dx="7" fontSize="10.5" fontWeight="600" letterSpacing="0.14em" opacity="0.8">NETWORKS</tspan>
          </text>
        </svg>
      </li>

      {/* 3. Screen Academy */}
      <li className="logo-marquee-item" title="Screen Academy (screenacademyscotland.ac.uk)">
        <svg viewBox="0 0 155 26" fill="currentColor" className="h-[30px] w-auto" role="img" aria-label="Screen Academy logo">
          <path d="M2 6h17v14H2V6zm17 3.5l6-3.5v14l-6-3.5v-7z"/>
          <circle cx="10.5" cy="13" r="3" fill="#fff"/>
          <text x="31" y="13" fontFamily="system-ui, -apple-system, sans-serif" fontSize="10.5" fontWeight="900" letterSpacing="0.14em">SCREEN</text>
          <text x="31" y="22" fontFamily="system-ui, -apple-system, sans-serif" fontSize="8.5" fontWeight="600" letterSpacing="0.24em" opacity="0.8">ACADEMY</text>
        </svg>
      </li>

      {/* 4. TSAR Cloud */}
      <li className="logo-marquee-item" title="TSAR Cloud (tsar.cloud)">
        <svg viewBox="0 0 140 26" fill="currentColor" className="h-[30px] w-auto" role="img" aria-label="TSAR Cloud logo">
          <path d="M3 18c-1.5 0-3-1.2-3-2.8 0-1.4 1-2.5 2.4-2.7C2.4 8.5 6 5 10.5 5c3.6 0 6.6 2.3 7.6 5.5 1-.4 2-.2 2.8.5.9.8 1.4 2 1.4 3.2 0 2.1-1.7 3.8-3.8 3.8H3z"/>
          <polygon points="10.5,1 13,6 16.5,3.5 14.5,9 6.5,9 4.5,3.5 8,6"/>
          <text x="26" y="18" fontFamily="system-ui, -apple-system, sans-serif">
            <tspan fontSize="14" fontWeight="900" letterSpacing="0.04em">TSAR</tspan>
            <tspan dx="7" fontSize="11" fontWeight="500" letterSpacing="0.14em" opacity="0.8">CLOUD</tspan>
          </text>
        </svg>
      </li>

      {/* 5. Truckee Bagel Co. */}
      <li className="logo-marquee-item" title="Truckee Bagel Co. (truckeebagelcompany.com)">
        <svg viewBox="0 0 195 26" fill="currentColor" className="h-[30px] w-auto" role="img" aria-label="Truckee Bagel Co. logo">
          <circle cx="12" cy="13" r="9.5" stroke="currentColor" strokeWidth="2.5" fill="none"/>
          <circle cx="12" cy="13" r="3.2" fill="currentColor"/>
          <text x="28" y="17.5">
            <tspan fontFamily="Georgia, serif" fontSize="12.5" fontWeight="700" letterSpacing="0.04em">TRUCKEE</tspan>
            <tspan dx="8" fontFamily="system-ui, -apple-system, sans-serif" fontSize="9.5" fontWeight="700" letterSpacing="0.1em" opacity="0.8">BAGEL CO.</tspan>
          </text>
        </svg>
      </li>

      {/* 6. German Design Graduates */}
      <li className="logo-marquee-item" title="German Design Graduates (germandesigngraduates.com)">
        <svg viewBox="0 0 175 26" fill="currentColor" className="h-[30px] w-auto" role="img" aria-label="German Design Graduates logo">
          <rect x="2" y="7" width="8" height="12"/>
          <circle cx="17" cy="13" r="5"/>
          <polygon points="28,7 33,19 23,19"/>
          <text x="38" y="13" fontFamily="system-ui, -apple-system, sans-serif" fontSize="9" fontWeight="900" letterSpacing="0.16em">GERMAN DESIGN</text>
          <text x="38" y="22" fontFamily="system-ui, -apple-system, sans-serif" fontSize="7.5" fontWeight="600" letterSpacing="0.24em" opacity="0.8">GRADUATES</text>
        </svg>
      </li>

      {/* 7. Agenic */}
      <li className="logo-marquee-item" title="Agenic (agenic.com)">
        <svg viewBox="0 0 115 26" fill="currentColor" className="h-[30px] w-auto" role="img" aria-label="Agenic logo">
          <path d="M12 2l9 5.2v10.4l-9 5.2-9-5.2V7.2L12 2z" stroke="currentColor" strokeWidth="2.2" fill="none"/>
          <circle cx="12" cy="12.4" r="3.2"/>
          <text x="28" y="19" fontFamily="system-ui, -apple-system, sans-serif" fontSize="15" fontWeight="800" letterSpacing="-0.03em">agenic</text>
        </svg>
      </li>

      {/* 8. Fire Electronics */}
      <li className="logo-marquee-item" title="Fire Electronics (fire-electronics.ca)">
        <svg viewBox="0 0 165 26" fill="currentColor" className="h-[30px] w-auto" role="img" aria-label="Fire Electronics logo">
          <path d="M11 2c1.5 3 4 5 4 8.5 0 4-3.5 7.5-7.5 7.5S0 14.5 0 10.5c0-3 2.5-5.5 3.5-7.5.5 2.5 2 4 4 4 1-1.5 2.5-3.5 3.5-5z"/>
          <circle cx="7.5" cy="13.5" r="1.8" fill="#fff"/>
          <text x="21" y="18" fontFamily="system-ui, -apple-system, sans-serif">
            <tspan fontSize="12" fontWeight="800" letterSpacing="0.08em">FIRE</tspan>
            <tspan dx="7" fontSize="10.5" fontWeight="500" letterSpacing="0.12em" opacity="0.85">ELECTRONICS</tspan>
          </text>
        </svg>
      </li>

      {/* 9. Material Phenomenal */}
      <li className="logo-marquee-item" title="Material Phenomenal (materialphenomenal.com)">
        <svg viewBox="0 0 160 26" fill="currentColor" className="h-[30px] w-auto" role="img" aria-label="Material Phenomenal logo">
          <path d="M10 3l8 4.6v9.2l-8 4.6-8-4.6V7.6L10 3z" stroke="currentColor" strokeWidth="1.8" fill="none"/>
          <path d="M10 3v9.2m0 0l8-4.6m-8 4.6l-8-4.6" stroke="currentColor" strokeWidth="1.8"/>
          <text x="24" y="13" fontFamily="system-ui, -apple-system, sans-serif" fontSize="9.5" fontWeight="800" letterSpacing="0.1em">MATERIAL</text>
          <text x="24" y="22.5" fontFamily="system-ui, -apple-system, sans-serif" fontSize="8" fontWeight="600" letterSpacing="0.18em" opacity="0.8">PHENOMENAL</text>
        </svg>
      </li>

      {/* 10. RehabShop */}
      <li className="logo-marquee-item" title="RehabShop (rehabshop.as)">
        <svg viewBox="0 0 125 26" fill="currentColor" className="h-[30px] w-auto" role="img" aria-label="RehabShop logo">
          <rect x="2" y="4" width="18" height="18" rx="5" fill="currentColor" opacity="0.15"/>
          <path d="M11 7v12m-6-6h12" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round"/>
          <text x="27" y="18.5" fontFamily="system-ui, -apple-system, sans-serif" fontSize="14" fontWeight="800" letterSpacing="-0.02em">RehabShop</text>
        </svg>
      </li>
    </>
  );
}

export default function DeepnoteProofExact() {
  return (
    <div className="dn-proof-section-wrap">
      {/* Top Fading Border Line */}
      <svg
        className="dn-exact-border-line top"
        viewBox="0 0 1440 2"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <line x1="0" y1="0.5" x2="1440" y2="0.5" stroke="url(#dn_top_line_grad)" />
        <defs>
          <radialGradient
            id="dn_top_line_grad"
            cx="0" cy="0" r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(720 2.99) rotate(-179.762) scale(645.306 5.19677e+08)"
          >
            <stop stopColor="#D6DEE6" />
            <stop offset="1" stopColor="#F7F9FA" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>

      <div className="chakra-container css-185v24g">
        <div className="css-5qm585">
          {/* Sugar-coated site count */}
          <p className="css-wei53j">
            <span className="css-1hbel6m">
              <span className="css-gyp8mm">3,500+</span>
              <span className="css-1ecxyud">3,500+</span>
            </span>
            <span className="css-g6k7kb">WordPress sites protected</span>
          </p>

          {/* Marquee wrapper — overflow hidden, edge fades via mask */}
          <div className="logo-marquee-viewport" aria-hidden="true">
            {/* Two identical strips placed end-to-end; animation shifts left by 50% */}
            <ul className="logo-marquee-track">
              <LogoItems />
              {/* Duplicate for seamless loop */}
              <LogoItems />
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Fading Border Line */}
      <svg
        className="dn-exact-border-line bottom"
        viewBox="0 0 1440 2"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <line x1="0" y1="0.5" x2="1440" y2="0.5" stroke="url(#dn_bottom_line_grad)" />
        <defs>
          <radialGradient
            id="dn_bottom_line_grad"
            cx="0" cy="0" r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(720 2.99) rotate(-179.762) scale(645.306 5.19677e+08)"
          >
            <stop stopColor="#D6DEE6" />
            <stop offset="1" stopColor="#F7F9FA" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}
