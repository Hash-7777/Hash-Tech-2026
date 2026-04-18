import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext.jsx";

/* ─────────────────────────────────────────────────────────────
   SVG H Badge
   · SVG fill → no background-clip, no compositing-layer clip
   · overflow="visible" → ascender renders above the SVG box
   · circle ring is a sibling <circle>, not a parent container
───────────────────────────────────────────────────────────── */
function HashBadge({ size = 54 }) {
  const cx = size / 2;
  // Circle sits in the lower 80 % of the SVG so the ascender
  // has headroom above without being cropped.
  const cy = size * 0.68;
  const r  = size * 0.46;          // ring radius

  // Font small enough that the full Great-Vibes H body
  // (cap + crossbar) fits inside the ring diameter (2r).
  const fontSize = size * 0.52;    // ≈ 27 px at size 52
  // Baseline: lower part of the ring so the letter sits centred.
  const textY = cy + r * 0.52;

  return (
    <svg
      width={size}
      height={size + size * 0.18}   /* extra top room for ascender */
      viewBox={`0 -${size * 0.18} ${size} ${size + size * 0.18}`}
      overflow="visible"
      aria-hidden="true"
      style={{ display: "block", flexShrink: 0 }}
    >
      <defs>
        <linearGradient id="hgNav" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#f5d77a" />
          <stop offset="45%"  stopColor="#d4af37" />
          <stop offset="100%" stopColor="#8a6a10" />
        </linearGradient>
        <filter id="hgGlowNav" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="2.5" result="b" />
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* decorative ring — does NOT wrap / clip the text */}
      <circle cx={cx} cy={cy} r={r}
        fill="#050505"
        stroke="rgba(212,175,55,0.72)"
        strokeWidth="1.4"
        filter="url(#hgGlowNav)"
      />

      {/* H — direct SVG fill, overflow visible, never clipped */}
      <text
        x={cx}
        y={textY}
        textAnchor="middle"
        fontFamily="'Great Vibes', cursive"
        fontSize={fontSize}
        fill="url(#hgNav)"
      >H</text>
    </svg>
  );
}

export default function Navbar() {
  const { count, setOpen } = useCart();
  const [scrolled, setScrolled]   = useState(false);
  const [mobile,   setMobile]     = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    fn();
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => setMobile(false), [location.pathname]);

  const linkCls = ({ isActive }) =>
    `px-4 py-2 text-[11px] tracking-[0.25em] uppercase font-display font-medium transition-colors ${
      isActive ? "text-hash-goldLight" : "text-hash-champagne/70 hover:text-hash-goldLight"
    }`;

  return (
    <motion.header
      initial={{ y: -48, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 inset-x-0 z-50"
    >
      {/*
        Full-width header strip.
        ON SCROLL  → solid dark background (no backdrop-filter → no compositing clip).
                     The H SVG ascender overflows upward freely.
        ON TOP     → fully transparent; logo floats over the hero.

        NEVER use backdrop-filter on any ancestor of the logo.
        backdrop-filter creates a compositing layer whose border-box
        clips all child overflow, regardless of overflow:visible settings.
      */}
      <motion.div
        animate={{
          backgroundColor: scrolled ? "rgba(5,5,5,0.94)" : "rgba(5,5,5,0)",
          borderBottomColor: scrolled ? "rgba(212,175,55,0.18)" : "rgba(212,175,55,0)",
        }}
        transition={{ duration: 0.35 }}
        style={{ borderBottomWidth: 1, borderBottomStyle: "solid" }}
      >
        <div className="mx-auto max-w-7xl px-6 py-3 flex items-center justify-between gap-4">

          {/* ── LOGO — outside any backdrop-filter element ── */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0">
            <HashBadge size={52} />
            <div className="leading-none">
              <span
                className="font-script gold-text"
                style={{ fontSize: 29, lineHeight: 1.15, paddingTop: "0.38em", display: "block" }}
              >
                Hash
              </span>
              <span className="block text-[8.5px] tracking-[0.44em] text-hash-gold/75 font-display mt-0.5">
                TECH · AI · 2026
              </span>
            </div>
          </Link>

          {/* ── NAV PILL — glass + backdrop-blur only here ── */}
          <nav className={`
            flex items-center gap-1
            bg-white/[0.04] backdrop-blur-xl
            border border-hash-gold/20
            rounded-full px-4 md:px-5 py-2.5
            transition-shadow duration-300
            ${scrolled ? "shadow-[0_0_20px_rgba(212,175,55,0.12)]" : ""}
          `}>
            <div className="hidden md:flex items-center gap-0.5">
              <NavLink to="/" end className={linkCls}>Home</NavLink>
              <NavLink to="/store" className={linkCls}>Store</NavLink>
              <a href="#capabilities"
                className="px-4 py-2 text-[11px] tracking-[0.25em] uppercase font-display font-medium text-hash-champagne/70 hover:text-hash-goldLight transition-colors">
                Capabilities
              </a>
              <a href="#contact"
                className="px-4 py-2 text-[11px] tracking-[0.25em] uppercase font-display font-medium text-hash-champagne/70 hover:text-hash-goldLight transition-colors">
                Contact
              </a>
            </div>

            {/* Cart button */}
            <motion.button
              whileTap={{ scale: 0.93 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => setOpen(true)}
              className="relative inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-hash-gold/35 text-hash-champagne hover:border-hash-gold transition-all"
              aria-label="Open cart"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
                <path d="M3 3h2l2.4 13.2a2 2 0 0 0 2 1.6h8.3a2 2 0 0 0 2-1.6L22 7H6"/>
                <circle cx="10" cy="21" r="1.4"/>
                <circle cx="18" cy="21" r="1.4"/>
              </svg>
              <span className="hidden sm:inline text-[11px] tracking-widest uppercase font-display">
                Cart
              </span>
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-gold-gradient text-black text-[10px] font-bold flex items-center justify-center"
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Mobile burger */}
            <button
              onClick={() => setMobile(v => !v)}
              className="md:hidden p-2 ml-1 rounded-full border border-hash-gold/35 text-hash-champagne"
              aria-label="Toggle menu"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 6h18M3 12h18M3 18h18"/>
              </svg>
            </button>
          </nav>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {mobile && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden border-t border-hash-gold/10"
            >
              <div className="mx-auto max-w-7xl px-6 py-3 flex flex-col gap-1">
                <NavLink to="/" end className={linkCls}>Home</NavLink>
                <NavLink to="/store" className={linkCls}>Store</NavLink>
                <a href="#capabilities" className="px-4 py-2 text-[11px] tracking-[0.25em] uppercase font-display text-hash-champagne/70">Capabilities</a>
                <a href="#contact"     className="px-4 py-2 text-[11px] tracking-[0.25em] uppercase font-display text-hash-champagne/70">Contact</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.header>
  );
}
