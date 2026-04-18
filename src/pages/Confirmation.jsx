import React from "react";
import { Link, useLocation, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import PageTransition from "../components/PageTransition.jsx";
import { money } from "../utils/format.js";

export default function Confirmation() {
  const location = useLocation();
  const order = location.state?.order;

  if (!order) return <Navigate to="/" replace />;

  return (
    <PageTransition>
      <div className="mx-auto max-w-4xl px-6 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-hash-cyan to-hash-violet flex items-center justify-center shadow-neon"
          >
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12l5 5L20 7" />
            </svg>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="heading mt-8 text-4xl md:text-5xl"
          >
            Thank you for your <span className="gradient-text">trust</span>.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 text-white/70 text-lg"
          >
            Your order <span className="text-white font-medium">{order.id}</span> has been confirmed.
            A Hash Tech_AI architect will be in touch shortly to coordinate your white-glove deployment.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 glass rounded-3xl p-6 md:p-8"
        >
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h2 className="font-display text-xl">Order details</h2>
              <p className="text-xs text-white/50">Placed on {new Date(order.createdAt).toLocaleString()}</p>
            </div>
            <span className="chip border-hash-cyan/40 text-hash-cyan">{order.status.toUpperCase()}</span>
          </div>

          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xs tracking-widest text-white/50">SHIPPING TO</h3>
              <div className="mt-2 text-sm text-white/80 leading-relaxed">
                <div className="text-white font-medium">{order.customer.fullName}</div>
                <div>{order.customer.email}</div>
                <div>{order.customer.phone}</div>
                <div className="mt-2">
                  {order.customer.address}
                  <br />
                  {order.customer.city}, {order.customer.country} {order.customer.zip}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xs tracking-widest text-white/50">ITEMS</h3>
              <div className="mt-2 space-y-3">
                {order.items.map((i) => (
                  <div key={i.id} className="flex gap-3 items-center">
                    <img src={i.image} alt={i.name} className="w-12 h-12 rounded-lg object-cover border border-white/10" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm truncate">{i.name}</p>
                      <p className="text-xs text-white/50">Qty {i.quantity} · {money(i.price)}</p>
                    </div>
                    <p className="text-sm">{money(i.price * i.quantity)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
            <span className="font-display text-lg">Total paid</span>
            <span className="font-display text-2xl gradient-text">{money(order.total)}</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link to="/store" className="btn-primary">Continue shopping</Link>
          <Link to="/" className="btn-ghost">Return home</Link>
        </motion.div>
      </div>
    </PageTransition>
  );
}
