import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { api } from "../api.js";

const CartContext = createContext(null);
const STORAGE_KEY = "hash_tech_cart_v3"; // v3 = EGP pricing rescaled ×10
const LEGACY_KEYS = ["hash_tech_cart_v1", "hash_tech_cart_v2"];

function loadLocal() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) || [];
  } catch {}
  // wipe any legacy (USD / old-id / old-price) carts silently
  try {
    LEGACY_KEYS.forEach((k) => localStorage.removeItem(k));
  } catch {}
  return [];
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadLocal);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  // Sync with backend on mount. Backend normalizes against current products,
  // so stale IDs / prices get corrected automatically.
  useEffect(() => {
    (async () => {
      try {
        const local = loadLocal();
        if (local.length > 0) {
          const synced = await api.replaceCart(local);
          setItems(synced);
        } else {
          const remote = await api.getCart();
          if (remote.length > 0) setItems(remote);
        }
      } catch {
        // offline: keep local state
      }
    })();
  }, []);

  const addItem = useCallback(async (product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { ...product, quantity }];
    });
    setOpen(true);
    try {
      const synced = await api.addToCart(product.id, quantity);
      setItems(synced);
    } catch {}
  }, []);

  const removeItem = useCallback(async (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
    try {
      const synced = await api.removeFromCart(id);
      setItems(synced);
    } catch {}
  }, []);

  const updateQty = useCallback(async (id, quantity) => {
    const q = Math.max(1, Number(quantity) || 1);
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: q } : i)));
    try {
      const synced = await api.updateCart(id, q);
      setItems(synced);
    } catch {}
  }, []);

  const clear = useCallback(async () => {
    setItems([]);
    try {
      await api.clearCart();
    } catch {}
  }, []);

  const count = items.reduce((s, i) => s + i.quantity, 0);
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        open,
        setOpen,
        addItem,
        removeItem,
        updateQty,
        clear,
        count,
        subtotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
