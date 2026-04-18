const BASE = "https://backend-production-1776.up.railway.app";

async function req(path, options = {}) {
  const res = await fetch(BASE + "/api" + path, {
    headers: { "Content-Type": "application/json" },
    ...options
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Request failed" }));
    throw new Error(err.error || "Request failed");
  }
  return res.json();
}

export const api = {
  getProducts: () => req("/products"),
  getProduct: (id) => req(`/products/${id}`),
  getCart: () => req("/cart"),
  addToCart: (productId, quantity = 1) =>
    req("/cart", { method: "POST", body: JSON.stringify({ action: "add", productId, quantity }) }),
  updateCart: (productId, quantity) =>
    req("/cart", { method: "POST", body: JSON.stringify({ action: "update", productId, quantity }) }),
  removeFromCart: (productId) =>
    req("/cart", { method: "POST", body: JSON.stringify({ action: "remove", productId }) }),
  clearCart: () => req("/cart", { method: "POST", body: JSON.stringify({ action: "clear" }) }),
  replaceCart: (items) =>
    req("/cart", { method: "POST", body: JSON.stringify({ action: "replace", items }) }),
  placeOrder: (payload) =>
    req("/order", { method: "POST", body: JSON.stringify(payload) })
};
