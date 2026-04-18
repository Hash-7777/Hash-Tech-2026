import React from "react";
import { Link } from "react-router-dom";

/* ─── SVG H badge (footer — larger) ─────────────────────── */
function HashBadgeFooter({ size = 80 }) {
  const cx = size / 2;
  // Circle sits in the lower 80 % so the ascender has headroom above.
  const cy = size * 0.68;
  const r  = size * 0.46;

  // Font small enough that the full Great-Vibes H body fits inside the ring.
  const fontSize = size * 0.52;
  const textY = cy + r * 0.52;

  return (
    <svg
      width={size}
      height={size + size * 0.18}   /* extra top room for ascender */
      viewBox={`0 -${size * 0.18} ${size} ${size + size * 0.18}`}
      overflow="visible"
      aria-hidden="true"
      style={{ flexShrink: 0, display: "block" }}
    >
      <defs>
        <linearGradient id="badgeGoldFooter" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#f5d77a" />
          <stop offset="45%"  stopColor="#d4af37" />
          <stop offset="100%" stopColor="#8a6a10" />
        </linearGradient>
        <filter id="badgeGlowFooter" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <circle
        cx={cx} cy={cy} r={r}
        fill="#050505"
        stroke="rgba(212,175,55,0.7)"
        strokeWidth="1.6"
        filter="url(#badgeGlowFooter)"
      />
      <text
        x={cx}
        y={textY}
        textAnchor="middle"
        fontFamily="'Great Vibes', cursive"
        fontSize={fontSize}
        fill="url(#badgeGoldFooter)"
      >
        H
      </text>
    </svg>
  );
}

export default function Footer() {
  return (
    <footer id="contact" className="relative mt-24 border-t border-hash-gold/20">
      <div className="absolute inset-0 bg-radial-gold pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6 py-20 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-5">
            <HashBadgeFooter size={82} />
            <div>
              {/* "Hash" wordmark — font-script global rule handles ascender padding */}
              <div
                className="font-script gold-text"
                style={{ fontSize: 54, lineHeight: 1.1, paddingTop: "0.4em", display: "block" }}
              >
                Hash
              </div>
              <div className="text-[10px] tracking-[0.42em] text-hash-gold/80 font-display mt-0.5">
                TECH · AI · 2026
              </div>
            </div>
          </div>
          <p className="mt-6 max-w-md text-sm text-hash-champagne/70 leading-relaxed font-serif italic">
            Engineering the hardware backbone of modern intelligence — workstations, GPU servers,
            sovereign clusters, edge nodes, autonomous drones, and storage arrays, crafted for the
            frontier.
          </p>
        </div>

        <div>
          <h4 className="font-display text-hash-goldLight mb-5 text-xs tracking-[0.3em] uppercase">Explore</h4>
          <ul className="space-y-2 text-sm text-hash-champagne/70 font-serif">
            <li><Link to="/" className="hover:text-hash-goldLight transition-colors">Home</Link></li>
            <li><Link to="/store" className="hover:text-hash-goldLight transition-colors">Store</Link></li>
            <li><a href="#capabilities" className="hover:text-hash-goldLight transition-colors">Capabilities</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-hash-goldLight mb-5 text-xs tracking-[0.3em] uppercase">Contact</h4>
          <ul className="space-y-2 text-sm text-hash-champagne/70 font-serif">
            <li>
              <a href="mailto:recons-flanged.7b@icloud.com" className="hover:text-hash-goldLight transition-colors break-all">
                recons-flanged.7b@icloud.com
              </a>
            </li>
            <li>
              <a href="tel:+201021280218" className="hover:text-hash-goldLight transition-colors">
                +20 102 128 0218
              </a>
            </li>
            <li className="pt-1">
              <span className="block text-hash-gold text-[11px] tracking-[0.25em] uppercase">Headquarters</span>
              Al Maadi · Cairo · Egypt
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-hash-gold/15">
        <div className="hairline h-px" />
        <div className="mx-auto max-w-7xl px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-hash-champagne/50 tracking-wider">
            © 2026 Hash Tech_AI. All rights reserved.
          </p>
          <p className="text-center text-sm flex items-center gap-2 flex-wrap justify-center">
            <span className="text-hash-champagne/60 font-serif italic">Designed fully by</span>
            <span
              className="font-script gold-text"
              style={{ fontSize: 28, lineHeight: 1.1, paddingTop: "0.4em", display: "inline-block" }}
            >
              Dr Seif Hashish
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
