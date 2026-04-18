import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import PageTransition from "../components/PageTransition.jsx";
import { api } from "../api.js";
import { useCart } from "../context/CartContext.jsx";
import { money } from "../utils/format.js";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [notFound, setNotFound] = useState(false);
  const { addItem } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    api
      .getProduct(id)
      .then((p) => setProduct(p))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <PageTransition>
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid md:grid-cols-2 gap-10">
            <div className="aspect-square rounded-3xl glass animate-pulse" />
            <div className="space-y-4">
              <div className="h-10 w-3/4 rounded glass animate-pulse" />
              <div className="h-4 w-full rounded glass animate-pulse" />
              <div className="h-4 w-2/3 rounded glass animate-pulse" />
            </div>
          </div>
        </div>
      </PageTransition>
    );
  }

  if (notFound || !product) {
    return (
      <PageTransition>
        <div className="mx-auto max-w-3xl px-6 py-32 text-center">
          <h1 className="heading text-4xl">Product not found</h1>
          <p className="mt-3 text-white/60">The product you're looking for doesn't exist.</p>
          <Link to="/store" className="btn-primary mt-8 inline-flex">Back to store</Link>
        </div>
      </PageTransition>
    );
  }

  const specs = product.specs || {};
  const specEntries = [
    ["CPU", specs.CPU],
    ["GPU", specs.GPU],
    ["RAM", specs.RAM],
    ["Storage", specs.Storage],
    ["AI Use-case", specs.AI_UseCase]
  ].filter(([, v]) => v);

  const handleAdd = async () => {
    await addItem(product, qty);
  };

  const handleBuyNow = async () => {
    await addItem(product, qty);
    navigate("/checkout");
  };

  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-6 py-10">
        <Link to="/store" className="text-sm text-white/50 hover:text-white inline-flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to store
        </Link>

        <div className="mt-8 grid md:grid-cols-2 gap-10 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative rounded-[2rem] overflow-hidden glass neon-border aspect-square"
          >
            <img
              src={product.image}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute top-5 left-5">
              <span className="chip">{product.category}</span>
            </div>
            <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h1 className="heading text-4xl md:text-5xl leading-tight gold-text">{product.name}</h1>
            <p className="mt-5 text-hash-champagne/75 leading-relaxed font-serif italic">{product.description}</p>

            <div className="mt-8 flex items-baseline gap-3">
              <span className="font-display text-4xl gold-text">{money(product.price)}</span>
              <span className="text-xs text-hash-champagne/50 tracking-[0.25em] uppercase font-display">
                Ships worldwide from Cairo
              </span>
            </div>

            <div className="mt-8 glass rounded-2xl p-5">
              <h3 className="font-display text-sm tracking-widest text-white/60">SPECIFICATIONS</h3>
              <dl className="mt-4 grid sm:grid-cols-2 gap-y-3 gap-x-6">
                {specEntries.map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-xs text-white/40 tracking-widest">{k.toUpperCase()}</dt>
                    <dd className="text-sm text-white/90 mt-0.5">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div className="inline-flex items-center glass rounded-full">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-11 h-11 text-white/80 hover:text-white"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="w-10 text-center">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="w-11 h-11 text-white/80 hover:text-white"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleAdd}
                className="btn-primary"
              >
                Add to Cart
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleBuyNow}
                className="btn-ghost"
              >
                Buy now
              </motion.button>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-3 text-xs text-white/60">
              <div className="glass rounded-2xl p-4">
                <div className="text-white font-medium mb-1">3-Year</div>
                Premium warranty
              </div>
              <div className="glass rounded-2xl p-4">
                <div className="text-white font-medium mb-1">24/7</div>
                Concierge support
              </div>
              <div className="glass rounded-2xl p-4">
                <div className="text-white font-medium mb-1">Free</div>
                White-glove delivery
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
