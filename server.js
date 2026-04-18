const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const DATA_DIR = path.join(__dirname, "data");
const PRODUCTS_FILE = path.join(DATA_DIR, "products.json");
const CART_FILE = path.join(DATA_DIR, "cart.json");
const ORDERS_FILE = path.join(DATA_DIR, "orders.json");

function readJSON(file) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf-8"));
  } catch {
    return [];
  }
}

function writeJSON(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

/**
 * Normalize a cart array against the canonical products list:
 * - drop items whose product no longer exists
 * - always refresh name/price/image/specs from the source of truth
 * - coerce quantity to a positive integer
 */
function normalizeCart(cart, products) {
  if (!Array.isArray(cart)) return [];
  return cart
    .map((item) => {
      const p = products.find((pr) => String(pr.id) === String(item.id));
      if (!p) return null;
      const qty = Math.max(1, parseInt(item.quantity, 10) || 1);
      return { ...p, quantity: qty };
    })
    .filter(Boolean);
}

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "Hash Tech_AI 2026" });
});

app.get("/api/products", (req, res) => {
  res.json(readJSON(PRODUCTS_FILE));
});

app.get("/api/products/:id", (req, res) => {
  const products = readJSON(PRODUCTS_FILE);
  const product = products.find((p) => String(p.id) === String(req.params.id));
  if (!product) return res.status(404).json({ error: "Product not found" });
  res.json(product);
});

app.get("/api/cart", (req, res) => {
  const products = readJSON(PRODUCTS_FILE);
  const cart = normalizeCart(readJSON(CART_FILE), products);
  writeJSON(CART_FILE, cart);
  res.json(cart);
});

app.post("/api/cart", (req, res) => {
  const { action, productId, quantity, items } = req.body || {};
  const products = readJSON(PRODUCTS_FILE);
  let cart = normalizeCart(readJSON(CART_FILE), products);

  if (action === "clear") {
    writeJSON(CART_FILE, []);
    return res.json([]);
  }

  if (action === "replace" && Array.isArray(items)) {
    cart = normalizeCart(items, products);
    writeJSON(CART_FILE, cart);
    return res.json(cart);
  }

  if (action === "remove") {
    cart = cart.filter((i) => String(i.id) !== String(productId));
    writeJSON(CART_FILE, cart);
    return res.json(cart);
  }

  if (action === "update") {
    const q = Math.max(1, parseInt(quantity, 10) || 1);
    cart = cart.map((i) =>
      String(i.id) === String(productId) ? { ...i, quantity: q } : i
    );
    writeJSON(CART_FILE, cart);
    return res.json(cart);
  }

  // default: add
  const product = products.find((p) => String(p.id) === String(productId));
  if (!product) return res.status(404).json({ error: "Product not found" });

  const qty = Math.max(1, parseInt(quantity, 10) || 1);
  const existing = cart.find((i) => String(i.id) === String(productId));
  if (existing) {
    existing.quantity += qty;
  } else {
    cart.push({ ...product, quantity: qty });
  }
  writeJSON(CART_FILE, cart);
  res.json(cart);
});

app.post("/api/order", (req, res) => {
  const { customer, items, total } = req.body || {};
  if (!customer || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "Invalid order payload" });
  }
  const required = ["fullName", "email", "phone", "address", "city", "country", "zip"];
  for (const k of required) {
    if (!customer[k] || !String(customer[k]).trim()) {
      return res.status(400).json({ error: `Missing customer field: ${k}` });
    }
  }

  const orders = readJSON(ORDERS_FILE);
  const order = {
    id: "HASH-" + Date.now().toString(36).toUpperCase(),
    createdAt: new Date().toISOString(),
    currency: "EGP",
    customer,
    items,
    total: Number(total) || 0,
    status: "confirmed"
  };
  orders.push(order);
  writeJSON(ORDERS_FILE, orders);
  writeJSON(CART_FILE, []);
  res.json(order);
});

// Production: serve frontend build
const frontendDist = path.join(__dirname, "..", "frontend", "dist");
if (fs.existsSync(frontendDist)) {
  app.use(express.static(frontendDist));
  app.get("*", (req, res) => {
    if (req.path.startsWith("/api")) return res.status(404).json({ error: "Not found" });
    res.sendFile(path.join(frontendDist, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`🚀 Hash Tech_AI 2026 backend running on http://localhost:${PORT}`);
});
