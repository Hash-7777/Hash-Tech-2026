import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageTransition from "../components/PageTransition.jsx";
import ProductCard from "../components/ProductCard.jsx";
import FloatingDrone from "../components/FloatingDrone.jsx";
import { api } from "../api.js";

const capabilities = [
  {
    title: "Frontier Training",
    copy: "Multi-exaflop clusters engineered for trillion-parameter model training with liquid-cooled precision.",
    icon: "✦"
  },
  {
    title: "On-Device Inference",
    copy: "Silent Apple Silicon and NVIDIA Jetson appliances for private, zero-latency model serving.",
    icon: "✧"
  },
  {
    title: "Sovereign Deployments",
    copy: "Turnkey AI infrastructure for nations, research labs, and regulated enterprises.",
    icon: "❖"
  },
  {
    title: "Edge Intelligence",
    copy: "Ruggedized drones and field nodes with hardware root-of-trust for aerospace, defense, and industrial IoT.",
    icon: "❃"
  }
];

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.getProducts().then(setProducts).catch(() => setProducts([]));
  }, []);

  const featured = products.slice(0, 6);

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative overflow-x-hidden noise">
        <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1100px] h-[1100px] rounded-full bg-hash-gold/10 blur-[160px] pointer-events-none" />
        <div className="absolute top-40 right-0 w-[700px] h-[700px] rounded-full bg-hash-goldDeep/10 blur-[140px] pointer-events-none" />

        {/* Hovering drones in the hero */}
        <FloatingDrone
          className="absolute top-24 right-[8%] hidden md:block"
          size={220}
          path="diagonal"
          delay={0}
        />
        <FloatingDrone
          className="absolute bottom-10 left-[6%] hidden lg:block opacity-60"
          size={140}
          path="hover"
          delay={2}
        />

        <div className="relative mx-auto max-w-7xl px-6 pt-16 pb-28 md:pt-24 md:pb-40 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full glass text-[10px] tracking-[0.4em] uppercase text-hash-champagne font-display"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-hash-gold animate-pulse" />
            Luxury AI Infrastructure · Edition MMXXVI
          </motion.div>

          {/* MASSIVE project name */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10"
          >
            {/*
              font-script global rule handles padding-top & overflow:visible.
              overflow-visible on this wrapper ensures nothing clips the ascender
              even though the parent section has overflow-x-hidden.
            */}
            <div style={{ overflow: "visible" }}>
              <h1
                className="font-script gold-shimmer"
                style={{
                  fontSize: "clamp(6rem, 22vw, 22rem)",
                  lineHeight: 1.1,
                }}
              >
                Hash
              </h1>
            </div>
            <div className="-mt-2 md:-mt-6 flex flex-col md:flex-row md:items-center md:justify-start justify-center gap-3 md:gap-6">
              <div className="h-px w-24 md:w-40 hairline hidden md:block" />
              <div className="font-display tracking-[0.45em] text-hash-gold text-sm md:text-xl uppercase">
                Tech · AI · 2026
              </div>
              <div className="h-px w-24 md:w-40 hairline hidden md:block" />
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif italic mt-10 md:mt-14 text-2xl md:text-4xl lg:text-5xl leading-tight max-w-4xl text-hash-ivory mx-auto md:mx-0"
          >
            The hardware of <span className="gold-text not-italic font-display">intelligence</span>,{" "}
            engineered in silence & wrapped in gold.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-8 max-w-2xl text-base md:text-lg text-hash-champagne/70 leading-relaxed font-serif mx-auto md:mx-0"
          >
            From personalized AI workstations to exaflop clusters and autonomous drone fleets —
            Hash Tech_AI crafts the luxury infrastructure powering the next generation of
            autonomous systems, foundation models, and sovereign intelligence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="mt-12 flex flex-wrap items-center gap-4 justify-center md:justify-start"
          >
            <Link to="/store" className="btn-primary">
              Enter the Atelier
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
            <a href="#capabilities" className="btn-ghost">
              Our Capabilities
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-5 max-w-3xl mx-auto md:mx-0"
          >
            {[
              { k: "17+", v: "Flagship products" },
              { k: "8 EF", v: "Peak FP8 compute" },
              { k: "24/7", v: "White-glove concierge" },
              { k: "42", v: "Countries deployed" }
            ].map((s) => (
              <div key={s.v} className="glass rounded-2xl px-5 py-5 text-left gold-border">
                <div className="font-display text-3xl gold-text">{s.k}</div>
                <div className="text-[11px] tracking-[0.2em] uppercase text-hash-champagne/60 mt-2">
                  {s.v}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Capabilities */}
      <section id="capabilities" className="relative mx-auto max-w-7xl px-6 py-24">
        <div className="flex items-end justify-between mb-14 flex-wrap gap-4">
          <div>
            <p className="text-[11px] tracking-[0.4em] uppercase text-hash-gold font-display">Capabilities</p>
            <h2 className="heading text-4xl md:text-6xl mt-4 max-w-2xl gold-text">
              For the frontier.
            </h2>
            <p className="font-serif italic text-hash-champagne/70 mt-3 text-lg max-w-xl">
              Priced for the enterprise. Built for a lifetime.
            </p>
          </div>
          <Link to="/store" className="btn-ghost">
            Explore all products
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {capabilities.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="glass rounded-3xl p-7 h-full gold-border"
            >
              <div className="w-14 h-14 rounded-full border border-hash-gold/50 flex items-center justify-center text-2xl gold-text">
                {c.icon}
              </div>
              <h3 className="mt-6 font-display text-lg tracking-wide text-hash-goldLight">
                {c.title}
              </h3>
              <p className="mt-3 text-sm text-hash-champagne/70 leading-relaxed font-serif">
                {c.copy}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <p className="text-[11px] tracking-[0.4em] uppercase text-hash-gold font-display">Featured</p>
            <h2 className="heading text-4xl md:text-6xl mt-4 gold-text">Flagship hardware</h2>
          </div>
          <Link to="/store" className="btn-ghost">See all →</Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* Founder / Architect bio */}
      <section id="architect" className="relative mx-auto max-w-7xl px-6 py-24">
        <div className="relative overflow-hidden rounded-[2rem] glass-strong p-10 md:p-16 gold-border">
          <div className="absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full bg-hash-gold/10 blur-[140px]" />
          <FloatingDrone
            className="absolute -top-6 right-8 opacity-70"
            size={130}
            path="hover"
            delay={1}
          />

          <div className="relative grid md:grid-cols-[auto_1fr] gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative mx-auto md:mx-0 flex-shrink-0"
              style={{ width: 176, height: 176 }}
            >
              {/* outer glow ring */}
              <div className="absolute rounded-full border border-hash-gold/20 pointer-events-none" style={{ inset: -10 }} />
              {/* circle background — not overflow:hidden */}
              <div className="absolute inset-0 rounded-full bg-black border border-hash-gold/60 shadow-goldStrong" />
              {/* S anchored to bottom so ascender rises freely */}
              <span
                className="absolute inset-x-0 bottom-0 text-center font-script gold-shimmer select-none pointer-events-none"
                style={{ fontSize: 160, lineHeight: 1, paddingBottom: 4 }}
              >
                S
              </span>
            </motion.div>

            <div>
              <p className="text-[11px] tracking-[0.4em] uppercase text-hash-gold font-display">
                The Architect
              </p>
              <h2 className="heading text-4xl md:text-5xl mt-3">
                <span className="gold-text">Dr. Seif Hashish</span>
              </h2>
              <div style={{ overflow: "visible" }}>
                <p className="font-script gold-shimmer" style={{ fontSize: "clamp(1.8rem,4vw,2.4rem)" }}>
                  Founder & Chief Architect
                </p>
              </div>

              <p className="mt-6 text-hash-champagne/80 leading-relaxed font-serif text-base md:text-lg">
                A clinical pharmacist and AI expert, Dr. Seif Hashish sits at the rare
                intersection of biomedical science and deep-learning research. His practice
                at the bedside and his craft at the keyboard share a single discipline:
                <span className="gold-text italic"> precision under pressure</span>.
              </p>
              <p className="mt-5 text-hash-champagne/70 leading-relaxed font-serif text-base md:text-lg">
                Every Hash Tech_AI product carries that imprint — hardware engineered with
                the same rigor, humility, and humanism he brings to patient care. Intelligence,
                to him, is not a commodity; it is a responsibility, one he designs fully,
                personally, and without compromise.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <span className="chip border-hash-gold/50 text-hash-goldLight">Clinical Pharmacist</span>
                <span className="chip border-hash-gold/50 text-hash-goldLight">AI Expert</span>
                <span className="chip border-hash-gold/50 text-hash-goldLight">Systems Architect</span>
                <span className="chip border-hash-gold/50 text-hash-goldLight">Cairo · Egypt</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative mx-auto max-w-7xl px-6 py-24">
        <div className="relative overflow-hidden rounded-[2rem] glass-strong p-10 md:p-16 gold-border">
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-hash-gold/10 blur-[120px]" />
          <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-hash-goldDeep/10 blur-[120px]" />
          <div className="relative max-w-3xl">
            <div style={{ overflow: "visible" }}>
              <p className="font-script gold-shimmer" style={{ fontSize: "clamp(2.8rem,6vw,4rem)" }}>
                Deploy
              </p>
            </div>
            <h2 className="heading text-3xl md:text-5xl leading-tight mt-2 text-hash-ivory">
              <span className="gold-text">Intelligence</span> at scale.
            </h2>
            <p className="mt-6 text-hash-champagne/70 text-base md:text-lg font-serif leading-relaxed">
              Configure a bespoke AI infrastructure stack with our engineers. From a single
              workstation to a nation-scale cluster — we handle design, logistics, and lifetime
              support.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/store" className="btn-primary">Start your build</Link>
              <a href="mailto:recons-flanged.7b@icloud.com" className="btn-ghost">
                Talk to an architect
              </a>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
