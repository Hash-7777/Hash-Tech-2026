import React from "react";
import { motion } from "framer-motion";

/**
 * Decorative hovering AI drone that drifts across the page background.
 * Pure SVG — no external assets. Respects prefers-reduced-motion.
 */
export default function FloatingDrone({
  className = "",
  size = 180,
  delay = 0,
  path = "diagonal" // "diagonal" | "horizontal" | "hover"
}) {
  const pathMap = {
    diagonal: {
      x: [0, 40, -20, 20, 0],
      y: [0, -20, 18, -10, 0],
      rotate: [-3, 2, -2, 1, -3]
    },
    horizontal: {
      x: [-30, 30, -30],
      y: [0, -8, 0],
      rotate: [-1, 1, -1]
    },
    hover: {
      x: [0, 6, -4, 0],
      y: [0, -10, 6, 0],
      rotate: [0, 1.5, -1.5, 0]
    }
  };
  const anim = pathMap[path] || pathMap.hover;

  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
      style={{ width: size, height: size * 0.6 }}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 0.7, ...anim }}
      transition={{
        duration: 14,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <svg
        viewBox="0 0 200 120"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_0_18px_rgba(212,175,55,0.35)]"
      >
        <defs>
          <linearGradient id="drone-gold" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#f5d77a" />
            <stop offset="0.5" stopColor="#d4af37" />
            <stop offset="1" stopColor="#8a6a10" />
          </linearGradient>
          <radialGradient id="drone-rotor" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="rgba(245,215,122,0.45)" />
            <stop offset="1" stopColor="rgba(245,215,122,0)" />
          </radialGradient>
          <linearGradient id="drone-cam" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#f5d77a" />
            <stop offset="1" stopColor="#8a6a10" />
          </linearGradient>
        </defs>

        {/* arms */}
        <line x1="40" y1="40" x2="160" y2="80" stroke="url(#drone-gold)" strokeWidth="3" strokeLinecap="round" />
        <line x1="160" y1="40" x2="40" y2="80" stroke="url(#drone-gold)" strokeWidth="3" strokeLinecap="round" />

        {/* rotor glow */}
        <circle cx="40" cy="40" r="22" fill="url(#drone-rotor)" />
        <circle cx="160" cy="40" r="22" fill="url(#drone-rotor)" />
        <circle cx="40" cy="80" r="22" fill="url(#drone-rotor)" />
        <circle cx="160" cy="80" r="22" fill="url(#drone-rotor)" />

        {/* rotors (spinning) */}
        {[
          { cx: 40, cy: 40 },
          { cx: 160, cy: 40 },
          { cx: 40, cy: 80 },
          { cx: 160, cy: 80 }
        ].map((r, i) => (
          <motion.g
            key={i}
            style={{ originX: `${r.cx}px`, originY: `${r.cy}px` }}
            animate={{ rotate: 360 }}
            transition={{ duration: 0.35, repeat: Infinity, ease: "linear" }}
          >
            <ellipse cx={r.cx} cy={r.cy} rx="16" ry="2" fill="url(#drone-gold)" opacity="0.85" />
            <ellipse cx={r.cx} cy={r.cy} rx="2" ry="16" fill="url(#drone-gold)" opacity="0.85" />
            <circle cx={r.cx} cy={r.cy} r="3" fill="#f5d77a" />
          </motion.g>
        ))}

        {/* body */}
        <g>
          <rect
            x="72"
            y="46"
            width="56"
            height="28"
            rx="8"
            fill="#0a0a0a"
            stroke="url(#drone-gold)"
            strokeWidth="1.6"
          />
          <rect x="78" y="52" width="16" height="10" rx="2" fill="url(#drone-cam)" opacity="0.9" />
          <circle cx="118" cy="60" r="3" fill="#f5d77a" />
          <circle cx="118" cy="60" r="1.2" fill="#0a0a0a" />
        </g>

        {/* landing gear */}
        <line x1="80" y1="82" x2="74" y2="96" stroke="url(#drone-gold)" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="120" y1="82" x2="126" y2="96" stroke="url(#drone-gold)" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="74" y1="96" x2="126" y2="96" stroke="url(#drone-gold)" strokeWidth="1.6" strokeLinecap="round" />

        {/* status LED */}
        <motion.circle
          cx="100"
          cy="60"
          r="1.8"
          fill="#f5d77a"
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </motion.div>
  );
}
