import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-memory + file fallback data store
const DATA_FILE = path.join(__dirname, 'db.json');

function loadDB() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    }
  } catch (err) {
    console.error('Error reading db.json:', err);
  }
  return {
    products: [],
    orders: [],
    coupons: [],
    reviews: []
  };
}

function saveDB(db) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(db, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing to db.json:', err);
  }
}

let db = loadDB();

// API Health
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString(), brand: 'FASH HUB' });
});

// Products API
app.get('/api/products', (req, res) => {
  const { generation, category, tag, search } = req.query;
  let result = db.products;
  if (generation && generation !== 'all') {
    result = result.filter(p => p.generation === generation);
  }
  if (category) {
    result = result.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }
  if (tag) {
    result = result.filter(p => p.tags && p.tags.includes(tag));
  }
  if (search) {
    const q = search.toLowerCase();
    result = result.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  }
  res.json(result);
});

app.get('/api/products/:id', (req, res) => {
  const product = db.products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

app.post('/api/products', (req, res) => {
  const newProduct = {
    ...req.body,
    id: req.body.id || `prod-${Date.now()}`,
    createdAt: new Date().toISOString()
  };
  db.products.unshift(newProduct);
  saveDB(db);
  res.status(201).json(newProduct);
});

app.put('/api/products/:id', (req, res) => {
  const index = db.products.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Product not found' });
  db.products[index] = { ...db.products[index], ...req.body };
  saveDB(db);
  res.json(db.products[index]);
});

app.delete('/api/products/:id', (req, res) => {
  db.products = db.products.filter(p => p.id !== req.params.id);
  saveDB(db);
  res.json({ success: true, message: 'Product deleted' });
});

// Orders API
app.get('/api/orders', (req, res) => {
  res.json(db.orders);
});

app.post('/api/orders', (req, res) => {
  const order = {
    ...req.body,
    id: req.body.id || `ord-${Date.now()}`,
    orderNumber: req.body.orderNumber || `FH-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    date: new Date().toISOString()
  };
  db.orders.unshift(order);
  saveDB(db);
  res.status(201).json(order);
});

app.patch('/api/orders/:id/status', (req, res) => {
  const { status } = req.body;
  const order = db.orders.find(o => o.id === req.params.id);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  order.status = status;
  saveDB(db);
  res.json(order);
});

// Coupons API
app.get('/api/coupons', (req, res) => {
  res.json(db.coupons);
});

app.post('/api/coupons', (req, res) => {
  db.coupons.push(req.body);
  saveDB(db);
  res.status(201).json(req.body);
});

// Reviews API
app.get('/api/reviews', (req, res) => {
  const { productId } = req.query;
  let reviews = db.reviews;
  if (productId) {
    reviews = reviews.filter(r => r.productId === productId);
  }
  res.json(reviews);
});

app.post('/api/reviews', (req, res) => {
  const review = {
    ...req.body,
    id: `rev-${Date.now()}`,
    date: new Date().toISOString().split('T')[0]
  };
  db.reviews.unshift(review);
  saveDB(db);
  res.status(201).json(review);
});

// Analytics API for Admin Dashboard
app.get('/api/analytics', (req, res) => {
  const totalRevenue = db.orders.reduce((acc, o) => acc + (o.total || 0), 0);
  const totalOrders = db.orders.length;
  const totalProducts = db.products.length;
  const lowStockProducts = db.products.filter(p => p.stock < 20).length;

  res.json({
    totalRevenue,
    totalOrders,
    totalProducts,
    lowStockProducts,
    recentOrders: db.orders.slice(0, 5)
  });
});

// Serve static production build if present
const distPath = path.join(__dirname, '../dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`FASH HUB Modern Western Fashion server running on http://localhost:${PORT}`);
});
