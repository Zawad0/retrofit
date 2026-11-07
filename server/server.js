require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const sanitizeInput = require('./middleware/sanitizeInput');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');
const ecoImpactRoutes = require('./routes/ecoImpactRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const adminRoutes = require('./routes/adminRoutes');
const sellerRoutes = require('./routes/sellerRoutes');
const chatRoutes = require('./routes/chatRoutes');

const app = express();
const allowedOrigins = (process.env.CLIENT_ORIGINS || 'http://localhost:5173').split(',').map((origin) => origin.trim()).filter(Boolean);
app.disable('x-powered-by');
app.use(helmet());
app.use(cors({ origin(origin, callback) {
  if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
  return callback(new Error('Origin is not allowed by CORS'));
}, methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'], allowedHeaders: ['Content-Type', 'Authorization', 'Stripe-Signature'], credentials: false }));

// Stripe requires the exact raw bytes for signature verification. Keep this above express.json().
app.post('/api/payment/webhook', express.raw({ type: 'application/json', limit: '1mb' }), require('./controllers/paymentController').handleStripeWebhook);
app.use(express.json({ limit: '100kb' }));
app.use(sanitizeInput);

const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 10, standardHeaders: 'draft-8', legacyHeaders: false, message: { message: 'Too many authentication attempts. Try again in 15 minutes.' } });
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/signup', authLimiter);
app.use('/api/auth/register', authLimiter);
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/eco-impact', ecoImpactRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/seller', sellerRoutes);
const offerRoutes = require('./routes/offerRoutes');
const userRoutes = require('./routes/userRoutes');
app.use('/api/offers', offerRoutes);
app.use('/api/users', userRoutes);
app.use('/api/chat', chatRoutes);
app.get('/', (_req, res) => res.send('RetroFit API running.'));
app.use((err, _req, res, _next) => {
  if (err.message === 'Origin is not allowed by CORS') return res.status(403).json({ message: err.message });
  console.error(err);
  return res.status(500).json({ message: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
if (!process.env.MONGODB_URI || !process.env.JWT_SECRET) throw new Error('MONGODB_URI and JWT_SECRET are required');
mongoose.connect(process.env.MONGODB_URI)
  .then(() => app.listen(PORT, () => console.log(`RetroFit API listening on port ${PORT}`)))
  .catch((error) => { console.error('MongoDB connection failed:', error.message); process.exit(1); });

module.exports = app;
