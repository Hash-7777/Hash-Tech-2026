import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext.jsx";
import { money } from "../utils/format.js";

export default function ProductCard({ product, index = 0 }) {
  const { addItem } = useCart();

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay: (index % 8) * 0.04, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group relative rounded-3xl overflow-hidden glass gold-border"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-black">
          <motion.img
            src={product.image}
            alt={product.name}
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
          <div className="absolute top-4 left-4">
            <span className="chip">{product.category}</span>
          </div>
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="chip border-hash-gold/60 text-hash-goldLight">View →</span>
          </div>
        </div>
      </Link>

      <div className="p-6">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-display text-lg leading-snug tracking-wide text-hash-ivory group-hover:text-hash-goldLight transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <p className="mt-2 text-sm text-hash-champagne/60 line-clamp-2 font-serif italic">
          {product.description}
        </p>

        <div className="mt-5 flex items-center justify-between">
          <div>
            <div className="text-[10px] tracking-[0.3em] text-hash-gold/70">FROM</div>
            <div className="font-display text-2xl gold-text">{money(product.price)}</div>
          </div>
          <motion.button
            whileTap={{ scale: 0.94 }}
            whileHover={{ scale: 1.04 }}
            onClick={(e) => {
              e.preventDefault();
              addItem(product, 1);
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold-gradient text-black font-display font-semibold text-[11px] tracking-widest uppercase shadow-goldSoft hover:shadow-goldStrong transition-shadow"
          >
            Add
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}
