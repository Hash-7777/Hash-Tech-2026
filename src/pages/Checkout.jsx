import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PageTransition from "../components/PageTransition.jsx";
import { useCart } from "../context/CartContext.jsx";
import { api } from "../api.js";
import { money } from "../utils/format.js";

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  country: "Egypt",
  zip: "",
  cardName: "",
  cardNumber: "",
  expiry: "",
  cvc: ""
};

function Field({ label, name, value, error, onChange, placeholder, type = "text", maxLength, className = "" }) {
  return (
    <label className={`block ${className}`}>
      <span className="text-[10px] tracking-[0.3em] uppercase text-hash-gold/80 font-display">
        {label}
      </span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        autoComplete="off"
        className={`mt-2 w-full px-4 py-3 rounded-xl bg-black/40 border ${
          error ? "border-red-500/60" : "border-hash-gold/20"
        } focus:outline-none focus:border-hash-gold/70 focus:shadow-goldSoft text-hash-ivory placeholder:text-hash-champagne/30 transition-all`}
      />
      {error && <span className="text-xs text-red-400 mt-1 block">{error}</span>}
    </label>
  );
}

export default function Checkout() {
  const { items, subtotal, clear } = useCart();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const shipping = 0;
  const tax = Math.round(subtotal * 0.14); // Egyptian VAT 14%
  const total = subtotal + shipping + tax;

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = "Required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Valid email required";
    if (!form.phone.trim() || form.phone.replace(/\D/g, "").length < 7) e.phone = "Valid phone required";
    if (!form.address.trim()) e.address = "Required";
    if (!form.city.trim()) e.city = "Required";
    if (!form.country.trim()) e.country = "Required";
    if (!form.zip.trim()) e.zip = "Required";
    if (!form.cardName.trim()) e.cardName = "Required";
    if (form.cardNumber.replace(/\s/g, "").length < 12) e.cardNumber = "Invalid card";
    if (!/^\d{2}\/\d{2}$/.test(form.expiry)) e.expiry = "MM/YY";
    if (!/^\d{3,4}$/.test(form.cvc)) e.cvc = "Invalid";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    if (items.length === 0) return;
    if (!validate()) return;
    setSubmitting(true);
    try {
      const order = await api.placeOrder({
        customer: {
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
          address: form.address,
          city: form.city,
          country: form.country,
          zip: form.zip
        },
        items,
        total
      });
      await clear();
      navigate("/confirmation", { state: { order } });
    } catch (err) {
      alert("Order could not be placed: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <PageTransition>
        <div className="mx-auto max-w-3xl px-6 py-32 text-center">
          <h1 className="heading text-4xl gold-text">Your cart is empty</h1>
          <p className="mt-3 text-hash-champagne/70 font-serif italic">
            Add something first before proceeding to checkout.
          </p>
          <Link to="/store" className="btn-primary mt-8 inline-flex">Browse the Store</Link>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-6 py-10">
        <h1 className="heading text-4xl md:text-6xl gold-text">Checkout</h1>
        <p className="mt-3 text-hash-champagne/70 font-serif italic">
          Secure · Encrypted · White-glove fulfillment across Egypt & beyond
        </p>

        <form onSubmit={submit} className="mt-10 grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-3xl p-6 md:p-8 gold-border"
            >
              <h2 className="font-display text-xl tracking-wide text-hash-goldLight">Contact</h2>
              <div className="mt-6 grid md:grid-cols-2 gap-4">
                <Field label="Full name" name="fullName" value={form.fullName} error={errors.fullName} onChange={onChange} placeholder="Ahmed Hassan" />
                <Field label="Email" name="email" value={form.email} error={errors.email} onChange={onChange} placeholder="ahmed.hassan@example.eg" type="email" />
                <Field label="Phone" name="phone" value={form.phone} error={errors.phone} onChange={onChange} placeholder="+20 102 128 0218" className="md:col-span-2" />
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass rounded-3xl p-6 md:p-8 gold-border"
            >
              <h2 className="font-display text-xl tracking-wide text-hash-goldLight">Shipping</h2>
              <div className="mt-6 grid md:grid-cols-2 gap-4">
                <Field label="Address" name="address" value={form.address} error={errors.address} onChange={onChange} placeholder="12 Road 9, Al Maadi" className="md:col-span-2" />
                <Field label="City" name="city" value={form.city} error={errors.city} onChange={onChange} placeholder="Cairo" />
                <Field label="Country" name="country" value={form.country} error={errors.country} onChange={onChange} placeholder="Egypt" />
                <Field label="Postal code" name="zip" value={form.zip} error={errors.zip} onChange={onChange} placeholder="11728" />
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass rounded-3xl p-6 md:p-8 gold-border"
            >
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h2 className="font-display text-xl tracking-wide text-hash-goldLight">Payment</h2>
                <span className="text-[10px] text-hash-gold/70 tracking-[0.3em] uppercase font-display">
                  256-bit encrypted
                </span>
              </div>
              <div className="mt-6 grid md:grid-cols-2 gap-4">
                <Field label="Name on card" name="cardName" value={form.cardName} error={errors.cardName} onChange={onChange} placeholder="Ahmed Hassan" className="md:col-span-2" />
                <Field label="Card number" name="cardNumber" value={form.cardNumber} error={errors.cardNumber} onChange={onChange} placeholder="4242 4242 4242 4242" className="md:col-span-2" maxLength={19} />
                <Field label="Expiry" name="expiry" value={form.expiry} error={errors.expiry} onChange={onChange} placeholder="MM/YY" maxLength={5} />
                <Field label="CVC" name="cvc" value={form.cvc} error={errors.cvc} onChange={onChange} placeholder="123" maxLength={4} />
              </div>
            </motion.section>
          </div>

          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-strong rounded-3xl p-6 md:p-8 h-fit sticky top-28 gold-border"
          >
            <h2 className="font-display text-xl tracking-wide text-hash-goldLight">Order summary</h2>
            <div className="mt-5 space-y-4 max-h-72 overflow-y-auto pr-1">
              {items.map((i) => (
                <div key={i.id} className="flex gap-3">
                  <img
                    src={i.image}
                    alt={i.name}
                    className="w-14 h-14 rounded-lg object-cover border border-hash-gold/20"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate text-hash-ivory">{i.name}</p>
                    <p className="text-xs text-hash-champagne/50">Qty {i.quantity}</p>
                  </div>
                  <p className="text-sm text-hash-goldLight">{money(i.price * i.quantity)}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 border-t border-hash-gold/15 pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-hash-champagne/60">Subtotal</span>
                <span className="text-hash-ivory">{money(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-hash-champagne/60">Shipping</span>
                <span className="text-hash-ivory">Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-hash-champagne/60">VAT (14%)</span>
                <span className="text-hash-ivory">{money(tax)}</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-hash-gold/15 mt-2">
                <span className="font-display tracking-wide text-hash-goldLight">Total</span>
                <span className="font-display text-xl gold-text">{money(total)}</span>
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={submitting}
              whileHover={{ scale: submitting ? 1 : 1.02 }}
              whileTap={{ scale: submitting ? 1 : 0.98 }}
              className="btn-primary w-full mt-6 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? "Processing…" : `Place order · ${money(total)}`}
            </motion.button>
            <p className="mt-3 text-[11px] text-hash-champagne/40 text-center font-serif italic">
              By placing this order you agree to Hash Tech_AI's Terms of Service.
            </p>
          </motion.aside>
        </form>
      </div>
    </PageTransition>
  );
}
